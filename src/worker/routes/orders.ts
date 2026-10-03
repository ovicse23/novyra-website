import { Hono } from 'hono';
import type { Env } from '../config.ts';
import { getConfig } from '../config.ts';
import {
  generateOrderId,
  sanitizeString,
  isValidEmail,
  isValidPhone,
  verifyTurnstileToken,
} from '../services/security.ts';
import {
  createOrder,
  getOrderByOrderId,
  checkTransactionIdExists,
  updateOrderPayment,
  incrementDownloadCount,
} from '../services/db.ts';
import { uploadPaymentProof, getProductPdf } from '../services/storage.ts';
import type { PaymentMethod } from '../../shared/types.ts';

const ordersRoute = new Hono<{ Bindings: Env }>();

// 1. Create Order
ordersRoute.post('/', async (c) => {
  const config = getConfig(c.env);
  let body: any;
  try {
    body = await c.req.json();
  } catch (e) {
    return c.json({ success: false, error: 'Invalid JSON request payload' }, 400);
  }

  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 150).toLowerCase();
  const phone = sanitizeString(body.phone, 30);

  if (!name || name.length < 2) {
    return c.json({ success: false, error: 'Please enter a valid full name.' }, 400);
  }
  if (!isValidEmail(email)) {
    return c.json({ success: false, error: 'Please enter a valid email address.' }, 400);
  }
  if (!isValidPhone(phone)) {
    return c.json({ success: false, error: 'Please enter a valid mobile number (e.g. 017xxxxxxxx).' }, 400);
  }

  // Generate unique order ID
  let orderId = generateOrderId();
  let attempts = 0;
  while (attempts < 5) {
    const existing = await getOrderByOrderId(c.env.DB, orderId);
    if (!existing) break;
    orderId = generateOrderId();
    attempts++;
  }

  try {
    const order = await createOrder(c.env.DB, {
      order_id: orderId,
      name,
      email,
      phone,
      product_id: 'ai-client-hunting-toolkit',
      amount: config.productPrice,
      currency: 'BDT',
      utm_source: sanitizeString(body.utm_source, 100),
      utm_medium: sanitizeString(body.utm_medium, 100),
      utm_campaign: sanitizeString(body.utm_campaign, 100),
      utm_content: sanitizeString(body.utm_content, 100),
      utm_term: sanitizeString(body.utm_term, 100),
      fbclid: sanitizeString(body.fbclid, 150),
    });

    return c.json({
      success: true,
      order_id: order.order_id,
      amount: config.productPrice,
      currency: 'BDT',
      bkash_number: config.bkashNumber,
      rocket_number: config.rocketNumber,
      message: 'Order created successfully. Please complete manual payment.',
    });
  } catch (err: any) {
    return c.json({ success: false, error: `Database error: ${err.message}` }, 500);
  }
});

// 2. Submit Payment Details & Proof
ordersRoute.post('/:orderId/payment', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();
  const config = getConfig(c.env);

  const existingOrder = await getOrderByOrderId(c.env.DB, orderId);
  if (!existingOrder) {
    return c.json({ success: false, error: 'Order not found.' }, 404);
  }

  let paymentMethod: PaymentMethod = 'bKash';
  let payerNumber = '';
  let transactionId = '';
  let turnstileToken = '';
  let screenshotFile: File | null = null;

  const contentType = c.req.header('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const form = await c.req.formData();
    paymentMethod = (form.get('payment_method') as string)?.toLowerCase() === 'rocket' ? 'Rocket' : 'bKash';
    payerNumber = sanitizeString(form.get('payer_number'), 30);
    transactionId = sanitizeString(form.get('transaction_id'), 100).toUpperCase().replace(/\s+/g, '');
    turnstileToken = sanitizeString(form.get('turnstile_token'), 2048);
    const file = form.get('screenshot');
    if (file && typeof file === 'object' && 'size' in file && (file as File).size > 0) {
      screenshotFile = file as File;
    }
  } else {
    const json = await c.req.json();
    paymentMethod = json.payment_method?.toLowerCase() === 'rocket' ? 'Rocket' : 'bKash';
    payerNumber = sanitizeString(json.payer_number, 30);
    transactionId = sanitizeString(json.transaction_id, 100).toUpperCase().replace(/\s+/g, '');
    turnstileToken = sanitizeString(json.turnstile_token, 2048);
  }

  if (!payerNumber || !isValidPhone(payerNumber)) {
    return c.json({ success: false, error: 'Please enter the bKash/Rocket account number you paid from.' }, 400);
  }
  if (!transactionId || transactionId.length < 6) {
    return c.json({ success: false, error: 'Please enter a valid Transaction ID (TxnID) from your bKash/Rocket SMS.' }, 400);
  }

  // Turnstile verification
  const clientIp = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip');
  const turnstileCheck = await verifyTurnstileToken(turnstileToken, config.turnstileSecretKey, clientIp);
  if (!turnstileCheck.success) {
    return c.json({ success: false, error: turnstileCheck.error || 'Spam verification failed. Please try again.' }, 400);
  }

  // Check duplicate transaction ID
  const isDuplicate = await checkTransactionIdExists(c.env.DB, transactionId, orderId);
  if (isDuplicate) {
    return c.json({
      success: false,
      error: 'This Transaction ID has already been recorded in our system. If this is an error, please contact Novyra support.',
    }, 400);
  }

  // Handle optional screenshot upload to R2
  let paymentProofKey: string | null = null;
  if (screenshotFile) {
    try {
      paymentProofKey = await uploadPaymentProof(c.env.PRIVATE_FILES, orderId, screenshotFile);
    } catch (uploadErr: any) {
      return c.json({ success: false, error: uploadErr.message }, 400);
    }
  }

  const updated = await updateOrderPayment(c.env.DB, orderId, {
    payment_method: paymentMethod,
    payer_number: payerNumber,
    transaction_id: transactionId,
    payment_proof_key: paymentProofKey,
  });

  if (!updated) {
    return c.json({ success: false, error: 'Failed to update order payment.' }, 500);
  }

  return c.json({
    success: true,
    order_id: orderId,
    status: 'pending',
    message: 'Payment information received. We will verify your transaction shortly.',
  });
});

