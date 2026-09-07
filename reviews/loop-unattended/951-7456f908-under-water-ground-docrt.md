# Review 951 — 7456f908 — display.c under_water/under_ground + docrt arms (D-1981)

- SHA: `7456f908` — "display.c under_water/under_ground engulfed-water/buried map arms + docrt routing (D-1981)."
- D-id: D-1981. JS: `js/display.js` (+104/−1). C locus: `nethack-c/upstream/src/display.c` `under_water` `:1394–1437`, `under_ground` `:1444–1467`, `docrt` `:1730–1736`; `youprop.h:279` `Underwater` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises both map arms plus docrt routing. Diff actually
adds: exported async `under_water(mode)` + `under_ground(mode)` with
module statics, two `docrt()` arms, one comment fix. Promise matches
deliverable.

## Inventory

- New: 2 functions, 3 statics, 2 call arms.
- Changed: one "Named omission: underwater/buried" comment retired.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

`under_water` walked against `:1394–1437` ✓: guard
`Is_waterlevel || uswallow` ✓; full (`mode==1 || dela` → cls,
clear) / delayed (`mode==2` → set, return) / limited arms in C
order ✓; limited loop y-outer/x-inner matching C ✓; repaint
x-outer/y-inner with pool/lava/ice gate ✓; Blind-off-hero blank
vs `newsym` ✓; `lastx/lasty` stored after repaint ✓. No RNG.
`under_ground` vs `:1444–1467` ✓ (swallow guard, three arms,
hero-cell-only limited paint). `Underwater ≡ (u.uinwater)`
verified at `youprop.h:279` ✓ — and the D-log honestly flags the
legacy `u.Underwater` reads elsewhere as unification territory.
docrt arms match `:1730–1736` incl. the buried `[not implemented]`
call-through ✓; JS `return` vs C `goto post_map` matches the
file's existing uswallow-arm shape, post_map stays named ✓.

Callee closure: `Is_waterlevel`/`u_at`/`newsym`/`cls` already
imported or same-module (no import hunk — verified); `hero_Blind`
is the pre-existing D-0716 clone (C-matched macro + mirrors),
`is_pool_or_lava_disp`/`is_ice_disp` pre-existing reuses — no new
clones, no STUBs. `show_glyph_cell(…, GLYPH_UNEXPLORED)` carries
the UNEXPLORED id per the show_memory_glyph precedent for C's
`show_glyph(x, y, GLYPH_UNEXPLORED)` ✓.

## Hallucinations / overclaim

None. No corpus claim; unwired callers named with file:line.

## Density

+104/−1, one tight C family in one module. Right-size per §2b.

## Verification

Honest vacuous note; green + strict + cohort 7/7 + full 44/44
(auto: shared file). Re-measured:
`verify under_water --base 7456f908~1` → "0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)". `--rulecheck`
clean (re-run). Added-line grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
