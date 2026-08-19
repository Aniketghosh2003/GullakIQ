import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function PublicNavbar({ publicPage, setPublicPage, onOpenAuth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setPublicPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0b0b0e]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-1 text-2xl font-bold tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="text-white font-extrabold tracking-tight">
            Gullak<span className="text-paisa-lime">IQ</span>
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-paisa-textMuted">
          <button
            onClick={() => navigateTo('landing')}
            className={`transition-colors ${publicPage === 'landing' ? 'text-paisa-lime font-bold' : 'hover:text-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('features')}
            className={`transition-colors ${publicPage === 'features' ? 'text-paisa-lime font-bold' : 'hover:text-white'}`}
          >
            Features
          </button>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-xs font-semibold text-paisa-textMuted hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-4 py-2.5 text-xs font-semibold text-black bg-paisa-lime rounded-full hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.35)] flex items-center gap-1.5 transform hover:scale-105"
          >
            Start tracking free
          </button>
        </div>

        {/* Mobile: Sign In + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-xs font-semibold text-paisa-textMuted hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-paisa-textMuted hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0d0d11] px-4 py-4 flex flex-col gap-1">
          <button
            onClick={() => navigateTo('landing')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              publicPage === 'landing'
                ? 'text-paisa-lime bg-paisa-lime/10'
                : 'text-paisa-textMuted hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('features')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              publicPage === 'features'
                ? 'text-paisa-lime bg-paisa-lime/10'
                : 'text-paisa-textMuted hover:text-white hover:bg-white/5'
            }`}
          >
            Features
          </button>

          <div className="mt-3 pt-3 border-t border-white/5">
            <button
              onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-paisa-lime text-black font-bold text-sm hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              Start tracking free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
