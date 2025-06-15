// Razorpay payment controller
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', service, description, customer } = req.body;

    // Validate required fields
    if (!amount || !service || !customer || !customer.name || !customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, service, and customer details (name, email)'
      });
    }

    // Convert amount to paisa (Razorpay uses smallest currency unit)
    const amountInSmallestUnit = amount * 100;

    // Create unique order ID
    const receiptId = 'order_' + Date.now().toString();

    // Create Razorpay order
    const options = {
      amount: amountInSmallestUnit,
      currency,
      receipt: receiptId,
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    // Store order details in database
    const payment = await Payment.create({
      orderId: receiptId,
      razorpayOrderId: order.id,
      amount: amount, // Store in rupees for readability
      currency,
      status: 'created',
      service,
      description: description || service,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || ''
      },
      notes: req.body.notes || {}
    });

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order_id: order.id,
        currency: order.currency,
        amount: amount,
        key: process.env.RAZORPAY_KEY_ID,
        service,
        description: description || service,
        name: customer.name,
        email: customer.email,
        contact: customer.phone || ''
      }
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, method } = req.body;

    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details'
      });
    }

    // Create signature for verification
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    // Verify signature
    const isSignatureValid = expectedSignature === razorpaySignature;

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Update payment details in database
    const payment = await Payment.findOne({ razorpayOrderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment order not found'
      });
    }

    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.status = 'paid';
    payment.method = method || 'other';
    payment.updatedAt = Date.now();
    
    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: payment.orderId,
        paymentId: razorpayPaymentId,
        amount: payment.amount,
        service: payment.service
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await Payment.findOne({ 
      $or: [
        { orderId },
        { razorpayOrderId: orderId },
        { razorpayPaymentId: orderId }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
