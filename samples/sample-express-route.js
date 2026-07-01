// DragPunk Theme Backend Syntax Highlighting Demo (Node.js & Express)
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose Database Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
// GET /api/products/category/:categoryId
// Express Middleware & Route Handler (Highlighting of async/await, error try-catch blocks)
router.get('/category/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Validate Mongo Object ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid Category ID parameter' });
    }

    // Query database using Mongoose (Electric Blue function call, Neon Cyan key fields)
    const products = await Product.find({ category: categoryId })
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    // Successful response
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching database products:', error);
    // Forward error to Express global error handler
    return next(error);
  }
});

module.exports = router;
