// Newsletter subscription routes
const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// POST - Subscribe to newsletter
router.post('/subscribe', newsletterController.subscribe);

// POST - Unsubscribe from newsletter
router.post('/unsubscribe', newsletterController.unsubscribe);

module.exports = router;
