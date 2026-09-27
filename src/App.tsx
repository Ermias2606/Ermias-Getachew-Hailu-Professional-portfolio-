/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { HeadlineStats } from './components/HeadlineStats';
import { StrategicPillars } from './components/StrategicPillars';
import { SkillsMatrix } from './components/SkillsMatrix';
import { VaultCalculator } from './components/VaultCalculator';
import { ArticlesSection } from './components/ArticlesSection';
import { ArticleModal } from './components/ArticleModal';
import { SkillDetailModal } from './components/SkillDetailModal';
import { MediaShelf } from './components/MediaShelf';
import { CoverAndResume } from './components/CoverAndResume';
import { ContactSection } from './components/ContactSection';
import { CredentialsVault } from './components/CredentialsVault';
import { DocumentModal } from './components/DocumentModal';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { ProfileImageDropdown } from './components/ProfileImageDropdown';
import { ControlRoom } from './components/ControlRoom';
import { AdminAuthModal } from './components/AdminAuthModal';
import { QuotesShowcase } from './components/QuotesShowcase';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WelcomeLanding } from './components/WelcomeLanding';

import {
  initialProfile,
  initialSkills,
  initialArticles,
  initialShelf,
  initialInbox,
  initialDocuments,
  initialQuotes,
  initialAtsConfig,
} from './data/initialData';

import {
  Profile,
  Article,
  ShelfItem,
  InboxMessage,
  Skill,
  BankingDocument,
  PageRoute,
  ExecutiveQuote,
  AtsConfig,
} from './types';

import {
  Calculator,
  GraduationCap,
  BookOpen,
  FileText,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Quote,
} from 'lucide-react';

const VALID_PAGES: PageRoute[] = [
  'overview',
  'operations',
  'credentials',
  'creeds',
  'essays',
  'studio',
  'contact',
];

