import React, { useState } from 'react';
import { TrendingUp, Plus, Building2, Coins, Landmark, PieChart as PieIcon, ShieldAlert, Award, ArrowUpRight, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function InvestmentsView() {
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Nifty 50 Index Fund', category: 'Mutual Funds', invested: 45000, current: 52400, returns: 16.4 },
    { id: 2, name: 'Tata Motors Shares', category: 'Stocks', invested: 25000, current: 28900, returns: 15.6 },
    { id: 3, name: 'Sovereign Gold Bonds (SGB)', category: 'Gold & Silver', invested: 30000, current: 34500, returns: 15.0 },
    { id: 4, name: 'PPF (Public Provident Fund)', category: 'Bonds & Fixed Income', invested: 50000, current: 53500, returns: 7.1 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Stocks');
  const [investedAmount, setInvestedAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const indianCategories = [
    { id: 'Stocks', label: 'Stocks (Equity)', icon: TrendingUp, color: '#bef264' },
    { id: 'Mutual Funds', label: 'Mutual Funds / ETFs', icon: PieIcon, color: '#60a5fa' },
    { id: 'Gold & Silver', label: 'Gold & Silver (SGB / Digital)', icon: Coins, color: '#fb923c' },
    { id: 'Bonds & Fixed Income', label: 'Bonds / FDs / PPF / EPF', icon: Landmark, color: '#34d399' },
    { id: 'Real Estate', label: 'Real Estate / REITs', icon: Building2, color: '#c084fc' },
    { id: 'Crypto & New Age', label: 'Crypto & Digital Assets', icon: Award, color: '#f87171' },
    { id: 'Others', label: 'Other Investments', icon: ShieldAlert, color: '#9ca3af' },
  ];

  const totalInvested = investments.reduce((sum, item) => sum + item.invested, 0);
  const totalCurrent = investments.reduce((sum, item) => sum + item.current, 0);
  const totalProfit = totalCurrent - totalInvested;
  const overallReturns = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(1) : 0;

  // Category breakdown for chart
  const categoryBreakdownMap = {};
  investments.forEach(inv => {
    categoryBreakdownMap[inv.category] = (categoryBreakdownMap[inv.category] || 0) + inv.current;
  });

  const chartData = Object.keys(categoryBreakdownMap).map(cat => {
    const found = indianCategories.find(c => c.id === cat);
    return {
      name: cat,
      value: categoryBreakdownMap[cat],
      color: found ? found.color : '#bef264'
    };
  });

  const handleAddInvestment = (e) => {
    e.preventDefault();
    if (!name || !investedAmount) return;

    const invested = Number(investedAmount);
    const current = Number(currentValue || investedAmount);
    const returns = invested > 0 ? (((current - invested) / invested) * 100).toFixed(1) : 0;

    const newItem = {
      id: Date.now(),
      name,
      category,
      invested,
      current,
      returns: Number(returns)
    };

    setInvestments(prev => [newItem, ...prev]);
    setName('');
    setInvestedAmount('');
    setCurrentValue('');
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setInvestments(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-paisa-textMuted uppercase tracking-wider">Portfolio</span>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Investments</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-paisa-lime text-black font-extrabold text-xs flex items-center gap-1.5 hover:bg-paisa-limeHover transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add investment</span>
        </button>
      </div>

      {/* 3 Summary Cards matching app theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Total Invested</div>
          <div className="text-2xl font-extrabold text-white">₹{totalInvested.toLocaleString()}</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Current Portfolio Value</div>
          <div className="text-2xl font-extrabold text-white">₹{totalCurrent.toLocaleString()}</div>
        </div>

        <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-5 shadow-xl space-y-1">
          <div className="text-[10px] text-paisa-textMuted font-bold uppercase tracking-wider">Total Profit / Loss</div>
          <div className={`text-2xl font-extrabold flex items-center gap-1 ${totalProfit >= 0 ? 'text-paisa-lime' : 'text-red-400'}`}>
            <span>{totalProfit >= 0 ? '+' : ''}₹{totalProfit.toLocaleString()}</span>
            <span className="text-xs font-bold font-sans">({overallReturns}%)</span>
          </div>
        </div>
      </div>

      {/* Categories Showcase Bar */}
      <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-paisa-textMuted">Asset Categories (India)</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {indianCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="bg-[#16161d] border border-[#22222e] rounded-2xl p-3 text-center space-y-2 flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-xl bg-[#1f1f2c] flex items-center justify-center" style={{ color: cat.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white line-clamp-1">{cat.id}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Donut Breakdown + Investment Holdings List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Allocation Pie Chart */}
        <div className="lg:col-span-5 bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Asset Allocation</h2>

          {chartData.length === 0 ? (
            <div className="text-center py-12 text-paisa-textMuted text-xs">No investment data available.</div>
          ) : (
            <div className="space-y-4">
              <div className="w-48 h-48 mx-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#121217" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xs font-bold text-paisa-textMuted">Portfolio</span>
                  <span className="text-sm font-extrabold text-white">₹{(totalCurrent / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#16161d] border border-[#22222e]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="text-white font-semibold">{item.name}</span>
                    </div>
                    <span className="font-extrabold text-white">₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Holdings Table */}
        <div className="lg:col-span-7 bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Your Investment Holdings</h2>
            <span className="text-xs text-paisa-textMuted font-semibold">{investments.length} holdings</span>
          </div>

          <div className="space-y-3">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#16161d] border border-[#22222e] hover:border-[#2e2e3e] transition-all group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{inv.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#1f1f2c] border border-[#2a2a38] text-[9px] font-semibold text-paisa-textMuted">
                      {inv.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-paisa-textMuted">
                    Invested: ₹{inv.invested.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">₹{inv.current.toLocaleString()}</div>
                    <div className={`text-[10px] font-bold ${inv.returns >= 0 ? 'text-paisa-lime' : 'text-red-400'}`}>
                      {inv.returns >= 0 ? '+' : ''}{inv.returns}%
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(inv.id)}
                    className="opacity-0 group-hover:opacity-100 text-paisa-textMuted hover:text-red-400 transition-opacity p-1"
                    title="Delete holding"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Investment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add New Investment</h3>

            <form onSubmit={handleAddInvestment} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Asset Name</label>
                <input
                  type="text"
                  placeholder="e.g. Parag Parikh Flexi Cap, Sovereign Gold Bond, Infosys Shares"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>

              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Asset Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white focus:outline-none focus:border-paisa-lime"
                >
                  {indianCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-paisa-textMuted font-medium mb-1">Invested Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={investedAmount}
                    onChange={(e) => setInvestedAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white font-bold focus:outline-none focus:border-paisa-lime"
                    required
                  />
                </div>

                <div>
                  <label className="block text-paisa-textMuted font-medium mb-1">Current Value (₹)</label>
                  <input
                    type="number"
                    placeholder="28500"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white font-bold focus:outline-none focus:border-paisa-lime"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c26] text-paisa-textMuted hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Save Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
