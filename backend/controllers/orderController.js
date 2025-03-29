const Order = require('../models/order');
// Get all paid orders for the logged-in user
exports.getMyOrders = async (req, res) => {
    try {
      // only orders where status === 'paid'
      const orders = await Order.find({
        user: req.user._id,
        status: 'paid',
      }).sort({ createdAt: -1 }); // newest first
  
      res.json({ success: true, orders });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
exports.deleteOrder = async (req, res) => {
    try {
        // Find and delete the order that belongs to the user
        const order = await Order.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
        });
        if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
  