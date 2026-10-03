import { describe, it, expect } from 'vitest';
import {
  hashSha256,
  generateSecureToken,
  generateOrderId,
  createAdminSessionToken,
  verifyAdminSessionToken,
  isValidEmail,
  isValidPhone,
  sanitizeString,
} from '../../src/worker/services/security';

describe('Security Utilities', () => {
  it('computes correct SHA-256 hash', async () => {
    const input = 'novyra-secret-test';
    const hash = await hashSha256(input);
    expect(hash).toBeDefined();
    expect(hash).toHaveLength(64); // 256 bits = 64 hex characters
    // Hash is deterministic
    const hash2 = await hashSha256(input);
    expect(hash).toBe(hash2);
  });

  it('generates cryptographically secure tokens with required length', () => {
    const token1 = generateSecureToken(32);
    const token2 = generateSecureToken(32);
    expect(token1).toHaveLength(64); // 32 bytes = 64 hex chars
    expect(token2).toHaveLength(64);
    expect(token1).not.toBe(token2);
  });

  it('generates valid Order IDs in NV-XXXXX format', () => {
    const orderId = generateOrderId();
    expect(orderId).toMatch(/^NV-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{5}$/);
  });

  it('creates and verifies Admin session tokens with HMAC signature', async () => {
    const password = 'my-super-secret-admin-pass';
    const token = await createAdminSessionToken(password);
    expect(token).toContain('.');

    // Valid verification
    const isValid = await verifyAdminSessionToken(token, password);
    expect(isValid).toBe(true);

    // Wrong password fails
    const isInvalidPass = await verifyAdminSessionToken(token, 'wrong-password');
    expect(isInvalidPass).toBe(false);

    // Tampered token fails
    const tampered = token.slice(0, -4) + 'abcd';
    const isTampered = await verifyAdminSessionToken(tampered, password);
    expect(isTampered).toBe(false);

    // Empty token fails
    expect(await verifyAdminSessionToken(undefined, password)).toBe(false);
  });

  it('validates email addresses properly', () => {
    expect(isValidEmail('tanvir@gmail.com')).toBe(true);
    expect(isValidEmail('client.hunting@novyra.com.bd')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
  });

  it('validates Bangladesh mobile numbers properly', () => {
    expect(isValidPhone('01712345678')).toBe(true);
    expect(isValidPhone('+8801712345678')).toBe(true);
    expect(isValidPhone('01638002708')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });

  it('sanitizes strings properly', () => {
    expect(sanitizeString('   hello world   ')).toBe('hello world');
    expect(sanitizeString('a'.repeat(300), 50)).toHaveLength(50);
    expect(sanitizeString(null)).toBe('');
  });
});
