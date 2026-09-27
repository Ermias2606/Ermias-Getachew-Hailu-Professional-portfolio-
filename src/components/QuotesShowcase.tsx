import React, { useState, useEffect } from 'react';
import { ExecutiveQuote, ContributorType } from '../types';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  Pause,
  LayoutGrid,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Bookmark,
  Building2,
  Users,
  GraduationCap,
  Award
} from 'lucide-react';

interface QuotesShowcaseProps {
  quotes: ExecutiveQuote[];
  onToast?: (msg: string) => void;
  onOpenAdmin?: () => void;
}

export const QuotesShowcase: React.FC<QuotesShowcaseProps> = ({
  quotes,
  onToast,
  onOpenAdmin
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cinematic' | 'grid'>('cinematic');
  const [selectedContributorType, setSelectedContributorType] = useState<string>('all');

  // Filter quotes based on selected contributor type
  const filteredQuotes = quotes.filter((q) => {
    if (selectedContributorType === 'all') return true;
    if (selectedContributorType === 'owner') return q.contributorType === 'Portfolio Owner' || q.author.includes('Ermias');
    if (selectedContributorType === 'colleague') return q.contributorType === 'Branch Colleague';
    if (selectedContributorType === 'scholar') return q.contributorType === 'Academic Scholar';
    if (selectedContributorType === 'pioneer') return q.contributorType === 'Banking Pioneer';
    if (selectedContributorType === 'mentor') return q.contributorType === 'Institutional Mentor';
    return true;
  });

  const safeQuotes = filteredQuotes.length > 0 ? filteredQuotes : quotes;

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || safeQuotes.length <= 1 || viewMode === 'grid') return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeQuotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, safeQuotes.length, viewMode]);

  // Keep currentIndex bounded
  useEffect(() => {
    if (currentIndex >= safeQuotes.length) {
      setCurrentIndex(0);
    }
  }, [safeQuotes.length, currentIndex]);

  const activeQuote = safeQuotes[currentIndex] || safeQuotes[0] || quotes[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % safeQuotes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + safeQuotes.length) % safeQuotes.length);
  };

  const handleCopyQuote = (quote: ExecutiveQuote) => {
    const textToCopy = `"${quote.quote}" — ${quote.author} (${quote.role}${quote.institution ? `, ${quote.institution}` : ''})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    onToast?.('Quote copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getContributorBadge = (type?: ContributorType) => {
    switch (type) {
      case 'Branch Colleague':
        return { label: 'Branch Colleague', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      case 'Academic Scholar':
        return { label: 'Academic Scholar', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      case 'Banking Pioneer':
        return { label: 'Banking Pioneer', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'Institutional Mentor':
        return { label: 'Institutional Mentor', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      default:
        return { label: 'Portfolio Lead', color: 'bg-emerald-600/30 text-emerald-200 border-emerald-500/40' };
    }
  };

  return (
    <section id="quotesShowcaseSection" className="pt-8 pb-14">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-600/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Quote className="w-3.5 h-3.5" />
            <span>Executive Maxims & Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Leadership Creeds & Perspectives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Key operational principles and multidisciplinary reflections on dual-custody cash control, audit integrity, and community empowerment from Ermias Getachew and esteemed banking & academic contributors.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-sm">
            <button
              onClick={() => setViewMode('cinematic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'cinematic'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Cinematic Slide View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cinematic</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gallery Grid ({safeQuotes.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contributor Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {[
          { id: 'all', label: `All Contributors (${quotes.length})`, icon: Users },
          { id: 'owner', label: 'Ermias Getachew (Lead)', icon: ShieldCheck },
          { id: 'colleague', label: 'Branch Colleagues & Supervisors', icon: Building2 },
          { id: 'scholar', label: 'Academic Scholars', icon: GraduationCap },
          { id: 'pioneer', label: 'Banking Regulators & Pioneers', icon: Award },
          { id: 'mentor', label: 'Institutional Mentors', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedContributorType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedContributorType(tab.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODE 1: CINEMATIC SLIDE SHOWCASE */}
      {viewMode === 'cinematic' && (
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 min-h-[440px] sm:min-h-[480px] flex flex-col justify-between group transition-all duration-300">
            {/* Background Image with Opacity & Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-slate-950">
              <img
                src={activeQuote.imageUrl}
                alt={activeQuote.category}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition duration-1000 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              {/* High-Contrast Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
            </div>

            {/* Top Bar: Contributor Type & Category Pill & Slide Counter & Copy */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-200" />
                  <span>{activeQuote.category}</span>
                </span>

                {/* Contributor Role Pill */}
                {activeQuote.contributorType && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                      getContributorBadge(activeQuote.contributorType).color
                    }`}
                  >
                    {getContributorBadge(activeQuote.contributorType).label}
                  </span>
                )}

                {activeQuote.sourceOrContext && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/15">
                    <Bookmark className="w-3 h-3 text-emerald-400" />
                    <span>{activeQuote.sourceOrContext}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyQuote(activeQuote)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition flex items-center gap-1.5 shadow-sm"
                  title="Copy quote text"
                >
                  {copiedId === activeQuote.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy Creed</span>
                    </>
                  )}
                </button>

                <div className="px-3 py-1 rounded-xl bg-black/40 text-white/80 text-xs font-mono backdrop-blur-md border border-white/10">
                  {currentIndex + 1} / {safeQuotes.length}
                </div>
              </div>
            </div>

            {/* Central Content: Creed Statement */}
            <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-4 my-auto max-w-4xl space-y-6">
              <div className="text-emerald-400/90 drop-shadow">
                <Quote className="w-10 h-10 sm:w-14 sm:h-14 stroke-[1.5]" />
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-relaxed tracking-tight drop-shadow-md">
                “{activeQuote.quote}”
              </blockquote>
            </div>

            {/* Bottom Bar: Author & Contributor Attribution */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700/80 border-2 border-emerald-400/60 flex items-center justify-center text-white font-black text-base shadow-lg flex-shrink-0">
                  {activeQuote.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white leading-snug">
                      {activeQuote.author}
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-300 font-medium">
                    {activeQuote.role}
                  </p>
                  {activeQuote.institution && (
                    <p className="text-[11px] text-slate-300 font-normal">
                      {activeQuote.institution}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition shadow-sm"
                  title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition shadow-sm"
                  title="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
                  title="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {safeQuotes.slice(0, 4).map((q, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={q.id || idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-emerald-600 shadow-md ring-2 ring-emerald-600/30'
                      : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <img
                      src={q.imageUrl}
                      alt={q.category}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80';
                      }}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase truncate">
                      {q.author.split(' ')[0]} • {q.category}
                    </span>
                    <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {q.quote}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: GALLERY GRID CARDS */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeQuotes.map((q) => (
            <div
              key={q.id}
              className="group relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={q.imageUrl}
                  alt={q.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                    {q.category}
                  </span>
                  {q.contributorType && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                        getContributorBadge(q.contributorType).color
                      }`}
                    >
                      {getContributorBadge(q.contributorType).label}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
                  <span className="truncate">{q.sourceOrContext || q.institution || 'Banking Creed'}</span>
                  <button
                    onClick={() => handleCopyQuote(q)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
                    title="Copy quote"
                  >
                    {copiedId === q.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <blockquote className="text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base leading-relaxed italic">
                  “{q.quote}”
                </blockquote>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {q.author}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {q.role}
                    </p>
                    {q.institution && (
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                        {q.institution}
                      </p>
                    )}
                  </div>

                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700 flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
