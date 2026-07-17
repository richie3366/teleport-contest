# Agent loop journal archive (rotate 15)

Moved from live journal at #730 score cadence.

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
