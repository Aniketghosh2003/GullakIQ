const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  age: {
    type: Number,
    default: 25
  },
  monthlyBudget: {
    type: Number,
    default: 35000
  },
  linkedUpiApps: {
    type: [String],
    default: ['GPay', 'PhonePe', 'Paytm']
  },
  budgetAlerts: {
    type: Boolean,
    default: true
  },
  alertThresholdPercent: {
    type: Number,
    default: 80
  },
  language: {
    type: String,
    default: 'English'
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
