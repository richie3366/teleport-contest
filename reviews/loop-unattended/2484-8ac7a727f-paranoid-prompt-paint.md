# Review 2484 — 8ac7a727f — paranoid prompt paint (D-3603)

**Metadata.** SHA `8ac7a727f` (2026-10-07, D-3603). Type: **cliff**:
owner fix for the cliffs head `options.c
handler_paranoid_confirmation` (3 corpus blocks; the handler
body was whole since D-2765 — the gap is the tty_end_menu
prompt rendering). `js/` insertions: 8 (`js/options.js` +8/−2)
+ new test.

## Intent vs deliverable

Promise: paint the end_menu prompt inverse (menu_headings
default) with the blank separator row C's tty_end_menu
prepends; 1 PASS + 2 moved past.

Diff actually adds: the attr on the prompt row + the blank row.
Promise matches diff. No symbols deleted or re-pointed; no
import change (`ATR_INVERSE` already imported).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | handler_paranoid_confirmation prompt rows | ported | [options.js](/home/debian/dev/teleport-contest/js/options.js:2088) | options.c:5952–6008 (:5992) + win/tty/wintty.c:2680–2690 |

Helpers: none (per-entry attr already carried by the painter;
`select_menu_pick_any` skips non-selectable rows as C does).

## C ↔ JS fidelity

**C order confirmed.** `tty_end_menu` (wintty.c:2680–2690,
read): non-null prompt → `tty_add_menu("")` then
`tty_add_menu(prompt, tty_menu_promptstyle)`. `tty_add_menu`
prepends (`item->next = cw->mlist`, :2586–2587, read), and the
list was reversed to display order just before (:2678) — so
final paint order is prompt row 0, blank row 1, items from row
2 ✓. Style chain: `adjust_menu_promptstyle(…,
&iflags.menu_headings)` (windows.c:1769–1773 + call sites
allmain.c:728 / options.c:5790,9004, all read) with the D-log's
options.c:7188 default ATR_INVERSE ✓. C handler
options.c:5952–6008 (csym, read in full): BONES-wizard skip,
swim 'm'-substitution, PICK_ANY reset loop — JS mirrors every
arm including the `while (--i >= 0)` OR-accumulation (reverse
`for`, js/options.js:2137–2138, read) ✓.

**JS matches.** `raw = [prompt(INVERSE), blank, …items]` —
same order, same attr, same non-selectability ✓. The shape is
the in-file sibling precedent (3 other `{ text: '',
selectable: false } // C wintty.c blank item` sites in
options.js:2045/:2362/…) ✓, and the measured divergence (row 0
col 14 attr 1-vs-0, items one row high) is exactly what this
shape fixes.

## Hallucinations / overclaim

None. The D-log correctly demotes the stale D-2762 plain-header
precedent by name instead of silently contradicting it.

## Density

Cliff §10.18: parent queue head is
handler_paranoid_confirmation (3 blocks — re-read from
`8ac7a727f~1:docs/LOOP-QUEUE.md`) ✓. One cliff, own `Ledger:`
touch (D-3603 on the handler), all 3 probes move. Per-function
verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (2 menu rows + cites).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `paranoid-confirm-prompt.test.mjs`: PASS now.
- Re-measure (mine): `verify handler_paranoid_confirmation
  --base 8ac7a727f~1 --reach-all` → **1 PASS, 2 moved past, 0
  unchanged, 0 worse** (Tourist-94111 PASS, Barbarian-94251 →
  cond_menu@110, Valkyrie-94311 → mlevel_tele_trap@92 on the
  working tree — D-3604 moved it past the D-log's @43 landing;
  cumulative, same direction) + smoke 24/24 REACH-OK. No
  REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
