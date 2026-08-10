import React, { useState } from 'react';
import { X, Plus, CreditCard, Utensils, Car, ShoppingBag, Wifi, Briefcase, IndianRupee } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food & Swiggy');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [merchant, setMerchant] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddTransaction({
      title,
      amount: Number(amount),
      type,
      category,
      paymentMethod,
      merchant: merchant || title,
      date: new Date().toISOString()
    });

    setTitle('');
    setAmount('');
    setMerchant('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-paisa-surface border border-paisa-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block"></span>
            <span>Add New Transaction</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-paisa-card border border-paisa-border flex items-center justify-center text-paisa-textMuted hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Header Tag */}
          <div className="p-2.5 bg-[#14141c] rounded-2xl border border-paisa-border flex items-center justify-between text-xs">
            <span className="font-bold text-red-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              - Expense Entry
            </span>
            <span className="text-[10px] text-paisa-textMuted font-medium">paisa tracking</span>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-paisa-lime font-bold text-sm">₹</span>
              <input
                type="number"
                placeholder="340"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white text-base font-bold focus:outline-none focus:border-paisa-lime"
                required
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Title / Merchant</label>
            <input
              type="text"
              placeholder="e.g. Swiggy, Uber, Zudio, Rent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paisa-card border border-paisa-border text-white focus:outline-none focus:border-paisa-lime"
            >
              <option value="Food & Swiggy">Food & Swiggy</option>
              <option value="Travel & Fuel">Travel & Fuel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills & Rent">Bills & Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Freelance">Freelance</option>
              <option value="Salary">Salary</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-paisa-textMuted font-medium mb-1">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {['UPI', 'Bank', 'Credit Card'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-2 rounded-xl border text-center font-medium transition-all ${
                    paymentMethod === method
                      ? 'bg-paisa-lime/10 border-paisa-lime text-paisa-lime font-bold'
                      : 'bg-paisa-card border-paisa-border text-paisa-textMuted'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-paisa-card text-paisa-textMuted font-semibold hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-paisa-lime text-black font-bold hover:bg-paisa-limeHover shadow-[0_0_10px_rgba(204,255,0,0.3)] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
