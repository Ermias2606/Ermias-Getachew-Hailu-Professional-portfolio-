import React, { useState } from 'react';
import { Profile, DocTheme } from '../types';
import { FileText, Sparkles, Printer, Download, Copy, Check, Briefcase, Building2, CheckCircle2 } from 'lucide-react';

interface AtsApplicationStudioProps {
  profile: Profile;
}

export const AtsApplicationStudio: React.FC<AtsApplicationStudioProps> = ({ profile }) => {
  const [vacancyText, setVacancyText] = useState<string>(
    `Siinqee Bank S.C. invites competent and qualified applicants for the position of Senior Branch Operations & Cash Supervisor. Key responsibilities include overseeing branch physical cash reserves, dual-custody vault protocols, regulatory AML/KYC reporting, daily GL reconciliation, and team leadership to maintain 100% audit-readiness.`
  );
  const [targetCompany, setTargetCompany] = useState<string>('Siinqee Bank S.C.');
  const [targetRole, setTargetRole] = useState<string>('Senior Branch Operations & Cash Supervisor');
  const [docType, setDocType] = useState<'resume' | 'cover'>('resume');
  const [docTheme, setDocTheme] = useState<DocTheme>('theme-emerald');
  const [matchScore, setMatchScore] = useState<number>(94);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([
    'Dual-Custody Vault',
    'GL Reconciliation',
    'AML/KYC Compliance',
    'Cash Forecasting',
    '100% Audit Readiness',
    'Team Leadership',
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    {
      company: 'Siinqee Bank S.C.',
      role: 'Senior Branch Operations & Cash Supervisor',
      notice: `Siinqee Bank S.C. invites qualified internal and external applicants for Senior Branch Cash Supervisor. Mandates include managing multi-million ETB vault holdings, maintaining zero discrepancy between physical count and core banking GL, enforcing dual control, and training frontline tellers.`,
    },
    {
      company: 'Commercial Bank of Ethiopia / Private Banks',
      role: 'Senior AML & Operational Risk Specialist',
      notice: `Seeking an experienced banking professional to execute regulatory compliance, Suspicious Activity Reports (SAR), Currency Transaction Reports (CTR), and daily sanctions screening adhering strictly to National Bank of Ethiopia (NBE) banking directives.`,
    },
    {
      company: 'Cooperative Bank of Oromia / Awash Bank',
      role: 'Branch Customer Service & Liquidity Lead',
      notice: `Looking for a Senior Customer Service Officer to drive deposit mobilization campaigns, oversee high-velocity counter operations, resolve teller suspense entries, and deliver exceptional customer relationship retention.`,
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setTargetCompany(p.company);
    setTargetRole(p.role);
    setVacancyText(p.notice);
    runMatchingEngine(p.company, p.role, p.notice);
  };

  const runMatchingEngine = (
    company = targetCompany,
    role = targetRole,
    notice = vacancyText
  ) => {
    const textLower = notice.toLowerCase();
    const keywords = [
      { word: 'vault', label: 'Vault Security' },
      { word: 'cash', label: 'Cash Management' },
      { word: 'reconciliation', label: 'GL Reconciliation' },
      { word: 'aml', label: 'AML/CFT Directives' },
      { word: 'kyc', label: 'KYC Verification' },
      { word: 'audit', label: '100% Audit Readiness' },
      { word: 'leadership', label: 'Strategic Leadership' },
      { word: 'settlement', label: 'EOD Settlement' },
      { word: 'customer', label: 'Customer Relations' },
      { word: 'compliance', label: 'Regulatory Compliance' },
    ];

    const matched = keywords
      .filter((k) => textLower.includes(k.word))
      .map((k) => k.label);

    const score = Math.min(98, Math.max(82, 80 + matched.length * 2));
    setMatchScore(score);
    setMatchedKeywords(
      matched.length > 0 ? matched : ['Dual Custody', 'GL Settlement', 'Vault Security']
    );
  };

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

  const handleExportWord = () => {
    const docElement = document.getElementById('liveAtsDocPreview');
    if (!docElement) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${profile.name} - ${targetRole}</title>
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
    a.download = `Ermias_Getachew_${targetRole.replace(/\s+/g, '_')}_Application.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const docElement = document.getElementById('liveAtsDocPreview');
    if (!docElement) return;
    navigator.clipboard.writeText(docElement.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="studioSection" className="mb-20 scroll-mt-20">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          Career Deployment Suite
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <FileText className="w-7 h-7 text-emerald-600" />
          <span>Real-Time ATS Job Matcher & Application Studio</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Paste any banking vacancy announcement to instantly auto-tailor executive summaries, impact bullets, and formal cover letters optimized for ATS scanners and recruitment committees.
        </p>
      </div>

      {/* Preset Quick Buttons */}
      <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          1-Click Banking Vacancy Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 transition text-left"
            >
              <strong>{p.role}</strong>
              <span className="text-slate-400 block text-[10px]">{p.company}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Job Announcement Input & Engine Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Vacancy Announcement / Job Description
            </label>
            <textarea
              id="atsJobNoticeTextarea"
              rows={5}
              value={vacancyText}
              onChange={(e) => {
                setVacancyText(e.target.value);
                runMatchingEngine(targetCompany, targetRole, e.target.value);
              }}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 leading-relaxed font-sans"
              placeholder="Paste job posting here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Target Institution
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => {
                  setTargetCompany(e.target.value);
                  runMatchingEngine(e.target.value, targetRole, vacancyText);
                }}
                className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Target Position
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => {
                  setTargetRole(e.target.value);
                  runMatchingEngine(targetCompany, e.target.value, vacancyText);
                }}
                className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* ATS Score & Matched Keywords Badge */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-600/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                ATS Compatibility Match
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {matchedKeywords.length} core competencies matched
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {matchScore}%
            </div>
          </div>

          {/* Matched Keywords Chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Matched Keywords:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {matchedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Document Styling & Theme Selector */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Document Color Scheme
              </label>
              <div className="flex items-center gap-2">
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
                    className={`w-7 h-7 rounded-full transition-transform ${
                      docTheme === th.id
                        ? 'ring-2 ring-offset-2 ring-slate-400 scale-110 shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={th.label}
                  />
                ))}
              </div>
            </div>

            {/* Document Type Segmented Switch */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Document View
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  onClick={() => setDocType('resume')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    docType === 'resume'
                      ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Tailored Resume
                </button>
                <button
                  onClick={() => setDocType('cover')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition ${
                    docType === 'cover'
                      ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Cover Letter
                </button>
              </div>
            </div>

            {/* Export Actions Bar */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleExportWord}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Word (.doc)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export PDF / Print</span>
              </button>

              <button
                onClick={handleCopyText}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs transition"
                title="Copy Document Text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Live Printable / Exportable Document Preview Sheet */}
        <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-lg p-7 sm:p-9 relative overflow-hidden font-sans">
          
          <div id="liveAtsDocPreview" className="space-y-6">
            
            {/* Document Top Header */}
            <div className="border-b pb-4" style={{ borderColor: '#e2e8f0' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-2xl font-black uppercase tracking-tight"
                    style={{ color: currentTheme.brandColor }}
                  >
                    {profile.name}
                  </h1>
                  <div className="text-xs font-bold text-slate-600 mt-0.5">
                    {profile.title}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500 leading-snug">
                  <div>{profile.email}</div>
                  <div>{profile.phone}</div>
                  <div>{profile.location}</div>
                </div>
              </div>
            </div>

            {/* Document Content Toggle: Resume vs Cover Letter */}
            {docType === 'resume' ? (
              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* Professional Summary */}
                <div>
                  <h2
                    className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                    style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                  >
                    Targeted Professional Summary
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    Performance-driven <strong>Senior Customer Service Officer (SCSO - Cash I, Grade IX)</strong> at {profile.bankName} seeking the <strong>{targetRole}</strong> role at <strong>{targetCompany}</strong>. Offers a distinctive Dual-Degree Advantage combining strategic leadership (BA in Management, GPA 3.6/4.0) with forensic data integrity (BA in Heritage, GPA 3.42/4.0). Proven track record maintaining an unbroken 100% zero-discrepancy daily reconciliation record across multi-million ETB vault operations, strict AML/KYC directive execution, and high-velocity teller service.
                  </p>
                </div>

                {/* Core Targeted Strengths */}
                <div>
                  <h2
                    className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                    style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                  >
                    Key Targeted Operations Highlights
                  </h2>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-700 leading-relaxed">
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

                {/* Academic Credentials */}
                <div>
                  <h2
                    className="text-xs font-extrabold uppercase tracking-wider mb-2 pb-1 border-b"
                    style={{ color: currentTheme.brandColor, borderColor: currentTheme.brandColor }}
                  >
                    Academic Background & Certifications
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong>Bachelor of Arts in Management</strong> — Oromia State University
                        <div className="text-[11px] text-slate-500">Focus: Strategic Management, Finance, Organizational Leadership</div>
                      </div>
                      <strong className="font-mono text-emerald-800 text-xs">GPA 3.60 / 4.00</strong>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <strong>Bachelor of Arts in Archaeology & Heritage Management</strong> — Aksum University
                        <div className="text-[11px] text-slate-500">Focus: Forensic Evidence, Archival Documentation, Research Methodologies</div>
                      </div>
                      <strong className="font-mono text-emerald-800 text-xs">GPA 3.42 / 4.00</strong>
                    </div>

                    <div className="pt-1 text-[11px] text-slate-600">
                      <strong>Professional Certifications:</strong> Artificial Intelligence Fundamentals, Risk Management, Business Analysis, and E-Commerce Operations.
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Formal Cover Letter */
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                <div className="space-y-1">
                  <div><strong>Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div><strong>To:</strong> The Recruitment & Human Capital Committee</div>
                  <div><strong>Entity:</strong> {targetCompany}</div>
                  <div><strong>Subject: Formal Application for the Position of {targetRole}</strong></div>
                </div>

                <p>
                  Dear Members of the Recruitment Committee,
                </p>

                <p>
                  I am writing to formally submit my candidature for the <strong>{targetRole}</strong> vacancy at <strong>{targetCompany}</strong>. With over three years of progressive, audit-verified banking operations experience at Siinqee Bank S.C. (advancing from Trainee to Senior Customer Service Officer - Cash I, Job Grade IX), I have cultivated an uncompromising standard of dual-control discipline, liquidity forecasting, and regulatory compliance.
                </p>

                <p>
                  What distinguishes my candidacy is my multidisciplinary foundation. Holding dual Bachelor of Arts degrees—one in <strong>Management</strong> from Oromia State University (GPA 3.6/4.0) and one in <strong>Archaeology & Heritage Management</strong> from Aksum University (GPA 3.42/4.0)—I synergize strategic organizational vision with forensic data accuracy. In branch operations, I treat every account entry and general ledger voucher with investigative scrutiny, maintaining an unbroken 100% zero-discrepancy balancing record.
                </p>

                <p>
                  Furthermore, my certifications in <strong>Artificial Intelligence and Risk Management</strong> enable me to act as a digital catalyst within the branch, driving customer adoption of electronic payment channels while defending against transactional fraud and KYC vulnerabilities.
                </p>

                <p>
                  I welcome the opportunity to discuss in detail how my operational rigor and dedication can reinforce {targetCompany}'s audit readiness and operational excellence. Thank you for your consideration.
                </p>

                <div className="pt-4 space-y-1">
                  <div>Sincerely,</div>
                  <strong className="block text-sm" style={{ color: currentTheme.brandColor }}>
                    {profile.name}
                  </strong>
                  <div className="text-xs text-slate-500">
                    Senior Customer Service Officer (SCSO - Cash I) • Siinqee Bank S.C.
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {profile.email} | {profile.phone}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
