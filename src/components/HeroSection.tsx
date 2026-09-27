import React from 'react';
import { Profile } from '../types';
import { MapPin, ShieldCheck, Award, ArrowRight, Calculator, FileSpreadsheet, Mail, Camera } from 'lucide-react';

interface HeroSectionProps {
  profile: Profile;
  onNavigateSection: (sectionId: string) => void;
  onOpenStudio: () => void;
  isAdmin?: boolean;
  onOpenPhotoUpload?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigateSection,
  onOpenStudio,
  isAdmin = false,
  onOpenPhotoUpload
}) => {
  return (
    <section id="heroSection" className="pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Text & Strategic Identity */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-600/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span id="heroStatusBadgeText">{profile.statusBadge}</span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-semibold text-emerald-700 dark:text-emerald-400 leading-snug">
              {profile.title}
            </p>
          </div>

          {/* Narrative Bio */}
          <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify space-y-3 bg-white/60 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-sm">
            <p>
              I am a performance-driven <strong>Senior Customer Service Officer (Job Grade IX)</strong> at Siinqee Bank, specializing in operational excellence, dual-custody cash control, and digital-first banking solutions.
            </p>
            <p>
              My professional identity is defined by a unique <strong>Dual-Degree Advantage</strong>: the strategic leadership of a <strong>Management</strong> expert (Oromia State University, GPA 3.6/4.0) synergized with the forensic data precision of an <strong>Archaeology & Heritage</strong> specialist (Aksum University, GPA 3.42/4.0).
            </p>
            <p>
              By combining core banking standards with modern certifications in <strong>AI, Business Analysis, and Risk Management</strong>, I bridge traditional financial integrity with future-ready banking innovation. Dedicated to financial inclusion, flawless daily balancing, and keeping branch operations 100% audit-ready.
            </p>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="btnHeroBrowseDossier"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-900/20 hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Executive Cover & Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btnHeroVaultCalc"
              onClick={() => onNavigateSection('vaultSection')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-semibold hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 transition shadow-sm"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Vault Cash Calculator</span>
            </button>

            <button
              id="btnHeroContact"
              onClick={() => onNavigateSection('contactSection')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold transition"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Channel</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Portrait & Verified Credentials Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xl space-y-4">
            
            {/* Portrait Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-emerald-900/10 group">
              <img
                id="heroPortraitImg"
                src={profile.portraitUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Ermias+Getachew&background=0d7668&color=fff&size=512`;
                }}
              />

              {/* Profile Image Dropdown Trigger Button (Admin Only) */}
              {isAdmin && onOpenPhotoUpload && (
                <button
                  id="btnChangeProfilePhoto"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPhotoUpload();
                  }}
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-emerald-700 text-white backdrop-blur-md shadow-lg transition flex items-center gap-1.5 text-xs font-semibold z-10"
                  title="Change / Upload Profile Photo"
                  aria-label="Change Profile Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Update Photo</span>
                </button>
              )}

              {/* Institution Floating Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400">Siinqee Bank S.C.</div>
                  <div className="text-[11px] font-medium text-slate-300">Grade IX Senior Cash Officer</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Quick Location & Dual Degree Pill */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{profile.location}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                  Dual BA Holder
                </span>
              </div>

              {/* Quick credential chips */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 font-medium block">Management BA</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">GPA 3.60 / 4.00</strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 font-medium block">Heritage BA</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">GPA 3.42 / 4.00</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
