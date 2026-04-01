// Add your functions for database connection and configuring middleware, defining API endpoints, and starting the server.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const Order = require('./models/Order');

const app = express();
const PORT = config.port;
const MONGODB_URI_PICKER = config.mongoDBuri;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI_PICKER, {
      // options
    });
    console.log('Order Processing DB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());

// @route   POST /api/simulation/pick
// @desc    Simulate order picking and delivery
// @access  Public (internal)
app.post('/api/simulation/pick', async (req, res) => {
  const { orderId, estimatedTime } = req.body;

  if (!orderId || !estimatedTime) {
    return res.status(400).json({ msg: 'Order ID and estimated time required' });
  }

  try {
    // Update status to Picking
    await Order.findByIdAndUpdate(orderId, { status: 'Picking' });

    // Simulate delay
    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(orderId, { status: 'Delivered' });
        console.log(`Order ${orderId} delivered`);
      } catch (err) {
        console.error('Error updating order to delivered:', err.message);
      }
    }, estimatedTime * 1000);

    res.json({ msg: 'Simulation started' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Picker service listening on port ${PORT}`);
});