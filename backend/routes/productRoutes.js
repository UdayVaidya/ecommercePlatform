const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Add a new product (admin only)
router.post('/products', protect, admin, addProduct);

// Update an existing product (admin only)
router.put('/products/:id', protect, admin, updateProduct);

// Delete a product (admin only)
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;
