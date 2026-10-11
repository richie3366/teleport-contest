# Review 2694 — d412d1500 — menu-text flush gated on bot_disabled

Metadata: SHA `d412d1500`, D-3831, cliffs head `wintty.c`
process_menu_window writer (owner untouched — region heuristic).
JS: `js/pager.js` (+11/−1: gate + cites). Test:
`scripts/disclose-chestmenu-blank-status.test.mjs`.

## Intent vs deliverable

Promise: `show_nhw_menu_text`'s pre-paint grid-sync flush fired
bot() on the botlx pending from the disclose inventory
dismiss's docrt — a bot() C never performs on this path;
scope `set_bot_disabled(true)` around the flush. Claimed: 95316
→ PASS. Diff actually does: exactly that, try/finally
restored. Match.

## Inventory

- `show_nhw_menu_text` (js/pager.js:609) — changed: gate around
  the `:649` flush only; the `:711` post-dismiss flush
  untouched. C: `disclose :634–639` (read: display_inventory
  then container_contents, adjacent, no bot between);
  `container_contents :1593–1670` (csym): putstr-built menu +
  `display_nhwindow/destroy_nhwindow` at `:1657–1658` — NOT
  select_menu (the D-log's `:1663–1671` is ~6-line drift), so
  the windows.c `:1858–1863` select_menu wrap never applies;
  `tty_display_nhwindow NHW_MENU :1907–1946` (read: message-
  window clear + bare paint, no bot); `dmore :1154–1172`
  (read: no bot); `bot :255–256` (read: disabled → return,
  flags preserved).
- `set_bot_disabled` (js/display.js:6996) — pre-imported, pure
  flag set/restore returning prev; JS `bot()` early-returns on
  it with flags untouched — exactly C `:255–256`.
- No new helpers, imports, deletes, or re-points — nothing for
  `sym.mjs`.

## C ↔ JS fidelity

The C path performs no bot() between the inventory dismiss and
the chest capture — verified at every step (no select_menu on
the container path, no bot in the menu paint or the dmore
wait), and anchored empirically (C records 22 lines at 940,
status blank). The JS bug mechanism is confirmed on the live
tree: `flush_screen` fires `await bot()` whenever
`flags.botl || flags.botlx` (js/display.js), and end.js:807
drives the menu through the gated flush. The fix restores C
order: map/topline sync proceeds, bot() is skipped with flags
preserved, the pending botlx repaints at the next real bot()
(attributes yn — the regression test pins both the blank row
22 at 940 and the repaint at 941). Shared callers (prevmsg
menus, dungeon, files, getpos, insight) ride the same gate —
safe in the C direction (no menu-text display path calls bot;
flags still pending repaint next flush), bounded by full 44/44
+ the closing rescore. The falsified alternative (dropping
pickinv `keep_status`) was correctly rejected per D-0467. No
RNG; none added. Gap: none.

## Hallucinations / overclaim

None. History tag honored explicitly (D-3736/D-3750 named as
different arms), the region-heuristic call is evidenced
(identical toplines, blank C status rows), and the hook trace
(end.js → :649 → flush_screen → bot, suppressedWas=false)
proves the mechanism rather than asserting it.

## Density

Cliff-phase: head writer correct (menu-text display flush, not
a re-port of process_menu_window), direct follow-up of D-3830
on the same session. One gate, whole on its path. Ledger:
`tty_display_nhwindow partial`. Verify bullet: 1 PASS +
REACH-OK + green + strict + cohort + full public 44/44 (same
code state). Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify process_menu_window --base
d412d1500~1 --reach-all` → `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS` (95316 PASS), smoke 24/24 REACH-OK.
Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
