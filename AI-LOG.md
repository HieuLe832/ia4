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
