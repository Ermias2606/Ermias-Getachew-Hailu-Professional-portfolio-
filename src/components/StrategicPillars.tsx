import React from 'react';
import { Pillar } from '../types';
import { ShieldCheck, Cpu, Landmark } from 'lucide-react';

interface StrategicPillarsProps {
  pillars: Pillar[];
}

export const StrategicPillars: React.FC<StrategicPillarsProps> = ({ pillars }) => {
  const getPillarIcon = (title: string) => {
    if (title.toLowerCase().includes('management')) {
      return <ShieldCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />;
    } else if (title.toLowerCase().includes('digital')) {
      return <Cpu className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />;
    } else {
      return <Landmark className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  return (
    <section id="advantageSection" className="mb-20 scroll-mt-20">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          Strategic Advantage
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Controls-First Banking Operations
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          The three foundational pillars supporting an unbroken balancing record, dual-custody discipline, and clean regulatory audit trails.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={p.id || idx}
            className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-lg hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all duration-300 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-600/20 flex items-center justify-center shadow-sm">
                  {getPillarIcon(p.title)}
                </div>
                {p.tag && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    {p.tag}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                {p.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                {p.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              <span>Verified in Operations</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
