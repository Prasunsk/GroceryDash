const express = require('express');
const router = express.Router();
const { startFulfilment } = require('../controllers/controller');

// Health
router.get('/status', (req, res) => res.json({ ok: true }));

// Trigger fulfilment for an order (simple)
router.post('/fulfil', async (req, res) => {
	try {
		const { orderId } = req.body;
		if (!orderId) return res.status(400).json({ msg: 'orderId required' });
		const result = await startFulfilment(orderId);
		res.json({ ok: true, result });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
});

module.exports = router;