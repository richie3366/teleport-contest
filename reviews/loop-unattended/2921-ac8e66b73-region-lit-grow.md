# Review 2921 — ac8e66b73 — des.region "lit" gains the W_ANY grow

- SHA: `ac8e66b73` (S1 questtour-Monk
  writer: Mon-strt (2,6) dark)
- D-entry: D-4083; Ledger: sp_lev.c
  (`lspo_region split` + 15 loaders)
- `js/` diff: `js/mklev.js` +30/−121 (15
  inline loops → `light_region` calls;
  Kni-goal restructured); new
  `scripts/des-region-grow.test.mjs`

## Intent vs deliverable

Promise: the 15 hand-ported
des.region(sel,"lit") loops set the ungrown
rect; C grows W_ANY first (:5624), so edge
cells like Mon-strt (2,6) stay dark in JS
and hide the arriving elemental. Replace
all 15 with the live grow+set helper; S1
FULL PASS (865 screens). The diff is
exactly the 15 swaps. Promise = diff.

## Inventory

- 15 call sites → `light_region(x1, y1,
  x2, y2, true)` (same file, no new
  imports). C: sp_lev.c :5613–5631.
- `light_region` (mklev.js:30580,
  pre-existing local): grow ±1 when lit,
  clamp, lava-or-numeric set. A step-3
  CLONE (no single-C-function namesake) —
  verified against the C sequence here.
- No deleted symbols, no re-pointed
  imports — step-3 paste not triggered.

## C ↔ JS fidelity

Confirmed against pinned C:

- lspo_region argc==2 (:5613–5631):
  clone selection, rlit 0/1, `if (rlit)
  selection_do_grow(sel, W_ANY)` — grow
  ONLY for lit ✓ — then iterate
  sel_set_lit ✓.
- Grow ≡: W_ANY = all 4 bits
  (sp_lev.h:10–14) → all 8 neighbor
  tests live → solid rect grows to the
  solid ±1 box, diagonals included.
  C clips [0,COLNO-1]×[0,ROWNO-1] in the
  grow loop (selvar.c:336–337), then
  iterate's isok drops x=0 (cmd.c:4326:
  x≥1). Net: [max(lx-1,1),
  min(hx+1,COLNO-1)]×[max(ly-1,0),
  min(hy+1,ROWNO-1)] — byte-identical to
  the JS clamps ✓.
- Set ≡: sel_set_lit :5539 `lit =
  (IS_LAVA||lit) ? 1 : 0` numeric ✓ vs
  JS `IS_LAVA ? 1 : litstate` ✓. Bonus:
  the old loops wrote boolean `true`;
  the helper writes numeric like C.
- No RNG on the path (grow/iterate/set
  draw nothing; W_RANDOM not used) ✓.
- Kni-goal: lua order lit-then-unlit
  (Kni-goal.lua:33–34) preserved by the
  hoist; unlit keeps its ungrown inline
  loop = C (rlit=0 skips grow) ✓. Its
  rect holds no lava (map read), so the
  untouched loop's unconditional `false`
  differs from C's lava-or nowhere here.
- Completeness: 15/15 converted (counted
  in the diff); the other "lit" comments
  in the file already call light_region;
  the 6 remaining `loc.lit = true` loops
  are other C paths (bitmap paints,
  AIR fill, room-lit rect, pre-grown tut
  rects) — none is the 2-arg form.

## Hallucinations / overclaim

None. "Named: none" is earned — the
equivalence above covers grow, bounds,
lava, numerics, and RNG on all 15 rects.
Temp-C reverted per the message (recorder
tree untouched in this diff — verified
by the stat: no nethack-c paths).

## Density

Cliff writer (S1), 1/1 → PASS, 865
screens. One `Ledger:` entry. Full 44/44
in-commit (mklev.js shared). The
geom-probe + fmon-dump measurement chain
is documented, not theorized. No
unreached work.

## Verification

Re-measure (`--base ac8e66b73~1 --no-reach`):

```text
verify background_enlightenment: 1 PASS, 0 moved past, 0 unchanged, 0 worse
  scen-questtour-Monk-50557003: PASS
```

Exact match. Focused test 1/1 green
here. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
