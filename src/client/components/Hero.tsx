import React from 'react';
import { ArrowRight, BookOpen, Bot, FileText, CheckCircle2, Calendar, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onOpenCheckout: () => void;
  price?: number;
  regularPrice?: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCheckout,
  price = 299,
  regularPrice = 699,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-cyan-400/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Small Hook Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-glow-cyan backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Skill আছে. Client কোথায়?</span>
          </div>

          {/* Headline (Bangla + English hybrid) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
            Freelancing Skill আছে — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              এবার Client Hunting System বানান.
            </span>
          </h1>

          {/* Main Product Title */}
          <div className="text-lg sm:text-xl font-bold text-slate-200 tracking-wide mb-3">
            AI Client Hunting + Freelancing Toolkit
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            A practical 40-page system for researching, finding and approaching potential clients using AI, Upwork, Fiverr, LinkedIn, Facebook and Cold Email.
          </p>

          {/* Trust / Value Chips */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <BookOpen className="w-4 h-4 text-cyan-400" /> 40 Pages
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <Bot className="w-4 h-4 text-blue-400" /> AI Prompts
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <FileText className="w-4 h-4 text-purple-400" /> Outreach Scripts
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Practical Templates
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <Calendar className="w-4 h-4 text-amber-400" /> 30-Day Action Plan
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
              <Shield className="w-4 h-4 text-cyan-400" /> Instant Digital Access
            </span>
          </div>

          {/* Pricing Box & CTA */}
          <div className="glass-card max-w-md mx-auto p-6 rounded-2xl border-white/10 mb-6 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              Launch Offer
            </div>

            <div className="flex items-center justify-center gap-4 mb-5 pt-1">
              <div className="text-right">
                <span className="text-xs uppercase text-slate-400 block font-medium">Regular Price</span>
                <span className="text-slate-400 line-through text-lg font-semibold">৳{regularPrice}</span>
              </div>
              <div className="h-9 w-[1px] bg-slate-700/80" />
              <div className="text-left">
                <span className="text-xs uppercase text-cyan-400 block font-bold">Launch Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">৳{price}</span>
                  <span className="text-xs text-slate-400 font-semibold">BDT</span>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={onOpenCheckout}
              className="w-full py-4 px-6 rounded-xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 group active:scale-[0.98] transition-all duration-200"
            >
              <span>Get Instant Access — ৳{price}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Text */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
              <span>One-time payment</span>
              <span>•</span>
              <span>Digital PDF</span>
              <span>•</span>
              <span>No subscription</span>
            </div>
          </div>
        </div>

        {/* Product Mockup Visual Showcase */}
        <div className="mt-12 max-w-4xl mx-auto relative">
          <div className="relative mx-auto rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-slate-800/60 to-slate-950/80 border border-slate-700/60 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 sm:p-6">
              {/* Left Mockup Graphic */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group w-56 sm:w-64">
                  {/* Book 3D Styling */}
                  <div className="relative rounded-r-xl rounded-l-sm bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 border-y-2 border-r-2 border-l-8 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <img src="/assets/logo.png" alt="Novyra" className="h-6 w-auto object-contain mb-4" />
                    <div className="text-xl font-black text-white leading-tight mb-2">AI CLIENT HUNTING</div>
                    <div className="text-xs text-slate-300 font-medium mb-8">+ Freelancing Toolkit</div>
                    
                    <div className="border-t border-slate-700/70 pt-4 mt-8 flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">COMPREHENSIVE</div>
                        <div className="text-sm font-bold text-white">40 PAGES</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-cyan-400 font-bold">DIGITAL PDF</div>
                        <div className="text-xs text-slate-400">Personal License</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Value Highlights */}
              <div className="md:col-span-7 space-y-3.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  What makes this toolkit different?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Most freelancers waste months sending generic proposals on Upwork or waiting for Fiverr impressions. This toolkit gives you a repeatable, multi-channel client acquisition machine powered by modern AI workflows.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">✓ No Theory</span>
                    <span className="text-slate-400">Copy-paste scripts and step-by-step systems.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-purple-400 font-bold block mb-1">✓ Tested in 2026</span>
                    <span className="text-slate-400">Built for current algorithms & client expectations.</span>
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
