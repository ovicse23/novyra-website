import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-[#0B1220] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-base">N</span>
              </div>
            </div>
            <div>
              <div className="font-black text-lg text-white tracking-wider">NOVYRA</div>
              <div className="text-[10px] text-slate-400 tracking-widest uppercase">Learn. Build. Grow.</div>
            </div>
          </div>

          {/* Legal & Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium">
            <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a>
            <a href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</a>
            <a href="/order" className="hover:text-cyan-400 transition-colors">Check Order</a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs">
          <div>
            © 2026 Novyra. All rights reserved. Built for Bangladesh Freelancers.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Payment: bKash & Rocket</span>
            <span>•</span>
            <span>Manual Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
