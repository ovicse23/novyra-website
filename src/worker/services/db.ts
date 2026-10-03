import type { Order, AdminStats, OrderStatus, PaymentMethod } from '../../shared/types.ts';

export async function createOrder(
  db: D1Database,
  data: {
    order_id: string;
    name: string;
    email: string;
    phone: string;
    product_id: string;
    amount: number;
    currency: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    fbclid?: string;
  }
): Promise<Order> {
  const query = `
    INSERT INTO orders (
      order_id, name, email, phone, product_id, amount, currency,
      status, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid,
      created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      'pending', ?, ?, ?, ?, ?, ?,
      datetime('now'), datetime('now')
    ) RETURNING *;
  `;

  const result = await db.prepare(query).bind(
    data.order_id,
    data.name,
    data.email,
    data.phone,
    data.product_id,
    data.amount,
    data.currency,
    data.utm_source || null,
    data.utm_medium || null,
    data.utm_campaign || null,
    data.utm_content || null,
    data.utm_term || null,
    data.fbclid || null
  ).first<Order>();

  if (!result) {
    throw new Error('Failed to create order in database');
  }
  return result;
}

export async function getOrderByOrderId(db: D1Database, orderId: string): Promise<Order | null> {
  return await db
    .prepare('SELECT * FROM orders WHERE order_id = ? LIMIT 1')
    .bind(orderId.trim().toUpperCase())
    .first<Order>();
}

export async function checkTransactionIdExists(
  db: D1Database,
  transactionId: string,
  excludeOrderId?: string
): Promise<boolean> {
  let query = 'SELECT id FROM orders WHERE transaction_id = ?';
  const binds: any[] = [transactionId.trim()];

  if (excludeOrderId) {
    query += ' AND order_id != ?';
    binds.push(excludeOrderId);
  }

  const result = await db.prepare(query).bind(...binds).first();
  return !!result;
}

export async function updateOrderPayment(
  db: D1Database,
  orderId: string,
  data: {
    payment_method: PaymentMethod;
    payer_number: string;
    transaction_id: string;
    payment_proof_key?: string | null;
  }
): Promise<boolean> {
  const query = `
    UPDATE orders
    SET payment_method = ?,
        payer_number = ?,
        transaction_id = ?,
        payment_proof_key = COALESCE(?, payment_proof_key),
        status = 'pending',
        updated_at = datetime('now')
    WHERE order_id = ?
  `;

  const res = await db.prepare(query).bind(
    data.payment_method,
    data.payer_number,
    data.transaction_id,
    data.payment_proof_key || null,
    orderId
  ).run();

  return res.success;
}

export async function approveOrder(
  db: D1Database,
  orderId: string,
  tokenHash: string,
  expiresAtIso: string
): Promise<boolean> {
  const query = `
    UPDATE orders
    SET status = 'paid',
        download_token_hash = ?,
        download_expires_at = ?,
        download_count = 0,
        approved_at = datetime('now'),
        updated_at = datetime('now')
    WHERE order_id = ?
  `;

  const res = await db.prepare(query).bind(
    tokenHash,
    expiresAtIso,
    orderId
  ).run();

  return res.success;
}

export async function rejectOrder(db: D1Database, orderId: string): Promise<boolean> {
  const query = `
    UPDATE orders
    SET status = 'rejected',
        updated_at = datetime('now')
    WHERE order_id = ?
  `;

  const res = await db.prepare(query).bind(orderId).run();
  return res.success;
}

export async function getOrderByTokenHash(db: D1Database, tokenHash: string): Promise<Order | null> {
  return await db
    .prepare('SELECT * FROM orders WHERE download_token_hash = ? LIMIT 1')
    .bind(tokenHash)
    .first<Order>();
}

export async function incrementDownloadCount(db: D1Database, orderId: string): Promise<number> {
  const query = `
    UPDATE orders
    SET download_count = download_count + 1,
        updated_at = datetime('now')
    WHERE order_id = ?
    RETURNING download_count;
  `;

  const res = await db.prepare(query).bind(orderId).first<{ download_count: number }>();
  return res?.download_count ?? 1;
}

export async function getAdminStats(db: D1Database): Promise<AdminStats> {
  const statsQuery = `
    SELECT
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pendingOrders,
      COUNT(CASE WHEN status = 'paid' THEN 1 END) as approvedOrders,
      COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejectedOrders,
      COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as totalRevenue,
      COUNT(CASE WHEN date(created_at) = date('now') THEN 1 END) as ordersToday
    FROM orders;
  `;

  const res = await db.prepare(statsQuery).first<AdminStats>();
  return {
    pendingOrders: res?.pendingOrders || 0,
    approvedOrders: res?.approvedOrders || 0,
    rejectedOrders: res?.rejectedOrders || 0,
    totalRevenue: res?.totalRevenue || 0,
    ordersToday: res?.ordersToday || 0,
  };
}

export async function getOrders(
  db: D1Database,
  options: { search?: string; status?: string; limit?: number; offset?: number } = {}
): Promise<Order[]> {
  const limit = options.limit || 50;
  const offset = options.offset || 0;

  let query = 'SELECT * FROM orders WHERE 1=1';
  const binds: any[] = [];

  if (options.status && options.status !== 'all') {
    query += ' AND status = ?';
    binds.push(options.status);
  }

  if (options.search && options.search.trim() !== '') {
    const s = `%${options.search.trim()}%`;
    query += ` AND (
      order_id LIKE ? OR
      name LIKE ? OR
      email LIKE ? OR
      phone LIKE ? OR
      payer_number LIKE ? OR
      transaction_id LIKE ?
    )`;
    binds.push(s, s, s, s, s, s);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const res = await db.prepare(query).bind(...binds).all<Order>();
  return res.results || [];
}
