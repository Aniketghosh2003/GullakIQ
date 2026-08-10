const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Asset name is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Stocks', 'Mutual Funds', 'Gold & Silver', 'Bonds & Fixed Income', 'Real Estate', 'Crypto & New Age', 'Others'],
    default: 'Stocks'
  },
  investedAmount: {
    type: Number,
    required: true,
    min: 0
  },
  currentValue: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Investment', investmentSchema);
