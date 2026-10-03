import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MobileStickyCtaProps {
  onOpenCheckout: () => void;
  price?: number;
  isModalOpen: boolean;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({
  onOpenCheckout,
  price = 299,
  isModalOpen,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past initial hero (250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide when modal is open or when not scrolled
  if (!isVisible || isModalOpen) {
    return null;
  }

  return (
    <aside 
      aria-label="Quick Purchase Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
            Launch Price
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white">৳{price}</span>
            <span className="text-[10px] text-slate-400 line-through">৳699</span>
          </div>
        </div>

        <button
          onClick={onOpenCheckout}
          className="flex-1 py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Get Toolkit — ৳{price}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
