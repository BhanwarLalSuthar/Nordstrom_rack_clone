const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

// Get the cart items for the logged-in user or add a new item to the cart
router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

// Update quantity or remove an item from the cart by cart item ID
router.route('/:id')
  .put(protect, updateCartItem)
  .delete(protect, removeFromCart);

module.exports = router;
