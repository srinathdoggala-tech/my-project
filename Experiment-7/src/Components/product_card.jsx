import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-status">
        Status: {product.instock ? 'In Stock' : 'Out of Stock'}
      </p>
    </div>
  );
}

export default ProductCard;