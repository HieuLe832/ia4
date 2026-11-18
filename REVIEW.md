# REVIEW.md — what I kept, changed and rejected

Rows below are the *Done means* rows of `README.md`; "read" means I read the lines myself.
Every commit named here is in this repository. Line numbers are the ones in that commit,
so `git show <commit>:<file>` shows exactly the lines cited.

### 1. Abort in the effect cleanup, with a 250 ms debounce
- **Where:** commit `71f6e58`, `src/useProducts.js` lines 4, 18, 33 and 41 (as of that commit)
- **Decision:** kept
- **What decided it:** row 7 — in `out-of-order` mode, clearing the box and typing `sc` left
  only the scarf after 3 s and never showed an error; row 8 — one request per typed character
  (`q=c`, `q=ca`, `q=cap`), none while idle
- **Why:** the cleanup clears the debounce timer and aborts the request in flight, so an answer
  for an older text cannot replace the list; the `signal.aborted` branch returns before
  `setStatus('error')`, which is why a dropped answer is not reported as a failure
- **Sentence sent:** none — the first version passed rows 7 and 8, so I kept it as written

### 2. The cart holds product objects; count and total are computed
- **Where:** commit `71f6e58`, `src/App.jsx` lines 31–32, with the `cart` state above them
  (as of that commit)
- **Decision:** kept
- **What decided it:** row 10 — added Hoodie, then searched `shirt`: only T-shirt was listed
  and the cart still said `1 item` / `420.000 đ`; row 11 — read: neither the count nor the
  total is in `useState`
- **Why:** a card that leaves the search results cannot take its cart line with it, and a
  second copy of the count could drift away from the cart
- **Sentence sent:** none — kept as written

### 3. `key={product.id}` in the product list
- **Where:** commit `71f6e58`, `src/components/ProductList.jsx` line 8
- **Decision:** kept
- **What decided it:** row 9 — opened Details on Cap, typed `a`: Cap moved from 4th to 2nd and
  stayed open, and no other card was open
- **Why:** with the array index as key, React attaches the open state to the position instead
  of the product, so whatever lands in 4th place would open
- **Sentence sent:** none — kept as written

### 4. One wishlist provider above the whole page
- **Where:** commit `0bc20df`, `src/App.jsx` lines 40 and 54 (as of that commit)
- **Decision:** kept
- **What decided it:** row 15 — React DevTools shows one `WishlistProvider` above `Header`,
  `ProductList`/`ProductCard` and `SavedPanel`; I1–I3 pass
- **Why:** two providers would be two wishlists, so the header could count 0 while a card was
  already pressed; one provider is what makes W4 work — a saved product stays saved when the
  search hides it and comes back pressed
- **Sentence sent:** none — kept as written

### 5. The saved count is `saved.length`, not a `useState`
- **Where:** commit `0bc20df`, `src/WishlistContext.jsx` line 23
- **Decision:** kept
- **What decided it:** row 20 — read: the count is computed from `saved`; row 14 — after saving
  Cap and Jacket the header read `Saved: 2`, and it still read `Saved: 2` after a search that
  removed both cards from the list
- **Why:** a second copy of the count could drift away from the list; deriving it means saving
  and counting cannot disagree
- **Sentence sent:** none — kept as written

### 6. A pressed Save looked exactly like an unpressed one
- **Where:** commit `0bc20df`, `src/index.css` lines 61–67; the state itself is
  `aria-pressed={saved}` at `src/components/ProductCard.jsx` line 28
- **Decision:** changed
- **What decided it:** row 14, run by eye — after saving Cap the button was indistinguishable
  from the others and I had to open DevTools to know what was saved; after the CSS was added,
  the pressed button has a blue tint and is still blue when the card comes back from a search
- **Why:** the attribute is what the checks and screen readers read, but row 14 is marked by
  looking; the CSS reads the same `aria-pressed`, so the look and the state cannot disagree
- **Sentence sent:** "có khác đâu bạn???" (nothing is different?) — sent right after saving Cap:
  the first version only set the attribute, so the button looked unchanged

### 7. Memoizing the wishlist context value saved no renders
- **Where:** commit `d97ba7d`, `src/WishlistContext.jsx` lines 13, 21 and 23–26 (`useCallback`
  for `toggle` and `isSaved`, `useMemo` for the value); reverted in commit `d17929a`
- **Decision:** rejected
- **What decided it:** counting renders with `console.count('ProductCard')` as the first line of
  `ProductCard`, clearing the console and pressing *Add to cart* once: **16 renders on
  `d97ba7d` and 16 after the revert** (8 cards × 2 for StrictMode's double render in
  development). `npm test` 14 passed and `npm run lint` silent after the revert; rows 14, 15 and
  20 unchanged
- **Why:** `WishlistProvider` sits inside `App`, so every render of `App` — a keystroke in the
  search box, an *Add to cart* — recreates the children and every `ProductCard` renders anyway.
  The value only changes when `saved` changes, which is exactly when the cards must render, so
  the memo could not save a single render
- **Sentence sent:** "16, 16 — memo không tiết kiệm được gì hết" (16 renders both ways — the
  memo saves nothing), after which `d97ba7d` was reverted
