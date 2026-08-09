const express = require('express');
const router = express.Router();
const store = require('../store');
const auth = require('../middleware/auth');

router.use(auth);

// GET profile
router.get('/', async (req, res) => {
  try {
    const user = await store.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update profile / settings / monthly budget
router.put('/', async (req, res) => {
  try {
    const updated = await store.updateUser(req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update target monthly budget
router.put('/budget', async (req, res) => {
  try {
    const { monthlyBudget } = req.body;
    if (monthlyBudget === undefined || Number(monthlyBudget) < 0) {
      return res.status(400).json({ error: 'Valid monthly budget is required' });
    }
    const updated = await store.updateUser(req.user.id, { monthlyBudget: Number(monthlyBudget) });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
