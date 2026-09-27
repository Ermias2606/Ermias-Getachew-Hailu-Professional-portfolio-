import React from 'react';
import { Lock, Smartphone, ShieldCheck, Heart, Sun, Moon } from 'lucide-react';
import { Profile, PageRoute } from '../types';

interface FooterProps {
  profile: Profile;
  onOpenAdminAuth: () => void;
  onOpenStudio: () => void;
  onNavigatePage?: (page: PageRoute) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenAdminAuth,
  onOpenStudio,
  onNavigatePage,
  isDark,
  onToggleTheme,
}) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Quick Links */}
        {onNavigatePage && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-6">
            <button
              onClick={() => onNavigatePage('overview')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigatePage('operations')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Banking Operations & Vault
            </button>
            <button
              onClick={() => onNavigatePage('credentials')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Credentials & Letters Vault
            </button>
            <button
              onClick={() => onNavigatePage('creeds')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Leadership Creeds & Perspectives
            </button>
            <button
              onClick={() => onNavigatePage('essays')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Essays & The Shelf
            </button>
            <button
              onClick={() => onNavigatePage('studio')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              ATS Application Studio
            </button>
            <button
              onClick={() => onNavigatePage('contact')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              Contact & Inquiries
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {profile.name} — Senior Banking Operations Specialist
            </div>
            <div>
              Senior Customer Service Officer (SCSO - Cash I, Grade IX) • {profile.bankName}
            </div>
            <div className="text-[11px] text-slate-400">
              Dual BA in Management & Heritage Research • {profile.location}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            {onToggleTheme && (
              <>
                <button
                  id="btnFooterToggleTheme"
                  onClick={onToggleTheme}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
                  title="Toggle Light / Dark Mode"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>
                <span>•</span>
              </>
            )}
            <button
              onClick={onOpenStudio}
              className="text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              ATS Job Matcher
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>PWA Offline Compliant</span>
            </span>
            <span>•</span>
            <button
              id="btnFooterAdminAuth"
              onClick={onOpenAdminAuth}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 transition shadow-sm font-semibold"
              title="Administrator Control Room (Protected Login)"
            >
              <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
