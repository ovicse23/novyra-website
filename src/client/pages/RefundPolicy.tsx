import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Footer } from '../components/Footer';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between">
      <header className="border-b border-white/10 glass-panel py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/assets/logo.png?v=3"
              alt="Novyra"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>
          <a href="/" className="text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 text-slate-300 text-sm leading-relaxed space-y-6">
        <div className="border-b border-slate-800 pb-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase mb-3">
            <RefreshCw className="w-3.5 h-3.5" /> Fair Purchase Policy
          </div>
          <h1 className="text-3xl font-extrabold text-white">Refund & Resolution Policy</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: October 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Nature of Digital Products</h2>
          <p>
            Because the <em>AI Client Hunting + Freelancing Toolkit</em> is an instantly downloadable digital PDF containing proprietary templates and intellectual property, purchases are generally non-refundable once the download link has been unlocked or accessed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Eligible Refund & Resolution Circumstances</h2>
          <p>
            We are committed to treating every customer fairly. We will promptly issue a full refund or provide technical resolution in the following situations:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Duplicate Payments:</strong> If your bKash or Rocket account was mistakenly charged twice for the same order, we will refund the duplicate amount within 24–48 hours upon verification of the duplicate transaction IDs.
            </li>
            <li>
              <strong>Technical Delivery Problems:</strong> If our system fails to deliver your PDF file or the file cannot be opened due to server storage errors and our technical team cannot resolve the delivery within 24 hours.
            </li>
            <li>
              <strong>Incorrect Payment Verification:</strong> If your genuine payment was rejected in error by our manual review team.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. How to Request Support or Refund</h2>
          <p>
            If you encounter any payment or delivery issue, please reach out to our team at <strong>support@novyra.com</strong> or message our official WhatsApp/bKash line with your:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Order ID (e.g. NV-10482)</li>
            <li>bKash/Rocket Transaction ID</li>
            <li>Sender Mobile Number</li>
          </ul>
          <p>We review and respond to all support requests within 5–30 minutes during normal operating hours.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};
