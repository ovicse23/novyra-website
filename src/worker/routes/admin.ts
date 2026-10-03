import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  generateSecureToken,
  hashSha256,
} from '../services/security.ts';
import {
  getAdminStats,
  getOrders,
  getOrderByOrderId,
  approveOrder,
  rejectOrder,
} from '../services/db.ts';
import { getPaymentProof } from '../services/storage.ts';

const adminRoute = new Hono<{ Bindings: Env }>();

// Auth Helper
async function checkAdminAuth(c: any): Promise<boolean> {
  const config = getConfig(c.env);
  
  // 1. Check Cloudflare Access header if deployed behind Cloudflare Access
  const cfAccessEmail = c.req.header('cf-access-authenticated-user-email');
  if (cfAccessEmail) {
    return true;
  }

  // 2. Check Cookie
  const cookieHeader = c.req.header('cookie') || '';
  const match = cookieHeader.match(/novyra_admin_session=([^;]+)/);
  const token = match ? match[1] : undefined;

  return await verifyAdminSessionToken(token, config.adminPassword);
}

// 1. Admin Login
adminRoute.post('/login', async (c) => {
  const config = getConfig(c.env);
  const body = await c.req.json();
  const password = body.password;

  if (!password || password !== config.adminPassword) {
    return c.json({ success: false, error: 'Invalid admin credentials' }, 401);
  }

  const sessionToken = await createAdminSessionToken(config.adminPassword);
  const isProd = config.environment === 'production';
  const cookieValue = `novyra_admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 86400}${isProd ? '; Secure' : ''}`;

  c.header('Set-Cookie', cookieValue);
  return c.json({ success: true, message: 'Logged in successfully' });
});

// 2. Admin Logout
adminRoute.post('/logout', async (c) => {
  c.header('Set-Cookie', 'novyra_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return c.json({ success: true, message: 'Logged out' });
});

// 3. Admin Check Me
adminRoute.get('/me', async (c) => {
  const isAuth = await checkAdminAuth(c);
  return c.json({ authenticated: isAuth });
});

// Middleware for protected admin routes
adminRoute.use('/*', async (c, next) => {
  if (c.req.path.endsWith('/login') || c.req.path.endsWith('/logout') || c.req.path.endsWith('/me')) {
    return await next();
  }

  const isAuth = await checkAdminAuth(c);
  if (!isAuth) {
    return c.json({ success: false, error: 'Unauthorized. Please login.' }, 401);
  }

  return await next();
});

// 4. Get Admin Dashboard Stats & Orders
adminRoute.get('/orders', async (c) => {
  const search = c.req.query('search');
  const status = c.req.query('status');
  const limit = c.req.query('limit') ? parseInt(c.req.query('limit')!, 10) : 100;
  const offset = c.req.query('offset') ? parseInt(c.req.query('offset')!, 10) : 0;

  const [stats, orders] = await Promise.all([
    getAdminStats(c.env.DB),
    getOrders(c.env.DB, { search, status, limit, offset }),
  ]);

  return c.json({
    success: true,
    stats,
    orders,
  });
});

// 5. Approve Order
adminRoute.post('/orders/:orderId/approve', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();
  const config = getConfig(c.env);

  const order = await getOrderByOrderId(c.env.DB, orderId);
  if (!order) {
    return c.json({ success: false, error: 'Order not found' }, 404);
  }

  // Generate cryptographically secure download token (32 bytes random entropy)
  const rawToken = generateSecureToken(32);
  const tokenHash = await hashSha256(rawToken);

  // Expiration: 72 hours from approval
  const expiryDate = new Date(Date.now() + config.downloadExpiryHours * 60 * 60 * 1000);
  const expiresAtIso = expiryDate.toISOString();

  const approved = await approveOrder(c.env.DB, orderId, tokenHash, expiresAtIso);
  if (!approved) {
    return c.json({ success: false, error: 'Failed to update order to approved.' }, 500);
  }

  const downloadUrl = `${config.siteUrl}/api/download/${rawToken}`;

  return c.json({
    success: true,
    message: `Order ${orderId} approved successfully.`,
    download_token: rawToken,
    download_url: downloadUrl,
    download_expires_at: expiresAtIso,
  });
});

// 6. Reject Order
adminRoute.post('/orders/:orderId/reject', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();

  const order = await getOrderByOrderId(c.env.DB, orderId);
  if (!order) {
    return c.json({ success: false, error: 'Order not found' }, 404);
  }

  const rejected = await rejectOrder(c.env.DB, orderId);
  if (!rejected) {
    return c.json({ success: false, error: 'Failed to update order to rejected.' }, 500);
  }

  return c.json({
    success: true,
    message: `Order ${orderId} has been marked as rejected.`,
  });
});

// 7. View Payment Proof Screenshot
adminRoute.get('/proof/:orderId', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();
  const order = await getOrderByOrderId(c.env.DB, orderId);

  if (!order || !order.payment_proof_key) {
    return c.text('Screenshot not found for this order.', 404);
  }

  const file = await getPaymentProof(c.env.PRIVATE_FILES, order.payment_proof_key);
  if (!file || !file.body) {
    return c.text('Proof file could not be read from storage.', 404);
  }

  return new Response(file.body as any, {
    headers: {
      'Content-Type': file.contentType,
      'Cache-Control': 'private, max-age=3600',
    },
  });
});

export { adminRoute };
