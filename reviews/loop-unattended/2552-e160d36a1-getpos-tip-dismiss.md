# Review 2552 — e160d36a1 — getpos tip fullscreen dismiss (D-3677)

- SHA: `e160d36a1e4098258173fbbd1ff76e5e6480ebfe`
- Subject: wintty.c erase_menu_or_text fullscreen arm: getpos-tip dismiss skipped docrt, reveal map stayed instead of level repaint (Archeologist-94231 36→151) (D-3677)
- D-entry: D-3677. Type: cliff (writer port, 1 function).
- Diff size: `js/getpos.js` +34/−~12 (branch + comment); + test; ledger `wintty.c` D-tag.

## Intent vs deliverable

Promise: branch the getpos-tip teardown on the recorded paint
geom — missing geom or offx==0 → null the geom + `await docrt()`
before the kept flush (C `:976–979` fullscreen arm); corner keeps
the proven gbuf-resync cadence byte-identical; 36→151.

Diff actually does: exactly that branch in `show_getpos_tip` +
comment rewrite. Nothing else in `js/`.

## Inventory

| JS function | Change | C locus |
|---|---|---|
| `show_getpos_tip` (`js/getpos.js:1331–1351`) | + fullscreen docrt branch | `nhlua.c:846–848`, `wintty.c:966–985`, `:1953`, `:2020` |

No symbols deleted or re-pointed. `docrt` import pre-existing
(`:23`). No new module edges.

## C ↔ JS fidelity

Dismiss chain verified call-for-call against pinned C:

- `nhlua.c:846–848`: `end_menu(tmpwin, 0);`
  `select_menu(tmpwin, PICK_NONE, &picks);`
  `destroy_nhwindow(tmpwin);` ✓
- `tty_dismiss_nhwindow` MENU arm: `clearscreen = FALSE` (set TRUE
  only `if (program_state.in_role_selection)`) →
  `erase_menu_or_text(window, cw, clearscreen)` ✓
- `erase_menu_or_text` (`wintty.c:966–985`):
  `if (cw->offx == 0) { … else { docrt(); flush_screen(1); } }`
  (`:976–979`) `else { docorner(offx, maxrow+1, 0); }`
  (`:981–982`) ✓ — the fullscreen/corner fork is exactly the JS
  branch.
- Sub-arm check: `cw->offy` is 0 for NHW_MENU (`:1920`), and the
  tip never fires during chargen (`clear` FALSE) — so
  docrt+flush is C's whole fullscreen arm here. No gap.

JS-side consistency:

- The tip paints through `paint_corner_nhw_menu`, which branches
  on `nhw_menu_geometry` (D-3676 iflags home) and records
  `game._tty_menu_geom` on both arms (`{offx: 0}` fullscreen at
  `js/invent.js:3085`, `{offx,…}` corner at `:3128`). Paint and
  dismiss read the same geom — no mismatch.
- Missing-geom → docrt matches the cited precedent
  (`select_menu_pick_none`, `invent.js:3345`: `if (geom && offx
  !== 0) dismiss-corner else {docrt+flush}`) and is the safe
  default (nothing recorded → full repaint).
- Corner path is byte-identical (kept flush, `_overlay_resync`
  cadence, Caveman-94195 s66 guard). No PICK_NONE
  `clear_committed_status` — D-1879 cadence kept.
- Named (1) (corner flush-resync vs C docorner+no-flush):
  pre-existing pixel-proven cadence, untouched. Named (2)/(3)
  (MESSAGE/STATUS/BASE/MAP arms, chargen clearscreen): C comments
  confirm the characterization (game-exit/suspend only;
  `:1990–1992` role-selection gate). True omits.

## Hallucinations / overclaim

None. No dispatch-vs-callee gap. No FORCE/DIAG/seed reads. Rule
#2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: cliffs-head writer (the tip teardown), whole arm,
code + ledger + verify in one handoff. Right-sized. Sampled
verdict: `show_getpos_tip` — faithful.

## Verification

D-log claim: `verify getpos: 0 PASS, 1 moved` (36→paniclog@151)
+ REACH-OK both + family rescore 0 regressed + forced 44/44; plus
"Valkyrie-94151 → PASS is D-3676's latent movement (stale board
row: passes with this fix stashed too)".

Committed board diff at this SHA confirms the SHA-specific
movement: exactly 2 row changes (36→151 getpos→paniclog;
Valkyrie 118→PASS), 0 reversals. The latent-movement sub-claim
was re-proven by this audit: with `js/` reverted to the exact
D-3676 tree (D-3677 + D-3678 hunks reverse-applied),
`score --ids scen-options-Valkyrie-94151` still records PASS
(tree restored after; `git status` clean). Audit re-measure on
HEAD code (`verify getpos,tty_dismiss_nhwindow --base
e160d36a1~1 --reach-all`): 94231 → PASS (D-3678 moved it
further), 0 worse, REACH-OK both; tty_dismiss vacuous as
D-logged. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
