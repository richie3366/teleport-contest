# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

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

## 2026-07-17 18:30 — #729 D-0657 C m_at at (59,14)
- Objective: seed0367 @35535 why C put_lregion rejects (59,14).
- C locus: mkmaze.c put_lregion_here TELE m_at; mkroom.c fill_zoo door
  skip; sp_lev.c link_doors_rooms; Pri-loca.lua eastern region.
- Change or falsified theory: C DIAG — mon=243 elf zombie (not
  typ/occ/excl). C room[3] hx=39 stocks 53–60. D-0645 hx=35 gap.
  Tried hx=39 / link_doors — regress @15167/@14403; reverted.
- Verification: seed0367 still @35535; green+strict PASS.
- Next: link_doors_rooms + hx=39 fill parity, then intemple.

## 2026-07-17 18:15 — #728 D-0656 getlev updest/dndest + @35535 diag
- Objective: seed0367 @35535 C place_lregion vs JS nhlib shuffle.
- C locus: restore.c getlev dest_area; mkmaze.c put_lregion_here;
  dungeon.c u_on_rndspot; do.c goto_level.
- Change: stash/restore updest/dndest on leave/getlev (D-0656).
  Diagnosis: C rejects put at (59,14) then retries (35,14)→intemple;
  JS accepts. Falsified: second place_lregion call; non-zero dest;
  excl; east hx=39.
- Verification: still @35535 (RNG 35572 Scr 175); green+strict PASS;
  cohort 11/11.
- Next: C cell state at (59,14) on Pri-loca getlev return.

## 2026-07-17 17:55 — #727 D-0655 Pri-fila/filb load_special
- Objective: seed0367 @33068 C nhlib shuffle after getbones vs JS rn2(79).
- C locus: dat/Pri-fila.lua / Pri-filb.lua; sp_lev.c lspo_room/
  build_room/room_types morgue; mklev.c In_quest *-fil{a,b}.
- Change: load_pri_fila/filb via splev_des_room; splev_roomtype
  morgue→MORGUE; dispatch (D-0655). Was empty makemaz → place_lregion.
- Verification: @33068→35535 (RNG 35572, Scr 175); green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: @35535 Home 3 place_lregion vs shuffle (then intemple).

## 2026-07-17 16:55 — #726 D-0654 medusa resists_ston + mresists
- Objective: seed0367 @27126 C rndmonst_adj rn2(3) vs JS rn2(75).
- C locus: sp_lev.c create_object Medusa statue arm; monst.h
  resists_ston; mondata.c poly_when_stoned; makemon.c propagate;
  extract-monsters.py mresists (mr1).
- Change: extract mresists; resists_ston/poly_when_stoned; Medusa
  empty-statue reject+rndmonnum retry + propagate on accept (D-0654).
  Was accepting first makemon then get_location while C retried.
- Verification: @27126→33068 (RNG 33076, Scr 170); green+strict PASS;
  cohort 32/32 prior-PASS.
- Next: @33068 C nhlib shuffle after getbones vs JS rn2(79).

## 2026-07-17 16:47 — #725 score + D-0653 goodpos pool air
- Objective: mandatory full `sessions` (#725÷5) + seed0367 @27121.
- C locus: teleport.c goodpos pool/lava/eel; mon.c m_in_air.
- Change: port goodpos is_swimmer/m_in_air/likes_lava + eel rn2(13)
  (D-0653). Was blanket-rejecting MOAT for S_VORTEX. Score: **34/44**;
  Scr **6924**/11405; RNG **442068**/792838 (55.76%); `34+0.16/turn`.
- Verification: @27121→27126 (RNG 27153, Scr 170); green+strict PASS;
  cohort sample PASS; full suite post-fix.
- Next: @27126 C rndmonst_adj rn2(3) vs JS rn2(75).

## 2026-07-17 16:45 — #724 D-0652 align_shift oldmoves + moves=0 mklev
- Objective: seed0367 @26695 C rndmonst_adj rn2(3) vs JS rn2(5).
- C locus: makemon.c align_shift (static oldmoves/Is_special);
  u_init.c u_init_role moves=1 after mklev; allmain.c newgame order.
- Change: port align_shift cache + ternary align; moves=0 through
  starting mklev; reset cache on newgame (D-0652). Was recomputing
  medusa chaotic ash while C still had stale bigrm align 0.
- Verification: @26695→27121 (RNG 27146, Scr 170); seed0009 PASS;
  green+strict PASS; cohort 32/32 prior-PASS.
- Next: @27121 C next_ident rnd(2) vs JS makemon_rnd_goodpos rn2(77).

## 2026-07-17 16:35 — #723 D-0651 medusa-1 load_special
- Objective: seed0367 @26691 C nhlib shuffle vs JS place_lregion.
- C locus: dat/medusa-1.lua; sp_lev.c load_special/create_object Medusa
  statues; mkmaze.c fixup_special Is_medusa_level; mkobj.c STATUE book.
- Change: load_medusa_1 + dispatch; Is_medusa_level; fixup medusa arm;
  STATUE book add_to_container (D-0651).
- Verification: @26691→26695 (RNG 26718, Scr 170); green+strict PASS;
  cohort 34/34 prior-PASS sample.
- Next: @26695 rndmonst_adj weight rn2(3) vs rn2(5) on Perseus rndmonnum.

