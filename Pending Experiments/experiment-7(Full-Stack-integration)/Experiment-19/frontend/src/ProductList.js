import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product List</h2>
      <div style={styles.cardContainer}>
        {products.map((p, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.price}>Price: ${p.price}</p>
            <button style={styles.button}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    backgroundColor: "#2e2e2e",
    border: "1px solid #555",
    borderRadius: "10px",
    width: "200px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  name: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  price: {
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductList;
