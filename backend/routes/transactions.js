const express = require('express');
const router = express.Router();
const store = require('../store');
const auth = require('../middleware/auth');

// All transaction routes require authentication
router.use(auth);

// GET user transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await store.getTransactions(req.user.id);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new transaction
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, paymentMethod, merchant, date } = req.body;
    if (!title || amount === undefined) {
      return res.status(400).json({ error: 'Title and amount are required' });
    }

    let icon = 'receipt';
    if (category === 'Food & Swiggy') icon = 'utensils';
    else if (category === 'Travel & Fuel') icon = 'car';
    else if (category === 'Shopping') icon = 'shopping-bag';
    else if (category === 'Bills & Rent') icon = 'home';
    else if (category === 'Freelance' || category === 'Salary') icon = 'briefcase';

    const newTx = await store.addTransaction(req.user.id, {
      title,
      amount: Number(amount),
      type: type || 'expense',
      category: category || 'Others',
      paymentMethod: paymentMethod || 'UPI',
      merchant: merchant || title,
      date: date || new Date(),
      icon
    });

    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await store.deleteTransaction(req.user.id, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
