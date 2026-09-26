# Review 1857 — 93cce8666 — flip_visuals wall cmap (D-2898)

- SHA: `93cce8666` (Must-fix from review 1848; `sp_lev.c` `flip_visuals` wall / `SDOOR` store)
- Files: `js/mklev.js` (memory id + `remember_shown_glyph` store), `js/display.js` (`export` on the existing writer)
- Queue row: review 1848 item 1. The coverage row that first shipped the function cited 0 corpus blocks.
- Closes: `reviews/loop-unattended/1848-ef40ca579-flip-visuals.md` (that file already has `**Addressed:** D-2898 `93cce8666``).
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can js/mklev.js js/display.js`: `ALREADY` (no new cycle edge).

## Intent vs deliverable

Subject promises the review-1848 repair: test `glyph_is_cmap` on `remembered_glyph.glyph`, and store `terrain_glyph` plus `back_to_glyph` through `remember_shown_glyph`, the writer `map_background` uses. The diff does that and only that. It does not add a second `flip_visuals`. `remember_shown_glyph` was already the `map_background` body; this commit exports it. No symbol was deleted. `sym.mjs` on the names the diff starts calling from `mklev.js`:

```
remember_shown_glyph js/display.js:3527   sync
terrain_glyph    js/display.js:3557   sync
glyph_is_cmap    js/display.js:880   sync
back_to_glyph    js/display.js:3381   sync
flip_visuals     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:19152
```

`flip_visuals` stays the one local in `mklev.js`. C's function is `staticfn`. The "LOCAL CLONE" line is `sym.mjs` naming a single non-export, not a second body.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `flip_visuals` | local `mklev.js:19152` | `sp_lev.c:458–495` |
| `glyph_is_cmap` | live import | `display.h:723–725` (the `#if 0` form at `:711` stays out) |
| `back_to_glyph` | live import | `display.c:2286–2427` |
| `terrain_glyph` | live import; tty half `map_background` already pairs with `back_to_glyph` | wall/`SDOOR` arm is `wall_glyph` → `wall_angle` |
| `remember_shown_glyph` | live export; body unchanged | the `lev->glyph` plus shown-char store `map_background` uses (`display.js:1422–1429`) |
| `swapbits` | unchanged import | `hacklib.c:831–837` |

## C ↔ JS fidelity

`csym` body is `sp_lev.c:456–495`. The only call is `sp_lev.c:919`, inside `if (extras && flp)` after `set_wall_state` (`:916–919`), then `vision_reset` (`:921`). JS is `mklev.js:19133–19138`. No RNG.

Unseen skip is first: `seenv == 0` continues, so the glyph arm does not run. `SVALL` (`0xFF`) skips the bit swaps and still reaches the glyph arm. Bit 1 swaps `2↔4`, `1↔5`, `0↔6`. Bit 2 swaps `2↔0`, `3↔7`, `4↔6`. The store `lev.seenv = seenv & 0xff` happens before `back_to_glyph`, so `wall_angle` sees the flipped vector. That half was already the C order in `ef40ca579` and this diff does not move it.

The wall arm is now the C predicate. `IS_WALL` is `rm.h:117` `(typ) && (typ) <= DBWALL`. `STONE` is 0 and `VWALL` is 1 (`rm.h:56–57`), so `js/const.js` `typ >= VWALL && typ <= DBWALL` is that set. `SDOOR` is the extra `||`. `glyph_is_cmap` (`display.js:880–884`) is the live `display.h:723–725` range. `glyph_id` returns null for a non-number (`display.js:783–784`), so a missing `remembered_glyph` is not cmap and the arm does not store. That is the review-1848 hole closed: the old read was `lev.glyph`, a field `makeLocation()` does not have.

The store is `remember_shown_glyph(lev, terrain_glyph(lev, x, y), back_to_glyph(x, y))`. `map_background` (`display.js:1425–1428`) is the same pair, and it still gates on `hero_memory`. `flip_visuals` does not. The new call does not either, so a wall is rewritten even when hero memory is off, which is what `sp_lev.c:491–493` does. `remember_shown_glyph` writes `ch` / `color` / `decgfx` from the tty argument and `glyph` from the third argument (`display.js:3527–3533`). `show_memory_glyph` paints `mem.ch` (`display.js:5480–5482`).

For a wall or `SDOOR`, both `back_to_glyph` (`display.js:3403–3414`) and `wall_glyph` (`display.js:3360–3362`, reached from `terrain_glyph` `:3674–3686`) take `seenv ? wall_angle(loc) : S_STONE`. `seenv` is already the flipped value. `wall_angle` returns a cmap index; `back_to_glyph` turns that index into the integer id; `wall_glyph` turns the same index into the tty cell. Calling `wall_angle` twice does not consume RNG. `t_warn` (`display.js:3125`) only names the C `impossible`; it does not call it. Argument order is tty, then id, and neither call writes `seenv`.

`rm.h:160` is `int glyph` ("what the hero thinks is there"). The JS cell keeps that integer on `remembered_glyph.glyph` and the character `show_memory_glyph` actually draws beside it. Replacing the whole memory object drops a prior `objpile` flag if one had been set on a cmap wall. C's assignment replaces only the integer, and a cmap wall is not an object pile. The predicate still refuses a non-cmap id, so an object or monster memory on that square is left alone, as `glyph_is_cmap` requires.

## Hallucinations / overclaim

The subject says the painted `ch` and the memory id both follow the rebuilt cmap. That is what this store does, for a cell whose memory id is already a cmap. It does not claim `#wizfliplevel` or `nhl_flip_level` now call `flip_level`. Those two, and the extras prefix at `sp_lev.c:898–913`, stay named unwired, as in review 1848. Level creation still passes `extras` false, so the function stays off that path. "No arm omitted" matches the 40-line body. The D-log's local `|` → `-` check is not a corpus session; this audit did not re-run it. The reach re-measure is below.

## Density

The whole `flip_visuals` body was already in `js/`. This commit replaces the dead glyph write. It is the Must-fix arm, not a new function sold from one case. The single C caller stays wired. Under the small-function floor, which is what a one-arm repair of a shipped function is.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify flip_visuals --base 93cce8666~1 --reach-all`.

```
verify flip_visuals: baseline 93cce8666~1 (scoreboard at 37fb9f7ea, 2026-09-26T21:10:38.171Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify flip_visuals: no corpus session is blocked on it at 93cce8666~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke flip_visuals: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The coverage row and review 1848 both cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line. `flip_visuals` still runs only when `extras && flp`, so REACH-OK does not enter the wall arm. That was already true before this store existed.

## Actionable C-wrongs

None. The review-1848 wall store is the `remembered_glyph` id plus the `map_background` writer.

Verdict: **ACCEPT**
