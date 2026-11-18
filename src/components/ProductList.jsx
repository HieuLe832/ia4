import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, onAddToCart }) {
  return (
    <ul className="products" aria-label="Products">
      {products.map((product) => (
        // key by id, not by index: Details must stay with its product (item 8).
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </ul>
  );
}
