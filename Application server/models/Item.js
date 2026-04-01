const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	qty: { type: Number, required: true, default: 1 },
	image: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);