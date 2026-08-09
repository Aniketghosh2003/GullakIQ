import React, { useState } from 'react';
import { ArrowLeft, Bell, Download, ShieldCheck, RefreshCw, Key, Shield, Trash2, LogOut, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsView({ user, summary, onUpdateUser, onUpdateBudget }) {
  const { logout, authFetch } = useAuth();

  const [budgetAlerts, setBudgetAlerts] = useState(user?.budgetAlerts ?? true);
  const [goalReminders, setGoalReminders] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Budget Modal
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState(user?.monthlyBudget || 35000);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const res = await authFetch('/api/insights/export');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paisa_transactions.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (newBudget > 0) {
      onUpdateBudget(Number(newBudget));
      setShowBudgetModal(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold text-paisa-textMuted uppercase tracking-wider">Account</span>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Profile & settings</h1>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-[#14141a] border border-[#242430] text-xs font-bold text-white hover:bg-[#1a1a22] transition-all"
        >
          Log out
        </button>
      </div>

      {/* User Info Header Card matching design image 4 */}
      <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-paisa-lime text-black font-extrabold text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.name || 'Aarav Mehta'}</h2>
            <p className="text-xs text-paisa-textMuted mt-0.5">{user?.email || 'aarav.mehta@email.com'} • +91 98765 43210</p>
          </div>
        </div>

        <button
          onClick={() => setShowBudgetModal(true)}
          className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs font-semibold text-white hover:bg-[#242430] transition-all"
        >
          Edit profile
        </button>
      </div>

      {/* 3 Metric Cards matching design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Tracked lifetime</div>
          <div className="text-2xl font-extrabold text-white">₹1.8L+</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Member since</div>
          <div className="text-2xl font-extrabold text-white">Feb 2025</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Logging streak</div>
          <div className="text-2xl font-extrabold text-amber-400">42 days 🔥</div>
        </div>
      </div>

      {/* 2-Column Grid matching design image 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Notifications & Update Budget */}
        <div className="space-y-6">
          {/* Update Budget Card */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Monthly Target Budget</h3>
                <p className="text-xs text-paisa-textMuted mt-0.5">Current limit: ₹{(user?.monthlyBudget || 35000).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setShowBudgetModal(true)}
                className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold text-xs hover:bg-paisa-limeHover transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
              >
                Update budget
              </button>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paisa-textMuted">Notifications</h3>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">Budget alerts</div>
                  <div className="text-[10px] text-paisa-textMuted">Notify at 80% of monthly budget</div>
                </div>
                <button
                  onClick={() => setBudgetAlerts(!budgetAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    budgetAlerts ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${budgetAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Goal reminders</div>
                  <div className="text-[10px] text-paisa-textMuted">Weekly nudge toward savings goals</div>
                </div>
                <button
                  onClick={() => setGoalReminders(!goalReminders)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    goalReminders ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${goalReminders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Product updates</div>
                  <div className="text-[10px] text-paisa-textMuted">Occasional emails about new features</div>
                </div>
                <button
                  onClick={() => setProductUpdates(!productUpdates)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    productUpdates ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${productUpdates ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security, Data, Danger zone */}
        <div className="space-y-6">
          {/* Security */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paisa-textMuted">Security</h3>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">Password</div>
                  <div className="text-[10px] text-paisa-textMuted">Last changed 3 months ago</div>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs text-white hover:bg-[#242430]">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Two-factor authentication</div>
                  <div className="text-[10px] text-paisa-textMuted">Add an extra layer of security</div>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    twoFactor ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-paisa-textMuted">Data</h3>
              <div className="text-xs font-bold text-white mt-1">Export statement</div>
              <div className="text-[10px] text-paisa-textMuted">Download as CSV or PDF</div>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs font-semibold text-white hover:bg-[#242430] transition-all"
            >
              {downloading ? 'Exporting...' : 'Export'}
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#181114] border border-red-500/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-red-400">Danger zone</h3>
              <div className="text-xs font-bold text-white mt-1">Delete account</div>
              <div className="text-[10px] text-paisa-textMuted">Permanently remove your data</div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-red-500/30 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for editing budget */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Set Target Monthly Budget</h3>
            <form onSubmit={handleBudgetSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Monthly Limit (₹)</label>
                <input
                  type="number"
                  placeholder="35000"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white text-base font-bold focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBudgetModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c26] text-paisa-textMuted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
