# Review 1870 — af40498ad — engulf_target (D-2911)

- SHA: `af40498ad` (coverage; `mhitm.c` `engulf_target`)
- Files: `js/mhitm.js` (export), `js/mhitu.js` and `js/uhitm.js` (clones deleted, callers import)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." `--can` is ALREADY for `mhitu.js` and `uhitm.js` → `mhitm.js`.
- `sym.mjs` on the deleted clones and the helper the cell test now calls:

```
engulf_target    js/mhitm.js:5748   sync
closed_door_mm   NOT FOUND
engulf_target_you NOT FOUND
engulf_blocked   NOT FOUND
engulf_blocked_you NOT FOUND
engulf_cell_blocks NOT EXPORTED — 1 local in js/mhitm.js:5778
Passes_walls_prop js/hack.js:249   sync
closed_door      js/hack.js:146   sync
             !! ALSO 10 LOCAL CLONE(S) in 10 files
```

`engulf_cell_blocks` is the repeated C expression, not a second C function. This file calls the `closed_door` export. The other door clones are not this path.

## Intent vs deliverable

Subject promises one `engulf_target` for hero and monster swallows, the two clones deleted, hero coordinates and `Passes_walls`, and `mtrapped` rather than `u.utrap`. The diff exports the mhitm body, deletes `mhitu.js` `engulf_target` and `uhitm.js` `engulf_target_you`, and points `gulpmu` / `gulpum` at the export.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `engulf_target` | export `mhitm.js:5748` | `mhitm.c:806–845` |
| `engulf_cell_blocks` | file-local expression | the two `IS_OBSTRUCTED` / door / tree / bars tests |
| `Passes_walls_prop` | live `hack.js:249` | `youprop.h:286` `HPasses_walls \|\| EPasses_walls` |
| `passes_walls` | live `monsters.js:514` | `mondata.h:29` `M1_WALLWALK` |
| `is_whirly` | live `monsters.js:502` | `mondata.h:57–58` vortex or air elemental |
| `closed_door` | live `hack.js:146` | `D_CLOSED \| D_LOCKED` |
| `gulpmm` | `mhitm.js:5850` | `mhitm.c:858` |
| `gulpmu` | `mhitu.js:1834` | `mhitu.c:1301` |
| `gulpum` | `uhitm.js:3800` | `uhitm.c:4980` |

## C ↔ JS fidelity

`csym` body is `mhitm.c:806–845`. No RNG. `polyself.c:918` is the comment `/* subset of engulf_target() */`, not a call. `extern.h:1528` only declares it (`NONNULLARG12`).

Size: `mdef->data->msize >= MZ_HUGE`, or attacker smaller than defender and `!is_whirly(magr->data)`, returns false. JS uses the same `| 0` sizes and `is_whirly(magr.data)`. A missing `data` returns false before that. C would fault.

Trap: `mdef->mtrapped || magr->mtrapped`. The deleted mhitu clone treated `u.utrap` as the hero trap and never read `youmonst.mtrapped`. The export reads `mtrapped` on both pointers. C's comment says a trapped hero is this field, not `u.utrap`. The pit-and-boulder miss in `gulpmu` is still the separate test after this call (`mhitu.c:1303`).

Defender cell: `udef` uses `u.ux`/`u.uy`, else `mdef->mx`/`my`. Refuse when the defender does not pass walls (`Passes_walls` if `udef`, else `passes_walls(mdef->data)`) and the cell is obstructed, a closed door, a tree, or iron bars unless the attacker is whirly. Attacker cell is the same with `uatk`, `magr` coordinates, and bars unless the defender is whirly. `engulf_cell_blocks(x, y, otherData)` is that predicate; the defender call passes `magr.data` and the attacker call passes `mdef.data`, which is which monster C tests with `is_whirly`.

`Passes_walls_prop` is `H` or `E` or the same bits on `uprops` (no blocked bit). `passes_walls` is `mflags1 & M1_WALLWALK`. `is_whirly` is `mlet === 'S_VORTEX'` or `mndx === PM_AIR_ELEMENTAL` (C compares the permonst pointer). `closed_door` is `IS_DOOR` and `doormask & (D_CLOSED|D_LOCKED)`, the same test the deleted `closed_door_mm` used.

A missing level cell returns true (blocked). C would read `lev->typ`. The subject names that. `passes_bars` is the comment at `mhitm.c:834`, not a call.

`gulpmm(magr, mdef)`, `gulpmu(mtmp, &youmonst)`, and `gulpum(&youmonst, mdef)` are the three calls. JS passes `game.youmonst` at the hero argument.

## Hallucinations / overclaim

The subject says the two clones are gone and no arm is omitted. `sym.mjs` finds no `engulf_target_you` and no second `engulf_target`. The size, trap, and both cell tests are present. It does not claim `u.utrap` was wired; it says that field is not `mtrapped`.

## Density

One function. All three call sites use the export. The cell helper is the inlined predicate, not a stub. `Passes_walls_prop`, `passes_walls`, `is_whirly`, and `closed_door` are live.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify engulf_target --base af40498ad~1 --reach-all`.

```
verify engulf_target: baseline af40498ad~1 (scoreboard at 4039cf023, 2026-09-26T23:39:09.278Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify engulf_target: no corpus session is blocked on it at af40498ad~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke engulf_target: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. The subject omitted `--reach-all`; the re-run with it is the same smoke line.

## Actionable C-wrongs

None. Size, `mtrapped`, both cells, and the three callers match `mhitm.c:815–843`, `mhitm.c:858`, `mhitu.c:1301`, and `uhitm.c:4980`.

Verdict: **ACCEPT**
