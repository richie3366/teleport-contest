# Review 2648 — 9b729191f — query_objlist menu-glyph burn (D-3784)

Metadata. SHA `9b729191f` (2026-10-10), D-3784, parent
`1841f1954` (HEAD). js diff: `js/pickup.js` +11/−2 —
`obj_glyph(curr)` burn per allowed item in both
menu arms + import; new focused test
`scripts/query-objlist-menu-glyph-burn.test.mjs`
(4 its). Works cliffs row-2 flooreffects (95343).

## Intent vs deliverable

Promise: 95343@602 — hallu-monster-name fork on
matched positional RNG (19118) and identical map
(geom-probe 0 differing cells); the offset arose in
menu steps 597–601 because `query_objlist` never
burned C's per-item `obj_to_glyph(curr,
rn2_on_display_rng)`.

Diff delivers exactly that burn in both arms,
C-cited, glyph discarded. Promise and diff match.

## Inventory

Changed JS (1 writer, 1 call site × 2 arms):

- query_objlist burn — `js/pickup.js:870–876`
  (arm 1), `:904–910` (arm 2). C:
  `pickup.c:1024–1216` (body read; burn at
  `:1131` inside `if ((*allow)(curr))`, before
  `add_menu`; engulfer burn `:1157–1158`).
- Imported callee: `obj_glyph` —
  `js/display.js:2535` (live export, sync;
  `sym.mjs` confirms, no clone/re-point).

## C ↔ JS fidelity

**Burn C-exact.** C `:1131` burns once per allowed
item per menu pass, before `add_menu`; JS burns
once per allowed item before `items.push` in both
arms (sorted + unsorted). C's autoselect
early-return (`:1072–1077`, no menu → no burns)
matches JS `:815–817` (pinned by the control it).
`obj_glyph` draws the display stream only under
Hallu (statue separate, corpse second burn),
mirroring C `obj_to_glyph` → `random_obj_to_glyph`
(display.h); non-Hallu draws nothing on both
sides. JS sorted-arm order follows the menu order
like C's sortedolist passes. Engulfer
`mon_to_glyph` (`:1157–1158`) stays a named omit
(D-log + comment; no probe reaches
swallowed+Hallu query). No symbol deleted or
re-pointed, so no sym.mjs paste is owed beyond
the `obj_glyph` line above.

## Hallucinations / overclaim

None. Diff grep: zero hits. The do.c:336 owner is
explicitly named a misattribution (potion-arm
literal vs hitmu), the bogusmon data file was
exonerated by byte-compare before the port, and
95205's non-movement is named as a separate
writer, not hidden.

## Density

Cliff-phase §2b: one row-2 writer shipped whole
(the named omit), no bundling. Row-1 skip carries
the live falsifier check (both probes step-0
voids with the D-3733 throw). 95343 602 → 682
(+80 steps). Full 44/44 ran (menu-ubiquitous).

## Verification

D-log Verify: flooreffects 1 moved, 1 unchanged;
REACH-OK both fns; gates + cohort + full PASS.

Re-measured by this audit (`verify flooreffects
--base 9b729191f~1 --reach-all`):

```text
verify flooreffects: 0 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95343: moved → look_here at step 910 (was 602)
  scen-worldtour-Wizard-95205: still flooreffects at step 353
reach flooreffects: 1 PASS, 0 regressed → REACH-OK
```

95343 sits strictly later than the D-log's 682
(later SHAs moved it again); 95205 unchanged as
named. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
