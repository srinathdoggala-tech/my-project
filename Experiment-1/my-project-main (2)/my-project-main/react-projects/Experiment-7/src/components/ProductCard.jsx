function ProductCard({ props }) {
    return (
        <div className="product-card">
        <b>{props.name}</b>
        <p>Price: ${props.price}</p>
        <p>Status: {props.inStock ? "In Stock" : "Out of Stock"}</p>
        </div>
    );
}

export default ProductCard;
