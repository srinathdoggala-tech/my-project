import './App.css';
import ProductCard from './Components/product_card';

function App() {
  const product1 = {
    name: "Wireless Mouse",
    price: 25.99,
    instock: true
  };
  const product2 = {
    name: "Keyboard",
    price: 45.5,
    instock: false
  };
  const product3 = {
    name: "Monitor",
    price: 199.99,
    instock: true
  };

  return (
    <div className="app-wrapper">
      <h1 className="main-title">Products List</h1>
      <div className="products-container">
        <ProductCard product={product1} />
        <ProductCard product={product2} />
        <ProductCard product={product3} />
      </div>
    </div>
  );
}

export default App;