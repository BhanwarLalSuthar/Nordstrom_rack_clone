const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // your auth
const { getMyOrders, deleteOrder } = require('../controllers/orderController');

// All routes below require authentication
router.use(protect);

router.get('/my', getMyOrders);
router.delete('/:id', deleteOrder);

module.exports = router