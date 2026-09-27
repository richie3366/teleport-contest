# Review 1882 — c558457f9 — maybe_unhide_at (D-2923)

- SHA: `c558457f9` (coverage; `mon.c` `maybe_unhide_at`)
- Files: `js/monmove.js` (`maybe_unhide_at`, import `hideunder` as `hideunderHero`), callers `js/ball.js` `move_bc`, `js/hack.js` `movobj`, `js/timeout.js` `burn_object`, `js/trap.js` `launch_obj`. `js/mkobj.js` comment only (`delobj_core` already called the export).
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: the `js/` diff's only hit is the pre-existing `NODIAG` import token on the `timeout.js` line that added `m_at`. No `FORCE`, `getRngLog`, `fastforward`, or seed names. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (re-point: hero call goes to the `mon.js` export; the monster local stays):

```
maybe_unhide_at  js/monmove.js:1352   ASYNC — await required
hideunder        js/mon.js:3892   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files
               js/monmove.js:1281
u_at             js/const.js:3195   sync
objects_at       js/mkobj.js:3355   sync
hides_under      js/monsters.js:377   sync
can_hide_under_obj js/monmove.js:1193   sync
is_pool          js/hack.js:1969   sync
```

`imports.mjs --can js/monmove.js js/mon.js hideunder` → `ALREADY`. The local `hideunder` is the monster `You_see` clone this function still calls. The hero call is the sync export. Not a second `maybe_unhide_at`.

## Intent vs deliverable

Subject promises the hero arm: when `m_at` is null and `u_at`, use `youmonst`, `u.uundetected`, and `u.utrap`, then `mon.js` `hideunder`. It also promises the four caller sites that never invoked the export. The diff adds that arm and those calls. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `maybe_unhide_at` | live async `monmove.js:1352` | `mon.c:4696–4720` |
| monster `hideunder` | local clone `monmove.js:1281` | `mon.c:4723–4802` monster arm |
| `hideunderHero` | live `mon.js:3892` | same function, `is_u` arm |
| `u_at` | live `const.js:3195` | `ux==x && uy==y` |
| `objects_at` | live `mkobj.js:3355` | `level.objects[x][y]` |
| `move_bc` | `ball.js:651`, `:655` | `ball.c:529`, `:533` |
| `movobj` | `hack.js:675` | `hack.c:829` |
| `launch_obj` | `trap.js:2609` | `trap.c:3295` |
| `burn_object` | `timeout.js:1864`, `:2047` | `timeout.c:1416`, `:1652` |

## C ↔ JS fidelity

`mon.c:4703–4712`: if `m_at`, read `mundetected` and `mtrapped`; else if `u_at`, use `&youmonst`, `u.uundetected`, `u.utrap`; else return. JS matches. A missing `game.youmonst` returns. C always has the global. Named by the early return in the hero arm.

`mon.c:4714–4719`: if undetected and (`hides_under` and (`!OBJ_AT` or trapped or `!can_hide_under_obj(level.objects[x][y])`) or (`mlet == S_EEL` and `!is_pool`)), call `hideunder`. JS uses `objects_at` (`_objects_at` pile head). `!floorObj || trapped || !can_hide_under_obj(floorObj)` short-circuits the same way. `mlet === 'S_EEL'` is the port's string `mlet`. `u.utrap` is nonzero-true.

Hero calls sync `hideunder` (`mon.js:3892`), which writes `u.uundetected` and uses `u.ux`/`u.uy`. Not awaited. Monster still awaits the local clone. That clone sets `mundetected` before its `pline` await (`monmove.js:1332` then `:1336`), so an un-awaited caller still stores the flag in the sync prefix. `movobj`, sighted `move_bc`, and `delobj_core` do not await. Named.

`remove_object` does not clear `ox`/`oy` (`mkobj.js:3509–3524`), so `movobj` and `launch_obj` still pass the old cell after extract, matching `hack.c:828–829` and `trap.c:3293–3295`.

`timeout.c:1404–1416`: away burn of a candle or oil saves `m_at` before extract, frees, then unhides only if that monster existed. JS awaits that call and frees with `delobj` rather than `obfree` (named). `timeout.c:1644–1652`: age 0, not carried, on the floor, unhide `(x,y)` after extract. JS awaits `maybe_unhide_at(loc.x, loc.y)` when `onfloor && loc`.

The other C callers already invoke the export: `ball.js:480` and `:486` (`ball.c:167`, `:173`), `dig.js:505`, `dokick.js:1972`, `explode.js:1069`, `mkobj.js:1853` and `:3177` and `:3771`, `monmove.js:2221`, `muse.js:2741` and `:3253`, `teleport.js:811`, `trap.js:6094`, `zap.js:5600` and `:5865`.

The local monster `hideunder` still returns immediately when `!mtmp.mx` (`monmove.js:1282`). C runs at x 0. This SHA did not add that guard, and the hero arm does not use it.

## Hallucinations / overclaim

The subject says no arm of `maybe_unhide_at` is omitted. Both occupancy arms and the reveal predicate are present. `hideunder` is not a stub: the hero uses the export that writes `u.uundetected`; the monster uses the local that writes `mundetected`. The `#if 0` hero "you hide under" line is compiled out in C. `burn_object`'s `delobj` instead of `obfree` is named and is outside this function.

## Density

The coverage row asked for the whole function. Both arms and the predicate shipped. The four caller sites the subject names are wired. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify maybe_unhide_at --base c558457f9~1 --reach-all`.

```
verify maybe_unhide_at: baseline c558457f9~1 (scoreboard at 54bbae9a5, 2026-09-27T02:04:08.797Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify maybe_unhide_at: no corpus session is blocked on it at c558457f9~1 — a vacuous verify is NOT a corpus PASS. …
smoke maybe_unhide_at: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (six `js/` files, shared-file full suite).

## Actionable C-wrongs

None. A hiding hero at the cell is revealed through `mon.js` `hideunder`; a hiding monster still goes through the local clone.

Verdict: **ACCEPT**
