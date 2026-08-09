import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Lock, CreditCard, ChevronRight, Sparkles, Check, Phone, Layers, Target, PieChart as PieIcon, RefreshCw, Smile, Utensils, Car, ShoppingBag, Wifi, Coffee } from 'lucide-react';

export default function LandingPage({ onLaunchDashboard, onOpenDemoModal }) {
  // Keypad simulation state for ONE-HANDED ENTRY mockup
  const [keypadAmount, setKeypadAmount] = useState('2,400');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  // Interactive budget ring preview state
  const [demoSpend, setDemoSpend] = useState(12460);
  const demoLimit = 18000;
  const demoPercent = Math.round((demoSpend / demoLimit) * 100);

  // Interactive Goal progress state
  const [goalsList, setGoalsList] = useState([
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
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER / NAVBAR (Exact match to reference mockups) */}
      {/* ------------------------------------------------------------- */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-1 text-2xl font-bold tracking-tight cursor-pointer" onClick={onLaunchDashboard}>
          <span className="text-white font-extrabold tracking-tight">paisa</span>
          <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]"></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-paisa-textMuted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#why-paisa" className="hover:text-white transition-colors">Why Paisa</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchDashboard}
            className="px-4 py-2.5 text-xs font-semibold text-black bg-paisa-lime rounded-full hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.35)] flex items-center gap-1.5 transform hover:scale-105"
          >
            <span>Start tracking free</span>
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION 1 (Image 2 style headline + stats) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl w-full mx-auto px-6 pt-12 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paisa-card/90 border border-white/10 text-xs font-medium text-paisa-textMuted">
          <span className="w-2 h-2 rounded-full bg-paisa-lime animate-pulse"></span>
          <span>Everything paisa. does • Built for India's digital generation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Built around how a <span className="text-paisa-lime drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">₹15,000 salary</span> actually moves.
        </h1>

        <p className="text-base sm:text-lg text-paisa-textMuted leading-relaxed max-w-2xl mx-auto">
          Not a generic budget template from somewhere else. Every feature here stems from UPI splits, bills, and the way money actually leaves your account in India.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
          >
            <span>Start tracking — it's free</span>
            <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
          </button>
          <a
            href="#features"
            className="px-8 py-4 rounded-full bg-paisa-card border border-paisa-border text-white font-semibold text-sm hover:bg-paisa-cardHover transition-all flex items-center gap-2"
          >
            <span>See how it works</span>
          </a>
        </div>

        {/* Rating proof */}
        <div className="flex items-center justify-center gap-3 pt-2 text-xs text-paisa-textMuted">
          <div className="flex text-amber-400">
            {'★'.repeat(5)}
          </div>
          <span><strong className="text-white font-semibold">4.8★</strong> from 12,000+ Indians across 50+ cities</span>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-white">₹48L+</div>
            <div className="text-[11px] text-paisa-textMuted mt-1 font-medium">Tracked this month</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-paisa-lime">12k+</div>
            <div className="text-[11px] text-paisa-textMuted mt-1 font-medium">Students & Young Pros</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-white">30sec</div>
            <div className="text-[11px] text-paisa-textMuted mt-1 font-medium">Average Log Expense</div>
          </div>
          <div className="bg-[#13131a] border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-2xl font-extrabold text-amber-400">4.8★</div>
            <div className="text-[11px] text-paisa-textMuted mt-1 font-medium">Average User Rating</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE SPOTLIGHTS (Stacked Sections - Matching Image 1) */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="max-w-6xl w-full mx-auto px-6 py-12 space-y-24">
        {/* SPOTLIGHT 1: UPI-FIRST TRACKING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">UPI-FIRST TRACKING</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Every GPay, PhonePe and Paytm payment, tagged automatically.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              Connect the UPI services you already use and watch as each transaction lands — no manual entry required for the payments that make up most of your month.
            </p>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-paisa-textMuted">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Automatic category breakdown for every transaction</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Works across GPay, PhonePe, Paytm & Bank UPI</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-paisa-lime/20 text-paisa-lime flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Nothing gets lost where your salary goes</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#121218] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-paisa-textMuted border-b border-white/5 pb-3">
                <span>Recent UPI Transactions</span>
                <span className="text-paisa-lime">Synced live</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#191922] border border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-sm font-bold">🍔</div>
                    <div>
                      <div className="font-bold text-white">Swiggy Order</div>
                      <div className="text-[10px] text-paisa-textMuted">Food & Dining • GPay UPI</div>
                    </div>
                  </div>
                  <div className="font-bold text-white">-₹140</div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#191922] border border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm font-bold">🚗</div>
                    <div>
                      <div className="font-bold text-white">Uber Commute</div>
                      <div className="text-[10px] text-paisa-textMuted">Travel & Fuel • PhonePe</div>
                    </div>
                  </div>
                  <div className="font-bold text-white">-₹340</div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#191922] border border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm font-bold">☕</div>
                    <div>
                      <div className="font-bold text-white">First & Reserve Coffee</div>
                      <div className="text-[10px] text-paisa-textMuted">Chai & Coffee • Paytm</div>
                    </div>
                  </div>
                  <div className="font-bold text-white">-₹480</div>
                </div>
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
              Name a goal, set a target, and every rupee you set aside moves the bar. Move the same small heap of progress from zero to 100% before bank account balance gets spent.
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
              {/* Donut Chart visual */}
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

        {/* SPOTLIGHT 5: ONE-HANDED ENTRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/10 pt-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-extrabold tracking-widest text-paisa-textMuted uppercase">ONE-HANDED ENTRY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Log a chai run while you're still holding the cup.
            </h2>
            <p className="text-sm sm:text-base text-paisa-textMuted leading-relaxed">
              The entry screen is built like the UPI payment options you already use. Big numeric key pad — big number, select category icon, tap save. No drop downs or extra steps.
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

              {/* Category tags */}
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

              {/* Numeric Keypad Grid */}
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      if (val === '✓') onLaunchDashboard();
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
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY PAISA SECTION (Matching Image 2) */}
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
              <h3 className="text-lg font-bold text-white">UPI-First, always</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Import your GPay, PhonePe and Paytm spends with zero manual entry. All with key category guessed for you.
              </p>
            </div>

            <div className="bg-[#14141c] border border-white/10 p-7 rounded-3xl space-y-3 hover:border-paisa-lime/30 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-white/10 flex items-center justify-center text-amber-400 text-lg font-bold">
                ⭕
              </div>
              <h3 className="text-lg font-bold text-white">Budgets that don't guilt-trip</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                Set a number, watch the ring fill up. A nudge when you're close; zero shame when you overspend.
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
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIALS SECTION (Matching Image 2) */}
      {/* ------------------------------------------------------------- */}
      <section id="testimonials" className="max-w-6xl w-full mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-paisa-lime uppercase tracking-widest">REAL USERS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            People stop wondering where their salary went.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#14141c] border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
              "I used to check my bank account and get so confused. Now I actually know it was 3 Swiggy orders, not random stuff."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-paisa-lime/20 text-paisa-lime font-bold flex items-center justify-center text-xs">
                P
              </div>
              <div>
                <div className="text-xs font-bold text-white">Priya S.</div>
                <div className="text-[10px] text-paisa-textMuted">Software Engineer</div>
              </div>
            </div>
          </div>

          <div className="bg-[#14141c] border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
              "paisa tracks my UPI payments faster than my bank app notification. Logged in 10 seconds."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-paisa-lime/20 text-paisa-lime font-bold flex items-center justify-center text-xs">
                R
              </div>
              <div>
                <div className="text-xs font-bold text-white">Rohan M.</div>
                <div className="text-[10px] text-paisa-textMuted">Product Designer</div>
              </div>
            </div>
          </div>

          <div className="bg-[#14141c] border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
              "Saved for my Goa trip without a spreadsheet for the first time in my life. The ring is oddly satisfying."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-paisa-lime/20 text-paisa-lime font-bold flex items-center justify-center text-xs">
                A
              </div>
              <div>
                <div className="text-xs font-bold text-white">Ananya R.</div>
                <div className="text-[10px] text-paisa-textMuted">Marketing Lead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PRE-CTA BANNER CARD (Image 1 & Image 2 design, PRICING REMOVED) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-6xl w-full mx-auto px-6 pb-20">
        <div className="bg-[#13131b] border border-white/10 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-paisa-lime/5 via-transparent to-paisa-lime/5 pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop wondering where your salary went.
          </h2>

          <p className="text-sm sm:text-base text-paisa-textMuted max-w-xl mx-auto">
            Set up your first budget in under 3 minutes. Completely free forever — no credit card required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDemoModal}
              className="px-8 py-4 rounded-full bg-paisa-lime text-black font-extrabold text-sm hover:bg-paisa-limeHover transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-2"
            >
              <span>Create your free account</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
            <button
              onClick={onLaunchDashboard}
              className="px-8 py-4 rounded-full bg-paisa-card border border-paisa-border text-white font-semibold text-sm hover:bg-paisa-cardHover transition-all"
            >
              Explore features
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER (Matching Image 1 & Image 2, PRICING REMOVED) */}
      {/* ------------------------------------------------------------- */}
      <footer id="contact" className="border-t border-white/10 bg-[#09090c] py-12">
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
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><button onClick={onOpenDemoModal} className="hover:text-white transition-colors">Get Started</button></li>
              <li><a href="#why-paisa" className="hover:text-white transition-colors">Why Paisa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">COMPANY</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">LEGAL</h4>
            <ul className="space-y-2 text-xs text-paisa-textMuted">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security & Trust</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto px-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-paisa-textMuted gap-4">
          <div>© 2026 paisa. Made in India.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
