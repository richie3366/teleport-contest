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
