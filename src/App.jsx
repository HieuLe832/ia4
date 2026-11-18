import { useState } from 'react';
import { WishlistProvider } from './WishlistContext.jsx';
import Header from './components/Header.jsx';
import SavedPanel from './components/SavedPanel.jsx';
import SearchBox from './components/SearchBox.jsx';
import ProductList from './components/ProductList.jsx';
import CartSummary from './components/CartSummary.jsx';
import { useProducts } from './useProducts.js';

const STATUS_TEXT = {
  loading: 'Loading products…',
  empty: 'No products match.',
  error: 'Could not load products.',
  idle: '',
};

export default function App() {
  // The search text and the cart live here (brief.md, Structure).
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const { products, status, retry } = useProducts(query);

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (!existing) return [...items, { product, qty: 1 }];
      return items.map((item) =>
        item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item,
      );
    });
  };

  // Count and total are computed from the cart, never kept in state (item 7).
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // The one wishlist provider for the page sits above the header, the cards and
  // the Saved panel (W5, row 15).
  return (
    <WishlistProvider>
      <Header />
      <main>
        <SavedPanel />
        <SearchBox value={query} onChange={setQuery} />
        <p role="status">{STATUS_TEXT[status]}</p>
        {status === 'error' && (
          <button type="button" onClick={retry}>
            Retry
          </button>
        )}
        <ProductList products={products} onAddToCart={addToCart} />
        <CartSummary count={count} total={total} />
      </main>
    </WishlistProvider>
  );
}
