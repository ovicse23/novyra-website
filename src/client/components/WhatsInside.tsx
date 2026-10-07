import React, { useState } from 'react';
import {
  Search,
  Briefcase,
  Linkedin,
  Mail,
  Bot,
  PhoneCall,
  TrendingUp,
  Cpu,
  Target,
  FileText,
  Calculator,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const WhatsInside: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client-hunting' | 'meta-ads'>('client-hunting');

  const clientHuntingModules = [
    {
      num: '01',
      title: 'Client Research & Trigger Detection',
      icon: Search,
      color: 'from-cyan-400 to-blue-500',
      bullets: [
        'Identify companies with high buying power & urgent needs',
        'Finding decision-maker contact emails & LinkedIn profiles',
        'Detecting buying triggers (job openings, rebrands, broken tech)',
        'Extracting deep company personalization points with AI',
      ],
    },
    {
      num: '02',
      title: 'Upwork & Freelance Marketplace Strategy',
      icon: Briefcase,
      color: 'from-emerald-400 to-teal-500',
      bullets: [
        'Advanced job filtering & budget qualification parameters',
        'Analyzing client hiring patterns & budget history',
        'The 4-sentence high-impact proposal formula',
        'Filtering out red flags & low-budget time wasters',
      ],
    },
    {
      num: '03',
      title: 'LinkedIn Outreach Operating System',
      icon: Linkedin,
      color: 'from-blue-400 to-indigo-500',
      bullets: [
        'Finding qualified international founders without paid Sales Nav',
        'High-acceptance connection message templates',
        'Value-first conversation openers that avoid pitch-slapping',
        'Strategic 3-step follow-up messages that revive dormant leads',
      ],
    },
    {
      num: '04',
      title: 'Cold Email Outbound Machine',
      icon: Mail,
      color: 'from-purple-400 to-indigo-600',
      bullets: [
        'Subject line formulas with 60%+ open rates in 2026',
        'The 80-word relevance bridge framework',
        'Micro-case study formatting for maximum credibility',
        'Handling common objections before they are even raised',
      ],
    },
    {
      num: '05',
      title: 'AI Prompts for Client Research & Copy',
      icon: Bot,
      color: 'from-pink-400 to-rose-600',
      bullets: [
        'Prompt systems to generate tailored company audits in 60s',
        'Extracting pain points from client website code & ads',
        'Generating hyper-personalized video pitch scripts',
        'Refining proposal tone to match Western corporate style',
      ],
    },
    {
      num: '06',
      title: 'Discovery Calls, Pricing & Scope Protection',
      icon: PhoneCall,
      color: 'from-amber-400 to-orange-500',
      bullets: [
        'Exact questions to unearth true client budget on Zoom calls',
        'Value-based pricing vs. hourly rate traps',
        'One-page scope agreement template that prevents scope creep',
        'Milestone payment security and international payout setup',
      ],
    },
  ];

  const metaAdsModules = [
    {
      num: '01',
      title: 'Foundations & Meta Auction Mechanics',
      icon: Cpu,
      color: 'from-purple-400 to-indigo-500',
      bullets: [
        'How Meta calculates Total Value: (Bid × Action Rate) + User Value',
        'Understanding CPM dynamics across Dhaka vs. Outside Dhaka',
        'Algorithmic quality scores and how to earn CPM discounts',
        'Avoiding ad account bans and restricted payment loops in BD',
      ],
    },
    {
      num: '02',
      title: 'Measurement & Conversions API (CAPI)',
      icon: Target,
      color: 'from-blue-400 to-cyan-500',
      bullets: [
        'Pixel event setup with server-side CAPI deduplication',
        'Overcoming iOS 14.5+ attribution loss and browser ad blockers',
        'Catalog feed integration for dynamic product ads (DPA)',
        'Event Quality Match score optimization above 8.5/10',
      ],
    },
    {
      num: '03',
      title: 'Audience Architecture & Advantage+ Campaigns',
      icon: Compass,
      color: 'from-emerald-400 to-teal-500',
      bullets: [
        'Broad targeting vs. Interest clusters in Bangladesh',
        'When and how to use Advantage+ Shopping Campaigns (ASC)',
        'Exclusion setups that stop wasting ad budget on existing buyers',
        'Local geographic segmentation for Courier hub efficiency',
      ],
    },
    {
      num: '04',
      title: '20 Bangla Hooks & Conversion Copywriting',
      icon: FileText,
      color: 'from-pink-400 to-purple-600',
      bullets: [
        '20 proven Bangla hooks across Curiosity, FOMO & Problem angles',
        '10 primary-text formulas engineered for Bangladeshi shoppers',
        '10 headline blueprints tested for high click-through rates (CTR)',
        'Visual creative layout rules that increase 3-second hook rate',
      ],
    },
    {
      num: '05',
      title: 'Cash-on-Delivery (COD) Math & Unit Margins',
      icon: Calculator,
      color: 'from-amber-400 to-orange-500',
      bullets: [
        'Courier return cost calculation & parcel cancellation buffers',
        'True Breakeven ROAS formula accounting for failed deliveries',
        'Pre-dispatch phone call verification scripts to slash returns',
        'Net profit tracking spreadsheet structure for local e-commerce',
      ],
    },
    {
      num: '06',
      title: 'Dynamic Creative Testing & 30-Day Scale Roadmap',
      icon: TrendingUp,
      color: 'from-cyan-400 to-emerald-500',
      bullets: [
        'The 3:2:2 Dynamic Creative Testing (DCT) sandbox setup',
        'Kill & scale decision rules based on spend-to-CPA ratios',
        'Horizontal scaling vs. vertical budget increases without fatigue',
        'Step-by-step 30-day campaign execution checklist',
      ],
    },
  ];

  const currentModules = activeTab === 'client-hunting' ? clientHuntingModules : metaAdsModules;

  return (
    <section id="curriculum" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Execution Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            What's Inside the Guides?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Explore the exact frameworks, chapters, and templates contained inside each playbook.
          </p>

          {/* Interactive Playbook Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('client-hunting')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'client-hunting'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>AI Client Hunting Toolkit</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/20 font-mono">40 Pgs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('meta-ads')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'meta-ads'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Meta Ads Blueprint 2026</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">53 Pgs</span>
            </button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.num}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-black text-slate-400 tracking-wider">
                      CHAPTER {mod.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Module Title */}
                  <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                    {mod.title}
                  </h3>

                  {/* Bullet Points */}
                  <div className="space-y-2.5">
                    {mod.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
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
