## 2026-07-16 22:55 — D-0572 pluslvl uexp + endgame ^X Background
- Objective: seed0373 @118 enlightenment Background (CURRENT primary).
- C locus: insight.c background_enlightenment In_endgame/moves==1/
  wizard xp delta; dungeon.c endgamelevelname; exper.c pluslvl uexp.
- Change: js/exper.js pluslvl sets uexp; js/invent.js
  background_dungeon_clause + adventure/wizard xp; export
  endgamelevelname from display.js.
- Verification: seed0373 Scr 122→123 RNG full; @118 match; green+
  strict; cohort 28/28 PASS.
- Next: @119 Attributes (wizard MAGICENLIGHTENMENT); or seed5006
  dosounds @8468.
## 2026-07-16 20:49 — D-0571 air_pos S_cloud glyph
- Objective: seed0373 @110 Air gravity map clouds (CURRENT primary).
- C locus: mkmaze.c movebubbles air_pos / setup_waterlevel S_air;
  display.c back_to_glyph AIR/CLOUD; docrt lev->glyph.
- Change: js/mklev.js air_pos remembered_glyph + setup memory;
  js/display.js terrain_glyph AIR/CLOUD.
- Verification: seed0373 Scr 111→122 RNG full; @110 match; green+
  strict; cohort 28/28 PASS.
- Next: @118 enlightenment Background; or seed5006 dosounds @8468.
