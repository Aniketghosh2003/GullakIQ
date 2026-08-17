import React from 'react';
import { LayoutDashboard, BarChart2, Target, CreditCard, User, Settings, Plus, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ activeTab, setActiveTab, onOpenAddModal }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'insights', label: 'Insights', icon: BarChart2 },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
  ];

  const accountItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0d] border-r border-[#1e1e24] min-h-screen flex flex-col justify-between p-5 shrink-0 select-none">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-1 text-2xl font-bold tracking-tight px-2 pt-1">
          <span className="text-white font-extrabold tracking-tight">Gullak<span className="text-paisa-lime">IQ</span></span>
          <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]"></span>
        </div>

        {/* Add Expense Lime Button */}
        <button
          onClick={onOpenAddModal}
          className="w-full py-3.5 px-4 rounded-2xl bg-paisa-lime text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-paisa-limeHover transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] transform active:scale-95"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>Add expense</span>
        </button>

        {/* Navigation Menu */}
        <div className="space-y-6 pt-2">
          {/* MENU Group */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-extrabold text-paisa-textMuted/60 uppercase tracking-widest px-3 mb-2">
              MENU
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                      ? 'bg-[#181820] text-white border border-[#2a2a36] shadow-sm'
                      : 'text-paisa-textMuted hover:text-white hover:bg-[#14141a]'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-paisa-lime' : 'text-paisa-textMuted'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ACCOUNT Group */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-extrabold text-paisa-textMuted/60 uppercase tracking-widest px-3 mb-2">
              ACCOUNT
            </div>
            {accountItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                      ? 'bg-[#181820] text-white border border-[#2a2a36] shadow-sm'
                      : 'text-paisa-textMuted hover:text-white hover:bg-[#14141a]'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-paisa-lime' : 'text-paisa-textMuted'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile Badge */}
      <div className="pt-4 border-t border-[#1a1a22] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-paisa-lime text-black font-extrabold text-sm flex items-center justify-center">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="text-left overflow-hidden">
            <div className="text-xs font-bold text-white truncate max-w-[110px]">
              {user?.name || 'Aarav Mehta'}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-xl text-paisa-textMuted hover:text-red-400 hover:bg-[#181820] transition-all"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
