import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Plus, Utensils, Car, Briefcase, Wifi, ShoppingBag, Home as HomeIcon, Edit3, Trash2 } from 'lucide-react';

export default function HomeDashboard({ summary, transactions, onOpenAddModal, onViewAllTransactions, onUpdateBudget, onDeleteTransaction }) {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState(summary?.budget || 35000);

  const budget = summary?.budget || 35000;
  const totalSpent = summary?.totalSpent || 0;
  const remaining = summary?.remaining ?? budget;
  const usedPercent = summary?.budgetUsedPercent || 0;
  const daysLeft = summary?.daysLeft || 12;

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (newBudgetInput > 0) {
      onUpdateBudget(Number(newBudgetInput));
      setShowBudgetModal(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food & Swiggy': return <Utensils className="w-4 h-4 text-red-400" />;
      case 'Travel & Fuel': return <Car className="w-4 h-4 text-amber-400" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      case 'Bills & Rent': return <Wifi className="w-4 h-4 text-blue-400" />;
      case 'Freelance':
      case 'Salary': return <Briefcase className="w-4 h-4 text-paisa-lime" />;
      default: return <HomeIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Home Dashboard</h1>
          <p className="text-xs text-paisa-textMuted mt-0.5">Track your monthly budget and real-time expense activity</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBudgetModal(true)}
            className="px-3.5 py-2 rounded-xl bg-paisa-card border border-paisa-border text-paisa-textMuted hover:text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-paisa-cardHover transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-paisa-lime" />
            <span>Set Target Budget</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 rounded-xl bg-paisa-lime text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-paisa-limeHover transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Main Budget Card */}
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between text-xs text-paisa-textMuted mb-2">
          <div>
            <span className="font-medium text-white">Left to spend this month</span>
            <div className="text-[11px] text-paisa-textMuted flex items-center gap-2">
              <span>of ₹{budget.toLocaleString()} budget</span>
              <button onClick={() => setShowBudgetModal(true)} className="text-paisa-lime hover:underline font-semibold text-[10px]">Edit</button>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-paisa-card border border-paisa-border text-[11px] font-medium text-paisa-lime">
            August 2026
          </span>
        </div>

        {/* Gauge Chart Display */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-paisa-card"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ccff00"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * (100 - usedPercent)) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">₹{remaining.toLocaleString()}</span>
              <span className="text-xs text-paisa-textMuted font-medium mt-1">{usedPercent}% of budget used</span>
            </div>
          </div>
        </div>

        {/* Bottom 3 Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-paisa-border/80 text-center">
          <div className="bg-paisa-card/60 rounded-2xl p-3 border border-paisa-border/40">
            <div className="text-sm font-bold text-white">₹{totalSpent.toLocaleString()}</div>
            <div className="text-[11px] text-paisa-textMuted mt-0.5">Spent</div>
          </div>
          <div className="bg-paisa-card/60 rounded-2xl p-3 border border-paisa-border/40">
            <div className="text-sm font-bold text-paisa-lime">₹{remaining.toLocaleString()}</div>
            <div className="text-[11px] text-paisa-textMuted mt-0.5">Remaining</div>
          </div>
          <div className="bg-paisa-card/60 rounded-2xl p-3 border border-paisa-border/40">
            <div className="text-sm font-bold text-white">{daysLeft}</div>
            <div className="text-[11px] text-paisa-textMuted mt-0.5">Days left</div>
          </div>
        </div>
      </div>

      {/* Weekly Bar Chart Card */}
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Weekly Spend Breakdown</h2>
          <span className="text-xs font-semibold text-paisa-textMuted">₹{totalSpent.toLocaleString()} spent</span>
        </div>

        <div className="flex items-end justify-between h-36 pt-6 px-2">
          {(summary?.weeklySpend || [
            { day: 'M', height: '10%' },
            { day: 'T', height: '20%' },
            { day: 'W', height: '15%' },
            { day: 'T', height: '30%' },
            { day: 'F', height: '50%' },
            { day: 'S', height: '40%' },
            { day: 'S', height: '80%', active: true }
          ]).map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full max-w-[32px] bg-paisa-card rounded-t-lg relative flex items-end h-28">
                <div
                  style={{ height: bar.height || '10%' }}
                  className={`w-full rounded-t-lg transition-all ${
                    bar.active ? 'bg-paisa-lime shadow-[0_0_12px_rgba(204,255,0,0.4)]' : 'bg-paisa-subtle hover:bg-paisa-textMuted/40'
                  }`}
                ></div>
              </div>
              <span className={`text-[11px] font-medium ${bar.active ? 'text-paisa-lime font-bold' : 'text-paisa-textMuted'}`}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent activity</h2>
          <button 
            onClick={onViewAllTransactions}
            className="text-xs text-paisa-lime hover:underline font-medium"
          >
            View all
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-paisa-textMuted text-xs space-y-2">
            <p>No transactions logged yet.</p>
            <button
              onClick={onOpenAddModal}
              className="text-paisa-lime hover:underline font-semibold"
            >
              + Add your first expense
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-paisa-card/60 border border-paisa-border/50 hover:bg-paisa-cardHover transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-paisa-surface border border-paisa-border flex items-center justify-center">
                    {getCategoryIcon(tx.category)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{tx.title}</div>
                    <div className="text-[10px] text-paisa-textMuted mt-0.5">
                      {tx.category} • {tx.paymentMethod} {tx.date ? `• ${new Date(tx.date).toLocaleDateString()}` : ''}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`text-xs font-bold ${tx.type === 'income' ? 'text-paisa-lime' : 'text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </div>
                  <button
                    onClick={() => onDeleteTransaction(tx._id)}
                    className="opacity-0 group-hover:opacity-100 text-paisa-textMuted hover:text-red-400 transition-opacity p-1"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Set Target Monthly Budget</h3>
            <form onSubmit={handleBudgetSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Monthly Budget Limit (₹)</label>
                <input
                  type="number"
                  placeholder="35000"
                  value={newBudgetInput}
                  onChange={(e) => setNewBudgetInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white text-base font-bold focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBudgetModal(false)}
                  className="px-4 py-2 rounded-xl bg-paisa-card text-paisa-textMuted hover:text-white"
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
