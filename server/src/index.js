// Server main entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
const razorpayRoutes = require('./routes/razorpay');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/razorpay', razorpayRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Intruitia API Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
