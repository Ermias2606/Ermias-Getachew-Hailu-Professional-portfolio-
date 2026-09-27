import { Profile, Skill, Article, ShelfItem, InboxMessage, BankingDocument, ExecutiveQuote, AdminCredentials, AtsConfig } from '../types';

export const initialProfile: Profile = {
  name: "Ermias Getachew Hailu",
  title: "Senior Banking Professional | Strategic Management Specialist | Digital Transformation Advocate",
  statusBadge: "Senior Customer Service Officer (SCSO - Cash I) • Siinqee Bank S.C.",
  location: "East Bale, Ethiopia",
  email: "ermikeab@gmail.com",
  phone: "+251 925 559 668",
  bankName: "Siinqee Bank S.C.",
  branch: "East Bale District Branch",
  grade: "Job Grade IX",
  experienceYears: "3+ Years Operations",
  portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  bio: `I am a performance-driven Senior Customer Service Officer (Job Grade IX) at Siinqee Bank, specializing in operational excellence, dual-custody cash control, and digital-first banking solutions. My professional identity is anchored in a unique "Dual-Degree Advantage": the strategic leadership of a Management expert (Oromia State University, GPA 3.6/4.0) combined with the meticulous analytical precision of an Archaeology & Heritage Research specialist (Aksum University, GPA 3.42/4.0). By merging core banking protocols with modern certifications in Artificial Intelligence, Business Analysis, and Risk Management, I bridge the gap between traditional integrity and future-ready innovation. I am dedicated to driving financial inclusion and ensuring branch operations remain 100% audit-ready through uncompromising accountability and multilingual leadership.`,
  pillars: [
    {
      id: "pillar-1",
      icon: "ShieldCheck",
      title: "The Management Pillar",
      desc: "Degree from Oromia State University (GPA: 3.6/4.0) providing the theoretical and practical framework for organizational leadership, institutional finance, liquidity balancing, and proactive risk-mitigation strategies.",
      tag: "Strategic Leadership"
    },
    {
      id: "pillar-2",
      icon: "Cpu",
      title: "The Digital Pillar",
      desc: "Certifications in Artificial Intelligence, Business Analysis, and E-Commerce. Functioning as a Digital Liaison who translates core banking shifts and emerging fintech into streamlined workflows and client financial literacy.",
      tag: "Fintech & Automation"
    },
    {
      id: "pillar-3",
      icon: "Landmark",
      title: "The Heritage Pillar",
      desc: "Degree from Aksum University (GPA: 3.42/4.0) instilling forensic data integrity, meticulous documentary evidence preservation, and an audit-trail mindset where zero discrepancy is the only acceptable baseline.",
      tag: "Forensic Integrity"
    }
  ],
  stats: [
    {
      id: "stat-1",
      title: "Professional Growth Velocity",
      value: "3+ Years",
      highlight: "Trainee to SCSO Cash I",
      desc: "Rapid promotion velocity from Graduate Trainee through CSOC to Senior Customer Service Officer (Job Grade IX) within Siinqee Bank S.C."
    },
    {
      id: "stat-2",
      title: "Operational Precision",
      value: "100%",
      highlight: "Zero Discrepancy",
      desc: "Documented 100% reconciliation accuracy across daily branch balancing, vault dual-custody audits, and end-of-day settlement logs."
    },
    {
      id: "stat-3",
      title: "Multidisciplinary Synergies",
      value: "Dual Degree",
      highlight: "Management + Heritage",
      desc: "Two Bachelor of Arts degrees (Oromia State University GPA 3.6 & Aksum University GPA 3.42) marrying analytical rigor with administrative command."
    },
    {
      id: "stat-4",
      title: "Digital Transformation Literacy",
      value: "AI & Risk",
      highlight: "Emerging Tech Certified",
      desc: "Specialized credentials in AI implementations, operational risk mitigation, AML surveillance, and core banking system optimizations."
    }
  ]
};

