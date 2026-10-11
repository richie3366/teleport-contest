# Review 2680 — 67d359f56 — doattributes NEED_MORE flush + Hate_silver arm

Metadata: SHA `67d359f56`, D-3816, cliff row-2 `hack.c` maybe_wail
writer (@0b7322b84). JS: `js/invent.js` (one flush call + one arm,
no new imports). Test: `scripts/doattributes-menu-flush.test.mjs`.

## Intent vs deliverable

Promise: doattributes' inline menu painter painted straight over a
queued topline --More-- (covering the low-HP wail) and lacked the
Hate_silver arm; now flushes before paint and inserts the arm in C
order. Claimed: 95306 876→1227 (moved past). Diff actually does:
`await flush_topl_more()` after geometry + 7-line arm between
Unchanging-poly and Fast. Match.

## Inventory

- `doattributes` (js/invent.js:8493) — changed: flush call + arm.
  C `insight.c:1894–1895` (verified) + `wintty.c:1921–1922`
  (verified) + `youprop.h:401` macro (verified).
- Callees: `flush_topl_more` (display.js:8546 ASYNC, awaited;
  invent.js:52 pre-existing import), `hates_silver`
  (monsters.js:864; invent.js:347 pre-existing import), `ismnum`
  (const.js:3248). No new helpers, no deletes, no re-points, no
  new edges.

## C ↔ JS fidelity

C `insight.c:1891–1897` (verified by direct read): Unchanging →
`if (Hate_silver) you_are("harmed by silver", "")` → Fast — JS
arm sits exactly there with the doattributes `o(...)` line shape
and empty from_what. Predicate `ismnum(ulycn) ||
hates_silver(youmonst.data)` is the `:7392–7397` final-builder
shape verbatim (verified textually) and matches C
`u.ulycn >= LOW_PM || hates_silver(...)` (ulycn is NON_PM or a
valid mnum, so ismnum ≡ the C comparison). C
`win/tty/wintty.c:1921–1922` (verified by line count): `if
(toplin == TOPLINE_NEED_MORE) tty_display_nhwindow(WIN_MESSAGE,
TRUE)` before menu paint — the flush call matches, placed after
geometry like the sibling painters (:3040/:3271, verified
present). No RNG; none added. Gap: none. Arm-by-arm confirm.

## Hallucinations / overclaim

None. Chain measured: wail queued (drain live at artifact.js:1615,
no wail text on 891 JS screens yet match through 875), painter
covered it, later screens shifted one step early 877–880,
reconverging 882. `show_nhw_menu_text` flush left honestly
unaudited (no reaching block).

## Density

Cliff-phase: writer correct (menu painter, not the wail owner).
Ledger: doattributes/maybe_wail arms. Verify bullet: moved-past +
REACH-OK + green + strict + cohort + full 44/44. Movement is
board-recorded, not just claimed: committed scoreboard rows show
95306 at maybe_wail/876 pre-commit → do_statusline2/1227
post-commit (checked both boards). Named: standing doattributes
split omissions. Not unreached: strictly later step/owner.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify maybe_wail --base 67d359f56~1
--reach-all` → `1 PASS ... → PROGRESS` (95306 PASS) and `smoke
24/24 → REACH-OK`. PASS rather than the D-log's 1227 because the
re-run executes on current HEAD, where D-3817 later completed the
session — the D-log's 876→1227 is confirmed by the committed
boards above, and the session is now strictly further with zero
regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
