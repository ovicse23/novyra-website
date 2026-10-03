import { describe, it, expect } from 'vitest';
import {
  generateOrderId,
  generateSecureToken,
  hashSha256,
} from '../../src/worker/services/security';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES } from '../../src/worker/services/storage';

// In-memory mock database store simulating Cloudflare D1
interface MockOrder {
  id: number;
  order_id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  status: 'pending' | 'paid' | 'rejected';
  payment_method?: string;
  payer_number?: string;
  transaction_id?: string;
  payment_proof_key?: string;
  download_token_hash?: string;
  download_expires_at?: string;
  download_count: number;
  created_at: string;
}

class MockD1Database {
  orders: MockOrder[] = [];
  nextId = 1;

  createOrder(data: { name: string; email: string; phone: string; amount: number }): MockOrder {
    const order: MockOrder = {
      id: this.nextId++,
      order_id: generateOrderId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      amount: data.amount,
      status: 'pending',
      download_count: 0,
      created_at: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  submitPayment(orderId: string, payment: { method: string; payerNumber: string; txnId: string; proofKey?: string }) {
    // Check duplicate txnId
    const isDup = this.orders.some((o) => o.transaction_id === payment.txnId && o.order_id !== orderId);
    if (isDup) {
      throw new Error('Duplicate Transaction ID detected');
    }

    const order = this.orders.find((o) => o.order_id === orderId);
    if (!order) throw new Error('Order not found');

    order.payment_method = payment.method;
    order.payer_number = payment.payerNumber;
    order.transaction_id = payment.txnId;
    order.payment_proof_key = payment.proofKey;
    order.status = 'pending';
    return order;
  }

  async approveOrder(orderId: string, expiryHours = 72) {
    const order = this.orders.find((o) => o.order_id === orderId);
    if (!order) throw new Error('Order not found');

    const rawToken = generateSecureToken(32);
    const tokenHash = await hashSha256(rawToken);
    const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();

    order.status = 'paid';
    order.download_token_hash = tokenHash;
    order.download_expires_at = expiresAt;
    order.download_count = 0;

    return { rawToken, expiresAt };
  }

  async verifyAndDownload(rawToken: string, maxDownloads = 5) {
    const tokenHash = await hashSha256(rawToken);
    const order = this.orders.find((o) => o.download_token_hash === tokenHash);

    if (!order || order.status !== 'paid') {
      return { success: false, error: 'Invalid or unpaid token' };
    }

    if (order.download_expires_at && new Date(order.download_expires_at).getTime() < Date.now()) {
      return { success: false, error: 'Token expired' };
    }

    if (order.download_count >= maxDownloads) {
      return { success: false, error: 'Download limit exceeded' };
    }

    order.download_count += 1;
    return { success: true, downloadCount: order.download_count };
  }
}

describe('End-to-End Order & Private Download Workflow', () => {
  const db = new MockD1Database();

  it('Step 1: Buyer creates order and receives unique Order ID', () => {
    const order = db.createOrder({
      name: 'Rahim Chowdhury',
      email: 'rahim@example.com',
      phone: '01712345678',
      amount: 299,
    });

    expect(order.order_id).toMatch(/^NV-[A-Z0-9]{5}$/);
    expect(order.status).toBe('pending');
    expect(order.download_count).toBe(0);
  });

  it('Step 2 & 3: Buyer submits bKash payment details and duplicate Txn ID is prevented', () => {
    const order = db.orders[0];
    const txnId = 'BK92K47291';

    // Successful submission
    const updated = db.submitPayment(order.order_id, {
      method: 'bKash',
      payerNumber: '01712345678',
      txnId,
      proofKey: 'proofs/nv-test-123.jpg',
    });

    expect(updated.transaction_id).toBe(txnId);
    expect(updated.payment_method).toBe('bKash');

    // Attempt duplicate submission on another order should fail
    const order2 = db.createOrder({
      name: 'Another User',
      email: 'user2@example.com',
      phone: '01811111111',
      amount: 299,
    });

    expect(() => {
      db.submitPayment(order2.order_id, {
        method: 'bKash',
        payerNumber: '01811111111',
        txnId, // Same TxnID!
      });
    }).toThrow('Duplicate Transaction ID detected');
  });

  it('Step 4 & 5: Admin approves order, generates 72h token, and hashes it with SHA-256', async () => {
    const order = db.orders[0];
    const { rawToken, expiresAt } = await db.approveOrder(order.order_id, 72);

    expect(rawToken).toHaveLength(64);
    expect(order.status).toBe('paid');
    expect(order.download_token_hash).toHaveLength(64);
    expect(order.download_token_hash).not.toBe(rawToken); // Plaintext token is NEVER stored!
    expect(new Date(expiresAt).getTime()).toBeGreaterThan(Date.now());
  });

  it('Step 6: Buyer downloads PDF and download counter increments up to maximum 5', async () => {
    const order = db.orders[0];
    // Re-approve to get fresh token
    const { rawToken } = await db.approveOrder(order.order_id, 72);

    // Downloads 1 through 5 succeed
    for (let i = 1; i <= 5; i++) {
      const result = await db.verifyAndDownload(rawToken, 5);
      expect(result.success).toBe(true);
      expect(result.downloadCount).toBe(i);
    }

    // 6th download must be rejected!
    const sixthDownload = await db.verifyAndDownload(rawToken, 5);
    expect(sixthDownload.success).toBe(false);
    expect(sixthDownload.error).toBe('Download limit exceeded');
  });

  it('Step 7: Expired download tokens are rejected', async () => {
    const order = db.orders[0];
    // Approve with -1 hour expiry (already expired)
    const { rawToken } = await db.approveOrder(order.order_id, -1);

    const result = await db.verifyAndDownload(rawToken, 5);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Token expired');
  });

  it('Step 8: Invalid or forged download tokens are rejected', async () => {
    const fakeToken = '0'.repeat(64);
    const result = await db.verifyAndDownload(fakeToken, 5);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid or unpaid token');
  });

  it('Validates payment proof upload constraints (5MB max, JPG/PNG/WEBP only)', () => {
    expect(MAX_FILE_SIZE_BYTES).toBe(5 * 1024 * 1024);
    expect(ALLOWED_IMAGE_TYPES).toContain('image/jpeg');
    expect(ALLOWED_IMAGE_TYPES).toContain('image/png');
    expect(ALLOWED_IMAGE_TYPES).toContain('image/webp');
    expect(ALLOWED_IMAGE_TYPES).not.toContain('application/x-msdownload');
    expect(ALLOWED_IMAGE_TYPES).not.toContain('application/javascript');
  });
});
