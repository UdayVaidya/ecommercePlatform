const express = require('express');
const { placeOrder, getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Place a new order
router.post('/', protect, placeOrder);

// Get user's order history
router.get('/', protect, getOrderHistory);

module.exports = router;
