# Rotated from AGENT-LOOP-JOURNAL.md (#630 score cadence)

## 2026-07-16 20:53 — #618 D-0557 sticky Sokoban clear
- Objective: seed0373 @32011 C next_ident vs JS rn2(4) Sokoban dig-avoid
- C locus: mklev.c clear_level_structures sokoban_rules=0; muse.c rnd_defensive_item
- Change: clear g.Sokoban/lf.sokoban in clear_level_structures; getlev sync;
  rnd_defensive_item uses level sokoban_rules only
- Verification: rng-diff 32011→32419; runner RNG 32421/35386;
  green+strict PASS; cohort 30/30 PASS
- Next: @32419 collect_coords rn2(8) vs JS rn2(12); or dosounds @8468

## 2026-07-16 20:50 — #617 D-0556 salamander m_initweap
- Objective: seed0373 @31895 C `m_initweap` `rn2(7)` vs JS `rn2(75)`
- C locus: makemon.c m_initweap S_LIZARD PM_SALAMANDER (~495–499)
- Change: js/makemon.js salamander spear/trident/stiletto kit
- Verification: rng-diff 31895→32011; runner RNG 32340/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @32011 rnd_defensive_item Sokoban rn2(4) vs next_ident
  (sticky game.Sokoban?); or dosounds @8468

## 2026-07-16 20:46 — #616 D-0555 get_location_coord retry
- Objective: seed0373 @30743 C get_location vs JS next_ident
- C locus: sp_lev.c get_location_coord; create_monster humidity
- Change: js/mklev.js get_location_coord_random (double get_location
  on random miss) used by splev_create_monster
- Verification: rng-diff 30743→31895; runner RNG 31908/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @31895 salamander m_initweap rn2(7); or dosounds @8468

## 2026-07-16 20:39 — #615 formal score refresh
- Objective: mandatory 5-iter full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence; no port peel this iter).
- Change: documented suite aggregates in CURRENT.md Score.
- Verification: green+strict PASS; full sessions **30/44** Scr
  **5901**/11405 RNG **348962**/792838 (44.01%) `31+0.15/turn`
  (R² 0.77). Δ vs #610: Scr 0, RNG +559 (D-0551…D-0554), PASS same.
- Next: seed0373 @30743 get_location vs next_ident; or dosounds @8468.

## 2026-07-16 20:36 — #614 D-0554 newmonhp golemhp
- Objective: seed0373 @30344 C silent stone-golem HP vs JS d(21,8)
- C locus: makemon.c newmonhp is_golem arm; golemhp()
- Change: js/makemon.js golemhp + newmonhp is_golem branch
- Verification: rng-diff 30344→30743; runner RNG 30755/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @30743 get_location vs next_ident; or dosounds @8468
