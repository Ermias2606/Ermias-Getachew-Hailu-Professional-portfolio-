import React, { useState } from 'react';
import { ShelfItem } from '../types';
import { BookMarked, Film, Sparkles, Star, Quote } from 'lucide-react';

interface MediaShelfProps {
  items: ShelfItem[];
}

export const MediaShelf: React.FC<MediaShelfProps> = ({ items }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <section id="shelfSection" className="mb-20 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            Intellectual Influences
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Shelf (Books, Cinema & Thought)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Curated texts, cinema, and investigative literature informing a multidisciplinary outlook on game theory, financial contagion, and institutional trust.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterType === 'all'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => setFilterType('book')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterType === 'book'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setFilterType('movie')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterType === 'movie'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Cinema
          </button>
          <button
            onClick={() => setFilterType('philosophy')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              filterType === 'philosophy'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Philosophy & Science
          </button>
        </div>
      </div>

      {/* Grid of Shelf Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Top: Thumbnail & Basic Info */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=120&q=80';
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {item.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight mt-1 truncate">
                    {item.title}
                  </h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.author}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mt-1 text-amber-500 text-xs">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Takeaway / Note */}
              {item.keyTakeaway && (
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 line-clamp-1">
                  💡 {item.keyTakeaway}
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-3 leading-relaxed">
                "{item.notes}"
              </p>
            </div>

            {item.year && (
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-medium">
                {item.year}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