export const initialSkills: Skill[] = [
  {
    id: "sk-1",
    domain: "cash-vault",
    name: "Vault Security Standards",
    description: "Strict adherence to physical and digital security protocols, time-lock combination management, and dual-custody alarm verification.",
    pct: 94,
    gradeRef: "SCSO Cash I",
    impactNote: "Guarded daily multi-million ETB physical vault reserves with zero security breaches."
  },
  {
    id: "sk-2",
    domain: "cash-vault",
    name: "Dual Control Procedures",
    description: "Multi-party authorization protocols requiring two validated officers for key custody, vault ingress, and high-value cash transfers.",
    pct: 98,
    gradeRef: "SCSO Cash I",
    impactNote: "Enforced dual-signoff across every cash transfer between tellers and main vault."
  },
  {
    id: "sk-3",
    domain: "cash-vault",
    name: "Currency Authentication & Counterfeit Detection",
    description: "Expert ultraviolet, magnetic, and tactile verification for Ethiopian Birr (ETB) and foreign currencies to neutralize forged bills.",
    pct: 96,
    gradeRef: "SCSO Cash I",
    impactNote: "Detected and documented counterfeit notes before ledger acceptance, preserving branch liquidity."
  },
  {
    id: "sk-4",
    domain: "cash-vault",
    name: "Cash Forecasting & Liquidity Management",
    description: "Predictive transaction analysis maintaining optimal cash float, preventing idle cash drag while ensuring 100% ATM and counter liquidity.",
    pct: 95,
    gradeRef: "Grade IX",
    impactNote: "Prevented cash dryouts during seasonal peak harvest deposit runs."
  },
  {
    id: "sk-5",
    domain: "core-banking",
    name: "Core Banking Interface & System Workflows",
    description: "High-speed navigation of core banking modules for instant deposits, withdrawals, swift remittances, and loan service disbursements.",
    pct: 97,
    gradeRef: "Core Tech",
    impactNote: "Averaged under 90 seconds per complex multi-account transaction with error-free posting."
  },
  {
    id: "sk-6",
    domain: "core-banking",
    name: "System Troubleshooting & Latency Mitigation",
    description: "Rapid isolation and reporting of network timeout glitches, printer spooler locks, and terminal synchronization delays.",
    pct: 92,
    gradeRef: "Digital Liaison",
    impactNote: "Minimized counter queue bottlenecks by establishing quick-fallback protocol."
  },
  {
    id: "sk-7",
    domain: "core-banking",
    name: "Customer KYC & Mandate File Integrity",
    description: "Rigorous maintenance of customer account mandates, specimen signature cards, biometric enrollments, and TIN profiles.",
    pct: 98,
    gradeRef: "Compliance",
    impactNote: "100% mandate validation rate across commercial, NGO, and corporate accounts."
  },
  {
    id: "sk-8",
    domain: "core-banking",
    name: "Reporting Modules & Operational Analytics",
    description: "Extracting and verifying daily journal logs, teller activity summaries, and supervisory override reports for district audit.",
    pct: 93,
    gradeRef: "Operations",
    impactNote: "Delivered comprehensive daily reconciliation dossiers for branch management sign-off."
  },
  {
    id: "sk-9",
    domain: "compliance-aml",
    name: "Regulatory CTR & SAR Filing Protocols",
    description: "Prompt preparation and compliance flagging of Currency Transaction Reports and Suspicious Activity Reports per NBE directives.",
    pct: 88,
    gradeRef: "NBE Compliance",
    impactNote: "Zero audit citations on regulatory reporting timelines."
  },
  {
    id: "sk-10",
    domain: "compliance-aml",
    name: "Sanctions & PEP Watchlist Screening",
    description: "Screening entity directors, ultimate beneficial owners, and high-net-worth remitters against National Bank of Ethiopia and global watchlists.",
    pct: 91,
    gradeRef: "AML/CFT",
    impactNote: "Implemented stringent source-of-wealth queries for unusual remittance flows."
  },
  {
    id: "sk-11",
    domain: "compliance-aml",
    name: "Customer Identification Program (CIP)",
    description: "Multi-layered ID authentication using Ethiopian Kebele IDs, Passports, and Business Registration licenses.",
    pct: 97,
    gradeRef: "KYC/CIP",
    impactNote: "Prevented identity fraud and synthetic account creations."
  },
  {
    id: "sk-12",
    domain: "compliance-aml",
    name: "Data Privacy & Financial Confidentiality",
    description: "Unbending protection of customer financial data, account balances, and transactional history from unauthorized disclosures.",
    pct: 100,
    gradeRef: "Ethics Baseline",
    impactNote: "Flawless integrity record with zero customer data leaks or privacy complaints."
  },
  {
    id: "sk-13",
    domain: "accounting-settlement",
    name: "General Ledger (GL) Integrity & Account Mapping",
    description: "Validating that cash in hand, clearing accounts, and branch suspense sub-ledgers align precisely with the institution's balance sheet.",
    pct: 98,
    gradeRef: "Finance Ops",
    impactNote: "Ensured clean closing figures for both conventional and interest-free IHSAN windows."
  },
  {
    id: "sk-14",
    domain: "accounting-settlement",
    name: "End-of-Day Balancing & Cash Reconciliation",
    description: "Verifying physical physical cash denominations note-by-note against digital till registers before vault lockup.",
    pct: 99,
    gradeRef: "SCSO Cash I",
    impactNote: "Maintained unbroken zero-shortage / zero-overage record throughout 3 years."
  },
  {
    id: "sk-15",
    domain: "accounting-settlement",
    name: "Suspense Account Clearing & Traceability",
    description: "Proactive daily investigation and resolution of pending ATM clearing differences, inter-branch settlements, and reversal batches.",
    pct: 93,
    gradeRef: "Audit Standard",
    impactNote: "Resolved 99.4% of settlement exceptions within the same 24-hour clearing window."
  },
  {
    id: "sk-16",
    domain: "accounting-settlement",
    name: "Audit Readiness & Evidence Archival",
    description: "Systematic cataloging of adjustment vouchers, authorization memos, and vault register ledgers for internal and external auditors.",
    pct: 99,
    gradeRef: "Heritage Forensic",
    impactNote: "Branch achieved top audit rating with zero procedural discrepancies in cash operations."
  },
  {
    id: "sk-17",
    domain: "risk-management",
    name: "Operational Risk Mitigation & Threat Profiling",
    description: "Anticipating counter exposure bottlenecks, internal fraud patterns, and cash-in-transit vulnerabilities to enforce controls.",
    pct: 94,
    gradeRef: "Risk Shield",
    impactNote: "Proactively authored cash transit protocol recommendations adopted by district leadership."
  },
  {
    id: "sk-18",
    domain: "risk-management",
    name: "Fraud Awareness & Social Engineering Defense",
    description: "Defending against impersonation scams, forged endorsement instruments, and unauthorized telephonic mandate alterations.",
    pct: 100,
    gradeRef: "Defensive Banking",
    impactNote: "Intercepted fraudulent check attempts prior to cash clearance."
  },
  {
    id: "sk-19",
    domain: "risk-management",
    name: "Conflict De-escalation & Client Relations",
    description: "Calm, empathetic de-escalation of frustrated depositors during network latency, building customer loyalty and retention.",
    pct: 97,
    gradeRef: "Customer Service",
    impactNote: "Awarded branch commendation for superior client satisfaction and relationship recovery."
  },
  {
    id: "sk-20",
    domain: "risk-management",
    name: "Multilingual Communication & Local Fluency",
    description: "Fluent communication across Afaan Oromoo, Amharic, and English, demystifying digital banking for rural and commercial clients.",
    pct: 99,
    gradeRef: "Inclusion Driver",
    impactNote: "Spearheaded rural deposit mobilization by communicating directly in community vernaculars."
  },
  {
    id: "sk-21",
    domain: "risk-management",
    name: "Workflow Automation & Office Productivity",
    description: "Advanced Excel spreadsheet models for denomination reconciliation, automated tally sheets, and pivot report generation.",
    pct: 95,
    gradeRef: "Productivity",
    impactNote: "Cut daily reconciliation tally time by 35% through custom automated worksheet templates."
  },
  {
    id: "sk-22",
    domain: "risk-management",
    name: "Root Cause Analysis (RCA)",
    description: "Methodical investigation of operational anomalies using 5-Whys and Fishbone frameworks to eliminate systemic bottlenecks.",
    pct: 91,
    gradeRef: "Quality Assurance",
    impactNote: "Eliminated repetitive teller voucher mismatch through standardized pre-check checklist."
  },
  {
    id: "sk-23",
    domain: "compliance-aml",
    name: "IHSAN (Interest-Free Banking) Compliance",
    description: "Strict operational segregation of Sharia-compliant funds, Wadiah safekeeping deposits, and Murabaha trade financing instruments.",
    pct: 92,
    gradeRef: "Islamic Banking",
    impactNote: "Ensured 100% segregated ledger audit compliance for Siinqee IHSAN services."
  },
  {
    id: "sk-24",
    domain: "core-banking",
    name: "Deposit Mobilization & Relationship Banking",
    description: "Active engagement with local merchants, farmer cooperatives, and institutions to attract stable low-cost current and savings deposits.",
    pct: 96,
    gradeRef: "Growth Engine",
    impactNote: "Mobilized substantial new deposit liquidity through customized merchant account onboarding."
  }
];

