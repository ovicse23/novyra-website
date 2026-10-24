import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';
import { PRODUCTS, BUNDLE_PRODUCT, GEMINI_PRO_PRODUCT } from '../../shared/products.ts';
import { getGeminiStock } from '../services/db.ts';

const configRoute = new Hono<{ Bindings: Env }>();

configRoute.get('/', async (c) => {
  const cfg = getConfig(c.env);
  const geminiStock = await getGeminiStock(c.env.DB);

  return c.json({
    success: true,
    config: {
      productSlug: 'ai-client-hunting-toolkit',
      productName: 'AI Client Hunting + Freelancing Toolkit',
      productPrice: cfg.productPrice,
      regularPrice: cfg.regularPrice,
      currency: 'BDT',
      bkashNumber: cfg.bkashNumber,
      rocketNumber: cfg.rocketNumber,
      downloadExpiryHours: cfg.downloadExpiryHours,
      maxDownloads: cfg.maxDownloads,
      supportHoursMsg: cfg.supportHoursMsg,
      turnstileSiteKey: cfg.turnstileSiteKey,
      metaPixelId: cfg.metaPixelId,
      ga4MeasurementId: cfg.ga4MeasurementId,
      geminiStock,
      products: PRODUCTS.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        price: p.price,
        regularPrice: p.regularPrice,
        pages: p.pages,
        badge: p.badge,
      })),
      bundle: {
        id: BUNDLE_PRODUCT.id,
        slug: BUNDLE_PRODUCT.slug,
        title: BUNDLE_PRODUCT.title,
        price: BUNDLE_PRODUCT.price,
        regularPrice: BUNDLE_PRODUCT.regularPrice,
        pages: BUNDLE_PRODUCT.pages,
        badge: BUNDLE_PRODUCT.badge,
      },
      geminiPro: {
        id: GEMINI_PRO_PRODUCT.id,
        slug: GEMINI_PRO_PRODUCT.slug,
        title: GEMINI_PRO_PRODUCT.title,
        price: GEMINI_PRO_PRODUCT.price,
        regularPrice: GEMINI_PRO_PRODUCT.regularPrice,
        duration: GEMINI_PRO_PRODUCT.duration,
        storage: GEMINI_PRO_PRODUCT.storage,
        badge: GEMINI_PRO_PRODUCT.badge,
      },
    },
  });
});

export { configRoute };
