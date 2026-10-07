import React from 'react';
import { ArrowRight, Sparkles, Shield, Smartphone, Lock, Zap } from 'lucide-react';
import { BUNDLE_PRODUCT } from '../../shared/products';

interface FinalCtaProps {
  onOpenCheckout: (productId?: string) => void;
  price?: number;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-slate-900">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-purple-950/20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Ready To Take Control Of Your Growth?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
          Stop Guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Start Executing Systems That Scale.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto mb-8">
          Get lifetime digital access to Novyra playbooks today with instant manual bKash or Rocket payment.
        </p>

        {/* Pricing & CTA */}
        <div className="max-w-md mx-auto space-y-3 mb-6">
          <button
            onClick={() => onOpenCheckout(BUNDLE_PRODUCT.id)}
            className="w-full py-4 px-8 rounded-xl font-black text-base sm:text-lg text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all group"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            <span>Get Complete Bundle (Both Guides) — ৳499</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>Or single guide:</span>
            <button
              onClick={() => onOpenCheckout('ai-client-hunting-toolkit')}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Client Hunting (৳299)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenCheckout('meta-ads-blueprint')}
              className="text-purple-400 hover:underline font-semibold"
            >
              Meta Ads (৳299)
            </button>
          </div>
        </div>

        {/* Below CTA Trust Notes */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> bKash &amp; Rocket
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> Secure Manual Verification
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Lock className="w-3.5 h-3.5 text-purple-400" /> Private PDF Download Access
          </span>
        </div>
      </div>
    </section>
  );
};
