import React from 'react';

export default function PublicNavbar({ publicPage, setPublicPage, onOpenAuth }) {
  const navigateTo = (page) => {
    setPublicPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 relative z-50">
      {/* Logo */}
      <div
        onClick={() => navigateTo('landing')}
        className="flex items-center gap-1 text-2xl font-bold tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
      >
        <span className="text-white font-extrabold tracking-tight">paisa</span>
        <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]"></span>
      </div>

      {/* Public Navigation Links: Home, Features, About, Contact */}
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
        {/* <a href="#about" className="hover:text-white transition-colors">
          About
        </a>
        <a href="#contact" className="hover:text-white transition-colors">
          Contact
        </a> */}
      </div>

      {/* Auth Action */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onOpenAuth('login')}
          className="hidden sm:inline-block text-xs font-semibold text-paisa-textMuted hover:text-white transition-colors px-3 py-2"
        >
          Sign In
        </button>
        <button
          onClick={() => onOpenAuth('signup')}
          className="px-4 py-2.5 text-xs font-semibold text-black bg-paisa-lime rounded-full hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.35)] flex items-center gap-1.5 transform hover:scale-105"
        >
          <span>Start tracking free</span>
        </button>
      </div>
    </nav>
  );
}
