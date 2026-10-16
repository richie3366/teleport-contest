# Review 2866 — be9a4992c — Bar-strt lit via grown light_region

## Metadata

- SHA: `be9a4992c763280ea333d85d51aa0e3efc6b3c14` (D-4024)
- Cliff writer: row 4 `teleport.c` level_tele @af8d2b0d6
  (rows 1–3/+8/+12 D-4016-kin, re-verified; owner whole,
  writer = Bar-strt lit)
- js/ diff: `js/mklev.js` +13/-13 (barLit closure → 10
  light_region calls); `scripts/bar-strt-lit-grow.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: the hand-rolled `barLit` painted rects ungrown,
but C `lspo_region` argc=2 grows `"lit"` selections W_ANY
before `sel_set_lit` (unlit ungrown) — the grown fringe
(map y0) stayed dark, hiding floor. Replace with the
grown+clipped `light_region` mirror. s11 → PASS.

Diff actually: closure deleted, 10 calls with per-line lua
cites. Promise == diff.

## Inventory

- `load_bar_strt` (`js/mklev.js:6552`, mirror of
  `dat/Bar-strt.lua:48-57`): lit-application lines only.

## C ↔ JS fidelity

- C `sp_lev.c:5614-5632` (read): argc==2 clones the
  selection, `if (rlit) selection_do_grow(sel, W_ANY)`,
  then `selection_iterate(sel, sel_set_lit, &rlit)`. Lit
  grows, unlit does not — exactly the ported rule.
- Grow equivalence: W_ANY on a solid rect is the rect ±1
  incl. corners; `light_region` (`js/mklev.js:30587`,
  pre-existing same-file) expands ±1 only when lit and
  clips x≥1/y≥0/COLNO/ROWNO like `isok`. Same set C
  iterates.
- C `sel_set_lit` (`:5535-5541`, read): `lit =
  (IS_LAVA(typ) || lit) ? 1 : 0` — JS `:30600` identical
  (also fixing old `loc.lit = lit`, which lacked the
  lava-or and wrote booleans). RNG-free both sides; the
  x-outer/y-inner order swap is immaterial (idempotent
  writes).
- All 10 rects/flags verified against `Bar-strt.lua:48-57`
  (read): coordinates, lit/unlit, and order match; the
  first `75×19` lit rect's +1 fringe is what lights map
  y0 at my=1.

`sym.mjs` (deleted/re-pointed symbols, pasted):

```text
light_region     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:30587
barLit           NOT FOUND in js/** (no export, no local function/const).
```

Local clone deleted for the canonical in-file mirror; no
new edges.

## Hallucinations / overclaim

None. The s419 Oracle residual is measured (JS fmon holds
a live Oracle; terrain/visibility agree) and explicitly
reserved for C-side fmon work — which is what D-4025 then
shipped.

## Density

Writer port on live row-4 with movement; sibling-mirror
pattern and the (C-correct, verified) non_diggable mirror
named, not ported. `Ledger:` sp_lev row + D-4024.

## Verification

Re-measured `--base be9a4992c~1 --no-reach`: `verify
level_tele: 1 PASS, 1 moved past, 0 unchanged, 0 worse`
(probe PASS; worldtour-Barbarian 419→944 — the D-log's "1
unchanged" was true at commit time, D-4025 moved it
further). 0 worse.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
