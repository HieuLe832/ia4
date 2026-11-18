import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const WishlistContext = createContext(null);

/**
 * One provider for the whole page (brief-ia4.md W5).
 * `saved` holds the product objects in the order they were saved; the count is
 * derived from it, never kept in state.
 */
export function WishlistProvider({ children }) {
  const [saved, setSaved] = useState([]);

  const toggle = useCallback((product) => {
    setSaved((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, product],
    );
  }, []);

  const isSaved = useCallback((id) => saved.some((item) => item.id === id), [saved]);

  const value = useMemo(
    () => ({ saved, count: saved.length, isSaved, toggle }),
    [saved, isSaved, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error('useWishlist must be used inside a WishlistProvider');
  return value;
}
