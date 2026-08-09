import React, { useState } from 'react';
import { Plus, Target, Smartphone, Shield, Car, PiggyBank, TrendingUp, Palmtree, Trash2, IndianRupee, ArrowUpRight } from 'lucide-react';

export default function GoalsDashboard({ goals, onAddGoal, onAllocateMoney, onDeleteGoal }) {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newSaved, setNewSaved] = useState('');
  const [newDeadline, setNewDeadline] = useState('Dec 2026');

  // Allocate money modal
  const [allocateGoalId, setAllocateGoalId] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'palmtree': return <Palmtree className="w-5 h-5 text-amber-400" />;
      case 'smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'shield': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'car': return <Car className="w-5 h-5 text-red-400" />;
      case 'piggy-bank': return <PiggyBank className="w-5 h-5 text-emerald-400" />;
      case 'trending-up': return <TrendingUp className="w-5 h-5 text-paisa-lime" />;
      default: return <Target className="w-5 h-5 text-paisa-lime" />;
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle || !newTarget) return;
    onAddGoal({
      title: newTitle,
      targetAmount: Number(newTarget),
      savedAmount: Number(newSaved || 0),
      deadline: newDeadline,
      icon: 'target'
    });
    setNewTitle('');
    setNewTarget('');
    setNewSaved('');
    setShowModal(false);
  };

  const handleAllocateSubmit = (e) => {
    e.preventDefault();
    if (allocateGoalId && depositAmount > 0) {
      onAllocateMoney(allocateGoalId, Number(depositAmount));
      setAllocateGoalId(null);
      setDepositAmount('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Goals Dashboard</h1>
          <p className="text-xs text-paisa-textMuted mt-0.5">Track your custom savings targets and allocate funds dynamically</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 rounded-xl bg-paisa-lime text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-paisa-limeHover transition-all shadow-[0_0_12px_rgba(204,255,0,0.3)]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Grid of Goal Cards */}
      {goals.length === 0 ? (
        <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-paisa-card mx-auto flex items-center justify-center text-paisa-lime">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Savings Goals Set Yet</h3>
          <p className="text-xs text-paisa-textMuted max-w-sm mx-auto">
            Set up goals for your upcoming trips, gadgets, or emergency funds and allocate money towards them anytime.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-paisa-lime text-black font-bold text-xs hover:bg-paisa-limeHover"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.savedAmount / (goal.targetAmount || 1)) * 100));
            const remaining = Math.max(0, goal.targetAmount - goal.savedAmount);

            return (
              <div
                key={goal._id}
                className="bg-paisa-surface border border-paisa-border/80 hover:border-paisa-lime/40 rounded-3xl p-5 shadow-xl transition-all space-y-4 flex flex-col justify-between group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-paisa-card border border-paisa-border flex items-center justify-center">
                      {getIcon(goal.icon)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-paisa-card border border-paisa-border/60 text-[10px] font-semibold text-paisa-textMuted">
                        {goal.deadline || 'Ongoing'}
                      </span>
                      {onDeleteGoal && (
                        <button
                          onClick={() => onDeleteGoal(goal._id)}
                          className="opacity-0 group-hover:opacity-100 text-paisa-textMuted hover:text-red-400 transition-opacity p-1"
                          title="Delete Goal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                    <div className="text-[11px] text-paisa-textMuted mt-1 font-medium">
                      ₹{goal.savedAmount.toLocaleString()} <span className="text-paisa-textMuted/60">saved of ₹{goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Deposit Button */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="w-full bg-paisa-card h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="bg-paisa-lime h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#ccff00]"
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-paisa-textMuted font-medium">
                      <span>{percent}% done</span>
                      <span>₹{remaining.toLocaleString()} to go</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setAllocateGoalId(goal._id)}
                    className="w-full py-2 bg-paisa-lime/10 border border-paisa-lime/30 text-paisa-lime font-semibold rounded-xl text-xs hover:bg-paisa-lime/20 transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Allocate Money</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add Goal Card */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-paisa-surface/50 border-2 border-dashed border-paisa-border hover:border-paisa-lime/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-2 hover:bg-paisa-card/40 transition-all min-h-[210px]"
          >
            <div className="w-10 h-10 rounded-full bg-paisa-card flex items-center justify-center text-paisa-lime">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white">Add a new goal</span>
            <span className="text-[10px] text-paisa-textMuted">Save for gadgets, trips, or wealth</span>
          </button>
        </div>
      )}

      {/* Modal for creating new goal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <h2 className="text-base font-bold text-white">Create New Savings Goal</h2>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Goal Title</label>
                <input
                  type="text"
                  placeholder="e.g. MacBook Pro, Bali Trip"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-paisa-textMuted font-medium mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                    required
                  />
                </div>
                <div>
                  <label className="block text-paisa-textMuted font-medium mb-1">Saved So Far (₹)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={newSaved}
                    onChange={(e) => setNewSaved(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                  />
                </div>
              </div>

              <div>
                <label className="block text-paisa-textMuted font-medium mb-1">Target Date</label>
                <input
                  type="text"
                  placeholder="Dec 2026"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-paisa-card text-paisa-textMuted font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Allocating / Depositing Money */}
      {allocateGoalId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Allocate Money to Goal</h3>
            <form onSubmit={handleAllocateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-paisa-textMuted mb-1 font-medium">Deposit Amount (₹)</label>
                <input
                  type="number"
                  placeholder="2500"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white text-base font-bold focus:outline-none focus:border-paisa-lime"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAllocateGoalId(null)}
                  className="px-4 py-2 rounded-xl bg-paisa-card text-paisa-textMuted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover"
                >
                  Deposit Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
