const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const store = require('./store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/paisa';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    store.setDbConnected(true);
  })
  .catch((err) => {
    console.log('⚠️ Could not connect to local MongoDB:', err.message);
    console.log('💡 Defaulting to resilient in-memory database store.');
    store.setDbConnected(false);
  });

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/user', require('./routes/user'));
app.use('/api/insights', require('./routes/insights'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'paisa API',
    version: '2.0.0',
    dbConnected: store.getIsDbConnected()
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 paisa production backend running on http://localhost:${PORT}`);
});
