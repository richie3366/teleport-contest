# Review 3046 — 1b2b2c8e3 — make_dig_engraving reads rndcoord's pos in the Lua frame

- SHA: `1b2b2c8e3` (cliffs row `unattributed`:
  scen-symset-Priest-50059010 step 74)
- D-entry: D-4206; Ledger: l_selection_rndcoord split
  js=mklev.js:selection_rndcoord+mklev.js:make_dig_engraving_postprocess
- `js/` diff: mklev.js +12 −4

## Intent vs deliverable

Promise: themerms.lua make_dig_engraving computes `data.x - pos.x - 1,
data.y - pos.y`. data is the chest's absolute position, but nhlsel.c
l_selection_rndcoord returns pos in the Lua frame: croom-relative under
a coder subroom, else minus xstart/ystart, here 1/0 after
reset_xystart_size. The Lua `- 1` cancels that xstart. JS used the
absolute pos and still subtracted 1, so every east/west distance was one
short («Dig 46 east» where C engraves «Dig 47 east»).

Diff: after rndcoord, `update_croom()`, then `luaX/luaY = pos -
(croom ? croom.lx/ly : splev_xstart/ystart)`, then the Lua formula
unchanged. The engraving still goes at the absolute pos. The promise
matches the diff.

## Inventory

- make_dig_engraving_postprocess — mklev.js:32709 (themerms.lua
  `:1052–1070`).
- Callees: selection_all_room_floors and selection_rndcoord (unchanged;
  rndcoord's RNG draw is the same), update_croom (mklev.js:3068, LIVE
  port of sp_lev.c update_croom), `game.gc.coder` (decl.js lazy
  struct), `game.splev_xstart/ystart` (written by reset_xystart_size,
  mklev.js:3039). No symbol deleted.

## C ↔ JS fidelity

C nhlsel.c `:406–428`:

```c
selection_rndcoord(sel, &x, &y, removeit);
if (!(x == -1 && y == -1)) {
    update_croom();
    if (gc.coder && gc.coder->croom) { x -= gc.coder->croom->lx; y -= gc.coder->croom->ly; }
    else { x -= gx.xstart; y -= gy.ystart; }
}
```

- Empty selection: C returns {-1,-1} without conversion. JS returns
  early on `!pos` (selection_rndcoord yields null), so no engraving is
  made. In C, Lua would go on with pos −1/−1 and des.engraving would
  engrave somewhere odd. The `negate():filter_mapchar(".")` of a level
  with a buried-treasure room always has floor, so this case cannot
  happen. Net-identical.
- Frame: update_croom → croom of the last subroom, else null. The JS
  ternary matches C's if/else exactly. At post-generate time there is no
  subroom, so xstart=1 / ystart=0 is the live case. That gives tx one
  larger than before, the measured «47».
- Words: the `tx == 0 && ty == 0` « here», then `%i east/west`, `%i
  south/north` on abs values. That part is unchanged and matches the Lua.
- Placement: des.engraving's get_location_coord adds the same offset
  back, so the absolute pos is correct. Unchanged.

No RNG change (same single rndcoord draw).

## Hallucinations / overclaim

None. The named omission (no shared l_selection_rndcoord converter;
other Lua rndcoord sites convert per site) is honest ledger `split`
debt and is not reached by any failing row.

## Density

One arithmetic frame fix on a measured row. Right-sized.

## Verification

```text
verify unattributed --base 1b2b2c8e3~1 --no-reach
  unattributed: 0 blocked (vacuous: owner-null row)
frozen runner on HEAD:
  scen-symset-Priest-50059010: PASS (RNG 23011/23011, Screen 993/993)
```

D-log: score --ids board PASS, green 2/2, strict ×2, cohort 7/7, full
44/44, sweep 679 baseline-PASS 0 regressed. The full rescore at the end
of this audit re-checks the row.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
