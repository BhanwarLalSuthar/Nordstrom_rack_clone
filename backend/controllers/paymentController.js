// controllers/paymentController.js
const razorpayInstance = require('../config/razorpay');
const Order = require('../models/order');
const crypto = require('crypto');
const Cart = require('../models/cart')

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // Check that required data exists
    if (!items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing items or totalAmount' });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }

    // Create an order document in MongoDB with status = 'created'
    const orderDoc = await Order.create({
      user: req.user._id,
      items: items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      status: 'created',
    });

    // Prepare options for Razorpay order creation
    const options = {
      amount: Math.round(totalAmount * 100),// convert to paise
      currency: 'USD',
      receipt: `${orderDoc._id}`,
    };

    console.log('Creating Razorpay order with options:', options);
    // Call Razorpay to create an order
    const razorpayOrder = await razorpayInstance.orders.create(options);
    console.log('Razorpay order created:', razorpayOrder);

    // Update order document with razorpayOrderId
    orderDoc.razorpayOrderId = razorpayOrder.id;
    await orderDoc.save();

    return res.json({
      success: true,
      orderId: razorpayOrder.id,
      order: orderDoc,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const orderDoc = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!orderDoc) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      orderDoc.status = 'failed';
      await orderDoc.save();
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    orderDoc.razorpayPaymentId = razorpay_payment_id;
    orderDoc.razorpaySignature = razorpay_signature;
    orderDoc.status = 'paid';
    // In verifyPayment or after the order is marked paid:
    await Cart.deleteMany({ user: orderDoc.user });

    await orderDoc.save();

    return res.json({ success: true, message: 'Payment verified successfully', order: orderDoc });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


