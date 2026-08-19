import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function FeaturesPage({ onOpenAuth, onNavigateHome, onNavigatePrivacy }) {
  // Keypad simulation state for ONE-HANDED ENTRY
  const [keypadAmount, setKeypadAmount] = useState('2,400');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  // Interactive budget ring preview state
  const [demoSpend, setDemoSpend] = useState(12460);
  const demoLimit = 18000;
  const demoPercent = Math.round((demoSpend / demoLimit) * 100);

  // Interactive Goal progress state
  const [goalsList] = useState([
    { name: 'Goa Trip', percent: 35, saved: '₹7,000', target: '₹20,000', color: 'bg-[#ccff00]' },
    { name: 'New Phone', percent: 67, saved: '₹26,800', target: '₹40,000', color: 'bg-indigo-400' },
    { name: 'Emergency Fund', percent: 50, saved: '₹25,000', target: '₹50,000', color: 'bg-emerald-400' },
  ]);

  const handleKeypadPress = (val) => {
    if (val === 'C') {
      setKeypadAmount('0');
    } else {
      setKeypadAmount((prev) => (prev === '0' || prev === '2,400' ? val : prev + val));
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white flex flex-col font-sans selection:bg-paisa-lime selection:text-black">
      {/* Hero Header matching Image 1 */}
      <section className="max-w-6xl w-full mx-auto px-6 pt-12 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paisa-card/90 border border-white/10 text-xs font-medium text-paisa-textMuted">
          <span className="w-2 h-2 rounded-full bg-paisa-lime animate-pulse"></span>
          <span>Everything paisa. does</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Built around how a <span className="text-paisa-lime drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">₹15,000 salary</span> actually moves.
        </h1>

        <p className="text-base sm:text-lg text-paisa-textMuted leading-relaxed max-w-2xl mx-auto">
          Not a generic budget template from somewhere else. Every feature here stems from split bills, chai runs, and the way money actually leaves your account in India.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
          >
            <span>Start tracking free</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>
      </section>

      {/* Stacked Feature Spotlights */}
      <section className="max-w-6xl w-full mx-auto px-6 py-8 space-y-24">
        
        {/* SPOTLIGHT 1: ONE-HANDED ENTRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">ONE-HANDED ENTRY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Log a chai run while you're still holding the cup.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              The entry screen is built like quick payment options you already use. Big numeric keypad — big number, select category icon, tap save. No dropdowns or extra steps.
            </p>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-paisa-textMuted">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Amount, category, payment method — three taps</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Instant category selection buttons (Food, Transport, Chai, Bills)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Built for quick input on the move</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto space-y-4">
              <div className="text-center py-4 bg-[#181822] rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs text-paisa-textMuted uppercase tracking-wider font-semibold">Amount to Log</span>
                <div className="text-3xl font-extrabold text-white">₹{keypadAmount}</div>
              </div>

              <div className="flex justify-center gap-2">
                {['Food', 'Travel', 'Shopping'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-paisa-lime text-black shadow-md'
                        : 'bg-[#1a1a24] text-paisa-textMuted border border-white/5'
                    }`}
                  >
                    {cat === 'Food' ? '🍔 Food' : cat === 'Travel' ? '⚡ Travel' : '🛍️ Shopping'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      if (val === '✓') onOpenAuth('signup');
                      else handleKeypadPress(val);
                    }}
                    className={`py-3 rounded-2xl text-base font-extrabold transition-all border ${
                      val === '✓'
                        ? 'bg-paisa-lime text-black border-paisa-lime shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                        : 'bg-[#181822] text-white border-white/5 hover:bg-[#222230]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SPOTLIGHT 2: BUDGETS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5 lg:order-2">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">BUDGETS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              A ring that fills up, not a spreadsheet that shames you.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              Set one monthly number for your whole budget or per category. Watch the ring move as you spend, and get a gentle nudge before you go over — no red alert, just clarity in a glance.
            </p>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-paisa-textMuted">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Whole month or per-category budgets</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Clear status at 65% - 85% - 100% threshold</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Soft warning before you hit the max limit</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="bg-[#121218] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1f1f2a" strokeWidth="9" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#ccff00"
                    strokeWidth="9"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * demoPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-white">₹{demoSpend.toLocaleString()}</span>
                  <span className="text-xs text-paisa-textMuted mt-1">69% used of ₹{demoLimit.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDemoSpend((prev) => Math.min(demoLimit, prev + 1000))}
                  className="px-3 py-1.5 text-xs font-semibold bg-paisa-card border border-white/10 text-white rounded-xl hover:bg-paisa-lime/20 hover:text-paisa-lime transition-all"
                >
                  + Add ₹1,000 spend
                </button>
                <button
                  onClick={() => setDemoSpend(12460)}
                  className="px-3 py-1.5 text-xs font-semibold bg-paisa-card border border-white/10 text-paisa-textMuted rounded-xl hover:text-white transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SPOTLIGHT 3: GOALS & SAVINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">GOALS & SAVINGS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Goa trip, new phone, emergency fund — as a countdown, not a chore.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              Name a goal, set a target, and every rupee you set aside moves the bar. Move progress from zero to 100% before bank account balance gets spent.
            </p>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-paisa-textMuted">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Unlimited goals, total control over target date</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Suggests a weekly amount for your deadline</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Move money between goals or spend</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="text-xs font-semibold text-paisa-textMuted border-b border-white/5 pb-3 flex justify-between items-center">
                <span>Active Goals Tracker</span>
                <span className="text-paisa-lime">Target Driven</span>
              </div>
              {goalsList.map((g, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>{g.name}</span>
                    <span className="text-paisa-lime">{g.percent}%</span>
                  </div>
                  <div className="w-full bg-[#1c1c26] h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${g.percent}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${g.color}`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-paisa-textMuted">
                    <span>{g.saved} saved</span>
                    <span>Target: {g.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPOTLIGHT 4: INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5 lg:order-2">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">INSIGHTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Know if it's the rent or the 9pm Swiggy habit.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              A clean category breakdown and week-over-week trend, so a bad month has an explanation, not a mysterious void where the salary went.
            </p>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-paisa-textMuted">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Category breakdowns & week-over-week trends</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Month-on-month comparison with previous balance</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Plain-language nudges, zero jargon graphs</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center justify-around">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#bef264" strokeWidth="10" strokeDasharray="238.6" strokeDashoffset="80" fill="transparent" />
                  <circle cx="50" cy="50" r="38" stroke="#f87171" strokeWidth="10" strokeDasharray="238.6" strokeDashoffset="170" fill="transparent" />
                  <circle cx="50" cy="50" r="38" stroke="#fb923c" strokeWidth="10" strokeDasharray="238.6" strokeDashoffset="210" fill="transparent" />
                </svg>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#bef264]"></span>
                  <span className="text-white font-medium">Food & Swiggy (45%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f87171]"></span>
                  <span className="text-white font-medium">House Rent (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#fb923c]"></span>
                  <span className="text-white font-medium">Shopping & Lifestyle (20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Pre-CTA Banner Card */}
      <section className="max-w-6xl w-full mx-auto px-6 py-16">
        <div className="bg-[#13131b] border border-white/10 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            See it work on your own money.
          </h2>

          <p className="text-sm sm:text-base text-paisa-textMuted max-w-xl mx-auto">
            Set up your first budget in under 3 minutes. Completely free forever.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
            >
              <span>Create your free account</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 bg-[#09090c] py-12 mt-auto">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-1 text-2xl font-bold tracking-tight cursor-pointer" onClick={onNavigateHome}>
              <span>GullakIQ</span>
              <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block"></span>
            </div>
            <p className="text-xs text-paisa-textMuted leading-relaxed">
              The expense tracker built for how India actually spends.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">PRODUCT</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><button onClick={onNavigateHome} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onOpenAuth('signup')} className="hover:text-white transition-colors">Get Started</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">COMPANY</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">LEGAL</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><button onClick={onNavigatePrivacy} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
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
