import React, { useState } from 'react';
import { Eye, Lock, BookOpen } from 'lucide-react';
import { PRODUCTS } from '../../shared/products';

interface PdfPreviewProps {
  onOpenCheckout: (productId?: string) => void;
  price?: number;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({ onOpenCheckout, price: _price = 299 }) => {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('client-hunting');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const clientHuntingPreviews = [
    { num: '01', page: '04', title: 'Operating System', file: '/assets/preview-01.svg?v=5', desc: 'Position, Prospect, Convert formula' },
    { num: '02', page: '12', title: 'Trigger Detection', file: '/assets/preview-02.svg?v=5', desc: 'LinkedIn & Google buyer signals' },
    { num: '03', page: '19', title: 'Cold Outreach Anatomy', file: '/assets/preview-03.svg?v=5', desc: 'Relevance bridge & low-friction CTA' },
    { num: '04', page: '27', title: 'Discovery Call Script', file: '/assets/preview-04.svg?v=5', desc: 'High-ticket diagnosis questions' },
    { num: '05', page: '33', title: 'Proposal Framework', file: '/assets/preview-05.svg?v=5', desc: 'One-page scope agreement' },
    { num: '06', page: '38', title: '30-Day Pipeline Plan', file: '/assets/preview-06.svg?v=5', desc: 'Step-by-step outreach roadmap' },
  ];

  const metaAdsPreviews = [
    { num: '01', page: '03', title: '6 Blueprint Pillars', file: '/assets/meta-preview-01.svg?v=1', desc: 'Foundations & local market dynamics' },
    { num: '02', page: '09', title: 'Auction Mechanics', file: '/assets/meta-preview-02.svg?v=1', desc: 'Total Value formula & CPM control' },
    { num: '03', page: '24', title: '20 Bangla Hooks', file: '/assets/meta-preview-03.svg?v=1', desc: 'High-CTR copy angles for Bangladesh' },
    { num: '04', page: '36', title: 'COD Unit Economics', file: '/assets/meta-preview-04.svg?v=1', desc: 'Return cost math & breakeven CPA' },
    { num: '05', page: '42', title: 'Dynamic Testing', file: '/assets/meta-preview-05.svg?v=1', desc: '3:2:2 DCT sandbox & scaling matrix' },
    { num: '06', page: '48', title: '30-Day Scale Plan', file: '/assets/meta-preview-06.svg?v=1', desc: 'Execution roadmap & daily checklist' },
  ];

  const activePreviews = selectedProductSlug === 'client-hunting' ? clientHuntingPreviews : metaAdsPreviews;
  const currentProduct = selectedProductSlug === 'client-hunting' ? PRODUCTS[0] : PRODUCTS[1];

  const handleTabChange = (slug: string) => {
    setSelectedProductSlug(slug);
    setSelectedIdx(0);
  };

  return (
    <section id="preview" className="py-24 bg-background-alt border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Eye className="w-3.5 h-3.5" />
            <span>Real Inside Look</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Preview Real Sample Pages
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inspect actual pages from our playbooks. Sensitive proprietary scripts, hooks, and formulas are partially blurred in these public previews.
          </p>

          {/* Guide Selector Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => handleTabChange('client-hunting')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedProductSlug === 'client-hunting'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>AI Client Hunting Toolkit (40 Pgs)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('meta-ads')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedProductSlug === 'meta-ads'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Meta Ads Blueprint 2026 (53 Pgs)</span>
            </button>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {activePreviews.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedIdx === idx
                  ? selectedProductSlug === 'client-hunting'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Page {p.page}: {p.title}
            </button>
          ))}
        </div>

        {/* Active Preview Showcase */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 p-2 sm:p-4">
            <div className="relative aspect-[600/840] max-h-[620px] mx-auto overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
              <img
                src={activePreviews[selectedIdx].file}
                alt={`Preview of ${activePreviews[selectedIdx].title}`}
                className="w-full h-full object-contain rounded-lg shadow-inner"
                loading="lazy"
              />
              {/* Blurred Overlay Badge for Curiosity */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-md py-3 px-4 rounded-xl glass-panel border-cyan-500/30 flex items-center justify-between text-xs shadow-xl">
                <div className="flex items-center gap-2 text-slate-200">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold">Full framework unlocked in complete PDF</span>
                </div>
                <button
                  onClick={() => onOpenCheckout(currentProduct.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shrink-0"
                >
                  Unlock ৳{currentProduct.price}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid for other pages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-10">
          {activePreviews.map((p, idx) => (
            <div
              key={p.num}
              onClick={() => setSelectedIdx(idx)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900/60 ${
                selectedIdx === idx
                  ? selectedProductSlug === 'client-hunting'
                    ? 'border-cyan-400 scale-105 shadow-glow-cyan'
                    : 'border-purple-400 scale-105 shadow-purple-500/30'
                  : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-slate-950 relative">
                <img
                  src={p.file}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div className="text-[10px] font-bold text-center mt-1.5 text-slate-300 truncate px-1">
                P. {p.page}: {p.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
