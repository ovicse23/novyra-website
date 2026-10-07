import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProblemSection } from './components/ProblemSection';
import { WhatsInside } from './components/WhatsInside';
import { PdfPreview } from './components/PdfPreview';
import { ReviewsSection } from './components/ReviewsSection';
import { WhoIsThisFor } from './components/WhoIsThisFor';
import { ValueStack } from './components/ValueStack';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { CheckoutModal } from './components/CheckoutModal';

// Dedicated Sub-Pages
import { OrderStatusPage } from './pages/OrderStatusPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicy } from './pages/RefundPolicy';

// Tracking & Attribution
import { captureAndStoreUtm } from './lib/utm';
import { initTracking, trackPageView, trackViewContent } from './lib/analytics';
import type { ProductConfig } from '../shared/types';
import { BUNDLE_PRODUCT } from '../shared/products';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>(BUNDLE_PRODUCT.id);

  const [config, setConfig] = useState<ProductConfig>({
    slug: 'ai-client-hunting-toolkit',
    name: 'AI Client Hunting + Freelancing Toolkit',
    price: 299,
    regularPrice: 699,
    currency: 'BDT',
    bkashNumber: '01638002708',
    rocketNumber: '016380027089',
    downloadExpiryHours: 72,
    maxDownloads: 5,
    supportHoursMsg: 'Normally within 5–30 minutes during support hours.',
  });

  // Routing check based on window.location.pathname
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // 1. Capture and persist UTMs / fbclid from URL
    captureAndStoreUtm();

    // 2. Fetch dynamic configuration from API
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setConfig((prev) => ({
            ...prev,
            price: data.config.productPrice || prev.price,
            regularPrice: data.config.regularPrice || prev.regularPrice,
            bkashNumber: data.config.bkashNumber || prev.bkashNumber,
            rocketNumber: data.config.rocketNumber || prev.rocketNumber,
            downloadExpiryHours: data.config.downloadExpiryHours || prev.downloadExpiryHours,
            maxDownloads: data.config.maxDownloads || prev.maxDownloads,
            supportHoursMsg: data.config.supportHoursMsg || prev.supportHoursMsg,
          }));

          // Initialize analytics with configured IDs
          initTracking(data.config.metaPixelId, data.config.ga4MeasurementId);
          trackPageView();
          trackViewContent(data.config.productPrice || 299);
        }
      })
      .catch((err) => {
        console.warn('Using default configuration', err);
        trackPageView();
        trackViewContent(299);
      });

    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenCheckout = (productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setModalOpen(true);
  };

  // Sub-routes routing
  if (pathname.startsWith('/admin')) {
    return <AdminPage />;
  }

  if (pathname.startsWith('/order')) {
    return <OrderStatusPage />;
  }

  if (pathname === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (pathname === '/terms') {
    return <TermsPage />;
  }

  if (pathname === '/refund-policy') {
    return <RefundPolicy />;
  }

  // Primary Landing Page View
  return (
    <div className="min-h-screen bg-background text-white selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <Header
        onOpenCheckout={handleOpenCheckout}
        price={config.price}
      />

      <main>
        {/* Hero Section with Dual Playbook Showcase */}
        <Hero
          onOpenCheckout={handleOpenCheckout}
          price={config.price}
          regularPrice={config.regularPrice}
        />

        {/* Product Catalog / Playbook Library */}
        <ProductCatalog
          onSelectProduct={(slug) => handleOpenCheckout(slug)}
        />

        {/* Problem Section (100% English) */}
        <ProblemSection />

        {/* What's Inside Curriculum Tabs */}
        <WhatsInside />

        {/* Real PDF Sample Preview Grid for both books */}
        <PdfPreview
          onOpenCheckout={handleOpenCheckout}
          price={config.price}
        />

        {/* Authentic Customer Reviews & Ratings */}
        <ReviewsSection />

        {/* Who Is This For? */}
        <WhoIsThisFor />

        {/* What You Get / Value Stack */}
        <ValueStack
          onOpenCheckout={() => handleOpenCheckout(BUNDLE_PRODUCT.id)}
          price={config.price}
          regularPrice={config.regularPrice}
        />

        {/* How It Works (4-Step Visual Flow) */}
        <HowItWorks
          onOpenCheckout={() => handleOpenCheckout()}
          price={config.price}
        />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* Final High-Converting CTA */}
        <FinalCta
          onOpenCheckout={handleOpenCheckout}
          price={config.price}
        />

        {/* Educational Disclaimer & Personal License */}
        <Disclaimer />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyCta
        onOpenCheckout={() => handleOpenCheckout()}
        price={config.price}
        isModalOpen={modalOpen}
      />

      {/* 3-Step Accessible Checkout Modal with Multi-Product Support */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProductId={selectedProductId}
        price={config.price}
        bkashNumber={config.bkashNumber}
        rocketNumber={config.rocketNumber}
      />
    </div>
  );
};
