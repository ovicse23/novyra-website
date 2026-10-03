import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const learnedSkills = [
    'WordPress',
    'SEO',
    'Graphic Design',
    'Video Editing',
    'Digital Marketing',
    'Web Development',
  ];

  const painPoints = [
    'কোথায় client খুঁজবেন বুঝতে পারছেন না',
    'Proposal পাঠাচ্ছেন কিন্তু reply পাচ্ছেন না',
    'LinkedIn outreach কীভাবে করবেন জানা নেই',
    'Cold email শুরু করতে পারছেন না',
    'Follow-up কখন করবেন বুঝতে পারছেন না',
    'AI ব্যবহার করছেন কিন্তু client hunting workflow নেই',
  ];

  return (
    <section className="py-20 bg-background-alt border-y border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            The Freelancer Dilemma
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Skill শেখার পরও Client পাওয়া কেন কঠিন?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Many freelancers spend months perfecting their crafts across:
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {learnedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700/50"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-rose-300/90 text-sm sm:text-base font-semibold mt-4">
            কিন্তু সমস্যা হলো: তাদের কোনো repeatable client acquisition system নেই.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-14">
          {painPoints.map((pain, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/15 flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-rose-400 text-xs font-bold">✕</span>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-snug">{pain}</p>
            </div>
          ))}
        </div>

        {/* The Solution Transition Box */}
        <div className="glass-panel max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border-cyan-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Novyra Toolkit gives a structured, step-by-step process.
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              শুধুমাত্র ভাগ্যের ওপর নির্ভর না করে AI এবং প্রমাণিত সিস্টেম দিয়ে হাই-ভ্যালু ক্লায়েন্ট খুঁজে বের করুন এবং প্রফেশনালি কনভার্ট করুন.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
