# Review 1848 — ef40ca579 — flip_visuals (D-2889)

- SHA: `ef40ca579` (coverage; `sp_lev.c` `flip_visuals`, plus `mapfrag_fromstr`)
- Files: `js/mklev.js` (function, call, `mapfrag_*` string layout), `js/hacklib.js` (`str_lines_maxlen`, `stripdigits`), `js/dungeon.js` (`dupstr` export)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

**Addressed:** D-2898 `93cce8666`

## Intent vs deliverable

Subject promises one `flip_visuals` (8-bit `seenv`, skip 0, keep `SVALL`, bit 1 then bit 2 via `swapbits`, then `back_to_glyph` on a cmap wall or `SDOOR`) and the `flip_level` call after `set_wall_state` when `extras && flp`. It also promises `mapfrag_fromstr` as `dupstr`, `stripdigits`, `str_lines_maxlen`, then a row walk that returns null once the count already exceeds `MAP_Y_LIM`. The diff adds those functions and rewrites `mapfrag_get` onto `y * (wid + 1) + x`. `sym.mjs`:

```
flip_visuals     NOT EXPORTED — 1 local js/mklev.js:19150
mapfrag_fromstr  NOT EXPORTED — 1 local js/mklev.js:28284
mapfrag_get      NOT EXPORTED — 1 local js/mklev.js:28320
mapfrag_char     NOT EXPORTED — 1 local js/mklev.js:28312
str_lines_maxlen js/hacklib.js:41   sync
stripdigits      js/hacklib.js:68   sync
dupstr           js/dungeon.js:262   sync
glyph_is_cmap    js/display.js:880   sync
back_to_glyph    js/display.js:3381   sync
set_wall_state   NOT EXPORTED — 1 local js/mklev.js:32891
swapbits         js/hacklib.js:28   sync
vision_reset     js/vision.js:217   sync
```

No symbol was deleted. `dupstr` was already the `alloc.c:238–246` copy and is now exported. `mapfrag_char` is the `mapfrag_get` index, not a second C function.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `flip_visuals` | local `mklev.js:19150` | `sp_lev.c:458–495` |
| `swapbits` | live import | `hacklib.c:831–837` |
| `glyph_is_cmap` | live import | `display.h:723–725` (the `#if 0` form at `:711` stays out) |
| `back_to_glyph` | live import | `display.c:2286–2427` |
| `set_wall_state` | local, one body | `display.c:3331–3354`; `WA_VERBOSE` is commented out (`display.c:138`) |
| `mapfrag_fromstr` | local | `sp_lev.c:226–253` |
| `stripdigits` | live export | `hacklib.c:521–530` |
| `str_lines_maxlen` | live export | `hacklib.c:252–272` |
| `dupstr` | live export | `alloc.c:238–246` (`strlen` / `strcpy`; the length-overflow `panic` is not in the JS copy) |
| `mapfrag_get` | local | `sp_lev.c:265–271` |

## C ↔ JS fidelity

`csym` body is `sp_lev.c:458–495`. The only call is `sp_lev.c:919`, inside `if (extras && flp)` after `set_wall_state` (`:916–919`), then `vision_reset` (`:921`). `flip_level` returns first when `(flp & 3) == 0` (`:552–553`). JS does that (`mklev.js:18884`, `:19133–19139`). No RNG.

`seenv` is `(lev.seenv | 0) & 0xff`. Zero skips the cell, including the glyph arm. `SVALL` is `0xFF` (`rm.h:400`, `const.js`). Bit 1 swaps `2↔4`, `1↔5`, `0↔6`. Bit 2 swaps `2↔0`, `3↔7`, `4↔6`. `swapbits` is the C expression. The store is `lev.seenv`, which `makeLocation` actually has (`game.js:16`). That half matches.

The wall arm does not. C is `glyph_is_cmap(lev->glyph)` then `lev->glyph = back_to_glyph(x, y)` (`sp_lev.c:491–493`). `makeLocation()` has no `glyph` field (`game.js:8–27`). The port's `levl[x][y].glyph` is `remembered_glyph.glyph` (`ball.js` `levl_glyph_at` / `set_levl_glyph`; `display.js` `memory_glyph_is_invisible`). `glyph_id` returns null for a non-number (`display.js:783–784`), so `glyph_is_cmap(lev.glyph)` is false on every cell and `back_to_glyph` never runs. A write to `lev.glyph` would still not be what `show_memory_glyph` paints: that function draws `remembered_glyph.ch` (`display.js:5479–5481`). `map_background` is the writer that pairs `back_to_glyph` with `remember_shown_glyph` (`display.js:1422–1429`).

`mapfrag_fromstr` matches the C walk. `MAP_Y_LIM` is 21 (`sp_lev.h:18`, `const.js`). The test is `hei > MAP_Y_LIM` before the increment, so 22 rows return and the 23rd returns null. A trailing newline does not add a row (`*tmps` is 0). `str_lines_maxlen` takes the longest span between newlines and ignores a trailing empty piece. `stripdigits` drops `'0'..'9'`. `mapfrag_get` panics out of range; JS throws. `selection_match_mapfrag` is the `nhlsel.c:696` caller and uses `mapfrag_get`.

C does not pad short rows. JS pads a row to `wid` with spaces so the stride stays a column after the embedded copies drop trailing spaces. A row that is already `wid` is unchanged. The "79 maps, 0 ragged" count is the commit's measurement; this review did not recount `dat/*.lua`.

`if (!lev) continue` skips a missing `level.at` cell. `at()` returns null outside `0..COLNO-1` / `0..ROWNO-1` (`game.js`). `flip_level` already clamps the rectangle to that box, so the skip does not drop an in-bounds cell.

## Hallucinations / overclaim

The subject says a cmap wall or `SDOOR` is replaced with `back_to_glyph`. The predicate never sees a cmap, because it reads a field the cell does not have. The `seenv` half is what the diff actually does.

`#wizfliplevel` (`wizcmds.c:434`) and `nhl_flip_level` (`nhlua.c:1517`) are named unwired. The extras prefix that flips the hero, `placebc`, travel, and the dig spot (`sp_lev.c:898–913`) is still absent from `flip_level`. Level creation passes `extras` false, so that prefix and `flip_visuals` both stay off the public path. The map names the two callers. It does not name the dead glyph predicate.

## Density

`flip_visuals` is the whole 40-line body, and its one call site is wired. `mapfrag_fromstr` is the whole 28-line body plus the index in `mapfrag_get`. Not an arm peel. The wall store is the wrong field, so the function is not the C write.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify flip_visuals --base ef40ca579~1 --reach-all`.

```
verify flip_visuals: baseline ef40ca579~1 (scoreboard at 941017b03) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke flip_visuals: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. Same command for `mapfrag_fromstr`: 0 blocked, smoke 12 PASS, 0 regressed → REACH-OK. No `REGRESSED` session. `flip_visuals` does not run while `extras` is false, so REACH-OK does not exercise the wall arm.

## Actionable C-wrongs

1. `flip_visuals` wall / `SDOOR` arm (`sp_lev.c:489–493`): test `glyph_is_cmap` on `remembered_glyph.glyph` and store the rebuilt cmap with the memory writer `map_background` uses (`remember_shown_glyph`), so the painted `ch` changes. `lev.glyph` is not `levl[x][y].glyph`.

Verdict: **QUALITY-RISK**
