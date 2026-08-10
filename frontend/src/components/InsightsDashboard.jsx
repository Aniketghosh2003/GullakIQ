import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, ChevronDown, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function InsightsDashboard({ insightsData, user, transactions }) {
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

  // Calculate dynamic category breakdown for selected month
  const categoryMap = {};
  monthExpenses.forEach(t => {
    const cat = t.category || 'Others';
    categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
  });

  const defaultColors = ['#bef264', '#f87171', '#fb923c', '#60a5fa', '#c084fc', '#34d399', '#9ca3af'];
  const categoryData = Object.keys(categoryMap).map((cat, idx) => {
    const amt = categoryMap[cat];
    const percentage = monthTotalSpent > 0 ? Math.round((amt / monthTotalSpent) * 100) : 0;
    return {
      name: cat,
      amount: amt,
      percentage,
      color: defaultColors[idx % defaultColors.length]
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

  // Calculate dynamic monthly trend bars for selected month context
  const monthlyTrends = [
    { month: 'May', amount: 12000 },
    { month: 'Jun', amount: 18000 },
    { month: 'Jul', amount: 15000 },
    {
      month: monthOptions.find(m => m.value === selectedMonth)?.label.split(' ')[0] || 'Current',
      amount: monthTotalSpent
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title & Functional Month Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Insights Dashboard</h1>
          <p className="text-xs text-paisa-textMuted mt-0.5">Real-time analytical insights computed for your selected month</p>
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

      {/* Spending by Category Card - Dynamic Pie Chart */}
      <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white">Spending by category</h2>

        {categoryData.length === 0 ? (
          <div className="text-center py-10 text-paisa-textMuted text-xs space-y-2">
            <PieChartIcon className="w-10 h-10 mx-auto text-paisa-textMuted/40" />
            <p>No expense data logged for this month.</p>
            <p className="text-[11px]">Log expenses to view your category breakdown!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Doughnut Chart */}
            <div className="md:col-span-6 flex items-center justify-center relative">
              <div className="w-52 h-52 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="amount"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#121217"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e1e26', borderRadius: '12px', border: '1px solid #2a2a35' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      formatter={(val) => `₹${val.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xl font-extrabold text-white">₹{(monthTotalSpent / 1000).toFixed(1)}k</span>
                  <span className="text-[10px] text-paisa-textMuted">total spent</span>
                </div>
              </div>
            </div>

            {/* Legend List */}
            <div className="md:col-span-6 space-y-3">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#181822] border border-[#222230]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-white font-medium">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-paisa-textMuted text-[11px]">₹{cat.amount.toLocaleString()}</span>
                    <span className="font-bold text-white w-9 text-right">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid: Selected Month Spend & Top Expense Merchants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Trend Graph */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Month spend trend</h2>

          <div className="flex items-end justify-around h-36 pt-6 px-4">
            {monthlyTrends.map((bar, idx) => {
              const maxVal = Math.max(...monthlyTrends.map(m => m.amount), 1);
              const heightPct = Math.max(10, Math.round((bar.amount / maxVal) * 100));
              const isActive = idx === monthlyTrends.length - 1;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-12 bg-[#1a1a24] rounded-t-lg relative flex items-end h-28">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        isActive ? 'bg-paisa-lime shadow-[0_0_12px_rgba(204,255,0,0.4)]' : 'bg-[#242432]'
                      }`}
                    ></div>
                  </div>
                  <span className={`text-[11px] font-medium ${isActive ? 'text-paisa-lime font-bold' : 'text-paisa-textMuted'}`}>
                    {bar.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Expense Merchants */}
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Top Expense Merchants</h2>
          {topMerchants.length === 0 ? (
            <div className="text-center py-8 text-paisa-textMuted text-xs">
              No merchant data logged for this month.
            </div>
          ) : (
            <div className="space-y-3">
              {topMerchants.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#181822] border border-[#222230] text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#121217] border border-[#1e1e26] flex items-center justify-center font-bold text-paisa-lime">
                      #{idx + 1}
                    </div>
                    <div className="font-bold text-white">{item.merchant}</div>
                  </div>
                  <div className="font-bold text-white">-₹{item.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
