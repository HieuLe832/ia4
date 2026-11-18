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
    <li className="col-12 col-md-6 col-xl-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column gap-2">
          {/* React escapes this text: "Scarf <i>limited</i>" shows its brackets (item 9). */}
          <h2 className="card-title h5 mb-0">{product.name}</h2>
          <p className="fw-semibold mb-0">{vnd(product.price)}</p>
          {open && <p className="text-secondary mb-0">{product.description}</p>}
          <div className="mt-auto d-flex flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((isOpen) => !isOpen)}
            >
              Details
            </button>
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              aria-pressed={saved}
              onClick={() => toggle(product)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
