# Review 2505 — d0040be10 — number_pad prompt arm (D-3624)

SHA: `d0040be10` — cliffs-head handler_number_pad. D-3624.

## Intent vs deliverable

Promise: `handler_number_pad` passed the end_menu prompt as a plain header
with no blank separator; C paints it reverse-video (promptstyle) plus a
blank item. Fix adds both to the raw header: 1 PASS + 2 moved.

Diff actually adds: `js/options.js` (+6/−2, the raw header) +
`scripts/numpad-menu-prompt.test.mjs` (1 case). No other `js/`.

## Inventory

- `handler_number_pad` raw header (`js/options.js:2537–2542`, changed) — C
  `options.c:5915` end_menu + `wintty.c:2678–2689` prompt prepend. Status:
  fixed.

## C ↔ JS fidelity

`tty_end_menu` verified in full: `:2678` reverses the prepend-built item
list to chronological order, then `:2684–2689` prepends `""` and prepends
the prompt with `tty_menu_promptstyle` — final order prompt, blank, items,
exactly the new JS `raw` array. Promptstyle default is ATR_INVERSE
(menu_headings; `:2905` windowport init), corroborated by the recorder's
`\x1b[7m` on C row 0 — ground truth for this config. `end_menu` with the
prompt at C `:5915` confirmed (`options.c:5915`).

The hunk is verbatim the sibling shape (`handler_menu_objsyms` `:2044–2045`,
`handler_whatis_coord` `:2361–2362`, same comment + D-3403 cite) — this
handler was the only one of the D-2774/D-2775/D-2778 batch missing the arm.
Geometry claim holds: the blank is maxcol-neutral (len 2 < prompt), offx
unchanged; +1 row cannot flip paging (8 rows « 24). ATR_INVERSE import
pre-exists (siblings use it). D-2778's named omits (number_pad() no-op,
config_error_add, glyph columns) correctly stand.

Helper class: static menu-data arm, no callee. No clone touched, no new
import. No FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The "same one-row shift, not a third diff" reading of the row-8 text
is the only parsimonious account of items-from-row-2 vs row-1 with
identical leftovers below, and the fix's movement confirms it.

## Density

Cliff commit, one arm of the owner itself (owner, not writer, this time —
the D-2778 history was read once and the missing arm identified rather than
re-ported), own head per its HEAD queue. Ledger: options.c row updated
(D-3624).

## Verification

Re-measured: `hidden-proxy.mjs verify handler_number_pad --base
d0040be10~1 --reach-all` → `1 PASS, 2 moved past, 0 unchanged, 0 worse →
PROGRESS` (Caveman-94091 PASS; Barbarian-94191 6→optfn_boulder@27;
Tourist-94171 12→doup@85 — identical sessions, targets and steps to the
D-log); smoke reach 24/24 → REACH-OK. Exact match. Unit test: 1 pass,
0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
