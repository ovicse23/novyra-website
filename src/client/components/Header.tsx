import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout: (productId?: string) => void;
  price?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckout }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Novyra Home">
          <img
            src="/assets/logo.png?v=3"
            alt="Novyra — Learn. Build. Grow."
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          {/* Gemini Pro 18M with Hot Item Animated Highlight */}
          <a
            href="/gemini-pro"
            className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/15 to-blue-500/10 border border-cyan-400/40 hover:border-cyan-400 transition-all text-white font-bold group shadow-sm shadow-cyan-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 bg-clip-text text-transparent group-hover:text-white transition-colors">
              Gemini Pro 18M
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm shadow-rose-500/50 animate-pulse">
              HOT
            </span>
          </a>

          <a href="/#products" className="hover:text-cyan-400 transition-colors">Playbooks</a>
          <a href="/#curriculum" className="hover:text-cyan-400 transition-colors">Curriculum</a>
          <a href="/#preview" className="hover:text-cyan-400 transition-colors">Sample Previews</a>
          <a href="/#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
          <a href="/#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          <a href="/order" className="hover:text-cyan-400 transition-colors text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Track Order
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile Gemini Pro Hot Link */}
          <a
            href="/gemini-pro"
            className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-purple-950/80 to-cyan-950/80 border border-cyan-500/50 text-cyan-300 shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            <span>Gemini 18M</span>
            <span className="text-[8px] bg-rose-500 text-white px-1 py-0.2 rounded uppercase font-black">HOT</span>
          </a>

          <button
            onClick={() => onOpenCheckout()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Get Playbooks — ৳299</span>
          </button>
          
          <button
            onClick={() => onOpenCheckout()}
            className="sm:hidden inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20"
          >
            Playbooks
          </button>
        </div>
      </div>
    </header>
  );
};
