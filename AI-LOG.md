# AI-LOG.md

Tool: OpenCode (agent mode), model DeepSeek V4.1 Flash Free, for every entry except the last
two, which used Claude Code.
I made every commit myself; the assistants wrote code and drafts but never committed.
How the three written files were made: the assistant wrote the entries of this log for me,
right after each part; I wrote the REVIEW.md entries myself after each part and asked the
assistant to put them into the README's shape; the assistant drafted SELF_ASSESSMENT_REPORT.md
at the end. The setup entry was added at the end, when I noticed it was missing from the log.

## 2026-11-18 — setup and the starter commit
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: `npm install`, `git init` with my identity.
Ran: npm test → 19 failed (the starter state, as README says it should be); npm run lint → no
output.
Kept: the starter exactly as shipped.
Changed: nothing.
Rejected: nothing.

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
which is exactly when the cards must render. I told the assistant "16, 16 — memo không tiết
kiệm được gì hết" (16 renders both ways — the memo saves nothing) and ran `git revert d97ba7d`
myself, which made `d17929a`; REVIEW.md entry 7.

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
Asked about it: after reading the diff I sent "theo tôi biết thì khi bấm Place order thì cái
CheckoutForm.jsx nó gửi hết thuộc tính mà form cần rồi cái nào thiếu thì display..." (my reading
was that submit collects the attributes and shows whichever is missing). I checked F2 in
brief-ia4.md again: the errors are worked out from the fields, not stored, and the messages only
show after the first try, through `tried`. So I kept the computed version; REVIEW.md entry 8.
I left this exchange out when I first wrote this entry and added it later.
Changed: nothing.
Rejected: nothing.

## 2026-11-18 — one CSS framework (C1–C3)
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: style the page with one CSS framework installed with npm, keeping the labels,
buttons and list elements the briefs ask for, with buttons at least 44 px tall and the products
in more than one column at 1280 px.
Ran: npm i bootstrap → package.json gains one line; npm test → 19 passed; npm run lint → no
output; row 19 in Chromium with every host but localhost unresolvable
(`--host-resolver-rules="MAP * ~NOTFOUND, EXCLUDE localhost"`): the page stayed styled and no
request went to any domain other than localhost:5173; at 360 / 768 / 1280 px there was no
sideways scrolling, nothing clipped, no button under 44 px and the products sat in 1 / 2 / 3
columns. Row 13: `git diff 59d2140 -- package.json vite.config.js` shows only the bootstrap line.
Kept: the Bootstrap import in `src/main.jsx` from `node_modules` (not a CDN); the grid on the
existing `ul`/`li` (`row g-3` + `col-12 col-md-6 col-xl-4`); `min-height: 44px` in
`src/index.css` because a framework's default button padding does not guarantee 44 px;
`overflow-wrap: anywhere` on card titles so the long Vietnamese name cannot widen a card at
360 px.
Changed: nothing.
Rejected: nothing.

## 2026-11-18 — written files, after each part
Tool: OpenCode (DeepSeek V4.1 Flash Free).
After each part I wrote its REVIEW.md entries myself and asked the assistant to put them into
the README's shape (where, decision, what decided it, why, sentence sent) and to write the
AI-LOG.md entry for that part. These requests landed in the commits below:
- `71f6e58` — AI-LOG entries for the plan and the session 6 page.
- `0bc20df` — REVIEW entries 1–3 (session 6) and the AI-LOG wishlist entry, committed together
  with the wishlist code.
- `6073d66` — REVIEW entries 4–7 (wishlist, memo) and the AI-LOG memo entry.
- `381acbd` — REVIEW entry 8 and the AI-LOG form entry.
- `9a53866` — REVIEW entries 9–10 and the AI-LOG framework entry (with the self-assessment, next
  entry).
Kept: the shape the assistant gave my entries; the AI-LOG entries it wrote.
Changed: nothing at the time; the fixes are in the entries below.
Rejected: nothing.

## 2026-11-18 — the self-assessment draft and a pass over the written files
Tool: OpenCode (DeepSeek V4.1 Flash Free).
Asked for: draft `SELF_ASSESSMENT_REPORT.md` from what the earlier requests actually did, and
check REVIEW.md and AI-LOG.md against the history — no claim that was not run or read, every
REVIEW entry tied to a commit and to lines that exist in that commit.
Ran: checked every cited line with `git show <commit>:<file>`; `npm test` → 19 passed;
`npm run lint` → no output; row 3 prints nothing; `git diff 59d2140 -- package.json
vite.config.js` shows only the bootstrap line. Read the drafts back against the rubric's shape.
Kept: the self-assessment table, with claims set below the maximum where the evidence was
thinner.
Changed: added the setup entry I had left out, and said so in the opening line; removed the
"starter commit is not logged" bullet from the self-assessment, raised that claim from 8 to 9
and the total from 93 to 94; rewrote the "What I would do differently" sentence that still asked
for the setup entry; corrected three citations in the self-assessment draft that had drifted
after the Bootstrap commit — `src/App.jsx` lines 31–32 → 35–36, `src/App.jsx` line 40 → 41,
`src/components/ProductList.jsx` line 4 → 8 (the self-assessment cites lines as of `ed59caa`;
REVIEW.md cites each line as of its own commit, so its 31–32 and 40 are still right there) —
and two in the new framework entry (`ProductList.jsx` line 5 for the grid,
`ProductCard.jsx` lines 13 and 30 for the column and button classes).
Rejected: nothing.

## 2026-11-18 — a trial marking before submitting
Tool: Claude Code (Claude Opus 5.5).
Asked for: mark the project against the rubric the way the marking does, and say what could
still gain points.
Ran (by the assistant): copied the starter zip's `checks/` over mine (identical); `npm test` →
19 passed; `npm run lint` → no output; row 3 and row 13 clean; rows 4–10, 14, 16–19 in headless
Chrome with every host but localhost blocked — all pass; every line REVIEW.md cites checked with
`git show <commit>:<file>`. No file changed.
Kept: the estimate (code at the maximum; REVIEW.md, AI-LOG.md and the commit history are where
marks can still move).
Changed: nothing.
Rejected: nothing.

## 2026-11-18 — clarify REVIEW.md, AI-LOG.md and the self-assessment
Tool: Claude Code (Claude Opus 5.5).
Asked for: fix the points the trial marking raised, in the written files only, without committing.
Result: REVIEW.md entry 6 says the first version was never committed on its own; entry 7 says I
asked for the memo and ran the revert myself; the form entry above gains the sentence I sent
about the errors; the documentation entry says where the corrected citations live; the
self-assessment says `0bc20df` also carries documentation and that the form was not preceded
by a clean commit; the opening of this log says who wrote what in the three written files; the
single "three written files" entry is split into the written files after each part (with
their commits) and the self-assessment draft.
Kept: every edit as the assistant made it, after reading `git diff` of the three files — the
new lines say what happened (who reverted, which sentence I sent, which commit holds what) and
change no claimed mark; no file in `src/` was touched.
Changed: none.
Rejected: none.
