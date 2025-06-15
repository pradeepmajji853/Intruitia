// Contact form controller
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Create new contact submission
    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      message
    });

    // Send notification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Intruitia',
      html: `
        <h2>Thank you for contacting Intruitia</h2>
        <p>Dear ${name},</p>
        <p>We've received your message and appreciate your interest in our AI-driven marketing solutions.</p>
        <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
        <p>Here's a summary of what you shared with us:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Best regards,</p>
        <p>The Intruitia Team</p>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
