# Review 2991 — 184653034 — more()'s row-1 docorner clears the row first

- SHA: `184653034` (cliff; owner-null reserve rows, the board head after
  D-4150; writer topl.c more → wintty.c docorner)
- D-entry: D-4151; Ledger: more ported
- `js/` diff: js/display.js +6

## Intent vs deliverable

Promise: topl.c more() ends a wrapped message with `docorner(1,
cw->cury + 1, 0)`. For each row, docorner does `tty_curs(BASE_WINDOW,
xmin, y); cl_end();` and then `row_refresh`. JS's resync_map_row0
repainted map row 0 cell by cell with no clear, so cells
`_paint_gbuf_cell` skips (unexplored squares, capture-dropped symset
chars) kept the message's letters. Diff: blank screen row 1, columns
0..cols-1, before the replay loop. The promise matches the diff.

## Inventory

- `resync_map_row0` — display.js:8162–8186 (the docorner row-1 half).
- C: topl.c more `docorner(1, cw->cury + 1, 0)` (pinned :238); wintty.c
  docorner :3649–3721 (cl_end :3687, row_refresh :3704).
- Caller: more() when the dismissed message wrapped (unchanged).

## C ↔ JS fidelity

C docorner, per row `y` in `[0, ymax)`: `tty_curs(BASE_WINDOW, xmin=1,
y)` (tty_curs is 1-based, so column 0), then `cl_end()` clears to end of
line (`ystart_between_menu_pages` is 0 here), then CLIPPING: skip rows
outside the board, else `row_refresh(xmin + clipx - offx, COLNO-1, y +
clipy - offy)`. JS now does the same three steps for screen row 1: clear
columns 0..cols-1, then replay map row `clipping ? clipy : 0` from `x0 =
1 + clipx`. The leftover "blank if disp_ch empty" arm in the loop is
now redundant but harmless.

Citation drift: the JS comment and D-log cite wintty.c `:3742–3744` /
`:3707–3778` and topl.c `:240`. Those are the **patched recorder tree**
(`nethack-c/recorder/win/tty/`). Pinned upstream has docorner at
:3649–3721, cl_end at :3687 and the more() call at :238. Same code, so
not a C-wrong. A later touch should cite upstream.

## Hallucinations / overclaim

None in the fix. Its Named line (only row 1 handled; C loops to `cury`)
is true. The D-log flagged an archived PASS that drifted
(scen-symset-Monk-50255053, 863/864) and asked this audit to unarchive
and rescore it. Done below.

## Density

A 6-line fix on the writer of two owner-null rows.

## Verification

```text
verify more / resync_map_row0 (--base 184653034~1): 0 blocked (owner-null rows)
full rescore @184653034: scen-symset-Barbarian-50059022 PASS 889/889,
  scen-symset-Barbarian-50555001 PASS 656/656 (D-log's 2 FAIL→PASS hold)
```

The archived drift, which this audit measured:

```text
scen-symset-Monk-50255053  (unarchived → active; full rescore)
  FAIL s558/864, screens 863/864, RNG 8553/8553, owner optfn_statuslines
  C«'statuslines:6' is invalid; must be 2 or 3.--More--» (same J)
  row 21 col 62: C '#', JS ' '
bisect over the 160 js/ commits c07dee3b9..2cf72c412 (frozen runner, cached recording):
  384c02413~1 PASS 864/864 · 384c02413 FAIL 863/864  → D-3993
```

D-3993 (2026-10-15) made `tty_preference_update`'s statuslines arm live:
`new_status_window()` + `newclipping(u.ux, u.uy)` (wintty.c :596–604).
C runs that arm even for a rejected value, because doset ignores the
optfn return (options.c :8688 / :8958), so JS is right to call it. What
differs is the repaint: after the status window is rebuilt at the
unchanged 2 lines, C still shows the bottom map row (screen row 21,
`#` at col 62), and JS leaves it blank. This SHA's window did not cause
it (it fails at 2cf72c412 too). It is a PASS→FAIL in the fortress, so it
is a Must-fix.

## Actionable C-wrongs

1. **Must-fix:** wintty.c tty_preference_update → new_status_window /
   newclipping repaint (D-3993 `384c02413`, js/options.js
   preference_update + js/display.js): after `O` statuslines:6 (rejected,
   wc2_statuslines stays 2) the JS screen loses map row 20 (screen row
   21). Probe scen-symset-Monk-50255053 s558.

Verdict: **ACCEPT**
