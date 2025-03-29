const express = require('express');
const router = express.Router();
const {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure you have an auth middleware

// All routes are protected
router.use(protect);

router.route('/')
  .post(createAddress)    // Create a new address
  .get(getAddresses);     // Get all addresses for the logged-in user

router.route('/:id')
  .get(getAddressById)     // Get a single address
  .put(updateAddress)      // Update an address
  .delete(deleteAddress);  // Delete an address

module.exports = router;
