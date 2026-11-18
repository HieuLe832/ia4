import { useWishlist } from '../WishlistContext.jsx';

export default function Header() {
  const { count } = useWishlist();

  return (
    <header className="header">
      <h1>Shop</h1>
      <p className="saved-count">Saved: {count}</p>
    </header>
  );
}
