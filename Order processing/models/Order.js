const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
    enum: ['Pending', 'Picking', 'Delivered'],
    default: 'Pending'
  },
  deliveryCoordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  estimatedDeliveryTime: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);
