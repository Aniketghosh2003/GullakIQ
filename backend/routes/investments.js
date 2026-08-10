const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const store = require('../store');

// @route   GET /api/investments
// @desc    Get all user investments
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const investments = await store.getInvestments(req.user.id);
    res.json(investments);
  } catch (err) {
    console.error('Error fetching investments:', err);
    res.status(500).json({ error: 'Server error fetching investments' });
  }
});

// @route   POST /api/investments
// @desc    Add new investment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, investedAmount, currentValue } = req.body;
    if (!name || investedAmount === undefined) {
      return res.status(400).json({ error: 'Name and invested amount are required' });
    }

    const investment = await store.addInvestment(req.user.id, {
      name,
      category: category || 'Stocks',
      investedAmount: Number(investedAmount),
      currentValue: Number(currentValue !== undefined && currentValue !== '' ? currentValue : investedAmount)
    });

    res.status(201).json(investment);
  } catch (err) {
    console.error('Error adding investment:', err);
    res.status(500).json({ error: 'Server error adding investment' });
  }
});

// @route   POST /api/investments/:id/allocate
// @desc    Increase invested money for a specific asset
// @access  Private
router.post('/:id/allocate', auth, async (req, res) => {
  try {
    const { amount, currentValue } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid deposit amount required' });
    }

    const updated = await store.allocateInvestmentMoney(
      req.user.id,
      req.params.id,
      Number(amount),
      currentValue !== undefined && currentValue !== '' ? Number(currentValue) : null
    );

    if (!updated) {
      return res.status(404).json({ error: 'Investment holding not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error increasing investment money:', err);
    res.status(500).json({ error: 'Server error allocating investment money' });
  }
});

// @route   DELETE /api/investments/:id
// @desc    Delete an investment holding
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await store.deleteInvestment(req.user.id, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Investment holding not found' });
    }
    res.json({ message: 'Investment deleted successfully' });
  } catch (err) {
    console.error('Error deleting investment:', err);
    res.status(500).json({ error: 'Server error deleting investment' });
  }
});

module.exports = router;
