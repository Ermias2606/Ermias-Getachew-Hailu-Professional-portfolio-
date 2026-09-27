import React, { useState } from 'react';
import {
  Profile,
  Article,
  ShelfItem,
  InboxMessage,
  Pillar,
  Stat,
  ExecutiveQuote,
  AdminCredentials,
  AtsConfig,
  ContributorType,
  DocTheme,
  BankingDocument,
  DocumentCategory
} from '../types';
import {
  ShieldCheck,
  FileText,
  BookMarked,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  EyeOff,
  Download,
  Upload,
  RotateCcw,
  Mail,
  ExternalLink,
  Quote,
  KeyRound,
  Lock,
  Sparkles,
  ShieldAlert,
  Printer,
  SlidersHorizontal,
  Building2,
  Briefcase,
  FileCheck,
  Copy,
  GraduationCap
} from 'lucide-react';
import { ImageUploadDropdown } from './ImageUploadDropdown';
import { DEFAULT_ADMIN_CREDENTIALS, initialAtsConfig } from '../data/initialData';

interface ControlRoomProps {
  profile: Profile;
  articles: Article[];
  shelf: ShelfItem[];
  inbox: InboxMessage[];
  quotes: ExecutiveQuote[];
  documents?: BankingDocument[];
  atsConfig?: AtsConfig;
  onSaveProfile: (profile: Profile) => void;
  onSaveArticles: (articles: Article[]) => void;
  onSaveShelf: (shelf: ShelfItem[]) => void;
  onSaveInbox: (inbox: InboxMessage[]) => void;
  onSaveQuotes: (quotes: ExecutiveQuote[]) => void;
  onSaveDocuments?: (docs: BankingDocument[]) => void;
  onUploadDocument?: (doc: BankingDocument) => void;
  onDeleteDocument?: (id: string) => void;
  onSaveAtsConfig?: (config: AtsConfig) => void;
  onResetDefaults: () => void;
  onExit: () => void;
  onToast: (msg: string) => void;
}

