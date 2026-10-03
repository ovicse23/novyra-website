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

// SEO: robots.txt
app.get('/robots.txt', (c) => {
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /api/download

Sitemap: https://novyrabd.com/sitemap.xml
`;
  return c.text(content, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
  });
});

// SEO: sitemap.xml
app.get('/sitemap.xml', (c) => {
  const today = new Date().toISOString().split('T')[0];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://novyrabd.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://novyrabd.com/order</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://novyrabd.com/order-status</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://novyrabd.com/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://novyrabd.com/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://novyrabd.com/refund-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
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
