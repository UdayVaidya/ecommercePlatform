const express = require('express');
const { addToCart, getCart, updateCart, deleteCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add product to cart
router.post('/', protect, addToCart);

// Get user's cart
router.get('/', protect, getCart);

// Update cart item
router.put('/:itemId', protect, updateCart);

// Delete cart item
router.delete('/:itemId', protect, deleteCartItem);

module.exports = router;
