# Review 2831 — a539c7a1a — gs.sell_response starts 'a' per decl.c:720

- SHA: `a539c7a1a` (D-3986)
- Files: `js/shk.js` (+6/−4), focused test
  `scripts/sellobj-startup-autosell.test.mjs` (new, 48 lines)
- Method: cliff writer (1 C datum + its reader); whole Method.
- Cites: C `decl.c:720`, `shk.c:3913–3924` sellobj_state,
  `shk.c:4159–4185` sell switch — read directly.

## Intent vs deliverable

Promise: all 5 probes diverge identically — C draws a lone `rnd(2) @
next_ident(mkobj.c:521)` as the step's last draw (the sale's nextoid);
JS prompts `Sell it? [ynaq]` where C auto-sells. Root cause: C's gs
initializer sets `sell_response = 'a'` explicitly, not BSS null. Diff:
one-line init `null → 'a'` + corrected cite comment. Promise and diff
agree.

## Inventory

- `ensure_sell_state` — `js/shk.js:2665` vs C `decl.c:720`. Status:
  init corrected.
- `sellobj` switch — `js/shk.js:3153–3180` vs C `shk.c:4159–4185`.
  Status: pre-wired, now fed the right preset.
- `sellobj_state` — `js/shk.js:2674` vs C `shk.c:3913–3924`. Status:
  already exact, untouched.

## C ↔ JS fidelity

C, verified line by line:

- `decl.c:720` `'a', /* sell_response */` sits in the explicit gs
  initializer (`:721` SELL_NORMAL follows) — NOT BSS ✓. The old JS
  comment claiming BSS-'\0' was wrong; the corrected comment cites
  `:720–721` ✓.
- `shk.c:4159` `switch (gs.sell_response ? gs.sell_response :
  nyaq(qbuf))`, `case 'a': gs.sell_response = 'y'` + fallthrough to
  `'y'` → `pay(-offer, shkp)` `:4171–4180` ✓ — JS `:3156–3180`
  matches arm for arm (q→n persist, n restock, a→y persist, y pay).
- `shk.c:3921` `(deliberate != SELL_NORMAL) ? '\0' : 'a'` ✓ — JS
  `sellobj_state` (`null` = query) already matched; deliberate drops
  still query, accidental drops auto-accept.
- RNG: the `rnd(2)` is `next_ident` via the sale chain (nextoid), not
  in this diff; the one-draw stream shift follows from the missed
  auto-sale exactly as described ✓.

No symbol deleted or re-pointed → `sym.mjs` N/A. Diff grep clean; no
new import, no DIAG/FORCE/seed.

Nit (not queueable — comment, not behavior): `js/shk.js:2972` still
says "D-1019: BSS sell_response is '\0' (query), not 'a'" — the claim
D-3986 refuted. Stale cite drift; fix inside any future shk iteration,
never a row.

## Hallucinations / overclaim

None. The five-session measurement (offers/prices/messages matched
pre-fix, only the accept differed) is corroborated by the exact
re-measure below.

## Density

Cliff head of its parent (`next_ident` x5, Must-fix empty) ✓. One
datum, whole causal chain pre-verified, `Ledger:` entry touched
(`shk.c.jsonl`), focused test 1/2→2/2.

## Verification

Ship-time: `verify next_ident: 2 PASS, 3 moved past, 0 unchanged, 0
worse` + reach-all 543/543 REACH-OK; green/strict/cohort.
Re-measure (`verify next_ident --base a539c7a1a~1 --no-reach` on HEAD):
`2 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS` — landings
identical (911→on_msg@1083, 688→describe_decor@897, 1258→flooreffects
@1493, 2 PASS). Exact match. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
