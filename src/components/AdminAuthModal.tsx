import React, { useState, useEffect } from 'react';
import { Lock, X, ShieldAlert, Mail, KeyRound, Eye, EyeOff, Sparkles, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_ADMIN_CREDENTIALS } from '../data/initialData';
import { AdminCredentials } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Security features: rate limiting & math captcha
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);
  const [lockoutSecondsLeft, setLockoutSecondsLeft] = useState<number>(0);
  const [mathA, setMathA] = useState(4);
  const [mathB, setMathB] = useState(3);
  const [captchaInput, setCaptchaInput] = useState('');

  // Load configured credentials or initialize with defaults
  const getAdminCreds = (): AdminCredentials => {
    try {
      const saved = localStorage.getItem('egh_admin_creds');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return DEFAULT_ADMIN_CREDENTIALS;
  };

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setResetSuccess(false);
      const creds = getAdminCreds();
      setEmail(creds.email || 'ermikeab@gmail.com');
      setPassword('');
      setCaptchaInput('');
      setMathA(Math.floor(Math.random() * 8) + 2);
      setMathB(Math.floor(Math.random() * 8) + 1);

      // Check lockout status
      const lockTime = parseInt(sessionStorage.getItem('egh_admin_lockout') || '0', 10);
      if (lockTime > Date.now()) {
        setLockoutUntil(lockTime);
      } else {
        setLockoutUntil(0);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (lockoutUntil > 0) {
      const interval = setInterval(() => {
        const left = Math.ceil((lockoutUntil - Date.now()) / 1000);
        if (left <= 0) {
          setLockoutUntil(0);
          setLockoutSecondsLeft(0);
          setFailedAttempts(0);
          sessionStorage.removeItem('egh_admin_lockout');
          clearInterval(interval);
        } else {
          setLockoutSecondsLeft(left);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil > Date.now()) {
      setErrorMsg(`Security Lockout: Too many failed attempts. Please wait ${lockoutSecondsLeft}s.`);
      return;
    }
    setErrorMsg(null);

    // Verify Captcha
    const expectedSum = mathA + mathB;
    if (parseInt(captchaInput.trim(), 10) !== expectedSum) {
      setErrorMsg('Security Verification Failed: Incorrect mathematical challenge answer.');
      setMathA(Math.floor(Math.random() * 8) + 2);
      setMathB(Math.floor(Math.random() * 8) + 1);
      setCaptchaInput('');
      return;
    }

    const creds = getAdminCreds();
    const normalizedInputEmail = email.trim().toLowerCase();
    const normalizedConfigEmail = (creds.email || DEFAULT_ADMIN_CREDENTIALS.email).trim().toLowerCase();
    const expectedPassword = creds.password || DEFAULT_ADMIN_CREDENTIALS.password;

    if (!normalizedInputEmail || !normalizedInputEmail.includes('@')) {
      setErrorMsg('Please enter a valid administrator email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your administrator password.');
      return;
    }

    const emailMatches = normalizedInputEmail === normalizedConfigEmail;
    const passwordMatches =
      password === expectedPassword ||
      (expectedPassword === 'Admin@1234' && password === '1234');

    if (emailMatches && passwordMatches) {
      setErrorMsg(null);
      setFailedAttempts(0);
      sessionStorage.setItem('egh_admin_auth', 'true');
      sessionStorage.removeItem('egh_admin_lockout');
      onAuthenticate();
      onClose();
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);

      if (nextFailed >= 3) {
        const lockoutTime = Date.now() + 30000; // 30 seconds lockout
        setLockoutUntil(lockoutTime);
        setLockoutSecondsLeft(30);
        sessionStorage.setItem('egh_admin_lockout', lockoutTime.toString());
        setErrorMsg('Security Lockout: 3 consecutive authentication failures. Locked for 30 seconds.');
      } else {
        if (!emailMatches && !passwordMatches) {
          setErrorMsg(`Invalid credentials. (${3 - nextFailed} attempt(s) remaining before lockout)`);
        } else if (!emailMatches) {
          setErrorMsg(`Unrecognized administrator email.`);
        } else {
          setErrorMsg(`Incorrect password. (${3 - nextFailed} attempt(s) remaining before lockout)`);
        }
      }
      // Refresh captcha
      setMathA(Math.floor(Math.random() * 8) + 2);
      setMathB(Math.floor(Math.random() * 8) + 1);
      setCaptchaInput('');
    }
  };

  const handleFillDemoCreds = () => {
    const creds = getAdminCreds();
    setEmail(creds.email || DEFAULT_ADMIN_CREDENTIALS.email);
    setPassword(creds.password || DEFAULT_ADMIN_CREDENTIALS.password || 'Admin@1234');
    setErrorMsg(null);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset administrator login credentials to initial defaults (ermikeab@gmail.com / Admin@1234)?')) {
      localStorage.setItem('egh_admin_creds', JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
      setEmail(DEFAULT_ADMIN_CREDENTIALS.email);
      setPassword(DEFAULT_ADMIN_CREDENTIALS.password || 'Admin@1234');
      setErrorMsg(null);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-auth-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="admin-auth-modal"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              title="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Administrator Control Room
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified portfolio management access
            </p>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="ermikeab@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Admin Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Math Captcha Verification Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Security Verification: What is {mathA} + {mathB}?
            </label>
            <input
              type="number"
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter sum"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 font-semibold animate-in fade-in">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {resetSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-700 dark:text-emerald-300 font-semibold animate-in fade-in">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>Credentials reset to defaults: ermikeab@gmail.com / Admin@1234</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Authenticate Admin Access</span>
          </button>
        </form>

        {/* Demo Assistant & Reset Helpers */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={handleFillDemoCreds}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold flex items-center gap-1 transition"
            title="Auto-fill credentials"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Fill Default Credentials</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition"
            title="Reset credentials"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Password</span>
          </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};
