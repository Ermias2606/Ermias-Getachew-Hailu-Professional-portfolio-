import React, { useState } from 'react';
import { Profile, AtsConfig, DocTheme } from '../types';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Lock,
  Sparkles,
  ExternalLink,
  Briefcase,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

interface CoverAndResumeProps {
  profile: Profile;
  atsConfig: AtsConfig;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onToast?: (msg: string) => void;
}

export const CoverAndResume: React.FC<CoverAndResumeProps> = ({
  profile,
  atsConfig,
  isAdmin = false,
  onOpenAdmin,
  onToast,
}) => {
  const [docType, setDocType] = useState<'resume' | 'cover'>('resume');
  const [docTheme, setDocTheme] = useState<DocTheme>(atsConfig.docTheme || 'theme-emerald');
  const [copied, setCopied] = useState<boolean>(false);

  const getThemeStyles = () => {
    switch (docTheme) {
      case 'theme-navy':
        return {
          brandColor: '#1d4ed8',
          brandBg: '#eff6ff',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'theme-burgundy':
        return {
          brandColor: '#991b1b',
          brandBg: '#fef2f2',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
        };
      case 'theme-charcoal':
        return {
          brandColor: '#334155',
          brandBg: '#f1f5f9',
          badgeClass: 'bg-slate-200 text-slate-800 border-slate-300',
        };
      case 'theme-gold':
        return {
          brandColor: '#b45309',
          brandBg: '#fffbeb',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      default:
        return {
          brandColor: '#0d7668',
          brandBg: '#e6f3ef',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
    }
  };

  const currentTheme = getThemeStyles();
  const canDownload = atsConfig.allowPublicDownload || isAdmin;

  const handleExportWord = () => {
    if (!canDownload) {
      onToast?.('Document downloading is restricted by executive policy.');
      return;
    }

    const docElement = document.getElementById('livePublicDocPreview');
    if (!docElement) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${profile.name} - ${atsConfig.targetRole}</title>
      <style>
        body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 40px; }
        h1 { color: ${currentTheme.brandColor}; font-size: 18pt; text-transform: uppercase; margin-bottom: 4px; }
        h2 { color: ${currentTheme.brandColor}; font-size: 13pt; margin-top: 18px; border-bottom: 1.5pt solid ${currentTheme.brandColor}; padding-bottom: 2pt; text-transform: uppercase; }
        p { margin-bottom: 8pt; text-align: justify; }
        ul { margin-top: 4pt; margin-bottom: 8pt; }
        li { margin-bottom: 4pt; }
      </style>
      </head>
      <body>${docElement.innerHTML}</body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ermias_Getachew_${atsConfig.targetRole.replace(/\s+/g, '_')}_Application.doc`;
    a.click();
    URL.revokeObjectURL(url);
    onToast?.('Word document exported successfully!');
  };

  const handlePrint = () => {
    if (!canDownload) {
      onToast?.('Document printing/export is restricted by executive policy.');
      return;
    }
    window.print();
  };

  const handleCopyText = () => {
    const docElement = document.getElementById('livePublicDocPreview');
    if (!docElement) return;
    navigator.clipboard.writeText(docElement.innerText);
    setCopied(true);
    onToast?.('Document text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="coverResumeSection" className="mb-20 scroll-mt-20">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Executive Career & Application Dossier</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certified Cover Letter & ATS Resume
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Real-time executive cover letter and ATS-formatted curriculum vitae calibrated for <strong>{atsConfig.targetRole}</strong> at <strong>{atsConfig.targetCompany}</strong>.
          </p>
        </div>

        {/* Permissions & Admin Edit Button */}
        <div className="flex items-center gap-3">
          {canDownload ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified for Download & Print</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Online View Only</span>
            </div>
          )}

          {isAdmin && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
              title="Edit parameters in Admin ATS Studio"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ATS Studio Controls</span>
            </button>
          )}
        </div>
      </div>

      {/* Target Role & Match Scoring Ribbon */}
      <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Vacancy Alignment</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {atsConfig.targetRole} • <span className="text-emerald-700 dark:text-emerald-400">{atsConfig.targetCompany}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {atsConfig.matchScore && (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-600/30">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">ATS Fit:</span>
              <span className="text-base font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {atsConfig.matchScore}%
              </span>
            </div>
          )}

          {/* Color Scheme Picker */}
          <div className="flex items-center gap-1.5 border-l pl-3 border-slate-200 dark:border-slate-800">
            {[
              { id: 'theme-emerald', color: '#0d7668', label: 'Emerald' },
              { id: 'theme-navy', color: '#1d4ed8', label: 'Navy' },
              { id: 'theme-burgundy', color: '#991b1b', label: 'Burgundy' },
              { id: 'theme-charcoal', color: '#334155', label: 'Charcoal' },
              { id: 'theme-gold', color: '#b45309', label: 'Gold' },
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => setDocTheme(th.id as DocTheme)}
                style={{ backgroundColor: th.color }}
                className={`w-6 h-6 rounded-full transition-transform ${
                  docTheme === th.id ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                title={th.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Toggle between Resume and Cover Letter */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start">
          <button
            onClick={() => setDocType('resume')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
              docType === 'resume'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tailored Executive Resume</span>
          </button>
          <button
            onClick={() => setDocType('cover')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
              docType === 'cover'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Cover Letter</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {canDownload ? (
            <>
              <button
                onClick={handleExportWord}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Export Word (.doc)</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Downloads disabled by administrator policy</span>
            </div>
          )}

          <button
            onClick={handleCopyText}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs transition"
            title="Copy Text to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Document Sheet Layout */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 relative overflow-hidden font-sans">
        
        {/* Document Printable Watermark / Stamp */}
        <div className="absolute top-6 right-8 opacity-10 pointer-events-none hidden sm:block select-none">
          <div className="text-6xl font-black tracking-widest text-slate-900 border-4 border-slate-900 p-2 transform -rotate-12">
            CERTIFIED
          </div>
        </div>

        <div id="livePublicDocPreview" className="space-y-6">
          {/* Header */}
          <div className="border-b pb-5" style={{ borderColor: '#e2e8f0' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
                  style={{ color: currentTheme.brandColor }}
                >
                  {profile.name}
                </h1>
                <div className="text-sm font-bold text-slate-700 mt-0.5">
                  {profile.title} • {profile.bankName}
                </div>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5 font-medium">
                <div>{profile.email}</div>
                <div>{profile.phone}</div>
                <div>{profile.location}</div>
              </div>
            </div>
          </div>

          {/* Content: Resume vs Cover Letter */}
          {docType === 'resume' ? (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Professional Summary */}
              <div>
                <h2
                  className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                  style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                >
                  Targeted Professional Summary
                </h2>
                <p className="text-slate-700 leading-relaxed text-justify">
                  {atsConfig.customResumeSummary ||
                    `Performance-driven Senior Customer Service Officer (SCSO - Cash I, Grade IX) at ${profile.bankName} seeking the ${atsConfig.targetRole} role at ${atsConfig.targetCompany}. Offers a distinctive Dual-Degree Advantage combining strategic organizational leadership (BA in Management, GPA 3.6/4.0) with forensic data integrity (BA in Archaeology & Heritage, GPA 3.42/4.0). Proven track record maintaining an unbroken 100% zero-discrepancy daily reconciliation record across multi-million ETB vault operations, strict AML/KYC directive execution, and high-velocity teller service.`}
                </p>
              </div>

              {/* Targeted Operational Highlights */}
              <div>
                <h2
                  className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                  style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                >
                  Key Targeted Operations Highlights
                </h2>
                <ul className="space-y-2 pl-4 list-disc text-slate-700 leading-relaxed">
                  <li>
                    <strong>Dual-Custody Vault Administration:</strong> Exercised strict joint custody over main cash reserves, managing daily liquidity flows, time-locks, and ATM replenishment with zero variance.
                  </li>
                  <li>
                    <strong>General Ledger (GL) & End-of-Day Balancing:</strong> Reconciled counter tellers' cash positions against system totals, resolving all suspense differences within the 24-hour cycle.
                  </li>
                  <li>
                    <strong>Regulatory AML/KYC Directives:</strong> Executed National Bank of Ethiopia compliance screening, CTR/SAR preparations, and customer identification programs with a 100% clean audit score.
                  </li>
                  <li>
                    <strong>Digital Transformation & AI Integration:</strong> Certified in Artificial Intelligence and E-Commerce, accelerating customer onboarding and streamlining branch reporting workflows.
                  </li>
                </ul>
              </div>

              {/* Matched Competencies */}
              {atsConfig.matchedKeywords && atsConfig.matchedKeywords.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                    style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                  >
                    Core Competencies & Keywords
                  </h2>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {atsConfig.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Credentials */}
              <div>
                <h2
                  className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                  style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                >
                  Academic Background & Certified Credentials
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong>Bachelor of Arts in Management</strong> — Oromia State University
                      <div className="text-xs text-slate-500">Focus: Strategic Leadership, Financial Accounting, Operations Management</div>
                    </div>
                    <strong className="font-mono text-emerald-800 text-xs">GPA 3.60 / 4.00</strong>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <strong>Bachelor of Arts in Archaeology & Heritage Management</strong> — Aksum University
                      <div className="text-xs text-slate-500">Focus: Forensic Evidence, Archival Documentation, Investigative Methodologies</div>
                    </div>
                    <strong className="font-mono text-emerald-800 text-xs">GPA 3.42 / 4.00</strong>
                  </div>

                  <div className="pt-1 text-xs text-slate-600">
                    <strong>Professional Certifications:</strong> Artificial Intelligence Fundamentals, Banking Risk Management, AML/CFT Regulatory Directives, and E-Commerce Operations.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Cover Letter */
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              <div className="space-y-1">
                <div><strong>Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div><strong>To:</strong> The Recruitment & Human Capital Committee</div>
                <div><strong>Entity:</strong> {atsConfig.targetCompany}</div>
                <div><strong>Subject: Formal Application for the Position of {atsConfig.targetRole}</strong></div>
              </div>

              {atsConfig.customCoverLetter ? (
                <div className="space-y-3 whitespace-pre-line text-slate-700">
                  {atsConfig.customCoverLetter}
                </div>
              ) : (
                <>
                  <p>
                    Dear Members of the Recruitment Committee,
                  </p>

                  <p>
                    I am writing to formally submit my candidature for the <strong>{atsConfig.targetRole}</strong> vacancy at <strong>{atsConfig.targetCompany}</strong>. With over three years of progressive, audit-verified banking operations experience at Siinqee Bank S.C. (advancing from Trainee to Senior Customer Service Officer - Cash I, Job Grade IX), I have cultivated an uncompromising standard of dual-control discipline, liquidity forecasting, and regulatory compliance.
                  </p>

                  <p>
                    What distinguishes my candidacy is my multidisciplinary foundation. Holding dual Bachelor of Arts degrees—one in <strong>Management</strong> from Oromia State University (GPA 3.6/4.0) and one in <strong>Archaeology & Heritage Management</strong> from Aksum University (GPA 3.42/4.0)—I synergize strategic organizational vision with forensic data accuracy. In branch operations, I treat every account entry and general ledger voucher with investigative scrutiny, maintaining an unbroken 100% zero-discrepancy balancing record.
                  </p>

                  <p>
                    Furthermore, my certifications in <strong>Artificial Intelligence and Risk Management</strong> enable me to act as a digital catalyst within the branch, driving customer adoption of electronic payment channels while defending against transactional fraud and KYC vulnerabilities.
                  </p>

                  <p>
                    I welcome the opportunity to discuss in detail how my operational rigor and dedication can reinforce {atsConfig.targetCompany}'s audit readiness and operational excellence. Thank you for your consideration.
                  </p>
                </>
              )}

              <div className="pt-4 space-y-1">
                <div>Sincerely,</div>
                <strong className="block text-sm" style={{ color: currentTheme.brandColor }}>
                  {profile.name}
                </strong>
                <div className="text-xs text-slate-500">
                  Senior Customer Service Officer (SCSO - Cash I) • Siinqee Bank S.C.
                </div>
                <div className="text-xs text-slate-400">
                  {profile.email} | {profile.phone}
                </div>
              </div>
            </div>
          )}

          {/* Footer Insignia */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Dual-Custody Banking Credentials</span>
            </span>
            <span>Ref: EGH-ATS-{atsConfig.targetRole.slice(0, 3).toUpperCase()}-2026</span>
          </div>
        </div>

      </div>
    </section>
  );
};
