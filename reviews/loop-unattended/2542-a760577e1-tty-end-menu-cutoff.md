# Review 2542 — a760577e1 — tty_end_menu overlong-item cutoff

Metadata: SHA `a760577e1ea73cf7bf3c946ae21f7998f00a7090`, D-3665,
cliff-head `dungeon.c` save_dungeon (region heuristic) via writer
`wintty.c` tty_end_menu. js diff +36/−3 in `js/invent.js` (new
`end_menu_cut_str` + 5 wired sites); + focused test
`scripts/tty-end-menu-cutoff.test.mjs`.

## Intent vs deliverable

Promise: Priest-92179 @103 (death-disclosure overview) showed a
79-col C row vs 80-col JS row on an 81-char epitaph: C cuts menu strs
to 78 in tty_end_menu. Port the cut verbatim as a paint-time copy at
5 paint sites. Diff does exactly that; nothing bundled.

## Inventory

- `end_menu_cut_str(text, cap=78)` (`js/invent.js:2958`, module-local):
  `text.length > cap ? slice(0, cap) : text`. C: `tty_end_menu`,
  `wintty.c:2648–2772` (per `csym.mjs`).
- 5 sites: `paint_corner_nhw_menu` top (`:3037`, pre-geometry),
  3 multi-page `paint_overlay` maps (pick_none/pickinv/invlets),
  `doattributes` in-place (`:8646`, cap 79 for the leading space).
- Helper class: C-calque (new, cited, no existing export to import).

## C ↔ JS fidelity

- C `:2728–2733` (direct read): `len = strlen(str)+2; if (len > cols)
  str[cols-2] = 0; len = cols` with cols=80 → 78-char cut ✓
  verbatim in the helper.
- Order: C cuts inside the per-item loop before the `cw->cols`
  measurement (`:2734–2735`) ✓; JS cuts entries before
  `nhw_menu_geometry` ✓.
- Geometry/cell-exactness rechecked: maxcol ≤ 80 → corner arm needs
  offx ≥ 1 → maxcol ≤ 78 → L ≤ 76, so L+offx ≤ 77 in the corner
  loop (max painted col offx+L ≤ 77 < 79 ✓); offx=0 takes the
  fullscreen arm (` ${78}` = cols 0–78, col 79 untouched ✓).
  The D-log's "L+offx ≤ 77" holds for the corner arm as claimed.
- C display clip `:1456–1464` (`++curx < cols`, direct read) never
  binds once stored text is cut (78+2=80 ≯ 80) — Named-redundant,
  correctly ✓. Morestr truncation `:2753–2758` dead (`(end) ` /
  `(N of N) ` can't exceed 80) ✓.
- Paint-time-copy vs C in-place mutation: C callers read back
  identifiers from select, never strs — no C observable ✓; repaint
  equivalence holds since JS re-cuts at each paint.
- Single-page paths route through `paint_corner_nhw_menu` (verified
  both `else` branches); multi-page through the cut maps — full
  coverage of the menu paint surface.
- Boundary note (no action): C cuts bytes, JS cuts UTF-16 units;
  a mid-character split differs for non-ASCII overlong items. No
  session reaches it; pre-existing class.

## Hallucinations / overclaim

None. The Named list is unusually thorough (morestr, distributed-live
rest, search/return-text, display clip) and each item checks out.

## Density

Cliff-phase §2b: one cliff, writer correctly chosen (menu painter,
not the overview owner), whole-arm port with all paint sites wired,
Ledger row updated. Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Re-measure on the SHA's own code (scratch worktree):
  `verify save_dungeon,tty_end_menu --base a760577e1~1 --reach-all`
  → `1 PASS (Priest-92179), 0 worse → PROGRESS` + both smokes 24/24
  REACH-OK. Claim reproduced exactly; no REGRESSED.
- Focused test on SHA code: green (0 pre-fix failures to re-run —
  the mechanism is a literal length cap).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
