import React from 'react';
import { ArrowRight, Sparkles, Shield, Smartphone, Lock } from 'lucide-react';

interface FinalCtaProps {
  onOpenCheckout: () => void;
  price?: number;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenCheckout, price = 299 }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-purple-950/20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Ready To Build Your Acquisition System?
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
          Skill আছে. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            এবার Client Hunting System তৈরি করুন.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto mb-8">
          Get the complete 40-page Novyra toolkit today.
        </p>

        {/* Pricing & CTA */}
        <div className="max-w-sm mx-auto mb-6">
          <button
            onClick={onOpenCheckout}
            className="w-full py-4 px-8 rounded-xl font-black text-lg text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all group"
          >
            <span>Get Instant Access — ৳{price}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Below CTA Trust Notes */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> bKash & Rocket
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> Secure Manual Payment
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Lock className="w-3.5 h-3.5 text-purple-400" /> Private PDF Access
          </span>
        </div>
      </div>
    </section>
  );
};
