# Self-assessment — IA#4

Submitted by: 24120048 - Le Hoang Hieu
Total I claim: **94 / 100**

Line numbers for `src/` below are the ones in commit `ed59caa`, the last commit that changed the
code; REVIEW.md names the commit each of its own citations belongs to.

| Criterion | Max | I claim | Evidence |
|---|---|---|---|
| The session 6 page | 20 | 20 | `npm test` → 19 passed (C1–C11); `npm run lint` silent; rows 4–10 and 12 run by hand in Chrome on 2026-11-18; row 3 prints nothing (`git diff --stat 59d2140 -- checks mock eslint.config.js index.html public`); row 11 read: `src/useProducts.js`, computed count and total at `src/App.jsx` lines 35–36, `key={product.id}` at `src/components/ProductList.jsx` line 8 |
| The wishlist (W1–W5) | 15 | 15 | I1–I3 green; row 14 run by hand (`Saved: 2` survives a search that hides the cards, and the Save comes back pressed); row 15: one `<WishlistProvider>` at `src/App.jsx` line 41; row 20 read: `ProductCard` uses `useWishlist()`, count is `saved.length` at `src/WishlistContext.jsx` line 23 (REVIEW.md entries 4, 5) |
| The checkout form (F1–F5) | 15 | 15 | I4–I8 green; rows 16–18 run by hand (no reload, address bar unchanged, one message per field, Tab reaches every field and button); errors computed at `src/components/CheckoutForm.jsx` lines 17–18, no effect syncing a copy (REVIEW.md entry 8) |
| One CSS framework (C1–C3) | 10 | 10 | `package.json` line 16 gains only `bootstrap`; imported at `src/main.jsx` line 3; row 19 with every host but localhost unresolvable: page still styled, no request leaves localhost, at 360 / 768 / 1280 px no sideways scroll, no button under 44 px, 1 / 2 / 3 columns (REVIEW.md entries 9, 10) |
| REVIEW.md | 20 | 17 | 10 entries, each with a commit and lines that exist, a row or check that decided it, and the sentence I sent where I changed or rejected something; changed: entry 6; rejected: entry 7 (measured 16 vs 16 renders, commits `d97ba7d` and `d17929a`); context, form and framework each covered |
| AI-LOG.md | 10 | 9 | One entry per request, starting with the setup and the starter commit, and ending with the documentation pass: setup, plan, session 6, wishlist, the rejected memo, form, framework, the written files after each part (with their commits), the self-assessment draft, and the two Claude Code entries of 2026-11-18. *Changed* and *Rejected* match REVIEW.md; the setup entry is the one written after the fact, and the log says so |
| Scope and commit history | 10 | 8 | The untouched starter is the first commit (`59d2140`); a commit before each request except the form's, and `0bc20df` mixes the wishlist with documentation (both under *What I did not manage*); parts as their own commits (`71f6e58`, `0bc20df`, `d97ba7d`/`d17929a`, `b76245d`, `ed59caa`); row 3 prints nothing; `vite.config.js` untouched |

## What I did not manage

- The "changed" decision in REVIEW entry 6 (giving the pressed Save a visible style) landed in the same commit as the wishlist itself, so the earlier version with only the attribute is not a separate commit in the history. The same commit `0bc20df` also carries REVIEW.md entries 1–3 and the wishlist AI-LOG entry, so it is not a code-only diff.
- The checkout form was written and tested before I committed the REVIEW.md and AI-LOG.md entries for the wishlist and the memo. I then committed those entries (`6073d66`) and the form (`b76245d`) separately, 30 s apart, so the form request was not preceded by a clean commit.
- Row 19 was checked by launching Chrome with `--host-resolver-rules="MAP * ~NOTFOUND, EXCLUDE localhost"`, which blocks every host except localhost. DevTools' own *Offline* mode also blocks localhost, so it shows the browser's offline page instead of the shop.
- I did not read every line of `src/` aloud the way the oral would ask me to, and I did not run rows on a real phone.

## What I would do differently

Write the setup entry at the time instead of at the end of the session, and give an appearance change its own commit instead of folding it into the part that produced it, so that a *changed* entry shows a before and an after in the history.
