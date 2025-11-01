const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('GET /products route hit');
    const products = await Product.find({});
    console.log('Found products:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error in products route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Filter products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: { $regex: new RegExp(category, 'i') } 
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products with specific variant details (by color)
router.get('/by-color/:color', async (req, res) => {
  try {
    const { color } = req.params;
    const products = await Product.find(
      { "variants.color": { $regex: new RegExp(color, 'i') } },
      { 
        name: 1, 
        price: 1, 
        category: 1,
        "variants.$": 1
      }
    );
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;