const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  _id: {
    type: String,
    required: true
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Apparel', 'Footwear', 'Accessories', 'Home & Garden']
  },
  variants: [variantSchema],
  __v: {
    type: Number,
    default: 0
  }
}, { 
  _id: false,
  timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);