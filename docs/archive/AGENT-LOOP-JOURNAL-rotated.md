## 2026-07-15 17:30 — #440 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: remasured suite post D-0408…D-0411 — still **25/44** PASS;
  screens **4196**/11405 (unchanged); RNG 261626→**262087**/792838;
  speed `21+0.13/turn` (R² 0.82). Green+strict PASS.
- Verification: `node frozen/ps_test_runner.mjs sessions`; seed0004
  still FAIL @10966 (RNG 11029/12084, Scr 242/409); seed0002 RNG 5199.
- Next: seed0004 @10966 after_calc<12 (weight/leftover+SLT|EXT).

## 2026-07-15 17:15 — #439 seed0004 @10966 youmonst/moveloop (D-0411)
- Objective: seed0004 @10966 PRIMARY — C `distfleeck` vs JS `dopush`
  exercise; umovement after_calc.
- C locus: `u_init.c` umonnum/set_uasmon basic; `allmain.c` encumber_msg
  + mvl_wtcap after monsters.
- Change: basic `youmonst.data`; moveloop order. Experiments: need
  after_calc<12 (leftover0+SLT or leftover9+EXT); inv=-15 barely under.
- Verification: seed0004 still @10966; green+strict PASS; cohort 23/23.
- Next: ≥16 aum weight/cap gap or heal leftover desync + SLT.

## 2026-07-15 17:00 — #438 seed0004 @10713 gethungry (D-0410)
- Objective: seed0004 @10713 PRIMARY — C `exercise` `rn2(19)` vs JS
  `rn2(2)` after lichen eat EOT.
- C locus: `eat.c` `gethungry` metabolic `uhunger--` + accessorytime
  odd/even Regen/encumb/Hunger/Conflict.
- Change: `eat.js` `gethungry` diet via `hero_form_data`; accessory
  burns; `monsters.js` `metallivorous`. Ring/amulet + `newuhs` deferred.
- Verification: seed0004 RNG 11027→11029; prefix 10713→10966; miss
  @10966 C `distfleeck` vs JS `dopush` exercise (umove=21); green+strict
  PASS; cohort 25/25.
- Next: seed0004 @10966 umovement / encumbrance drift.

## 2026-07-14 18:12 — D-0286/87 mswings + botl HP clamp

- Objective: seed0030 Scr 103/1953 (CURRENT primary); first miss @62.
- C locus: `mhitu.c` `mswings`/`mswings_verb`/`hitval`; `botl.c` hp<0→0.
- Change: AT_WEAP melee calls `hitval` + `mswings` before hit/miss
  (D-0286); status line clamps negative HP for display (D-0287).
- Verification: Scr@62 topline+HP match; prefix miss **62→75**;
  Scr **103→116**; RNG full; green+strict PASS; 17-session PASS cohort.
- Next: Scr@75 death `--More--` vs invent-identify yn; or seed0013.

