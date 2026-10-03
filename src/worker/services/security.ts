// Cryptographic security utilities for Novyra Worker

export async function hashSha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSecureToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateOrderId(): string {
  // Format: NV- + 5 random uppercase alphanumeric chars (excluding confusing characters like 0, O, 1, I)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  let id = 'NV-';
  for (let i = 0; i < 5; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

// HMAC-SHA256 cookie signing for Admin session
export async function createAdminSessionToken(adminPassword: string): Promise<string> {
  const timestamp = Date.now();
  const payload = `admin:${timestamp}`;
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(adminPassword),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  return `${btoa(payload)}.${signatureHex}`;
}

export async function verifyAdminSessionToken(token: string | undefined, adminPassword: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [b64Payload, signatureHex] = parts;
  try {
    const payload = atob(b64Payload);
    const [user, timeStr] = payload.split(':');
    if (user !== 'admin') return false;
    
    const timestamp = parseInt(timeStr, 10);
    // 7 days expiration for admin cookie
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if (isNaN(timestamp) || Date.now() - timestamp > sevenDaysMs) {
      return false;
    }
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(adminPassword),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Parse hex signature back to Uint8Array
    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );
    
    return await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payload));
  } catch (err) {
    return false;
  }
}

// Turnstile token verification
export async function verifyTurnstileToken(
  token: string | undefined,
  secretKey: string | undefined,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  // If no secret key is set, bypass (useful for local development)
  if (!secretKey || secretKey.trim() === '') {
    return { success: true };
  }
  
  if (!token) {
    return { success: false, error: 'Turnstile verification token missing' };
  }
  
  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }
    
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    
    const outcome = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!outcome.success) {
      return {
        success: false,
        error: outcome['error-codes']?.join(', ') || 'Turnstile verification failed',
      };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: `Verification network error: ${err.message}` };
  }
}

// Validation helpers
export function sanitizeString(val: unknown, maxLen = 255): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
}

export function isValidPhone(phone: string): boolean {
  // Bangladesh phone formats (e.g. 017..., +88017..., 88017...)
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}
