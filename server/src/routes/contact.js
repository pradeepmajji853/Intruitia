// Contact form routes
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST - Submit contact form
router.post('/submit', contactController.submitContactForm);

module.exports = router;
