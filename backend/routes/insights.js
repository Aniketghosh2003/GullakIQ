const express = require('express');
const router = express.Router();
const store = require('../store');
const auth = require('../middleware/auth');

router.use(auth);

// GET dynamic insights & analytics overview
router.get('/', async (req, res) => {
  try {
    const transactions = await store.getTransactions(req.user.id);
    const user = await store.getUserById(req.user.id);

    const budget = user?.monthlyBudget || 35000;

    // Filter expenses vs income
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    const totalSpent = expenses.reduce((acc, t) => acc + t.amount, 0);
    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

    const remaining = Math.max(0, budget - totalSpent);
    const budgetUsedPercent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;

    // Category Pie Chart breakdown calculation
    const categoryTotals = {};
    const categoryColors = {
      'Food & Swiggy': '#bef264',
      'Travel & Fuel': '#f87171',
      'Shopping': '#fb923c',
      'Bills & Rent': '#60a5fa',
      'Entertainment': '#c084fc',
      'Investment': '#34d399',
      'Others': '#9ca3af'
    };

    expenses.forEach(t => {
      const cat = t.category || 'Others';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
    });

    const categoryBreakdown = Object.keys(categoryTotals).map(cat => ({
      name: cat,
      amount: categoryTotals[cat],
      percentage: totalSpent > 0 ? Math.round((categoryTotals[cat] / totalSpent) * 100) : 0,
      color: categoryColors[cat] || '#9ca3af'
    })).sort((a, b) => b.amount - a.amount);

    // Top merchants calculation
    const merchantMap = {};
    expenses.forEach(t => {
      if (t.merchant || t.title) {
        const m = t.merchant || t.title;
        merchantMap[m] = (merchantMap[m] || 0) + t.amount;
      }
    });

    const topMerchants = Object.keys(merchantMap)
      .map(m => ({ merchant: m, total: merchantMap[m] }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // Weekly spend breakdown
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const daySpendMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    
    expenses.forEach(t => {
      const dayIdx = (new Date(t.date).getDay() + 6) % 7; // Convert Sun=0 to Mon=0
      daySpendMap[dayIdx] += t.amount;
    });

    const maxDaySpend = Math.max(...Object.values(daySpendMap), 1);
    const weeklySpend = daysOfWeek.map((day, idx) => ({
      day,
      amount: daySpendMap[idx],
      height: `${Math.round((daySpendMap[idx] / maxDaySpend) * 100)}%`,
      active: idx === (new Date().getDay() + 6) % 7
    }));

    // Dynamic smart nudges
    const nudges = [];
    if (totalSpent > budget * 0.8) {
      nudges.push({
        id: 'nudge_budget_high',
        type: 'warning',
        title: `Budget alert: ${budgetUsedPercent}% used!`,
        description: `You have spent ₹${totalSpent.toLocaleString()} of your ₹${budget.toLocaleString()} monthly budget. Try keeping non-essential spend low.`
      });
    }

    if (categoryTotals['Food & Swiggy'] > 0) {
      nudges.push({
        id: 'nudge_food',
        type: 'info',
        title: 'Food & Dining Insights',
        description: `You've spent ₹${(categoryTotals['Food & Swiggy'] || 0).toLocaleString()} on food & Swiggy. Cooking at home could save up to ₹3,500 monthly!`
      });
    }

    if (nudges.length === 0) {
      nudges.push({
        id: 'nudge_good',
        type: 'success',
        title: 'Great financial health! 🎉',
        description: `You're well within your ₹${budget.toLocaleString()} budget with ₹${remaining.toLocaleString()} left to spend.`
      });
    }

    res.json({
      summary: {
        budget,
        totalSpent,
        remaining,
        budgetUsedPercent,
        totalIncome,
        daysLeft: Math.max(1, 31 - new Date().getDate())
      },
      categoryBreakdown,
      topMerchants,
      weeklySpend,
      nudges,
      monthlyTrends: [
        { month: 'May', amount: Math.round(totalSpent * 0.8) },
        { month: 'Jun', amount: Math.round(totalSpent * 0.9) },
        { month: 'Jul', amount: Math.round(totalSpent * 0.95) },
        { month: 'Aug', amount: totalSpent }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CSV Export for user's transactions
router.get('/export', async (req, res) => {
  try {
    const transactions = await store.getTransactions(req.user.id);
    let csv = 'ID,Date,Title,Type,Category,Amount,PaymentMethod,Merchant\n';
    transactions.forEach(t => {
      csv += `"${t._id}","${t.date}","${t.title}","${t.type}","${t.category}",${t.amount},"${t.paymentMethod}","${t.merchant}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=paisa_my_transactions.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
