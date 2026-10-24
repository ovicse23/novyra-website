import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { GEMINI_PRO_PRODUCT } from '../../shared/products';

interface GeminiProSectionProps {
  onOpenCheckout: (productId: string) => void;
}

export const GeminiProSection: React.FC<GeminiProSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section id="gemini-pro" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-slate-950/70 border-y border-white/10">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Top Highlight Badge */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/15 via-purple-500/15 to-cyan-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-black uppercase tracking-wider mb-4 shadow-lg shadow-rose-500/10 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>🔥 HOT NEW ITEM • GOOGLE FLAGSHIP AI ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl xl:max-w-5xl leading-tight">
            কি কি পাচ্ছেন <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Gemini Pro 18 Months Personal</span>-তে
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl lg:max-w-4xl font-medium leading-relaxed">
            একটি সাবস্ক্রিপশনেই আনলক করুন গুগল-এর সকল পাওয়ারফুল এআই টুলস ও ক্লাউড স্টোরেজ
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>১০০% পার্সোনাল জিমেইল অ্যাকাউন্টে অফিসিয়াল এক্টিভেশন • ১৮ মাস গ্যারান্টি</span>
          </div>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {/* Card 1 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Google-এর ফ্ল্যাগশিপ মডেল
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                Gemini 3.1 Pro &amp; 4 Argon
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                Google-এর ফ্ল্যাগশিপ মডেল, ২ মিলিয়ন টোকেন মেমরি সহ আল্ট্রা-ফাস্ট রেসপন্স ও কোডিং সহায়তা।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>2M Token Large Context Window</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ☁️
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                Drive, Gmail ও Photos-এর জন্য
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-blue-300 transition-colors">
                ৫TB ক্লাউড স্টোরেজ
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                Drive, Gmail ও Photos-এর জন্য বিশাল ৫ টেরাবাইট পার্সোনাল অফিসিয়াল ক্লাউড স্টোরেজ।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Official Google One 5,000 GB Capacity</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎥
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                সিনেমেটিক AI ভিডিও নির্মাণ
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-purple-300 transition-colors">
                Veo AI Video Generator
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                টেক্সট এবং ছবি থেকে আল্ট্রা সিনেম্যাটিক 1080p ফুল HD AI ভিডিও তৈরি করার সুবিধা।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Full HD 1080p Cinematic Generation</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎬
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                মুভি ও শর্ট ফিল্ম স্টোরিবোর্ড
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-pink-300 transition-colors">
                Flow AI Filmmaking &amp; Imagen 3
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                মুভি ও শর্ট ফিল্মের জন্য শট-বাই-শট ফুল স্টোরিবোর্ড ও আল্ট্রা-রিয়েলিস্টিক আর্ট জেনারেটর।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>Shot-by-Shot Director Storyboard &amp; Art</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                অটো রিচার্জেবল ক্রেডিট
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                1,000+ AI Credits / Month
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                প্রতি মাসে অটোমেটিক রিচার্জেবল হাই-প্রায়োরিটি ফাস্ট জেনারেশন ক্রেডিট।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>High-Priority Queue &amp; Fast Inferences</span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                অ্যাডভান্সড রিসার্চ ও অডিও সামারি
              </span>
              <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                NotebookLM Pro Enhanced
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                রিসার্চ পেপার, বই বা বড় ডকুমেন্ট আপলোড করে নিমেষেই অডিও ডিসকাশন ও সারাংশ তৈরি।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>AI Podcast Audio Discussions &amp; Deep Synthesis</span>
            </div>
          </div>
        </div>

        {/* Pricing Banner & Call To Action */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
                <span>১৮ মাস ভ্যালিডিটি • ফুল পার্সোনাল এক্সেস</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Gemini Pro 18 Months Personal প্যাকেজ
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                ৫TB গুগল ক্লাউড স্টোরেজ সহ সব কয়টি প্রিমিয়াম এআই টুল এখন আপনার নিজস্ব জিমেইলে।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <div className="text-left sm:text-right pr-2">
                <div className="text-3xl sm:text-4xl font-black text-cyan-300">
                  ৳৩৯৯ <span className="text-xs font-medium text-slate-400">/ ১৮ মাস</span>
                </div>
                <div className="text-xs text-slate-500 line-through">
                  রেগুলার মূল্য: ৳১,৪৯৯ (৭৩% ছাড়)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenCheckout(GEMINI_PRO_PRODUCT.id)}
                  className="px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>এখনই অর্ডার করুন — ৳৩৯৯</span>
                </button>

                <a
                  href="/gemini-pro"
                  className="px-5 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>ল্যান্ডিং পেজ দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
