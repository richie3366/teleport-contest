# Review 1847 — 941017b03 — do_positionbar (D-2888)

- SHA: `941017b03` (coverage; `allmain.c` `do_positionbar`)
- Files: `js/allmain.js` (about 89 lines of the function, the guard, and the call)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the C function, a reused `COLNO` buffer, stair and hero pairs, and `moveloop_core` calling it only when `POSITIONBAR` is set. That constant is false. The diff does that. `sym.mjs`:

```
do_positionbar      js/allmain.js:1054   sync
glyph_to_cmap       js/display.js:734   sync
update_positionbar  LOCAL CLONE js/allmain.js:1029
is_cmap_stairs      LOCAL CLONE js/allmain.js:1018
positionbar_char    LOCAL CLONE js/allmain.js:1039
```

`is_cmap_stairs` is the `sym.h:107` macro, not a second C function. `positionbar_char` is the `(char)` store. `update_positionbar` is the unix `tty_update_positionbar` body.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `do_positionbar` | export `allmain.js:1054` | `allmain.c:931–972`, inside `#ifdef POSITIONBAR` |
| `is_cmap_stairs` | macro inline | `sym.h:107` |
| `glyph_to_cmap` | live import | `display.c` |
| `update_positionbar` | empty unix tty | `wintty.c:4159–4167` |
| `POSITIONBAR` | `false` | `pcconf.h:284` only; `unixconf.h` does not define it |

## C ↔ JS fidelity

`csym` body is `allmain.c:931–972`. Call site is `allmain.c:187`, also inside `#ifdef POSITIONBAR` (`:186–188`). No RNG.

The buffer is module-level, length `COLNO`, and is not cleared between calls. The walk is `game.stairs` via `next`, the same nodes `stairway_add` builds (`sx`, `sy`, `up`, `next` at `mklev.js:391–396`). For each stair, `x`/`y` come from the node and the glyph is `remembered_glyph.glyph`, the port's `levl[x][y].glyph` (map `turns.md`). A missing memory glyph is 0. `glyph_to_cmap` is the live export (`display.js:734`). `is_cmap_stairs` is `symbol >= S_upstair && symbol <= S_brdnladder` (`const.js` 25..32). A hit stores `'<'` (60) when `up`, else `'>'` (62), then `(char) x`.

`(n << 24) >> 24` is a signed 8-bit truncate. Columns in `1..79` are unchanged. The hero arm is `u.ux` non-zero, then `'@'` (64) and the same truncate. C writes `u.ux` into a `char`, which is that conversion. A 0 byte ends the string. Bytes past it stay.

`update_positionbar` has no statement. `tty_update_positionbar` (`wintty.c:4161–4166`) calls `video_update_positionbar` only under `MSDOS`. `moveloop_core` calls `do_positionbar` only when `POSITIONBAR` is true (`allmain.js:1104`). The constant is false, so the contest loop does not enter the function. That matches the unix tty binary, which does not compile the call.

## Hallucinations / overclaim

MS-DOS `video_update_positionbar` / vga / vesa are named and not this window port. The `getpos()` TODO and the mimic-stairs FIXME are comments in C, not code. `get_nh_event` stays uncalled; `wintty.c` tty is a no-op, and that skip predates this SHA. The first-call tail of the JS buffer is zeros. C's first-call tail is uninitialized. Nothing reads past the NUL on this build.

## Density

The 42-line function and the one call site, gated the way unix compiles it. Not a status-bar paint.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify do_positionbar --base 941017b03~1 --reach-all`.

```
verify do_positionbar: baseline 941017b03~1 (scoreboard at f2ba5333b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke do_positionbar: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The function does not run on the public sessions, so REACH-OK is the smoke gate, not a stair-glyph corpus hit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
