import React, { useState, useEffect } from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { PageRoute } from '../types';
import {
  ShieldCheck,
  Moon,
  Sun,
  Lock,
  LogOut,
  Menu,
  X,
  FileText,
  Calculator,
  Share2,
  Check,
  GraduationCap,
  BookOpen,
  Mail,
  Home,
  Camera,
  Layers,
  Quote,
  Sparkles
} from 'lucide-react';

interface NavigationProps {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  isAdminAuthenticated: boolean;
  onOpenAdminAuth: () => void;
  onAdminSignOut: () => void;
  unreadCount: number;
  profilePortraitUrl?: string;
  onOpenPhotoUpload?: () => void;
  onToast?: (msg: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onShowWelcome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  currentView,
  setCurrentView,
  isAdminAuthenticated,
  onOpenAdminAuth,
  onAdminSignOut,
  unreadCount,
  profilePortraitUrl,
  onOpenPhotoUpload,
  onToast,
  isDark: propIsDark,
  onToggleTheme: propOnToggleTheme,
  onShowWelcome,
}) => {
  const [internalDark, setInternalDark] = useState(false);
  const isDark = propIsDark !== undefined ? propIsDark : internalDark;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (propIsDark === undefined) {
      const savedTheme = localStorage.getItem('egh_theme');
      if (
        savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setInternalDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setInternalDark(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, [propIsDark]);

  const toggleDarkMode = () => {
    if (propOnToggleTheme) {
      propOnToggleTheme();
    } else {
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('egh_theme', 'light');
        setInternalDark(false);
        onToast?.('Switched to Light mode');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('egh_theme', 'dark');
        setInternalDark(true);
        onToast?.('Switched to Dark mode');
      }
    }
  };

  const navigateToPage = (page: PageRoute) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('public');
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
      onToast?.('Portfolio link copied to clipboard!');
    } catch {
      prompt('Copy application link:', window.location.href);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Ermias Getachew Hailu - Senior Banking Operations Portfolio & PWA',
      text: 'Explore the multi-page banking portfolio, verified credentials, dual-custody cash calculator, and analytical essays of Ermias Getachew Hailu (SCSO Cash I at Siinqee Bank S.C.).',
      url: window.location.href,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        onToast?.('Portfolio shared successfully!');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const NAV_PAGES: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'operations', label: 'Operations & Vault', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'credentials', label: 'Credentials & Letters', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'creeds', label: 'Leadership Creeds & Perspectives', icon: <Quote className="w-3.5 h-3.5" /> },
    { id: 'essays', label: 'Essays & Shelf', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'studio', label: 'Cover & Resume', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/92 dark:bg-slate-900/92 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Monogram */}
        <div
          id="navBrand"
          onClick={() => navigateToPage('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {profilePortraitUrl ? (
            <div className="relative">
              <img
                src={profilePortraitUrl}
                alt="Ermias Getachew"
                className="w-10 h-10 rounded-xl object-cover border-2 border-emerald-600 shadow-sm"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black text-sm flex items-center justify-center shadow-sm shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              EG
            </div>
          )}

          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Ermias Getachew</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            </div>
            <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-400 hidden sm:block">
              Senior Banking Operations • SCSO Cash I
            </div>
          </div>
        </div>

        {/* Multi-Page Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          {NAV_PAGES.map((page) => {
            const isActive = currentView === 'public' && currentPage === page.id;
            return (
              <button
                key={page.id}
                id={`navPage-${page.id}`}
                onClick={() => navigateToPage(page.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
                }`}
              >
                {page.icon}
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Share, PWA Install, Theme Toggle, Admin Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share App Button */}
          {onShowWelcome && (
            <button
              onClick={onShowWelcome}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-extrabold transition flex items-center gap-1.5 border border-emerald-600/30"
              title="Return to Welcome Splash"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Welcome Screen</span>
            </button>
          )}

          <button
            id="btnShareApp"
            onClick={handleShare}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition relative"
            title={copiedShare ? 'Link Copied!' : 'Share Portfolio'}
            aria-label="Share Portfolio"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copiedShare && (
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap shadow-lg animate-in fade-in">
                Copied!
              </span>
            )}
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton compact />

          {/* Theme Toggle Button */}
          <button
            id="btnToggleTheme"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center relative group"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Exit Admin Button when in Admin Mode (Admin login button removed from navigation per requirement) */}
          {currentView === 'admin' && (
            <button
              id="btnAdminExit"
              onClick={onAdminSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
              title="Exit Admin Control Room"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            id="btnMobileMenu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Multi-Page Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-4 py-3 space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 px-3 py-1">
            Portfolio Pages
          </div>
          {NAV_PAGES.map((page) => {
            const isActive = currentView === 'public' && currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => navigateToPage(page.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {page.icon}
                  <span>{page.label}</span>
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </button>
            );
          })}

          {/* Mobile Theme Toggle */}
          <button
            id="btnMobileToggleTheme"
            onClick={toggleDarkMode}
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-500" />
              )}
              <span>Theme Appearance</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          {/* Mobile Share Action */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            <button
              id="btnMobileShare"
              onClick={() => {
                setMobileMenuOpen(false);
                handleShare();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>Share Portfolio</span>
              </span>
              {copiedShare && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
