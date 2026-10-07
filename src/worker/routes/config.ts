import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';
import { PRODUCTS, BUNDLE_PRODUCT } from '../../shared/products.ts';

const configRoute = new Hono<{ Bindings: Env }>();

configRoute.get('/', (c) => {
  const cfg = getConfig(c.env);
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
    },
  });
});

export { configRoute };
