# Rotated from AGENT-LOOP-JOURNAL.md (#433 / D-0406)

## 2026-07-15 14:08 — #418 stop_occupation counted Ns (D-0392)
- Objective: seed0012 @226 C `You stop searching.` vs JS blank.
- C locus: allmain.c stop_occupation + occupation monster_nearby;
  monmove.c dochugw; cmd.c set_occupation(dosearch,"searching").
- Change: ported stop_occupation; timed set_occupation for counted `s`;
  dochugw + occupation-path interrupt (was deferred / `_repeat_search`).
- Verification: seed0012 Scr **259→268**/308; @226–234 match; first fail
  @237 materialize `--More--`; green+strict PASS; cohort 22/22 PASS.
- Next: seed0012 @237 teleport/materialize pline.
