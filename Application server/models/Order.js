const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    warehouseLocation: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      warehouseName: { type: String, default: 'Main Hub' }
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    // keep in sync with simulateOrderLifecycle - Out for Delivery is added below
    enum: ['Pending', 'Picking', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  deliveryCoordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  estimatedDeliveryTime: {
    type: Number, // in seconds
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const simulateOrderLifecycle = (order) => {
  const totalMs = order.estimatedDeliveryTime * 1000; // Convert seconds to ms

  // Stage 1: Picking (starts after 10% of total time)
  setTimeout(async () => {
    await mongoose.model('order').findByIdAndUpdate(order._id, { status: 'Picking' });
    console.log(`Order ${order.orderId}: Picking...`);
  }, totalMs * 0.1);

  // Stage 2: Out for Delivery (starts after 40% of total time)
  setTimeout(async () => {
    await mongoose.model('order').findByIdAndUpdate(order._id, { status: 'Out for Delivery' });
    console.log(`Order ${order.orderId}: Out for Delivery...`);
  }, totalMs * 0.4);

  // Stage 3: Delivered (at 100% of time)
  setTimeout(async () => {
    await mongoose.model('order').findByIdAndUpdate(order._id, { status: 'Delivered' });
    console.log(`Order ${order.orderId}: Delivered!`);
  }, totalMs);
};

// attach the hook
OrderSchema.post('save', function(doc) {
  simulateOrderLifecycle(doc);
});

module.exports = mongoose.model('order', OrderSchema);
