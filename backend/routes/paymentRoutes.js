const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // your auth
const { createOrder, verifyPayment} = require('../controllers/paymentController');

// All routes below require authentication
router.use(protect);


router.post('/order', createOrder);
router.post('/verify', verifyPayment);


module.exports = router;
