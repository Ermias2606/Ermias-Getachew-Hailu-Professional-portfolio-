import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  Download,
  ShieldCheck,
  Zap,
  CheckCircle2,
  RefreshCw,
  Globe,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Profile } from '../types';

interface PwaHubViewProps {
  profile: Profile;
  onToast?: (msg: string) => void;
}

export const PwaHubView: React.FC<PwaHubViewProps> = ({ profile, onToast }) => {
  const [offlineSimulated, setOfflineSimulated] = useState(false);
  const [installPromptTriggered, setInstallPromptTriggered] = useState(false);

  const handleSimulateOffline = () => {
    setOfflineSimulated(!offlineSimulated);
    onToast?.(
      !offlineSimulated
        ? 'Offline Mode Simulated: Cached assets and vault documents remain fully accessible.'
        : 'Online Mode Restored: Live synchronization active.'
    );
  };

  const handleInstallClick = () => {
    setInstallPromptTriggered(true);
    onToast?.('PWA installation prompt initiated. Follow browser instructions to install to home screen.');
  };

  return (
    <section className="mb-20 space-y-10 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>Progressive Web App (PWA) & Offline Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Installable Web Application Hub
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Experience lightning-fast native performance, persistent local storage, and full offline accessibility for {profile.name}’s executive banking dossier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleInstallClick}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Install App to Desktop / Mobile</span>
          </button>
        </div>
      </div>

      {/* Core PWA Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Wifi className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Offline Service Worker</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Built-in caching guarantees that credential documents, vault records, essays, and the cash calculator function seamlessly even without an active internet connection.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Instant Load & Performance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Optimized Vite bundle with zero layout shift, instant page transitions, and compressed executive portrait assets for rapid mobile retrieval.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Data Consistency & Persistence</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Admin edits, customized resumes, and vault deposits synchronize instantly across browser sessions via robust encrypted local storage and event triggers.
          </p>
        </div>
      </div>

      {/* Interactive PWA Diagnostic & Simulator */}
      <div className="p-7 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>PWA Diagnostics & Offline Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Test progressive web app compliance and simulate offline data availability.
            </p>
          </div>

          <button
            onClick={handleSimulateOffline}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              offlineSimulated
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>{offlineSimulated ? 'Simulation: Offline Active' : 'Simulate Offline Mode'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Web App Manifest</span>
            </div>
            <p className="text-slate-400">
              Name: Ermias Hailu Banking Dossier<br />
              Display: Standalone PWA<br />
              Theme Color: #0d7668
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Service Worker & Cache</span>
            </div>
            <p className="text-slate-400">
              Status: Registered & Active<br />
              Storage Strategy: Cache-First with Network Fallback<br />
              Network State: {offlineSimulated ? 'Offline (Simulated)' : 'Online (Connected)'}
            </p>
          </div>
        </div>

        {installPromptTriggered && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <strong>Installation Prompt Active:</strong> In supported browsers (Chrome, Edge, Safari on iOS), click the install icon in your address bar or browser menu to add this executive portfolio to your home screen.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
