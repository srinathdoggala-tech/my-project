const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Laptop', price: 1299.99 },
  { id: 4, name: 'Gaming Mouse', price: 49.99 },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99 },
  { id: 6, name: 'Monitor', price: 299.99 },
  { id: 7, name: 'Webcam', price: 79.99 },
  { id: 8, name: 'Tablet', price: 399.99 }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Express API Server is running!' });
});

// Get all products
app.get('/api/products', (req, res) => {
  try {
    // Simulate some processing delay
    setTimeout(() => {
      res.json({
        success: true,
        data: products,
        message: 'Products fetched successfully'
      });
    }, 500);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/products`);
});