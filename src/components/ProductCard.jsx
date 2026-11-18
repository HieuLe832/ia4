import { useState } from 'react';
import { vnd } from '../format.js';

export default function ProductCard({ product, onAddToCart }) {
  // Whether Details is open lives here, next to its product (brief.md item 8).
  const [open, setOpen] = useState(false);

  return (
    <li className="card">
      {/* React escapes this text: "Scarf <i>limited</i>" shows its brackets (item 9). */}
      <h2>{product.name}</h2>
      <p className="price">{vnd(product.price)}</p>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        Details
      </button>
      {open && <p className="description">{product.description}</p>}
      <button type="button" onClick={() => onAddToCart(product)}>
        Add to cart
      </button>
    </li>
  );
}
