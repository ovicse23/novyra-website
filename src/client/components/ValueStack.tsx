import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface ValueStackProps {
  onOpenCheckout: () => void;
  price?: number;
  regularPrice?: number;
}

export const ValueStack: React.FC<ValueStackProps> = ({
  onOpenCheckout,
  price = 299,
  regularPrice = 699,
}) => {
  const stackItems = [
    { title: '40-Page Practical Client Hunting Guide', value: '৳500' },
    { title: 'AI Client Research & Decision Maker Framework', value: '৳450' },
    { title: 'Master AI Prompt Collection (Research, Proposals, Follow-ups)', value: '৳600' },
    { title: 'High-Converting Upwork & Fiverr Proposal Templates', value: '৳400' },
    { title: 'Cold Email Sequences & Tested Subject Line Vault', value: '৳500' },
    { title: 'LinkedIn Direct Outreach & Social Selling Scripts', value: '৳450' },
    { title: 'Strategic Follow-Up & Objection Handling Playbook', value: '৳350' },
    { title: 'Value-Based Pricing Guidance & Contract Structure', value: '৳300' },
    { title: 'Client Qualification & Red Flag Scam Detection Checklist', value: '৳250' },
    { title: '30-Day Day-by-Day Client Hunting Action Calendar', value: '৳600' },
    { title: 'Instant Protected Digital Access (PDF)', value: 'Included' },
  ];

  return (
    <section className="py-24 bg-background-alt border-y border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Package
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Everything You Get Today
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A comprehensive client hunting operating system designed for Bangladeshi freelancers.
          </p>
        </div>

        {/* Stack Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="space-y-3.5 mb-8">
            {stackItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{item.title}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 shrink-0 ml-2">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Format Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-8 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              📱 Mobile Friendly
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-semibold text-white">
              💻 Desktop Friendly
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-semibold text-cyan-400">
              ⚡ Instant Protected PDF Delivery
            </span>
          </div>

          {/* Pricing & CTA */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-slate-400 line-through">Regular: ৳{regularPrice}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase">
                  Launch Special
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 font-bold uppercase">Total Today:</span>
                <span className="text-4xl font-black text-white">৳{price}</span>
                <span className="text-sm text-slate-400 font-bold">BDT</span>
              </div>
            </div>

            <button
              onClick={onOpenCheckout}
              className="w-full sm:w-auto py-4 px-8 rounded-xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <span>Get Instant Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
