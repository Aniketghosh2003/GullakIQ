const mongoose = require('mongoose');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Goal = require('./models/Goal');

let isDbConnected = false;

// In-Memory store for offline fallback indexed by userId or demo user
const memoryStore = {
  users: {}, // userId -> user document
  transactions: [],
  goals: []
};

function setDbConnected(connected) {
  isDbConnected = connected;
}

module.exports = {
  setDbConnected,
  getIsDbConnected: () => isDbConnected,

  // User methods
  getUserById: async (userId) => {
    if (isDbConnected) {
      return await User.findById(userId).select('-password');
    }
    return memoryStore.users[userId] || null;
  },

  getUserByEmail: async (email) => {
    if (isDbConnected) {
      return await User.findOne({ email: email.toLowerCase() });
    }
    return Object.values(memoryStore.users).find(u => u.email === email.toLowerCase()) || null;
  },

  createUser: async (userData) => {
    if (isDbConnected) {
      const user = new User(userData);
      return await user.save();
    }
    const id = 'user_' + Date.now();
    const newUser = { _id: id, ...userData };
    memoryStore.users[id] = newUser;
    return newUser;
  },

  updateUser: async (userId, data) => {
    if (isDbConnected) {
      return await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
    }
    if (memoryStore.users[userId]) {
      Object.assign(memoryStore.users[userId], data);
      return memoryStore.users[userId];
    }
    return null;
  },

  // Transactions methods
  getTransactions: async (userId) => {
    if (isDbConnected) {
      return await Transaction.find({ userId }).sort({ date: -1 });
    }
    return memoryStore.transactions
      .filter(t => String(t.userId) === String(userId))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  addTransaction: async (userId, data) => {
    if (isDbConnected) {
      const tx = new Transaction({ ...data, userId });
      return await tx.save();
    }
    const newTx = {
      _id: 'tx_' + Date.now(),
      userId,
      ...data,
      date: data.date ? new Date(data.date) : new Date()
    };
    memoryStore.transactions.unshift(newTx);
    return newTx;
  },

  deleteTransaction: async (userId, transactionId) => {
    if (isDbConnected) {
      return await Transaction.findOneAndDelete({ _id: transactionId, userId });
    }
    const idx = memoryStore.transactions.findIndex(
      t => t._id === transactionId && String(t.userId) === String(userId)
    );
    if (idx !== -1) {
      return memoryStore.transactions.splice(idx, 1)[0];
    }
    return null;
  },

  // Goals methods
  getGoals: async (userId) => {
    if (isDbConnected) {
      return await Goal.find({ userId }).sort({ createdAt: -1 });
    }
    return memoryStore.goals.filter(g => String(g.userId) === String(userId));
  },

  addGoal: async (userId, data) => {
    if (isDbConnected) {
      const goal = new Goal({ ...data, userId });
      return await goal.save();
    }
    const newGoal = {
      _id: 'goal_' + Date.now(),
      userId,
      ...data
    };
    memoryStore.goals.push(newGoal);
    return newGoal;
  },

  allocateGoalMoney: async (userId, goalId, amount) => {
    if (isDbConnected) {
      const goal = await Goal.findOne({ _id: goalId, userId });
      if (!goal) return null;
      goal.savedAmount += Number(amount);
      return await goal.save();
    }
    const goal = memoryStore.goals.find(g => g._id === goalId && String(g.userId) === String(userId));
    if (goal) {
      goal.savedAmount += Number(amount);
      return goal;
    }
    return null;
  },

  deleteGoal: async (userId, goalId) => {
    if (isDbConnected) {
      return await Goal.findOneAndDelete({ _id: goalId, userId });
    }
    const idx = memoryStore.goals.findIndex(
      g => g._id === goalId && String(g.userId) === String(userId)
    );
    if (idx !== -1) {
      return memoryStore.goals.splice(idx, 1)[0];
    }
    return null;
  }
};
