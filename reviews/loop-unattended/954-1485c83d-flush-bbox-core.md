# Review 954 — 1485c83d — display.c flush_screen glyph-bbox core (D-1984)

- SHA: `1485c83d` — "D-1984 display.c flush_screen glyph-bounding-box core (resume iter 2425)".
- D-id: D-1984. JS: `js/display.js` (+70/−2). C locus: `nethack-c/upstream/src/display.c` `reset_glyph_bbox` `:2078–2086`, `newsym_force` `:1863–1871`, `show_glyph` `:2031–2056`, `clear_glyph_buffer` `:2130–2150`, `flush_screen` `:2255–2259` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the tracked-bbox core with the span-gated paint
deferred. Diff actually adds: `gbuf_start/stop` spans,
`reset_glyph_bbox`, `mark_gbuf_dirty`, writer marks
(show_glyph_cell, newsym_force, swallowed blanks, clear), plus the
post-rebuild reset; paint stays clear+repaint-all. Promise matches
deliverable.

## Inventory

- New: 2 module arrays, 1 exported + 1 local function, 4 writer marks.
- Changed: `clear_glyph_buffer` gnew 0→1, one comment.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Citations verified against the C text: reset macro ✓ exact
(`COLNO−1`/`0`); `newsym_force` ✓ (gnew=1 + span expand, same
order); clear ✓ exact (`start = 1`, `stop = COLNO−1` — column 0
excluded in C too); `:2259` reset-after-paint ✓. `nul_gbuf.gnew`
kept 1 where C derives 0-or-1 — named for the next row ✓.
Staging note: C's show_glyph span-expand sits inside the
`:2031–2056` change gate; this commit marks unconditionally.
Over-marking is the safe direction (paints extra, never stale),
behavior-inert while paint-all holds, and D-1985 gates it — so a
staged approximation, not a C-wrong. The swallowed/clear gnew=1
marks are likewise inert under paint-all (cleared on paint, spans
reset after). No RNG.

Callee closure: all same-module, no new imports, no STUBs, no
clones.

## Hallucinations / overclaim

None. The message is explicit that the incremental paint stays
queued and that the reverted leftover had regressed 8/44.

## Density

+70/−2, one C mechanism in one module. Right-size per §2b.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44.
Re-measured: `verify flush_screen --base 1485c83d~1` → "0
session(s) blocked (0 at baseline, 0 in the working
scoreboard)". `--rulecheck` clean (re-run). Added-line grep: no
banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
