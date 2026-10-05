import React, { useState } from 'react';
import { Eye, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface PdfPreviewProps {
  onOpenCheckout: () => void;
  price?: number;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({ onOpenCheckout, price = 299 }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const previews = [
    { num: '01', page: '04', title: 'Operating System', file: '/assets/preview-01.svg?v=4', desc: 'Position, Prospect, Convert formula' },
    { num: '02', page: '08', title: 'Ideal Client Profile', file: '/assets/preview-02.svg?v=4', desc: 'Company fit & lead-scoring matrix' },
    { num: '03', page: '14', title: 'AI Prompt Pack', file: '/assets/preview-03.svg?v=4', desc: 'Trigger extraction & qualification' },
    { num: '04', page: '17', title: 'Upwork Proposal', file: '/assets/preview-04.svg?v=4', desc: '5-part proposal blueprint & AI critic' },
    { num: '05', page: '23', title: 'LinkedIn Outreach', file: '/assets/preview-05.svg?v=4', desc: '4-touch conversation sequence' },
    { num: '06', page: '39', title: '30-Day Action Plan', file: '/assets/preview-06.svg?v=4', desc: 'Day-by-day execution calendar' },
  ];

  return (
    <section id="preview" className="py-24 bg-background-alt border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Eye className="w-3.5 h-3.5" />
            Inside Look
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Real Sample Pages Preview
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            See exactly how practical and organized the guide is. Proprietary AI prompts and script vaults are partially blurred in these public previews.
          </p>
        </div>

        {/* Preview Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {previews.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedIdx === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Page {p.page}: {p.title}
            </button>
          ))}
        </div>

        {/* Active Preview Showcase */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 p-2 sm:p-4">
            <div className="relative aspect-[600/840] max-h-[620px] mx-auto overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
              <img
                src={previews[selectedIdx].file}
                alt={`Preview of ${previews[selectedIdx].title}`}
                className="w-full h-full object-contain rounded-lg shadow-inner"
                loading="lazy"
              />
              {/* Blurred Overlay Badge for Curiosity */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-md py-3 px-4 rounded-xl glass-panel border-cyan-500/30 flex items-center justify-between text-xs shadow-xl">
                <div className="flex items-center gap-2 text-slate-200">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold">Full prompt & scripts unlocked in PDF</span>
                </div>
                <button
                  onClick={onOpenCheckout}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shrink-0"
                >
                  Unlock ৳{price}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid for other pages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto mb-12">
          {previews.map((p, idx) => (
            <div
              key={p.num}
              onClick={() => setSelectedIdx(idx)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900/60 ${
                selectedIdx === idx ? 'border-cyan-400 scale-105 shadow-glow-cyan' : 'border-slate-800 hover:border-slate-600'
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
                P. 0{p.num}: {p.title}
              </div>
            </div>
          ))}
        </div>

        {/* CTA below preview */}
        <div className="text-center">
          <button
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-3 py-4 px-8 rounded-xl font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5 text-cyan-200" />
            <span>Get the Complete 40-Page Toolkit — ৳{price}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="mt-3 text-xs text-slate-400">
            Instant digital access • Mobile & Desktop readable • Downloadable PDF
          </div>
        </div>
      </div>
    </section>
  );
};