export const initialArticles: Article[] = [
  {
    id: 1,
    title: "ቄሳዊ ካፒታሊዝም እና የሞራል ቀውስ፡ በትርፍ እና በሰብአዊ እሴቶች መካከል ያለው ፍጥጫ",
    category: "Economics & Ethics",
    readTime: "4 min read",
    language: "am",
    publishedDate: "2024-03",
    tags: ["Economics", "Ethics", "Financial Inclusion", "Corporate Capitalism"],
    summary: "የትርፍ ጥማት እና የገበያ የበላይነት በህብረተሰብ የሞራል ማዕቀፍ እና በሰብአዊ እሴቶች ላይ የሚያሳድረውን ጫና በጥልቀት የመረመረ ጽሑፍ።",
    content: `ቄሳዊ ካፒታሊዝም እና የሞራል ቀውስ፡ በትርፍ እና በሰብአዊ እሴቶች መካከል ያለው ፍጥጫ

በዘመናዊው ዓለም የገበያ-መር ኢኮኖሚ (Market-driven Economy) ለሳይንሳዊ ፈጠራ፣ ለቴክኖሎጂ እድገት እና ለምርታማነት መመንደግ የላቀ አስተዋጽዖ እንዳበረከተ አሌ አይባልም። ነገር ግን ካፒታሊዝም ወደ "ቄሳዊ ካፒታሊዝም" (Cæsaristic Corporate Capitalism) ሲቀየር—ማለትም የትርፍ ማሳደድ ግብ ብቻውን የሰውን ልጅ ክብር፣ ማህበራዊ ፍትህ እና ሰብአዊ እሴቶችን ሲያጨልም—ታላቅ የሞራል እና የማህበራዊ ቀውስ መከሰቱ አይቀሬ ነው።

፩. የትርፍ ጣኦት እና የሰው ልጅ መገልገያ መሆን
ቄሳዊ ካፒታሊዝም ሰውን ከግብ ማድረሻነት ወደ ተራ የገበያ መገልገያነት (Commodity) ይቀይረዋል። በባንክ እና በፋይናንስ ዘርፍ ውስጥ ስንመለከት፣ ደንበኞች እንደ ህያው ማህበራዊ አካል ሳይሆን እንደ ገቢ ማስገኛ ቁጥር ብቻ ሲቆጠሩ፣ የፋይናንስ ተቋማት ከማህበራዊ ሀላፊነታቸው ይርቃሉ።

፪. በኢትዮጵያ ነባራዊ ሁኔታ እና የፋይናንስ አካታችነት (Financial Inclusion)
እንደ ሀገራችን ባሉ በማደግ ላይ ባሉ ማህበረሰቦች ውስጥ፣ የባንክ አገልግሎት ተደራሽነት ከቀላል የንግድ ስራ ባለፈ የህዝብን ህይወት የሚቀይር የኢኮኖሚ መሰረት ነው። አነስተኛ አርሶ አደሮች፣ ነጋዴዎች እና ሴቶች ወደ ዘመናዊው የባንክ ስርአት እንዲገቡ ማስቻል የፍትሃዊነት ጉዳይ ነው። የባንክ ባለሙያዎች ግዴታም ደንበኛን በታማኝነት፣ በቅንነት እና በፍጹም የሞራል ሀላፊነት ማገልገል ነው።

፫. የባንክ ስነ-ምግባር እና ጽኑ ተጠያቂነት
ያለ ጠንካራ የሞራል ካስማ የሚካሄድ የፋይናንስ ስርአት እንደ 2008ቱ የአለም የገንዘብ ቀውስ የመሳሰሉ ታላላቅ ውድቀቶችን ያስከትላል። እያንዳንዱ የባንክ ባለሙያ የዕለት ተዕለት ሂሳቡን ሲያስተካክል፣ ካዝናውን ሲጠብቅ እና የደንበኛውን ሚስጥር ሲጠብቅ፣ ስራውን ከቀላል ደመወዝተኛነት በላይ አድርጎ ለህብረተሰቡ የተሰጠ አደራ መሆኑን ማመን አለበት።`
  },
  {
    id: 2,
    title: "Operational Rigor in Modern Banking: Balancing Vault Integrity and Digital Acceleration",
    category: "Banking Systems",
    readTime: "5 min read",
    language: "en",
    publishedDate: "2024-06",
    tags: ["Operations", "Liquidity", "Dual Control", "Risk"],
    summary: "An analysis of why traditional vault custodial controls remain the vital bedrock even as African banking undergoes rapid mobile-first digital transformation.",
    content: `Operational Rigor in Modern Banking: Balancing Vault Integrity and Digital Acceleration
By Ermias Getachew Hailu

The African banking landscape is experiencing an unprecedented epoch of digital transition. Core banking integrations, mobile wallets, and interoperable payment switches have dramatically lowered the threshold for financial inclusion. However, this velocity introduces an acute operational paradox: as financial touchpoints digitize, the physical liquidity nodes—the branch vaults, ATM cash cycles, and local teller points—remain the linchpins of public confidence.

1. The Sanctity of Dual Custody in an Algorithmic Age
Algorithms cannot verify the physical existence of currency notes, nor can automated routines substitute for the physical vigilance of dual custody. The principle that two credentialed officers must jointly witness, verify, and authenticate physical movements of value creates a psychological and institutional deterrent against internal threat vectors.

2. Zero-Discrepancy Reconciliation as a Cultural Standard
In branch operations, reconciling accounts is not merely an administrative chore performed at closing hours. It is the real-time affirmation of institutional solvency. Every single Birr accounted for represents the earned sweat of a farmer, a trader, or a parent saving for school fees. When a banking officer treats a 10-Birr mismatch with the same forensic seriousness as a 100,000-Birr discrepancy, the entire branch develops an immunity against systematic fraud.

3. The Synergies of Forensic Heritage and Management Science
In my dual background in Archaeological Heritage and Management, the parallel is evident: in archaeology, a single contaminated excavation layer destroys the validity of historical evidence. In banking, a single unverified adjustment voucher compromises the general ledger. Maintaining immutable audit trails is not an impediment to digital agility—it is the prerequisite foundation upon which enduring institutional trust is constructed.`
  },
  {
    id: 3,
    title: "The Strategic Advantage: Why Multidisciplinary Thinking Defines Future Financial Leaders",
    category: "Management & Strategy",
    readTime: "3 min read",
    language: "en",
    publishedDate: "2024-08",
    tags: ["Strategy", "Multidisciplinary", "Leadership", "AI"],
    summary: "How synthesizing strategic management, archaeological forensic discipline, and modern AI literacy creates resilient organizational value.",
    content: `The Strategic Advantage: Why Multidisciplinary Thinking Defines Future Financial Leaders
By Ermias Getachew Hailu

Specialization without cross-pollination breeds intellectual stagnation. In high-stakes environments like banking operations, the most resilient leaders are rarely those who have studied only one narrow syllabus. Rather, they are multidisciplinary thinkers who can evaluate a credit risk model with quantitative rigor, investigate a compliance gap with forensic scrutiny, and lead a diverse branch staff with empathetic cultural intelligence.

When strategic management models are informed by historical durability—the understanding of how institutions endure over decades rather than quarters—decisions naturally shift from transient shortcuts to sustainable integrity. As Artificial Intelligence automates routine ledger matching, the human banker's supreme competitive edge will be ethical discernment, strategic contextualization, and uncompromising moral courage.`
  }
];

