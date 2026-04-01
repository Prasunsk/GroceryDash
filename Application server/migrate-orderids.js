// Migration script to update all existing OrderIDs to new format
// Format: XX + XXXXXXXX (2 capital letters + 8 mixed capital letters/numbers)
// Total length: 10 characters

const mongoose = require('mongoose');
const config = require('config');
const Order = require('./models/Order');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {});
    console.log('MongoDB Connected for migration...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const generateOrderId = () => {
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

const migrateOrderIds = async () => {
  try {
    const orders = await Order.find({});
    console.log(`Found ${orders.length} orders to migrate`);

    let updated = 0;
    let skipped = 0;

    for (const order of orders) {
      try {
        // Generate new OrderID
        let newOrderId = generateOrderId();
        // Ensure uniqueness
        while (await Order.findOne({ orderId: newOrderId, _id: { $ne: order._id } })) {
          newOrderId = generateOrderId();
        }

        // Update the order
        await Order.findByIdAndUpdate(order._id, { orderId: newOrderId });
        console.log(`✓ Updated order ${order._id}: ${order.orderId} → ${newOrderId}`);
        updated++;
      } catch (err) {
        console.error(`✗ Failed to update order ${order._id}:`, err.message);
        skipped++;
      }
    }

    console.log(`\n=== Migration Complete ===`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  migrateOrderIds();
});
