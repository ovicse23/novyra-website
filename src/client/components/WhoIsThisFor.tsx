import React from 'react';
import { Users, Check } from 'lucide-react';

export const WhoIsThisFor: React.FC = () => {
  const roles = [
    { title: 'WordPress Developers', badge: 'High Demand' },
    { title: 'Web Developers', badge: 'Full Stack & Frontend' },
    { title: 'Graphic Designers', badge: 'Brand & UI/UX' },
    { title: 'Video Editors', badge: 'Shorts & Long-form' },
    { title: 'SEO Specialists', badge: 'B2B & Ecom' },
    { title: 'Digital Marketers', badge: 'Meta & Google Ads' },
    { title: 'Social Media Managers', badge: 'Growth & Content' },
    { title: 'Virtual Assistants', badge: 'Lead Gen & Admin' },
    { title: 'New Freelancers', badge: 'Getting First Clients' },
    { title: 'Fiverr Sellers', badge: 'Level 1 & 2 Sellers' },
    { title: 'Upwork Freelancers', badge: 'Rising Talent & Top Rated' },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            Target Audience
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Who Is This Toolkit For?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            If you already have a skill but need a better system for finding potential clients, this toolkit is designed for you.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-10">
          {roles.map((r, i) => (
            <div
              key={i}
              className="glass-card p-4 rounded-xl border-white/5 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                  {r.badge}
                </span>
              </div>
              <div className="text-sm font-bold text-white leading-snug">
                {r.title}
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="max-w-2xl mx-auto text-center p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
          💡 <span className="font-semibold text-white">Notice:</span> This is not for people looking for passive income or get-rich-quick methods. This toolkit is for dedicated freelancers ready to implement a systematic outreach workflow.
        </div>
      </div>
    </section>
  );
};
