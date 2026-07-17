# Rotated from AGENT-LOOP-JOURNAL.md (#734 D-0661)

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
