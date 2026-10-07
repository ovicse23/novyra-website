import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const learnedSkills = [
    'Web Development',
    'Meta & Google Ads',
    'UI/UX Design',
    'Video Editing',
    'SEO & Content',
    'E-Commerce & Dropshipping',
  ];

  const painPoints = [
    {
      title: 'No Direct Client Pipeline',
      desc: 'Trapped waiting for platform impressions or competing against hundreds of lowball bids on freelance marketplaces.',
    },
    {
      title: 'Low Response Rates on Cold Outreach',
      desc: 'Sending generic messages on LinkedIn or email that get ignored or marked as spam with zero buyer engagement.',
    },
    {
      title: 'Burning Ad Spend Without Profit',
      desc: 'Boosting Facebook posts or running poorly structured campaigns with high CPMs and negative return on ad spend (ROAS).',
    },
    {
      title: 'Devastating Cash-on-Delivery (COD) Losses',
      desc: 'Ignoring courier return delivery fees and failed deliveries that silently wipe out all gross profit in Bangladesh.',
    },
    {
      title: 'Inconsistent Sales Conversations',
      desc: 'Unsure how to run a diagnostic sales call, unearth client budget, or pitch high-ticket retainers with confidence.',
    },
    {
      title: 'Copy Fatigue & Lack of Local Hooks',
      desc: 'Using generic translated ad copy that fails to stop the scroll or trigger buying psychology among Bangladeshi consumers.',
    },
  ];

  return (
    <section className="py-20 bg-background-alt border-y border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Real Market Bottleneck</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Having Skills Isn't Enough. You Need a Repeatable Growth Engine.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Most professionals spend years mastering valuable technical capabilities across:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {learnedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-rose-300/90 text-sm sm:text-base font-semibold mt-4">
            Yet 90% struggle because they lack a disciplined client acquisition or advertising operating system.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-14">
          {painPoints.map((pain, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/15 flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-rose-400 text-xs font-bold">✕</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{pain.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pain.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The Solution Transition Box */}
        <div className="glass-panel max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border-cyan-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Novyra Playbooks Replace Guesswork with Systematic Execution
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Instead of relying on hope or random luck, deploy structured outbound pipelines, high-converting copy angles, and rigorous unit margin math to build sustainable revenue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
