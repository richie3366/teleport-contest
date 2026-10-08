# Review 2529 — 064fb35ea — choose_classes_menu preselect '*' mark (D-3650)

- SHA: `064fb35ea` (2026-10-08) — cliffs-head `optfn_pickup_types` writer
- D-entry: D-3650; Ledger: `optfn_pickup_types` + `choose_classes_menu`
  D-3650 appended
- js diff: `js/options.js` +8/−1 (mark rule + toggle stamp + comment); new
  `scripts/choose-classes-preselect-mark.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: the bespoke class menu painted preselected rows '+' (the
runtime-toggle mark) instead of C's initial-paint '*'; initial/page paint
shows '*' for selected rows (count always -1 here), '+' only for
runtime-toggled rows via `_retoggled`, verbatim the D-3403 pick_any
sibling. Moves Knight-94331 88→135. Return arms untouched.

Diff actually adds the mark rule + the toggle stamp. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `choose_classes_menu` (js/options.js) | mark rule + stamp | windows.c:1643–1761 (csym); paint wintty.c:1467–1473, :1182 |

## C ↔ JS fidelity

Both paint rules verified in pinned C:

- Initial page paint (`wintty.c:1467–1473`): selected rows show
  `(count == -1L) ? '*' : '#'`. This loop has no count support (named
  omission #3), so count is always -1 → '*'. JS: `'*'` for selected
  non-retoggled rows. ✓
- Runtime toggle (`set_item_state`, `wintty.c:1182`):
  `selected ? (count == -1 ? '+' : '#') : '-'`. JS stamps `_retoggled`
  on select and paints `'+'`. Toggle-off → `'-'` on both sides. ✓

The sibling (`select_menu_pick_any`) clears `_retoggled` on page flip
(`:10302`, because C page repaints show '*' again) — this loop needs no
clear: it has no pagination (single `for(;;)` repaint loop, no
MENU_NEXT/PREV_PAGE arms), so no page-flip repaint path exists where C
would show '*' over a runtime '+'. The sticky flag matches C's on-screen
persistence ('+' stays until a page repaint that never comes). Correct.

RNG: none (2841/2841 matched). No clones/stubs/re-points — `sym.mjs`
re-point check not applicable. Named omissions (sibling loops' '+',
space-finish, digit counts) are real C behaviors explicitly deferred.

Committed test pins the C-recorded `a * $` paint; ran green here (1/1).

## Hallucinations / overclaim

None on the port. "Verbatim the D-3403 sibling" is accurate (same mark
expression modulo the count arm this loop lacks, same stamp site).

## Docs-integrity finding (NOT a C-wrong — no Must-fix)

This commit grew `docs/DIVERGENCE-INDEX.md` from 13,040 lines (5 table
copies, pre-existing at `aab90e6bc`) to 26,074 lines (**9 copies** of the
index table back-to-back, +13,034 lines, with a stray mid-file header).
Every D-row now appears ~8–9×. `finish-iteration.mjs` only inserts one
row, so the multiplication came from an agent-side file operation in the
D-3650 iteration, not the script. Scored `js/` is unaffected, the D-log
itself is intact, and Must-fix is strict (C-wrong/throw/hang/regression
only) — so this ships as a reported finding, not a queue row. A
maintainer dedupe (keep the first table incl. the D-3650 row, drop the 8
stale copies) is recommended; I did not hand-edit a 26k-line generated
file inside a review iteration.

## Density

Cliff phase: owner `optfn_pickup_types` was the cliffs head; the writer
(the bespoke menu's mark rule) shipped with Ledger entries for owner +
menu function. One cliff, same menu family, no bundle. Movement +
REACH-OK re-measured below. Not a no-op.

## Verification

Rule #2: iteration-wide clean. Diff grep: only the commit message's
self-statement — no production trace logic.

Re-measure (this audit):
`hidden-proxy.mjs verify optfn_pickup_types,choose_classes_menu
--base 064fb35ea~1 --reach-all` →

- `verify optfn_pickup_types: 1 PASS … → PROGRESS` (Knight-94331: PASS)
  + REACH-OK (smoke 24/24)
- choose_classes_menu: vacuous (disclosed) + REACH-OK

Stronger than ship-time (88→135): D-3651 completes the chain to PASS on
current code. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
