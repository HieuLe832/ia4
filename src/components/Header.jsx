import { useWishlist } from '../WishlistContext.jsx';

export default function Header() {
  const { count } = useWishlist();

  return (
    <header className="container pt-4">
      <div className="d-flex align-items-baseline justify-content-between flex-wrap gap-2">
        <h1>Shop</h1>
        <p className="saved-count mb-0 fw-semibold">Saved: {count}</p>
      </div>
    </header>
  );
}
