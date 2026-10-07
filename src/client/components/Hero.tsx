import React from 'react';
import { ArrowRight, BookOpen, Bot, CheckCircle2, Shield, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { BUNDLE_PRODUCT } from '../../shared/products';

interface HeroProps {
  onOpenCheckout: (productId?: string) => void;
  price?: number;
  regularPrice?: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCheckout,
  price: _price = 299,
  regularPrice: _regularPrice = 699,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-cyan-400/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Small Hook Chip (100% English) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-glow-cyan backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Actionable Growth Playbooks for High-Performing Professionals</span>
          </div>

          {/* Headline (100% English) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
            Stop Relying on Luck. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Build Predictable Revenue Systems.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Master high-ticket international client acquisition and hyper-profitable Meta advertising with Novyra's condensed, execution-ready PDF manuals. Zero fluff, 100% battle-tested blueprints.
          </p>

          {/* Trust / Value Chips */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <BookOpen className="w-4 h-4 text-cyan-400" /> 2 Complete Playbooks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <Bot className="w-4 h-4 text-blue-400" /> AI Prompts &amp; Outbound Sourcing
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <TrendingUp className="w-4 h-4 text-purple-400" /> 20 Bangla Hooks &amp; COD Math
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Battle-Tested Templates
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <Shield className="w-4 h-4 text-cyan-400" /> Instant Digital Access
            </span>
          </div>

          {/* Dual CTAs: Bundle or Individual */}
          <div className="max-w-md mx-auto space-y-3 mb-6">
            <button
              onClick={() => onOpenCheckout(BUNDLE_PRODUCT.id)}
              className="w-full py-4 px-6 rounded-xl font-black text-base sm:text-lg text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 active:scale-[0.98] transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>Get Complete Bundle (Both Guides) — ৳499</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>Or choose single guide:</span>
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

          <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
            <span>One-time payment</span>
            <span>•</span>
            <span>bKash &amp; Rocket supported</span>
            <span>•</span>
            <span>Instant PDF download</span>
          </div>
        </div>

        {/* Product Mockup Visual Showcase (Both Books) */}
        <div className="mt-14 max-w-4xl mx-auto relative">
          <div className="relative mx-auto rounded-2xl p-2 sm:p-5 bg-gradient-to-b from-slate-800/60 to-slate-950/80 border border-slate-700/60 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 sm:p-6">
              {/* Left Dual Books Graphic */}
              <div className="md:col-span-5 flex justify-center gap-3 sm:gap-4">
                {/* Book 1: Client Hunting */}
                <div
                  onClick={() => onOpenCheckout('ai-client-hunting-toolkit')}
                  className="cursor-pointer group relative w-36 sm:w-40 rounded-r-xl rounded-l-sm bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-4 border-y-2 border-r-2 border-l-4 border-cyan-500/50 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-300"
                >
                  <div className="text-[10px] font-black text-cyan-400 uppercase tracking-wider mb-2">NOVYRA</div>
                  <div className="text-xs sm:text-sm font-black text-white leading-tight mb-1">AI CLIENT HUNTING</div>
                  <div className="text-[10px] text-slate-400 mb-6">Freelancing Toolkit</div>
                  <div className="border-t border-slate-700/60 pt-2 flex justify-between text-[10px]">
                    <span className="font-bold text-white">40 Pgs</span>
                    <span className="text-cyan-400 font-bold">৳299</span>
                  </div>
                </div>

                {/* Book 2: Meta Ads */}
                <div
                  onClick={() => onOpenCheckout('meta-ads-blueprint')}
                  className="cursor-pointer group relative w-36 sm:w-40 rounded-r-xl rounded-l-sm bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 p-4 border-y-2 border-r-2 border-l-4 border-purple-500/50 shadow-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"
                >
                  <div className="text-[10px] font-black text-purple-400 uppercase tracking-wider mb-2">NOVYRA</div>
                  <div className="text-xs sm:text-sm font-black text-white leading-tight mb-1">META ADS 2026</div>
                  <div className="text-[10px] text-slate-400 mb-6">Bangladesh Edition</div>
                  <div className="border-t border-slate-700/60 pt-2 flex justify-between text-[10px]">
                    <span className="font-bold text-white">53 Pgs</span>
                    <span className="text-purple-400 font-bold">৳299</span>
                  </div>
                </div>
              </div>

              {/* Right Value Highlights */}
              <div className="md:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                  <span>Battle-Tested in 2026</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Why Novyra Playbooks Outperform Generic Video Courses
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Traditional courses drown you in 30 hours of outdated lectures. Novyra playbooks distill exact operating systems, copy-paste cold outreach scripts, localized Bangla ad hooks, and Cash-on-Delivery margin calculators into high-density reference manuals.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">✓ Client Acquisition</span>
                    <span className="text-slate-400">Trigger prospecting &amp; high-ticket discovery scripts.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-purple-400 font-bold block mb-1">✓ Meta Ads Scaling</span>
                    <span className="text-slate-400">Bangla hooks, courier return math &amp; DCT testing.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
