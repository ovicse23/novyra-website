import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Footer } from '../components/Footer';

export const TermsPage: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase mb-3">
            <FileText className="w-3.5 h-3.5" /> Legal Terms
          </div>
          <h1 className="text-3xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: October 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or ordering the <em>AI Client Hunting + Freelancing Toolkit</em> from Novyra, you agree to be bound by these Terms and Conditions. If you disagree with any portion of these terms, you should not purchase or use the product.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Personal Use License</h2>
          <p>
            Upon successful manual payment verification of ৳299 BDT, Novyra grants you a non-exclusive, non-transferable, single-user Personal Use License to download and read the 40-page PDF guide.
          </p>
          <p>You explicitly agree NOT to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Resell, distribute, sub-license, or lease the PDF.</li>
            <li>Upload the file to shared drives, Telegram groups, Facebook groups, or public torrents.</li>
            <li>Copy, modify, rebrand, or pass off the materials as your own creation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Educational Disclaimer & Earnings Non-Guarantee</h2>
          <p>
            The content provided in this toolkit is strictly for educational and informational purposes. Novyra makes no representations, warranties, or guarantees that you will earn a specific income, acquire a specific number of clients, or achieve specific freelance revenue. Your business success is your own responsibility.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Download Security & Limits</h2>
          <p>
            To prevent link leakage and unauthorized sharing, each verified order is assigned a cryptographic token valid for <strong>72 hours</strong> with a maximum limit of <strong>5 download attempts</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};
