import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Lock,
  Sparkles,
  Building2,
  CheckCircle,
  ChevronRight,
  Quote,
  Calculator,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { PageRoute, ExecutiveQuote } from '../types';

interface WelcomeLandingProps {
  onEnter: (targetPage?: PageRoute) => void;
  portraitUrl: string;
  quotes: ExecutiveQuote[];
}

export const WelcomeLanding: React.FC<WelcomeLandingProps> = ({ onEnter, portraitUrl, quotes }) => {
  const [loadingPhase, setLoadingPhase] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useEffect(() => {
    // Loading progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingPhase(false), 300);
          return 100;
        }
        return prev + 34;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Auto rotate featured quotes on landing
  useEffect(() => {
    if (!loadingPhase && quotes.length > 0) {
      const quoteInterval = setInterval(() => {
        setActiveQuoteIndex((prev) => (prev + 1) % Math.min(quotes.length, 4));
      }, 5000);
      return () => clearInterval(quoteInterval);
    }
  }, [loadingPhase, quotes]);

  const featuredQuotes = quotes.filter((q) => q.featured || q.imageUrl).slice(0, 4);
  const currentQuote = featuredQuotes[activeQuoteIndex] || quotes[0];

  if (loadingPhase) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white p-6 animate-in fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/50 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative z-10 max-w-md w-full text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto rounded-3xl bg-emerald-900/40 border-2 border-emerald-500/50 flex items-center justify-center shadow-2xl animate-pulse">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xs font-mono shadow-lg">
              EG
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black tracking-tight text-white">
              Ermias Getachew Hailu
            </h2>
            <p className="text-xs text-emerald-400 font-mono">
              Siinqee Bank S.C. • Executive Banking Operations Dossier
            </p>
          </div>

          <div className="space-y-2 max-w-xs mx-auto">
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 p-0.5">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Initializing Secure Vault & Credentials...</span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto px-4 py-8 sm:p-8 animate-in fade-in duration-500">
      {/* Ambient background glow & decorative patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-600" />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl mx-auto my-auto space-y-10 z-10 py-6">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-xl bg-slate-900 flex-shrink-0">
              <img
                src={portraitUrl}
                alt="Ermias Getachew"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://ui-avatars.com/api/?name=Ermias+Getachew&background=0d7668&color=fff&size=512';
                }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Siinqee Bank S.C. • SCSO Cash I</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Ermias Getachew Hailu
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Dual-Degree Executive Dossier & Banking Operations Hub
              </p>
            </div>
          </div>

          {/* Launch Button Top */}
          <button
            onClick={() => onEnter('overview')}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/80 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Main Overview</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Welcome Message & Featured Quote Showcase with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Welcome Visitor Message & Core Pillars */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">
                Welcome, Esteemed Visitor & Colleague
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Precision in Vault Operations, Integrity in Leadership.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Explore a professional banking portfolio uniting Oromia State Management command (GPA 3.60), Aksum archaeological forensic precision (GPA 3.42), and modern AI financial integrations.
              </p>
            </div>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                onClick={() => onEnter('operations')}
                className="group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 cursor-pointer transition text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Vault Calculator</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Dual-custody cash & till denomination balancing.</p>
              </div>

              <div
                onClick={() => onEnter('credentials')}
                className="group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 cursor-pointer transition text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Credentials Vault</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Verified degrees & Siinqee appointment letters.</p>
              </div>

              <div
                onClick={() => onEnter('essays')}
                className="group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 cursor-pointer transition text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Essays & Shelf</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Published economic articles & library catalog.</p>
              </div>
            </div>

            {/* Big Launch Action */}
            <div className="pt-2">
              <button
                onClick={() => onEnter('overview')}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-black text-sm shadow-2xl shadow-emerald-950 transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Main Overview & Dossier</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Quotes Showcase with Images */}
          <div className="lg:col-span-5">
            {currentQuote && (
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-900/90 shadow-2xl p-6 sm:p-7 space-y-5">
                <div className="absolute top-0 right-0 p-4 text-emerald-500/20 pointer-events-none">
                  <Quote className="w-20 h-20" />
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <img
                    src={currentQuote.imageUrl || portraitUrl}
                    alt={currentQuote.author}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
                      {currentQuote.category || 'Leadership Creed'}
                    </span>
                    <h4 className="text-sm font-extrabold text-white mt-1">
                      {currentQuote.author}
                    </h4>
                    <p className="text-[11px] text-emerald-400 truncate max-w-[220px]">
                      {currentQuote.role}
                    </p>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-200 font-medium italic leading-relaxed relative z-10">
                  "{currentQuote.quote}"
                </blockquote>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 relative z-10">
                  <span className="font-mono text-[11px] text-emerald-500">
                    {currentQuote.institution || 'Siinqee Bank S.C.'}
                  </span>

                  {/* Quote Pagination Dots */}
                  <div className="flex items-center gap-1.5">
                    {featuredQuotes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveQuoteIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeQuoteIndex === i
                            ? 'w-6 bg-emerald-500'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to quote ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="text-center pt-6 border-t border-slate-800/80 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Ermias Getachew Hailu • SCSO Cash I • Job Grade IX</span>
          <span>East Bale District Branch • NBE Directives Compliant</span>
        </div>

      </div>
    </div>
  );
};
