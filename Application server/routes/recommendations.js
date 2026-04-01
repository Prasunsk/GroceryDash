const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('config');

// Initialize Gemini API - use env var first, then config
const apiKey = process.env.GEMINI_API_KEY || config.get('your-gemini-Api-Key');
const genAI = new GoogleGenerativeAI(apiKey);

// @route   GET /api/recommendations
// @desc    Get AI-powered product recommendations based on purchase history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Fetch user's last 3 orders (most recent)
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(3);

    // Extract product names from orders
    const purchasedProducts = [];
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!purchasedProducts.includes(item.name)) {
          purchasedProducts.push(item.name);
        }
      });
    });

    if (purchasedProducts.length === 0) {
      return res.json({ recommendations: [] });
    }

    // Get all available products
    const allProducts = await Product.find();
    const productNames = allProducts.map(p => p.name).join(', ');

    // Create prompt for Gemini (request exactly 3 recommendations)
    const prompt = `Based on these grocery purchases: ${purchasedProducts.join(', ')}, suggest exactly 3 complementary items from our current inventory: ${productNames}.
  Return ONLY a JSON array with 3 product names as strings. Example: ["Product1", "Product2", "Product3"]. Make sure the products exist in the inventory list.`;

    // Call Gemini API with fallback
    let recommendedProducts = [];
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Parse JSON recommendations (extract array from response)
      let recommendations = [];
      try {
        const jsonMatch = responseText.match(/\[.*\]/s);
        if (jsonMatch) {
          recommendations = JSON.parse(jsonMatch[0]);
          // limit to 3 just in case
          recommendations = Array.isArray(recommendations) ? recommendations.slice(0, 3) : [];
        }
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr.message);
        recommendations = [];
      }

      // Fetch full product details for recommended products (limit to 3)
      recommendedProducts = await Product.find({
        name: { $in: recommendations }
      }).limit(3);
    } catch (llmErr) {
      console.error('[Gemini Error GET]:', llmErr.message);
      const purchasedSet = new Set(purchasedProducts);
      recommendedProducts = (await Product.find()).filter(p => !purchasedSet.has(p.name)).slice(0,3);
    }

    res.json({ recommendations: recommendedProducts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Failed to generate recommendations' });
  }
});

// @route   POST /api/recommendations
// @desc    Accept inventory and user order history JSON, forward to Gemini and return recommendations
// @access  Public (accepts JSON payload)
router.post('/', async (req, res) => {
  try {
    const { products, orderHistory } = req.body || {};

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: 'products array is required in request body' });
    }

    // Build a short list of past purchased product names from provided orderHistory
    const purchased = [];
    if (Array.isArray(orderHistory)) {
      // prefer most recent orders: try sorting by createdAt if present
      let recent = orderHistory.slice();
      if (recent.every(o => o.createdAt)) {
        recent = recent.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      recent = recent.slice(0, 3); // use only last 3 orders
      recent.forEach(order => {
        if (Array.isArray(order.items)) {
          order.items.forEach(i => {
            if (i && i.name && !purchased.includes(i.name)) purchased.push(i.name);
          });
        }
      });
    }

    const allProductNames = products.map(p => p.name).join(', ');

    // Create prompt for Gemini (request exactly 3 recommendations)
    const prompt = `You are a helpful grocery recommender. Based on these past purchases: ${purchased.join(', ') || 'none'}, suggest exactly 3 complementary items from the available inventory: ${allProductNames}.
  Return ONLY a JSON array with 3 product names that exist in the inventory. Example: ["Product A","Product B","Product C"].`;

    let recommendedProducts = [];
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Extract JSON array from the model response
      let recNames = [];
      try {
        const jsonMatch = responseText.match(/\[.*\]/s);
        if (jsonMatch) {
          recNames = JSON.parse(jsonMatch[0]);
          if (Array.isArray(recNames)) recNames = recNames.slice(0, 3);
        }
      } catch (parseErr) {
        console.error('Failed to parse Gemini output:', parseErr.message);
        recNames = [];
      }

      // Map back to full product objects from provided products (limit to 3)
      recommendedProducts = products.filter(p => recNames.includes(p.name)).slice(0, 3);
    } catch (llmErr) {
      // If Gemini call fails (model mismatch or network), fallback to a simple heuristic
      console.error('[Gemini Error]:', llmErr.message);
      const purchasedSet = new Set(purchased);
      recommendedProducts = products.filter(p => !purchasedSet.has(p.name)).slice(0, 3);
    }

    return res.json({ recommendations: recommendedProducts });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Failed to generate recommendations' });
  }
});
module.exports = router;