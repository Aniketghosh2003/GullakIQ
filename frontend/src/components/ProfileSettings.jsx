import React, { useState } from 'react';
import { ArrowLeft, Link2, Bell, Download, ShieldCheck, RefreshCw, ChevronRight, Check, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileSettings({ user, summary, onUpdateUser, onBackToHome }) {
  const { logout, authFetch } = useAuth();
  const [budgetAlerts, setBudgetAlerts] = useState(user?.budgetAlerts ?? true);
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [language, setLanguage] = useState(user?.language || 'English');
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const res = await authFetch('/api/insights/export');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paisa_my_transactions.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const toggleBudgetAlerts = () => {
    const next = !budgetAlerts;
    setBudgetAlerts(next);
    onUpdateUser({ budgetAlerts: next });
  };

  const toggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    onUpdateUser({ notificationsEnabled: next });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-paisa-surface border border-paisa-border flex items-center justify-center text-paisa-textMuted hover:text-white hover:bg-paisa-card transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[10px] font-semibold text-paisa-textMuted uppercase tracking-wider">ACCOUNT</div>
            <h1 className="text-xl font-bold text-white tracking-tight">Profile & Settings</h1>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-3.5 py-2 rounded-xl bg-paisa-card border border-paisa-border text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Account Quick Cards */}
        <div className="md:col-span-6 space-y-4">
          {/* Update Budget Card / Button */}
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-paisa-border flex items-center justify-center text-white">
                <RefreshCw className="w-5 h-5 text-paisa-lime" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Monthly Budget Target</h3>
                <p className="text-[10px] text-paisa-textMuted mt-0.5">Current target: ₹{(user?.monthlyBudget || 35000).toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              className="px-3.5 py-2 rounded-xl bg-paisa-lime text-black font-bold text-xs hover:bg-paisa-limeHover transition-all shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            >
              Update budget
            </button>
          </div>

          {/* Budget Alerts */}
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-paisa-border flex items-center justify-center text-white">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Budget Alerts</h3>
                <p className="text-[10px] text-paisa-textMuted mt-0.5">On - warning at 80% threshold</p>
              </div>
            </div>
            <button
              onClick={toggleBudgetAlerts}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                budgetAlerts ? 'bg-paisa-lime' : 'bg-paisa-card'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-black transition-transform ${budgetAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>

          {/* Export Statement */}
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-paisa-border flex items-center justify-center text-white">
                <Download className="w-5 h-5 text-paisa-lime" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Export Statement</h3>
                <p className="text-[10px] text-paisa-textMuted mt-0.5">Download real transaction history CSV</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-xl bg-paisa-card border border-paisa-border text-xs font-semibold text-white hover:bg-paisa-cardHover transition-all flex items-center gap-1.5"
            >
              {downloading ? (
                <span className="text-[11px] text-paisa-lime">Downloading...</span>
              ) : (
                <>
                  <span>Download</span>
                  <Download className="w-3 h-3 text-paisa-lime" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: User Profile Card */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
              <div className="w-20 h-20 rounded-full bg-paisa-lime text-black font-extrabold text-3xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{user?.name || 'Aarav'}</h2>
                <p className="text-xs text-paisa-textMuted mt-0.5">{user?.email}</p>
                <p className="text-[11px] text-paisa-lime font-semibold mt-1">Target Budget: ₹{(user?.monthlyBudget || 35000).toLocaleString()}</p>
              </div>
            </div>

            {/* Summary metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-paisa-border/80 text-center">
              <div>
                <div className="text-xs font-bold text-white">₹{(summary?.totalSpent || 0).toLocaleString()}</div>
                <div className="text-[10px] text-paisa-textMuted mt-0.5">Spent</div>
              </div>
              <div>
                <div className="text-xs font-bold text-paisa-lime">₹{(summary?.remaining || 0).toLocaleString()}</div>
                <div className="text-[10px] text-paisa-textMuted mt-0.5">Remaining</div>
              </div>
              <div>
                <div className="text-xs font-bold text-white">{summary?.daysLeft || 12}</div>
                <div className="text-[10px] text-paisa-textMuted mt-0.5">Days left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Settings Section */}
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white">Platform Settings</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-paisa-card/60 border border-paisa-border/50 text-xs">
            <span className="font-semibold text-white">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-paisa-surface border border-paisa-border text-white text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-paisa-lime"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-paisa-card/60 border border-paisa-border/50 text-xs">
            <span className="font-semibold text-white">Push Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                notifications ? 'bg-paisa-lime' : 'bg-paisa-card'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-black transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
