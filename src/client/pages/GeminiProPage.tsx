import React, { useState } from 'react';
import {
  Sparkles,
  Cloud,
  Video,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Check,
} from 'lucide-react';
import { GEMINI_PRO_PRODUCT } from '../../shared/products';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import type { ProductConfig, StockInfo } from '../../shared/types';

interface GeminiProPageProps {
  onOpenCheckout: (productId?: string) => void;
  config?: ProductConfig;
  stock?: StockInfo;
}

export const GeminiProPage: React.FC<GeminiProPageProps> = ({ onOpenCheckout, config, stock }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentStock = stock || config?.geminiStock || {
    totalStock: 100,
    baseSold: 92,
    currentSales: 0,
    totalSold: 92,
    remaining: 8,
    isSoldOut: false,
  };
  const percent = Math.min(100, Math.round((currentStock.totalSold / currentStock.totalStock) * 100));

  const handleOpenLocalCheckout = () => {
    if (currentStock.isSoldOut) return;
    if (onOpenCheckout) {
      onOpenCheckout(GEMINI_PRO_PRODUCT.id);
    } else {
      setModalOpen(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'আমার পার্সোনাল জিমেইল অ্যাকাউন্টে কি এটি এক্টিভ হবে?',
      a: 'হ্যাঁ, ১০০% আপনার নিজস্ব পার্সোনাল জিমেইল অ্যাকাউন্টে এক্টিভেশন হবে। আপনাকে কোনো পাসওয়ার্ড শেয়ার করতে হবে না। আমরা আপনার জিমেইলে গুগল-এর অফিশিয়াল ফ্যামিলি মেম্বার ইনভাইটেশন লিংক পাঠাবো, যেখানে আপনি এক ক্লিকে "Accept Invitation" করলেই ৫TB ক্লাউড স্টোরেজ ও জেমিনি প্রো আনলক হয়ে যাবে।',
    },
    {
      q: 'আমার ড্রাইভের আগের ফাইল ও ছবিগুলো কি সুরক্ষিত থাকবে?',
      a: 'অবশ্যই। আপনার বর্তমান জিমেইল, গুগল ড্রাইভ ও গুগল ফটোসের কোনো ফাইল ডিলিট বা ক্ষতিগ্রস্ত হবে না। আপনার বিদ্যমান ১৫ জিবি স্টোরেজ স্বয়ংক্রিয়ভাবে ৫,০০০ জিবি (৫ টেরাবাইট)-তে আপগ্রেড হয়ে যাবে।',
    },
    {
      q: 'অন্য কেউ কি আমার ড্রাইভ বা ফটোর ফাইল দেখতে পারবে?',
      a: 'একেবারেই না। গুগল-এর কঠোর প্রাইভেসি পলিসি অনুযায়ী আপনার ড্রাইভ, ফটোস এবং জিমেইলের ফাইল শুধুমাত্র আপনি নিজেই দেখতে পারবেন। গ্রুপের অ্যাডমিন বা অন্য কোনো সদস্য আপনার ব্যক্তিগত ফাইল কখনোই অ্যাক্সেস করতে পারবে না।',
    },
    {
      q: '১৮ মাসের ভ্যালিডিটি ও রিপ্লেসমেন্ট গ্যারান্টি কীভাবে কাজ করে?',
      a: 'এই সাবস্ক্রিপশনটি ১৮ মাস (১.৫ বছর) মেয়াদের জন্য নিশ্চিতভাবে সক্রিয় থাকবে। কোনো অনাকাঙ্ক্ষিত প্রযুক্তিগত কারণে সমস্যা হলে Novyra-এর পক্ষ থেকে ফ্রি রিপ্লেসমেন্ট সাপোর্ট প্রদান করা হবে।',
    },
    {
      q: 'অর্ডার করার কতক্ষণ পর এক্টিভেশন সম্পন্ন হবে?',
      a: 'পেমেন্ট ভেরিফিকেশনের পর সাধারণত ৫ থেকে ৩০ মিনিটের মধ্যে আপনার জিমেইলে অফিশিয়াল ইনভাইটেশন লিংক পৌঁছে যাবে। আমাদের সাপোর্ট টিম প্রতিনিয়ত হোয়াটসঅ্যাপে আপনার সাথে কানেক্টেড থাকবে।',
    },
    {
      q: 'কীভাবে পেমেন্ট করবো?',
      a: 'আপনি বিকাশ (bKash) অথবা রকেট (Rocket) পার্সোনাল নম্বরে "Send Money" করে ট্রানজেকশন আইডি (TxnID) সাবমিট করলেই অর্ডার প্রসেস শুরু হয়ে যাবে।',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Novyra Home">
            <img
              src="/assets/logo.png?v=3"
              alt="Novyra"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">ফিচারসমূহ</a>
            <a href="#storage" className="hover:text-cyan-400 transition-colors">৫TB স্টোরেজ</a>
            <a href="#compare" className="hover:text-cyan-400 transition-colors">কম্প্যারিজন</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">এক্টিভেশন পদ্ধতি</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            <a href="/order" className="hover:text-cyan-400 transition-colors text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Track Order
            </a>
          </nav>

          <button
            onClick={handleOpenLocalCheckout}
            disabled={currentStock.isSoldOut}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white transition-all ${
              currentStock.isSoldOut
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-lg shadow-cyan-500/25 active:scale-95'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{currentStock.isSoldOut ? 'স্টক শেষ (Sold Out)' : 'অর্ডার করুন — ৳৩৯৯'}</span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
          {/* Subtle cosmic glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-transparent blur-[140px] pointer-events-none" />

          <div className="max-w-6xl lg:max-w-7xl mx-auto text-center relative z-10">
            {/* Hot Item Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-cyan-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-black uppercase tracking-wider mb-6 shadow-xl shadow-rose-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>🔥 ১৮ মাসের মেগা স্পেশাল অফার • GOOGLE AI SUITE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              Gemini Pro 18 Months Personal
            </h1>

            <p className="mt-5 text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent max-w-4xl mx-auto leading-relaxed">
              একটি সাবস্ক্রিপশনেই আনলক করুন গুগল-এর সকল পাওয়ারফুল এআই টুলস ও ক্লাউড স্টোরেজ
            </p>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Google-এর ফ্ল্যাগশিপ মডেল Gemini 3.1 Pro &amp; 4 Argon, সাথে বিশাল ৫TB গুগল ওয়ান ক্লাউড স্টোরেজ, Veo সিনেম্যাটিক ভিডিও এবং Flow AI ফিল্মমেকিং — সরাসরি আপনার পার্সোনাল জিমেইলে।
            </p>

            {/* Key Metric Chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                ৫TB গুগল ক্লাউড স্টোরেজ
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Gemini 3.1 Pro &amp; 4 Argon (2M Tokens)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/30 text-xs font-bold text-pink-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-pink-400" />
                Veo AI 1080p Video Generator
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ১৮ মাস ফুল রিপ্লেসমেন্ট ওয়ারেন্টি
              </span>
            </div>

            {/* Scarcity / Stock Tracker Box */}
            <div className="mt-8 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-cyan-950/40 border border-rose-500/30 backdrop-blur-md shadow-xl text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                    {currentStock.isSoldOut ? (
                      <span className="text-rose-400">❌ ব্যাচ স্টক আউট • {currentStock.totalStock}/{currentStock.totalStock} বিক্রি সম্পন্ন</span>
                    ) : (
                      <span>
                        🔥 সীমিত স্টক: <strong className="text-rose-400">{currentStock.totalSold}টি বিক্রি</strong> • মাত্র <strong className="text-amber-300">{currentStock.remaining}টি বাকি</strong>
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  মোট কোটা: {currentStock.totalStock}টি
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    currentStock.isSoldOut
                      ? 'bg-rose-500'
                      : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                <span>{currentStock.totalSold} Sold ({percent}%)</span>
                {currentStock.isSoldOut ? (
                  <span className="text-rose-400 font-bold">পরবর্তী ব্যাচ শীঘ্রই যোগ করা হবে</span>
                ) : (
                  <span className="text-amber-300 font-bold animate-pulse">
                    আর মাত্র {currentStock.remaining}টি অর্ডার পেলেই স্টক শেষ হয়ে যাবে
                  </span>
                )}
              </div>
            </div>

            {/* Price Box & CTA */}
            <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl sm:text-5xl font-black text-cyan-300">
                  ৳৩৯৯
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    ১৮ মাস সম্পূর্ণ সাবস্ক্রিপশন
                  </div>
                  <div className="text-sm text-slate-500 line-through">
                    রেগুলার: ৳১,৪৯৯ (৭৩% স্পেশাল ছাড়)
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleOpenLocalCheckout}
                  disabled={currentStock.isSoldOut}
                  className={`flex-1 py-4 px-6 rounded-2xl font-black text-base text-white transition-all flex items-center justify-center gap-2 ${
                    currentStock.isSoldOut
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/30 active:scale-95'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>
                    {currentStock.isSoldOut
                      ? 'স্টক শেষ (Sold Out)'
                      : `এখনই সাবস্ক্রিপশন নিন — ৳৩৯৯ (মাত্র ${currentStock.remaining}টি বাকি)`}
                  </span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> নো পাসওয়ার্ড দরকার
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> ৫–৩০ মিনিটে এক্টিভেশন
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> বিকাশ / রকেট
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 CORE FEATURES DEEP-DIVE */}
        <section id="features" className="py-20 px-4 sm:px-6 bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                WHAT YOU GET IN GEMINI PRO 18M
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                কি কি পাচ্ছেন এই প্যাকেজে
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                গুগল-এর সর্বাধুনিক এআই ইনোভেশন ও ক্লাউড স্টোরেজের সম্পূর্ণ বান্ডেল
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                  Google-এর ফ্ল্যাগশিপ মডেল
                </div>
                <h3 className="text-xl font-black text-white">
                  Gemini 3.1 Pro &amp; 4 Argon
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Google-এর ফ্ল্যাগশিপ মডেল, ২ মিলিয়ন ტোকেন মেমরি সহ আল্ট্রা-ফাস্ট রেসপন্স ও কোডিং সহায়তা।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    ২,০০০,০০০ টোকেন কনটেক্সট উইন্ডো
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    কমপ্লেক্স কোডিং, অ্যালগরিদম ও ডিবাগিং
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div id="storage" className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  ☁️
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                  Drive, Gmail ও Photos-এর জন্য
                </div>
                <h3 className="text-xl font-black text-white">
                  ৫TB ক্লাউড স্টোরেজ
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Drive, Gmail ও Photos-এর জন্য বিশাল ৫ টেরাবাইট পার্সোনাল অফিসিয়াল ক্লাউড স্টোরেজ।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    ৫,০০০ জিবি অফিশিয়াল গুগল ওয়ান স্টোরেজ
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    ৪K ভিডিও, র ফাইল ও ছবি আনলিমিটেড ব্যাকআপ
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  🎥
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                  সিনেমেটিক AI ভিডিও নির্মাণ
                </div>
                <h3 className="text-xl font-black text-white">
                  Veo AI Video Generator
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  টেক্সট এবং ছবি থেকে আল্ট্রা সিনেম্যাটিক 1080p ফুল HD AI ভিডিও তৈরি করার সুবিধা।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    1080p ফুল HD হাই-ডেফিনিশন ভিডিও
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    ক্যামেরা মোশন, আলো ও রিয়ালিস্টিক ফিজিক্স
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  🎬
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
                  মুভি ও শর্ট ফিল্ম স্টোরিবোর্ড
                </div>
                <h3 className="text-xl font-black text-white">
                  Flow AI Filmmaking &amp; Imagen 3
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  মুভি ও শর্ট ফিল্মের জন্য শট-বাই-শট ফুল স্টোরিবোর্ড ও আল্ট্রা-রিয়েলিস্টিক আর্ট জেনারেটর।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                    ডিরেক্টর-লেভেল শট প্ল্যানিং ও স্টোরিবোর্ড
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                    Imagen 3 দিয়ে ক্রিস্টাল ক্লিয়ার ফটোরিয়ালিস্টিক ছবি
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  অটো রিচার্জেবল ক্রেডিট
                </div>
                <h3 className="text-xl font-black text-white">
                  1,000+ AI Credits / Month
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  প্রতি মাসে অটোমেটিক রিচার্জেবল হাই-প্রায়োরিটি ফাস্ট জেনারেশন ক্রেডিট।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    হাই-প্রায়োরিটি ফাস্ট লেন সার্ভিস
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    প্রতি মাসে স্বয়ংক্রিয়ভাবে নতুন ক্রেডিট যোগ
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  📚
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  অ্যাডভান্সড রিসার্চ ও অডিও সামারি
                </div>
                <h3 className="text-xl font-black text-white">
                  NotebookLM Pro Enhanced
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  রিসার্চ পেপার, বই বা বড় ডকুমেন্ট আপলোড করে নিমেষেই অডিও ডিসকাশন ও সারাংশ তৈরি।
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    AI হোস্টদ্বয়ের পডকাস্ট স্টাইল অডিও আলোচনা
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    বড় বই ও পিডিএফ থেকে নিমিষে এক্সিকিউটিভ সামারি
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section id="compare" className="py-20 px-4 sm:px-6 bg-slate-900/60 border-t border-slate-800">
          <div className="max-w-5xl lg:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                HEAD-TO-HEAD COMPARISON
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                ফ্রি গুগল একাউন্ট বনাম Gemini Pro 18 Months
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse rounded-2xl overflow-hidden glass-card">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80">
                    <th className="p-4 sm:p-5 text-sm font-bold text-slate-300">ফিচার বা টুল</th>
                    <th className="p-4 sm:p-5 text-sm font-bold text-slate-400">সাধারণ ফ্রি একাউন্ট</th>
                    <th className="p-4 sm:p-5 text-sm font-black text-cyan-300 bg-cyan-950/30">
                      Gemini Pro 18M Personal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">ক্লাউড স্টোরেজ</td>
                    <td className="p-4 sm:p-5 text-slate-400">মাত্র ১৫ জিবি (Drive + Gmail)</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">৫,০০০ জিবি (৫TB Google One)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">AI মডেল</td>
                    <td className="p-4 sm:p-5 text-slate-400">স্ট্যান্ডার্ড লিমিটেড মডেল</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">Gemini 3.1 Pro &amp; 4 Argon</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">মেমরি কনটেক্সট</td>
                    <td className="p-4 sm:p-5 text-slate-400">৩২,০০০ টোকেন লিমিট</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">২,০০০,০০০ (২M) টোকেন মেমরি</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">Veo AI ভিডিও জেনারেটর</td>
                    <td className="p-4 sm:p-5 text-slate-400">উপলব্ধ নয় ✕</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">১০৮০p ফুল HD ভিডিও জেনারেশন ✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">Flow AI ও Imagen 3</td>
                    <td className="p-4 sm:p-5 text-slate-400">সীমিত সুবিধা</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">ফুল স্টোরিবোর্ড ও আল্ট্রা আর্ট ✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">মাসিক AI ক্রেডিট</td>
                    <td className="p-4 sm:p-5 text-slate-400">০ ক্রেডিট (লো স্পিড)</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">১,০০০+ ফাস্ট লেন ক্রেডিট / মাস</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">NotebookLM Pro</td>
                    <td className="p-4 sm:p-5 text-slate-400">বেসিক মোড</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">এনহ্যান্সড পডকাস্ট ও ডিপ সিন্থেসিস</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-white">ভ্যালিডিটি ও সাপোর্ট</td>
                    <td className="p-4 sm:p-5 text-slate-400">নো সাপোর্ট</td>
                    <td className="p-4 sm:p-5 font-black text-cyan-300 bg-cyan-950/20">১৮ মাস রিপ্লেসমেন্ট ওয়ারেন্টি</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HOW TO ACTIVATE (3 SIMPLE STEPS) */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-slate-950 border-t border-slate-800">
          <div className="max-w-5xl lg:max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                EASY 3-STEP PROCESS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                কীভাবে এক্টিভেশন পাবেন?
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                কোনো জটিলতা ছাড়া মাত্র ৩টি সহজ পদক্ষেপে চালু করুন আপনার সাবস্ক্রিপশন
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center relative">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 font-black text-lg flex items-center justify-center mx-auto mb-4 border border-cyan-500/40">
                  ১
                </div>
                <h3 className="text-lg font-black text-white mb-2">অর্ডার দিন</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  আপনার নাম, জিমেইল অ্যাড্রেস ও মোবাইল নাম্বার দিয়ে বিকাশ বা রকেটে ৳৩৯৯ টাকা সেন্ড মানি করুন।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center relative">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-300 font-black text-lg flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                  ২
                </div>
                <h3 className="text-lg font-black text-white mb-2">ভেরিফিকেশন</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ট্রানজেকশন আইডি সাবমিট করার ৫–৩০ মিনিটের মধ্যে আমাদের সিস্টেম পেমেন্ট ভেরিফাই করবে।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center relative">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-300 font-black text-lg flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                  ৩
                </div>
                <h3 className="text-lg font-black text-white mb-2">১-ক্লিক এক্টিভেশন</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  আপনার জিমেইলে আসা গুগল-এর অফিশিয়াল ইনভাইটেশন লিংকে ক্লিক করে এক্টিভ করে নিন ৫TB ও জেমিনি প্রো!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section id="faq" className="py-20 px-4 sm:px-6 bg-slate-900/60 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                সাধারণ কিছু প্রশ্নোত্তর
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL HIGH-CONVERTING CTA BANNER */}
        <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-t border-slate-800">
          <div className="max-w-5xl lg:max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>লিমিটেড স্টক অফার • আজই আনলক করুন</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              আজই পান Gemini Pro 18 Months Personal
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl sm:max-w-3xl mx-auto">
              ৫TB ক্লাউড স্টোরেজ, Gemini 3.1 Pro &amp; 4 Argon, Veo AI ও NotebookLM Pro সহ সম্পূর্ণ গুগল এআই প্যাকেজ।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenLocalCheckout}
                disabled={currentStock.isSoldOut}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base text-white transition-all flex items-center justify-center gap-2 ${
                  currentStock.isSoldOut
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-2xl shadow-cyan-500/30 active:scale-95'
                }`}
              >
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>
                  {currentStock.isSoldOut
                    ? 'স্টক শেষ (Sold Out)'
                    : `সাবস্ক্রিপশন নিন — মাত্র ৳৩৯৯ (মাত্র ${currentStock.remaining}টি বাকি)`}
                </span>
              </button>

              <a
                href="/order"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>অর্ডার ট্র্যাকিং পেজ</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              বিকাশ ও রকেট পার্সোনাল সেন্ড মানি সাপোর্টেড • তাৎক্ষণিক সাপোর্ট: ০১638002708
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal fallback if used as standalone */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProductId={GEMINI_PRO_PRODUCT.id}
        price={GEMINI_PRO_PRODUCT.price}
        bkashNumber={config?.bkashNumber || '01638002708'}
        rocketNumber={config?.rocketNumber || '016380027089'}
      />
    </div>
  );
};
