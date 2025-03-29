const Cart = require('../models/cart');

// @desc    Get cart items for the logged-in user
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a product to the cart (or update quantity if it exists)
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
  const { product, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({ user: req.user._id, product });
    if (cartItem) {
      // Update the quantity if the product already exists in the cart
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({
        user: req.user._id,
        product,
        quantity,
      });
    }
    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user._id });
    if (cartItem) {
      cartItem.quantity = quantity;
      const updatedItem = await cartItem.save();
      await updatedItem.populate('product'); // ensure product field is populated
      res.json(updatedItem);
    
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a product from the cart
// @route   DELETE /api/cart/:id
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user._id });
    if (cartItem) {
      await cartItem.deleteOne();
      res.json({ message: 'Cart item removed' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
