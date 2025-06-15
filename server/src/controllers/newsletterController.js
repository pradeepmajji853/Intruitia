// Newsletter subscription controller
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      // If already subscribed, update subscription status if needed
      if (!existingSubscriber.subscribed) {
        existingSubscriber.subscribed = true;
        existingSubscriber.updatedAt = Date.now();
        await existingSubscriber.save();
        
        // Send re-subscription confirmation
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Welcome Back to Intruitia Newsletter',
          html: `
            <h2>Welcome Back to Intruitia's AI Marketing Insights</h2>
            <p>Dear ${name || 'Valued Subscriber'},</p>
            <p>We're delighted to have you back on our newsletter list! You'll now receive our latest insights on AI-driven marketing trends, case studies, and exclusive content.</p>
            <p>If you didn't request this subscription, you can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.</p>
            <p>Best regards,</p>
            <p>The Intruitia Team</p>
          `
        });

        return res.status(200).json({
          success: true,
          message: 'Your subscription has been reactivated',
          data: existingSubscriber
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter',
        data: existingSubscriber
      });
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({
      email,
      name: name || ''
    });

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Intruitia Newsletter',
      html: `
        <h2>Welcome to Intruitia's AI Marketing Insights</h2>
        <p>Dear ${name || 'Valued Subscriber'},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive our latest insights on AI-driven marketing trends, case studies, and exclusive content.</p>
        <p>Here's what you can expect from us:</p>
        <ul>
          <li>Bi-weekly updates on AI marketing innovations</li>
          <li>Case studies showcasing successful AI-driven campaigns</li>
          <li>Exclusive tips and resources for optimizing your marketing strategy</li>
          <li>Early access to our webinars and events</li>
        </ul>
        <p>If you didn't request this subscription, you can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.</p>
        <p>Best regards,</p>
        <p>The Intruitia Team</p>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Unsubscribe from newsletter
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find subscriber by email
    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscription list'
      });
    }

    // Update subscription status
    subscriber.subscribed = false;
    subscriber.updatedAt = Date.now();
    await subscriber.save();

    // Send unsubscribe confirmation
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Unsubscribed from Intruitia Newsletter',
      html: `
        <h2>You've Been Unsubscribed</h2>
        <p>Dear Subscriber,</p>
        <p>We're sorry to see you go. You've been successfully unsubscribed from the Intruitia newsletter.</p>
        <p>If you changed your mind or unsubscribed by mistake, you can <a href="https://intruitia.com/newsletter/subscribe">resubscribe here</a>.</p>
        <p>We'd love to hear your feedback on why you decided to unsubscribe. Your insights will help us improve our content.</p>
        <p>Best regards,</p>
        <p>The Intruitia Team</p>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
