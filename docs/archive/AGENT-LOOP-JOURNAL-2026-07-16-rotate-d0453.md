# Archived agent-loop journal crumbs

## 2026-07-16 03:29 — #480 score cadence + D-0447 oc_cost blocker
- Objective: mandatory full `sessions` score (#480÷5); primary D-0447.
- C locus: `shk.c` `addtobill`/`append_honorific`; `pickup.c` `pick_obj`;
  objects extract `oc_cost`.
- Change: no port code. Score refreshed. Diagnosed D-0447 prerequisite:
  extractor omits `oc_cost` → cannot `get_cost` before bill quote.
- Verification: full suite **26/44**; Scr **4620**/11405; RNG
  **277634**/792838; speed `23+0.13/turn`; green+strict PASS.
- Next: emit `oc_cost` → `getprice`/`get_cost` → `addtobill` +
  `append_honorific` + `pick_obj` robshop wire (D-0447).

## 2026-07-16 03:26 — #479 seer_turn once-per-hero (D-0446)
- Objective: seed0002 @18354 C `rn2(5)` @ `distfleeck` vs JS `rn2(31)` (PRIMARY).
- C locus: `allmain.c` `moveloop_core` once-per-hero `seer_turn` / `rn1(31,15)`.
- Change: JS burned `rn1(31,15)` inside EOT; C runs it after the
  `umovement < NORMAL_SPEED` loop. Moved seer_turn update to
  once-per-hero (`js/allmain.js`); `do_vicinity_map` still deferred.
- Verification: seed0002 prefix **18354→18457**; Scr still **311**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @18457 C `rn2(4)` @ `append_honorific` vs JS `rn2(5)`
  (D-0447).

## 2026-07-16 03:23 — #478 goto_level descend fall (D-0445)
- Objective: seed0002 @16501 goto_level descend fall rnd(3) (PRIMARY).
- C locus: `do.c` `goto_level` encumber/Punished/Fumbling fall `losehp(Maybe_Half_Phys(rnd(3)))`.
- Change: port descend Flying / fall / ordinary arms; `near_capacity()>UNENCUMBERED` burns `rnd(3)` before `mon_arrive`.
- Verification: seed0002 prefix **16501→18354**; Scr **292→311**/595; green+strict; cohort **26/26** PASS.
- Next: seed0002 @18354 C `rn2(5)` @ `distfleeck` vs JS `rn2(31)` (D-0446).

## 2026-07-16 03:20 — #477 peffect_healing (D-0444)
- Objective: seed0002 @14081 peffect_healing (PRIMARY).
- C locus: `potion.c` `peffect_healing` / `peffects` / `healup`.
- Change: wired `POT_HEALING` — `You_feel` + `healup(8+d(4+2*bcsign,4),…)`
  + `exercise(A_CON)`; `healup` sets `flags.botl`.
- Verification: seed0002 prefix **14081→16501**; Scr **284→292**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @16501 C `rnd(3)` @ `goto_level` descend fall vs JS
  `rn2(10)` `mon_arrive` (D-0445).

## 2026-07-16 03:14 — #476 rottenfood→occupation (D-0443)
- Objective: seed0002 @12530 umovement/SLT / eat EOT interleave (PRIMARY).
- C locus: `eat.c` `rottenfood` / `eatcorpse` / `start_eating`.
- Change: JS forced dont_start after non-faint rottenfood — C only
  dont_starts on faint; non-faint `consume_oeaten(…,2)` then eats.
  Ported `rottenfood` + fixed retcode so goblin meal sets occupation.
- Verification: seed0002 prefix **12530→14081**; Scr **247→284**/595;
  green+strict; cohort **26/26** PASS.
- Next: seed0002 @14081 C `d(4,4)` @ `peffect_healing` vs JS `rn2(5)`.

