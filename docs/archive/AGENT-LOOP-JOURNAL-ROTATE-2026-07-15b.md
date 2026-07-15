# Rotated journal entries

## 2026-07-14 23:45 — #356 D-0328 savebones clear map memory

- Objective: seed0030 @1821 blank C map vs JS walls after bones descend.
- C locus: `bones.c` `savebones` glyph clear; `display.c` `docrt_flags`
  `vision_recalc(2)`.
- Change: clear seenv/waslit/remembered/disp on bones write+load; `docrt`
  vision shutoff + memory + recalc (D-0328).
- Verification: @1821 match; Scr **1821→1831**; first miss **@1830**
  `Elara's ghost`; RNG full; green+strict; 19 PASS cohort.
- Next: @1830 bones ghost monnam `"s ghost"`.

