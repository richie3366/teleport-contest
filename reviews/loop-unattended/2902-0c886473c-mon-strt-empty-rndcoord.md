# Review 2902 — 0c886473c — Mon-strt.lua empty rndcoord → random placement

- SHA: `0c886473c` (cliff, writer port: one level loader, 3 loops)
- D-entry: D-4061; Ledger: sp_lev.c (`get_location`, D-4061)
- `js/` diff: `js/mklev.js` +18/−12 (`load_mon_strt` dart/siege
  loops); new `scripts/mon-strt-empty-selection-random.test.mjs`

## Intent vs deliverable

Promise: `spacelocs:rndcoord(1)` on an empty selection is C's
`{x=-1, y=-1}`, which means a random location. JS returned `null` and
*skipped* the trap/monster, so all 12 siege monsters were missing
(Monk-50055015 s885 → FULL PASS). The diff routes the null case to
`splev_create_trap(DART_TRAP)` and every siege monster through the
faithful `splev_create_monster(name, undefined, coord)`. Promise = diff.

## Inventory

- `load_mon_strt` dart loop — mklev.js:12604: null → `splev_create_trap(DART_TRAP)`.
  C: dat/Mon-strt.lua:90–92 → lspo_trap sp_lev.c:4396–4470.
- siege loops — mklev.js:12620–12629: `splev_create_monster`
  with `siege_coord(pos)`. C: Mon-strt.lua:98–103 → create_monster
  (sp_lev.c:1925–2050).
- sym.mjs: `splev_create_monster js/mklev.js:22256 sync`.

The diff deletes an inline clone (`find_montype_gender` +
`induced_align(80)` + `makemon` + `female`) and re-points it to the
faithful creator.

## C ↔ JS fidelity

C (csym nhlsel.c:406–428):

```c
    coordxy x = -1, y = -1;
    selection_rndcoord(sel, &x, &y, removeit);
    if (!(x == -1 && y == -1)) {
        update_croom();
        if (gc.coder && gc.coder->croom) {
            x -= gc.coder->croom->lx; y -= gc.coder->croom->ly;
        } else {
            x -= gx.xstart; y -= gy.ystart;
        }
    }
    ... return {x, y};
```

Mon-strt places a `des.map` with no room, so the non-null coord is
relative to `xstart/ystart`. `siege_coord` subtracts
`splev_xstart/ystart`, which is the same contract that
get_location_coord adds back. The null case passes `{}`, so
`rx = ry = -1` (splev_create_monster defaults) → random placement,
which matches C get_location's random arm. Inside
`splev_create_monster`, the find_montype gender draw precedes
`induced_align` (amask at :1943), so the C draw order `rn2(2)
find_montype → rn2(3) induced_align → rn2(76) get_location` matches
the D-log's quoted fork.

The dart trap null arm: `des.trap("dart", {-1,-1})` → lspo_trap
`get_coord` gives -1/-1 → create_trap random location, type DART.
`splev_create_trap(type)` does the get_location_coord_random(DRY)
stairs-retry loop and keeps the specified kind. This matches C.
The non-null dart arm (`maketrap` + `mktrap_seen_victim`) is unchanged
and pre-existing. The probe PASS covers it for these two cells.

## Hallucinations / overclaim

None. The D-log names the same "null rndcoord → skip" shape in
load_bar_strt (:6682), load_pri_strt (:7656/:7666), load_rog_strt
(:9352), load_tou_loca (:11552) and others. Each is its own
`dat/*.lua` file. Those are real C-wrongs, but no corpus session is
cited as blocked on them, so under §10.19 they are named and wait for a
session. They are not shipped as unreached work and not queued here.
The full rescore will surface one if it reaches it.

## Density

One loader's three loops, whole. Callee closure: create_monster LIVE,
create_trap LIVE, get_location LIVE. No STUB. One `Ledger:` entry.

## Verification

Re-measure (`--base 0c886473c~1 --no-reach`):

```text
verify get_location: scen-sweep-Monk-50055015: PASS → 1 PASS → PROGRESS
verify create_monster: no corpus session is blocked on it (vacuous)
```

This is an exact match with the D-log. The `create_monster` vacuous
line is expected: the row was `get_location`-owned. There were no
FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

None in this diff. (The sibling level loaders are named, not
session-reaching.)

Verdict: **ACCEPT**
