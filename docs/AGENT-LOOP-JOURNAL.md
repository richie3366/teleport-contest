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

## 2026-07-17 14:58 — #713 D-0641 extract AD_SPEL + dochug castmu
- Objective: seed0367 @3332 choose_monster_spell vs m_move.
- C locus: mcastu.c choose_monster_spell/castmu; monmove.c dochug
  undirected cast; monattk.h AD_CLRC/AD_SPEL; extract-monsters AD_MAP.
- Change: fix AD_MAP (AD_CLRC=240/AD_SPEL=241/AD_RBRE/SAMU/CURS) +
  regenerate mattks; js/mcastu.js choose+undirected castmu; dochug
  wire before m_move (D-0641).
- Verification: seed0367 @3332→3438 (RNG 3444, Scr 169); green+strict
  PASS; cohort 34/34 PASS.
- Next: seed0367 @3438 nhlib shuffle vs rn2(79).

## 2026-07-17 14:52 — #712 D-0640 #chat MS_LEADER quest_chat
- Objective: seed0367 @3310 nhlib shuffle vs rn2(5).
- C locus: sounds.c domonnoise MS_LEADER; quest.c quest_chat /
  chat_with_leader; questpgr qt_pager convert_arg.
- Change: domonnoise leader_m_id→MS_LEADER→quest_chat; Pri
  leader_first/assignquest texts; %s/%S/%g + plural/possessive;
  Priest guardnum (D-0640).
- Verification: seed0367 @3310→3332 (RNG 3365, Scr 169); green+strict
  PASS; cohort 14/14 PASS.
- Next: seed0367 @3332 choose_monster_spell vs m_move.

## 2026-07-17 14:45 — #711 D-0639 teleds urooms / intemple
- Objective: seed0367 @3282 intemple after D-0638 wiring.
- C locus: teleport.c teleds vault_guard save/restore + spoteffects;
  hack.c move_update / check_special_room.
- Change: js/teleport.js — stop pre-setting u.urooms before spoteffects
  so ^T into TEMPLE sets uentered → intemple (D-0639). D-0638 marked fixed.
- Verification: seed0367 @3282→3310 (RNG 3347); green+strict PASS;
  cohort 10/10 PASS.
- Next: seed0367 @3310 nhlib shuffle vs rn2(5).

## 2026-07-17 14:35 — #710 score 34/44 + D-0638 intemple partial
- Objective: mandatory #710 full `sessions` score; seed0367 @3282 intemple.
- C locus: priest.c intemple; hack.c check_special_room TEMPLE; do.c
  goto_level check_special_room leave/arrive.
- Change: js/priest.js intemple+helpers; hack TEMPLE dispatch; do.js
  leave+arrive check_special_room. Falsified "missing body alone" —
  Pri-strt has no MAGIC_PORTAL so hero rndspots outside TEMPLE.
- Verification: suite **34/44** Scr **6918**/11405 RNG **418252**/792838
  (52.75%) `32+0.16/turn`; green+strict PASS; seed0367 still @3282.
- Next: Pri-strt branch/MAGIC_PORTAL so arrival enters TEMPLE.

## 2026-07-17 14:23 — #709 D-0637 Pri-strt + Arch Priest kit
- Objective: seed0367 @2336 C nhlib shuffle vs JS rn2(79) place_lregion.
- C locus: dat/Pri-strt.lua; makemon.c quest_mon_represents_role; role.c
  Priest ldrnum PM_ARCH_PRIEST.
- Change: load_pri_strt; quest_mon_represents_role + MS_PRIEST gates;
  roles.js Priest ldrnum/homebase/intermed/questarti. Empty makemaz was
  the getbones-adjacent symptom, not a bones-path bug.
- Verification: prefix **2336→3282**; Scr 167; green+strict PASS;
  cohort 34/34 prior-PASS.
- Next: seed0367 @3282 intemple rn2(4) vs rn2(12).

## 2026-07-17 14:16 — #708 D-0636 blue DSM Very_fast
- Objective: seed0367 @2331 C u_calc_moveamt rn2(3) vs JS dosounds rn2(400).
- C locus: do_wear.c dragon_armor_handling/Armor_on; youprop.h Very_fast.
- Change: dragon_armor_handling (blue→EFast) + Armor_on/off; Fast/Very_fast
  read uprops[FAST]; confer_oc_oprop FAST→EFast mirror. Hypothesis "missing
  u_calc_moveamt call" falsified — Very_fast false without blue DSM EFast.
- Verification: prefix **2331→2336**; Scr **166→167**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @2336 getbones / nhlib shuffle vs rn2(79).

## 2026-07-17 14:12 — #707 D-0635 garlic_breath monflee
- Objective: seed0367 @1975 C dochug rn2(40) vs JS rn2(5).
- C locus: eat.c fprefx/garlic_breath; mondata.c olfaction; monmove.c monflee.
- Change: olfaction + garlic_breath → monflee(0); export monflee; known_hitum
  real monflee. Hypothesis "dochug flee arm missing" falsified — mflee never set.
- Verification: prefix **1975→2331**; Scr **155→166**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @2331 u_calc_moveamt rn2(3) vs dosounds rn2(400).

## 2026-07-17 14:02 — #706 D-0634 getobj_takeoff continue
- Objective: seed0367 @1946 (looked like dog_goal one fewer obj_resists).
- C locus: invent.c getobj missing-letter continue; do_wear.c dotakeoff.
- Change: getobj_takeoff loops on "don't have that object" (was abort →
  key desync / early garlic eat). Hypothesis "fobj shortfall" falsified.
- Verification: prefix **1946→1975**; Scr **75→155**; green+strict PASS;
  cohort 32/32 PASS.
- Next: seed0367 @1975 dochug rn2(40) vs rn2(5).

## 2026-07-17 13:53 — #705 public score 34/44
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence); seed0367 peel scouted only.
- Change: refreshed CURRENT Score — **34/44** PASS; Scr **6829**/11405;
  RNG **416960**/792838 (52.59%); speed `33+0.16/turn`. seed0361 in suite.
  Next peel: seed0367 @1946 dog_goal one fewer `obj_resists`.
- Verification: green+strict PASS; `node frozen/ps_test_runner.mjs sessions`.
- Next: seed0367 dog_goal/fobj vs dogfood early-out; or seed0014/0108.

## 2026-07-17 13:50 — #704 D-0633 seed0361 ^X attrs PASS
- Objective: seed0361 @360/@361 attrs `(1 of 2)` vs `(1 of 3)`.
- C locus: `insight.c` attributes_enlightenment; `weapon.c` odd_skill_names;
  `artifact.c` set_artifact_intrinsic/what_gives; `allmain.c` ublesscnt--;
  `eat.c` gethungry case 8.
- Change: Hallu/Search/Reflect/Lifesaved lines + saber skill_name +
  HALRES on wield + bare_artifactname; ublesscnt--; amulet hunger burn.
- Verification: seed0361 **PASS** 366/366 + strict; green+strict PASS;
  cohort 31/31 PASS.
- Next: full sessions on #705 (expect 34/44); seed0367 / seed0014/0108.

