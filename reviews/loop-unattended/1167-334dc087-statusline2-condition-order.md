# Review 1167 — 334dc087 — status line 2 condition order (D-2201)

Metadata: SHA `334dc087`, `js/display.js` only (reorder inside
`_statusLine2` + doc). D-log: D-2201. Queue: 13 sessions
screen-first at botl.c:130; 4 pure-order, 9 value-residuals.

## Intent vs deliverable

Subject promises: emit the tty field-path order (hunger, cap,
rank-sorted conditions) instead of the `:170–206` append order.
Diff actually does only that — predicates untouched, order moved.
Promise kept. (D-log honestly notes a first attempt with the wrong
relative order, corrected and re-verified before ship.)

## Inventory

Changed JS: `_statusLine2` (`js/display.js`). No new imports, no new
helpers, no clones/stubs. Nothing deleted or re-pointed.

## C ↔ JS fidelity

Verified against pinned C myself, not just the D-log citations:

- Append block `botl.c:165–206` (read): Stone/Slime/Strngl/Sick,
  hunger, enc, Blind/Deaf/Stun/Conf/Hallu/Lev/Fly/Ride — the OLD JS
  order. The live tty path is not this string: `bot()` takes
  `bot_via_windowport()` whenever `VIA_WINDOWPORT()`
  (`botl.c:261–262`; true when `WC2_FLUSH_STATUS` is set,
  `botl.h:213`, which `windows.c:982` forces).
- Field order `windows.c:950–975`: line two runs `… BL_TIME,
  BL_HUNGER, BL_CAP, BL_CONDITION, BL_FLUSH` — hunger and cap ahead
  of every condition word ✓.
- Rank table `botl.c:781–813` (read): Strngl 4; FoodPois/Slime/
  Stone/TermIll 6; Blind/Conf/Deaf/Fly/Hallu/Lev/Ride/Stun 10.
  Comparator `cond_cmp` (`botl.c:1331–1342`, read): rank asc,
  tiebreak `strcmpi` on the useroption — foodPois < slime < stone <
  termIll; blind < conf < deaf < fly < hallucinat < levitate < ride <
  stun ✓. The tty draw loop walks `cond_idx[]` in exactly this order
  (`wintty.c:5073–5074`).
- New JS emission: hunger, cap, Strngl, FoodPois, Slime, Stone,
  TermIll, Blind, Conf, Deaf, Fly, Hallu, Lev, Ride, Stun ✓ —
  matches the table rank-for-rank, alpha-for-alpha.
- Predicates: diffed old vs new expression-for-expression — every
  gate identical, only moved; the Sick split into two `sickActive`
  gates is equivalent to the old nested form ✓. The four recorded
  orders (`Burdened Slime Blind`, `Conf Deaf`, `Hallu Stun`,
  `Satiated TermIll`) all fall out of the new order ✓.

Named omits (`cond_shrinklvl` abbreviations, opt_in conditions,
MAXCO/showvers) are map-named with the stated reason (no corpus
session needs them) — not Must-fix. Note: rank-2 `Grab` and rank-8
`InLava` are opt_out yet unemitted by JS; pre-existing omission,
untouched here, no session records them — not this SHA's debt.

## Hallucinations / overclaim

None. The "Match C" is for dispatch order with all predicates live;
the 9 untouched value-residuals are explicitly excluded and were
parked separately (8036c1dc), not claimed.

## Density

One-function reorder closing 2 rows + moving 2, ~30 changed lines
in one module. §2b right-sized.

## Verification

D-log Verify: syntax, rule2, hidden 2 PASS + 2 moved, green, strict,
cohort, full 44/44 (shared file). Re-measured myself:
`verify do_statusline2 --base 334dc087~1` →
`2 PASS (92035, 92091), 2 moved past (92138 66→do_statusline1@72,
92067 196→list_vanquished@224), 9 unchanged, 0 worse → PROGRESS` —
byte-identical to the claim, no D-1831 shape. Rule #2 re-run clean.
No FORCE/DIAG/seed/coordinate in the hunk.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
