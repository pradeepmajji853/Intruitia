// Razorpay payment routes
const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');

// POST - Create a new order
router.post('/create-order', razorpayController.createOrder);

// POST - Verify payment
router.post('/verify-payment', razorpayController.verifyPayment);

// GET - Get payment details
router.get('/payment/:orderId', razorpayController.getPaymentDetails);

module.exports = router;
