# Review 955 — d1e71302 — flush_screen conditional dirty mark + reset move (D-1985)

- SHA: `d1e71302` — "display.c flush_screen dirty-span loop: conditional mark + unconditional reset (D-1985)."
- D-id: D-1985. JS: `js/display.js` (+28/−12). C locus: `nethack-c/upstream/src/display.c` `show_glyph` change gate `:2031–2056`, `flush_screen` `:2259` (both fetched this review; D-1984 review covered `:1867–1870`/`:2139–2140`).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the conditional mark plus the unconditional reset.
Diff actually adds: glyph-id-first resolution + change-gated
`gnew`/span mark in `show_glyph_cell`, `reset_glyph_bbox()` moved
after the grid block. Promise matches deliverable.

## Inventory

- Changed: 1 function body, 1 reset call site.
- No new/deleted functions, so no `sym.mjs` audit owed.

## C ↔ JS fidelity

Change gate vs `:2031–2056` ✓ in shape: C stores + marks only
when buffered glyphinfo differs; JS now resolves the id first
(altar/fountain share `{`, so id-in-test is C-faithful) and gates
`gnew` + span on id/ch/color/dec/attr difference. Coverage note:
C's test also names customcolor/glyphflags/tileidx/use_background;
JS tests the tty-stored fields (background arm shut on tty,
tiles unsupported — both named). Any under-marking is inert here:
paint still rebuilds all, and D-1986 reworks the snapshot. The
unconditional store preserves the D-1767 "always stamp" rows ✓.
Reset move matches `:2259` (after the paint loop, unconditioned
on consumers) ✓. The `disp_glyph` now-carries-real-ids change is
green-covered (full 44/44 + strict in-commit). No RNG.

Callee closure: same-module only; the D-log's gated-paths claim
(bones leave-level, getpos-dirty) holds because real changes
still set `gnew` — identical rewrites skipping paint is correct.
No STUBs, no clones.

## Hallucinations / overclaim

None. "Safe by construction" is argued from paint-all, which is
true at this commit; remaining span work named for the next row.

## Density

+28/−12, one C gate in one function. Small but it is a staged
slice of the flush_screen envelope whose paint row ships next —
acceptable per §2b (one falsifier, one locus family).

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44
(auto: shared file). Re-measured:
`verify flush_screen --base d1e71302~1` → "0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)".
`--rulecheck` clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
