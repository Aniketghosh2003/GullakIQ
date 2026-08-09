const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    default: 'expense'
  },
  category: {
    type: String,
    required: true,
    enum: ['Food & Swiggy', 'Travel & Fuel', 'Shopping', 'Bills & Rent', 'Entertainment', 'Freelance', 'Salary', 'Investment', 'Others'],
    default: 'Others'
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Bank', 'Credit Card', 'Cash'],
    default: 'UPI'
  },
  merchant: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  icon: {
    type: String,
    default: 'receipt'
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
