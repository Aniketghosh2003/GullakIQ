import React, { useState } from 'react';
import { ArrowLeft, Bell, Download, ShieldCheck, RefreshCw, Key, Shield, Trash2, LogOut, Check, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsView({ user, summary, transactions, onUpdateUser, onUpdateBudget, onNavigatePrivacy }) {
  const { logout, authFetch } = useAuth();

  // Profile Edit State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [emailInput, setEmailInput] = useState(user?.email || '');

  // Password Edit State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  // Toggles State connected to user backend model
  const [budgetAlerts, setBudgetAlerts] = useState(user?.budgetAlerts ?? true);
  const [goalReminders, setGoalReminders] = useState(user?.goalReminders ?? true);
  const [productUpdates, setProductUpdates] = useState(user?.productUpdates ?? false);
  const [pushNotifications, setPushNotifications] = useState(user?.pushNotifications ?? false);

  const [downloading, setDownloading] = useState(false);

  // Budget Modal
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState(user?.monthlyBudget || 35000);

  // Dynamic user statistics calculation
  const totalTrackedLifetime = (transactions || []).reduce((sum, t) => sum + (t.amount || 0), 0);
  const memberSinceFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Dynamic Logging Streak calculation: count distinct consecutive calendar days with logged transactions
  const calculateStreak = () => {
    if (!transactions || transactions.length === 0) return 0;
    
    // Extract unique dates formatted YYYY-MM-DD sorted descending
    const uniqueDates = Array.from(
      new Set(
        transactions
          .filter(t => t.date)
          .map(t => new Date(t.date).toISOString().split('T')[0])
      )
    ).sort((a, b) => new Date(b) - new Date(a));

    if (uniqueDates.length === 0) return 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If no transaction today or yesterday, streak is broken
    if (!uniqueDates.includes(todayStr) && !uniqueDates.includes(yesterdayStr)) {
      return 0;
    }

    let streak = 0;
    let checkDate = uniqueDates.includes(todayStr) ? new Date() : yesterday;

    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (uniqueDates.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const loggingStreakDays = calculateStreak();

  // Toggle Handlers
  const handleToggleBudgetAlerts = async () => {
    const next = !budgetAlerts;
    setBudgetAlerts(next);
    onUpdateUser({ budgetAlerts: next });
  };

  const handleToggleGoalReminders = async () => {
    const next = !goalReminders;
    setGoalReminders(next);
    onUpdateUser({ goalReminders: next });
  };

  const handleToggleProductUpdates = async () => {
    const next = !productUpdates;
    setProductUpdates(next);
    onUpdateUser({ productUpdates: next });
  };

  // Web Push Notification Permission Handler
  const handleTogglePushNotifications = async () => {
    if (!pushNotifications) {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notifications.');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushNotifications(true);
        onUpdateUser({ pushNotifications: true });
        new Notification('GullakIQ Expense Tracker', {
          body: '🔔 Web Push notifications enabled! You will receive budget & activity alerts.',
          icon: '/favicon.ico'
        });
      } else {
        alert('Notification permission denied by browser settings.');
      }
    } else {
      setPushNotifications(false);
      onUpdateUser({ pushNotifications: false });
    }
  };

  // Save Profile Handler
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (nameInput) {
      onUpdateUser({ name: nameInput, email: emailInput });
      setShowEditProfileModal(false);
    }
  };

  // Password Submit Handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassMsg('Password must be at least 6 characters.');
      return;
    }
    onUpdateUser({ password: newPass });
    setPassMsg('Password updated successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPassMsg('');
      setCurrentPass('');
      setNewPass('');
    }, 1200);
  };

  // Export Data Handler
  const handleExport = async () => {
    setDownloading(true);
    try {
      if (authFetch) {
        const res = await authFetch('/api/insights/export');
        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'gullakiq_transactions_statement.csv';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setDownloading(false);
          return;
        }
      }

      // Fallback CSV generation
      const headers = ['Title', 'Category', 'Payment Method', 'Amount', 'Type', 'Date'];
      const rows = (transactions || []).map(t => [
        `"${(t.title || '').replace(/"/g, '""')}"`,
        `"${(t.category || '').replace(/"/g, '""')}"`,
        `"${(t.paymentMethod || '').replace(/"/g, '""')}"`,
        t.amount,
        t.type,
        `"${new Date(t.date || Date.now()).toLocaleDateString()}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GullakIQ_transactions_statement.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
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

      {/* Dynamic User Info Header Card */}
      <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-paisa-lime text-black font-extrabold text-2xl flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.name || 'Aarav Mehta'}</h2>
            <p className="text-xs text-paisa-textMuted mt-0.5">{user?.email || 'aarav.mehta@email.com'}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setNameInput(user?.name || '');
            setEmailInput(user?.email || '');
            setShowEditProfileModal(true);
          }}
          className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs font-semibold text-white hover:bg-[#242430] transition-all"
        >
          Edit profile
        </button>
      </div>

      {/* 3 Dynamic Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Tracked lifetime</div>
          <div className="text-2xl font-extrabold text-white">₹{totalTrackedLifetime.toLocaleString()}</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Member since</div>
          <div className="text-2xl font-extrabold text-white">{memberSinceFormatted}</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Logging streak</div>
          <div className="text-2xl font-extrabold text-amber-400">{loggingStreakDays} days 🔥</div>
        </div>
      </div>

      {/* 2-Column Grid for Settings */}
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
                onClick={() => {
                  setNewBudget(user?.monthlyBudget || 35000);
                  setShowBudgetModal(true);
                }}
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
              {/* Web Push Notifications */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">Web Push notifications</div>
                  <div className="text-[10px] text-paisa-textMuted">Receive live alerts on desktop/mobile browser</div>
                </div>
                <button
                  onClick={handleTogglePushNotifications}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    pushNotifications ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${pushNotifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Budget Alerts */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Budget alerts</div>
                  <div className="text-[10px] text-paisa-textMuted">Notify at 80% threshold</div>
                </div>
                <button
                  onClick={handleToggleBudgetAlerts}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    budgetAlerts ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${budgetAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Goal Reminders */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Goal reminders</div>
                  <div className="text-[10px] text-paisa-textMuted">Weekly nudge toward savings goals</div>
                </div>
                <button
                  onClick={handleToggleGoalReminders}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    goalReminders ? 'bg-paisa-lime' : 'bg-[#1e1e26]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-black transition-transform ${goalReminders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Product Updates */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1c1c24]">
                <div>
                  <div className="font-bold text-white">Product updates</div>
                  <div className="text-[10px] text-paisa-textMuted">Occasional emails about new features</div>
                </div>
                <button
                  onClick={handleToggleProductUpdates}
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
                  <div className="text-[10px] text-paisa-textMuted">Protected account password</div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs text-white hover:bg-[#242430]"
                >
                  Change
                </button>
              </div>

              {onNavigatePrivacy && (
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1c1c24]">
                  <div>
                    <div className="font-bold text-white">Privacy policy</div>
                    <div className="text-[10px] text-paisa-textMuted">View data collection & encryption terms</div>
                  </div>
                  <button
                    onClick={onNavigatePrivacy}
                    className="px-3 py-1.5 rounded-xl bg-[#1c1c26] border border-[#2a2a38] text-xs text-paisa-lime hover:bg-[#242430]"
                  >
                    View policy
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-paisa-textMuted">Data</h3>
              <div className="text-xs font-bold text-white mt-1">Export statement</div>
              <div className="text-[10px] text-paisa-textMuted">Download full history as CSV</div>
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
              <div className="text-xs font-bold text-white mt-1">Sign Out</div>
              <div className="text-[10px] text-paisa-textMuted">Sign out of current session</div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl border border-red-500/30 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Edit Profile Details</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c26] text-paisa-textMuted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Change Password</h3>
            {passMsg && <p className="text-xs font-semibold text-paisa-lime">{passMsg}</p>}
            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c26] text-paisa-textMuted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
