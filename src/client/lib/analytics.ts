declare global {
  interface Window {
    fbq?: any;
    gtag?: any;
    dataLayer?: any[];
  }
}

function pushDataLayer(payload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function initTracking(metaPixelId?: string, ga4MeasurementId?: string) {
  if (typeof window === 'undefined') return;

  // Initialize GA4 if ID is present and gtag is not already configured
  if (ga4MeasurementId && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4MeasurementId);
  }

  // Initialize Meta Pixel if ID is present and fbq is not already set up
  if (metaPixelId && !window.fbq) {
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq?.('init', metaPixelId);
    window.fbq?.('track', 'PageView');
  }
}

export function trackPageView() {
  if (typeof window === 'undefined') return;
  window.fbq?.('track', 'PageView');
  window.gtag?.('event', 'page_view');
  pushDataLayer({
    event: 'page_view',
    page_path: window.location.pathname,
  });
}

export function trackViewContent(price = 299) {
  if (typeof window === 'undefined') return;

  // Meta Pixel
  window.fbq?.('track', 'ViewContent', {
    content_name: 'AI Client Hunting + Freelancing Toolkit',
    content_type: 'product',
    content_ids: ['novyra-ai-client-hunting-toolkit'],
    value: price,
    currency: 'BDT',
  });

  // GA4
  window.gtag?.('event', 'view_item', {
    currency: 'BDT',
    value: price,
    items: [
      {
        item_id: 'novyra-ai-client-hunting-toolkit',
        item_name: 'AI Client Hunting + Freelancing Toolkit',
        price: price,
        quantity: 1,
      },
    ],
  });

  // GTM dataLayer
  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'BDT',
      value: price,
      items: [
        {
          item_id: 'novyra-ai-client-hunting-toolkit',
          item_name: 'AI Client Hunting + Freelancing Toolkit',
          price: price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackInitiateCheckout(price = 299) {
  if (typeof window === 'undefined') return;

  // Meta Pixel
  window.fbq?.('track', 'InitiateCheckout', {
    content_name: 'AI Client Hunting + Freelancing Toolkit',
    content_type: 'product',
    content_ids: ['novyra-ai-client-hunting-toolkit'],
    value: price,
    currency: 'BDT',
  });

  // GA4
  window.gtag?.('event', 'begin_checkout', {
    currency: 'BDT',
    value: price,
    items: [
      {
        item_id: 'novyra-ai-client-hunting-toolkit',
        item_name: 'AI Client Hunting + Freelancing Toolkit',
        price: price,
        quantity: 1,
      },
    ],
  });

  // GTM dataLayer
  pushDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'BDT',
      value: price,
      items: [
        {
          item_id: 'novyra-ai-client-hunting-toolkit',
          item_name: 'AI Client Hunting + Freelancing Toolkit',
          price: price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackPaymentInstructionsViewed(method: 'bKash' | 'Rocket', orderId: string) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'payment_instructions_viewed', {
    payment_method: method,
    order_id: orderId,
  });

  pushDataLayer({
    event: 'payment_instructions_viewed',
    payment_method: method,
    order_id: orderId,
  });
}

export function trackPaymentProofSubmitted(orderId: string, txnId: string) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'payment_proof_submitted', {
    order_id: orderId,
    transaction_id: txnId,
  });

  pushDataLayer({
    event: 'payment_proof_submitted',
    order_id: orderId,
    transaction_id: txnId,
  });
}

// IMPORTANT: Purchase is ONLY fired when payment is verified and approved!
export function trackPurchase(orderId: string, price = 299) {
  if (typeof window === 'undefined') return;

  // Deduplicate in sessionStorage so user refreshing doesn't fire Purchase twice
  const purchaseKey = `novyra_purchase_${orderId}`;
  if (sessionStorage.getItem(purchaseKey)) return;
  sessionStorage.setItem(purchaseKey, 'true');

  // Meta Pixel
  window.fbq?.('track', 'Purchase', {
    content_name: 'AI Client Hunting + Freelancing Toolkit',
    content_type: 'product',
    content_ids: ['novyra-ai-client-hunting-toolkit'],
    value: price,
    currency: 'BDT',
  }, { eventID: orderId });

  // GA4
  window.gtag?.('event', 'purchase', {
    transaction_id: orderId,
    value: price,
    currency: 'BDT',
    items: [
      {
        item_id: 'novyra-ai-client-hunting-toolkit',
        item_name: 'AI Client Hunting + Freelancing Toolkit',
        price: price,
        quantity: 1,
      },
    ],
  });

  // GTM dataLayer
  pushDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: orderId,
      value: price,
      currency: 'BDT',
      items: [
        {
          item_id: 'novyra-ai-client-hunting-toolkit',
          item_name: 'AI Client Hunting + Freelancing Toolkit',
          price: price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackFileDownload(orderId: string) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'file_download', {
    file_name: 'Novyra-AI-Client-Hunting-Toolkit.pdf',
    file_extension: 'pdf',
    order_id: orderId,
  });

  pushDataLayer({
    event: 'file_download',
    file_name: 'Novyra-AI-Client-Hunting-Toolkit.pdf',
    file_extension: 'pdf',
    order_id: orderId,
  });
}
