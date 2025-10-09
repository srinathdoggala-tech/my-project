const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
  }
  next();
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/bank_transfer_system')
.then(() => console.log(' Connected to MongoDB'))
.catch(err => {
  console.error(' MongoDB connection error:', err.message);
  console.log(' Make sure MongoDB is running on your system');
  console.log('   - Install MongoDB: brew install mongodb-community');
  console.log('   - Start MongoDB: brew services start mongodb-community');
});

// Routes

// Get all users (for testing purposes)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email accountNumber balance');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Create a new user account
app.post('/api/users', async (req, res) => {
  try {
    // Check if req.body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty. Make sure to send JSON data with Content-Type: application/json',
        receivedBody: req.body
      });
    }

    const { name, email, accountNumber, balance = 0 } = req.body;

    // Validate required fields
    if (!name || !email || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and account number are required',
        receivedFields: {
          name: name || 'missing',
          email: email || 'missing',
          accountNumber: accountNumber || 'missing',
          balance: balance
        }
      });
    }

    const user = new User({
      name,
      email,
      accountNumber,
      balance: Math.max(0, balance) // Ensure balance is not negative
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User account created successfully',
      data: {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
        balance: user.balance
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating user account',
      error: error.message
    });
  }
});

// Money transfer endpoint
app.post('/api/transfer', async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    // Validate input
    if (!fromAccount || !toAccount || !amount) {
      return res.status(400).json({
        success: false,
        message: 'From account, to account, and amount are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Transfer amount must be greater than 0'
      });
    }

    if (fromAccount === toAccount) {
      return res.status(400).json({
        success: false,
        message: 'Cannot transfer money to the same account'
      });
    }

    // Find sender account
    const sender = await User.findOne({ accountNumber: fromAccount });
    if (!sender) {
      return res.status(404).json({
        success: false,
        message: 'Sender account not found'
      });
    }

    // Find receiver account
    const receiver = await User.findOne({ accountNumber: toAccount });
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver account not found'
      });
    }

    // Check if sender has sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Available balance: ${sender.balance}`,
        availableBalance: sender.balance,
        requestedAmount: amount
      });
    }

    // Perform the transfer (sequential updates for consistency)
    // First, deduct from sender
    sender.balance -= amount;
    await sender.save();

    try {
      // Then, add to receiver
      receiver.balance += amount;
      await receiver.save();

      // Transfer successful
      res.json({
        success: true,
        message: 'Transfer completed successfully',
        transaction: {
          from: {
            accountNumber: sender.accountNumber,
            name: sender.name,
            newBalance: sender.balance
          },
          to: {
            accountNumber: receiver.accountNumber,
            name: receiver.name,
            newBalance: receiver.balance
          },
          amount: amount,
          timestamp: new Date()
        }
      });

    } catch (receiverError) {
      // If adding to receiver fails, rollback sender's balance
      sender.balance += amount;
      await sender.save();
      
      throw new Error('Transfer failed during receiver update. Transaction rolled back.');
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Transfer failed',
      error: error.message
    });
  }
});

// Get account balance
app.get('/api/balance/:accountNumber', async (req, res) => {
  try {
    const { accountNumber } = req.params;
    
    const user = await User.findOne({ accountNumber }, 'name accountNumber balance');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    res.json({
      success: true,
      data: {
        name: user.name,
        accountNumber: user.accountNumber,
        balance: user.balance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching balance',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Bank Transfer API is running',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Bank Transfer API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});