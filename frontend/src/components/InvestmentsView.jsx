import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2, ArrowUpRight, ShieldAlert, PieChart as PieIcon, Coins, Landmark, Building2, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function InvestmentsView({ investments, onAddInvestment, onAllocateInvestment, onDeleteInvestment }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // New investment form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Stocks');
  const [investedAmount, setInvestedAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  // Top up / Increase investment form state
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');

  const indianCategoryOptions = [
    { id: 'Stocks', color: '#bef264' },
    { id: 'Mutual Funds', color: '#60a5fa' },
    { id: 'Gold & Silver', color: '#fb923c' },
    { id: 'Bonds & Fixed Income', color: '#34d399' },
    { id: 'Real Estate', color: '#c084fc' },
    { id: 'Crypto & New Age', color: '#f87171' },
    { id: 'Others', color: '#9ca3af' },
  ];

  const totalInvested = (investments || []).reduce((sum, item) => sum + item.investedAmount, 0);
  const totalCurrent = (investments || []).reduce((sum, item) => sum + item.currentValue, 0);
  const totalProfit = totalCurrent - totalInvested;
  const overallReturns = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(1) : 0;

  // Category breakdown for chart
  const categoryBreakdownMap = {};
  (investments || []).forEach(inv => {
    categoryBreakdownMap[inv.category] = (categoryBreakdownMap[inv.category] || 0) + inv.currentValue;
  });

  const chartData = Object.keys(categoryBreakdownMap).map(cat => {
    const found = indianCategoryOptions.find(c => c.id === cat);
    return {
      name: cat,
      value: categoryBreakdownMap[cat],
      color: found ? found.color : '#bef264'
    };
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !investedAmount) return;

    onAddInvestment({
      name,
      category,
      investedAmount: Number(investedAmount),
      currentValue: currentValue !== '' ? Number(currentValue) : Number(investedAmount)
    });

    setName('');
    setInvestedAmount('');
    setCurrentValue('');
    setShowAddModal(false);
  };

  const handleAllocateSubmit = (e) => {
    e.preventDefault();
    if (!selectedInvestment || !additionalAmount) return;

    onAllocateInvestment(
      selectedInvestment._id,
      Number(additionalAmount),
      updatedValue !== '' ? Number(updatedValue) : null
    );

    setAdditionalAmount('');
    setUpdatedValue('');
    setSelectedInvestment(null);
    setShowAllocateModal(false);
  };

  const openAllocateModal = (inv) => {
    setSelectedInvestment(inv);
    setUpdatedValue(inv.currentValue + Number(additionalAmount || 0));
    setShowAllocateModal(true);
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
          onClick={() => setShowAddModal(true)}
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

      {/* Grid: Donut Breakdown + Investment Holdings List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Allocation Pie Chart */}
        <div className="lg:col-span-5 bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white">Asset Allocation</h2>

          {chartData.length === 0 ? (
            <div className="text-center py-12 text-paisa-textMuted text-xs space-y-2">
              <p>No investment data created yet.</p>
              <button onClick={() => setShowAddModal(true)} className="text-paisa-lime font-semibold hover:underline">
                + Create your first investment
              </button>
            </div>
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
                  <span className="text-sm font-extrabold text-white">₹{(totalCurrent / 1000).toFixed(1)}k</span>
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

        {/* Right Column: Holdings Table with Increase Investment Button */}
        <div className="lg:col-span-7 bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Your Investment Holdings</h2>
            <span className="text-xs text-paisa-textMuted font-semibold">{(investments || []).length} holdings</span>
          </div>

          {(!investments || investments.length === 0) ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-xs text-paisa-textMuted">No investment assets in your portfolio.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-bold text-paisa-lime hover:underline"
              >
                + Add your first investment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {investments.map((inv) => {
                const profit = inv.currentValue - inv.investedAmount;
                const ret = inv.investedAmount > 0 ? ((profit / inv.investedAmount) * 100).toFixed(1) : 0;

                return (
                  <div
                    key={inv._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#16161d] border border-[#22222e] hover:border-[#2e2e3e] transition-all gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{inv.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#1f1f2c] border border-[#2a2a38] text-[9px] font-semibold text-paisa-textMuted">
                          {inv.category}
                        </span>
                      </div>
                      <div className="text-[10px] text-paisa-textMuted">
                        Invested: ₹{inv.investedAmount.toLocaleString()} • Current: ₹{inv.currentValue.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-left sm:text-right">
                        <div className={`text-xs font-extrabold ${profit >= 0 ? 'text-paisa-lime' : 'text-red-400'}`}>
                          {profit >= 0 ? '+' : ''}₹{profit.toLocaleString()} ({ret}%)
                        </div>
                      </div>

                      {/* Top Up / Increase Money Button */}
                      <button
                        onClick={() => openAllocateModal(inv)}
                        className="px-3 py-1.5 rounded-xl bg-paisa-lime/10 border border-paisa-lime/30 text-paisa-lime text-xs font-bold hover:bg-paisa-lime/20 transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Increase money</span>
                      </button>

                      {/* Delete Action */}
                      <button
                        onClick={() => onDeleteInvestment(inv._id)}
                        className="opacity-0 group-hover:opacity-100 text-paisa-textMuted hover:text-red-400 transition-opacity p-1"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add New Investment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add New Investment</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
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
                  {indianCategoryOptions.map(c => (
                    <option key={c.id} value={c.id}>{c.id}</option>
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
                  <label className="block text-paisa-textMuted font-medium mb-1">Current Market Value (₹)</label>
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
                  onClick={() => setShowAddModal(false)}
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

      {/* Increase Investment / Top Up Money Modal */}
      {showAllocateModal && selectedInvestment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-[#1e1e26] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Increase Investment</h3>
              <p className="text-xs text-paisa-textMuted mt-0.5">Asset: {selectedInvestment.name}</p>
            </div>

            <form onSubmit={handleAllocateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Additional Investment Amount (₹)</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={additionalAmount}
                  onChange={(e) => {
                    const add = e.target.value;
                    setAdditionalAmount(add);
                    if (add !== '') {
                      setUpdatedValue(selectedInvestment.currentValue + Number(add));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white text-base font-bold focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>

              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Updated Portfolio Market Value (₹)</label>
                <input
                  type="number"
                  placeholder="33500"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-[#262634] text-white font-bold focus:outline-none focus:border-paisa-lime"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllocateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c26] text-paisa-textMuted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
