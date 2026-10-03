import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './config.ts';
import { ordersRoute } from './routes/orders.ts';
import { adminRoute } from './routes/admin.ts';
import { downloadRoute } from './routes/download.ts';
import { configRoute } from './routes/config.ts';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for API routes
app.use('/api/*', cors({
  origin: (origin) => origin,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// API Routes
app.route('/api/orders', ordersRoute);
app.route('/api/admin', adminRoute);
app.route('/api/download', downloadRoute);
app.route('/api/config', configRoute);

app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    brand: 'Novyra',
    tagline: 'Learn. Build. Grow.',
    timestamp: new Date().toISOString(),
  });
});

// Fallback to static assets (SPA)
app.all('*', async (c) => {
  if (c.env.ASSETS) {
    return await c.env.ASSETS.fetch(c.req.raw);
  }
  return c.text('Novyra API Worker running. Static assets binding not active.', 404);
});

export default app;
