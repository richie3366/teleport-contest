# Rotated from AGENT-LOOP-JOURNAL.md

## 2026-07-15 04:45 — D-0356 describe_decor broken door
- Objective: seed0009 @41 “There is a broken door here.” vs blank.
- C locus: `pickup.c` `describe_decor` + `pickup` `!OBJ_AT` mention_decor.
- Change: port `describe_decor`; wire pickup early path + check_here
  LOOKHERE_SKIP_DFEATURE (D-0356). Not bare `look_here` when ct==0.
- Verification: Scr **48→49**/73; @41 match; first miss @45 pool-avoid;
  RNG **3649**; green+strict; cohort 21 PASS.
- Next: @45 “You avoid stepping into the pool of water.--More--”.

## 2026-07-15 04:40 — D-0355 pool/lava/ice DEC glyphs
- Objective: seed0009 @40 terrain `?` vs C DEC pool/lava diamond.
- C locus: `display.c` `back_to_glyph` + `defsym.h` / DECgraphics S_pool.
- Change: `terrain_glyph` POOL/MOAT/WATER/lava/ice; scoring grid keeps
  raw DEC `` ` `` (not Unicode ◆) like altar `{` (D-0355).
- Verification: Scr **40→48**/73; first miss @41 “broken door”; RNG
  **3649**; green+strict; cohort 21 PASS. Score not remeasured (#376).
- Next: `look_here`/`dfeature_at` D_BROKEN “There is a broken door here.”
