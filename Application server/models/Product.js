const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageURL: { type: String },
  stock: { type: Number, default: 0 },
  // Important for Phase 4: Logistics
  warehouseLocation: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    warehouseName: { type: String, default: 'Main Hub' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);