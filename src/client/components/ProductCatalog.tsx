import React from 'react';
import { Check, Sparkles, BookOpen, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS, BUNDLE_PRODUCT } from '../../shared/products';

interface ProductCatalogProps {
  onSelectProduct: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
  return (
    <section id="products" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950/70 border-t border-slate-900">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Novyra Playbook Library</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Systematic Playbooks Built For{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Measurable Revenue
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            No 20-hour video fluff or vague motivation. Every Novyra guide is a condensed, execution-ready PDF manual with step-by-step frameworks, battle-tested templates, and local Bangladesh context.
          </p>
        </div>

        {/* BUNDLE SPOTLIGHT BANNER */}
        <div className="mb-14 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500" />
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border-2 border-emerald-500/40 p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{BUNDLE_PRODUCT.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {BUNDLE_PRODUCT.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {BUNDLE_PRODUCT.subtitle} Includes the 40-page AI Client Hunting Toolkit + 53-page Meta Ads Blueprint 2026.
                </p>

                {/* Bundle Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {BUNDLE_PRODUCT.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA Column */}
              <div className="shrink-0 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-center items-center lg:items-end">
                <span className="text-xs text-slate-400 block line-through">
                  Regular Price: ৳{BUNDLE_PRODUCT.regularPrice} BDT
                </span>
                <div className="flex items-baseline gap-2 mt-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ৳{BUNDLE_PRODUCT.price}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">BDT</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400/90 mb-5 block">
                  You Save ৳899 BDT (Instant Delivery)
                </span>

                <button
                  type="button"
                  onClick={() => onSelectProduct(BUNDLE_PRODUCT.id)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all group-hover:shadow-emerald-500/40"
                >
                  <Zap className="w-5 h-5 fill-slate-950" />
                  <span>Get Both Playbooks for ৳499</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INDIVIDUAL PRODUCTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => {
            const isCyan = product.accentColor === 'cyan';
            return (
              <div
                key={product.id}
                className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Top Badge & Page Count */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                        isCyan
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      }`}
                    >
                      {product.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                      {product.pages} Pages • Digital PDF
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* Pricing Display */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through block">
                        Regular: ৳{product.regularPrice} BDT
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-3xl font-black text-white">৳{product.price}</span>
                        <span className="text-xs font-bold text-slate-400">BDT</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      Save ৳400 (57% Off)
                    </span>
                  </div>

                  {/* Core Features */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      What's Included:
                    </span>
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                            isCyan ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isCyan
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    <span>Get {product.shortTitle} (৳{product.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant bKash/Rocket activation • Protected PDF download</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
