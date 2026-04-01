const Order = require('../models/Order');

// Simple controller to mark order as picked and estimate time
async function startFulfilment(orderId) {
	if (!orderId) throw new Error('orderId required');
	// For now, set status to Picking and return a small estimated time (in seconds)
	await Order.findByIdAndUpdate(orderId, { status: 'Picking' });
	return { estimatedTime: 10 };
}

module.exports = { startFulfilment };