export const initialShelf: ShelfItem[] = [
  {
    id: 1,
    title: "በዕምነት ስም",
    type: "book",
    author: "እምነቱ ገብረየስ",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    year: "Amharic Literature",
    keyTakeaway: "Moral conviction vs societal orthodoxy.",
    notes: "A deeply resonant Ethiopian psychological novel exploring personal integrity, individual truth, and the burden of conviction in the face of institutional conformity."
  },
  {
    id: 2,
    title: "The Three-Body Problem",
    type: "book",
    author: "Cixin Liu",
    rating: 5,
    img: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=400&q=80",
    year: "Sci-Fi Masterpiece",
    keyTakeaway: "Cosmic sociology & game theory under existential threat.",
    notes: "Hard science fiction examining existential threats, physics paradigms, and game theory when disparate civilizations encounter catastrophic asymmetry."
  },
  {
    id: 3,
    title: "Arrival",
    type: "movie",
    author: "Denis Villeneuve",
    rating: 5,
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
    year: "Film (2016)",
    keyTakeaway: "Non-zero-sum games and temporal linguistic perception.",
    notes: "A cinematic masterpiece on the Sapir-Whorf linguistic hypothesis, cross-cultural communication under tension, and embracing duty despite foreknowledge of hardship."
  },
  {
    id: 4,
    title: "The Last Days of Lehman Brothers",
    type: "movie",
    author: "BBC Film",
    rating: 4,
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&q=80",
    year: "Docudrama",
    keyTakeaway: "Liquidity contagion & systemic hubris.",
    notes: "A riveting forensic breakdown of balance sheet insolvency, interbank distrust, and the devastating speed with which liquidity evaporation collapses financial empires."
  },
  {
    id: 5,
    title: "The Dark Forest",
    type: "book",
    author: "Cixin Liu",
    rating: 5,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    year: "Philosophy & Sci-Fi",
    keyTakeaway: "Chains of suspicion and cosmic deterrent equilibria.",
    notes: "Profound mathematical sociology modeling interstellar survival, the axioms of mutual suspicion, and deterrence theory in zero-trust environments."
  },
  {
    id: 6,
    title: "Interstellar",
    type: "movie",
    author: "Christopher Nolan",
    rating: 5,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    year: "Film (2014)",
    keyTakeaway: "Gravitational anomalies and generational sacrifice.",
    notes: "General relativity, temporal dilation, and the triumph of persistent human ingenuity against planetary extinction."
  },
  {
    id: 7,
    title: "Sapiens: A Brief History of Humankind",
    type: "book",
    author: "Yuval Noah Harari",
    rating: 5,
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
    year: "Anthropology",
    keyTakeaway: "Shared fictional orders create global monetary trust.",
    notes: "Essential reading for bankers: money is the most universal system of mutual trust ever devised, built entirely upon shared cultural fictions and legal frameworks."
  },
  {
    id: 8,
    title: "Inside Job",
    type: "movie",
    author: "Charles Ferguson",
    rating: 5,
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80",
    year: "Academy Award Documentary",
    keyTakeaway: "Forensic audit of systemic regulatory capture.",
    notes: "The definitive investigative documentary analyzing conflicts of interest, rating agency failures, and deregulation that catalyzed the global financial crisis."
  }
];

