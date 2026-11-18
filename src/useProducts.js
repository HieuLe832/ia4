import { useEffect, useState } from 'react';

// brief.md item 2: wait at most 300 ms after the last keystroke.
const DEBOUNCE_MS = 250;

/**
 * The products for the current search text, plus the status of that request.
 *
 * status: 'loading' | 'idle' | 'empty' | 'error'
 * retry:  sends the current search again (brief.md item 5)
 */
export function useProducts(query) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    const timer = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          setStatus(data.length === 0 ? 'empty' : 'idle');
        })
        .catch(() => {
          // An answer for an older text must be dropped, not reported (item 6).
          if (controller.signal.aborted) return;
          setProducts([]);
          setStatus('error');
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, attempt]);

  return { products, status, retry: () => setAttempt((n) => n + 1) };
}
