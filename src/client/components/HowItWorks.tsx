import React from 'react';
import { UserCheck, Smartphone, Send, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenCheckout: () => void;
  price?: number;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenCheckout, price = 299 }) => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Order',
      icon: UserCheck,
      color: 'from-cyan-400 to-blue-500',
      desc: 'Enter your Name, Email, and Mobile number. The system instantly generates your unique Order ID (e.g. NV-10482).',
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'Send Manual Payment',
      icon: Smartphone,
      color: 'from-blue-500 to-indigo-600',
      desc: `Send ৳${price} to our official bKash (01638002708) or Rocket (016380027089) personal number via Send Money.`,
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'Submit Transaction ID',
      icon: Send,
      color: 'from-purple-500 to-pink-500',
      desc: 'Submit your sender number and the SMS Transaction ID (TxnID). You can also optionally attach a payment screenshot.',
      badge: 'Step 3',
    },
    {
      num: '04',
      title: 'Verification & Access',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-500',
      desc: 'Our admin manually verifies your transaction within 5–30 minutes, unlocking your private expiring download link.',
      badge: 'Step 4',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How The Order & Delivery Works
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Smooth, secure manual payment via bKash or Rocket with protected digital PDF delivery.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="glass-card p-6 rounded-2xl border-white/5 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-400 tracking-widest">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] font-semibold text-slate-400">
                  {idx < 3 ? 'Proceeds to Next Step →' : '✓ Unlocks Download'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Reassurance Callout */}
        <div className="glass-panel max-w-2xl mx-auto p-5 rounded-xl border-amber-500/20 flex items-center gap-4 text-xs text-slate-300 mb-8">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-bold">
            🛡️
          </div>
          <div>
            <span className="font-bold text-white block mb-0.5">Zero Security Risk</span>
            We will never ask for your bKash/Rocket PIN or OTP. All payments are sent through your own bKash/Rocket app using standard Send Money.
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-2.5 py-3.5 px-7 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <span>Start Order Now — ৳{price}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
