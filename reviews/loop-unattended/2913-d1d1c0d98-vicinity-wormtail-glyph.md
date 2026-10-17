# Review 2913 — d1d1c0d98 — vicinity 2nd loop reads the displayed glyph

- SHA: `d1d1c0d98` (dfeature_at/Samurai-49956004@830
  writer: hallucinated wormtail paint)
- D-entry: D-4075; Ledger: detect.c
  (`do_vicinity_map` family)
- `js/` diff: `js/detect.js` +12/−5 (2nd-loop
  predicate + import name + 2 comment fixes); new
  `scripts/vicinity-wormtail-glyph.test.mjs`

## Intent vs deliverable

Promise: the 2nd-loop predicate now tests the
displayed glyph id (`glyph_is_monster` +
wormtail exclusion, C order, short-circuit) instead
of `m_at.mnum`, so a hallucinated long-worm-tail
paint skips the I-replace like C; Samurai s830→
s1170. The diff is exactly that predicate plus the
import name and two stale-comment fixes. Promise =
diff.

## Inventory

- `do_vicinity_map` 2nd loop (detect.js:1208–
  1224): predicate replaced; `m_at` kept for the
  canspotmon arm. C: detect.c :1447–1585, loop at
  :1566–1576.
- Import: `glyph_to_mon` appended to the existing
  `./display.js` line — name only, ALREADY edge.
- Two "seer_turn still named" comments corrected
  (caller wired at allmain.js:1420 — verified).

No deleted symbols, no re-pointed clones — step-3
paste not triggered. Callee LIVE (display.js:1234,
sync).

## C ↔ JS fidelity

Confirmed against pinned C:

- C :1570–1573 `newglyph = glyph_at(zx, zy); if
  (glyph_is_monster(newglyph) &&
  glyph_to_mon(newglyph) != PM_LONG_WORM_TAIL) {
  if ((mtmp = m_at(...)) == 0 || !canspotmon)
  map_invisible; }` — JS is the exact De Morgan
  with C test order and short-circuit, and the
  inner `m_at`/canspotmon arm untouched below.
- `newglyph.glyph` is `loc.disp_glyph`
  (detect.js:1107–1112), the same numeric id
  source as `glyph_at` (display.js:1122–1131,
  C :2477–2483) — the displayed glyph, not the
  monster. `glyph_is_monster` covers the four
  banks (:1095–1097); `glyph_to_mon` bank order
  (female/male/pet-f/pet-m/detected-f/detected-m/
  ridden-f/ridden-m, else NUMMONS) matches
  display.h:776–793 arm-for-arm.
- Mechanism complete: under hallucination the 1st
  loop's map_monst paints what_mon(random), which
  can roll LONG_WORM_TAIL — the one roll where C
  skips and the old JS (m_at.mnum = soldier)
  fired. The D-4064 paradox (C floor memory with
  a soldier at the cell) requires exactly this
  static resolution since show_glyph is
  display-only.

## Hallucinations / overclaim

None. do_vicinity_map vacuity stated as
writer-note. Sibling arms explicitly scoped out
with the D-4064 399/399 measurement as the
faithfulness evidence — a cited prior, not a
fresh claim.

## Density

Cliff writer (owner dfeature_at was the region
heuristic; D-4064 DIAGNOSED park cornered this
writer — park discipline followed). One `Ledger:`
entry. No unreached work.

## Verification

Re-measure (`--base d1d1c0d98~1 --no-reach`):

```text
verify dfeature_at: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Samurai-49956004: moved → step 1290 (was 830)
verify do_vicinity_map: no corpus session is blocked (vacuous, disclosed)
```

Movement confirmed; HEAD shows 1290 rather than
the in-commit 1170 because D-4076 (next SHA)
moved it further 1170→1290 — consistent, and
re-checked under 2914. No FORCE/DIAG/seed/coords
in the `js/` hunks. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
