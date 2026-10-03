import React from 'react';
import {
  Search,
  Briefcase,
  Layers,
  Linkedin,
  Facebook,
  Mail,
  Bot,
  FileCode,
  DollarSign,
  PhoneCall,
  ShieldAlert,
  CalendarCheck2,
} from 'lucide-react';

export const WhatsInside: React.FC = () => {
  const modules = [
    {
      num: '01',
      title: 'Client Research with AI',
      icon: Search,
      color: 'from-cyan-400 to-blue-500',
      borderColor: 'hover:border-cyan-500/40',
      bullets: [
        'Ideal clients & high-budget buyer identification',
        'Finding actual business decision makers',
        'Pinpointing specific business problems & gaps',
        'Discovering high-value service opportunities',
        'Extracting unique personalization points with AI',
      ],
    },
    {
      num: '02',
      title: 'Upwork Strategy',
      icon: Briefcase,
      color: 'from-emerald-400 to-teal-500',
      borderColor: 'hover:border-emerald-500/40',
      bullets: [
        'Advanced job filtering & budget qualification',
        'In-depth client hiring history & job analysis',
        'The 4-sentence proposal personalization formula',
        'Winning proposal structure & opening hooks',
        'Filtering out red flags & low-budget time wasters',
      ],
    },
    {
      num: '03',
      title: 'Fiverr Strategy',
      icon: Layers,
      color: 'from-green-400 to-emerald-600',
      borderColor: 'hover:border-green-500/40',
      bullets: [
        'Premium gig positioning to attract Western clients',
        'High-converting buyer inbox communication',
        'Researching buyer profiles & past feedback',
        'Turning one-off gig buyers into direct retainers',
      ],
    },
    {
      num: '04',
      title: 'LinkedIn Outreach',
      icon: Linkedin,
      color: 'from-blue-400 to-indigo-500',
      borderColor: 'hover:border-blue-500/40',
      bullets: [
        'Finding qualified prospects without paid Sales Nav',
        'High-acceptance connection message templates',
        'Natural conversation starters (no spammy sales pitch)',
        'Value-first follow-up sequences that convert',
      ],
    },
    {
      num: '05',
      title: 'Facebook Client Hunting',
      icon: Facebook,
      color: 'from-sky-400 to-blue-600',
      borderColor: 'hover:border-sky-500/40',
      bullets: [
        'Mining niche business groups & international communities',
        'Approaching active business pages with value audits',
        'Positioning yourself as a problem solver in groups',
        'Direct messaging etiquette that sparks genuine discussions',
      ],
    },
    {
      num: '06',
      title: 'Cold Email Masterclass',
      icon: Mail,
      color: 'from-purple-400 to-indigo-600',
      borderColor: 'hover:border-purple-500/40',
      bullets: [
        'Targeted B2B prospecting & verified email extraction',
        'High-open subject line formulas proven in 2026',
        'The 75-word concise first email structure',
        'Strategic 4-stage follow-up sequence timing',
        'Hyper-personalized compliment & audit hooks',
      ],
    },
    {
      num: '07',
      title: 'AI Prompts Vault',
      icon: Bot,
      color: 'from-pink-400 to-rose-500',
      borderColor: 'hover:border-pink-500/40',
      bullets: [
        'Company & industry research prompt templates',
        'Upwork & Fiverr custom proposal generation prompts',
        'Personalized LinkedIn & cold email drafting prompts',
        'Client follow-up & objection handling AI prompts',
      ],
    },
    {
      num: '08',
      title: 'Proposal & Message Scripts',
      icon: FileCode,
      color: 'from-amber-400 to-orange-500',
      borderColor: 'hover:border-amber-500/40',
      bullets: [
        'Ready-to-use plug-and-play outreach scripts',
        'Niche-specific templates (Web, Design, Video, Marketing)',
        'Breakup email templates that get surprising replies',
        'Re-engagement scripts for past inactive clients',
      ],
    },
    {
      num: '09',
      title: 'Pricing & Communication',
      icon: DollarSign,
      color: 'from-emerald-300 to-teal-400',
      borderColor: 'hover:border-teal-500/40',
      bullets: [
        'Transitioning from low hourly rates to value-based pricing',
        'How to quote fixed prices without getting underpaid',
        'Handling price objections like a seasoned professional',
        'Payment terms, milestone structures & contracts',
      ],
    },
    {
      num: '10',
      title: 'Discovery Call Guidance',
      icon: PhoneCall,
      color: 'from-violet-400 to-purple-600',
      borderColor: 'hover:border-violet-500/40',
      bullets: [
        '15-minute qualification call roadmap & questions',
        'Diagnosing business pain points on Zoom/Google Meet',
        'Presenting your solution with authority & calm confidence',
        'Closing the deal smoothly on the call',
      ],
    },
    {
      num: '11',
      title: 'Scam Client Detection',
      icon: ShieldAlert,
      color: 'from-rose-400 to-red-600',
      borderColor: 'hover:border-rose-500/40',
      bullets: [
        '12 unmistakable red flags of fraudulent clients',
        'Telegram & outside payment scam avoidance checklist',
        'Recognizing fake job posts and identity thieves',
        'Protecting your work, accounts, and valuable time',
      ],
    },
    {
      num: '12',
      title: '30-Day Client Hunting Plan',
      icon: CalendarCheck2,
      color: 'from-cyan-400 to-indigo-500',
      borderColor: 'hover:border-cyan-500/40',
      bullets: [
        'Week 1: Positioning, profile revamp & AI tool setup',
        'Week 2: 50 targeted prospects & customized first contact',
        'Week 3: Systematic follow-ups & discovery call booking',
        'Week 4: Proposal delivery, negotiation & closing retainers',
      ],
    },
  ];

  return (
    <section id="whats-inside" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            Curriculum Breakdown
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            What's Inside The 40-Page Toolkit
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A comprehensive, no-fluff playbook covering the complete client hunting journey from research to closing.
          </p>
        </div>

        {/* 12 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.num}
                className={`glass-card p-6 rounded-2xl flex flex-col justify-between border-white/5 ${m.borderColor} relative group overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 tracking-wider">
                      MODULE {m.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h3>

                  <ul className="space-y-2 mb-6">
                    {m.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Practical Guide</span>
                  <span className="text-cyan-400 group-hover:underline">Actionable Steps →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
