import React, { useState } from 'react';
import { Search, Bell, Plus, Utensils, Car, ShoppingBag, Wifi, Briefcase, Home as HomeIcon, Edit3, Trash2, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function HomeDashboard({ user, summary, transactions, goals, onOpenAddModal, onViewAllTransactions, onUpdateBudget, onDeleteTransaction, onNavigateGoals }) {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState(summary?.budget || 35000);
  const [searchQuery, setSearchQuery] = useState('');

  const budget = summary?.budget || 35000;
  const totalSpent = summary?.totalSpent || 0;
  const remaining = summary?.remaining ?? budget;
  const usedPercent = summary?.budgetUsedPercent || 0;

  // Real date calculations
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = Math.max(1, daysInMonth - currentDay);

  // Real today's spend
  const todayDateStr = today.toDateString();
  const spentToday = (transactions || [])
    .filter(t => t.type === 'expense' && new Date(t.date || Date.now()).toDateString() === todayDateStr)
    .reduce((sum, t) => sum + t.amount, 0);

  // Real total income
  const totalIncome = (transactions || [])
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Real average spend per day
  const daysPassed = Math.max(1, currentDay);
  const avgPerDay = Math.round(totalSpent / daysPassed);

  // Real status
  const budgetStatus = usedPercent > 100 ? 'Over budget' : usedPercent > 80 ? 'Near limit' : 'On track';
  const budgetStatusColor = usedPercent > 100 ? 'text-red-400' : usedPercent > 80 ? 'text-amber-400' : 'text-paisa-lime';

  // Calculate real week spend (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);
  const thisWeekSpent = (transactions || [])
    .filter(t => t.type === 'expense' && new Date(t.date || Date.now()) >= oneWeekAgo)
    .reduce((sum, t) => sum + t.amount, 0);

  // Real category breakdown for "Where it's going" pie chart
  const categoryMap = {};
  (transactions || []).filter(t => t.type === 'expense').forEach(t => {
    const cat = t.category || 'Others';
    categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
  });

  const categoryColors = ['#bef264', '#f87171', '#fb923c', '#60a5fa', '#c084fc', '#34d399'];
  const whereItsGoingData = Object.keys(categoryMap).map((cat, idx) => ({
    name: cat,
    amount: categoryMap[cat],
    color: categoryColors[idx % categoryColors.length]
  }));

  // Real daily breakdown for the week graph
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyDailyMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  (transactions || []).filter(t => t.type === 'expense').forEach(t => {
    const d = new Date(t.date || Date.now());
    weeklyDailyMap[d.getDay()] += t.amount;
  });

  const maxDayAmount = Math.max(...Object.values(weeklyDailyMap), 1);
  const currentDayIndex = today.getDay();
  // Display ordered Mon -> Sun
  const orderedDays = [1, 2, 3, 4, 5, 6, 0];
  const weeklyData = orderedDays.map(dayIdx => {
    const amt = weeklyDailyMap[dayIdx];
    const heightPct = Math.max(10, Math.round((amt / maxDayAmount) * 100));
    return {
      day: daysOfWeek[dayIdx],
      height: `${heightPct}%`,
      active: dayIdx === currentDayIndex
    };
  });

  // Filter transactions based on top search bar
  const displayedTransactions = (transactions || []).filter(tx => 
    tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tx.category && tx.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (newBudgetInput > 0) {
      onUpdateBudget(Number(newBudgetInput));
      setShowBudgetModal(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = category ? category.toLowerCase() : '';
    if (cat.includes('food')) return <Utensils className="w-4 h-4 text-amber-400" />;
    if (cat.includes('travel')) return <Car className="w-4 h-4 text-amber-400" />;
    if (cat.includes('shopping')) return <ShoppingBag className="w-4 h-4 text-purple-400" />;
    if (cat.includes('bills') || cat.includes('rent')) return <Wifi className="w-4 h-4 text-blue-400" />;
    if (cat.includes('income') || cat.includes('freelance') || cat.includes('salary')) return <Briefcase className="w-4 h-4 text-paisa-lime" />;
    return <HomeIcon className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-paisa-textMuted font-medium">Good evening</div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
            <span>{user?.name ? user.name.split(' ')[0] : 'User'}</span>
            <span>👋</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Real Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-paisa-textMuted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search transactions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#121217] border border-[#1e1e26] rounded-xl text-xs text-white placeholder-paisa-textMuted/60 focus:outline-none focus:border-paisa-lime w-48 sm:w-60"
            />
          </div>

          {/* Month Indicator */}
          <div className="bg-[#121217] border border-[#1e1e26] text-xs font-semibold text-white px-3.5 py-2 rounded-xl">
            {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>

          {/* Notification Bell */}
          <button className="w-9 h-9 rounded-xl bg-[#121217] border border-[#1e1e26] flex items-center justify-center text-paisa-textMuted hover:text-white transition-all">
            <Bell className="w-4 h-4" />
          </button>

          {/* Add Expense Lime Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-extrabold text-xs flex items-center gap-1.5 hover:bg-paisa-limeHover transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add expense</span>
          </button>
        </div>
      </div>

      {/* Grid Row 1: Left Big Budget Card (8 cols) + Right 2 Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Budget Left Card */}
        <div className="lg:col-span-8 bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl relative flex flex-col justify-between space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Left to spend this month</h2>
              <div className="text-xs text-paisa-textMuted mt-0.5 font-medium">of ₹{budget.toLocaleString()} budget</div>
            </div>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="text-xs font-semibold text-paisa-lime hover:underline"
            >
              Update budget
            </button>
          </div>

          {/* Gauge and Stats Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
            {/* Donut Gauge Ring */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#1c1c26"
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
                  strokeDashoffset={251.2 - (251.2 * Math.max(0, 100 - usedPercent)) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-white tracking-tight">₹{remaining.toLocaleString()}</span>
                <span className="text-[11px] text-paisa-textMuted font-semibold mt-0.5">{usedPercent}% used</span>
              </div>
            </div>

            {/* Grid of 6 REAL Metrics */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 w-full text-left">
              <div>
                <div className="text-lg font-extrabold text-white">₹{totalSpent.toLocaleString()}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Spent</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">₹{remaining.toLocaleString()}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Remaining</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">{daysLeft}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Days left</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">₹{avgPerDay.toLocaleString()}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Avg / day</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">₹{totalIncome.toLocaleString()}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Income logged</div>
              </div>

              <div>
                <div className={`text-lg font-extrabold ${budgetStatusColor}`}>{budgetStatus}</div>
                <div className="text-[11px] text-paisa-textMuted font-medium">Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Stacked Dynamic Cards */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          {/* Card 1: Real Spent Today */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#1c1c26] border border-[#2a2a38] flex items-center justify-center text-xs">
                📅
              </div>
              <span className="px-2 py-0.5 rounded-full bg-paisa-lime/10 border border-paisa-lime/20 text-[10px] font-bold text-paisa-lime">
                Today
              </span>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">₹{spentToday.toLocaleString()}</div>
              <div className="text-[11px] text-paisa-textMuted font-medium mt-0.5">Spent today</div>
            </div>
          </div>

          {/* Card 2: Real This Week */}
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#1c1c26] border border-[#2a2a38] flex items-center justify-center text-xs">
                📊
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                7 Days
              </span>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">₹{thisWeekSpent.toLocaleString()}</div>
              <div className="text-[11px] text-paisa-textMuted font-medium mt-0.5">This week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 2: "Where it's going" Pie Chart (6 cols) + "This week" Bar Graph (6 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic Where it's going card */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Where it's going</h2>
            <button onClick={onViewAllTransactions} className="text-xs text-paisa-textMuted hover:text-white">See all</button>
          </div>

          {whereItsGoingData.length === 0 ? (
            <div className="text-center py-8 text-paisa-textMuted text-xs space-y-2">
              <p>No expense categories logged yet.</p>
              <button onClick={onOpenAddModal} className="text-paisa-lime font-semibold hover:underline">
                + Add your first expense
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              {/* Doughnut Chart */}
              <div className="w-36 h-36 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={whereItsGoingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={62}
                      paddingAngle={3}
                      dataKey="amount"
                    >
                      {whereItsGoingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#121217" strokeWidth={2} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-white">{whereItsGoingData.length}</span>
                  <span className="text-[9px] text-paisa-textMuted font-medium">cats</span>
                </div>
              </div>

              {/* Dynamic Category breakdown legend */}
              <div className="space-y-2.5 flex-1 text-xs max-h-36 overflow-y-auto pr-1">
                {whereItsGoingData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate max-w-[130px]">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="text-paisa-textMuted font-medium truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-white">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic This week bar chart card */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">This week</h2>
            <span className="text-xs text-paisa-textMuted font-semibold">₹{thisWeekSpent.toLocaleString()} total</span>
          </div>

          <div className="flex items-end justify-between h-36 pt-4 px-2">
            {weeklyData.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full max-w-[28px] bg-[#1a1a24] rounded-t-lg relative flex items-end h-28">
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-t-lg transition-all ${
                      bar.active ? 'bg-paisa-lime shadow-[0_0_10px_rgba(204,255,0,0.4)]' : 'bg-[#222230]'
                    }`}
                  ></div>
                </div>
                <span className={`text-[10px] font-semibold ${bar.active ? 'text-white' : 'text-paisa-textMuted'}`}>
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 3: Dynamic Savings Goals (6 cols) + Dynamic Recent Activity (6 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic Savings Goals */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Savings goals</h2>
            <button onClick={onNavigateGoals} className="text-xs text-paisa-textMuted hover:text-white font-medium">See all</button>
          </div>

          {(!goals || goals.length === 0) ? (
            <div className="text-center py-8 text-paisa-textMuted text-xs space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#1c1c26] mx-auto flex items-center justify-center text-paisa-lime">
                <Target className="w-4 h-4" />
              </div>
              <p>No savings goals created yet.</p>
              <button
                onClick={onNavigateGoals}
                className="text-paisa-lime font-semibold hover:underline"
              >
                + Create your first savings goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {goals.slice(0, 3).map((goal) => {
                const percent = Math.min(100, Math.round((goal.savedAmount / (goal.targetAmount || 1)) * 100));
                return (
                  <div key={goal._id} className="bg-[#16161d] border border-[#22222e] rounded-2xl p-3.5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-[#1f1f2c] flex items-center justify-center text-sm">🎯</div>
                      <div>
                        <div className="text-xs font-bold text-white truncate">{goal.title}</div>
                        <div className="text-[10px] text-paisa-textMuted font-medium">
                          ₹{goal.savedAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-[#20202d] h-1.5 rounded-full overflow-hidden">
                        <div style={{ width: `${percent}%` }} className="bg-paisa-lime h-full rounded-full"></div>
                      </div>
                      <div className="text-[9px] text-paisa-textMuted font-semibold">{percent}% there</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Recent Activity List */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Recent activity</h2>
            <button onClick={onViewAllTransactions} className="text-xs text-paisa-textMuted hover:text-white font-medium">View all</button>
          </div>

          {displayedTransactions.length === 0 ? (
            <div className="text-center py-6 text-paisa-textMuted text-xs space-y-2">
              <p>No transactions logged yet.</p>
              <button onClick={onOpenAddModal} className="text-paisa-lime hover:underline font-semibold">
                + Add expense
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedTransactions.slice(0, 4).map((tx) => (
                <div key={tx._id} className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#181822] transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#1a1a24] border border-[#262634] flex items-center justify-center shrink-0">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{tx.title}</div>
                      <div className="text-[10px] text-paisa-textMuted">
                        {tx.date ? new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'} • {tx.paymentMethod || 'UPI'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${tx.type === 'income' ? 'text-paisa-lime' : 'text-white'}`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                    </span>
                    {onDeleteTransaction && (
                      <button
                        onClick={() => onDeleteTransaction(tx._id)}
                        className="opacity-0 group-hover:opacity-100 text-paisa-textMuted hover:text-red-400 transition-opacity p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Budget Modal */}
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
                  value={newBudgetInput}
                  onChange={(e) => setNewBudgetInput(e.target.value)}
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
