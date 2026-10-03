import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout: () => void;
  price?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCheckout, price = 299 }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Novyra Home">
          <img
            src="/assets/logo.png"
            alt="Novyra — Learn. Build. Grow."
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          <a href="#whats-inside" className="hover:text-cyan-400 transition-colors">What's Inside</a>
          <a href="#preview" className="hover:text-cyan-400 transition-colors">PDF Preview</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          <a href="/order" className="hover:text-cyan-400 transition-colors text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Check Order
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCheckout}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Get Instant Access — ৳{price}</span>
          </button>
          
          <button
            onClick={onOpenCheckout}
            className="sm:hidden inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20"
          >
            ৳{price} Access
          </button>
        </div>
      </div>
    </header>
  );
};
