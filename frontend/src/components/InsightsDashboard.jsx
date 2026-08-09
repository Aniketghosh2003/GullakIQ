import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, ChevronDown, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from 'recharts';

export default function InsightsDashboard({ insightsData }) {
  const [selectedMonth, setSelectedMonth] = useState('August');

  // Dynamic category breakdown from backend response
  const categoryData = insightsData?.categoryBreakdown || [];
  const topMerchants = insightsData?.topMerchants || [];
  const nudges = insightsData?.nudges || [];
  const monthlyTrends = insightsData?.monthlyTrends || [
    { month: 'May', amount: 12000 },
    { month: 'Jun', amount: 18000 },
    { month: 'Jul', amount: 15000 },
    { month: 'Aug', amount: insightsData?.summary?.totalSpent || 0 }
  ];

  const totalSpent = insightsData?.summary?.totalSpent || 0;

  // Fallback colors array
  const defaultColors = ['#bef264', '#f87171', '#fb923c', '#60a5fa', '#c084fc', '#34d399', '#9ca3af'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title & Month Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Insights Dashboard</h1>
          <p className="text-xs text-paisa-textMuted mt-0.5">Real-time analytical insights computed from your logged transactions</p>
        </div>
        <div className="relative">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paisa-surface border border-paisa-border text-xs font-semibold text-white hover:bg-paisa-card transition-all">
            <span>{selectedMonth}</span>
            <ChevronDown className="w-3.5 h-3.5 text-paisa-textMuted" />
          </button>
        </div>
      </div>

      {/* Spending by Category Card - Dynamic Pie Chart */}
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white">Spending by category</h2>

        {categoryData.length === 0 ? (
          <div className="text-center py-10 text-paisa-textMuted text-xs space-y-2">
            <PieChartIcon className="w-10 h-10 mx-auto text-paisa-textMuted/40" />
            <p>No expense data available to calculate pie chart.</p>
            <p className="text-[11px]">Log expenses in your dashboard to view instant category breakdown!</p>
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
                          fill={entry.color || defaultColors[index % defaultColors.length]}
                          stroke="#15151b"
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
                  <span className="text-xl font-extrabold text-white">₹{(totalSpent / 1000).toFixed(1)}k</span>
                  <span className="text-[10px] text-paisa-textMuted">total spent</span>
                </div>
              </div>
            </div>

            {/* Legend List */}
            <div className="md:col-span-6 space-y-3">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-paisa-card/40 border border-paisa-border/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: cat.color || defaultColors[idx % defaultColors.length] }}></span>
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

      {/* Dynamic Smart Nudges */}
      <div className="space-y-3">
        {nudges.map((nudge) => (
          <div
            key={nudge.id}
            className={`border rounded-3xl p-5 shadow-xl flex items-start gap-4 ${
              nudge.type === 'warning'
                ? 'bg-red-950/20 border-red-500/20'
                : 'bg-paisa-surface border-paisa-border'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-paisa-border flex items-center justify-center shrink-0">
              <AlertTriangle className={`w-5 h-5 ${nudge.type === 'warning' ? 'text-red-400' : 'text-paisa-lime'}`} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-white">{nudge.title}</h3>
              <p className="text-[11px] text-paisa-textMuted leading-relaxed">
                {nudge.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Last 4 Months & Top Expense Merchants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Last 4 Months Bar Graph */}
        <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Last 4 months spend</h2>

          <div className="flex items-end justify-around h-36 pt-6 px-4">
            {monthlyTrends.map((bar, idx) => {
              const maxVal = Math.max(...monthlyTrends.map(m => m.amount), 1);
              const heightPct = Math.max(10, Math.round((bar.amount / maxVal) * 100));
              const isActive = idx === monthlyTrends.length - 1;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-12 bg-paisa-card rounded-t-lg relative flex items-end h-28">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        isActive ? 'bg-paisa-lime shadow-[0_0_12px_rgba(204,255,0,0.4)]' : 'bg-paisa-subtle'
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
        <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Top Expense Merchants</h2>
          {topMerchants.length === 0 ? (
            <div className="text-center py-8 text-paisa-textMuted text-xs">
              No merchant data logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {topMerchants.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-paisa-card/60 border border-paisa-border/50 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-paisa-surface border border-paisa-border flex items-center justify-center font-bold text-paisa-lime">
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
