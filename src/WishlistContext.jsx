import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

/**
 * One provider for the whole page (brief-ia4.md W5).
 * `saved` holds the product objects in the order they were saved; the count is
 * derived from it, never kept in state.
 */
export function WishlistProvider({ children }) {
  const [saved, setSaved] = useState([]);

  const toggle = (product) => {
    setSaved((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, product],
    );
  };

  const value = {
    saved,
    count: saved.length,
    isSaved: (id) => saved.some((item) => item.id === id),
    toggle,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error('useWishlist must be used inside a WishlistProvider');
  return value;
}
