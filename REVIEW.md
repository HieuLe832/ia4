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
  `aria-pressed={saved}` at `src/components/ProductCard.jsx` line 28. The first version (the
  attribute without the CSS) was never committed on its own, so `0bc20df` holds only the version
  after the change (SELF_ASSESSMENT_REPORT.md, *What I did not manage*)
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
  for `toggle` and `isSaved`, `useMemo` for the value); reverted in commit `d17929a`. I had asked
  for this memo myself, to stop the cards re-rendering on *Add to cart* (AI-LOG.md); the
  assistant wrote it, and the measurement below is why I threw it away
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
  memo saves nothing); then I ran `git revert d97ba7d` myself, which made `d17929a`

### 8. The form errors are recomputed from the fields, not stored
- **Where:** commit `b76245d`, `src/components/CheckoutForm.jsx` lines 17–18, with
  `aria-describedby` only while a message shows at lines 51 and 68
- **Decision:** kept
- **What decided it:** row 17 and check I5 — with every field empty, Place order showed the Name
  message, the Phone message and `Add something to the cart first.`; after typing a 9-digit
  phone the Name message was still there (Name was still empty) and the cart message was still
  there (the cart was still empty), which is what F2 and F3 ask for; row 18 — Tab reached every
  field and button with a visible focus ring
- **Why:** the two errors are computed on each render from `name` and `phone`, so a message and
  its field cannot disagree; the alternative — a copy of the errors kept in state and synced by
  an effect — is the shape the rubric says loses marks
- **Sentence sent:** "theo tôi biết thì khi bấm Place order thì cái CheckoutForm.jsx nó gửi hết
  thuộc tính mà form cần rồi cái nào thiếu thì display..." (my reading was that submit collects
  the attributes and shows whichever is missing) — I checked the brief again and kept the
  computed version

### 9. One framework from npm: Bootstrap, imported from `node_modules`
- **Where:** commit `ed59caa`, `src/main.jsx` line 3 and `package.json` line 16
- **Decision:** kept
- **What decided it:** row 19 with the network to anything but localhost blocked — the page still
  had its styles, and the Network tab showed no request to any domain other than `localhost:5173`;
  row 13 — `git diff <starter> -- package.json vite.config.js` shows only the one `bootstrap`
  line and no change to `vite.config.js`
- **Why:** a CDN link would leave the page unstyled exactly when the marking run blocks external
  network; importing from `node_modules` means the styles ship with the project, and Bootstrap
  needs no Vite plugin, so `vite.config.js` could stay untouched
- **Sentence sent:** none — kept as written

### 10. Keeping the elements and the 44 px buttons while using Bootstrap
- **Where:** commit `ed59caa`, `src/index.css` lines 5 and 8; the classes are in
  `src/components/ProductList.jsx` line 5 (the grid on the `ul`) and
  `src/components/ProductCard.jsx` lines 13 and 30 (the `col-12 col-md-6 col-xl-4` on each `li`
  and the `btn` classes on the buttons)
- **Decision:** kept
- **What decided it:** row 19 at 360, 768 and 1280 px — no sideways scrolling, no button under
  44 px tall, and the products in 1 / 2 / 3 columns; C3 read — every label is still a `<label>`,
  every action still a `<button>`, the list is still a `<ul aria-label="Products">` with `<li>`
- **Why:** a framework's default button padding does not guarantee 44 px, so `min-height: 44px`
  states the requirement once; the grid goes on the `ul`/`li` that the briefs ask for instead of
  replacing them with `div`s, and `overflow-wrap` keeps the long Vietnamese name from widening a
  card at 360 px
- **Sentence sent:** none — kept as written, the first styled version passed row 19
