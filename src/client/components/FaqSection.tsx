import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Are these video courses or PDF manuals?',
      a: 'They are high-density, practical digital PDF manuals (40 pages for AI Client Hunting, 53 pages for Meta Ads Blueprint). You receive instant, distraction-free reference materials containing frameworks, scripts, copy formulas, and spreadsheets without having to sit through 20+ hours of video fluff.',
    },
    {
      q: 'Can I purchase both playbooks together?',
      a: 'Yes! You can get the Complete Growth Bundle for ৳499 BDT (regular value ৳1,398 BDT), which gives you full access to both playbooks (93 pages total) and all future edition updates.',
    },
    {
      q: 'How will I receive access to my files?',
      a: 'After you create an order and submit your bKash or Rocket transaction ID (TxnID), our team verifies the payment. Once approved (normally within 5–30 minutes), your private, secure download link unlocks automatically on your order status page.',
    },
    {
      q: 'Can I read the playbooks on my phone?',
      a: 'Yes. Every PDF is formatted and optimized for crystal-clear reading on mobile phones (iOS & Android), tablets, and desktop computers.',
    },
    {
      q: 'Does buying this guarantee results or income?',
      a: 'No. These are educational operating frameworks and execution systems. Actual business results and client acquisition depend on your foundational skills, portfolio quality, market demand, and consistency of execution.',
    },
    {
      q: 'Which payment methods are accepted?',
      a: 'We accept manual payments via bKash Personal (01638002708) and Rocket Personal (016380027089) Send Money.',
    },
    {
      q: 'How long does payment verification take?',
      a: 'Normally within 5–30 minutes during standard support hours (10:00 AM – 11:00 PM BST). During overnight hours, submissions are approved early the next morning.',
    },
    {
      q: 'Can I share or distribute the PDF with others?',
      a: 'No. Your purchase grants an individual, non-transferable Personal Use License. Re-distributing, file-sharing, resale, or uploading the PDF online is strictly prohibited and monitored by unique download tokens.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-background-alt border-y border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Everything you need to know about our playbooks, bundle options, and digital delivery.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:bg-slate-800/40"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
