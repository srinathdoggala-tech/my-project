
import React from "react";
import ProductCard from "./components/ProductCard.jsx";


function App() {
  const products = [
    { name: "Wireless Mouse", price: "25.99", status: "In Stock" },
    { name: "Keyboard", price: "45.5", status: "Out of Stock" },
    { name: "Monitor", price: "199.99", status: "In Stock" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Products List</h1>
      <div style={styles.cardContainer}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            status={product.status}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "20px",
  },
};

export default App;
