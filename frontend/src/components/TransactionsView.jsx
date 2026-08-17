import React, { useState } from 'react';
import { Search, Download, Trash2, Utensils, Car, ShoppingBag, Wifi, Briefcase, Home as HomeIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TransactionsView({ user, transactions, onDeleteTransaction, onOpenAddModal }) {
  const { authFetch } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

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

  const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Income'];

  // Filter transactions dynamically by Month, Category, and Search query
  const filtered = (transactions || []).filter((tx) => {
    const d = new Date(tx.date || Date.now());
    const matchesMonth = d.getFullYear() === selectedYearNum && d.getMonth() === selectedMonthNum;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
                          (tx.title && tx.title.toLowerCase().includes(query)) ||
                          (tx.category && tx.category.toLowerCase().includes(query)) ||
                          (tx.paymentMethod && tx.paymentMethod.toLowerCase().includes(query)) ||
                          (tx.merchant && tx.merchant.toLowerCase().includes(query)) ||
                          (tx.amount && String(tx.amount).includes(query));
    
    let matchesCat = true;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Income') {
        matchesCat = tx.type === 'income';
      } else {
        matchesCat = tx.category && tx.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }
    }

    return matchesMonth && matchesSearch && matchesCat;
  });

  // Export CSV handler
  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      if (authFetch) {
        const res = await authFetch('/api/insights/export');
        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `GullakIQ_transactions_${selectedMonth}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setIsExporting(false);
          return;
        }
      }

      // Fallback CSV generation from current filtered transactions
      const headers = ['Title', 'Category', 'Payment Method', 'Amount', 'Type', 'Date'];
      const rows = filtered.map(t => [
        `"${t.title.replace(/"/g, '""')}"`,
        `"${(t.category || '').replace(/"/g, '""')}"`,
        `"${(t.paymentMethod || '').replace(/"/g, '""')}"`,
        t.amount,
        t.type,
        `"${new Date(t.date || Date.now()).toLocaleDateString()}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `GullakIQ_transactions_${selectedMonth}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = category ? category.toLowerCase() : '';
    if (cat.includes('food')) return <Utensils className="w-4 h-4 text-amber-400" />;
    if (cat.includes('travel')) return <Car className="w-4 h-4 text-amber-400" />;
    if (cat.includes('shopping')) return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
    if (cat.includes('bills') || cat.includes('rent')) return <Wifi className="w-4 h-4 text-blue-400" />;
    if (cat.includes('income') || cat.includes('freelance') || cat.includes('salary')) return <Briefcase className="w-4 h-4 text-paisa-lime" />;
    return <HomeIcon className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-paisa-textMuted uppercase tracking-wider">Full history</span>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Transactions</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Functional Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-paisa-textMuted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search transactions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#14141a] border border-[#242430] rounded-xl text-xs text-white placeholder-paisa-textMuted/60 focus:outline-none focus:border-paisa-lime w-48 sm:w-64"
            />
          </div>

          {/* Functional Export Button */}
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl bg-[#14141a] border border-[#242430] text-xs font-semibold text-white hover:bg-[#1a1a22] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-paisa-lime" />
            <span>{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1">
        {/* Category Pills */}
        <div className="flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-paisa-lime text-black shadow-sm font-bold'
                    : 'bg-[#14141a] text-paisa-textMuted hover:text-white border border-[#242430]'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-[#14141a] border border-[#242430] text-xs font-medium text-white px-3.5 py-2 rounded-xl focus:outline-none focus:border-paisa-lime cursor-pointer"
        >
          {monthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Transactions Table Container */}
      <div className="bg-[#101015] border border-[#1e1e26] rounded-3xl p-6 shadow-2xl space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-paisa-textMuted">No transactions found for this query.</p>
            <button
              onClick={onOpenAddModal}
              className="text-xs text-paisa-lime hover:underline font-semibold"
            >
              + Add a new transaction
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 text-[10px] font-extrabold uppercase tracking-widest text-paisa-textMuted/60 px-4 pb-2 border-b border-[#1c1c24]">
              <div className="col-span-4">MERCHANT</div>
              <div className="col-span-3">CATEGORY</div>
              <div className="col-span-3">PAYMENT</div>
              <div className="col-span-2 text-right">AMOUNT</div>
            </div>

            {/* Transaction Rows */}
            <div className="space-y-2">
              {filtered.map((tx) => (
                <div
                  key={tx._id}
                  className="grid grid-cols-12 items-center p-3.5 rounded-2xl bg-[#14141c]/50 hover:bg-[#181822] border border-transparent hover:border-[#262632] transition-all group"
                >
                  {/* Merchant & Time */}
                  <div className="col-span-4 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#1a1a24] border border-[#262634] flex items-center justify-center shrink-0">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{tx.title}</div>
                      <div className="text-[10px] text-paisa-textMuted/80 mt-0.5 font-medium">
                        {tx.date ? new Date(tx.date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Recent'} • {tx.date ? new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </div>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="col-span-3">
                    <span className="px-3 py-1 rounded-full bg-[#1c1c28] border border-[#2a2a38] text-[10px] font-semibold text-paisa-textMuted inline-flex items-center gap-1.5">
                      <span>{tx.category || 'Expense'}</span>
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div className="col-span-3 text-xs text-paisa-textMuted font-medium">
                    {tx.paymentMethod || 'UPI'}
                  </div>

                  {/* Amount & Delete Action */}
                  <div className="col-span-2 flex items-center justify-end gap-3">
                    <span className={`text-xs font-extrabold ${tx.type === 'income' ? 'text-paisa-lime' : 'text-white'}`}>
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
          </div>
        )}
      </div>
    </div>
  );
}
