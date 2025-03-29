const Product = require('../models/product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Example: controllers/productController.js
exports.searchProducts = async (req, res) => {
  try {
    const { query, page = 1, limit = 28, sort = 'featured' } = req.query;

    // Convert page & limit to numbers
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 28;

    // Build a filter object
    let filter = {};
    if (query && query.trim() !== '') {
      // e.g. do a text search on product_name or brand
      filter = {
        $or: [
          { product_name: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
        ],
      };
    }

    // Build a sort object
    let sortObj = {};
    switch (sort) {
      case 'price-asc':
        sortObj = { final_price_num: 1 }; // you'd store a numeric field for sorting
        break;
      case 'price-desc':
        sortObj = { final_price_num: -1 };
        break;
      case 'rating':
        sortObj = { rating: -1 };
        break;
      case 'discount':
        sortObj = { discount: -1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'featured':
      default:
        sortObj = {}; // no particular sort
    }

    // Convert final_price to a numeric field if needed
    // Or store final_price_num in your schema for easy sorting

    // Find products
    const skipCount = (pageNum - 1) * limitNum;
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortObj)
        .skip(skipCount)
        .limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total });
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ message: err.message });
  }
};
