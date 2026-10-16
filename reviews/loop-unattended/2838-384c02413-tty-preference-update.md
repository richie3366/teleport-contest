# Review 2838 — 384c02413 — tty_preference_update statuslines arm whole

## Metadata

- SHA: `384c0241397cf8bbec4aae969757cbe7e83a1dca` (D-3993)
- Cliffs-head writer: `botl.c` do_statusline1 @06694bcbb, 5 blocks (3 named here)
- js/ diff: +317/−~60 across `js/options.js`, `js/botl.js`,
  `js/display.js`, `js/getpos.js`; new `scripts/statuslines-three-row.test.mjs`
- Method: full per-function (cliff commit; one C family)

## Intent vs deliverable

Promise: 3 symset sessions set `statuslines` to 3 in the O-menu; C
repaints 3-line status at rows 21–23 and clips the map to rows 1–20,
while JS no-op'd `preference_update` and kept 2-line status with row
21 empty. Port `tty_preference_update` whole (resize + reclip),
re-origin every status paint site, gate+pan every map paint site,
retire the unpanned-getpos omission. 3 PASS + 2 unchanged (own
cause, named).

Diff actually: `preference_update` goes async-live for
`'statuslines'` (new_status_window + newclipping), awaited at 7
call sites; `new_status_window` gains its live clear;
`statusOriginRow`/`status_num_rows`/`status_origin_row` twins;
flush + `paint_status_grid` paint `nrows` lines at the live origin;
`map_screen_cell` (gate+pan) with `_paint_gbuf_cell(mx,my)` and all
5 call sites converted; clip-aware `resync_map_row0` and `:3716`
offy; `tty_map_clip` export; 5 getpos sites routed through panning
`curs_win_map`. Promise == diff; no extra cliff, no other C file.

## Inventory

- `preference_update` (`js/options.js:10240`, C
  `wintty.c:tty_preference_update` `:595-631` via `csym.mjs`):
  statuslines arm live, rest no-op. Whole-live-arms port.
- `new_status_window` (`js/botl.js`, C `:491-507`): both clears
  live via `clear_status_window`.
- `clear_status_window` (new, C `:1066-1073` STATUS arm): buffer +
  grid-union + cache blank.
- `map_screen_cell` (new, C `:3869-3873` + `:2119-2124`): clip
  gate + WIN_MAP pan.
- `status_num_rows`/`status_origin_row` (new, C `:229` + `:905-912`).
- `curs_win_map` pan (C `:2121-2124`), `resync_map_row0` clip
  (C `:3696-3704`), docorner `:3716` live offy.

## C ↔ JS fidelity

Read every cited C locus against the diff:

- `tty_preference_update` (`win/tty/wintty.c:595-631`): the
  `newstatuslines` gate calls `new_status_window()` +
  `newclipping(u.ux, u.uy)` (`:601-604`), then
  `genl_preference_update` (returns immediately, `windows.c:461-469`
  verified). JS matches arm-for-arm. (Subject says `:594–608`;
  `csym.mjs` prints `:595-631` — same body, off-by-one fence.)
- `TTY_PERM_INVENT` (`:609-630`) compiled out — `config.h:612`
  is `/* #define TTY_PERM_INVENT */` ✓. `CLIPPING` in
  (`config.h:538`) ✓.
- `new_status_window` (`:491-507`): pre-destroy clear, destroy,
  `genl_status_finish`, `tty_status_init`, second clear,
  `status_initialize(REASSESS_ONLY)` under STATUS_HILITES — JS
  runs the same sequence; the union-blank (grid rows 21–23) covers
  both C clears' rows, and the D-log says so explicitly.
- STATUS clear arm: per-row `tty_curs`+`cl_end`, buffer to
  spaces, `finalx` reset **commented out**, `disp.botlx=TRUE`
  (`:1066-1073` read) — JS leaves finalx untouched and sets
  botlx via `status_initialize` ✓.
- offy: `newwin->offy = min(rowoffset, ROWNO + 1)` (`:905-912`
  read) → `Math.min(rows - n, 22)` ✓; `StatusRows()` (`:229`
  read: `<= 2 ? 2 : 3`) → both twins ✓.
- Clip gate operators `x <= clipx || y < clipy || x >= clipxmax
  || y >= clipymax` (`:3869-3873` read) — JS char-identical ✓.
- curs pan `x -= clipx; y -= clipy` under clipping+WIN_MAP
  (`:2119-2124` read) ✓ in both `map_screen_cell` and
  `curs_win_map`.
- docorner (`:3696-3704`, `:3712-3720` read): skip condition,
  `row_refresh(xmin + clipx - offx, COLNO - 1, y + clipy -
  offy)`, `:3716` `ymax >= offy && !ystart → botlx + bot()` —
  all three land in JS with offx 0/offy 1 folded ✓.
  `resync_map_row0`'s `my = clipy, x0 = 1 + clipx` is that
  formula at xmin=1 ✓.

No-RNG port (pure presentation); branch order follows C.
Call-site audit: all 5 `_paint_gbuf_cell` callers converted to
2-arg (grep: 7887/7906/8008/8365/8405 + def 8186, zero 4-arg
leftovers); `preference_update` awaited at 7 sites (simple-menu +
×5 full-doset + hilites), sync at exactly the two no-op names
(`'symset'` :2585, `'map_mode'` :3456 — an un-awaited async fn
with no reached await runs fully sync, so "stay sync no-ops"
holds). New imports (`newclipping`, `new_status_window`,
`tty_map_clip`) extend pre-existing import lists — "no new
cross-module edges" is true by construction.

2-line path provably unchanged: origin 22/nrows 2 when
`wc2_statuslines ≤ 2`; `map_screen_cell` returns `(mx-1, my+1)`
with clipping off; getpos cursors identical — so the full-44/44
ship claim is structural, not luck.

Diff grep: no `FORCE`/`DIAG`/`fastforward`/seed/coordinate/RNG-index
reads. `imports.mjs --rulecheck` on all of scored `js/`: clean.

## Hallucinations / overclaim

None. "Ported tty_preference_update whole (live arms)" is
accurate — the only dead arm is `#ifdef`'d out of the build.
The D-log's C-locus cite of `tty_status_init` fieldorder
`:4336-4361` is context (the 3rd line's content source), not a
port claim; the 3 PASS prove the content path end-to-end. "Row
21 empty" pre-fix red is corroborated by the committed test.

## Density

Cliff phase §10.18: one cliff, one C family (trigger + resize +
origin + clip + pan + cursors), code + ledger + verify + focused
test in one handoff. Large but coherent — every hunk is the same
writer. The 2 unchanged sessions are named with a falsifier
(temp-C cursor dump), not shipped as movement. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify do_statusline1 --base 384c02413~1 --no-reach`
- `verify do_statusline1: 3 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS`
- The 3 PASS are the exact ship-time sessions; the 2 unchanged
  sit at the exact ship-time steps (worldtour-Monk s89,
  worldtour-Wizard s111, still do_statusline1) — the named
  omission-1 cause is genuinely untouched by this port.

Ship-time reach 24/24, green, strict, cohort 7/7, full 44/44
(shared files) corroborate the structural no-change argument.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
