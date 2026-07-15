# Rotated journal crumbs (#450 / D-0419)

## 2026-07-15 16:39 — #436 seed0004 @10563 getpos `>` travel (D-0408)
- Objective: seed0004 @10563 PRIMARY — C `gethungry`/`hitum` vs JS
  `distfleeck` after post-teleport travel.
- C locus: `getpos.c` dungeon-feature scan for `>`/`<` stairs glyphs.
- Change: `getpos.js` two-pass `find_dungeon_feature` for STAIRS/LADDER
  so travel `_>` targets downstairs (was “already here” on hero tile).
- Verification: seed0004 RNG 10569→10685; prefix 10563→10657; miss
  @10657 `eatcorpse`; green+strict PASS; cohort 23/23.
- Next: seed0004 @10657 eatcorpse rn2(10) vs distfleeck.

## 2026-07-15 16:30 — #435 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: remasured suite post D-0405…D-0407 — still **25/44** PASS;
  screens 4187→**4196**/11405; RNG 260949→**261626**/792838;
  speed `22+0.13/turn`. Green+strict PASS.
- Verification: `node frozen/ps_test_runner.mjs sessions`; seed0004
  focused still FAIL @10563 (C gethungry/hitum vs JS distfleeck).
- Next: seed0004 @10563 travel-end / walk-into-monster path.

