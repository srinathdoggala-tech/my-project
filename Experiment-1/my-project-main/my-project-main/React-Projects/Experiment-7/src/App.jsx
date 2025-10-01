import React from "react";
import "./App.css";

// ProductCard Component
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: {product.price}</p>
      <p className={product.status === "In Stock" ? "status-in" : "status-out"}>
        Status: {product.status}
      </p>
    </div>
  );
};

// Main App Component
const App = () => {
  const products = [
    { name: "Wireless Mouse", price: "$25.99", status: "In Stock" },
    { name: "Keyboard", price: "$45.5", status: "Out of Stock" },
    { name: "Monitor", price: "$199.99", status: "In Stock" },
  ];

  return (
    <div className="container">
      <h1>Products List</h1>
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
