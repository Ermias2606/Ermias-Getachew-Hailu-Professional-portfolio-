import React, { useState } from 'react';
import { BankingDocument, DocumentCategory } from '../types';
import {
  GraduationCap,
  Award,
  FileCheck2,
  ShieldAlert,
  Search,
  Plus,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building,
  Trash2,
  Download
} from 'lucide-react';

interface CredentialsVaultProps {
  documents: BankingDocument[];
  onSelectDocument: (doc: BankingDocument) => void;
  onOpenUpload?: () => void;
  onDeleteDocument?: (id: string) => void;
  isAdmin?: boolean;
}

export const CredentialsVault: React.FC<CredentialsVaultProps> = ({
  documents,
  onSelectDocument,
  onOpenUpload,
  onDeleteDocument,
  isAdmin = false,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.credentialId && doc.credentialId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === 'all') return documents.length;
    return documents.filter((d) => d.category === cat).length;
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'degree':
        return <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'letter':
        return <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'audit':
        return <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <FileCheck2 className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'degree':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300';
      case 'letter':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300';
      case 'certificate':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300';
      case 'audit':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <section id="credentialsSection" className="mb-20 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Documentation & Accreditation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Credentials, Degrees & Letters Vault
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Audit-verified academic degrees, Siinqee Bank S.C. appointment and commendation letters, regulatory certifications, and dual-custody compliance records.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl mb-8 shadow-sm">
        
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'degree', label: 'Academic Degrees' },
            { id: 'letter', label: 'Official Letters' },
            { id: 'certificate', label: 'Certificates' },
            { id: 'audit', label: 'Audit Reports' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
                filterCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  filterCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {getCategoryCount(cat.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search credentials..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Grid of Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-lg hover:border-emerald-600/50 dark:hover:border-emerald-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Document Thumbnail Preview */}
              <div className="h-36 w-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                <img
                  src={doc.fileUrl}
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Badges on Thumbnail */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${getBadgeStyle(
                      doc.category
                    )}`}
                  >
                    {getCategoryIcon(doc.category)}
                    <span>{doc.category}</span>
                  </span>

                  {doc.verified && (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Score / Grade Pill at bottom of preview */}
                {doc.scoreOrGrade && (
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white text-[11px] font-bold truncate drop-shadow">
                    {doc.scoreOrGrade}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {doc.title}
                </h3>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                  <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.issuer}</span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Conferred: {doc.issueDate}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {doc.description}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1">
                <span>View Full File</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No matching documents found
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or deposit a new credential file.
          </p>
        </div>
      )}
    </section>
  );
};
