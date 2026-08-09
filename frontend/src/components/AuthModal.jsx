import React, { useState } from 'react';
import { X, Lock, Mail, User, IndianRupee, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('25');
  const [monthlyBudget, setMonthlyBudget] = useState('35000');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, Number(age), Number(monthlyBudget));
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#15151b] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span>paisa</span>
            <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_8px_#ccff00]"></span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-paisa-card border border-paisa-border flex items-center justify-center text-paisa-textMuted hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-paisa-card rounded-2xl border border-paisa-border">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-paisa-lime text-black shadow-md' : 'text-paisa-textMuted hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signup' ? 'bg-paisa-lime text-black shadow-md' : 'text-paisa-textMuted hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-paisa-textMuted font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-paisa-textMuted" />
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-paisa-textMuted" />
              <input
                type="email"
                placeholder="aarav@paisa.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-paisa-textMuted" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Age</label>
                <input
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                />
              </div>

              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Monthly Budget (₹)</label>
                <input
                  type="number"
                  placeholder="35000"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-paisa-lime text-black font-bold text-sm hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="text-center text-[11px] text-paisa-textMuted">
          {mode === 'login' ? (
            <span>Don't have an account? <button onClick={() => setMode('signup')} className="text-paisa-lime underline font-semibold">Sign Up</button></span>
          ) : (
            <span>Already have an account? <button onClick={() => setMode('login')} className="text-paisa-lime underline font-semibold">Sign In</button></span>
          )}
        </div>
      </div>
    </div>
  );
}
