# Review 1788 — fb4f1bf7d — rescued_from_terrain (D-2829)

- SHA: `fb4f1bf7d` (coverage; `trap.c` `rescued_from_terrain`)
- Files: `js/trap.js` the function; imports `IS_WATERWALL` and `update_lastseentyp`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `rescued_from_terrain` in C order: drowning "in the midst" on the water level or a water wall, air bubble / mid air, burning and dissolved sharing the pool-then-lava arm, `back_on_ground` only when no terrain line was given, then `last_msg`, `update_lastseentyp`, and `prev_decor`. The diff is that function. The three C callers already call it.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `rescued_from_terrain` | `trap.js:2951` | `trap.c:5011–5055` |
| `You` | LIVE async `display.js:7671` | `You("%s …")` prefixes `You ` |
| `hliquid` | LIVE `do_name.js:373` | `"water"` / `"molten lava"` |
| `is_pool` / `is_lava` | LIVE `hack.js:1949` / `:1966` | pool then lava |
| `IS_WATERWALL` | `const.js:2347` `typ === WATER` | `rm.h:141` |
| `IS_AIR` | `const.js:2741` `AIR \|\| CLOUD` | `rm.h:139` |
| `Is_waterlevel` | `const.js:3230` | `Is_waterlevel(&u.uz)` |
| `back_on_ground` | same file `:2913` | `trap.c` fallback, arg `TRUE` |
| `update_lastseentyp` | LIVE `dungeon.js:1445` | `dungeon.c:2926–2938` |
| `DROWNING` / `BURNING` / `DISSOLVED` | `const.js` 4 / 5 / 6 | `hack.h:487–489` |

`sym.mjs` (symbols the diff adds to the import lists):

```
IS_WATERWALL     js/const.js:2347   sync
update_lastseentyp js/dungeon.js:1445   sync
You              js/display.js:7671   ASYNC — await required
hliquid          js/do_name.js:373   sync
```

`imports.mjs --can trap.js dungeon.js update_lastseentyp` and `trap.js const.js IS_WATERWALL`: both `ALREADY`. `You` was already imported (`trap.js:35`). The new calls are inside the function.

## C ↔ JS fidelity

`csym` `trap.c:5011–5055`. `lev` is `&levl[u.ux][u.uy]`. JS uses `game.level.at(ux, uy)` and typ 0 when the cell is missing (named; C would dereference).

`DROWNING`: `is_pool` then `You("%s %s of %s.", "find yourself", midst-or-on-top, hliquid("water"))`. Midst when `Is_waterlevel(&u.uz) || IS_WATERWALL(lev->typ)`. Else if `IS_AIR`, `You("%s in %s.", …, bubble-or-mid-air)` with the bubble only on the water level. `trap.js:2964–2974` is that order. `You` (`display.js:7673`) prepends `You ` to the format, so the line is `You find yourself in the midst of …`.

`BURNING` falls through to `DISSOLVED` (`:5035–5036`). Pool: `in` when `u.uinwater`, else `on`, then `hliquid("water")`. Else lava: `on top of` `hliquid("molten lava")`. JS `case BURNING: case DISSOLVED:` (`:2976–2986`) has no statement between the labels. `default` breaks. No `rnd` in this function; `hliquid` is the only name helper, in the same arms as C.

If `mesggiven` is still false, `back_on_ground(TRUE)`. JS awaits `back_on_ground(true)`. Then, whether or not a terrain line was printed, `iflags.last_msg = PLNMSG_BACK_ON_GROUND`, `update_lastseentyp(u.ux, u.uy)`, `iflags.prev_decor = svl.lastseentyp[u.ux][u.uy]`. JS stores `last_msg`, calls `update_lastseentyp`, then reads `game.lastseentyp[ux][uy]`. That is the array `update_lastseentyp` writes (`dungeon.js:1454–1455`), after the drawbridge-down and furniture-mimic rewrite. A missing `game.iflags` is created first (named).

`csym --callers`: `pray.c:401` `TROUBLE_LAVA` `DISSOLVED` → `pray.js:673`, after `safe_teleds` / `reset_utrap`. `trap.c:5197` `DROWNING` → `trap.js:6436`, after `set_uinwater(0)`. `trap.c:6957` `BURNING` → `trap.js:6666`, before `spoteffects(false)`. No other call.

## Hallucinations / overclaim

The subject says a drowning rescue used to be only "on top of water", air used `back_on_ground`, and `last_msg` / `prev_decor` were skipped. The new body is the C switch, including the unconditional `last_msg` after a terrain line. The missing-cell typ 0 and the `(0, 0)` position when `game.u` is missing match the code.

## Density

The whole 45-line function and the three callers that were already on it. No stub in the live arms. `back_on_ground` is the existing port, called with C's `TRUE`.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify rescued_from_terrain --base fb4f1bf7d~1 --reach-all`.

```
verify rescued_from_terrain: baseline fb4f1bf7d~1 (scoreboard at f5cea8a9c) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke rescued_from_terrain: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2829's green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None. The missing cell and the missing `game.u` / `game.iflags` guards are the named null-safety notes.

Verdict: **ACCEPT**
