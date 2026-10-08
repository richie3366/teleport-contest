# Review 2540 — 0b3e7bafd — docallcmd_menu dismiss instead of docrt

Metadata: SHA `0b3e7bafdbe36f279da5deb7196b9c3486039181`, D-3663,
cliff-head `do_mgivenname` (region heuristic) via writer
`docallcmd_menu`. js diff +11/−4 in `js/do_name.js` (one call swap +
import swap); test file extended (2nd `it`).

## Intent vs deliverable

Promise: 94001 @238 showed C `│·^v·│` vs JS `│·^'·│` (Hallu mon glyph
re-rolled): `docallcmd_menu` ran a full `docrt()` after every menu key,
but C goes select_menu → destroy → prompt with no recompute. Swap the
spurious `docrt()` for `dismiss_nhw_menu()` (destroy analogue), keep the
flush blit. Diff does exactly that; nothing bundled.

## Inventory

- `docallcmd_menu` (`js/do_name.js:1558`): `game._menu_overlay=false` +
  `await docrt()` → cite comment + `await dismiss_nhw_menu()`;
  `flush_screen(1)` kept. C: `docallcmd`, `do_name.c:498–601` (per
  `csym.mjs`).
- Import swap (`:28–42`): `docrt` out, `dismiss_nhw_menu` in. `sym.mjs
  dismiss_nhw_menu`: live async export `js/invent.js:3139` ✓. `docrt`
  now appears in `do_name.js` only in comments ✓. `imports.mjs --can`:
  do_name→invent edge pre-exists, no new edge ✓.

## C ↔ JS fidelity

- C `:551→:556` (direct read): `destroy_nhwindow(win)` then straight
  into the `switch (ch)` arms — no docrt/cls/newsym between menu and
  prompt ✓. The deleted `docrt()` had no C counterpart ✓.
- C destroy path: `tty_destroy_nhwindow :1999` →
  `erase_menu_or_text(clearscreen=FALSE)` (direct read) — reprint
  stored gbuf, no recompute ✓. JS `dismiss_nhw_menu` corner arm
  (`:3169–3172`) is exactly that call; fullscreen arm retains docrt
  (C clearscreen=TRUE) ✓; it also sets `_menu_overlay=false` (`:3141`),
  covering the deleted line ✓.
- Callee closure: `paint_corner_nhw_menu`, `nhgetch`, `flush_screen`
  all live; the loop shape is pre-existing and untouched.
- RNG: corner dismiss draws nothing; matches recorded-C grids
  byte-identical across menu display/dismiss (D-log measurement) and
  RNG flat 8682/8682 ✓.

## Hallucinations / overclaim

Count inflation, not movement fabrication. The D-log Verify bullet says
`verify do_mgivenname: 2 PASS` (94001 + "explore-seed4500-knight-coverage
do_mgivenname-owner session"). The committed parent board (`0b3e7bafd~1`,
checked directly) has exactly one session blocked on do_mgivenname
(94001); all 12 seed4500 corpus sessions were already PASS there, and
the committed D-3663 board diff flips exactly one row (94001 → PASS).
The "2" came from the iteration's own dirtied working board: the Fix
bullet admits a bare-deletion experiment regressed a seed4500 session
@685 mid-iteration, which marked it blocked in the working board; the
final verify then re-passed it. Substance holds (that path genuinely
passes with the shipped fix — no REGRESSED anywhere), but the count is
not reproducible from the committed baseline: mine prints `1 PASS`.

## Density

Cliff-phase §2b: one cliff, writer correctly chosen (menu teardown, not
the prompt owner), whole-arm swap with the C destroy path wired,
Ledger `docallcmd ported` updated. Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Re-measure on the SHA's own code (scratch worktree):
  `verify do_mgivenname,docallcmd --base 0b3e7bafd~1 --reach-all` →
  `1 PASS (94001), 0 worse → PROGRESS` + smoke 24/24 REACH-OK;
  docallcmd vacuous-note + smoke 24/24 REACH-OK. Core movement
  reproduced; no REGRESSED.
- Focused file: `node --test` 2/2 green (ran this iteration).
- Hygiene note for the next port iter (not a C-wrong): re-running the
  final `verify` from a clean `git stash`-free board, or naming the
  mid-iteration regression in the bullet, would have kept the count
  reproducible. No queue row: the committed board is correct.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
