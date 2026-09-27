import React, { useState } from 'react';
import { Article } from '../types';
import { BookOpen, Clock, ArrowRight, Languages, Sparkles } from 'lucide-react';

interface ArticlesSectionProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles, onOpenArticle }) => {
  const [filterLang, setFilterLang] = useState<'all' | 'am' | 'en'>('all');

  const filteredArticles = articles.filter((a) => {
    if (filterLang === 'all') return true;
    return a.language === filterLang;
  });

  return (
    <section id="articlesSection" className="mb-20 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            Thought Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Articles & Analytical Essays
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            In-depth critical essays exploring corporate capitalism, ethical banking, vault liquidity, and multidisciplinary strategic leadership.
          </p>
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <button
            onClick={() => setFilterLang('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterLang === 'all'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Texts
          </button>
          <button
            onClick={() => setFilterLang('am')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterLang === 'am'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            አማርኛ (Amharic)
          </button>
          <button
            onClick={() => setFilterLang('en')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterLang === 'en'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all duration-200 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  {art.category}
                </span>
                {art.language === 'am' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    አማርኛ
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              {art.publishedDate && (
                <span className="text-xs text-slate-400 font-medium">
                  {art.publishedDate}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2">
              {art.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {art.summary}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read complete analytical essay</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
