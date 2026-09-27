import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, Printer, RotateCcw, ShieldCheck, Download } from 'lucide-react';

export const VaultCalculator: React.FC = () => {
  const [counts, setCounts] = useState<{ [denom: number]: number }>({
    200: 350,
    100: 1200,
    50: 800,
    10: 450,
    5: 200,
    1: 100,
  });

  const [glBalance, setGlBalance] = useState<number>(235500);
  const [branchCode, setBranchCode] = useState<string>('SB-EB-042');
  const [signOffStamp, setSignOffStamp] = useState<boolean>(true);

  const denoms = [200, 100, 50, 10, 5, 1];

  const handleCountChange = (denom: number, val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setCounts((prev) => ({ ...prev, [denom]: num }));
  };

  const calculateSubtotal = (denom: number) => {
    return (counts[denom] || 0) * denom;
  };

  const totalPhysicalCash = denoms.reduce((acc, d) => acc + calculateSubtotal(d), 0);
  const totalNotes = denoms.reduce((acc, d) => acc + (counts[d] || 0), 0);
  const variance = totalPhysicalCash - glBalance;
  const isBalanced = variance === 0;

  const loadPreset = (type: 'balanced' | 'peak' | 'morning') => {
    if (type === 'balanced') {
      const balancedCounts = { 200: 350, 100: 1200, 50: 800, 10: 450, 5: 200, 1: 100 };
      setCounts(balancedCounts);
      setGlBalance(235500);
    } else if (type === 'peak') {
      const peakCounts = { 200: 1500, 100: 3500, 50: 2000, 10: 1000, 5: 400, 1: 200 };
      setCounts(peakCounts);
      setGlBalance(762200);
    } else {
      const morningCounts = { 200: 100, 100: 300, 50: 200, 10: 100, 5: 50, 1: 0 };
      setCounts(morningCounts);
      setGlBalance(61250);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="vaultSection" className="mb-20 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            SCSO Cash I Practical Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-emerald-600" />
            <span>Vault & Till Settlement Reconciler</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Live branch cash denomination calculator simulating daily dual-custody physical counts against general ledger balances.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400">Presets:</span>
          <button
            onClick={() => loadPreset('balanced')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 hover:bg-emerald-100 transition"
          >
            Zero-Discrepancy (EOD)
          </button>
          <button
            onClick={() => loadPreset('peak')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            Harvest Inflow Peak
          </button>
          <button
            onClick={() => loadPreset('morning')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            Morning Vault Opening
          </button>
        </div>
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Denomination Inputs Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Denomination (ETB)</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Physical Pieces</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Subtotal Value</span>
          </div>

          <div className="space-y-3">
            {denoms.map((d) => (
              <div key={d} className="flex items-center justify-between gap-4 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <div className="flex items-center gap-2.5 w-28">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                    {d}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Birr Note</span>
                </div>

                <div className="flex-1 max-w-[140px]">
                  <input
                    type="number"
                    min="0"
                    value={counts[d] || 0}
                    onChange={(e) => handleCountChange(d, e.target.value)}
                    className="w-full text-center font-mono font-bold text-sm py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 shadow-sm"
                  />
                </div>

                <div className="w-32 text-right font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                  {calculateSubtotal(d).toLocaleString()} <span className="text-[11px] text-slate-400 font-sans">ETB</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary Row */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Currency Notes Counted:</span>
            <strong className="font-mono text-sm text-slate-800 dark:text-slate-200">{totalNotes.toLocaleString()} pcs</strong>
          </div>
        </div>

        {/* Right: GL Reconciliation & Dual-Custody Audit Slip */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Audit Status</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Ref: {branchCode}
              </span>
            </div>

            {/* Reconciliation Cards */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Physical Cash In Till</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {totalPhysicalCash.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-500 font-medium">Core Banking GL Balance</label>
                  <span className="text-[10px] text-slate-400">Editable for test</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={glBalance}
                    onChange={(e) => setGlBalance(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-base font-bold font-mono px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                  />
                  <span className="text-xs font-bold text-slate-400">ETB</span>
                </div>
              </div>
            </div>

            {/* Reconciliation Variance Result */}
            <div className={`mt-5 p-4 rounded-xl border ${
              isBalanced
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-center gap-2.5 mb-1.5">
                {isBalanced ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
                <span className="text-sm font-black tracking-tight">
                  {isBalanced ? '100% RECONCILED — ZERO DISCREPANCY' : 'DISCREPANCY DETECTED'}
                </span>
              </div>
              <div className="text-xs leading-relaxed">
                {isBalanced ? (
                  <span>Physical till currency matches general ledger exactly. Ready for dual-custody vault sign-off.</span>
                ) : (
                  <span>
                    Variance: <strong>{variance > 0 ? `+${variance.toLocaleString()} ETB (Overage)` : `${variance.toLocaleString()} ETB (Shortage)`}</strong>. Audit protocol requires recounting denominations before vault locking.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Dual-Custody Signature Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <span className="text-slate-400 block">SCSO Cash Custodian</span>
                <strong className="text-slate-800 dark:text-slate-200 font-semibold block mt-0.5">Ermias Getachew H.</strong>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Verified ✓</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                <span className="text-slate-400 block">Branch Ops Supervisor</span>
                <strong className="text-slate-800 dark:text-slate-200 font-semibold block mt-0.5">Dual-Key Controller</strong>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Verified ✓</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintSlip}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Settlement Slip</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
