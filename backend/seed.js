const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('./models/Transaction');
const Goal = require('./models/Goal');
const User = require('./models/User');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/paisa';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Transaction.deleteMany({});
    await Goal.deleteMany({});
    await User.deleteMany({});

    await User.create({
      name: 'Aarav',
      age: 30,
      monthlyBudget: 35000,
      email: 'aarav@paisa.in',
      linkedUpiApps: ['GPay', 'PhonePe', 'Paytm'],
      budgetAlerts: true,
      alertThresholdPercent: 80,
      language: 'English',
      notificationsEnabled: true
    });

    await Transaction.insertMany([
      {
        title: 'Swiggy',
        amount: 340,
        type: 'expense',
        category: 'Food & Swiggy',
        paymentMethod: 'UPI',
        merchant: 'Swiggy',
        date: new Date('2026-08-08T18:42:00'),
        icon: 'utensils'
      },
      {
        title: 'Uber',
        amount: 185,
        type: 'expense',
        category: 'Travel & Fuel',
        paymentMethod: 'UPI',
        merchant: 'Uber',
        date: new Date('2026-08-08T16:19:00'),
        icon: 'car'
      },
      {
        title: 'Freelance',
        amount: 4500,
        type: 'income',
        category: 'Freelance',
        paymentMethod: 'Bank',
        merchant: 'Client Direct Transfer',
        date: new Date('2026-08-07T14:30:00'),
        icon: 'briefcase'
      },
      {
        title: 'Zomato Gold',
        amount: 499,
        type: 'expense',
        category: 'Food & Swiggy',
        paymentMethod: 'UPI',
        merchant: 'Zomato',
        date: new Date('2026-08-06T19:00:00'),
        icon: 'utensils'
      },
      {
        title: 'Airtel Broadband',
        amount: 1179,
        type: 'expense',
        category: 'Bills & Rent',
        paymentMethod: 'UPI',
        merchant: 'Airtel',
        date: new Date('2026-08-05T10:00:00'),
        icon: 'wifi'
      },
      {
        title: 'Zudio Shopping',
        amount: 2450,
        type: 'expense',
        category: 'Shopping',
        paymentMethod: 'Credit Card',
        merchant: 'Zudio',
        date: new Date('2026-08-04T16:45:00'),
        icon: 'shopping-bag'
      },
      {
        title: 'House Rent',
        amount: 14000,
        type: 'expense',
        category: 'Bills & Rent',
        paymentMethod: 'Bank',
        merchant: 'Landlord UPI',
        date: new Date('2026-08-01T09:00:00'),
        icon: 'home'
      }
    ]);

    await Goal.insertMany([
      {
        title: 'Goa Trip — Dec 2026',
        targetAmount: 12000,
        savedAmount: 8400,
        deadline: 'Dec 2026',
        category: 'Travel',
        icon: 'palmtree',
        monthlyTarget: 1100
      },
      {
        title: 'New iPhone',
        targetAmount: 120000,
        savedAmount: 32000,
        deadline: 'Nov 2026',
        category: 'Gadgets',
        icon: 'smartphone',
        monthlyTarget: 15000
      },
      {
        title: 'Emergency Fund',
        targetAmount: 123000,
        savedAmount: 18000,
        deadline: 'Ongoing',
        category: 'Security',
        icon: 'shield',
        monthlyTarget: 5000
      },
      {
        title: 'Car Downpayment',
        targetAmount: 150000,
        savedAmount: 35000,
        deadline: 'Mar 2027',
        category: 'Vehicle',
        icon: 'car',
        monthlyTarget: 10000
      },
      {
        title: 'Retirement Fund',
        targetAmount: 516000,
        savedAmount: 316000,
        deadline: 'Long Term',
        category: 'Investment',
        icon: 'piggy-bank',
        monthlyTarget: 16000
      },
      {
        title: 'Investment Portfolio',
        targetAmount: 213000,
        savedAmount: 115600,
        deadline: 'Dec 2026',
        category: 'Investment',
        icon: 'trending-up',
        monthlyTarget: 10000
      }
    ]);

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
