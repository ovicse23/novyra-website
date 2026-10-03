export interface Env {
  DB: D1Database;
  PRIVATE_FILES: R2Bucket;
  ASSETS?: Fetcher;
  
  ENVIRONMENT?: string;
  SITE_URL?: string;
  
  // Payment numbers & pricing
  BKASH_NUMBER?: string;
  ROCKET_NUMBER?: string;
  PRODUCT_PRICE?: string;
  
  // Expiry & limits
  DOWNLOAD_EXPIRY_HOURS?: string;
  MAX_DOWNLOADS?: string;
  SUPPORT_HOURS_MSG?: string;
  
  // Admin password
  ADMIN_PASSWORD?: string;
  
  // Spam & Analytics
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  META_PIXEL_ID?: string;
  GA4_MEASUREMENT_ID?: string;
}

export function getConfig(env: Env) {
  return {
    environment: env.ENVIRONMENT || 'development',
    siteUrl: env.SITE_URL || 'http://localhost:3000',
    bkashNumber: env.BKASH_NUMBER || '01638002708',
    rocketNumber: env.ROCKET_NUMBER || '016380027089',
    productPrice: Number(env.PRODUCT_PRICE || '299'),
    regularPrice: 699,
    downloadExpiryHours: Number(env.DOWNLOAD_EXPIRY_HOURS || '72'),
    maxDownloads: Number(env.MAX_DOWNLOADS || '5'),
    supportHoursMsg: env.SUPPORT_HOURS_MSG || 'Normally within 5–30 minutes during support hours.',
    adminPassword: env.ADMIN_PASSWORD || 'admin-secret-novyra-2026',
    turnstileSiteKey: env.TURNSTILE_SITE_KEY || '',
    turnstileSecretKey: env.TURNSTILE_SECRET_KEY || '',
    metaPixelId: env.META_PIXEL_ID || '',
    ga4MeasurementId: env.GA4_MEASUREMENT_ID || '',
    r2ProductKey: 'products/novyra-ai-client-hunting-toolkit.pdf',
  };
}
