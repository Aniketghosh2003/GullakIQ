import React from 'react';
import { LayoutDashboard, BarChart2, Target, CreditCard, User, Settings, Plus, LogOut, TrendingUp, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ activeTab, setActiveTab, onOpenAddModal, mobileMenuOpen, setMobileMenuOpen }) {
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

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header Bar with Hamburger Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0d] border-b border-[#1e1e24] px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-1 text-xl font-bold tracking-tight">
          <span className="text-white font-extrabold tracking-tight">Gullak<span className="text-paisa-lime">IQ</span></span>
          <span className="w-2 h-2 rounded-full bg-paisa-lime inline-block shadow-[0_0_8px_#ccff00]"></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="p-2 rounded-xl bg-paisa-lime text-black font-bold text-xs flex items-center gap-1 hover:bg-paisa-limeHover transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#14141a] text-white border border-[#2a2a36] hover:bg-[#181820] transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation (Desktop Sidebar / Mobile Drawer) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#0a0a0d] border-r border-[#1e1e24] flex flex-col justify-between p-5 shrink-0 select-none
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6 pt-2 md:pt-0">
          {/* Logo & Close for Mobile Header inside Sidebar */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1 text-2xl font-bold tracking-tight">
              <span className="text-white font-extrabold tracking-tight">Gullak<span className="text-paisa-lime">IQ</span></span>
              <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]"></span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-paisa-textMuted hover:text-white hover:bg-[#181820]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Add Expense Lime Button */}
          <button
            onClick={() => {
              onOpenAddModal();
              if (setMobileMenuOpen) setMobileMenuOpen(false);
            }}
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
                    onClick={() => handleNavClick(item.id)}
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
                    onClick={() => handleNavClick(item.id)}
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
            onClick={() => {
              logout();
              if (setMobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="p-2 rounded-xl text-paisa-textMuted hover:text-red-400 hover:bg-[#181820] transition-all"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}

