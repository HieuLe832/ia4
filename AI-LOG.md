# AI-LOG.md

Tool for every entry: OpenCode (agent mode), model DeepSeek V4.1 Flash Free.
I made every commit myself; the assistant wrote code and drafts but never committed.
Each entry was written right after the work it describes.

## 2026-11-18 — plan before code
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: a plan first — which components, where the search text, the products, the cart
and Details would live, and what the wishlist context would hold — before any code.
Ran: nothing — there was no code yet. I read the plan against brief.md Structure,
brief-ia4.md W5 and rows 11, 15, 20.
Kept: the plan as proposed — query and cart in App, products in useProducts, Details inside
ProductCard, one WishlistProvider above the header later.
Changed: nothing.
Rejected: nothing.

## 2026-11-18 — session 6 shop page (brief.md)
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: the page of brief.md — search with a 250 ms debounce, one role="status" line, the
product list, the cart, Details per product, failure with Retry, latest search wins, one
component per file.
Ran: npm test → C1–C11 pass, I1–I8 not written yet at this step (expected); npm run lint →
no output; rows 4, 5, 6, 7, 8, 9, 10 and 12 by hand in Chromium against npm run dev. Row 6:
the first Retry went out before the mode switch reached the server, so that request arrived
under `error` (the terminal log showed it); once the switch had taken effect, Retry returned
the 8 cards and the button disappeared. Row 8: q=c, q=ca, q=cap — one request per typed
character, none while idle, and no (canceled) request on reload because the debounce clears
StrictMode's first timer before it sends.
Kept: the file split (useProducts + SearchBox / ProductList / ProductCard / CartSummary);
abort in the effect cleanup with a 250 ms debounce (row 7, row 8); the cart as
[{ product, qty }] with count and total computed in App (row 10, row 11); key={product.id}
in ProductList (row 9); Details open state inside ProductCard (row 9).
Changed: nothing — no row failed on the first run.
Rejected: nothing.

## 2026-11-18 — wishlist through a context (W1–W5)
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: the wishlist part — a `Save` button with `aria-pressed` on every card, the header
`Saved: N`, a `Saved` panel listing names in the order saved, `src/WishlistContext.jsx` with
one provider for the page, `ProductCard` reading it through a hook, and the count computed.
Ran: npm test → I1–I3 pass and C1–C11 still pass; npm run lint → no output; rows 14, 15 and 20
by hand. Row 14: Saved: 0 → saved Cap and Jacket → Saved: 2 with the panel listing Cap, Jacket;
typed `hood` and both stayed counted and listed; cleared the box and Cap's Save was still
pressed. Row 15: React DevTools shows one `WishlistProvider` above the header, the cards and
the panel. Row 20: read — `ProductCard` uses `useWishlist()`, the count is `saved.length` at
`src/WishlistContext.jsx:23`, not a `useState`.
Kept: one provider above the whole page (row 15); the saved list as an array of product objects
in save order, with `isSaved` and `toggle` in the context (rows 14, 20); the panel rendering
names as text (I2).
Changed: the first version only set `aria-pressed` and left the button looking exactly as
before; on row 14 I could not see which cards were saved, so CSS for
`button[aria-pressed='true']` was added (`src/index.css`) and I checked the pressed look again.
Rejected: nothing.

## 2026-11-18 — memoize the wishlist context value (rejected and reverted)
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: memoize the context value — `useCallback` for `toggle` and `isSaved`, `useMemo` for
the object — to stop every `ProductCard` re-rendering when `App` renders for something else,
such as *Add to cart*.
Ran: `console.count('ProductCard')` as the first line of `ProductCard`, console cleared, then
*Add to cart* on Cap once: **16 renders on `d97ba7d` and 16 again after the revert** (8 cards × 2
from StrictMode's double render in development). `npm test` 14 passed, `npm run lint` silent,
rows 14, 15 and 20 unchanged after the revert.
Kept: nothing from this request — the behaviour and the test results were identical.
Changed: nothing.
Rejected: the memo itself. `WishlistProvider` sits inside `App`, so every render of `App`
recreates the children and each card renders anyway; the value changes only when `saved` does,
which is exactly when the cards must render. Reverted in `d17929a`; REVIEW.md entry 7.

## 2026-11-18 — checkout form (F1–F5)
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: a `Checkout` form inside the cart — Name, Phone (`type="tel"`), Note (optional) with
a `0/200` counter, a `Place order` button, one message per field only after the first try,
linked with `aria-describedby` and `aria-invalid`, the empty-cart message, and a confirmation
that empties the cart and the fields without touching the wishlist.
Ran: npm test → 19 passed; npm run lint → no output; rows 16, 17 and 18 by hand. Row 16: placed
an order for An, saw `Order placed for An: 1 item, 420.000 đ.`, the cart went to 0 items and the
address bar still read `localhost:5173/`. Row 17: an empty form gave the Name message, the
Phone message and `Add something to the cart first.`; after a 9-digit phone the Name and cart
messages were still there, which is what F2 and F3 ask for. Row 18: Tab reached every field and
button with a visible focus ring.
Kept: the errors computed from `name` and `phone` on every render (`CheckoutForm.jsx` lines
17–18) with `aria-describedby` only while a message shows (lines 51, 68); `preventDefault` in
the submit handler (line 25) so the page never reloads and the fields never reach the URL; the
confirmation clearing the cart through `onPlaced` and resetting `tried` so no error appears on
the cleared form.
Changed: nothing.
Rejected: nothing.
