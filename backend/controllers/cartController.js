const Cart = require('../models/Cart');
const Product = require('../models/Product'); 


const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Update quantity if product exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart to MongoDB
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error.message);
    res.status(500).json({ message: 'Error updating cart', error });
  }
};


const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.productId');

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
      console.log('cart saved');  // Save the new cart to the database
    }

    res.status(200).json(cart);  // Return the cart (new or existing)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

const updateCart = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item to update
    const item = cart.items.find(item => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update item quantity
    item.quantity = quantity;

    // Save the cart after updating the item
    await cart.save();

    return res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Error updating cart', error });
  }
};


const deleteCartItem = async (req, res) => {
  const userId = req.user._id; // User's ID from middleware
  const { itemId } = req.params; // ID passed in the request

  console.log('User ID:', userId);
  console.log('Item ID:', itemId);

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    console.log('Cart:', cart);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item to remove by comparing itemId with productId
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === itemId
    );
    console.log('Item Index:', itemIndex);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};


module.exports = { addToCart, getCart, updateCart, deleteCartItem };
