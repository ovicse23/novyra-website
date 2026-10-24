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
    <loc>https://novyrabd.com/gemini-pro</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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

// Dedicated Gemini Pro Single Product Schema
const GEMINI_PRO_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://novyrabd.com/#organization",
      "name": "Novyra",
      "url": "https://novyrabd.com",
      "logo": "https://novyrabd.com/assets/logo.png",
      "slogan": "Learn. Build. Grow."
    },
    {
      "@type": "WebPage",
      "@id": "https://novyrabd.com/gemini-pro#webpage",
      "url": "https://novyrabd.com/gemini-pro",
      "name": "Gemini Pro 18 Months Personal — Novyra",
      "description": "একটি সাবস্ক্রিপশনেই আনলক করুন গুগল-এর সকল পাওয়ারফুল এআই টুলস ও ক্লাউড স্টোরেজ।",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://novyrabd.com" },
          { "@type": "ListItem", "position": 2, "name": "Gemini Pro 18 Months", "item": "https://novyrabd.com/gemini-pro" }
        ]
      }
    },
    {
      "@type": "Product",
      "@id": "https://novyrabd.com/gemini-pro#product",
      "name": "Gemini Pro 18 Months Personal",
      "description": "একটি সাবস্ক্রিপশনেই আনলক করুন গুগল-এর সকল পাওয়ারফুল এআই টুলস ও ক্লাউড স্টোরেজ। Gemini 3.1 Pro & 4 Argon (2M Tokens), ৫TB Google One ক্লাউড স্টোরেজ, Veo AI 1080p Video, Flow AI Filmmaking ও NotebookLM Pro Enhanced।",
      "image": [
        "https://novyrabd.com/assets/gemini-cover.png",
        "https://novyrabd.com/assets/logo.png"
      ],
      "sku": "NOVYRA-GEMINI-PRO-18M",
      "mpn": "NOVYRA-GEMINI-PRO-18M",
      "brand": {
        "@type": "Brand",
        "name": "Novyra"
      },
      "offers": {
        "@type": "Offer",
        "price": "399",
        "priceCurrency": "BDT",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "url": "https://novyrabd.com/gemini-pro",
        "validFrom": "2026-01-01",
        "priceValidUntil": "2027-12-31",
        "seller": {
          "@type": "Organization",
          "name": "Novyra"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "BDT"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "BD"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 0,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 0,
              "maxValue": 0,
              "unitCode": "DAY"
            }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "BD",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 14,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn",
          "url": "https://novyrabd.com/refund-policy"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "92",
        "reviewCount": "92"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Mehedi Hasan" },
          "datePublished": "2026-10-15",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "5TB Google One cloud storage activated on my personal Gmail within 10 minutes. Veo AI generates amazing 1080p video clips."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Shahriar Kabir" },
          "datePublished": "2026-10-18",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Best deal for Gemini 3.1 Pro & 4 Argon with 2M token context. Excellent support from Novyra team."
        }
      ]
    }
  ]
});

// Fallback to static assets (SPA) with SEO & Schema routing
app.all('*', async (c) => {
  if (!c.env.ASSETS) {
    return c.text('Novyra API Worker running. Static assets binding not active.', 404);
  }

  const response = await c.env.ASSETS.fetch(c.req.raw);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const url = new URL(c.req.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/gemini-pro') {
    const pageTitle = 'Gemini Pro 18 Months Personal — 5TB Google One & AI Suite | Novyra';
    const pageDescription = 'Gemini Pro 18 Months Personal: Unlock 5TB Google One Cloud Storage, Gemini 3.1 Pro & 4 Argon, Veo AI, Flow AI, and NotebookLM Pro for only ৳399 with 18 months replacement warranty.';
    const canonicalUrl = 'https://novyrabd.com/gemini-pro';
    const ogImageUrl = 'https://novyrabd.com/assets/gemini-cover.png';

    return new HTMLRewriter()
      .on('title', { element(e) { e.setInnerContent(pageTitle); } })
      .on('link[rel="canonical"]', { element(e) { e.setAttribute('href', canonicalUrl); } })
      .on('meta[name="description"]', { element(e) { e.setAttribute('content', pageDescription); } })
      .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', pageTitle); } })
      .on('meta[property="og:url"]', { element(e) { e.setAttribute('content', canonicalUrl); } })
      .on('meta[property="og:image"]', { element(e) { e.setAttribute('content', ogImageUrl); } })
      .on('meta[property="og:description"]', { element(e) { e.setAttribute('content', pageDescription); } })
      .on('meta[name="twitter:title"]', { element(e) { e.setAttribute('content', pageTitle); } })
      .on('meta[name="twitter:description"]', { element(e) { e.setAttribute('content', pageDescription); } })
      .on('meta[name="twitter:image"]', { element(e) { e.setAttribute('content', ogImageUrl); } })
      .on('script[type="application/ld+json"]', { element(e) { e.setInnerContent(GEMINI_PRO_SCHEMA, { html: true }); } })
      .transform(response);
  }

  if (pathname === '/order') {
    const pageTitle = 'Track Order & Activation Status | Novyra';
    const pageDescription = 'Track your Novyra digital playbook delivery or Gemini Pro 18 months activation status in real-time.';
    const canonicalUrl = 'https://novyrabd.com/order';

    return new HTMLRewriter()
      .on('title', { element(e) { e.setInnerContent(pageTitle); } })
      .on('link[rel="canonical"]', { element(e) { e.setAttribute('href', canonicalUrl); } })
      .on('meta[name="description"]', { element(e) { e.setAttribute('content', pageDescription); } })
      .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', pageTitle); } })
      .on('meta[property="og:url"]', { element(e) { e.setAttribute('content', canonicalUrl); } })
      .transform(response);
  }

  if (['/privacy-policy', '/terms', '/refund-policy'].includes(pathname)) {
    const canonicalUrl = `https://novyrabd.com${pathname}`;
    const titles: Record<string, string> = {
      '/privacy-policy': 'Privacy Policy | Novyra',
      '/terms': 'Terms of Service | Novyra',
      '/refund-policy': 'Refund & Replacement Policy | Novyra',
    };
    const title = titles[pathname] || 'Novyra Legal';

    return new HTMLRewriter()
      .on('title', { element(e) { e.setInnerContent(title); } })
      .on('link[rel="canonical"]', { element(e) { e.setAttribute('href', canonicalUrl); } })
      .on('meta[property="og:url"]', { element(e) { e.setAttribute('content', canonicalUrl); } })
      .transform(response);
  }

  return response;
});

export default app;
