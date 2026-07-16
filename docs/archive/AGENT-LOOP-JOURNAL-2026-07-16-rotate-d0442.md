# Rotated journal crumbs

## 2026-07-16 01:08 — #460 score + seed0002 @4565 diagnose (D-0429)
- Objective: mandatory full score (#460÷5) + primary seed0002 @4565.
- C locus: `dogmove.c` `dog_goal` invent `dogfood` / `udist>1` `!rn2(4)`.
- Change: no JS port delta. DIAG: JS pet udist=4 invent=20 → `rn2(4)`;
  C’s 20×`obj_resists` ≈ invent scan (`udist<=1`). Rejected broken
  `obj_resists` body / missing fobj pile.
- Verification: green+strict; full suite **26**/44 Scr **4363**/11405
  RNG **262922**/792838 speed `24+0.13/turn`.
- Next: find prior pet/hero placement split before @4565 (D-0429).
## 2026-07-16 01:05 — #459 eatcorpse rnd logging (D-0428)
- Objective: seed0002 eatcorpse / early peel (PRIMARY).
- C locus: `eat.c` `eatcorpse` `losehp(rnd(15)|rnd(8), …)`.
- Change: acid/sick inline damage used `1+rn2(N)` (logs `rn2`) →
  `rnd(N)` to match C provenance; poison path already correct.
- Verification: rng-diff prefix **3808→4565**; Scr still 54/595;
  green+strict; cohort **24/24** (incl. seed0004).
- Next: seed0002 @4565 C `obj_resists` vs JS `rn2(4)`.
## 2026-07-16 00:59 — #458 throwit land newsym (D-0427)
- Objective: seed0004 @354 map `%` vs floor (misread as gem; FOOD carrot).
- C locus: `dothrow.c` `throwit` after `stackobj` — `cansee`→`newsym`.
- Change: JS `throwit` called `place_object`/`stackobj` but omitted land
  `newsym`; object existed with `disp` still floor.
- Verification: seed0004 **PASS** Scr **409**/409; green+strict; cohort
  **23/23**; full suite **26**/44 Scr **4363**/11405.
- Next: seed0002 eatcorpse / early peel.

