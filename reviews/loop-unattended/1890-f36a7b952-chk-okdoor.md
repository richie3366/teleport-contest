# Review 1890 — f36a7b952 — chk_okdoor (D-2931)

- SHA: `f36a7b952` (coverage; `mklev.c` `chk_okdoor`, caller `mklev_sanity_check`, same-file `mkstairs`)
- Files: `js/mklev.js` only. New file-local `chk_okdoor` and `mklev_sanity_check`. `mkstairs` now warns, calls `set_levltyp`, then sets `ladder`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (`defsym_explanation` is the existing export, not a new local. `chk_okdoor` is file-local, matching C `staticfn`):

```
chk_okdoor       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:27005
set_levltyp      js/trap.js:864   sync
defsym_explanation js/uhitm.js:4322   sync
IS_DOOR          js/const.js:2317   sync
```

`imports.mjs --can js/mklev.js js/uhitm.js defsym_explanation` → `ALREADY`. One `chk_okdoor`, not a second copy.

## Intent vs deliverable

Subject promises a door is rejected when the two cells it faces disagree about solid ground (`typ <= TREE` versus `typ > TREE`), and `mkstairs` warns, calls `set_levltyp(STAIRS)`, then sets `ladder`. The diff is that. `mklev_sanity_check` is the only C caller and it is invoked after niches, inside the non-Rogue branch. No RNG in `chk_okdoor`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `chk_okdoor` | file-local `mklev.js:27005` | `mklev.c:1197–1219` static |
| `IS_DOOR` | live `const.js:2317` | `rm.h:121` `typ == DOOR` |
| `isok` | live | neighbor gate |
| `mklev_sanity_check` | file-local `mklev.js:27035` | `mklev.c:1222–1247` |
| `makelevel_ordinary` | `mklev.js:27161` | `mklev.c:1313` |
| `mkstairs` | `mklev.js:31840` | `mklev.c:2157–2197` |
| `set_levltyp` | live `trap.js:864` | `mkmaze.c:76–121` |
| `defsym_explanation` | live `uhitm.js:4322` | `defsyms[sidx].explanation` |

## C ↔ JS fidelity

`mklev.c:1200–1218`: if `IS_DOOR`, a horizontal door returns false when one of `y-1` / `y+1` is `typ > TREE` and the other is `typ <= TREE`, each side gated by `isok`. A vertical door uses `x-1` / `x+1`. Otherwise true. A non-door is true. JS is that order. `&&` skips the neighbor read when `isok` is false, which is what C does. `TREE` is 13 (`const.js:59`), after `DBWALL`. `door.horizontal` is the field door placement already writes (`mklev.js:18695`). A missing map cell after `isok` would throw. Named.

`mklev.c:1229–1246`: return unless `sanity_check` or `debug_fuzzer`. Walk `y` in `0..ROWNO-1` and `x` in `1..COLNO-1`. `impossible("levl[%i][%i] door not ok", x, y)` when `chk_okdoor` is false. Then rooms with `needjoining`: the first such room's `smeq[i]` is `rmno`; a later room with a different `smeq[i]` is `impossible("room %i not connected?", i)`. JS matches. `impossible` substitutes `%d`, not `%i`, so the format uses `%d`. The call is not awaited. `game.smeq` is the array `add_room` writes. A missing `rooms[i]` is skipped. Named. Both flags are off in play, so the walk does not run during ordinary generation. That is C's gate, not a deleted body.

`mklev.c:1308–1313`: Rogue `goto skip0` skips corridors, niches, the sanity check, and the vault. JS calls `mklev_sanity_check` inside `if (!isRogue)`, after `make_niches` and before the vault. `mklev.c:26` is the prototype. `mklev.c:1234` is the only call.

`mklev.c:2168–2196` `mkstairs`: `!x || !isok` → `impossible` and return. `force` sets `typ = ROOM` directly. If `typ` is not `ROOM`, `CORR`, or `ICE`, `impossible` with `defsyms[glyph_to_cmap(back_to_glyph)].explanation` and does not return. Dungeon-end (`dunlev == 1` up, else `dunlevs_in_dungeon`) returns. Then `stairway_add`, `set_levltyp(STAIRS)`, `ladder`. JS matches. `croom` is unused. A missing `dlevel` is treated as 1. Named. `set_levltyp` writes `lev.typ` on the same cell (`trap.js:871`), so the following `loc.ladder` hits that cell. `CAN_OVERWRITE_TERRAIN` matches `mkmaze.c` (stairs and ladders stay unless debug overwrite). The SDOOR-to-AIR arm and the full feature recount stay named on `set_levltyp`, and neither runs for `STAIRS` on room, corridor, or ice. `level.upstair` / `dnstair` remain after `stairway_add`. Named.

## Hallucinations / overclaim

The subject says no arm of `chk_okdoor` or `mkstairs` is omitted. Both door orientations and the non-door return are present. `mkstairs` warns, refuses an end-of-dungeon stair, and places the stair through `set_levltyp`. `defsym_explanation` is the live table, not a stub string. The sanity check is not a no-op: the early return is the C flag gate.

## Density

The coverage row asked for `chk_okdoor`. The whole body shipped, the only caller shipped, and the same-file `mkstairs` gap shipped with it. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify chk_okdoor --base f36a7b952~1 --reach-all`.

```
verify chk_okdoor: baseline f36a7b952~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify chk_okdoor: no corpus session is blocked on it at f36a7b952~1 — a vacuous verify is NOT a corpus PASS. …
smoke chk_okdoor: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`mklev.js` is shared).

## Actionable C-wrongs

None. A door between solid ground and open ground is not ok, and stairs go down through `set_levltyp`.

Verdict: **ACCEPT**
