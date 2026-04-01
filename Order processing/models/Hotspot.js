const mongoose = require('mongoose');

const HotspotSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: {
		x: { type: Number, required: true },
		y: { type: Number, required: true }
	},
	active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Hotspot', HotspotSchema);