export const initialInbox: InboxMessage[] = [
  {
    id: 1,
    sender: "Dabe Bedaso",
    email: "daabee86@gmail.com",
    type: "Professional Endorsement",
    text: "Well done bro. It is a good start to the changes awaiting you in executive operations and leadership.",
    read: true,
    date: "2026-08-20"
  },
  {
    id: 2,
    sender: "Habtamu K.",
    email: "ermiget157@gmail.com",
    type: "Recruiting & Vacancy Notice",
    text: "Acceptance note for your application regarding the Senior Branch Cash Supervisor and Operations vacancy at district headquarters. Your dual degree profile stood out.",
    read: false,
    date: "2026-09-02"
  },
  {
    id: 3,
    sender: "Branch Operations Committee",
    email: "district.audit@siinqee.bank",
    type: "Audit Commendation",
    text: "Commendation on maintaining consecutive clean quarterly vault audits with zero physical-to-GL discrepancy at the East Bale branch.",
    read: false,
    date: "2026-09-10"
  }
];

export const initialDenominations: { [key: number]: number } = {
  200: 450,
  100: 1200,
  50: 800,
  10: 500,
  5: 300,
  1: 100
};

export const initialDocuments: BankingDocument[] = [
  {
    id: "doc-degree-mgmt",
    title: "Bachelor of Arts in Management Degree",
    category: "degree",
    issuer: "Oromia State University (OSU)",
    issueDate: "2021-07-15",
    credentialId: "OSU-MGMT-2021-8841",
    scoreOrGrade: "GPA 3.60 / 4.00 (Distinction)",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    description: "Conferred degree in Management focusing on strategic institutional governance, financial operations, human capital leadership, and managerial economics.",
    tags: ["Degree", "Management", "Discipline", "Oromia State University", "Leadership", "Governance"]
  },
  {
    id: "doc-degree-heritage",
    title: "Bachelor of Arts in Archaeology & Heritage Management",
    category: "degree",
    issuer: "Aksum University",
    issueDate: "2018-06-30",
    credentialId: "AKU-AHM-2018-4512",
    scoreOrGrade: "GPA 3.42 / 4.00 (Very Great Distinction)",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
    description: "Academic training in forensic document preservation, historical record authentication, rigorous archival verification, and scientific field documentation.",
    tags: ["Degree", "Archaeology", "Research Discipline", "Aksum University", "Forensics", "Verification"]
  },
  {
    id: "doc-letter-scso",
    title: "Official Appointment Letter: Senior Customer Service Officer (SCSO - Cash I)",
    category: "letter",
    issuer: "Siinqee Bank S.C. - Human Capital Directorate",
    issueDate: "2024-03-12",
    credentialId: "SB/HCD/APPT/2024/0942",
    scoreOrGrade: "Job Grade IX Promotion",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    description: "Formal institutional letter of appointment elevating Ermias Getachew to SCSO Cash I (Job Grade IX) with dual-custody vault authority, cash reserve oversight, and teller supervision.",
    tags: ["Appointment Letter", "Job Grade IX", "Siinqee Bank", "Dual Custody", "Cash Discipline", "Supervision"]
  },
  {
    id: "doc-letter-promotion",
    title: "Operational Commendation & Promotion Verification Letter",
    category: "letter",
    issuer: "Siinqee Bank S.C. - East Bale District Office",
    issueDate: "2023-11-20",
    credentialId: "SB/EBD/OPS/2023/118",
    scoreOrGrade: "100% Audit Readiness Score",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    description: "Branch Director's formal commendation letter certifying zero reconciliation discrepancies across four consecutive financial quarters and rapid promotion velocity from Trainee.",
    tags: ["Commendation", "Branch Operations", "Promotion", "Audit Excellence", "Operational Discipline"]
  },
  {
    id: "doc-cert-ai",
    title: "Artificial Intelligence & Digital Automation in Banking",
    category: "certificate",
    issuer: "International Institute of Digital Finance & Technology",
    issueDate: "2023-08-14",
    credentialId: "IIDF-AI-2023-7491",
    scoreOrGrade: "Executive Certificate with Honors",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "Applied certification covering AI models in financial anomaly detection, customer transaction pattern analysis, workflow automation, and algorithmic risk screening.",
    tags: ["Certificate", "Artificial Intelligence", "Fintech", "Digital Transformation", "Algorithmic Precision"]
  },
  {
    id: "doc-cert-risk-aml",
    title: "Banking Risk Management & AML/CFT Compliance Certification",
    category: "certificate",
    issuer: "National Banking Compliance Standards Board",
    issueDate: "2022-10-05",
    credentialId: "NBC-AML-2022-3819",
    scoreOrGrade: "NBE Directives Mastered",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    description: "Comprehensive qualification in National Bank of Ethiopia (NBE) regulatory frameworks, Currency Transaction Reporting (CTR), Suspicious Activity Reporting (SAR), and dual control security.",
    tags: ["Certificate", "AML/CFT", "Risk Management", "Compliance", "NBE Directives", "Discipline"]
  },
  {
    id: "doc-cert-ecommerce",
    title: "E-Commerce & Digital Branch Banking Operations",
    category: "certificate",
    issuer: "Financial Services Training Academy",
    issueDate: "2022-04-18",
    credentialId: "FSTA-ECM-2022-5520",
    scoreOrGrade: "Certified Specialist",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    description: "Specialized training on merchant onboarding, mobile wallet clearing, agent banking liquidity monitoring, and electronic fund transfers.",
    tags: ["Certificate", "E-Commerce", "Digital Banking", "Electronic Payments", "Payment Discipline"]
  },
  {
    id: "doc-audit-reconciliation",
    title: "Branch Annual Vault & GL Reconciliation Audit Attestation",
    category: "audit",
    issuer: "Siinqee Bank Internal Audit & Inspection Directorate",
    issueDate: "2024-01-10",
    credentialId: "SB/IAID/BAL-2023-04",
    scoreOrGrade: "100% Unbroken Zero-Variance",
    verified: true,
    fileType: "image",
    fileUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description: "Official internal audit certificate verifying zero discrepancy between physical currency vault balances and Core Banking General Ledger positions over the fiscal year.",
    tags: ["Audit", "Vault Audit", "Reconciliation", "Zero Variance", "Siinqee Bank", "Financial Discipline"]
  }
];

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  email: "ermikeab@gmail.com",
  password: "Admin@1234",
  lastChanged: "2026-09-13"
};

