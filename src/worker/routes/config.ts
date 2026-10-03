import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';

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
    },
  });
});

export { configRoute };
