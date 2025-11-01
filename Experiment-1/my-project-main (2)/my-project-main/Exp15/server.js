const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(cors());
app.use((req, res, next) => {
    if (req.method === 'GET') {
        next();
    } else {
        express.json({ limit: '10mb' })(req, res, next);
    }
});

const MONGODB_URI = 'mongodb://localhost:27017/Chandigarh_University';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        initializeData();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

async function initializeData() {
    try {
        const existingProducts = await Product.countDocuments();

        if (existingProducts === 0) {
            const sampleProducts = [
                {
                    _id: "686f68ed2bf5384209b236a2",
                    name: "Winter Jacket",
                    price: 200,
                    category: "Apparel",
                    variants: [
                        {
                            color: "Black",
                            size: "S",
                            stock: 5,
                            _id: "686f68ed2bf5384209b236b3"
                        },
                        {
                            color: "Gray",
                            size: "M",
                            stock: 12,
                            _id: "686f68ed2bf5384209b236b4"
                        }
                    ]
                },
                {
                    _id: "685f63eb09ac2728b3f11082",
                    name: "Smartphone",
                    price: 600,
                    category: "Electronics",
                    variants: []
                },
                {
                    _id: "686f68ed2bf5384209b236af",
                    name: "Running Shoes",
                    price: 120,
                    category: "Footwear",
                    variants: [
                        {
                            color: "Red",
                            size: "M",
                            stock: 10,
                            _id: "686f68ed2bf5384209b236b0"
                        },
                        {
                            color: "Blue",
                            size: "L",
                            stock: 5,
                            _id: "686f68ed2bf5384209b236b1"
                        }
                    ]
                }
            ];

            await Product.insertMany(sampleProducts);
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'E-commerce Catalog API' });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

module.exports = app;
