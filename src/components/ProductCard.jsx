import { useState } from 'react';
import { vnd } from '../format.js';
import { useWishlist } from '../WishlistContext.jsx';

export default function ProductCard({ product, onAddToCart }) {
  // Whether Details is open lives here, next to its product (brief.md item 8).
  const [open, setOpen] = useState(false);
  // The wishlist comes from the context, not from props (W5).
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.id);

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
      <button type="button" aria-pressed={saved} onClick={() => toggle(product)}>
        Save
      </button>
    </li>
  );
}
