import React from "react";
// import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [theme, setTheme] = React.useState("light-theme");

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light-theme" ? "dark-theme" : "light-theme"));
  };

  const products = [
    {
      name: "Wireless Mouse",
      price: 25.99,
      inStock: true,
    },
    {
      name: "Keyboard",
      price: 45.5,
      inStock: false,
    },
    {
      name: "Monitor",
      price: 199.99,
      inStock: true,
    },
  ];

  return (
    <>
      <h2 id="header">Products List</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === "light-theme" ? "Dark" : "Light"} Mode
      </button>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard props={product} />
        ))}
      </div>
    </>
  );
}

export default App;
