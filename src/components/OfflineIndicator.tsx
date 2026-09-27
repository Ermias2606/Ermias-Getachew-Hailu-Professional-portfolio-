import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offlineNoticeBanner"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 dark:bg-amber-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xl border border-amber-500 animate-in fade-in"
    >
      <WifiOff className="w-4 h-4 text-amber-100 animate-pulse" />
      <span>Offline Mode — Cached banking dossier & tools active</span>
    </div>
  );
};
