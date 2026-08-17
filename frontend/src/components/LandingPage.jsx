import React, { useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function LandingPage({ onOpenAuth, onNavigateFeatures, onNavigatePrivacy }) {
  const handleSeeFeatures = () => {
    onNavigateFeatures();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white flex flex-col font-sans selection:bg-paisa-lime selection:text-black">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION (2-Column Hero layout with mockup card from home.png) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl w-full mx-auto px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copywriting */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paisa-card/90 border border-white/10 text-xs font-medium text-paisa-textMuted">
            <span className="w-2 h-2 rounded-full bg-paisa-lime animate-pulse"></span>
            <span>Built for India's digital generation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Every rupee, right where you <span className="text-paisa-lime drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">left it.</span>
          </h1>

          <p className="text-base sm:text-lg text-paisa-textMuted leading-relaxed max-w-xl">
            The expense tracker built for how India actually spends — split bills, chai runs, and monthly budgets, all in one clean ledger.
          </p>

          {/* CTA Button (Only "Start tracking — it's free →", "See how it works" button removed!) */}
          <div className="pt-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
            >
              <span>Start tracking — it's free</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-paisa-textMuted pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>100% Free & Private • Zero credit card needed • Web platform</span>
          </div>
        </div>

        {/* Right Column: Exact Mockup Card UI matching home.png (Slightly scaled down for cleaner proportions) */}
        <div className="lg:col-span-6 relative flex justify-center py-4">
          {/* Floating Pill Top Left */}
          <div className="absolute top-0 left-0 sm:left-4 z-20 bg-[#1e1e28]/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-2xl">
            <span className="text-emerald-400">💸</span>
            <span className="text-white font-bold">-₹340</span>
            <span className="text-paisa-textMuted text-[10px]">Swiggy</span>
          </div>

          {/* Floating Badge Bottom Right */}
          <div className="absolute -bottom-1 right-0 sm:right-4 z-20 bg-[#1e1e28]/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-2xl">
            <span>🏖️</span>
            <span className="text-white">Goa Trip</span>
            <span className="text-paisa-lime font-bold">56%</span>
          </div>

          {/* Main Card Container */}
          <div className="bg-[#121217] border border-white/10 rounded-[28px] p-5 shadow-2xl space-y-4 max-w-[330px] w-full relative overflow-hidden">
            {/* Header Text */}
            <div className="text-[11px] text-paisa-textMuted font-medium text-left">Left to spend</div>

            {/* Circular Gauge Ring */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#1f1f2a"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#ccff00"
                    strokeWidth="9"
                    strokeDasharray="251.2"
                    strokeDashoffset="90"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold tracking-tight text-white">₹12,460</span>
                  <span className="text-[10px] text-paisa-textMuted mt-0.5 font-medium">64% used</span>
                </div>
              </div>
            </div>

            {/* Micro Transaction Items */}
            <div className="space-y-2.5 pt-1 border-t border-white/5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#171720] border border-white/5 text-[11px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs">🛵</div>
                  <div className="text-left">
                    <div className="font-bold text-white">Swiggy</div>
                    <div className="text-[9px] text-paisa-textMuted">Food • UPI</div>
                  </div>
                </div>
                <div className="font-bold text-white">-₹340</div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#171720] border border-white/5 text-[11px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center text-xs">🚕</div>
                  <div className="text-left">
                    <div className="font-bold text-white">Uber</div>
                    <div className="text-[9px] text-paisa-textMuted">Travel • UPI</div>
                  </div>
                </div>
                <div className="font-bold text-white">-₹185</div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#171720] border border-white/5 text-[11px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs">💰</div>
                  <div className="text-left">
                    <div className="font-bold text-white">Freelance</div>
                    <div className="text-[9px] text-paisa-textMuted">Income • Bank</div>
                  </div>
                </div>
                <div className="font-bold text-paisa-lime">+₹4,500</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Metric Highlights */}
      <section className="max-w-6xl w-full mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-5 text-center space-y-1">
            <div className="text-2xl font-extrabold text-white">100%</div>
            <div className="text-[11px] text-paisa-textMuted font-medium">Free Forever</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-5 text-center space-y-1">
            <div className="text-2xl font-extrabold text-paisa-lime">0</div>
            <div className="text-[11px] text-paisa-textMuted font-medium">Hidden Fees / Ads</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-5 text-center space-y-1">
            <div className="text-2xl font-extrabold text-white">10sec</div>
            <div className="text-[11px] text-paisa-textMuted font-medium">Average Log Time</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-5 text-center space-y-1">
            <div className="text-2xl font-extrabold text-amber-400">Clean</div>
            <div className="text-[11px] text-paisa-textMuted font-medium">Visual Interface</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY PAISA SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="why-paisa" className="bg-[#0e0e13] border-y border-white/5 py-20">
        <div className="max-w-6xl w-full mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-paisa-lime uppercase tracking-widest">WHY PAISA.</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Money tracking that doesn't feel like homework.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#14141c] border border-white/10 p-7 rounded-3xl space-y-3 hover:border-paisa-lime/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-white/10 flex items-center justify-center text-paisa-lime text-lg font-bold">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">Fast & Simple Entry</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Log your spends in 3 quick taps. Select category, amount, and payment method with zero clutter.
              </p>
            </div>

            <div className="bg-[#14141c] border border-white/10 p-7 rounded-3xl space-y-3 hover:border-paisa-lime/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-white/10 flex items-center justify-center text-amber-400 text-lg font-bold">
                ⭕
              </div>
              <h3 className="text-lg font-bold text-white">Budgets that don't guilt-trip</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Set a number, watch the ring fill up. A nudge when you're close; zero shame when you spend.
              </p>
            </div>

            <div className="bg-[#14141c] border border-white/10 p-7 rounded-3xl space-y-3 hover:border-paisa-lime/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-white/10 flex items-center justify-center text-indigo-400 text-lg font-bold">
                🎯
              </div>
              <h3 className="text-lg font-bold text-white">Goals for the stuff you want</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Goa trip, new phone, emergency fund — track it like a countdown, not a spreadsheet.
              </p>
            </div>

            <div className="bg-[#14141c] border border-white/10 p-7 rounded-3xl space-y-3 hover:border-paisa-lime/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-white/10 flex items-center justify-center text-emerald-400 text-lg font-bold">
                📱
              </div>
              <h3 className="text-lg font-bold text-white">One-handed, ten seconds</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Tap the amount, pick a category, done. Built for logging a chai run while you're still holding the cup.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleSeeFeatures}
              className="px-6 py-3 rounded-full bg-paisa-card border border-white/10 text-xs font-bold text-white hover:bg-paisa-cardHover transition-all"
            >
              Explore all features
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INSIDE PAISA SHOWCASE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl w-full mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-paisa-lime uppercase tracking-widest">INSIDE PAISA</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Clean by default. Yours in a tap.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#13131a] border border-white/10 rounded-3xl p-6 text-center space-y-4 hover:border-paisa-lime/40 transition-all cursor-pointer" onClick={handleSeeFeatures}>
            <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" stroke="#1f1f2a" strokeWidth="8" fill="transparent" />
                <circle cx="50" cy="50" r="38" stroke="#ccff00" strokeWidth="8" strokeDasharray="238.6" strokeDashoffset="80" fill="transparent" />
              </svg>
            </div>
            <div className="text-xs font-bold text-white">Spending Ring</div>
          </div>

          <div className="bg-[#13131a] border border-white/10 rounded-3xl p-6 text-center space-y-4 hover:border-paisa-lime/40 transition-all cursor-pointer" onClick={handleSeeFeatures}>
            <div className="text-2xl font-extrabold text-white pt-4">2,400</div>
            <div className="text-[10px] text-paisa-textMuted font-semibold">One-handed keypad</div>
            <div className="text-xs font-bold text-white pt-2">Quick Log Keypad</div>
          </div>

          <div className="bg-[#13131a] border border-white/10 rounded-3xl p-6 text-center space-y-4 hover:border-paisa-lime/40 transition-all cursor-pointer" onClick={handleSeeFeatures}>
            <div className="flex items-end justify-center gap-1.5 h-16 pt-4">
              <div className="w-3 bg-paisa-card h-8 rounded-t"></div>
              <div className="w-3 bg-paisa-card h-12 rounded-t"></div>
              <div className="w-3 bg-paisa-lime h-16 rounded-t"></div>
            </div>
            <div className="text-xs font-bold text-white">Weekly Spend Graph</div>
          </div>

          <div className="bg-[#13131a] border border-white/10 rounded-3xl p-6 text-center space-y-4 hover:border-paisa-lime/40 transition-all cursor-pointer" onClick={handleSeeFeatures}>
            <div className="space-y-1.5 pt-3">
              <div className="flex justify-between text-[10px] text-white font-bold">
                <span>Goa Trip</span>
                <span className="text-paisa-lime">67%</span>
              </div>
              <div className="w-full bg-[#1c1c26] h-2 rounded-full overflow-hidden">
                <div className="bg-paisa-lime h-full w-[67%]"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-white pt-2">Goal Countdown</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* REAL REVIEWS SECTION */}
      {/* ------------------------------------------------------------- */}
      {/* <section id="reviews" className="max-w-6xl w-full mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-paisa-lime uppercase tracking-widest">REAL USERS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Be the first to review paisa.
          </h2>
        </div>

        <div className="bg-[#14141c] border border-white/10 p-10 rounded-3xl text-center max-w-2xl mx-auto space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-paisa-card border border-white/10 flex items-center justify-center text-paisa-lime mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No reviews yet</h3>
          <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed max-w-md mx-auto">
            We are just launching! Try paisa today, manage your monthly budgets effortlessly, and be among the first users to share your feedback.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-6 py-3 rounded-full bg-paisa-lime text-black font-bold text-xs hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              Start tracking & share your review
            </button>
          </div>
        </div>
      </section> */}

      {/* ------------------------------------------------------------- */}
      {/* PRE-CTA BANNER CARD */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl w-full mx-auto px-6 pb-20">
        <div className="bg-[#13131b] border border-white/10 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop wondering where your money went.
          </h2>

          <p className="text-sm sm:text-base text-paisa-textMuted max-w-xl mx-auto">
            Set up your first budget in under 3 minutes. Completely free forever — no credit card required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
            >
              <span>Create your free account</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
            <button
              onClick={handleSeeFeatures}
              className="px-8 py-4 rounded-full bg-paisa-card border border-paisa-border text-white font-semibold text-sm hover:bg-paisa-cardHover transition-all"
            >
              See features
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer id="contact" className="border-t border-white/10 bg-[#09090c] py-12 mt-auto">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-1 text-2xl font-bold tracking-tight">
              <span>paisa</span>
              <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block"></span>
            </div>
            <p className="text-xs text-paisa-textMuted leading-relaxed">
              The expense tracker built for how India actually spends.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">PRODUCT</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><button onClick={handleSeeFeatures} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => onOpenAuth('signup')} className="hover:text-white transition-colors">Get Started</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">COMPANY</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><a href="https://aniketghosh-portfolio.vercel.app" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">LEGAL</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><button onClick={onNavigatePrivacy} className="hover:text-white transition-colors">Privacy Policy</button></li>

            </ul>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto px-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-paisa-textMuted gap-4">
          <div>© 2026 paisa. Made in India.</div>
        </div>
      </footer>
    </div>
  );
}
