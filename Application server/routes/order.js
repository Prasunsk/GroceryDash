const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const axios = require('axios');

// @route   POST /api/orders/checkout
// @desc    Checkout cart and initiate order processing
// @access  Private
router.post('/checkout', auth, async (req, res) => {
  const { items, userCoordinates } = req.body;

  if (!items || !userCoordinates) {
    return res.status(400).json({ msg: 'Items and user coordinates required' });
  }

  try {
    let totalAmount = 0;
    let maxDistance = 0;

    const processedItems = items.map(item => {
      const distance = Math.sqrt(
        Math.pow(userCoordinates.x - item.warehouseLocation.x, 2) +
        Math.pow(userCoordinates.y - item.warehouseLocation.y, 2)
      );
      if (distance > maxDistance) maxDistance = distance;
      totalAmount += item.price * item.quantity;
      return {
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        warehouseLocation: item.warehouseLocation
      };
    });

    const estimatedDeliveryTime = Math.ceil(maxDistance * 1); // 1 unit = 1 second

    // generate a readable orderId: first 2 chars are capital letters, rest are capital letters + numbers
    const genOrderId = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      // First 2 characters must be capital letters
      const first = letters.charAt(Math.floor(Math.random() * letters.length));
      const second = letters.charAt(Math.floor(Math.random() * letters.length));
      // Remaining 8 characters can be letters or numbers
      let rest = '';
      for (let i = 0; i < 8; i++) {
        rest += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return first + second + rest;
    };

    let newOrderId = genOrderId();
    // ensure uniqueness
    while (await Order.findOne({ orderId: newOrderId })) {
      newOrderId = genOrderId();
    }

    const order = new Order({
      orderId: newOrderId,
      userId: req.user.id,
      items: processedItems,
      totalAmount,
      deliveryCoordinates: userCoordinates,
      estimatedDeliveryTime
    });

    await order.save();

    // Trigger simulation in Order Processing service with Mongo _id (internal service expects it)
    try {
      await axios.post('http://localhost:5001/api/simulation/pick', {
        orderId: order._id,
        estimatedTime: estimatedDeliveryTime
      });
    } catch (err) {
      console.error('Error triggering simulation:', err.message);
      // Continue, as order is created
    }

    // Return created friendly order ID to client
    res.json({ orderId: order.orderId });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders/user/list
// @desc    Get all orders for current user (MUST come BEFORE /:id route)
// @access  Private
router.get('/user/list', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders/:id
// @desc    Get specific order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // try find by Mongo _id first
    let order = null;
    try {
      order = await Order.findById(req.params.id);
    } catch (e) {
      order = null;
    }
    // if not found by _id, try by friendly orderId
    if (!order) {
      order = await Order.findOne({ orderId: req.params.id });
    }
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    // Verify user owns this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