// 3. Lookup Order Status
ordersRoute.get('/:orderId', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();
  const config = getConfig(c.env);

  const order = await getOrderByOrderId(c.env.DB, orderId);
  if (!order) {
    return c.json({ success: false, error: 'Order not found.' }, 404);
  }

  // Check optional verification parameter if passed for privacy
  const verifyParam = c.req.query('verify')?.trim().toLowerCase();
  if (verifyParam) {
    const isPhoneMatch = order.phone.replace(/[\s\-\+]/g, '').endsWith(verifyParam.replace(/[\s\-\+]/g, ''));
    const isEmailMatch = order.email.toLowerCase() === verifyParam;
    if (!isPhoneMatch && !isEmailMatch) {
      return c.json({ success: false, error: 'Order verification mismatch.' }, 403);
    }
  }

  // If approved and paid, prepare secure download url info
  let downloadUrl: string | undefined;
  if (order.status === 'paid' && order.download_token_hash) {
    // If client is already authorized by order ID, we can provide the download path or token
    // The download token hash is in DB, and for approved orders we can generate or return access
    downloadUrl = `/api/orders/${order.order_id}/download-access`;
  }

  return c.json({
    success: true,
    order: {
      order_id: order.order_id,
      name: order.name,
      product_name: 'AI Client Hunting + Freelancing Toolkit',
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      payment_method: order.payment_method,
      payer_number: order.payer_number ? `${order.payer_number.slice(0, 4)}****${order.payer_number.slice(-3)}` : null,
      transaction_id: order.transaction_id,
      created_at: order.created_at,
      approved_at: order.approved_at,
      download_url: downloadUrl,
      download_expires_at: order.download_expires_at,
      download_count: order.download_count,
      max_downloads: config.maxDownloads,
      has_proof_screenshot: !!order.payment_proof_key,
    },
  });
});

// 4. Download PDF for Approved Order (used by OrderStatusPage button)
ordersRoute.get('/:orderId/download-access', async (c) => {
  const orderId = c.req.param('orderId').toUpperCase();
  const config = getConfig(c.env);

  const order = await getOrderByOrderId(c.env.DB, orderId);
  if (!order) {
    return c.text('Order not found.', 404);
  }

  if (order.status !== 'paid') {
    return c.text('Payment verification required before downloading. Please check your order status.', 403);
  }

  // Check expiration (72 hours from approval)
  if (order.download_expires_at) {
    const expiresAt = new Date(order.download_expires_at).getTime();
    if (Date.now() > expiresAt) {
      return c.text(`This download link expired after ${config.downloadExpiryHours} hours. Please contact Novyra support.`, 403);
    }
  }

  // Check download count limit
  if (order.download_count >= config.maxDownloads) {
    return c.text(`Download limit of ${config.maxDownloads} downloads reached for this order.`, 403);
  }

  // Fetch PDF from Cloudflare R2
  const pdfFile = await getProductPdf(c.env.PRIVATE_FILES, config.r2ProductKey);
  if (!pdfFile || !pdfFile.body) {
    return c.text('PDF file is temporarily unavailable in storage. Please contact support.', 500);
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

export { ordersRoute };