export default function App() {
  // Persistence state
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem('egh_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('egh_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [shelf, setShelf] = useState<ShelfItem[]>(() => {
    const saved = localStorage.getItem('egh_shelf');
    return saved ? JSON.parse(saved) : initialShelf;
  });

  const [inbox, setInbox] = useState<InboxMessage[]>(() => {
    const saved = localStorage.getItem('egh_inbox');
    return saved ? JSON.parse(saved) : initialInbox;
  });

  const [documents, setDocuments] = useState<BankingDocument[]>(() => {
    const saved = localStorage.getItem('egh_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [quotes, setQuotes] = useState<ExecutiveQuote[]>(() => {
    const saved = localStorage.getItem('egh_quotes');
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  const [atsConfig, setAtsConfig] = useState<AtsConfig>(() => {
    const saved = localStorage.getItem('egh_ats_config');
    return saved ? JSON.parse(saved) : initialAtsConfig;
  });

  const handleSaveAtsConfig = (newConfig: AtsConfig) => {
    setAtsConfig(newConfig);
    localStorage.setItem('egh_ats_config', JSON.stringify(newConfig));
  };

  // Dark Mode Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('egh_theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('egh_theme', 'dark');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#0b1219');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('egh_theme', 'light');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#0d7668');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      showToast(next ? 'Dark mode enabled' : 'Light mode enabled');
      return next;
    });
  };

  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    return VALID_PAGES.includes(hash) ? hash : 'overview';
  });

  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals state
  const [profilePhotoDropdownOpen, setProfilePhotoDropdownOpen] = useState(false);
  const [docUploadModalOpen, setDocUploadModalOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<BankingDocument | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Synchronize hash with page state for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const auth = sessionStorage.getItem('egh_admin_auth') === 'true';
    setIsAdminAuthenticated(auth);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleSaveProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem('egh_profile', JSON.stringify(newProfile));
  };

  const handleUpdatePortrait = (newUrl: string) => {
    const updated = { ...profile, portraitUrl: newUrl };
    handleSaveProfile(updated);
    showToast('Profile photo updated successfully!');
  };

  const handleSaveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('egh_articles', JSON.stringify(newArticles));
  };

  const handleSaveShelf = (newShelf: ShelfItem[]) => {
    setShelf(newShelf);
    localStorage.setItem('egh_shelf', JSON.stringify(newShelf));
  };

  const handleSaveInbox = (newInbox: InboxMessage[]) => {
    setInbox(newInbox);
    localStorage.setItem('egh_inbox', JSON.stringify(newInbox));
  };

  const handleSaveDocuments = (newDocs: BankingDocument[]) => {
    setDocuments(newDocs);
    localStorage.setItem('egh_documents', JSON.stringify(newDocs));
  };

  const handleUploadDocument = (newDoc: BankingDocument) => {
    const updated = [newDoc, ...documents];
    handleSaveDocuments(updated);
    showToast(`Deposited "${newDoc.title}" to credentials vault!`);
  };

  const handleDeleteDocument = (docId: string) => {
    const updated = documents.filter((d) => d.id !== docId);
    handleSaveDocuments(updated);
    showToast('Document removed from vault.');
  };

  const handleSaveQuotes = (newQuotes: ExecutiveQuote[]) => {
    setQuotes(newQuotes);
    localStorage.setItem('egh_quotes', JSON.stringify(newQuotes));
  };

  const handleNewInquiry = (inquiry: Omit<InboxMessage, 'id' | 'read' | 'date'>) => {
    const newMsg: InboxMessage = {
      ...inquiry,
      id: Date.now(),
      read: false,
      date: new Date().toISOString().slice(0, 10),
    };
    const updated = [newMsg, ...inbox];
    handleSaveInbox(updated);
    showToast('Inquiry received and logged to portfolio inbox!');
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('egh_profile');
    localStorage.removeItem('egh_articles');
    localStorage.removeItem('egh_shelf');
    localStorage.removeItem('egh_inbox');
    localStorage.removeItem('egh_documents');
    localStorage.removeItem('egh_quotes');
    setProfile(initialProfile);
    setArticles(initialArticles);
    setShelf(initialShelf);
    setInbox(initialInbox);
    setDocuments(initialDocuments);
    setQuotes(initialQuotes);
    showToast('Reset to original certified profile, quotes, and documents.');
  };

  const handleOpenAdminAuth = () => {
    if (sessionStorage.getItem('egh_admin_auth') === 'true') {
      setCurrentView('admin');
      showToast('Welcome back to the Control Room.');
    } else {
      setAdminAuthModalOpen(true);
    }
  };

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
    setCurrentView('admin');
    showToast('Authenticated into Control Room.');
  };

  const handleAdminSignOut = () => {
    sessionStorage.removeItem('egh_admin_auth');
    setIsAdminAuthenticated(false);
    setCurrentView('public');
    showToast('Signed out of Control Room.');
  };

  const navigateToPage = (page: PageRoute) => {
    if (currentView === 'admin') {
      setCurrentView('public');
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadCount = inbox.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f5] text-slate-900 dark:bg-[#0b1219] dark:text-slate-100 antialiased transition-colors duration-200">
      {/* Immersive Welcome Landing & Splash Screen */}
      {showWelcome && (
        <WelcomeLanding
          portraitUrl={profile.portraitUrl}
          quotes={quotes}
          onEnter={(targetPage) => {
            setShowWelcome(false);
            if (targetPage) navigateToPage(targetPage);
          }}
        />
      )}

      {/* Top Sticky Multi-Page Navigation */}
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminAuth={handleOpenAdminAuth}
        onAdminSignOut={handleAdminSignOut}
        unreadCount={unreadCount}
        profilePortraitUrl={profile.portraitUrl}
        onOpenPhotoUpload={() => setProfilePhotoDropdownOpen(true)}
        onToast={showToast}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onShowWelcome={() => setShowWelcome(true)}
      />

      {/* Main View Area with Smooth Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          {currentView === 'public' ? (
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
            >
            
            {/* Page Breadcrumb / Page Status Pill for Secondary Pages */}
            {currentPage !== 'overview' && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-3 mb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                <button
                  onClick={() => navigateToPage('overview')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold"
                >
                  Executive Dossier
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="capitalize font-bold text-slate-900 dark:text-white">
                  {currentPage === 'operations' && 'Banking Operations & Dual-Custody Vault'}
                  {currentPage === 'credentials' && 'Credentials, Degrees & Letters Vault'}
                  {currentPage === 'creeds' && 'Leadership Creeds & Perspectives'}
                  {currentPage === 'essays' && 'Analytical Essays & Cultural Media Shelf'}
                  {currentPage === 'studio' && 'ATS Application Studio & Tailored Résumé'}
                  {currentPage === 'contact' && 'Direct Channels & Institutional Inquiries'}
                </span>
              </div>
            )}

            {/* ================= PAGE 1: OVERVIEW ================= */}
            {currentPage === 'overview' && (
              <div className="space-y-12">
                {/* Hero Section with Photo Upload Trigger */}
                <HeroSection
                  profile={profile}
                  onNavigateSection={(section) => {
                    if (section === 'vaultSection') navigateToPage('operations');
                    else if (section === 'contactSection') navigateToPage('contact');
                    else if (section === 'skillsSection') navigateToPage('operations');
                    else if (section === 'articlesSection') navigateToPage('essays');
                    else navigateToPage('overview');
                  }}
                  onOpenStudio={() => navigateToPage('studio')}
                  onOpenPhotoUpload={() => setProfilePhotoDropdownOpen(true)}
                />

                {/* 4 Headline Stats */}
                <HeadlineStats stats={profile.stats} />

                {/* Strategic Advantage: Three Pillars */}
                <StrategicPillars pillars={profile.pillars} />

                {/* Executive Quotes & Philosophy Landing Showcase */}
                <QuotesShowcase
                  quotes={quotes}
                  onToast={showToast}
                  onOpenAdmin={handleOpenAdminAuth}
                />

                {/* Multi-Page Directory / Bento Navigation Hub */}
                <section className="pt-4 pb-12">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Multi-Section Navigation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                      Explore Portfolio Capabilities
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                      Select a specialized division below to inspect operations tools, verified credentials, or analytical essays.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Card 1: Banking Operations */}
                    <div
                      onClick={() => navigateToPage('operations')}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-600/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Calculator className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          Banking Operations & Vault
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Dual-custody cash control, physical-to-GL vault calculation, and 24-point banking competencies matrix.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Launch Operations Hub</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 2: Credentials & Letters */}
                    <div
                      onClick={() => navigateToPage('credentials')}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-600/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            Credentials & Letters
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                            {documents.length} Records
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Degrees from Oromia State & Aksum University, Siinqee Bank appointment letters, and audit certificates.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Open Document Vault</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 3: Cover & Resume */}
                    <div
                      onClick={() => navigateToPage('studio')}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-600/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          Cover & Resume
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Calibrated executive cover letter and ATS resume for {atsConfig.targetCompany || 'Tier-1 Banks'} with {atsConfig.matchScore || 96}% keyword compatibility and export permissions.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Review Cover & Resume</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 4: Essays & Media Shelf */}
                    <div
                      onClick={() => navigateToPage('essays')}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-600/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          Essays & Cultural Shelf
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Analytical essays on Ethiopian banking, foreign currency liberalization, and curated economic literature.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Read Essays & Library</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 5: Direct Contact */}
                    <div
                      onClick={() => navigateToPage('contact')}
                      className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-600/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          Contact & Inquiries
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Reach Ermias directly via phone, email, WhatsApp, or dispatch an institutional collaboration inquiry.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Dispatch Message</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 6: Leadership Creeds & Perspectives */}
                    <div
                      onClick={() => {
                        const quotesEl = document.getElementById('quotesShowcaseSection');
                        if (quotesEl) quotesEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group p-6 rounded-3xl bg-emerald-900/10 dark:bg-emerald-950/30 border border-emerald-600/20 hover:border-emerald-600/50 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Quote className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          Leadership Creeds
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Operational maxims and banking philosophy authored by Ermias, branch colleagues, and academic contributors.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-emerald-600/20 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Explore Creeds & Showcase</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ================= PAGE 2: OPERATIONS & VAULT ================= */}
            {currentPage === 'operations' && (
              <div className="space-y-12">
                {/* 24-Point Banking Skills Matrix */}
                <SkillsMatrix
                  skills={initialSkills}
                  onSelectSkill={(skill) => setActiveSkill(skill)}
                />

                {/* Interactive Vault & Till Cash Calculator */}
                <VaultCalculator />
              </div>
            )}

            {/* ================= PAGE 3: CREDENTIALS, DEGREES & LETTERS ================= */}
            {currentPage === 'credentials' && (
              <div className="space-y-12">
                <CredentialsVault
                  documents={documents}
                  onSelectDocument={(doc) => setActiveDocument(doc)}
                  onDeleteDocument={handleDeleteDocument}
                  isAdmin={isAdminAuthenticated}
                />
              </div>
            )}

            {/* ================= PAGE: LEADERSHIP CREEDS & PERSPECTIVES ================= */}
            {currentPage === 'creeds' && (
              <div className="space-y-12">
                <QuotesShowcase
                  quotes={quotes}
                  onToast={showToast}
                  onOpenAdmin={handleOpenAdminAuth}
                />
              </div>
            )}

            {/* ================= PAGE 4: ESSAYS & SHELF ================= */}
            {currentPage === 'essays' && (
              <div className="space-y-12">
                {/* Published Articles & Essays */}
                <ArticlesSection
                  articles={articles}
                  onOpenArticle={(art) => setActiveArticle(art)}
                />

                {/* The Shelf (Curated Reading & Cinema) */}
                <MediaShelf items={shelf} />
              </div>
            )}

            {/* ================= PAGE 5: COVER & RESUME ================= */}
            {currentPage === 'studio' && (
              <div className="space-y-12">
                <CoverAndResume
                  profile={profile}
                  atsConfig={atsConfig}
                  isAdmin={isAdminAuthenticated}
                  onOpenAdmin={() => {
                    if (isAdminAuthenticated) {
                      setCurrentView('admin');
                    } else {
                      handleOpenAdminAuth();
                    }
                  }}
                  onToast={showToast}
                />
              </div>
            )}

            {/* ================= PAGE 6: CONTACT ================= */}
            {currentPage === 'contact' && (
              <div className="space-y-12">
                <ContactSection profile={profile} onNewMessage={handleNewInquiry} />
              </div>
            )}

            </motion.div>
          ) : (
            <motion.div
              key="admin-control-room"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Control Room CMS View */}
              <ControlRoom
                profile={profile}
                articles={articles}
                shelf={shelf}
                inbox={inbox}
                quotes={quotes}
                documents={documents}
                atsConfig={atsConfig}
                onSaveProfile={handleSaveProfile}
                onSaveArticles={handleSaveArticles}
                onSaveShelf={handleSaveShelf}
                onSaveInbox={handleSaveInbox}
                onSaveQuotes={handleSaveQuotes}
                onSaveDocuments={handleSaveDocuments}
                onUploadDocument={handleUploadDocument}
                onDeleteDocument={handleDeleteDocument}
                onSaveAtsConfig={handleSaveAtsConfig}
                onResetDefaults={handleResetDefaults}
                onExit={() => setCurrentView('public')}
                onToast={showToast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer with Page Links */}
      <Footer
        profile={profile}
        onOpenAdminAuth={handleOpenAdminAuth}
        onOpenStudio={() => navigateToPage('studio')}
        onNavigatePage={navigateToPage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Profile Photo Upload Dropdown / Modal */}
      <ProfileImageDropdown
        isOpen={profilePhotoDropdownOpen}
        onClose={() => setProfilePhotoDropdownOpen(false)}
        currentImageUrl={profile.portraitUrl}
        onUpdateImage={handleUpdatePortrait}
      />

      {/* Document Detail Viewer Modal */}
      <DocumentModal
        document={activeDocument}
        onClose={() => setActiveDocument(null)}
      />

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={docUploadModalOpen}
        onClose={() => setDocUploadModalOpen(false)}
        onUploadDocument={handleUploadDocument}
      />

      {/* Article Detail Modal */}
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />

      {/* Skill Detail Modal */}
      <SkillDetailModal skill={activeSkill} onClose={() => setActiveSkill(null)} />

      {/* Admin PIN Gate Modal */}
      <AdminAuthModal
        isOpen={adminAuthModalOpen}
        onClose={() => setAdminAuthModalOpen(false)}
        onAuthenticate={handleAdminAuthenticated}
      />

      {/* Offline PWA Connectivity Indicator */}
      <OfflineIndicator />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="global-toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-2xl border border-emerald-500/50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
