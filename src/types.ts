export interface Pillar {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface Stat {
  id: string;
  title: string;
  value?: string;
  desc: string;
  highlight?: string;
}

export interface Skill {
  id: string;
  domain: 'cash-vault' | 'core-banking' | 'compliance-aml' | 'accounting-settlement' | 'risk-management';
  name: string;
  description: string;
  pct: number;
  gradeRef?: string;
  impactNote?: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  language?: 'am' | 'en' | 'multilingual';
  publishedDate?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface ShelfItem {
  id: number;
  title: string;
  type: 'book' | 'movie' | 'philosophy';
  author: string;
  rating: number;
  img: string;
  notes: string;
  year?: string;
  keyTakeaway?: string;
}

export interface InboxMessage {
  id: number;
  sender: string;
  email: string;
  type: string;
  text: string;
  read: boolean;
  date?: string;
}

export interface Profile {
  name: string;
  title: string;
  statusBadge: string;
  location: string;
  email: string;
  phone: string;
  portraitUrl: string;
  bio: string;
  bankName: string;
  branch: string;
  grade: string;
  experienceYears: string;
  pillars: Pillar[];
  stats: Stat[];
}

export type DocTheme = 'theme-emerald' | 'theme-navy' | 'theme-burgundy' | 'theme-charcoal' | 'theme-gold';

export interface AtsMatchAnalysis {
  matchScore: number;
  matchedKeywords: string[];
  recommendedKeywords: string[];
  tailoredSummary: string;
  tailoredHighlights: string[];
  tailoredCoverLetter: string;
}

export interface CashDenom {
  denom: number;
  label: string;
  count: number;
}

export type DocumentCategory = 'degree' | 'certificate' | 'letter' | 'audit';

export interface BankingDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'doc';
  description: string;
  verified: boolean;
  scoreOrGrade?: string;
  tags?: string[];
}

export type PageRoute = 'overview' | 'operations' | 'credentials' | 'creeds' | 'essays' | 'studio' | 'contact' | 'pwa';

export type ContributorType =
  | 'Portfolio Owner'
  | 'Branch Colleague'
  | 'Institutional Mentor'
  | 'Banking Pioneer'
  | 'Academic Scholar';

export interface ExecutiveQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
  category: string;
  imageUrl: string;
  sourceOrContext?: string;
  featured?: boolean;
  institution?: string;
  contributorType?: ContributorType;
  authorAvatar?: string;
}

export interface AtsConfig {
  targetCompany: string;
  targetRole: string;
  vacancyText: string;
  docTheme: DocTheme;
  allowPublicDownload: boolean;
  customCoverLetter?: string;
  customResumeSummary?: string;
  matchedKeywords?: string[];
  matchScore?: number;
  lastUpdated?: string;
}

export interface AdminCredentials {
  email: string;
  passwordHash?: string;
  password?: string;
  lastChanged?: string;
}
