# Rotated from AGENT-LOOP-JOURNAL.md (#689 D-0619)

## 2026-07-17 10:50 — #675 score + D-0605 soko mimic retry
- Objective: mandatory full score (#675÷5); seed0361 @13839 find_montype
  vs rn2(26).
- C locus: `sp_lev.c` create_monster M_AP_OBJECT boulder (`m->x < 0`
  after `m->x = mtmp->mx`); `soko1-1.lua` giant mimic.
- Change: drop JS post-makemon `m_bad_boulder_spot` relocation (C gate
  unreachable). Score: **33/44** Scr **6607**/11405 RNG **374489**/792838
  (47.23%) `32+0.16/turn`.
- Verification: prefix **13839→18684** Scr **215** RNG **18774**;
  green+strict PASS; cohort **31/31**; full sessions **33/44**.
- Next: seed0361 @18684 `select_newcham_form`; or Pri-strt.

## 2026-07-17 10:45 — #674 D-0604 pri_move altar mill
- Objective: seed0361 @13719 C `rn2(3) @ pri_move` vs JS `rn2(5)`.
- C locus: `priest.c` `pri_move` / `histemple_at`; `monmove.c` ispriest.
- Change: port `histemple_at` + `pri_move` (rn1 mill, Conflict chase,
  Invis avoid → `move_special`); `await pri_move` in `m_move`.
- Verification: prefix **13719→13839** Scr **215** RNG **13889**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @13839 `find_montype` (sp_lev); or Pri-strt.

