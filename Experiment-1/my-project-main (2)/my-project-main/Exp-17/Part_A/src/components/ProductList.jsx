import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_BASE_URL = 'http://localhost:5000';

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to connect to the server. Make sure the backend is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Retry function
  const handleRetry = () => {
    fetchProducts();
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-list">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
          <div className="error-help">
            <small>Make sure the backend server is running on http://localhost:5000</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Product List</h2>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button>Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;