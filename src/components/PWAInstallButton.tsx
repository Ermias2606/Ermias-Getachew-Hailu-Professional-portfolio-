import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share, PlusSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Suppress if already running in standalone PWA mode
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Chromium / Android / Desktop flow */}
      {isInstallable && (
        <button
          id="btnPwaInstall"
          onClick={install}
          className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
            compact
              ? 'px-3 py-1.5 text-xs bg-emerald-700 hover:bg-emerald-800 text-white'
              : 'px-4 py-2 text-sm bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
          }`}
          title="Install as Progressive Web App"
        >
          <Download className="w-4 h-4" />
          <span>Install App</span>
        </button>
      )}

      {/* iOS Safari flow */}
      {isIOS && !isInstallable && (
        <button
          id="btnPwaInstallIos"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install on iOS</span>
        </button>
      )}

      {/* Fallback button when browser hasn't fired beforeinstallprompt yet (or user wants info) */}
      {!isInstallable && !isIOS && (
        <button
          id="btnPwaInstallGeneric"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition opacity-85 hover:opacity-100"
          title="PWA Ready - Works Offline & Installable"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PWA App</span>
        </button>
      )}

      {/* iOS & Browser Install Instructions Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            id="pwaInstallModal"
            key="pwa-install-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <motion.div
              key="pwa-install-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
            <button
              id="btnCloseInstallGuide"
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-extrabold text-lg shadow-sm">
                EG
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Install Banking Dossier App
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Runs offline • Native app experience • 1-tap launch
                </p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Step 1: Open Share or Browser Menu
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tap the <strong>Share</strong> button in Safari toolbar (or <strong>⋮ Menu</strong> in Chrome/Edge).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Step 2: Add to Home Screen
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Scroll down and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
                  </div>
                </div>
              </div>
            </div>

            <button
              id="btnDismissInstallGuide"
              onClick={() => setShowIOSGuide(false)}
              className="mt-2 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 py-2.5 text-sm font-semibold text-white shadow transition"
            >
              Got it
            </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