export const initialAtsConfig: AtsConfig = {
  targetCompany: 'Siinqee Bank S.C.',
  targetRole: 'Senior Branch Operations & Cash Supervisor',
  vacancyText: `Siinqee Bank S.C. invites competent and qualified applicants for the position of Senior Branch Operations & Cash Supervisor. Key responsibilities include overseeing branch physical cash reserves, dual-custody vault protocols, regulatory AML/KYC reporting, daily GL reconciliation, and team leadership to maintain 100% audit-readiness.`,
  docTheme: 'theme-emerald',
  allowPublicDownload: true,
  matchedKeywords: [
    'Dual-Custody Vault',
    'GL Reconciliation',
    'AML/KYC Compliance',
    'Cash Forecasting',
    '100% Audit Readiness',
    'Team Leadership',
  ],
  matchScore: 96,
  lastUpdated: '2026-09-13',
};

export const initialQuotes: ExecutiveQuote[] = [
  {
    id: "quote-1",
    quote: "A single cent unaccounted for is not a statistical tolerance—it is a rupture in institutional trust. Dual-custody is not merely an operational rule; it is our sacred pact of integrity.",
    author: "Ermias Getachew Hailu",
    role: "Senior Customer Service Officer (SCSO - Cash I)",
    institution: "Siinqee Bank S.C. • East Bale District",
    contributorType: "Portfolio Owner",
    category: "Operational Integrity",
    sourceOrContext: "Siinqee Bank Vault Dual-Control Mandate",
    imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-2",
    quote: "When two keyholders unlock the vault at dawn, they are not acting as individuals; they are acting as the living constitution of the depositors' peace of mind.",
    author: "Ato Gemechu Tufa",
    role: "Branch Operations Supervisor & District Cash Custodian",
    institution: "Siinqee Bank S.C.",
    contributorType: "Branch Colleague",
    category: "Dual Custody & Control",
    sourceOrContext: "Bale Robe Operational Review Seminar",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-3",
    quote: "Modern banking does not leave tradition behind; it reinforces traditional trust with cryptographic precision, automated reconciliations, and instantaneous rural liquidity.",
    author: "Ermias Getachew Hailu",
    role: "Strategic Management & FinTech Advocate",
    institution: "Siinqee Bank S.C.",
    contributorType: "Portfolio Owner",
    category: "Digital Transformation",
    sourceOrContext: "East Bale District Strategy Forum",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-4",
    quote: "Financial inclusion is not built through high-level proclamations alone; it is founded upon the bilingual empathy, dignified teller service, and absolute accuracy shown to every depositor who enters our branch.",
    author: "Dr. Taye Dinsa",
    role: "Dean of Management & Public Administration",
    institution: "Oromia State University",
    contributorType: "Academic Scholar",
    category: "Community Impact",
    sourceOrContext: "Symposium on Regional Economic Empowerment",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-5",
    quote: "The rigor required to unearth an ancient historical stratum without damaging its context is the exact same discipline required to trace a multi-branch liquidity variance to its origin.",
    author: "Ermias Getachew Hailu",
    role: "Dual-Degree Specialist (Management & Heritage)",
    institution: "Aksum & Oromia State Alumni",
    contributorType: "Portfolio Owner",
    category: "Forensic Methodology",
    sourceOrContext: "Interdisciplinary Research Monograph",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-6",
    quote: "A bank's strength is not measured purely by capital adequacy on paper, but by the unbending compliance ethics of its frontline cash supervisors who enforce zero tolerance for reconciliation lag.",
    author: "Ato Berhanu Regassa",
    role: "Senior Regulatory Advisor & Former Directorate Inspector",
    institution: "National Bank of Ethiopia (NBE)",
    contributorType: "Banking Pioneer",
    category: "Regulatory Discipline",
    sourceOrContext: "National Banking Compliance Standards Directive",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    featured: false
  },
  {
    id: "quote-7",
    quote: "Interoperability in retail finance is only as reliable as the underlying daily settlement discipline between core banking registers and national clearing switches.",
    author: "W/ro Bethlehem Tadesse",
    role: "Lead Core Banking & Settlement Architect",
    institution: "FinTech & National Payment Systems Consortium",
    contributorType: "Institutional Mentor",
    category: "Payment Systems",
    sourceOrContext: "National Switch Integration Working Group",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    featured: false
  },
  {
    id: "quote-8",
    quote: "Institutional discipline is not achieved by periodic crackdowns; it is forged through daily, unyielding devotion to standard operating procedures, dual verification, and immaculate record-keeping.",
    author: "Ermias Getachew Hailu",
    role: "Senior Customer Service Officer (SCSO - Cash I)",
    institution: "Siinqee Bank S.C.",
    contributorType: "Portfolio Owner",
    category: "Operational Discipline",
    sourceOrContext: "Branch Internal Audit & Excellence Briefing",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quote-9",
    quote: "A financial institution survives economic turbulence through balance sheet discipline, ethical governance, and the quiet vigilance of officers who verify before they approve.",
    author: "Ato Gemechu Tufa",
    role: "Branch Operations Supervisor",
    institution: "Siinqee Bank S.C.",
    contributorType: "Branch Colleague",
    category: "Financial Discipline",
    sourceOrContext: "District Credit & Risk Committee Session",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featured: false
  }
];