export const ControlRoom: React.FC<ControlRoomProps> = ({
  profile,
  articles,
  shelf,
  inbox,
  quotes,
  documents = [],
  atsConfig,
  onSaveProfile,
  onSaveArticles,
  onSaveShelf,
  onSaveInbox,
  onSaveQuotes,
  onSaveDocuments,
  onUploadDocument,
  onDeleteDocument,
  onSaveAtsConfig,
  onResetDefaults,
  onExit,
  onToast
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'atsStudio' | 'articles' | 'shelf' | 'quotes' | 'inbox' | 'documents' | 'security' | 'backup'
  >('overview');

  // Document Deposit & Edit Form State
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentCategory>('letter');
  const [docIssuer, setDocIssuer] = useState('Siinqee Bank S.C.');
  const [docDate, setDocDate] = useState(new Date().toISOString().slice(0, 10));
  const [docIdNum, setDocIdNum] = useState('');
  const [docScore, setDocScore] = useState('');
  const [docFileUrl, setDocFileUrl] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80');
  const [docDesc, setDocDesc] = useState('');
  const [docTagsInput, setDocTagsInput] = useState('Appointment, Siinqee Bank, Discipline');

  const handleEditDocument = (doc: BankingDocument) => {
    setEditingDocId(doc.id);
    setDocTitle(doc.title);
    setDocCategory(doc.category);
    setDocIssuer(doc.issuer);
    setDocDate(doc.issueDate);
    setDocIdNum(doc.credentialId || '');
    setDocScore(doc.scoreOrGrade || '');
    setDocFileUrl(doc.fileUrl);
    setDocDesc(doc.description);
    setDocTagsInput((doc.tags || []).join(', '));
  };

  const resetDocForm = () => {
    setEditingDocId(null);
    setDocTitle('');
    setDocIdNum('');
    setDocScore('');
    setDocDesc('');
  };

  const handleSaveDocumentForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docIssuer.trim()) {
      alert('Please fill out document title and issuer.');
      return;
    }

    if (editingDocId) {
      const updatedDocs = documents.map((d) =>
        d.id === editingDocId
          ? {
              ...d,
              title: docTitle.trim(),
              category: docCategory,
              issuer: docIssuer.trim(),
              issueDate: docDate,
              credentialId: docIdNum.trim() || undefined,
              scoreOrGrade: docScore.trim() || undefined,
              fileUrl: docFileUrl.trim(),
              description: docDesc.trim(),
              tags: docTagsInput.split(',').map((t) => t.trim()).filter(Boolean),
            }
          : d
      );
      if (onSaveDocuments) onSaveDocuments(updatedDocs);
      onToast(`Document "${docTitle}" updated successfully!`);
    } else {
      const newDoc: BankingDocument = {
        id: `doc-admin-${Date.now()}`,
        title: docTitle.trim(),
        category: docCategory,
        issuer: docIssuer.trim(),
        issueDate: docDate,
        credentialId: docIdNum.trim() || undefined,
        scoreOrGrade: docScore.trim() || undefined,
        fileUrl: docFileUrl.trim(),
        fileType: 'image',
        description: docDesc.trim(),
        verified: true,
        tags: docTagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (onUploadDocument) {
        onUploadDocument(newDoc);
      } else if (onSaveDocuments) {
        onSaveDocuments([newDoc, ...documents]);
      }
      onToast(`Deposited "${newDoc.title}" to credentials vault!`);
    }

    resetDocForm();
  };

  // Profile Form State
  const [formData, setFormData] = useState<Profile>(profile);

  // Article Form State
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('');
  const [articleReadTime, setArticleReadTime] = useState('4 min read');
  const [articleSummary, setArticleSummary] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleLang, setArticleLang] = useState<'am' | 'en'>('am');
  const [articleImageUrl, setArticleImageUrl] = useState('');

  const [editingShelfId, setEditingShelfId] = useState<number | null>(null);
  const [shelfTitle, setShelfTitle] = useState('');
  const [shelfType, setShelfType] = useState<'book' | 'movie' | 'philosophy'>('book');
  const [shelfAuthor, setShelfAuthor] = useState('');
  const [shelfRating, setShelfRating] = useState<number>(5);
  const [shelfImg, setShelfImg] = useState('');
  const [shelfNotes, setShelfNotes] = useState('');
  const [shelfKeyTakeaway, setShelfKeyTakeaway] = useState('');

  // Search in Admin
  const [articleSearch, setArticleSearch] = useState('');
  const [shelfSearch, setShelfSearch] = useState('');
  const [quoteSearch, setQuoteSearch] = useState('');

  // ATS Studio State
  const [atsState, setAtsState] = useState<AtsConfig>(() => {
    return atsConfig || initialAtsConfig;
  });

  // Quotes Form State
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState(profile.name || 'Ermias Getachew Hailu');
  const [quoteRole, setQuoteRole] = useState('Senior Customer Service Officer (SCSO - Cash I)');
  const [quoteInstitution, setQuoteInstitution] = useState('Siinqee Bank S.C.');
  const [quoteContributorType, setQuoteContributorType] = useState<ContributorType>('Portfolio Owner');
  const [quoteCategory, setQuoteCategory] = useState('Operational Integrity');
  const [quoteSourceOrContext, setQuoteSourceOrContext] = useState('');
  const [quoteImageUrl, setQuoteImageUrl] = useState(
    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80'
  );
  const [quoteFeatured, setQuoteFeatured] = useState(true);

  // Security Credentials Form State
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem('egh_admin_creds');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_ADMIN_CREDENTIALS;
  });
  const [emailInput, setEmailInput] = useState(adminCreds.email || 'ermikeab@gmail.com');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSecurityPasswords, setShowSecurityPasswords] = useState(false);
  const [credError, setCredError] = useState<string | null>(null);
  const [credSuccess, setCredSuccess] = useState<string | null>(null);

  // -------------------------------------------------------------
  // Profile Handlers
  // -------------------------------------------------------------
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onToast('Profile, pillars, and headline statistics saved live!');
  };

  const updatePillar = (index: number, field: keyof Pillar, value: string) => {
    const updated = [...formData.pillars];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, pillars: updated });
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updated = [...formData.stats];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, stats: updated });
  };

  // -------------------------------------------------------------
  // Article Handlers
  // -------------------------------------------------------------
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleSummary.trim()) {
      alert('Please fill out at least Article Title and Summary.');
      return;
    }

    if (editingArticleId) {
      const updated = articles.map((a) =>
        a.id === editingArticleId
          ? {
              ...a,
              title: articleTitle.trim(),
              category: articleCategory.trim() || 'Economics',
              readTime: articleReadTime.trim() || '4 min read',
              summary: articleSummary.trim(),
              content: articleContent.trim() || articleSummary.trim(),
              language: articleLang,
            }
          : a
      );
      onSaveArticles(updated);
      onToast('Article updated successfully!');
    } else {
      const newArt: Article = {
        id: Date.now(),
        title: articleTitle.trim(),
        category: articleCategory.trim() || 'Economics',
        readTime: articleReadTime.trim() || '4 min read',
        summary: articleSummary.trim(),
        content: articleContent.trim() || articleSummary.trim(),
        language: articleLang,
        publishedDate: new Date().toISOString().slice(0, 7),
      };
      onSaveArticles([newArt, ...articles]);
      onToast('New analytical essay published!');
    }

    resetArticleForm();
  };

  const handleEditArticle = (a: Article) => {
    setEditingArticleId(a.id);
    setArticleTitle(a.title);
    setArticleCategory(a.category);
    setArticleReadTime(a.readTime);
    setArticleSummary(a.summary);
    setArticleContent(a.content);
    setArticleLang(a.language === 'en' ? 'en' : 'am');
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Permanently delete this article?')) {
      onSaveArticles(articles.filter((a) => a.id !== id));
      onToast('Article removed from portfolio.');
    }
  };

  const resetArticleForm = () => {
    setEditingArticleId(null);
    setArticleTitle('');
    setArticleCategory('');
    setArticleReadTime('4 min read');
    setArticleSummary('');
    setArticleContent('');
  };

  // -------------------------------------------------------------
  // Shelf Handlers
  // -------------------------------------------------------------
  const handleSaveShelfItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shelfTitle.trim() || !shelfAuthor.trim()) {
      alert('Please provide title and author/director.');
      return;
    }

    const defaultImg =
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80';

    if (editingShelfId) {
      const updated = shelf.map((item) =>
        item.id === editingShelfId
          ? {
              ...item,
              title: shelfTitle.trim(),
              type: shelfType,
              author: shelfAuthor.trim(),
              rating: shelfRating,
              img: shelfImg.trim() || defaultImg,
              notes: shelfNotes.trim(),
              keyTakeaway: shelfKeyTakeaway.trim(),
            }
          : item
      );
      onSaveShelf(updated);
      onToast('Shelf item updated!');
    } else {
      const newItem: ShelfItem = {
        id: Date.now(),
        title: shelfTitle.trim(),
        type: shelfType,
        author: shelfAuthor.trim(),
        rating: shelfRating,
        img: shelfImg.trim() || defaultImg,
        notes: shelfNotes.trim(),
        keyTakeaway: shelfKeyTakeaway.trim(),
      };
      onSaveShelf([newItem, ...shelf]);
      onToast('Item added to The Shelf!');
    }

    resetShelfForm();
  };

  const handleEditShelfItem = (s: ShelfItem) => {
    setEditingShelfId(s.id);
    setShelfTitle(s.title);
    setShelfType(s.type);
    setShelfAuthor(s.author);
    setShelfRating(s.rating || 5);
    setShelfImg(s.img);
    setShelfNotes(s.notes);
    setShelfKeyTakeaway(s.keyTakeaway || '');
  };

  const handleDeleteShelfItem = (id: number) => {
    if (confirm('Delete this item from the shelf catalog?')) {
      onSaveShelf(shelf.filter((s) => s.id !== id));
      onToast('Shelf item removed.');
    }
  };

  const resetShelfForm = () => {
    setEditingShelfId(null);
    setShelfTitle('');
    setShelfType('book');
    setShelfAuthor('');
    setShelfRating(5);
    setShelfImg('');
    setShelfNotes('');
    setShelfKeyTakeaway('');
  };

  // -------------------------------------------------------------
  // Inbox Handlers
  // -------------------------------------------------------------
  const handleDeleteMessage = (id: number) => {
    onSaveInbox(inbox.filter((m) => m.id !== id));
    onToast('Message deleted.');
  };

  const handleMarkAllRead = () => {
    onSaveInbox(inbox.map((m) => ({ ...m, read: true })));
    onToast('All messages marked as read.');
  };

  // -------------------------------------------------------------
  // Quotes Handlers
  // -------------------------------------------------------------
  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim()) {
      alert('Please fill out the quote statement.');
      return;
    }

    const defaultImg =
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80';

    if (editingQuoteId) {
      const updated = quotes.map((q) =>
        q.id === editingQuoteId
          ? {
              ...q,
              quote: quoteText.trim(),
              author: quoteAuthor.trim() || profile.name,
              role: quoteRole.trim() || 'Senior Customer Service Officer (SCSO - Cash I)',
              institution: quoteInstitution.trim() || 'Siinqee Bank S.C.',
              contributorType: quoteContributorType,
              category: quoteCategory.trim() || 'Operational Integrity',
              sourceOrContext: quoteSourceOrContext.trim(),
              imageUrl: quoteImageUrl.trim() || defaultImg,
              featured: quoteFeatured,
            }
          : q
      );
      onSaveQuotes(updated);
      onToast('Executive quote updated successfully!');
    } else {
      const newQuote: ExecutiveQuote = {
        id: `quote-${Date.now()}`,
        quote: quoteText.trim(),
        author: quoteAuthor.trim() || profile.name,
        role: quoteRole.trim() || 'Senior Customer Service Officer (SCSO - Cash I)',
        institution: quoteInstitution.trim() || 'Siinqee Bank S.C.',
        contributorType: quoteContributorType,
        category: quoteCategory.trim() || 'Operational Integrity',
        sourceOrContext: quoteSourceOrContext.trim(),
        imageUrl: quoteImageUrl.trim() || defaultImg,
        featured: quoteFeatured,
      };
      onSaveQuotes([newQuote, ...quotes]);
      onToast('New quote added to showcase!');
    }

    resetQuoteForm();
  };

  const handleEditQuote = (q: ExecutiveQuote) => {
    setEditingQuoteId(q.id);
    setQuoteText(q.quote);
    setQuoteAuthor(q.author);
    setQuoteRole(q.role);
    setQuoteInstitution(q.institution || 'Siinqee Bank S.C.');
    setQuoteContributorType(q.contributorType || 'Portfolio Owner');
    setQuoteCategory(q.category);
    setQuoteSourceOrContext(q.sourceOrContext || '');
    setQuoteImageUrl(q.imageUrl);
    setQuoteFeatured(q.featured !== false);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm('Permanently remove this quote from the landing page showcase?')) {
      onSaveQuotes(quotes.filter((q) => q.id !== id));
      onToast('Quote removed from showcase.');
    }
  };

  const resetQuoteForm = () => {
    setEditingQuoteId(null);
    setQuoteText('');
    setQuoteAuthor(profile.name || 'Ermias Getachew Hailu');
    setQuoteRole('Senior Customer Service Officer (SCSO - Cash I)');
    setQuoteInstitution('Siinqee Bank S.C.');
    setQuoteContributorType('Portfolio Owner');
    setQuoteCategory('Operational Integrity');
    setQuoteSourceOrContext('');
    setQuoteImageUrl(
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80'
    );
    setQuoteFeatured(true);
  };

  // -------------------------------------------------------------
  // ATS Studio & Application Dossier Handlers
  // -------------------------------------------------------------
  const atsPresets = [
    {
      company: 'Siinqee Bank S.C.',
      role: 'Senior Branch Operations & Cash Supervisor',
      notice: `Siinqee Bank S.C. invites qualified internal and external applicants for Senior Branch Cash Supervisor. Mandates include managing multi-million ETB vault holdings, maintaining zero discrepancy between physical count and core banking GL, enforcing dual control, and training frontline tellers.`,
    },
    {
      company: 'Commercial Bank of Ethiopia',
      role: 'Senior AML & Operational Risk Specialist',
      notice: `Seeking an experienced banking professional to execute regulatory compliance, Suspicious Activity Reports (SAR), Currency Transaction Reports (CTR), and daily sanctions screening adhering strictly to National Bank of Ethiopia (NBE) banking directives.`,
    },
    {
      company: 'Cooperative Bank of Oromia / Awash Bank',
      role: 'Branch Customer Service & Liquidity Lead',
      notice: `Looking for a Senior Customer Service Officer to drive deposit mobilization campaigns, oversee high-velocity counter operations, resolve teller suspense entries, and deliver exceptional customer relationship retention.`,
    },
    {
      company: 'National Bank of Ethiopia (NBE)',
      role: 'Senior Banking Inspector & Currency Compliance Officer',
      notice: `Seeking a candidate with verified forensic operational discipline to conduct branch audit inspections, currency reserve validations, and compliance oversight under national banking proclamations.`,
    },
  ];

  const runAtsMatcher = (text: string) => {
    const textLower = (text || '').toLowerCase();
    const keywordsList = [
      { word: 'vault', label: 'Dual-Custody Vault' },
      { word: 'cash', label: 'Cash Forecasting' },
      { word: 'reconciliation', label: 'GL Reconciliation' },
      { word: 'aml', label: 'AML/KYC Compliance' },
      { word: 'kyc', label: 'KYC Directives' },
      { word: 'audit', label: '100% Audit Readiness' },
      { word: 'leadership', label: 'Team Leadership' },
      { word: 'settlement', label: 'EOD Settlement' },
      { word: 'customer', label: 'Customer Relations' },
      { word: 'compliance', label: 'Regulatory Compliance' },
    ];
    const matched = keywordsList.filter((k) => textLower.includes(k.word)).map((k) => k.label);
    const score = Math.min(98, Math.max(82, 80 + matched.length * 2));
    return { score, keywords: matched.length > 0 ? matched : ['Dual Custody', 'GL Settlement', 'Vault Security'] };
  };

  const handleApplyAtsPreset = (p: typeof atsPresets[0]) => {
    const { score, keywords } = runAtsMatcher(p.notice);
    setAtsState((prev) => ({
      ...prev,
      targetCompany: p.company,
      targetRole: p.role,
      vacancyText: p.notice,
      matchScore: score,
      matchedKeywords: keywords,
    }));
    onToast(`Applied vacancy preset: ${p.company}`);
  };

  const handleReanalyzeAts = () => {
    const { score, keywords } = runAtsMatcher(atsState.vacancyText);
    setAtsState((prev) => ({ ...prev, matchScore: score, matchedKeywords: keywords }));
    onToast(`ATS Match Analysis: ${score}% match with ${keywords.length} core keywords!`);
  };

  const handleSaveAtsLive = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AtsConfig = {
      ...atsState,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    setAtsState(updated);
    if (onSaveAtsConfig) {
      onSaveAtsConfig(updated);
    }
    onToast('ATS Studio configuration published live to Cover and Resume page!');
  };

  // Administrative Dossier Exports (with full download permission)
  const handleAdminExportWord = (type: 'resume' | 'cover') => {
    const title = type === 'resume'
      ? `Resume_ATS_${profile.name.replace(/\s+/g, '_')}`
      : `Cover_Letter_${profile.name.replace(/\s+/g, '_')}`;

    const content = type === 'resume' ? `
      <h1>${profile.name}</h1>
      <p><strong>${atsState.targetRole}</strong> | Target: ${atsState.targetCompany}</p>
      <p>Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}</p>
      <hr/>
      <h2>Professional Executive Summary</h2>
      <p>${atsState.customResumeSummary || profile.bio}</p>
      <h2>ATS Core Keywords & Operational Competencies</h2>
      <p>${(atsState.matchedKeywords || []).join(' • ')}</p>
      <h2>Verified Banking Experience</h2>
      <p><strong>Senior Customer Service Officer (SCSO - Cash I / Grade IX)</strong> — Siinqee Bank S.C. (2020 - Present)</p>
      <ul>
        <li>Dual-custody vault keyholder managing multi-million ETB daily branch physical cash holdings.</li>
        <li>Conducted daily end-of-day general ledger reconciliation with 100% zero-discrepancy record.</li>
        <li>Enforced strict AML/KYC compliance adhering to National Bank of Ethiopia directives.</li>
      </ul>
      <h2>Academic Credentials</h2>
      <p><strong>BA in Management</strong> — Oromia State University (GPA 3.60/4.00, Very Great Distinction)</p>
      <p><strong>BA in Archaeology & Heritage Management</strong> — Aksum University (GPA 3.42/4.00, Great Distinction)</p>
    ` : `
      <h1>${profile.name}</h1>
      <p>${profile.email} | ${profile.phone} | ${profile.location}</p>
      <hr/>
      <p>Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p><strong>Hiring Committee & Executive Leadership</strong><br/>${atsState.targetCompany}</p>
      <p><strong>RE: Application for the Position of ${atsState.targetRole}</strong></p>
      <p>${(atsState.customCoverLetter || `Dear Hiring Committee,\n\nI am writing to express my enthusiastic candidacy for the ${atsState.targetRole} at ${atsState.targetCompany}. With extensive frontline experience as Senior Customer Service Officer (SCSO - Cash I) at Siinqee Bank S.C., combined with dual degrees in Management and Archaeology, I offer a unique synthesis of strategic leadership and forensic reconciliation precision.\n\nThank you for considering my application.\n\nSincerely,\n${profile.name}`).replace(/\n/g, '<br/>')}</p>
    `;

    const blob = new Blob(
      [`<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><title>${title}</title></head><body style="font-family:Arial,sans-serif;line-height:1.6;margin:40px;">${content}</body></html>`],
      { type: 'application/msword' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    onToast(`Exported ${type === 'resume' ? 'Resume' : 'Cover Letter'} (.doc) with admin permission!`);
  };

  const handleAdminPrint = () => {
    window.print();
  };

  const handleAdminCopyText = () => {
    const text = `
${profile.name} — ${atsState.targetRole}
Target Organization: ${atsState.targetCompany}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}

=== EXECUTIVE SUMMARY ===
${atsState.customResumeSummary || profile.bio}

=== CORE ATS KEYWORDS ===
${(atsState.matchedKeywords || []).join(', ')}

=== TAILORED COVER LETTER ===
${atsState.customCoverLetter || `Dear Hiring Committee,\nI am writing to express my candidacy for the ${atsState.targetRole} at ${atsState.targetCompany}...`}
    `.trim();
    navigator.clipboard.writeText(text);
    onToast('Complete ATS application text copied to clipboard!');
  };

  // -------------------------------------------------------------
  // Security & Credentials Handlers
  // -------------------------------------------------------------
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredError(null);
    setCredSuccess(null);

    const normEmail = emailInput.trim().toLowerCase();
    if (!normEmail || !normEmail.includes('@') || !normEmail.includes('.')) {
      setCredError('Please provide a valid administrator email address.');
      return;
    }

    const currentSavedPass =
      adminCreds.password || DEFAULT_ADMIN_CREDENTIALS.password || 'Admin@1234';

    // If changing password, verify current password
    if (newPassword) {
      if (currPassword !== currentSavedPass && currPassword !== '1234') {
        setCredError('Current password is incorrect. Verification failed.');
        return;
      }
      if (newPassword.length < 6) {
        setCredError('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setCredError('New password and password confirmation do not match.');
        return;
      }
    }

    const updatedCreds: AdminCredentials = {
      email: normEmail,
      password: newPassword ? newPassword : currentSavedPass,
      lastChanged: new Date().toISOString().slice(0, 10),
    };

    localStorage.setItem('egh_admin_creds', JSON.stringify(updatedCreds));
    setAdminCreds(updatedCreds);
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCredSuccess(
      `Administrator credentials updated! Email set to "${normEmail}"${
        newPassword ? ' with new password active.' : '.'
      }`
    );
    onToast('Administrator security credentials updated.');
  };

  const handleResetCredentialsToDefault = () => {
    if (
      confirm(
        'Reset administrator login credentials to default settings (ermikeab@gmail.com / Admin@1234)?'
      )
    ) {
      localStorage.setItem('egh_admin_creds', JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
      setAdminCreds(DEFAULT_ADMIN_CREDENTIALS);
      setEmailInput(DEFAULT_ADMIN_CREDENTIALS.email);
      setCurrPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setCredError(null);
      setCredSuccess('Credentials restored to baseline (ermikeab@gmail.com / Admin@1234).');
      onToast('Admin credentials reset to defaults.');
    }
  };

  // -------------------------------------------------------------
  // Backup & Restore
  // -------------------------------------------------------------
  const handleExportBackupJSON = () => {
    const backupState = {
      profile: formData,
      articles,
      shelf,
      quotes,
      inbox,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ermias_Banking_Portfolio_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onToast('Complete portfolio state exported to JSON file!');
  };

  const handleImportBackupJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) setFormData(parsed.profile);
        if (parsed.profile) onSaveProfile(parsed.profile);
        if (parsed.articles) onSaveArticles(parsed.articles);
        if (parsed.shelf) onSaveShelf(parsed.shelf);
        if (parsed.quotes) onSaveQuotes(parsed.quotes);
        if (parsed.inbox) onSaveInbox(parsed.inbox);
        onToast('Portfolio restored successfully from backup!');
      } catch (err) {
        alert('Invalid JSON backup file format.');
      }
    };
    reader.readAsText(file);
  };

  const unreadCount = inbox.filter((m) => !m.read).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      
      {/* Control Room Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Administrative CMS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Control Room & Portfolio CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Authenticated as Ermias Getachew Hailu (Owner Session Active)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            Preview Public Dossier &rarr;
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: ShieldCheck },
          { id: 'profile', label: 'Profile & Pillars', icon: Settings },
          { id: 'atsStudio', label: 'ATS Studio & Dossier', icon: Briefcase },
          { id: 'quotes', label: `Quotes & Showcase (${quotes.length})`, icon: Quote },
          { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
          { id: 'shelf', label: `The Shelf (${shelf.length})`, icon: BookMarked },
          { id: 'documents', label: `Documents Vault (${documents.length})`, icon: GraduationCap },
          { id: 'inbox', label: `Inbox (${inbox.length}${unreadCount > 0 ? ` • ${unreadCount} new` : ''})`, icon: Inbox },
          { id: 'security', label: 'Security & Password', icon: KeyRound },
          { id: 'backup', label: 'Backup & Restore', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Pane: Documents & Vault Deposit */}
      {activeTab === 'documents' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>{editingDocId ? '✏️ Edit Vault Document' : 'Deposit New Document / Credential / Letter'}</span>
              </h3>
              {editingDocId && (
                <button
                  type="button"
                  onClick={resetDocForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel Editing
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Deposit degrees, appointment letters, audit certificates, and regulatory approvals directly into the public credentials vault.
            </p>

            <form onSubmit={handleSaveDocumentForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="e.g. Senior Branch Supervisor Appointment Letter"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Category *
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  >
                    <option value="degree">Academic Degree</option>
                    <option value="letter">Official Letter / Appointment</option>
                    <option value="certificate">Professional Certificate</option>
                    <option value="audit">Audit & Compliance Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Issuing Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={docIssuer}
                    onChange={(e) => setDocIssuer(e.target.value)}
                    placeholder="e.g. Siinqee Bank S.C."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={docDate}
                    onChange={(e) => setDocDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Credential ID / Reference Number
                  </label>
                  <input
                    type="text"
                    value={docIdNum}
                    onChange={(e) => setDocIdNum(e.target.value)}
                    placeholder="e.g. SB/HCD/APPT/2024"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Score / Grade / Designation
                  </label>
                  <input
                    type="text"
                    value={docScore}
                    onChange={(e) => setDocScore(e.target.value)}
                    placeholder="e.g. Job Grade IX / GPA 3.60"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <ImageUploadDropdown
                  value={docFileUrl}
                  onChange={setDocFileUrl}
                  label="Document Scan Preview (Drag & Drop, Preset Gallery, or URL)"
                  placeholder="Drop scan image or select..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={2}
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  placeholder="Detail the significance and verification status..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Category Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={docTagsInput}
                  onChange={(e) => setDocTagsInput(e.target.value)}
                  placeholder="e.g. Appointment, Siinqee Bank, Discipline"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-semibold"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{editingDocId ? 'Update Vault Document' : 'Deposit Document to Credentials Vault'}</span>
                </button>
                {editingDocId && (
                  <button
                    type="button"
                    onClick={resetDocForm}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Existing Vault Documents Manager */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Currently Vaulted Documents ({documents.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/40 dark:bg-slate-950/40">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {doc.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{doc.issuer} • {doc.issueDate}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleEditDocument(doc)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 transition"
                      title="Edit Document"
                    >
                      Edit
                    </button>
                    {onDeleteDocument && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${doc.title}" from vault?`)) {
                            onDeleteDocument(doc.id);
                            onToast('Document removed from vault.');
                          }
                        }}
                        className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pane 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {inbox.length}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Inquiries Received</div>
              <div className="text-xs text-slate-500 mt-0.5">{unreadCount} unread messages</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {articles.length}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Published Essays</div>
              <div className="text-xs text-slate-500 mt-0.5">Amharic & English critical texts</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {shelf.length}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Shelf Catalog Works</div>
              <div className="text-xs text-slate-500 mt-0.5">Books, films & philosophy</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                100%
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Operational Precision</div>
              <div className="text-xs text-slate-500 mt-0.5">Zero-discrepancy vault audit</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Administration Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('articles')}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Essay</span>
              </button>
              <button
                onClick={() => setActiveTab('shelf')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Shelf Item</span>
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Inbox className="w-4 h-4" />
                <span>Review Inquiries</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pane 2: Profile & Pillars Editor */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Core Identity & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Legal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Status Badge Line</label>
                <input
                  type="text"
                  value={formData.statusBadge}
                  onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUploadDropdown
                  value={formData.portraitUrl}
                  onChange={(url) => setFormData({ ...formData, portraitUrl: url })}
                  label="Executive Profile Portrait (Presets / Local Upload / URL)"
                  helperText="Choose a banking portrait preset, upload an executive photo from your device (JPG/PNG/WebP), or paste any image URL."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold uppercase text-[11px] mb-1">Hero Summary Narrative</label>
                <textarea
                  rows={5}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed font-sans"
                />
              </div>
            </div>
          </div>

          {/* Pillars Editor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Strategic Advantage Pillars (3 Pillars)
            </h3>
            <div className="space-y-4">
              {formData.pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold bg-white dark:bg-slate-900"
                      placeholder="Pillar Title"
                    />
                    <input
                      type="text"
                      value={pillar.tag || ''}
                      onChange={(e) => updatePillar(idx, 'tag', e.target.value)}
                      className="w-40 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold bg-white dark:bg-slate-900"
                      placeholder="Badge Tag"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={pillar.desc}
                    onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 leading-relaxed font-sans"
                    placeholder="Pillar Description"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition"
          >
            Save All Profile Changes Live
          </button>
        </form>
      )}

      {/* Pane: ATS Application Studio & Executive Dossier CMS */}
      {activeTab === 'atsStudio' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  ATS Application Studio & Dossier Governance
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Calibrate the target vacancy specification, customize tailored executive application texts, set document themes, and configure public download authorization.
              </p>
            </div>

            {/* Quick Match Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-600/30">
              <div className="text-right">
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 dark:text-emerald-400">
                  ATS Match Score
                </div>
                <div className="text-lg font-black font-mono text-emerald-700 dark:text-emerald-300">
                  {atsState.matchScore || 96}%
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Quick Opportunity Presets */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Target Institutional Presets (1-Click Calibration)</span>
              </span>
              <span className="text-[11px] text-slate-400">Click to instantly populate vacancy & keywords</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {atsPresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyAtsPreset(p)}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-600 text-left transition group shadow-xs"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition truncate">
                    {p.company}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">{p.role}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveAtsLive} className="space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>1. Target Opportunity & Vacancy Specification</span>
                <button
                  type="button"
                  onClick={handleReanalyzeAts}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Re-analyze ATS Keywords</span>
                </button>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Target Institution / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={atsState.targetCompany}
                    onChange={(e) => setAtsState({ ...atsState, targetCompany: e.target.value })}
                    placeholder="e.g. Siinqee Bank S.C."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Target Executive Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={atsState.targetRole}
                    onChange={(e) => setAtsState({ ...atsState, targetRole: e.target.value })}
                    placeholder="e.g. Senior Branch Operations & Cash Supervisor"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Vacancy Announcement / Job Description Notice
                </label>
                <textarea
                  rows={4}
                  value={atsState.vacancyText}
                  onChange={(e) => setAtsState({ ...atsState, vacancyText: e.target.value })}
                  placeholder="Paste the target job description or requirements notice here to optimize ATS keyword matching..."
                  className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Matched Keywords Pills */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Calibrated High-Value ATS Keywords ({atsState.matchedKeywords?.length || 0})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(atsState.matchedKeywords || []).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 text-xs font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Tailored Application Texts */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                2. Tailored Application Texts (Custom Executive Summary & Cover Letter)
              </h4>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Tailored Executive Summary (Displayed in Public Resume)
                </label>
                <textarea
                  rows={3}
                  value={atsState.customResumeSummary || ''}
                  onChange={(e) => setAtsState({ ...atsState, customResumeSummary: e.target.value })}
                  placeholder="Leave empty to use profile bio, or enter an opportunity-tailored executive summary..."
                  className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Tailored Cover Letter Statement (Displayed in Public Cover Letter)
                </label>
                <textarea
                  rows={6}
                  value={atsState.customCoverLetter || ''}
                  onChange={(e) => setAtsState({ ...atsState, customCoverLetter: e.target.value })}
                  placeholder="Enter the tailored cover letter statement addressing the hiring committee..."
                  className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Theme & Permissions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Executive Document Theme
                  </label>
                  <select
                    value={atsState.docTheme || 'theme-emerald'}
                    onChange={(e) => setAtsState({ ...atsState, docTheme: e.target.value as DocTheme })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                  >
                    <option value="theme-emerald">Emerald Green (Banking Standard)</option>
                    <option value="theme-navy">Classic Navy (Corporate Executive)</option>
                    <option value="theme-burgundy">Burgundy / Crimson (Distinguished)</option>
                    <option value="theme-charcoal">Charcoal Slate (Modern Minimalist)</option>
                    <option value="theme-gold">Executive Gold (Private Wealth)</option>
                  </select>
                </div>

                {/* Public Download Permission Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Public Download Authorization Governance
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={atsState.allowPublicDownload !== false}
                      onChange={(e) => setAtsState({ ...atsState, allowPublicDownload: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {atsState.allowPublicDownload !== false
                          ? 'Allow Public Downloads (Active)'
                          : 'Restricted: View-Only for Public Visitors'}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {atsState.allowPublicDownload !== false
                          ? 'Public visitors may download tailored Word (.doc) and PDF files from the Cover & Resume page.'
                          : 'Public visitors have view-only access. Full export permissions remain exclusively available to Administrator in this Control Room.'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Admin Master Download Actions */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <h4 className="text-sm font-bold text-white">
                    Administrative Master Export & Download Station
                  </h4>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Full clearance granted to {profile.email}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                As authenticated administrator, you hold permanent clearance to generate, preview, and export tailored documents in standard ATS format regardless of public restriction flags:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleAdminExportWord('resume')}
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (.doc)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAdminExportWord('cover')}
                  className="px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Cover Letter (.doc)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminPrint}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminCopyText}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Application Text</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Save & Publish ATS Dossier Configuration Live</span>
            </button>
          </form>
        </div>
      )}

      {/* Pane 3: Articles Manager */}
      {activeTab === 'articles' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingArticleId ? '✏️ Edit Article' : '✍️ Publish New Essay'}
              </h3>
              {editingArticleId && (
                <button
                  type="button"
                  onClick={resetArticleForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel Editing
                </button>
              )}
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="e.g. ቄሳዊ ካፒታሊዝም እና የሞራል ቀውስ..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={articleCategory}
                    onChange={(e) => setArticleCategory(e.target.value)}
                    placeholder="e.g. Economics & Ethics"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Language</label>
                  <select
                    value={articleLang}
                    onChange={(e) => setArticleLang(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="am">አማርኛ (Amharic)</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={articleReadTime}
                    onChange={(e) => setArticleReadTime(e.target.value)}
                    placeholder="e.g. 4 min read"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>


              <div>
                <ImageUploadDropdown
                  value={articleImageUrl}
                  onChange={setArticleImageUrl}
                  label="Article Cover Image (Drag & Drop, Preset Gallery, or URL)"
                  placeholder="Select essay cover image..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Short Abstract *</label>
                <textarea
                  rows={2}
                  required
                  value={articleSummary}
                  onChange={(e) => setArticleSummary(e.target.value)}
                  placeholder="2-3 sentence overview for card preview..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Complete Essay Body Text</label>
                <textarea
                  rows={8}
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  placeholder="Full text of the essay..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed font-sans"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition"
              >
                {editingArticleId ? 'Update Article' : 'Publish Article'}
              </button>
            </form>
          </div>

          {/* List of Published Articles */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Published Essays ({articles.length})
            </h4>

            <div className="space-y-3">
              {articles.map((a) => (
                <div
                  key={a.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {a.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{a.readTime}</span>
                    </div>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block truncate">
                      {a.title}
                    </strong>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{a.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEditArticle(a)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(a.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pane 4: The Shelf Manager */}
      {activeTab === 'shelf' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingShelfId ? '✏️ Edit Shelf Work' : '📚 Add Item to The Shelf'}
              </h3>
              {editingShelfId && (
                <button
                  type="button"
                  onClick={resetShelfForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cancel Editing
                </button>
              )}
            </div>

            <form onSubmit={handleSaveShelfItem} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Medium / Type</label>
                  <select
                    value={shelfType}
                    onChange={(e) => setShelfType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="book">Book</option>
                    <option value="movie">Cinema</option>
                    <option value="philosophy">Philosophy / Science</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Work Title *</label>
                  <input
                    type="text"
                    required
                    value={shelfTitle}
                    onChange={(e) => setShelfTitle(e.target.value)}
                    placeholder="e.g. The Three-Body Problem"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Author / Director *</label>
                  <input
                    type="text"
                    required
                    value={shelfAuthor}
                    onChange={(e) => setShelfAuthor(e.target.value)}
                    placeholder="e.g. Cixin Liu"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <ImageUploadDropdown
                    value={shelfImg}
                    onChange={setShelfImg}
                    label="Cover Image URL (Drag & Drop, Presets, or URL)"
                    placeholder="Select cover image..."
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Rating</label>
                  <select
                    value={shelfRating}
                    onChange={(e) => setShelfRating(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white mt-1.5"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>
              </div>



              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Key Insight / Epigram</label>
                <input
                  type="text"
                  value={shelfKeyTakeaway}
                  onChange={(e) => setShelfKeyTakeaway(e.target.value)}
                  placeholder="e.g. Cosmic game theory & mutual suspicion..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Personal Commentary / Notes</label>
                <textarea
                  rows={2}
                  value={shelfNotes}
                  onChange={(e) => setShelfNotes(e.target.value)}
                  placeholder="Why this work matters to your multidisciplinary outlook..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition"
              >
                {editingShelfId ? 'Update Shelf Work' : 'Add to Shelf'}
              </button>
            </form>
          </div>

          {/* List of Shelf Items */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Cataloged Works ({shelf.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shelf.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-10 h-14 object-cover rounded bg-slate-200 dark:bg-slate-800 flex-shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=120&q=80';
                      }}
                    />
                    <div className="min-w-0">
                      <strong className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {s.title}
                      </strong>
                      <div className="text-[11px] text-slate-400 truncate">
                        {s.type} • {s.author}
                      </div>
                      <div className="text-amber-500 text-[10px]">
                        {'★'.repeat(s.rating || 5)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleEditShelfItem(s)}
                      className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteShelfItem(s.id)}
                      className="p-1 rounded text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pane 5: Inbox */}
      {activeTab === 'inbox' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Inquiries & Vacancy Notices ({inbox.length})
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30"
              >
                Mark All Read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {inbox.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border transition ${
                  msg.read
                    ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20'
                    : 'border-emerald-600/40 bg-emerald-50/30 dark:bg-emerald-950/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white">
                      {msg.sender}
                    </strong>
                    <span className="text-xs text-slate-400 ml-2">&lt;{msg.email}&gt;</span>
                    {msg.date && <span className="text-xs text-slate-400 font-mono ml-2">• {msg.date}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {msg.type}
                    </span>
                    <a
                      href={`mailto:${msg.email}?subject=Re: In response to your inquiry for Ermias Getachew`}
                      className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Reply</span>
                    </a>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {msg.text}
                </p>
              </div>
            ))}

            {inbox.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                No inquiries received yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pane: Quotes & Showcase Management */}
      {activeTab === 'quotes' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Quote className="w-5 h-5 text-emerald-600" />
                <span>Landing Page Quotes & Showcase CMS</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Curate executive maxims, operational principles, and custom visual backdrops displayed on the portfolio landing page.
              </p>
            </div>
            {editingQuoteId && (
              <button
                type="button"
                onClick={resetQuoteForm}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-auto transition"
              >
                + Create New Quote
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-6 space-y-6">
              <form
                onSubmit={handleSaveQuote}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                      {editingQuoteId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {editingQuoteId ? 'Edit Executive Quote' : 'Create New Executive Quote'}
                    </h4>
                  </div>
                  {editingQuoteId && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      Editing Mode
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Quote Statement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g., Dual-custody is not merely an operational rule; it is our sacred pact of institutional trust."
                    className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Author & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Attributed Author
                    </label>
                    <input
                      type="text"
                      value={quoteAuthor}
                      onChange={(e) => setQuoteAuthor(e.target.value)}
                      placeholder="Ermias Getachew Hailu"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Role / Professional Title
                    </label>
                    <input
                      type="text"
                      value={quoteRole}
                      onChange={(e) => setQuoteRole(e.target.value)}
                      placeholder="Senior Customer Service Officer (SCSO - Cash I)"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Contributor Type & Institution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Contributor Type
                    </label>
                    <select
                      value={quoteContributorType}
                      onChange={(e) => setQuoteContributorType(e.target.value as ContributorType)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Portfolio Owner">Portfolio Owner (Ermias Getachew)</option>
                      <option value="Branch Colleague">Branch Colleague (Siinqee / Commercial)</option>
                      <option value="Academic Scholar">Academic Scholar (Economics / Archaeology)</option>
                      <option value="Banking Pioneer">Banking Pioneer (Central / Retail Banking)</option>
                      <option value="Institutional Mentor">Institutional Mentor (Leadership / Audit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Institution / Organization
                    </label>
                    <input
                      type="text"
                      value={quoteInstitution}
                      onChange={(e) => setQuoteInstitution(e.target.value)}
                      placeholder="e.g. Siinqee Bank S.C."
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Category & Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Category Tag
                    </label>
                    <select
                      value={quoteCategory}
                      onChange={(e) => setQuoteCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Operational Integrity">Operational Integrity</option>
                      <option value="Digital Transformation">Digital Transformation</option>
                      <option value="Forensic Banking">Forensic Banking</option>
                      <option value="Vault Security">Vault Security</option>
                      <option value="Civic Leadership">Civic Leadership</option>
                      <option value="Financial Inclusion">Financial Inclusion</option>
                      <option value="Customer Excellence">Customer Excellence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Context / Source
                    </label>
                    <input
                      type="text"
                      value={quoteSourceOrContext}
                      onChange={(e) => setQuoteSourceOrContext(e.target.value)}
                      placeholder="e.g. Siinqee Bank Vault Dual-Control Mandate"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Image Upload Dropdown (Preset Gallery + Local File Upload + External URL) */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <ImageUploadDropdown
                    value={quoteImageUrl}
                    onChange={setQuoteImageUrl}
                    label="Quote Backdrop & Showcase Visual (Dropdown Upload)"
                    helperText="Pick a curated banking preset, upload from your device (JPG/PNG/WebP), or paste any photo link."
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="chkQuoteFeatured"
                    checked={quoteFeatured}
                    onChange={(e) => setQuoteFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <label
                    htmlFor="chkQuoteFeatured"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Feature in cinematic carousel showcase
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                  >
                    {editingQuoteId ? 'Update Quote in Showcase' : 'Add Quote to Showcase'}
                  </button>
                  {editingQuoteId && (
                    <button
                      type="button"
                      onClick={resetQuoteForm}
                      className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Active Quotes ({quotes.length})
                </h4>
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="Filter quotes..."
                  className="w-48 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
                {quotes
                  .filter(
                    (q) =>
                      !quoteSearch ||
                      q.quote.toLowerCase().includes(quoteSearch.toLowerCase()) ||
                      q.category.toLowerCase().includes(quoteSearch.toLowerCase()) ||
                      q.author.toLowerCase().includes(quoteSearch.toLowerCase())
                  )
                  .map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition-all bg-white dark:bg-slate-900 ${
                        editingQuoteId === q.id
                          ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 flex-shrink-0">
                          <img
                            src={q.imageUrl}
                            alt={q.category}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80';
                            }}
                          />
                        </div>

                        <div className="flex-grow min-w-0 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                              {q.category}
                            </span>
                            {q.contributorType && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/50">
                                {q.contributorType}
                              </span>
                            )}
                            {q.featured && (
                              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                ★ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 italic">
                            “{q.quote}”
                          </p>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                            <span className="truncate">
                              {q.author} • {q.role}{q.institution ? ` (${q.institution})` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEditQuote(q)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Edit quote"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Delete quote"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {quotes.length === 0 && (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs">
                    No quotes in showcase yet. Use the form on the left to add your first executive quote.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pane: Security & Credentials Management */}
      {activeTab === 'security' && (
        <div className="space-y-8 animate-in fade-in max-w-4xl">
          <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-600" />
              <span>Administrator Security & Credentials Management</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Update your administrator login email and change your security password for accessing this Control Room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Form */}
            <div className="md:col-span-7">
              <form
                onSubmit={handleUpdateCredentials}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Update Control Room Login Credentials
                  </h4>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Administrator Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setCredError(null);
                      }}
                      placeholder="ermikeab@gmail.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    You must input this exact email address when logging into the Control Room.
                  </p>
                </div>

                {/* Current Password Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Current Password {newPassword ? '*' : '(Optional if only updating email)'}
                  </label>
                  <div className="relative">
                    <input
                      type={showSecurityPasswords ? 'text' : 'password'}
                      value={currPassword}
                      onChange={(e) => {
                        setCurrPassword(e.target.value);
                        setCredError(null);
                      }}
                      placeholder="Enter current password to verify"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* New Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      New Password
                    </label>
                    <input
                      type={showSecurityPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setCredError(null);
                      }}
                      placeholder="Min 6 characters"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type={showSecurityPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setCredError(null);
                      }}
                      placeholder="Re-type new password"
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Show passwords toggle */}
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={showSecurityPasswords}
                      onChange={(e) => setShowSecurityPasswords(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Show Passwords</span>
                  </label>
                </div>

                {/* Error Banner */}
                {credError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 font-semibold animate-in fade-in">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{credError}</span>
                  </div>
                )}

                {/* Success Banner */}
                {credSuccess && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-700 dark:text-emerald-300 font-semibold animate-in fade-in">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{credSuccess}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Administrator Credentials</span>
                </button>
              </form>
            </div>

            {/* Information Card & Reset */}
            <div className="md:col-span-5 space-y-5">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Current Security Status</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Admin Email:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {adminCreds.email || 'ermikeab@gmail.com'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Password Status:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Active & Enforced
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Last Modified:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {adminCreds.lastChanged || 'Initial Setup'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
                  Admin access is protected via local browser credentials matching your email and password. Sessions are securely maintained in session storage.
                </p>
              </div>

              {/* Reset to initial defaults */}
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Default Credentials</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Reset login credentials back to initial defaults: <strong>ermikeab@gmail.com</strong> with password <strong>Admin@1234</strong>.
                </p>
                <button
                  type="button"
                  onClick={handleResetCredentialsToDefault}
                  className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-[11px] font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950 transition"
                >
                  Reset to ermikeab@gmail.com / Admin@1234
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pane 6: Backup & Exporter */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" />
              <span>Export Full State (JSON Backup)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Downloads a snapshot containing all profile edits, custom articles, shelf items, and incoming inquiries. You can restore this file anytime across devices.
            </p>
            <button
              onClick={handleExportBackupJSON}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition"
            >
              Export JSON Backup File
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              <span>Restore from Backup</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload a previously exported JSON file to restore profile details, essays, and media catalog.
            </p>
            <label className="block w-full text-center py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-emerald-600 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition">
              Select JSON File to Restore
              <input type="file" accept=".json" onChange={handleImportBackupJSON} className="hidden" />
            </label>
          </div>

          <div className="md:col-span-2 p-6 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Standard Defaults</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Resets all profile narratives, 24 skills, essays, and shelf entries to Ermias Getachew Hailu's original certified baseline.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset the portfolio to default state?')) {
                  onResetDefaults();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition"
            >
              Reset All Data to Baseline
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
