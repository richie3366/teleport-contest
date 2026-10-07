# Review 2471 — bd6e6e647 — choose_classes_menu bot_disabled wrap (D-3589)

**Metadata.** SHA `bd6e6e647` (2026-10-07, D-3589). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline1` (parked
MISATTRIBUTED). `js/` insertions: 11 (`js/options.js` +11/−1) +
committed test.

## Intent vs deliverable

Promise: Tourist-94111 step 23 painted committed status rows 22–23
inside the "Autopickup what?" corner submenu because the hand-rolled
`:1737` select loop ran without the `gb.bot_disabled` wrap that C's
`select_menu` puts around every `win_select_menu`; wrapping the loop
in `set_bot_disabled(true)`/restore moves the probe 23→32.

Diff actually adds: the try/finally wrap around the whole `for(;;)`
plus a 6-line C-cite comment. Promise matches diff. No symbols
deleted or re-pointed (`set_bot_disabled` already imported at
options.js:188).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | choose_classes_menu `:1737` select wrap | ported (arm added to whole body) | [options.js](/home/debian/dev/teleport-contest/js/options.js:5624) | windows.c:1643–1761, select_menu :1855–1865 |

Helpers: none added. `set_bot_disabled` is a live import
(`sym.mjs`: `set_bot_disabled js/display.js:6737 sync`), returns prev
(display.js:6737–6743, read) — the save/restore shape matches C
`:1859–1863`. No clone→import re-point, so no re-point output is
required.

## C ↔ JS fidelity

**Wrap placement matches C call-for-call.** C `choose_classes_menu`
(windows.c:1643–1761 via `csym.mjs`, range cited from its output)
calls `select_menu` at :1737; `select_menu` (:1855–1865, read) saves
`old_bot_disabled`, sets TRUE, calls `win_select_menu`, restores.
The tty port's `tty_select_menu` (win/tty/wintty.c:2791–2794, read)
does `tty_display_nhwindow` + `tty_dismiss_nhwindow` **inside** that
call — so JS running paint + dismiss inside the try is exactly C's
tty behavior, and `destroy_nhwindow` (:1738, free-only per
tty_destroy_nhwindow :2009–2031) needs no wrap ✓. All four JS
returns (ESC :5703, confirm :5707, PICK_ONE :5718, All-classes :5722)
run dismiss inside the try; toggles re-paint inside it; `finally`
restores — every C `:1737` path covered, no RNG in either version ✓.
Sole C caller options.c:3360 ⟺ JS handler_pickup_types :5819,
pre-existing ✓.

Nit (pre-existing, not this SHA): the loop's comments cite
`:1744/:1745/:1746` for end_menu/select/destroy where C has
:1736/:1737/:1738 — cite drift in older lines, untouched here.

## Hallucinations / overclaim

None. The D-log correctly says the owner painter is untouched and
names the writer mechanism; the "0 blocked" note for
choose_classes_menu is stated, not hidden.

## Density

Cliff §10.18: cliffs-head writer, one arm completing an
already-whole body, own `Ledger:` touch (D-append on the ported row).
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: only the commit-message "No DIAG/FORCE" line —
  code clean.
- Rule #2: `imports.mjs --rulecheck` clean this iteration (all
  scored `js/`).
- Committed test `choose-classes-bot-disabled.test.mjs`: 1/1 PASS
  now (0/1 pre-fix claimed in-ship, plausible: row 22/23 + cursor
  pins fail without the wrap).
- Re-measure (mine): `verify
  do_statusline1,choose_classes_menu --base bd6e6e647~1 --reach-all`
  → do_statusline1 **0 PASS, 1 moved past, 0 unchanged, 0 worse**
  (Tourist-94111 → handler_paranoid_confirmation@185, was 23 —
  the D-log's 23→32 plus the later D-3590/D-3592 chain) + smoke
  24/24 REACH-OK; choose_classes_menu vacuous (0 blocked) + smoke
  REACH-OK. No REGRESSED session.
- Scoreboard delta in-ship shows exactly 23→32 with the owner flip
  to status_hilite_menu_choose_behavior; full 44/44 claimed
  in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
