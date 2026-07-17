# Archived agent loop journal

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
