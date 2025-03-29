const Wishlist = require('../models/wishlist');

// @desc    Get wishlist items for the logged-in user
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ user: req.user._id }).populate('product');
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a product to the wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = async (req, res) => {
  const { product } = req.body;
  try {
    let wishlistItem = await Wishlist.findOne({ user: req.user._id, product });
    if (wishlistItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    wishlistItem = new Wishlist({
      user: req.user._id,
      product,
    });
    const savedItem = await wishlistItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateFromWishlist = async (req, res) => {
  const { quantity } = req.body;
  try {
    const wishlistItem = await Wishlist.findOne({ _id: req.params.id, user: req.user._id });
    if (wishlistItem) {
      wishlistItem.quantity = quantity;
      const updatedItem = await wishlistItem.save();
      await updatedItem.populate('product'); // ensure product field is populated
      res.json(updatedItem);
    
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// @desc    Remove a product from the wishlist
// @route   DELETE /api/wishlist/:id
// @access  Priv
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({ _id: req.params.id, user: req.user._id });
    if (wishlistItem) {
      await wishlistItem.deleteOne();
      res.json({ message: 'Wishlist item removed' });
    } else {
      res.status(404).json({ message: 'Wishlist item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
