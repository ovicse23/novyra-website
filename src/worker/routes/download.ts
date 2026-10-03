import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';
import { hashSha256 } from '../services/security.ts';
import {
  getOrderByTokenHash,
  incrementDownloadCount,
  getOrderByOrderId,
} from '../services/db.ts';
import { getProductPdf } from '../services/storage.ts';

const downloadRoute = new Hono<{ Bindings: Env }>();

function renderFriendlyErrorHtml(title: string, message: string, supportInfo: string): Response {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Novyra</title>
  <style>
    body {
      background-color: #070B17;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .card {
      background: #0B1220;
      border: 1px solid #1E293B;
      border-radius: 1rem;
      padding: 2.5rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      color: #22D3EE;
      margin: 0 0 1rem 0;
    }
    p {
      color: #CBD5E1;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .support {
      background: #111827;
      border: 1px solid #334155;
      padding: 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: #94A3B8;
    }
    .btn {
      display: inline-block;
      margin-top: 1.5rem;
      background: #3B82F6;
      color: white;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #2563EB;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">⚠️</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <div class="support">${supportInfo}</div>
    <a href="/" class="btn">Return to Home</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

// 1. Secure Token Download Endpoint
downloadRoute.get('/:token', async (c) => {
  const rawToken = c.req.param('token');
  const config = getConfig(c.env);

  if (!rawToken || rawToken.length < 16) {
    return renderFriendlyErrorHtml(
      'Invalid Download Link',
      'The download link provided is invalid or corrupted.',
      'If you recently purchased the toolkit, please check your Order Status page or contact Novyra support with your Order ID.'
    );
  }

  const tokenHash = await hashSha256(rawToken);
  const order = await getOrderByTokenHash(c.env.DB, tokenHash);

  if (!order || order.status !== 'paid') {
    return renderFriendlyErrorHtml(
      'Access Not Found',
      'This download token does not correspond to an approved purchase.',
      'Payments require manual verification. Please check your order status to confirm if your transaction has been approved.'
    );
  }

  // Check expiration
  if (order.download_expires_at) {
    const expiresAt = new Date(order.download_expires_at).getTime();
    if (Date.now() > expiresAt) {
      return renderFriendlyErrorHtml(
        'Download Link Expired',
        `This download link expired after ${config.downloadExpiryHours} hours for security reasons.`,
        `Order ID: ${order.order_id}. Please contact Novyra support to request a link reset.`
      );
    }
  }

  // Check download count limit
  if (order.download_count >= config.maxDownloads) {
    return renderFriendlyErrorHtml(
      'Download Limit Reached',
      `You have reached the maximum allowed downloads (${config.maxDownloads} downloads) for this order.`,
      `Order ID: ${order.order_id}. If you accidentally lost your downloaded PDF file, please reach out to Novyra support with your Order ID.`
    );
  }

  // Fetch PDF from R2 Private Bucket
  const pdfFile = await getProductPdf(c.env.PRIVATE_FILES, config.r2ProductKey);
  if (!pdfFile || !pdfFile.body) {
    return renderFriendlyErrorHtml(
      'PDF Temporarily Unavailable',
      'The digital product file is currently being synchronized in secure storage.',
      `Order ID: ${order.order_id}. Please try again in 5 minutes or contact support.`
    );
  }

  // Increment download counter in D1
  await incrementDownloadCount(c.env.DB, order.order_id);

  return new Response(pdfFile.body as any, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Novyra-AI-Client-Hunting-Toolkit.pdf"',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
});

export { downloadRoute };
