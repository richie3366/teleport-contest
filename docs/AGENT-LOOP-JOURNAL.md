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

## 2026-07-17 13:42 — #703 D-0632 relobj distant_name disco
- Objective: seed0361 @358 disco Armor cloak/shoes order reversed.
- C locus: `steal.c` `mdrop_obj` `distant_name` before extract; `objnam.c`.
- Change: `relobj_on_death` calls `distant_name(otmp, doname)` while still
  MINVENT so disco follows minvent order (not reverse pile look_here).
- Verification: Scr **363→364**/366; @358 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @360/@361 attrs pages (Hallu/Search/Reflect/lifesaved).


## 2026-07-17 13:36 — #702 D-0631 ini_inv weptool + doname charged
- Objective: seed0361 @354 invent — uncursed pick-axe / tinning vs
  `+0` swapwep / `(0:72)` charges.
- C locus: `u_init.c` `ini_inv_use_obj` `is_weptool`; `objnam.c`
  `doname_base` weptool→WEAPON + TOOL `oc_charged`.
- Change: u_init `is_weptool` (+ bimanual/shield gate); objnam
  donameClass remap + charged-tool/WEPTOOL name list.
- Verification: Scr **362→363**/366; @354 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @358 disco order; @360/@361 attrs pages.

