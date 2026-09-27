# Review 1896 — fa30d863c — mkaltar (D-2937)

- SHA: `fa30d863c` (coverage; `mklev.c` `mkaltar`)
- Files: `js/mklev.js` `mkaltar` calls `set_levltyp` before `rn2`, and stores the alignment on `altarmask` and `flags`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (C `mkaltar` is `staticfn`; `set_levltyp` was already imported):

```
mkaltar          NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:32470
set_levltyp      js/trap.js:864   sync
Align2amask      js/const.js:301   sync
find_okay_roompos NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:32286
```

`imports.mjs --can js/mklev.js js/trap.js set_levltyp` → `ALREADY`.

## Intent vs deliverable

Subject promises an ordinary-room altar goes through `set_levltyp` before the alignment `rn2`, and the mask is stored where both `altarmask` and `flags` readers see it. The diff is that. A refused cell returns and does not draw.

## Inventory

| JS | Class | C |
|----|-------|---|
| `mkaltar` | file-local `mklev.js:32470` | `mklev.c:2332–2350` |
| `find_okay_roompos` | same-file `:32286` | `mklev.c` `find_okay_roompos` |
| `set_levltyp` | live `trap.js:864` | `mkmaze.c:76–121` |
| `Align2amask` | live `const.js:301` | `align.h:50–53` |
| `rn2` | `rng.js` | one call, `rn2(3) - 1` |

## C ↔ JS fidelity

`mklev.c:2336–2348`: if `croom->rtype != OROOM`, return. `find_okay_roompos` false returns. `set_levltyp(m.x, m.y, ALTAR)` false returns before the draw. `al = rn2((int) A_LAWFUL + 2) - 1`. `A_LAWFUL` is 1 (`align.h:23`), so `rn2(3) - 1` is chaotic, neutral, or lawful. `levl[m.x][m.y].altarmask = Align2amask(al)`.

`altarmask` is `#define flags` (`rm.h:214`). `icedpool` is the same word (`rm.h:219`). JS keeps those as separate fields. The function writes `altarmask` and `flags` to `Align2amask(al)` and sets `icedpool` to 0, which is the word replacement. `Align2amask` (`const.js:301–305`) matches the macro: `A_NONE` → `AM_NONE`, `A_LAWFUL` → `AM_LAWFUL` (4), else `x + 2` (`-1` → 1, `0` → 2). The roll never produces `A_NONE`.

A null `croom` throws on `rtype`. C would dereference. Named.

`set_levltyp` (`mkmaze.c:90–110`): secret door to air returns true without changing `typ`. `CAN_OVERWRITE_TERRAIN` writes `typ`, lights lava, and on ice-to-not-ice runs `obj_ice_effects` and `spot_stop_timers` before the fountain/sink recount. The commit names the secret-door arm and the full recount as still incomplete on that function. `somexyspace` only yields ROOM, CORR, or ICE, so this caller does not hit a fountain or a sink. The ice test in the JS export is `typ === ICE`, not `is_ice` (drawbridge ice). Named on `set_levltyp`, and this caller only sees a cell `somexyspace` already accepted.

Caller: `mklev.c:18` prototype. `mklev.c:995` is `if (!rn2(60)) mkaltar(croom)` after the sink roll and the Rogue skip → `mklev.js:32581`. No other C call.

## Hallucinations / overclaim

The subject says no arm of `mkaltar` is omitted. The ordinary-room gate, the failed room position, the failed `set_levltyp`, and the one `rn2` are present. The `set_levltyp` gaps it names are that function's, and they are not a second `mkaltar`.

## Density

The coverage row asked for `mkaltar`. The whole static body shipped, and the one caller was already the `rn2(60)` site. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mkaltar --base fa30d863c~1 --reach-all`.

```
verify mkaltar: baseline fa30d863c~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mkaltar: no corpus session is blocked on it at fa30d863c~1 — a vacuous verify is NOT a corpus PASS. …
reach mkaltar: 1 baseline-PASS session(s) reach it (1 run, 1.7s): 1 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. The reach line is not vacuous: one baseline-PASS session executes `mkaltar` and still passes. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44 are the port's own verify line (shared `mklev.js`).

## Actionable C-wrongs

None. The altar is placed with `set_levltyp` before the alignment draw, and the mask replaces the flags word.

Verdict: **ACCEPT**
