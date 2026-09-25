# Review 1752 — f176b8c0a — dodown (D-2793)

- SHA: `f176b8c0a` (`do.c` dodown whole-body port, D-2793)
- Files: `js/do.js` (+234), `js/const.js` (DIR_DOWN/DIR_UP), `js/cmd.js` (export `set_move_cmd` / `u_rooted`), `js/artifact.js` (`artifact_has_invprop`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

**Addressed:** D-2800 `24d4c0ac1`

## Intent vs deliverable

Subject promises a restart of `dodown` in C order, `DIR_DOWN` restored
to 8, and `doup` calling `u_stuck_cannot_go('up')` after the missing
stair. Diff does that, plus `artifact_has_invprop`, `goto_hell`, and
`u_stuck_cannot_go`. `DIR_UP` moves from 8 to 9. `zdir` was already
`{…, 1, -1}`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `dodown` | C body | `do.c:1130–1294` |
| `u_stuck_cannot_go` | C body, local | `do.c:1109–1127` |
| `goto_hell` | C body, local | `dungeon.c:1956–1963` |
| `artifact_has_invprop` | C body, export | `artifact.c:2298–2305` |
| `set_move_cmd` | existing, now exported | `cmd.c` (dz from `zdir[dir]`) |
| `u_rooted` | existing export, message gap | `hack.c:1693–1705` |
| `Flying` | **local clone, drops steed** | `youprop.h:253` |
| `float_down`, `ceiling_hider`, `stucksteed`, `use_pick_axe2`, `clamp_hole_destination`, `find_hell`, `next_to_u`, `pooleffects` | imported | live |
| `is_pool_or_lava` | inlined `is_pool \|\| is_lava` | `dbridge.c:76–83` |

`csym --callers dodown` finds only the `cmd.c` extern and two comments.
The command table is the caller. `cmd.js` already dispatched `dodown`.

`sym.mjs` (new / re-pointed):

```
artifact_has_invprop js/artifact.js:627   sync
u_stuck_cannot_go NOT EXPORTED — 1 LOCAL at js/do.js:2944
goto_hell        NOT EXPORTED — 1 LOCAL at js/do.js:2965
set_move_cmd     js/cmd.js:283   sync
u_rooted         js/cmd.js:4432   ASYNC
Flying           js/mhitu.js:711   sync
                 ALSO local js/do.js:449 (and 7 other files)
float_down       js/trap.js:3105   ASYNC
```

`node scripts/imports.mjs --can do.js mhitu.js Flying` → `ALREADY:
do.js already statically imports mhitu.js.`

## C ↔ JS fidelity

`movementdirs` is `DIR_SW`, then `DIR_DOWN`, then `DIR_UP`
(`hack.h:639–652`). `decl.c` `zdir[8]` is +1 and `zdir[9]` is -1.
JS `DIR_DOWN = 8`, `DIR_UP = 9` matches. `set_move_cmd(DIR_DOWN, 0)`
writes `dz = 1`.

Then `u_rooted` (true → `ECMD_TIME`), `stucksteed(TRUE)` (true →
`ECMD_OK`), stairway down/ladder from `stairway_at` and `!up`.
Controlled levitation: `(H & I_SPECIAL) || (E & W_ARTI)`, age every
top-level invent artifact with `inv_prop == LEVITATION` by `rnz(100)`,
then `float_down(I_SPECIAL|TIMEOUT, W_ARTI)`. `BLevitation` skips the
Blind stair-glyph narrow and still prints the float message
(`:1178–1198`). Air / water / `floating_above`, then `ECMD_OK`.

Ceiling hider: clear `uundetected`. `Flying` → "fly out of hiding",
else drop, `is_pool || is_lava` → `pooleffects(FALSE)`, else
`pickup(1)` and `dotrap(TOOKPLUNGE)`. Return `ECMD_TIME`.

`u_stuck_cannot_go("down")`: held/swallowed/engulfed returns true;
sticky hero `set_ustuck(0)`, "release", returns false. Matches
`:1109–1127`.

No stairs: seen pit/shaft `dotrap`; else unseen or not a hole or
`!Can_fall_thru` → autodig `use_pick_axe2` or `You_cant` with
" yet" on `VIBRATING_SQUARE`. Valley `y_n` sets
`gehennom_entered`. `next_to_u` false → pet message. Huge:
`rn2(3)` then `maybe_half_phys(rnd(4))` (the macro evaluates `rnd`
once). Stronghold `goto_hell(FALSE, TRUE)` (`find_hell` sets
`valley_level.dnum` and `dlevel` 1). Else trap dest `goto_level`,
else `at_ladder` and `next_level(!trap)`. No other RNG.

`doup` still assigns `dz = -1` itself. C calls `set_move_cmd(DIR_UP, 0)`
first (`:1302`), which also clears travel. `u_stuck_cannot_go('up')`
is after the missing-stair return. C still runs `stucksteed` between
that return and the stuck test (`:1317–1321`), then
`near_capacity() > SLT_ENCUMBER` (`:1324`). Those two stays are named.

## Hallucinations / overclaim

"Whole-body" matches the `dodown` arms above. It does not match
`Flying` on the lurker arm or in `u_locomotion("jump")`. The subject
calls that a named omit of the steed-flyer. The export in `mhitu.js`
already implements `u.usteed && is_flyer`, and `do.js` already
imports that module. The local at `do.js:449` is a divergent clone,
not an unported callee. "dim" is not this commit.

`u_rooted` still says "in place" only for a levitation bit, not for
`Is_airlevel` / `Is_waterlevel` (`hack.c:1698–1699`). Named. Return
and `nomul(0)` match.

## Density

~265 insertions for a 165-line function plus three small callees and
the direction-enum fix. In the raised band. One live arm calls the
wrong `Flying`.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify dodown --base
f176b8c0a~1 --reach-all`. Parent board is the 12-row file (stamp
field `38d6c8a36`):

```
verify dodown: baseline f176b8c0a~1 (scoreboard at 38d6c8a36, 2026-09-25T18:44:37.452Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dodown: no corpus session is blocked on it at f176b8c0a~1 — a vacuous verify is NOT a corpus PASS. …
smoke dodown: no RNG-tagged reach; fixed smoke spread (12 run, 4.3s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that
gutted board. The steed arm is not on the smoke path.

## Actionable C-wrongs

1. `dodown`'s ceiling-hider test and `u_locomotion` must use the
   `youprop.h` `Flying` predicate, including
   `u.usteed && is_flyer(u.usteed->data)`. Call the `mhitu.js`
   export (module already imported) or give the local the same arm.
   Hero-only H/E is the wrong result on a flying steed.

Verdict: **QUALITY-RISK**
