import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../../shared/products';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai-client-hunting-toolkit' | 'meta-ads-blueprint' | 'complete-growth-bundle'>('all');

  const filteredReviews = filter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.productSlug === filter);

  return (
    <section id="reviews" className="py-20 sm:py-28 relative overflow-hidden bg-slate-900/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Reader Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Real Results From Freelancers &amp; Media Buyers in Bangladesh
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Read authentic feedback from professionals who put Novyra playbooks into practice to close high-paying clients and run profitable ads.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-slate-950/80 border border-slate-800 shadow-lg">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-black text-white">4.9 / 5.0</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-300">Over 140+ verified readers</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('ai-client-hunting-toolkit')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              filter === 'ai-client-hunting-toolkit'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            AI Client Hunting Toolkit
          </button>
          <button
            type="button"
            onClick={() => setFilter('meta-ads-blueprint')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              filter === 'meta-ads-blueprint'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Meta Ads Blueprint 2026
          </button>
          <button
            type="button"
            onClick={() => setFilter('complete-growth-bundle')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              filter === 'complete-growth-bundle'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Complete Growth Bundle
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.metricBadge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-[11px]">
                      {rev.metricBadge}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  "{rev.headline}"
                </h4>

                {/* Comment Body */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {rev.role} • {rev.companyOrLocation}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
