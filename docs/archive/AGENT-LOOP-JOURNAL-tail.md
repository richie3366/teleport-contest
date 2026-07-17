## 2026-07-16 20:35 — #613 D-0553 m_initinv S_GIANT
- Objective: seed0373 @30308 S_GIANT invent vs trailing rn2(50)
- C locus: makemon.c m_initinv case S_GIANT; mondata.h is_giant
- Change: JS S_GIANT minotaur WAN_DIGGING + is_giant gem loop; M2_GIANT
- Verification: rng-diff 30308→30344; RNG 30351/35386; green+strict;
  cohort 30/30 PASS
- Next: @30344 golemhp (stone golem silent newmonhp) vs d(21,8)

## 2026-07-16 20:29 — #612 D-0552 splev pm_to_humidity
- Objective: peel seed0373 @30263 C `next_ident` vs JS `get_location`.
- C locus: `sp_lev.c` `pm_to_humidity` / `is_ok_location` /
  `create_monster` humidity.
- Change: `js/mklev.js` humidity-aware placement; `js/monsters.js`
  `likes_lava`/`likes_fire`/`is_swimmer`/`amphibious`.
- Verification: rng-diff **30263→30308**; runner RNG **30336**/35386;
  green+strict PASS; cohort **28**/28 PASS.
- Next: @30308 C `m_initinv` S_GIANT gem `rn2(m_lev/2)`; or dosounds.

## 2026-07-16 20:22 — #611 D-0551 newmonhp adult dragon endgame
- Objective: peel seed0373 @30209 C female `rn2(2)` vs JS `d(22,8)`.
- C locus: `makemon.c` `newmonhp` adult-dragon `In_endgame` arm.
- Change: `js/makemon.js` — adult `S_DRAGON`/`PM_GRAY_DRAGON+` HP is
  `8*m_lev` in endgame (no RNG), else `4*m_lev+d(m_lev,4)`.
- Verification: rng-diff **30209→30263**; runner RNG **30272**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @30263 C `next_ident` vs JS `get_location`; or dosounds @8468.

## 2026-07-17 00:50 — #651 D-0584 wear/puton empty `[*]`
- Objective: seed0116 Scr 115/127 (CURRENT primary).
- C locus: invent.c getobj empty-buf `" [*]"`; do_wear wear_ok/puton_ok.
- Change: getobj_wear/puton empty prompt `[*?]` → `[*]`.
- Verification: seed0116 Scr **115→116**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 PASS.
- Next: seed0116 @114 materialize map `` ` `` vs `·` (32,13).
