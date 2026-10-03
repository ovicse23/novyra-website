import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Footer } from '../components/Footer';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between">
      <header className="border-b border-white/10 glass-panel py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
              N
            </div>
            <span className="font-extrabold text-lg tracking-wide text-white">NOVYRA</span>
          </a>
          <a href="/" className="text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 text-slate-300 text-sm leading-relaxed space-y-6">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase mb-3">
            <Shield className="w-3.5 h-3.5" /> Privacy & Data Protection
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: October 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            When you create an order for the <em>AI Client Hunting + Freelancing Toolkit</em> on Novyra, we collect the following personal details:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Personal Contact Information:</strong> Full name, email address, and mobile phone number.</li>
            <li><strong>Payment Verification Details:</strong> Payment method (bKash/Rocket), sender mobile number, payment transaction ID (TxnID), and optional payment screenshot proof.</li>
            <li><strong>Technical & Marketing Attribution:</strong> IP address, device metadata, UTM parameters (campaign, source, medium), and Meta click IDs (fbclid) to measure marketing performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Why We Collect This Data</h2>
          <p>Your data is collected strictly to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Manually verify that your bKash or Rocket payment has settled in our merchant/personal account.</li>
            <li>Issue your unique cryptographically secured, expiring PDF download token.</li>
            <li>Provide customer support in the event of transaction ID discrepancies or re-download requests.</li>
            <li>Protect our intellectual property and enforce personal-use licensing limits.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Third-Party Services & Analytics</h2>
          <p>
            We use Google Analytics 4 (GA4) and Meta Pixel to track website traffic, conversion funnels, and advertising ROI. These services utilize cookies to log aggregated, non-personally identifiable behavioral metrics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Data Storage & Security</h2>
          <p>
            Your order records are stored inside encrypted Cloudflare D1 databases. Download tokens are stored as salted SHA-256 hashes, and raw tokens are never exposed. Payment screenshots are kept in private Cloudflare R2 storage without public URLs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Contact Us</h2>
          <p>
            For privacy inquiries or data removal requests, please contact our support team at <strong>support@novyra.com</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};
