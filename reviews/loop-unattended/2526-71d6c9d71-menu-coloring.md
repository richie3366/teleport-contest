# Review 2526 — 71d6c9d71 — query_color/query_attr prompts + get_menu_coloring (D-3647)

- SHA: `71d6c9d71` (2026-10-08) — cliffs-head `handler_menu_headings` writers
- D-entry: D-3647; Ledger: `query_attr`/`query_color` ported (D-3647),
  `get_menu_coloring` by-design→ported, `select_menu` js+=pick_any
- js diff: `js/options.js` +85 (get_menu_coloring, cattr_to_cell, prompt
  headers, pick-math rename, pick_one/pick_any pattern arms),
  `js/invent.js` +30 (painter color/split), `js/display.js` +4/−1
  (export tty_map_color); new `scripts/menu-headings-prompt.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: (1) both query prompt headers gain inverse+blank (sibling
pattern); (2) whole `get_menu_coloring` port; (3) pick_one/pick_any apply
patterns over the bare pre-selector str with `descStart: 4`; (4) painters
honor entry color/split; (5) `color`→`pickColor` rename + `cattr_to_cell`
for query_attr rows. Moves Caveman-94011 58→65.

Diff actually adds all five, nothing else. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `get_menu_coloring` (new, js/options.js) | whole port | windows.c:1840–1853 |
| `cattr_to_cell` (new, js/options.js) | C-attr→cell-bits map | wintype.h:128–134 (ATR_* values) |
| `query_color` / `query_attr` | headers + row paint completed | coloratt.c:474–518 / :396–472 |
| `select_menu_pick_one/pick_any` | pattern arm on selectable rows | windows.c:1803–1807 (add_menu) |
| `paint_overlay` / `paint_corner_nhw_menu` / pick_none fullscreen | color/split paint | wintty.c:1442–1446, :1462–1491 |
| `tty_map_color` (js/display.js) | export only, body unchanged | — (existing helper) |

## C ↔ JS fidelity

- `get_menu_coloring`: C (`windows.c:1840–1853`, via csym + read) gates on
  `use_menu_color`, first `regex_match` over `menu_colorings` wins and
  **replaces both** color and attr, else FALSE. JS matches arm-for-arm;
  the out-param shape collapses to `{color,attr}|null`, null-safe. The
  `str==null` guard is harmless (C `add_menu` early-returns on Null str).
- Pattern scope: C `add_menu` (`:1803–1807`) applies patterns unless
  SKIPMENUCOLORS. Only two C sites pass SKIP — `add_menu_heading`
  (`windows.c:1827`) and `restore.c:1582` (both verified by grep) — and
  both are non-selectable, so "no selectable C row passes SKIP" is true
  and the JS selectable-only application matches C on that set.
  Non-selectable `add_menu_str` rows *do* get patterns in C — disclosed
  as named omission #2. Honest.
- `attr_n`: C (`wintty.c:1442–1446`) sets attr_n=4 for the
  letter/space/mark/space prefix, 0 (whole line) otherwise; JS
  `descStart: 4` on selectable rows, 0 on headers. The fullscreen `+1`
  shift accounts for the prepended pad space (corner arm paints the pad
  separately with split=descStart — consistent). Glyph cell at n==2
  (`:1474–1483`) is named omission #3.
- `query_color`: C passes ATR_NONE/NO_COLOR per row (`:492–495`); row
  color comes from `basic_menu_colors` patterns at add_menu time — so the
  `color`→`pickColor` rename is faithful (C pick math goes through
  a_int). `query_attr`: C passes `attrnames[i].attr` (`:415–416`); JS now
  passes the caller attr via `cattr_to_cell`.
- `cattr_to_cell` maps bold/inverse/uline, drops dim/blink/italic. The
  MC_ATR_* values (0,1,2,3,4,5,7) match C's ATR_* (`wintype.h:128–134`)
  exactly; the drop is justified by measured C captures (no SGR for
  dim/blink/italic at step-59 rows 4–7). Rendering measurement, not a
  semantic claim — acceptable, and session-verified.
- `tty_map_color` export: body untouched; invent.js already imports from
  display.js, so no new edge (no cycle check needed). Gray→NO_COLOR
  matches the live map convention with measured zero-SGR-37 evidence.

RNG: none on these paths (3438/3438 matched). No clones, no stubs, no
re-points — `sym.mjs` re-point check not applicable.

## Hallucinations / overclaim

None. "Whole `get_menu_coloring` port" is accurate (14-line C function,
all arms). The three named omissions are real C behaviors explicitly
deferred with falsifiers (future cliffs), not hidden gaps.

## Density

Cliff phase: owner `handler_menu_headings` was the cliffs head; the
writers (both query prompts + the pattern engine) shipped whole in one
iteration with Ledger entries for each function. Same-C-file family work
(coloratt.c/windows.c menu paint), not a bundle of unrelated cliffs. The
D-log's Extra (scen-options 20/20: 11 held, 8 identical, plus menucolor
sessions identical) is the right shared-painter diligence. Movement +
REACH-OK re-measured below. Not a no-op.

## Verification

Rule #2: iteration-wide clean. Diff grep: only the commit message's
"No DIAG/FORCE/seed gates" — no production trace logic. Committed test
ran green here (1/1).

Re-measure (this audit):
`hidden-proxy.mjs verify
handler_menu_headings,query_color,query_attr,get_menu_coloring
--base 71d6c9d71~1 --reach-all` →

- `verify handler_menu_headings: 1 PASS … → PROGRESS` (Caveman-94011:
  PASS) + REACH-OK (smoke 24/24)
- query_color / query_attr / get_menu_coloring: vacuous (0 blocked,
  disclosed) + REACH-OK ×3 (smoke 24/24 each)

Stronger than ship-time (58→65): D-3648/D-3649 complete the chain to PASS
on current code. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
