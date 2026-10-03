# Novyra — AI Client Hunting + Freelancing Toolkit Sales Website

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](https://novyra.com)
[![Stack](https://img.shields.io/badge/Stack-Cloudflare%20Workers%20%7C%20React%20%7C%20D1%20%7C%20R2-blue)](https://developers.cloudflare.com)
[![License](https://img.shields.io/badge/License-Proprietary-purple)](https://novyra.com/terms)

A production-ready, conversion-focused e-commerce sales platform designed for selling the **AI Client Hunting + Freelancing Toolkit** (40-page digital PDF) in Bangladesh.

The platform provides a complete manual bKash and Rocket payment workflow, automated duplicate transaction fraud prevention, Cloudflare Turnstile spam protection, an administrative verification dashboard, and private, cryptographically secure expiring PDF delivery directly from Cloudflare R2.

---

## Architecture Overview

```
                      +------------------------------------------+
                      |         Meta Ad / UTM Campaign           |
                      +------------------------------------------+
                                           |
                                           v
+----------------------------------------------------------------------------------+
|                              Cloudflare Workers & Pages                          |
|                                                                                  |
|   +-----------------------+     +------------------------+                       |
|   |  Landing Page (React) | --> | Checkout Modal Wizard  |                       |
|   |  - Hero & BD Copy     |     | - Step 1: Info (NV-ID) |                       |
|   |  - 12 Module Cards    |     | - Step 2: bKash/Rocket |                       |
|   |  - 6 PDF Previews     |     | - Step 3: Txn & Proof  |                       |
|   +-----------------------+     +------------------------+                       |
|                                              |                                   |
|                                              v                                   |
|   +--------------------------------------------------------------------------+   |
|   |                       Cloudflare Worker API (Hono)                       |   |
|   |  POST /api/orders             -> Generates NV-XXXXX & records UTMs       |   |
|   |  POST /api/orders/:id/payment -> Validates Txn ID & saves proof to R2    |   |
|   |  GET  /api/orders/:id         -> Customer order status & download info   |   |
|   |  POST /api/admin/orders/:id/approve -> Generates 72h SHA-256 token       |   |
|   |  GET  /api/download/:token    -> Validates hash/expiry & streams PDF     |   |
|   +--------------------------------------------------------------------------+   |
|            |                                              |                      |
|            v                                              v                      |
|   +-------------------+                         +--------------------+           |
|   |   Cloudflare D1   |                         |   Cloudflare R2    |           |
|   |  - orders table   |                         |  - products/ (PDF) |           |
|   |  - products table |                         |  - proofs/ (JPG)   |           |
|   +-------------------+                         +--------------------+           |
+----------------------------------------------------------------------------------+
```

---

## Key Features

1. **Conversion-Optimized Landing Page**:
   - Modern dark SaaS design (`#070B17`, `#0B1220`, cyan `#22D3EE`, electric blue `#3B82F6`, violet `#7C3AED`).
   - Natural Bangla + English hybrid copy tailored for Bangladesh freelancers.
   - Genuine 6-page interactive PDF preview slider with blurred proprietary teaser sections.
   - Sticky mobile purchase button (`Get Toolkit — ৳299`).
   - Accessible WCAG 2.2 AA compliant modal dialogs with 16px+ inputs for iOS Safari.

2. **Complete 4-Step Payment Workflow**:
   - **Step 1: Order Creation**: Generates collision-free Order ID (e.g. `NV-10482`), captures UTM parameters & `fbclid`.
   - **Step 2: Payment Instructions**: bKash (`01638002708`) and Rocket (`016380027089`) tabs with instant copy buttons and strict security warnings (never ask for PIN/OTP).
   - **Step 3: Proof Submission**: Captures sender mobile number, SMS Transaction ID, and optional receipt screenshot (validated up to 5MB, JPG/PNG/WEBP only).
   - **Step 4: Real-time Status**: Customer order status page (`/order/NV-XXXXX`) with live verification status.

3. **Admin Verification Dashboard (`/admin`)**:
   - Protected with `ADMIN_PASSWORD` (secure HttpOnly HMAC cookie or Cloudflare Access).
   - Real-time counters: Pending Orders, Approved Orders, Rejected Orders, Revenue, Orders Today.
   - Search & filter by Order ID, Transaction ID, Phone Number, Email, and Status.
   - One-click **Approve** and **Reject** buttons.
   - Built-in payment screenshot viewer modal.

4. **Private, Expiring PDF Delivery**:
   - The PDF product is **NEVER** exposed as a public URL (`/pdf/toolkit.pdf`).
   - Stored in a private Cloudflare R2 bucket (`products/novyra-ai-client-hunting-toolkit.pdf`).
   - Accessible exclusively via `/api/download/:token`.
   - Generates 32 bytes of cryptographic entropy (`crypto.getRandomValues`) and stores only the SHA-256 hash in D1.
   - Automatically expires after **72 hours** and strictly enforces a **5-download limit**.

5. **Marketing & Conversion Tracking**:
   - **Meta Pixel**: `PageView`, `ViewContent`, `InitiateCheckout`, and `Purchase` (fired only when payment is verified and approved!).
   - **GA4**: `view_item`, `select_item`, `begin_checkout`, `payment_instructions_viewed`, `payment_proof_submitted`, `purchase`, `file_download`.
   - **UTM Persistence**: Stores `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `fbclid` across the customer checkout journey.

---

## 1. Local Setup

### Prerequisites
- Node.js 20+ installed
- pnpm or npm

```bash
# Clone the repository
cd "Novyra Website"

# Link local dependencies
node scripts/setup-deps.mjs

# Run automated unit and workflow test suites
npm run test

# Run frontend build
npm run build
```

---

## 2. Cloudflare Setup

Login to your Cloudflare account using Wrangler CLI:

```bash
npx wrangler login
```

---

## 3. Cloudflare D1 Database Creation

Create your production D1 database:

```bash
npx wrangler d1 create novyra-db
```

This will print your `database_id`. Update `wrangler.jsonc` with your production `database_id`:

```json
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "novyra-db",
    "database_id": "<YOUR_D1_DATABASE_ID>",
    "migrations_dir": "migrations"
  }
]
```

### Apply Migrations to Remote D1:

```bash
npm run db:migrate:prod
# Or: npx wrangler d1 migrations apply DB --remote
```

---

## 4. Cloudflare R2 Bucket Creation

Create the private R2 bucket for product files and payment screenshots:

```bash
npx wrangler r2 bucket create novyra-private
```

Ensure `wrangler.jsonc` includes the binding:

```json
"r2_buckets": [
  {
    "binding": "PRIVATE_FILES",
    "bucket_name": "novyra-private"
  }
]
```

---

## 5. Uploading the PDF Product to R2

Upload your official 40-page PDF guide to the private R2 bucket:

```bash
npx wrangler r2 object put novyra-private/products/novyra-ai-client-hunting-toolkit.pdf --file=./products/novyra-ai-client-hunting-toolkit.pdf
```

> [!NOTE]
> The PDF is stored under key `products/novyra-ai-client-hunting-toolkit.pdf`. It is completely private and cannot be downloaded without an active, approved token.

---

## 6. Adding Official Logo & Preview Images

- Place your official logo at:
  `/public/assets/logo.png` and `/public/assets/logo.svg`
- Place your 6 sample preview images at:
  `/public/assets/preview-01.webp` through `preview-06.webp` (or `.svg`)

Re-run the build to bundle the new assets:
```bash
npm run build
```

---

## 7. Changing bKash & Rocket Numbers

To change the displayed payment numbers without touching application code, set environment variables in your Cloudflare dashboard or `wrangler.jsonc`:

```bash
# Set via Cloudflare Wrangler Secret / Env
npx wrangler secret put BKASH_NUMBER
# Enter: 01638002708

npx wrangler secret put ROCKET_NUMBER
# Enter: 016380027089
```

Or configure directly in `wrangler.jsonc` vars:
```json
"vars": {
  "BKASH_NUMBER": "01638002708",
  "ROCKET_NUMBER": "016380027089"
}
```

---

## 8. Changing Product Price

To update the price (e.g. from ৳299 to ৳399):

```bash
npx wrangler secret put PRODUCT_PRICE
# Enter: 299
```

Both frontend checkout modals, pricing badges, and backend order creation logic will automatically reflect the updated price.

---

## 9. Admin Login & Authentication

1. Set your secure administrator password:
   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   # Enter: your-strong-admin-password-2026
   ```
2. Navigate to `https://your-domain.com/admin`.
3. Enter your password to access the verification portal.
4. Sessions are secured using an encrypted HMAC-SHA256 HttpOnly cookie valid for 7 days.

---

## 10. Payment Verification Workflow

1. A buyer completes payment via bKash or Rocket and submits their Transaction ID.
2. In the Admin Dashboard (`/admin`), the order appears under **Pending Orders**.
3. The table displays:
   - Order ID (e.g., `NV-10482`)
   - Customer Name, Email, Phone
   - Selected Payment Method (bKash/Rocket)
   - Sender Phone Number
   - SMS Transaction ID (TxnID)
   - Screenshot receipt (click "View" to preview the image from R2).
4. Verify the TxnID against your bKash merchant or personal statement.

---

## 11. Order Approval & Customer Delivery

1. In `/admin`, click **Approve** on the verified order.
2. The system executes the following:
   - Updates order status to `paid`.
   - Generates a 32-byte cryptographic entropy token.
   - Computes and stores the SHA-256 hash in D1.
   - Sets `download_expires_at` to **now + 72 hours**.
   - Sets `download_count` to **0**.
3. When the customer visits `https://your-domain.com/order/NV-XXXXX`, they immediately see:
   - **Payment Verified ✓**
   - **Download PDF** button.
   - Expiration countdown (72h) and remaining downloads counter (0/5).
   - Meta Pixel and GA4 trigger verified **Purchase** events!

---

## 12. Meta Pixel Configuration

Set your Meta Pixel ID:

```bash
npx wrangler secret put META_PIXEL_ID
# Enter: <YOUR_PIXEL_ID>
```

Tracked events:
- `PageView`: Page loads.
- `ViewContent`: Product inspection (`content_name`, `value: 299`, `currency: 'BDT'`).
- `InitiateCheckout`: When the buyer creates an order in Step 1.
- `Purchase`: Triggered **only** when payment is approved and customer views verified download.

---

## 13. Google Analytics 4 (GA4) Configuration

Set your GA4 Measurement ID:

```bash
npx wrangler secret put GA4_MEASUREMENT_ID
# Enter: G-XXXXXXXXXX
```

Tracked e-commerce events:
- `view_item`
- `begin_checkout`
- `payment_instructions_viewed`
- `payment_proof_submitted`
- `purchase`
- `file_download`

---

## 14. Production Deployment to Cloudflare

Deploy the entire full-stack application (React frontend assets + Cloudflare Worker API) with one command:

```bash
# 1. Build frontend distribution
npm run build

# 2. Deploy Worker with static assets binding
npx wrangler deploy
```

Your website is now live on Cloudflare's global edge network!

---

## Running Automated Tests

Run the test suite at any time:

```bash
npm run test
```

Verification includes:
- SHA-256 token hashing and random entropy generation.
- Order ID generation format (`NV-XXXXX`).
- HMAC-SHA256 admin session signing and tampering detection.
- Bangladesh phone number and email validation.
- End-to-end checkout and payment workflow.
- Duplicate Transaction ID rejection.
- Download limit counter (max 5) and 72-hour expiration enforcement.

---

## License

Proprietary — © 2026 Novyra. All rights reserved.
Purchased products include a single-user Personal Use License.
