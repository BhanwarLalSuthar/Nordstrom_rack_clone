const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist, updateFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middlewares/authMiddleware');

// Get wishlist items for the logged-in user or add a new item to the wishlist
router.route('/')
  .get(protect, getWishlist)
  .post(protect, addToWishlist);

// Remove an item from the wishlist by its ID
router.route('/:id')
  .put(protect, updateFromWishlist)
  .delete(protect, removeFromWishlist);

module.exports = router;
