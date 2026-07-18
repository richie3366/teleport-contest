# Rotated from AGENT-LOOP-JOURNAL.md (#761 / D-0684)

## 2026-07-18 17:35 — #746 D-0672 moveloop see_monsters Warning/ESP
- Objective: seed0367 @262 Warning/`W` vs warn-digit cell positions.
- C locus: `allmain.c` once-per-input `see_monsters` when
  Unblind_telepat/Warning (`!mv || Blind`).
- Change: `js/allmain.js` call `see_monsters()` after `find_ac`
  (D-0672). Stale gbuf floats were not refreshed on ordinary steps.
- Verification: Scr **308→312**/324 prefix **262→278**; green+strict;
  cohort **34**/34. RNG FULL.
- Next: @278 materialize map — C blank vs JS temple wall scraps.

