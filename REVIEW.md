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
