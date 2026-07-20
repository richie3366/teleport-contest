## 2026-07-20 11:12 — #982 seed0383 @172 = moves=11 Hallu (D-0847)
- Objective: why @172 4 Hallu ROOM objs skew (thought post-expel).
- C locus: display.c see_objects/newsym; rnd.c rn2_on_display_rng.
- Falsified: post-expel see_obj/docrt as @172 cause; flush as glyph
  fix; wrong fobj set. @172 is moves=11 see_objects (otyps
  397/124/176/344 → `+?=[`); display RNG unlogged (142 burns before);
  core RNG FULL can hide Hallu desync. No production JS change.
- Verification: green+strict PASS; seed0383 Scr 174 RNG FULL.
- Next: display-RNG skew since Hallu/wizintrinsic before moves=11.

## 2026-07-20 10:57 — #981 seed0383 Hallu see_objects burn map (D-0847)
- Objective: post-expel @172 4 Hallu ROOM objs after matching mons.
- C locus: display.c see_objects/newsym; mhitu.c expels/unstuck→docrt.
- Falsified: +N×462 (N=0..40) before see_objects; skip kelp(23,13)
  newsym; moves=11 timing. Measured: expel moves=12; see_obj leads
  with rn2(5) yellow-light warn on !cansee kelp then 4×462; JS
  `+?=\[` vs C `)+[[`. No production JS change (DIAG reverted).
- Verification: green+strict PASS; seed0383 Scr 174 (no flush).
- Next: C vs JS Hallu-burning fobj set (YL TEMP_LIT / docrt 4×462).

## 2026-07-20 10:45 — #980 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (measurement only; no port peel).
- Change or falsified theory: none. Suite **38/44**; Scr **8976**/11405
  (−2 vs #975; seed0383 176→174 after D-0846 no-flush); RNG
  **666600**/792838 flat; speed `32+0.23/turn`. D-0847 still open.
- Verification: green+strict PASS; full `sessions` `__RESULTS_JSON__`.
- Next: display-RNG expelled-More → expels/docrt/mnexto before see_*
  (D-0847); then gulpmu flush.

## 2026-07-20 10:41 — #979 seed0383 @172 Hallu objs (D-0847)
- Objective: why 4 Hallu see_objects ROOM burns skew after matching mons.
- C locus: display.c see_monsters/see_objects; allmain once-per-input Hallu.
- Falsified: underfoot@see_mon; simple +N before see_objects; NUM_OBJECTS
  dims. With flush: firstMiss @172 Scr 175; 4 objs; mons match; exactly
  4×462 burns still wrong. Flush left parked.
- Verification: green+strict PASS; cohort 5/5; seed0383 Scr 174 (no flush).
- Next: display-RNG expelled-More → expels/docrt/mnexto before see_*.

## 2026-07-20 10:22 — #978 rloc_to newsym (D-0846)
- Objective: seed0383 @173 post-expel Hallu display-RNG before flush.
- C locus: teleport.c rloc_to_core newsym(old)+newsym(new); display.h covers_objects.
- Change: `rloc_to` remove+newsym(old)/place/newsym(new); covers_objects
  ≡ is_pool&&!Underwater. With flush: @173 mons match, 4 ROOM objs remain.
- Verification: seed0383 Scr 174 RNG FULL (no flush); green+strict PASS;
  cohort 5/5 PASS.
- Next: 4 Hallu see_objects ROOM burns after matching see_monsters; flush.
