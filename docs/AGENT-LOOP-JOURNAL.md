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

## 2026-07-17 16:20 — #722 D-0650 quest_portal com_pager
- Objective: seed0367 @26688 C nhlib shuffle rn2(2) vs JS rnd(4).
- C locus: do.c goto_level quest_portal arm; dungeon.c at_dgn_entrance;
  questpgr.c com_pager; quest.lua common.quest_portal*.
- Change: port at_dgn_entrance + com_pager(quest_portal*) in goto_level
  else-arm (D-0650). Was missing nhl_init after arriving on Quest
  entrance / bigrm level.
- Verification: @26688→26691 (RNG 26698, Scr 170); green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: @26691 medusa-1 load_special (makemaz rnd(4)=1).

## 2026-07-17 16:10 — #721 D-0649 S_ANGEL m_initweap
- Objective: seed0367 @26229 C m_initweap rn2(3) vs JS rn2(75).
- C locus: makemon.c m_initweap case S_ANGEL (~330–360); do_name.c oname.
- Change: port S_ANGEL humanoid kit (weapon/artifact/shield) in
  js/makemon.js (D-0649). Stub had fallen through to trailing rn2(75).
- Verification: @26229→26688 (RNG 26697, Scr 170); green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: @26688 C nhlib shuffle rn2(2) vs JS rnd(4).

## 2026-07-17 16:05 — #720 score + D-0648 bigrm-3
- Objective: mandatory full `sessions` (#720÷5) + seed0367 @19994 bigrm-3.
- C locus: `dat/bigrm-3.lua`; `sp_lev.c` mapfrag/match; `mkmaze.c` makemaz.
- Change: `load_bigrm_3` + `selection_match_mapfrag` (D-0648). Score:
  **34/44**; Scr **6924**/11405; RNG **441150**/792838 (55.64%);
  speed `34+0.16/turn`.
- Verification: @19994→26229 (RNG 26235, Scr 170); green+strict PASS;
  cohort 32/32 prior-PASS; full suite post-fix.
- Next: @26229 C `m_initweap` rn2(3) vs JS rn2(75).

## 2026-07-17 15:58 — #719 D-0647 minetn-2 load_special
- Objective: seed0367 @17449 C nhlib after makemaz rnd(7)=2 vs JS place_lregion.
- C locus: dat/minetn-2.lua; sp_lev.c create_subroom/create_door/flip_level.
- Change: load_minetn_2 + nested-room helpers; flip_level recurses sbrooms
  (D-0647). Without sbrooms flip, shop stock rnd(goodpos) drifted after Y-flip.
- Verification: @17449→19994 (RNG 19999, Scr 170); green+strict PASS;
  cohort 32/32 prior-PASS.
- Next: @19994 C nhlib after makemaz rnd(13)=3 (bigrm-3).
## 2026-07-17 15:49 — #718 D-0646 Pri-goal load_special
- Objective: seed0367 @15172 C nhlib after getbones vs JS place_lregion.
- C locus: dat/Pri-goal.lua; sp_lev.c load_special/splev_initlev/mkmap.
- Change: load_pri_goal + dispatch (mines lava + map/Mitre/Nalzok) —
  D-0646. Falsified NOTES Pri-fila guess (C init_fill proved goal).
- Verification: @15172→17449 (RNG 17451, Scr 170); green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: @17449 C nhlib after makemaz rnd(7)=2 (minetn-2).
## 2026-07-17 15:35 — #717 D-0645 Pri-loca eastern morgue hx
- Objective: seed0367 @15167 C place_lregion rn2(79) vs JS rn2(100).
- C locus: Pri-loca.lua eastern morgue des.region; sp_lev.c
  lspo_region/topologize; mkroom.c fill_zoo; mkmaze.c place_lregion.
- Change: load_pri_loca eastern morgue x2 39→35 to match C fill
  extent (282 morguemon then place_lregion) — D-0645. Falsified:
  place_lregion clamp; drop roomno gate; link_doors_rooms on Pri-loca.
- Verification: seed0367 @15167→15172 (RNG 15214, Scr 170); green+strict
  PASS; cohort 34/34 prior-PASS.
- Next: @15172 C nhlib after getbones vs JS place_lregion (Pri-fila?).
## 2026-07-17 15:25 — #716 D-0644 m_initinv S_DEMON
- Objective: seed0367 @13882 C m_initinv rn2(4) vs JS rn2(50).
- C locus: makemon.c m_initinv S_DEMON (ice devil spear) + S_WRAITH /
  S_LICH siblings.
- Change: port those three m_initinv switch arms (D-0644).
- Verification: seed0367 @13882→15167 (RNG 15181, Scr 170); green+strict
  PASS; cohort 32/32 prior-PASS.
- Next: seed0367 @15167 place_lregion rn2(79) vs rn2(100).
## 2026-07-17 15:20 — #715 score + D-0643 fill_zoo roomno
- Objective: mandatory full `sessions` score (#715÷5); seed0367 @10674.
- C locus: mkroom.c fill_zoo irregular roomno gate / mkswamp;
  Pri-loca.lua overlapping morgue des.region; mklev.c topologize.
- Change: rectangular fill_zoo skips cells whose roomno was claimed by
  a later overlapping topologize (D-0643). Suite score recorded.
- Verification: seed0367 @10674→13882 (RNG 13909, Scr 170); green+strict
  PASS; cohort 34/34; suite **34/44**, Scr 6919/11405, RNG
  **428825**/792838 (54.09%), speed 33+0.16/turn.
- Next: @13882 m_initinv rn2(4) vs rn2(50).
## 2026-07-17 15:10 — #714 D-0642 Pri-loca + MORGUE fill_zoo
- Objective: seed0367 @3438 nhlib shuffle vs rn2(79) after getbones.
- C locus: dat/Pri-loca.lua; sp_lev.c load_special/splev_initlev;
  mkroom.c fill_zoo/morguemon; mkobj.c mk_tt_object; dungeon.c
  Can_fall_thru; quest.lua Pri locate_first.
- Change: load_pri_loca + dispatch; morguemon/mk_tt_object + MORGUE
  fill_zoo; Can_fall_thru for hardfloor holes; Pri locate texts
  (D-0642).
- Verification: seed0367 @3438→10674 (RNG 10752, Scr 170); green+strict
  PASS; cohort 34/34 prior-PASS; suite still 34/44.
- Next: @10674 mid-morgue fill_zoo makemon vs corpse rn2(5).
