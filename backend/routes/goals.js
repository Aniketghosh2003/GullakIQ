const express = require('express');
const router = express.Router();
const store = require('../store');
const auth = require('../middleware/auth');

// All goals routes require authentication
router.use(auth);

// GET user goals
router.get('/', async (req, res) => {
  try {
    const goals = await store.getGoals(req.user.id);
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new goal
router.post('/', async (req, res) => {
  try {
    const { title, targetAmount, savedAmount, deadline, category, icon, monthlyTarget } = req.body;
    if (!title || !targetAmount) {
      return res.status(400).json({ error: 'Title and target amount are required' });
    }

    const newGoal = await store.addGoal(req.user.id, {
      title,
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount || 0),
      deadline: deadline || 'Dec 2026',
      category: category || 'Savings',
      icon: icon || 'target',
      monthlyTarget: Number(monthlyTarget || 0)
    });

    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST allocate/deposit money to goal
router.post('/:id/allocate', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Valid deposit amount is required' });
    }

    const updated = await store.allocateGoalMoney(req.user.id, req.params.id, Number(amount));
    if (!updated) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE goal
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await store.deleteGoal(req.user.id, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
