import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, ChevronDown, PieChart as PieChartIcon, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function InsightsDashboard({ insightsData, user, transactions, investments }) {
  // Helper: Get dynamic month options from user creation date
  const getAvailableMonths = () => {
    const today = new Date();
    const createdDate = user?.createdAt ? new Date(user.createdAt) : (
      transactions && transactions.length > 0
        ? new Date(Math.min(...transactions.map(t => new Date(t.date || Date.now()))))
        : new Date()
    );

    const startYear = createdDate.getFullYear();
    const startMonth = createdDate.getMonth();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const months = [];
    let dateIter = new Date(currentYear, currentMonth, 1);
    const minDate = new Date(startYear, startMonth, 1);

    while (dateIter >= minDate) {
      const monthLabel = dateIter.toLocaleString('default', { month: 'long', year: 'numeric' });
      const monthValue = `${dateIter.getFullYear()}-${String(dateIter.getMonth() + 1).padStart(2, '0')}`;
      months.push({ label: monthLabel, value: monthValue });
      dateIter.setMonth(dateIter.getMonth() - 1);
    }

    return months.length > 0 ? months : [{
      label: today.toLocaleString('default', { month: 'long', year: 'numeric' }),
      value: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
    }];
  };

  const monthOptions = getAvailableMonths();
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);

  // Parse selected month
  const selectedYearNum = parseInt(selectedMonth.split('-')[0], 10);
  const selectedMonthNum = parseInt(selectedMonth.split('-')[1], 10) - 1;

  // Filter transactions strictly for the selected month
  const monthTransactions = (transactions || []).filter(t => {
    const d = new Date(t.date || Date.now());
    return d.getFullYear() === selectedYearNum && d.getMonth() === selectedMonthNum;
  });

  const monthExpenses = monthTransactions.filter(t => t.type === 'expense');
  const monthTotalSpent = monthExpenses.reduce((sum, t) => sum + t.amount, 0);

  // Dynamic category breakdown for EXPENSES
  const expenseCategoryMap = {};
  monthExpenses.forEach(t => {
    const cat = t.category || 'Others';
    expenseCategoryMap[cat] = (expenseCategoryMap[cat] || 0) + t.amount;
  });

  const defaultColors = ['#bef264', '#f87171', '#fb923c', '#60a5fa', '#c084fc', '#34d399', '#9ca3af'];
  const expenseCategoryData = Object.keys(expenseCategoryMap).map((cat, idx) => {
    const amt = expenseCategoryMap[cat];
    const percentage = monthTotalSpent > 0 ? Math.round((amt / monthTotalSpent) * 100) : 0;
    return {
      name: cat,
      amount: amt,
      percentage,
      color: defaultColors[idx % defaultColors.length]
    };
  });

  // Dynamic category breakdown for INVESTMENTS
  const investmentCategoryMap = {};
  (investments || []).forEach(inv => {
    const cat = inv.category || 'Others';
    investmentCategoryMap[cat] = (investmentCategoryMap[cat] || 0) + inv.currentValue;
  });

  const totalInvestedValue = (investments || []).reduce((sum, inv) => sum + inv.currentValue, 0);
  const invColors = ['#60a5fa', '#bef264', '#fb923c', '#34d399', '#c084fc', '#f87171', '#9ca3af'];

  const investmentCategoryData = Object.keys(investmentCategoryMap).map((cat, idx) => {
    const val = investmentCategoryMap[cat];
    const percentage = totalInvestedValue > 0 ? Math.round((val / totalInvestedValue) * 100) : 0;
    return {
      name: cat,
      amount: val,
      percentage,
      color: invColors[idx % invColors.length]
    };
  });

  // Calculate dynamic top merchants for selected month
  const merchantMap = {};
  monthExpenses.forEach(t => {
    const merch = t.merchant || t.title || 'Unknown';
    merchantMap[merch] = (merchantMap[merch] || 0) + t.amount;
  });

  const topMerchants = Object.keys(merchantMap)
    .map(m => ({ merchant: m, total: merchantMap[m] }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Dynamic 80% Budget Alert Check
  const budget = user?.monthlyBudget || 35000;
  const budgetUsedPercent = budget > 0 ? Math.round((monthTotalSpent / budget) * 100) : 0;
  const budgetAlertActive = user?.budgetAlerts !== false && budgetUsedPercent >= 80;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title & Functional Month Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Insights Dashboard</h1>
          <p className="text-xs text-paisa-textMuted mt-0.5">Real-time analytical insights for Expenses & Investments</p>
        </div>
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[#121217] border border-[#1e1e26] text-xs font-semibold text-white px-3.5 py-2 rounded-xl focus:outline-none focus:border-paisa-lime cursor-pointer"
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 80% Budget Threshold Notification Banner */}
      {budgetAlertActive && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 shadow-xl flex items-start gap-4 animate-in fade-in duration-200">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-400">
              ⚠️ Budget Alert: You have used {budgetUsedPercent}% of your monthly budget!
            </h3>
            <p className="text-xs text-paisa-textMuted leading-relaxed">
              You have spent ₹{monthTotalSpent.toLocaleString()} out of your ₹{budget.toLocaleString()} monthly target budget for this period. Keep an eye on non-essential spending.
            </p>
          </div>
        </div>
      )}

      {/* Two Column Grid: EXPENSES vs INVESTMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXPENSES BREAKDOWN CARD */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Expense Breakdown</h2>
            <span className="text-xs font-extrabold text-red-400">₹{monthTotalSpent.toLocaleString()}</span>
          </div>

          {expenseCategoryData.length === 0 ? (
            <div className="text-center py-10 text-paisa-textMuted text-xs space-y-2">
              <PieChartIcon className="w-8 h-8 mx-auto text-paisa-textMuted/40" />
              <p>No expense data logged for this month.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-44 h-44 mx-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="amount"
                    >
                      {expenseCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#121217" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-white">₹{(monthTotalSpent / 1000).toFixed(1)}k</span>
                  <span className="text-[9px] text-paisa-textMuted">Expenses</span>
                </div>
              </div>

              <div className="space-y-2 text-xs max-h-40 overflow-y-auto pr-1">
                {expenseCategoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#181822] border border-[#222230]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-paisa-textMuted text-[11px]">₹{cat.amount.toLocaleString()}</span>
                      <span className="font-bold text-white w-8 text-right">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* INVESTMENTS BREAKDOWN CARD */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Investment Portfolio</h2>
            <span className="text-xs font-extrabold text-paisa-lime">₹{totalInvestedValue.toLocaleString()}</span>
          </div>

          {investmentCategoryData.length === 0 ? (
            <div className="text-center py-10 text-paisa-textMuted text-xs space-y-2">
              <TrendingUp className="w-8 h-8 mx-auto text-paisa-textMuted/40" />
              <p>No investments created yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-44 h-44 mx-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={investmentCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="amount"
                    >
                      {investmentCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#121217" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-white">₹{(totalInvestedValue / 1000).toFixed(1)}k</span>
                  <span className="text-[9px] text-paisa-textMuted">Invested</span>
                </div>
              </div>

              <div className="space-y-2 text-xs max-h-40 overflow-y-auto pr-1">
                {investmentCategoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#181822] border border-[#222230]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-paisa-textMuted text-[11px]">₹{cat.amount.toLocaleString()}</span>
                      <span className="font-bold text-white w-8 text-right">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Expense Merchants */}
      <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white">Top Expense Merchants</h2>
        {topMerchants.length === 0 ? (
          <div className="text-center py-6 text-paisa-textMuted text-xs">
            No merchant data logged for this month.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topMerchants.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#181822] border border-[#222230] text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-[#121217] border border-[#1e1e26] flex items-center justify-center font-bold text-paisa-lime text-xs">
                    #{idx + 1}
                  </div>
                  <div className="font-bold text-white truncate max-w-[100px]">{item.merchant}</div>
                </div>
                <div className="font-bold text-white">-₹{item.total.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
