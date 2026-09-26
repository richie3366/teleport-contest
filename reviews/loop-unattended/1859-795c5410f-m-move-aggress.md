# Review 1859 — 795c5410f — m_move_aggress (D-2900)

- SHA: `795c5410f` (coverage; `monmove.c` `m_move_aggress`, caller in `priest.c` `move_special`)
- Files: `js/monmove.js` (body, now exported), `js/shk.js` (`ALLOW_M` switch)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `shk.js` loads `m_move_aggress` with `await import` inside `move_special`. `imports.mjs --can js/shk.js js/monmove.js m_move_aggress`: `IN-SCC`, `VERDICT: SAFE` (hoisted function, not a top-level read).
- No symbol was deleted. The function was a local and is now the export `shk.js` imports. `sym.mjs`:

```
m_move_aggress   js/monmove.js:1788   ASYNC — await required
mattackm         js/mhitm.js:6089   ASYNC — await required
m_at             js/mon.js:1728   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/dig.js:209  js/shknam.js:271  js/teleport.js:122  js/uhitm.js:468
```

Those four `m_at` clones are not callees of this function. `monmove.js` and `shk.js` use the `mon.js` export.

## Intent vs deliverable

Subject promises one exported `m_move_aggress` in C order, including both `bhitpos` / `notonhead` stores, and `move_special` translating `MMOVE_DIED` (2) to -2 and `MMOVE_DONE` (3) to 1. The diff does that. It does not change `mattackm`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `m_move_aggress` | export `monmove.js:1788` | `monmove.c:2087–2117` |
| `m_at` | live import | `rm.h:510–511` `level.monsters[x][y]` |
| `mattackm` | live import | both blows |
| `rn2` | live import | `rn2(4)` then `rn2(NORMAL_SPEED)` |
| `move_special` `ALLOW_M` arm | caller | `priest.c:108–118` |

## C ↔ JS fidelity

`csym` body is `monmove.c:2087–2117`. Callers: `monmove.c:2023` when `ALLOW_M` or the square is the hero's apparent image (`js/monmove.js:2161–2163`, inside the async `m_move`, so the returned promise is the function result), and `priest.c:112` (`js/shk.js:4468`). `extern.h` is the declaration.

`mstatus` starts at `M_ATTK_MISS` (0). `m_at(x, y)` then, if set: `bhitpos` is `(x, y)`, `notonhead` is `x != mtmp2.mx || y != mtmp2.my`, then `mattackm(mtmp, mtmp2)`. `level_mon_at` (`worm.js:63–71`) returns a worm whose `mx`/`my` is the head when `wormno` is set, so a tail square makes `notonhead` true. `failed_grab` reads `game.notonhead` (`mhitm.js:5802`, `:5811`). No monster leaves `mstatus` at 0 and skips the blow.

Aggressor death is `(mstatus & M_ATTK_AGR_DIED) || DEADMONSTER(mtmp)`. `DEADMONSTER` is `mhp < 1` (`monst.h:214`). `M_ATTK_AGR_DIED` is `0x4` (`monattk.h:111`). That returns `MMOVE_DIED` (2, `hack.h:1324`).

The counterattack runs only when `(mstatus & (M_ATTK_HIT | M_ATTK_DEF_DIED)) == M_ATTK_HIT` (`0x1` and `0x2`, `monattk.h:109–110`), then `rn2(4)`, then `movement > rn2(NORMAL_SPEED)`. `NORMAL_SPEED` is 12 (`permonst.h:80`). `&&` skips the second `rn2` when `rn2(4)` is 0. The `>` reads `movement` before `rn2`. A hit bit is set only after `mattackm`, which ran only when `mtmp2` was set, so the dropped `mtmp2 &&` does not throw on the empty-square path. C also dereferences `mtmp2` only after that flag test. Movement above 12 is reduced by 12; otherwise it becomes 0. Then `bhitpos` is the mover's own square, `notonhead` is false, and `mattackm(mtmp2, mtmp)`. `M_ATTK_DEF_DIED` on that result returns `MMOVE_DIED`. Anything else, including a miss and a defender who died on the first blow, returns `MMOVE_DONE` (3, `hack.h:1325`).

`move_special` (`priest.c:112–117`) switches on the literals 2 and 3, then falls through. JS returns -2 or 1 for those and otherwise continues. The following step still assigns `mx`/`my` without `remove_monster` / `place_monster`. The commit names that, and the `#if 0` pickup (`priest.c:127–135`).

## Hallucinations / overclaim

The subject says a long-worm tail is no longer treated as the head. This function now sets `notonhead` from the head coordinates. It does not change `mattackm`'s later-blow test, which the commit says still uses `m_at(mdef.mx, mdef.my) !== mdef` (`mhitm.js:6138`) rather than `m_at(bhitpos)` (`mhitm.c:379`). That is a named gap in the callee, not a second store this diff forgot. "No arm omitted" matches the 31-line body. Both C callers are wired.

## Density

One 31-line function, both call sites, and the two `bhitpos` stores the previous body had named and skipped. The `move_special` place step is the named omit beside the new switch, not a stub inside `m_move_aggress`. Small C function; the diff is the whole body.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify m_move_aggress --base 795c5410f~1 --reach-all`.

```
verify m_move_aggress: baseline 795c5410f~1 (scoreboard at 93cce8666, 2026-09-26T21:33:34.856Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify m_move_aggress: no corpus session is blocked on it at 795c5410f~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke m_move_aggress: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line. Reach does not enter the tail or the priest `ALLOW_M` arm.

## Actionable C-wrongs

None. The two stores, the `rn2` order, and the `priest.c` 2/3 translation match C. The `mattackm` continue test and the `move_special` place step stay named.

Verdict: **ACCEPT**
