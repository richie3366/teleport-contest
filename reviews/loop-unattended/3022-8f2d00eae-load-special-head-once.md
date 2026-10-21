# Review 3022 — 8f2d00eae — one load_special_head() for all 126 loaders

- SHA: `8f2d00eae` (Must-fix F3 of the 2026-10-20 level audit; non-RNG
  except minetn-6's ensure_way_out)
- D-entry: D-4182; Ledger: load_special partial
  (`load_special_proto` + `load_special_head` + `load_hellfill`)
- `js/` diff: mklev.js +233 −173 (119 call lines, 49 deleted scattered
  calls, ~90 loader header comments)

## Intent vs deliverable

Promise: one port of the epilogue head (`:6464–6471`), run by every
loader right before its wallification. The 49 scattered copies are
deleted, minetn-6 passes the "inaccessibles" gate, and the now-false
header omission claims are dropped.

Diff: `load_special_head(check_inaccessibles = false)` at mklev.js:3287,
followed by 119 `load_special_head();` lines plus one
`load_special_head(true)` (mklev.js:18342, minetn-6). soko1–3 run it
through soko_load_epilogue and fakewiz1–2 through load_fakewiz_tower.
The promise matches the diff.

The Must-fix row asked for more: the **whole** epilogue, ported once in
load_special_proto with flags from the coder. The tail (wallification →
flip → count → solidify → fixup → premap) stays per loader, and the
D-log names why: loaders place their lregions between flip and fixup.

## Inventory

- load_special_head — mklev.js:3287, new (C sp_lev.c:6464–6471). Callees
  are all LIVE: link_doors_rooms, remove_boundary_syms, ensure_way_out,
  map_cleanup (existing sp_lev.c ports in mklev.js).
- 126 loaders — one call each, immediately before
  `if (!…corrmaze) wallification(…)`. baalz, a corrmaze level, calls it
  before its flip.
- No symbol deleted or re-pointed. The removed lines are inline calls of
  the same four functions.

## C ↔ JS fidelity

C order (`csym load_special`): `link_doors_rooms(); remove_boundary_syms();
if (gc.coder->check_inaccessibles) ensure_way_out(); map_cleanup();`,
then the `!corrmaze` wallification. JS load_special_head has the same
four steps in that order. The gate is the argument, or
`game.gc.coder.check_inaccessibles`, the same gate lspo_finalize_level
uses (mklev.js:2411).

I checked placement mechanically. The line after each of the 120
`load_special_head();` calls is the corrmaze wallification test, except
for baalz, whose next line is `flip_level_rnd(3, false)`. Only
minetn-6.lua carries `inaccessibles` (grep of dat/*.lua), and it is the
only `true` caller. `level-audit-static.py` section 4, re-run in this
audit, reports link_doors_rooms / remove_boundary_syms / ensure_way_out /
map_cleanup 126/126 and no "flag without step" problem.

The header edits are honest. I sampled the dropped
"solidify / premap" claims on the bigroom and medusa loaders: no
bigrm-*.lua or medusa-*.lua sets `solidify` or `premapped` (only
astral, soko*, tower1–3 do), so those claims were false before this
commit. The humidity get_location claims were all kept (41 removed,
41 re-added).

## Hallucinations / overclaim

- The D-log says "solidify/premap on exactly the flagged levels". The
  static script counts solidify 16/126 against 12 Lua files with the
  flag, because it also counts any loader that writes W_NONPASSWALL. It
  reports no flagged level missing the step, so the substance holds.
- Stale doc: load_special_proto's old docblock ("named omits:
  link/edge epilogue") now sits orphaned above load_special_head's
  docblock (mklev.js:3270–3277). It is a comment, but it contradicts the
  new code.

## Density

A mechanical move of one C block into one helper. 400 changed lines are
mostly the call line and header comments. Right-sized for the row,
minus the tail, which is named.

## Verification

D-log: level-audit over 4785 sessions, 108 levels built, all
RNG-exact, and the same 14 baseline exceptions. Re-measure:

```text
verify load_special,link_doors_rooms,remove_boundary_syms,map_cleanup,ensure_way_out
       --base 8f2d00eae~1 --no-reach
  all 5: 0 blocked at the parent or in the working board (vacuous)
python3 scripts/level-audit-static.py   (section 4)
  link_doors_rooms 126/126, remove_boundary_syms 126/126,
  ensure_way_out 126/126, map_cleanup 126/126
```

The full rescore (every active session builds its levels on HEAD) shows
0 PASS→FAIL.

## Actionable C-wrongs

None. Debt: the epilogue tail is per loader (named, justified), and the
orphaned load_special_proto docblock is a doc fix for the next mklev.js
touch.

Verdict: **ACCEPT-WITH-DEBT**
