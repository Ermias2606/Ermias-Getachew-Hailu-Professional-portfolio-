import React, { useState } from 'react';
import { Skill } from '../types';
import { Search, CheckCircle2, ShieldAlert, Sparkles, Filter, ChevronRight, BarChart3 } from 'lucide-react';
import { D3RadarChart } from './D3RadarChart';

interface SkillsMatrixProps {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills, onSelectSkill }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = [
    { id: 'all', label: 'All Domains', count: skills.length },
    { id: 'cash-vault', label: 'Cash & Vault', count: skills.filter(s => s.domain === 'cash-vault').length },
    { id: 'core-banking', label: 'Core Banking', count: skills.filter(s => s.domain === 'core-banking').length },
    { id: 'compliance-aml', label: 'AML & Compliance', count: skills.filter(s => s.domain === 'compliance-aml').length },
    { id: 'accounting-settlement', label: 'Settlement & GL', count: skills.filter(s => s.domain === 'accounting-settlement').length },
    { id: 'risk-management', label: 'Risk & Strategy', count: skills.filter(s => s.domain === 'risk-management').length },
  ];

  const filteredSkills = skills.filter((s) => {
    const matchesDomain = selectedDomain === 'all' || s.domain === selectedDomain;
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <section id="skillsSection" className="mb-20 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            Audited Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            24-Point Banking Skills Matrix
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Practical evaluations across physical vault controls, regulatory AML/KYC directives, core banking software, and general ledger settlement.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="inputSearchSkills"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search operational skills..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* Radar Chart Proficiency Visualization */}
      <div className="mb-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Domain Proficiency Radar Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Multi-dimensional evaluation across all 5 core banking operational domains.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-72 sm:h-80 flex items-center justify-center">
          <D3RadarChart skills={skills} selectedDomain={selectedDomain} />
        </div>
      </div>

      {/* Domain Filters Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {domains.map((d) => (
          <button
            key={d.id}
            id={`tabSkillDomain-${d.id}`}
            onClick={() => setSelectedDomain(d.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
              selectedDomain === d.id
                ? 'bg-emerald-700 text-white shadow-emerald-900/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400'
            }`}
          >
            <span>{d.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedDomain === d.id
                  ? 'bg-emerald-900/40 text-emerald-100'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {d.count}
            </span>
          </button>
        ))}
      </div>

      {/* Skills 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((sk) => (
          <div
            key={sk.id}
            onClick={() => onSelectSkill(sk)}
            className="group p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>{sk.name}</span>
                </h4>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {sk.gradeRef && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {sk.gradeRef}
                    </span>
                  )}
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 font-mono">
                    {sk.pct}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {sk.description}
              </p>
            </div>

            {/* Progress Track */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${sk.pct}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Audit Benchmark Met</span>
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform flex items-center text-slate-400">
                  <span>Scenario</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            No competencies match your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('all');
            }}
            className="mt-3 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
