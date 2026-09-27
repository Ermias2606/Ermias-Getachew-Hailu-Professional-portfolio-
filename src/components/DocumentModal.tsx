import React, { useState } from 'react';
import { BankingDocument } from '../types';
import { X, ShieldCheck, Download, Copy, Check, ExternalLink, Calendar, Award, Building, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentModalProps {
  document: BankingDocument | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document: doc, onClose }) => {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    if (doc?.credentialId) {
      navigator.clipboard.writeText(doc.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'degree':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300';
      case 'letter':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300';
      case 'certificate':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300';
      case 'audit':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200';
    }
  };

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          key="doc-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="doc-modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryBadge(
                doc.category
              )}`}
            >
              {doc.category}
            </span>
            {doc.verified && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Institutional Verified</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Viewing Only</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Document Preview Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 relative max-h-72 flex items-center justify-center">
            <img
              src={doc.fileUrl}
              alt={doc.title}
              className="w-full h-full object-cover max-h-72"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold drop-shadow flex items-center justify-between">
              <span>{doc.issuer}</span>
              <span className="font-mono">{doc.issueDate}</span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
              {doc.title}
            </h2>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>Issuing Body: {doc.issuer}</span>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Conferral / Issue Date
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {doc.issueDate}
              </span>
            </div>

            {doc.scoreOrGrade && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Standing / Grade / Audit Benchmark
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1 font-mono">
                  <Award className="w-3.5 h-3.5" />
                  {doc.scoreOrGrade}
                </span>
              </div>
            )}

            {doc.credentialId && (
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Official Credential / Dispatch Reference
                  </span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {doc.credentialId}
                  </span>
                </div>
                <button
                  onClick={handleCopyId}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-slate-200/60 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  {copiedId ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Detailed Narrative */}
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            <strong className="block text-slate-900 dark:text-slate-100 font-bold">
              Institutional Scope & Description:
            </strong>
            <p>{doc.description}</p>
          </div>

          {/* Tags */}
          {doc.tags && doc.tags.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
              {doc.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between text-xs text-slate-400">
          <span>Siinqee Bank & Academic Verification Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition"
          >
            Close View
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
