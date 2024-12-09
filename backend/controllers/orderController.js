const Order = require('../models/Order');
const Cart = require('../models/Cart');

const placeOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch the user's cart and populate the required fields
    const cart = await Cart.findOne({ user: userId }).populate('items.productId', 'price name');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or does not exist' });
    }

    console.log('Populated cart items:', cart.items);

    // Calculate the total amount
    const totalAmount = cart.items.reduce((sum, item) => {
      const price = item.productId?.price || 0; // Corrected to use `price`
      const quantity = item.quantity || 0;    // Ensure quantity is defined
      console.log(`Calculating: ${price} x ${quantity}`);
      return sum + price * quantity;
    }, 0);

    console.log('Total Amount:', totalAmount);

    // Validate totalAmount
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount calculated' });
    }

    // Create an order
    const order = new Order({
      user: userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    await order.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Error placing order', error });
  }
};



const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.productId', 'name salePrice image');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error.message);
    res.status(500).json({ message: 'Error fetching order history' });
  }
};

module.exports = { placeOrder, getOrderHistory };

