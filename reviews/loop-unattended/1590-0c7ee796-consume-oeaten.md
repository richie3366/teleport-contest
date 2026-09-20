# Review 1590 — 0c7ee796 — eat.c consume_oeaten whole-body port (D-2631)

**Metadata:** SHA `0c7ee796`, `eat.c` `consume_oeaten`, D-2631.
JS: `js/eat.js` only (+31/−11).
Coverage row (partial → live). No prior review claimed closed.

## Intent vs deliverable

Subject promises: impossible arm (old code silently zeroed oeaten
on the 0-nutrition path), unsigned `>>>` shift/add, and the
victual reqtime=usedtime clamp. Diff delivers all three in C order
with per-arm cites. Promise matches deliverable.

## Inventory

- `consume_oeaten()` — restarted export, C order with per-arm cites.
- No new imports (`impossible` already imported); the sync
  fire-and-forget call cites the do_wear.js setworn `:618`
  precedent (impossible is async; every caller here is sync).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `eat.c:3807–3872` (66 L, via `csym.mjs consume_oeaten`).
Full C body read here. Arm-by-arm confirm:

- 0-nutrition arm `:3810–3825`: itembuf corpse/egg/tin `[corpsenm]`
  vs otyp decimal — exact, including the unreachable `"other?"`
  collapse (outer `if` guarantees one of the three, so the JS
  ternary chain's fallthrough-`tin` is equivalent). Old code's
  silent zeroing was the C-wrong fixed: now reports `impossible`
  with the verbatim C message and touches nothing.
- Shift arm `:3854–3856`: `(oeaten >>> 0) >>> amt` keeps C unsigned
  `>>=` semantics where `>>`/`|0` would sign-extend — exact.
- Decrement `:3857–3863`: `(oeaten >>> 0) > -amt` mirrors the
  `(int)` cast compare; the guarded add cannot wrap negative
  (strict `>` ⇒ result > 0), else 0 — exact.
- Zero-clamp `:3865–3871`: `reqtime = usedtime` when obj===piece
  plus the oeaten=1 floor — exact; the `?.` guard is defensive
  only (C comment: "always true unless wishing").
- `!obj` null guard kept (C NONNULLARG1) — defensive, disclosed,
  same class as the live `obj_nutrition` guard.

Caller wiring: all 6 C call sites have JS counterparts —
`eat.c:1970` → eat.js:2486, `:3036` → :4306, `:3149`/`:3154` →
:1527/:1530, `objnam.c:5392` → readobjnam.js:1777 (split name),
comment sites `:3879`/`:3907` mirrored at :2241/:2229. Exact.

Callee closure: `obj_nutrition` + `impossible` only — "Named: none"
accurate; done_eating/food_disappears live only in C's "better
solution" comment (`:3832–3834`), correctly not wired.

## Hallucinations / overclaim

None. D-log's "better solution" note shows the comment was read,
not skimmed.

## Density

66-line C function (half of it the "hack" comment), one module,
+31/−11. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify consume_oeaten --base
  0c7ee796~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled) + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Both summary lines cited; no REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
