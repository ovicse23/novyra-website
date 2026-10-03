import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <section className="py-16 border-b border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Educational Disclaimer */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-300 font-bold mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Educational Disclaimer</span>
            </div>
            <p className="mb-2">
              This product is educational material designed to teach effective client hunting systems. Novyra does not guarantee clients, income, freelance orders, employment, sales, or business outcomes.
            </p>
            <p>
              Individual results depend on factors including your technical skill, experience, market demand, communication, and execution consistency.
            </p>
          </div>

          {/* Personal Use License */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-300 font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Personal Use License</span>
            </div>
            <p className="mb-2">
              Purchasing this product grants one individual a single-user Personal Use License.
            </p>
            <p>
              The buyer may NOT resell, redistribute, upload publicly, share download links, copy & rebrand, sell in Facebook groups, upload to Google Drive for mass distribution, or sell on digital marketplaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
