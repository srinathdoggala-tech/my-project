const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to connect

// Sample product data
const products = [
  { name: "Laptop", price: 800 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 150 },
];

// Define API endpoint
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
