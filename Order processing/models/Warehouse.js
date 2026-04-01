const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: {
		x: { type: Number, required: true },
		y: { type: Number, required: true }
	},
	capacity: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);