import React from 'react';
import { Home, BarChart2, Target, User as UserIcon, Plus, Sparkles, LogOut, LogIn, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, onOpenAddModal, onOpenLanding, onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuth();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'insights', label: 'Insights', icon: BarChart2 },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paisa-dark/95 backdrop-blur-md border-b border-paisa-border/50 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenLanding}
          className="flex items-center gap-1 text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="text-white font-extrabold tracking-tight">Gullak<span className="text-paisa-lime">IQ</span></span>
          <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_8px_#ccff00]"></span>
        </button>

        <button 
          onClick={onOpenLanding}
          className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-paisa-lime bg-paisa-lime/10 border border-paisa-lime/20 rounded-full hover:bg-paisa-lime/20 transition-all"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>
      </div>

      {/* Navigation Pills */}
      <nav className="flex items-center bg-paisa-surface/80 border border-paisa-border p-1 rounded-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (!isAuthenticated && tab.id !== 'home') {
                  onOpenAuth('login');
                  return;
                }
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-paisa-lime text-black font-semibold shadow-sm'
                  : 'text-paisa-textMuted hover:text-white hover:bg-paisa-card/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-paisa-textMuted'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Actions / Auth Controls */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {/* Quick Add Button */}
            <button
              onClick={onOpenAddModal}
              className="w-9 h-9 rounded-full bg-paisa-lime text-black flex items-center justify-center font-bold hover:bg-paisa-limeHover transition-all transform hover:scale-105 shadow-[0_0_12px_rgba(204,255,0,0.4)]"
              title="Add Expense or Income"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Logout button */}
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-xl bg-paisa-card border border-paisa-border text-paisa-textMuted hover:text-red-400 hover:border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 rounded-xl bg-paisa-lime text-black text-xs font-bold hover:bg-paisa-limeHover transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(204,255,0,0.3)]"
          >
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
