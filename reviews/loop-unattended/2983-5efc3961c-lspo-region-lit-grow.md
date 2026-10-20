# Review 2983 — 5efc3961c — `des.region(selection, "lit")` grows by one in 18 loaders

- SHA: `5efc3961c` (cliff; symptom owner background_enlightenment, writer
  sp_lev.c lspo_region argc=2 arm, 1 row)
- D-entry: D-4143; Ledger: lspo_region ported
- `js/` diff: js/mklev.js +60/−127 (18 hand-written loaders)

## Intent vs deliverable

Promise: C's two-argument `des.region(selection.area(…), "lit")` grows
the selection W_ANY before `sel_set_lit`. 18 JS loaders lit the bare
rectangle, so on Mon-strt the stone column at x=2 stayed unlit, and an
earth elemental phasing into it was out of view in JS.

Diff: 14 bare `loc.lit = true` double loops become
`light_region(x1, y1, x2, y2, true)`. The arcLit (×3) / barLit closures
delegate to `light_region(…, lit)`. load_kni_goal is now two calls in
Lua order (lit 00–14, then unlit 15–75). The promise matches the diff.

## Inventory

- `light_region` — mklev.js:30501–30517 (unchanged); C sp_lev.c
  light_region :2838–2862.
- C target: lspo_region argc==2 arm sp_lev.c:5612–5631 (`if (rlit)
  selection_do_grow(sel, W_ANY)`, then `selection_iterate(sel,
  sel_set_lit, &rlit)`); sel_set_lit :5534–5540; selection_do_grow
  selvar.c:320–367.
- Call sites: load_wiz_strt, load_wiz_loca, load_pri_strt, load_arc_strt /
  loca / goal, load_kni_loca (temple level :8866), load_kni_goal,
  load_mon_strt, load_bar_loca, the eight Sokoban loaders, the Plane of
  Air (:15999).

## C ↔ JS fidelity

The commit stands in light_region (the table form) for the selection
form. For a rectangle selection the two agree cell for cell:

- Grow: selection_do_grow with W_ANY sets every cell whose orthogonal or
  diagonal neighbour is in the selection, over the bounds ±1 clamped to
  `0..COLNO-1` / `0..ROWNO-1`. On a rectangle that is the rectangle ±1.
  light_region widens by ±1 with `lowx = max(x-1, 1)`, `hix = min(x+1,
  COLNO-1)`, `lowy = max(y-1, 0)`, `hiy = min(y+1, ROWNO-1)`. The only
  difference is column 0, which C may light and light_region skips. No
  location exists there in either runtime.
- Lit value: sel_set_lit writes `IS_LAVA(typ) || lit ? 1 : 0`, and
  light_region writes `IS_LAVA(loc.typ) ? 1 : litstate`. Same result.
- Unlit: C does not grow (`if (rlit)`), and light_region widens only
  when litstate is set. arcLit / barLit / load_kni_goal "unlit" calls now
  keep lava lit, which the old closures did not (`loc.lit = lit`). That
  is a C fix too.
- Order: load_kni_goal used to write lit and unlit columns in one
  per-row pass. Now the lit grow covers column 15 and the unlit call then
  clears it, as Lua's sequential des.region calls do.

I checked all 55 `selection.area(…), "lit"` comments in mklev.js. Each
one is followed by light_region or a grow helper. No bare lit loop is
left.

## Hallucinations / overclaim

None found. The Named line ("unlit-only rectangles in other loaders still
ignore sel_set_lit's lava rule") is true and differs only on lava inside
an unlit rectangle.

## Density

One C idiom applied across 18 loaders: every site swaps a hand-written
loop for the existing C-shaped helper. No new clone.

## Verification

```text
verify background_enlightenment (--base 5efc3961c~1): scen-questtour-Monk-50557003 PASS → PROGRESS
verify lspo_region / light_region: 0 blocked (vacuous; symptom-owner row)
```

The re-measure matches the D-log. The D-log's `sweep lspo_region,light_region`
→ 0 regressed matches this audit's full rescore (see the 2983–2991 crumb).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
