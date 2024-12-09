const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // DB connection setup
const cartRoutes = require('./routes/cartRoutes'); // Import the cart routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // JSON parser
app.use(cors()); // Enable CORS for all domains

// Use the cart routes
app.use('/api/cart', cartRoutes);  // Ensure this matches the URL being called on the frontend
app.use('/api/orders',require('./routes/orderRoutes'))
// Other routes (users, products, etc.)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Connect to DB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
