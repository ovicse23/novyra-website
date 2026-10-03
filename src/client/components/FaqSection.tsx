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
      q: 'Is this a video course?',
      a: 'No. It is a practical 40-page digital PDF toolkit containing actionable frameworks, real proposal templates, AI prompt formulas, and step-by-step outreach checklists.',
    },
    {
      q: 'How will I receive it?',
      a: 'After you submit your payment transaction ID, our team manually verifies the transaction and approves your order. Your private, secure download link unlocks automatically on your order status page.',
    },
    {
      q: 'Can I open it on my phone?',
      a: 'Yes. The PDF is optimized for crystal-clear reading on smartphones (iOS & Android), tablets, and desktops.',
    },
    {
      q: 'Does buying this guarantee clients?',
      a: 'No. This is educational material and a practical system. Results depend on your existing skills, portfolio quality, market demand, implementation, and outreach consistency.',
    },
    {
      q: 'Which payment methods are available?',
      a: 'We accept manual payments via bKash Personal (01638002708) and Rocket Personal (016380027089).',
    },
    {
      q: 'How long does verification take?',
      a: 'Normally within 5–30 minutes during support hours (10:00 AM – 11:00 PM BST). During overnight hours, orders are approved early the following morning.',
    },
    {
      q: 'Can I share the PDF?',
      a: 'No. Your purchase grants a single-user Personal Use License. Redistribution, resale, group sharing, or public re-uploading is strictly prohibited and monitored.',
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
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Everything you need to know about the toolkit, format, and payment verification.
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
