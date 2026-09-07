# Review 957 — 03b0ab93 — getpos.c HiliteBackground + frame store (D-1987)

- SHA: `03b0ab93` — "getpos.c map_frame_color store + HiliteBackground wiring (D-1987)."
- D-id: D-1987. JS: `js/getpos.js`, `js/display.js` (+60/−25). C locus: `nethack-c/upstream/src/getpos.c` `getpos_sethilite` `:40–64`, `getpos_refresh` `:753–765`, `getpos_toggle_hilite_state` `:72–91` (cited); sethilite + refresh bodies fetched this review.
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the frame-color store plus Background wiring. Diff
actually adds: `HiliteBackground` + `defaultHiliteState`, C-ordered
sethilite/refresh/toggle, store write, three display.js comment
retirements. Promise matches deliverable.

## Inventory

- New: 1 constant, 1 module state, 2 import names, store-init lines.
- Changed: 3 function bodies, 3 doc comments.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

`getpos_sethilite` vs `:40–64` ✓ statement-for-statement: old
frame read, default recompute (`bgcolors ? Background :
Normal`), reset-on-getvalid-change, callback install, store
write (`Background ? HI_ZAP : NO_COLOR`), force condition (getvalid
OR color changed) ✓. `getpos_refresh` vs `:753–765` ✓ verbatim
modulo the pre-existing flush_screen(1)-for-docrt_flags
adaptation. `HI_ZAP = CLR_BRIGHT_BLUE` both sides (color.h:55,
const.js:2666) ✓. Lazy `game.gw.wsettings` init stands in for
C's always-present struct — equivalent ✓. `wdmode` unset named
(tiled mode unsupported) ✓.

Callee closure: `HI_ZAP` extends the existing const.js edge;
`NO_COLOR` from terminal.js is `--can` ALREADY — both verified
this review, no new cycle surface. The selvar union loop is the
pre-existing established clone (named), not new. No STUBs.

## Hallucinations / overclaim

None. Behavior-inert under defaults honestly stated and
structurally true (bgcolors unset → Normal → NO_COLOR, as C
pre-getpos).

## Density

+60/−25 across two already-coupled modules, one C family.
Right-size per §2b.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44
(auto: shared file). Re-measured:
`verify getpos_sethilite --base 03b0ab93~1` → "0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)".
`--rulecheck` clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
