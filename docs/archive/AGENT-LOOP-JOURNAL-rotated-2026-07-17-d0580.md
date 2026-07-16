## 2026-07-16 22:40 — D-0569 Fire lit + monster lights
- Objective: seed0373 @100 Fire vision (CURRENT primary).
- C locus: sp_lev.c set_levltyp_lit; light.c do_light_sources; makemon emits_light.
- Change: load_fire SpLev_Map lit epilogue; js/light.js + vision TEMP_LIT;
  makemon/goto_level hooks. Global sel_set_ter force-unlit falsified (seed0009).
- Verification: seed0373 Scr 101→110 RNG full; green+strict PASS; cohort 28/28.
- Next: @101 Wizard Monnam capitalization; or seed5006 dosounds @8468.

