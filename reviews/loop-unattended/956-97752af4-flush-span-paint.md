# Review 956 — 97752af4 — flush_screen span-gated paint + pre-store gate (D-1986)

- SHA: `97752af4` — "display.c flush_screen span-gated grid paint + show_glyph pre-store dirty gate (D-1986)."
- D-id: D-1986. JS: `js/display.js` (+135/−69). C locus: `nethack-c/upstream/src/display.c` `flush_screen` `:2208–2267` (paint `:2241–2257`, reset `:2259`), `show_glyph` `:2031–2056` (fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the span-gated paint plus the pre-store gate. Diff
actually adds: per-row span paint with the gnew/framecolor gate,
pre-store old-field snapshot, message/status row arbitration,
`_overlay_resync` + row-0 wrap resync, doc updates. Promise matches
deliverable.

## Inventory

- Changed: `show_glyph_cell` gate, `_buildScreenOutput` grid block, `flush_screen` overlay set, `flush_screen_getpos_dirty` overlay set, doc comments.
- New: 2 module flags (`_overlay_resync`, `_prevMsgOwnsRow1`).
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Paint loop vs `:2241–2257` ✓ arm-for-arm: per-row
`gbuf_start..gbuf_stop`, empty skip, `gnew || (storedFrame !=
NO_COLOR && framecolor != NO_COLOR)` character-exact vs C's
`gnew || (map_frame_color != NO_COLOR && framecolor !=
NO_COLOR)`, `gnew = 0` only when painted (`:2255`), reset after
(`:2259`) ✓. Pre-store snapshot repairs the D-1985 dead arms
(that commit compared already-stored fields — always equal) ✓.
Unexplored-with-gnew paints blank per the S_air/D-0931 precedent.
`map_glyphinfo` re-derive at `:2250` stays named (tty transform
already at store time; background arm shut on tty) ✓.

JS-only adaptations, documented as such: overlay resync (repaints
from live gbuf state, not a snapshot copy — not D-1831-shaped),
row-0 wrap arbitration, message/status rows painted because the
JS grid is one surface where C has separate windows. Column-0
handling unchanged (resync `s = 1` mirrors C's own clear). No RNG,
no banned tokens (grep 0 hits).

Callee closure: same-module only. No STUBs, no clones.

## Hallucinations / overclaim

None — notable honesty: the mid-iteration seed0383 hallucination
regression (6 stale cells, RNG tied) is disclosed with cause
(stale-span CONFIRMED, print-time substitution REFUTED) and the
re-run.

## Density

+135/−69, one C mechanism in one module, one hypothesis fixed
once and re-run once. At the §2b ceiling but coherent.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + final full
44/44 after the in-commit fix. Re-measured:
`verify flush_screen --base 97752af4~1` → "0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)".
`--rulecheck` clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
