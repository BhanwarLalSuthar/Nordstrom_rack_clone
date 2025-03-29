const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

// Public endpoints for getting products
router.route('/')
  .get(getProducts)
  // For creating a product, updating, or deleting, ensure proper authentication (and ideally admin check)
  .post(protect, createProduct);

router.route('/search')
  .get(searchProducts)

router.route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
