import React from 'react';
import { Stat } from '../types';
import { TrendingUp, ShieldCheck, GraduationCap, Cpu } from 'lucide-react';

interface HeadlineStatsProps {
  stats: Stat[];
}

export const HeadlineStats: React.FC<HeadlineStatsProps> = ({ stats }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 2:
        return <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <section id="statsSection" className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st, idx) => (
          <div
            key={st.id || idx}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(idx)}
              </div>
              {st.value && (
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                  {st.value}
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {st.title}
            </h3>

            {st.highlight && (
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 mb-2">
                {st.highlight}
              </div>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
