const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/by-color/:color", async (req, res) => {
  try {
    const products = await Product.find({ "variants.color": req.params.color });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/by-size/:size", async (req, res) => {
  try {
    const products = await Product.find({ "variants.size": req.params.size });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/products/:id/variant", async (req, res) => {
  const { color, size, stock } = req.body;

  try {
    const updated = await Product.updateOne(
      { _id: req.params.id, "variants.color": color, "variants.size": size },
      { $set: { "variants.$.stock": stock } }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/products/:id/variant", async (req, res) => {
  const { color, size } = req.body;

  try {
    const updated = await Product.updateOne(
      { _id: req.params.id },
      { $pull: { variants: { color, size } } }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
