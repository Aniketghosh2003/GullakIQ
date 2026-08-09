const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  targetAmount: {
    type: Number,
    required: true
  },
  savedAmount: {
    type: Number,
    default: 0
  },
  deadline: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Savings'
  },
  icon: {
    type: String,
    default: 'target'
  },
  monthlyTarget: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
