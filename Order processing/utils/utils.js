// Small utility helpers for order processing

function estimatePickingTime(itemsCount) {
	// simple heuristic: 5 seconds per item, minimum 5 seconds
	return Math.max(5, itemsCount * 5);
}

module.exports = { estimatePickingTime };