## 2026-07-17 18:55 — #734 D-0661 doname W_WEP (wielded)
- Objective: seed0367 screen peel @76 — C potion `(wielded)` vs JS omit.
- C locus: objnam.c doname_base W_WEP (stack/ammo/missile/non-weptool
  → `(wielded)` else hand phrasing).
- Change: js/objnam.js port predicate + is_missile_obj; quan===1-only
  hand path was wrong.
- Verification: seed0367 Scr 202→205 prefix 76→148 RNG FULL; green+
  strict PASS; cohort 32/32 prior-PASS.
- Next: @148 materialize pline missing --More-- (quest text theft).

## 2026-07-17 18:50 — #733 D-0660 check_special_room MORGUE More
- Objective: seed0367 @38566 C getbones rn2(3) vs JS rnd(10).
- C locus: hack.c check_special_room (MORGUE/… enter + rtype wake);
  do.c goto_level.
- Change: port special-room entrance plines so locate_next --More--
  owns ^V2\\n before ^V4 getbones (was deferred → key theft).
- Verification: seed0367 RNG FULL 50125 Scr 180→202; green+strict
  PASS; cohort 34/34 prior-PASS.
- Next: seed0367 screen peel (Scr 202/324).

## 2026-07-17 18:45 — #732 D-0659 vamp decide_to_shapeshift
- Objective: seed0367 @35546 C rn2(4) decide_to_shapeshift vs JS rn2(12).
- C locus: mon.c decide_to_shapeshift (vamp arms) / pickvampshape;
  m_calcdistress.
- Change: port vamp low-hp / fog pickvampshape / vamp-form arms +
  door enexto/rloc_to + gender restore; export pickvampshape.
- Verification: seed0367 @35546→38566 (RNG 38592 Scr 180); green+
  strict PASS; cohort 34/34 prior-PASS.
- Next: @38566 C getbones rn2(3) vs JS rnd(10).

## 2026-07-17 18:40 — #731 D-0658 Pri-loca link_doors + hx=39
- Objective: seed0367 @35535 put_lregion m_at (eastern morgue stock).
- C locus: sp_lev.c link_doors_rooms/maybe_add_door; mkroom.c fill_zoo
  door-edge (no rect roomno); Pri-loca.lua region x2=39.
- Change: port link_doors_rooms (+ helpers); load_pri_loca call before
  wallify; eastern hx=39; drop D-0643 rect roomno gate.
- Verification: seed0367 @35535→35546 (RNG 35910 Scr 171); green+
  strict PASS; cohort 32/32 prior-PASS.
- Next: @35546 decide_to_shapeshift rn2(4) vs JS rn2(12).

## 2026-07-17 18:35 — #730 public score cadence
- Objective: mandatory full `sessions` score (#730÷5).
- C locus: n/a (score refresh only; primary still seed0367 @35535).
- Change or falsified theory: none — docs only.
- Verification: green+strict PASS; suite **34/44**; Scr **6929**/11405;
  RNG **450487**/792838 (56.82%); speed `34+0.16/turn` (R² 0.781).
  Δ vs #725: Scr +5, RNG +8419 (D-0654…57 absorbed).
- Next: Pri-loca link_doors_rooms + eastern hx=39 fill parity @15167.

