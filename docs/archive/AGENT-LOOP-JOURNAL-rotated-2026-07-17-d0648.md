# Rotated journal crumbs (pre #720 / D-0648)

## 2026-07-17 14:02 — #706 D-0634 getobj_takeoff continue
- Objective: seed0367 @1946 (looked like dog_goal one fewer obj_resists).
- C locus: invent.c getobj missing-letter continue; do_wear.c dotakeoff.
- Change: getobj_takeoff loops on "don't have that object" (was abort →
  key desync / early garlic eat). Hypothesis "fobj shortfall" falsified.
- Verification: prefix **1946→1975**; Scr **75→155**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @1975 dochug rn2(40) vs rn2(5).

## 2026-07-17 13:53 — #705 public score 34/44
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence); seed0367 peel scouted only.
- Change: refreshed CURRENT Score — **34/44** PASS; Scr **6829**/11405;
  RNG **416960**/792838 (52.59%); speed `33+0.16/turn`. seed0361 in suite.
  Next peel: seed0367 @1946 dog_goal one fewer `obj_resists`.
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0367 dog_goal/fobj vs dogfood early-out; or seed0014/0108.
