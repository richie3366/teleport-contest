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

## 2026-07-16 20:39 — #615 formal score refresh
- Objective: mandatory 5-iter full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score cadence; no port peel this iter).
- Change: documented suite aggregates in CURRENT.md Score.
- Verification: green+strict PASS; full sessions **30/44** Scr
  **5901**/11405 RNG **348962**/792838 (44.01%) `31+0.15/turn`
  (R² 0.77). Δ vs #610: Scr 0, RNG +559 (D-0551…D-0554), PASS same.
- Next: seed0373 @30743 get_location vs next_ident; or dosounds @8468.

## 2026-07-16 20:36 — #614 D-0554 newmonhp golemhp
- Objective: seed0373 @30344 C silent stone-golem HP vs JS d(21,8)
- C locus: makemon.c newmonhp is_golem arm; golemhp()
- Change: js/makemon.js golemhp + newmonhp is_golem branch
- Verification: rng-diff 30344→30743; runner RNG 30755/35386;
  green+strict PASS; cohort 28/28 PASS
- Next: @30743 get_location vs next_ident; or dosounds @8468

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

## 2026-07-16 20:18 — #610 score + D-0550 fire load_special
- Objective: mandatory #610 full `sessions` score; peel seed0373 @30065
  endgame plane `load_special`.
- C locus: `dat/fire.lua`; `sp_lev.c` `load_special`; `dungeon.c`
  `level_difficulty` In_endgame; `mkmaze.c` `mkportal`/`fumaroles`.
- Change: `js/mklev.js` `load_fire` + portal/fumaroles/lregion flip;
  `js/hacklib.js` endgame difficulty; `js/do.js` arrival fumaroles.
- Verification: **#610** 30/44 Scr **5901**/11405 RNG **348403**/792838
  (43.94%) `31+0.14/turn`; seed0373 **30065→30209** RNG 30222; green+
  strict PASS.
- Next: red dragon makemon female vs newmonhp @30209; or dosounds @8468.

## 2026-07-16 20:05 — #609 D-0549 level_tele endgame Amulet
- Objective: peel seed0373 @30061 C `next_ident` vs JS `rn2(3)` after
  matched `collect_coords` / mon_arrive.
- C locus: `teleport.c` `level_tele` levTport_menu endgame
  `mksobj(AMULET_OF_YENDOR)`; `mkobj.c` AMULET_CLASS; `invent.c`
  `addinv_core1`.
- Change: `js/teleport.js` grant + `addinv`/`prinv`/`uhave.amulet`;
  `js/mkobj.js` `made_amulet`.
- Verification: rng-diff **30061→30065**; runner RNG **30115**/35386
  Scr 23; green+strict PASS; cohort **28**/28 PASS.
- Next: nhlib shuffle @30065 (endgame plane load); or dosounds @8468.

## 2026-07-16 19:56 — #608 D-0548 soko3-1 / soko3-2 / soko4-2
- Objective: peel seed0373 @29533 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched makemaz `rnd(2)=1`.
- C locus: `dat/soko3-1.lua`, `dat/soko3-2.lua`, `dat/soko4-2.lua`;
  `sp_lev.c` `load_special`.
- Change: `js/mklev.js` loaders + dispatch; soko4-2 hardfloor / PIT /
  SCR_EARTH / branch `place_lregion`. (DIAG showed next miss was
  `soko4-2`, not `soko3-2`, after soko3-1.)
- Verification: rng-diff **29533→30061**; runner RNG **30129**/35386
  Scr 22; green+strict PASS; cohort **28**/28 PASS.
- Next: `next_ident` @30061; or dosounds @8468.

## 2026-07-16 19:52 — #607 D-0547 soko2-1 + DRY boulder
- Objective: peel seed0373 @29189 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched makemaz `rnd(2)=1`.
- C locus: `dat/soko2-1.lua`; `sp_lev.c` `load_special` /
  `is_ok_location` DRY boulder reject.
- Change: `js/mklev.js` `load_soko2_1` + dispatch; `is_ok_location_dry`
  rejects `sobj_at(BOULDER)`.
- Verification: rng-diff **29189→29533**; runner RNG **29554**/35386
  Scr 22; green+strict PASS; cohort **28**/28 PASS.
- Next: nhlib shuffle @29533 (likely soko3-1); or dosounds @8468.

## 2026-07-16 19:43 — #606 D-0546 m_initinv S_MUMMY
- Objective: peel seed0373 @25869 C `m_initinv` `rn2(7)` vs JS
  trailing `rn2(50)`.
- C locus: `makemon.c` `m_initinv` S_MUMMY (~772).
- Change: `js/makemon.js` `case 'S_MUMMY': if (rn2(7)) mongets(MUMMY_WRAPPING)`.
- Verification: rng-diff **25869→29189**; runner RNG **29214**/35386
  Scr 22; green+strict PASS; cohort **30**/30 PASS.
- Next: nhlib shuffle `rn2(3)` @29189; or dosounds @8468.

## 2026-07-16 19:40 — #605 score + D-0545 worm-seg MON_AT
- Objective: mandatory 5-iter score; peel seed0373 @25654 C
  `fill_zoo` `rn2(100)` vs JS `rn2(3)`.
- C locus: `makemon.c` `MON_AT`; `rm.h` `place_worm_seg`;
  `mkroom.c` `fill_zoo` gold after null makemon.
- Change: `makemon` MON_AT consults `worm_mon_at` (D-0544 segs).
- Verification: full `sessions` **30/44** Scr **5900**/11405 RNG
  **344063**/792838 (43.40%) `30+0.15/turn`; rng-diff
  **25654→25869**; runner RNG **25885**; green+strict; cohort 30/30.
- Next: m_initinv S_MUMMY `rn2(7)` @25869; or dosounds @8468.

## 2026-07-16 19:36 — #604 D-0544 LONG_WORM initworm
- Objective: peel seed0373 @24531 C `makemon` `rn2(5)` vs JS `rn2(50)`.
- C locus: `makemon.c` LONG_WORM; `worm.c` get_wormno/initworm/
  place_worm_tail_randomly.
- Change: new `js/worm.js` creation path + `_level_monsters`;
  makemon LONG_WORM arm; m_at sees segs; clear_wormdata on level clear.
- Verification: rng-diff **24531→25654**; runner RNG **25657**/35386
  Scr 22/124; green+strict; cohort 28/28; seed0116 RNG full.
- Next: fill_zoo rn2(100) @25654; or dosounds @8468.

## 2026-07-16 19:31 — #603 D-0543 soko1-2 load_special
- Objective: peel seed0373 @22651 C nhlib `shuffle` `rn2(3)` vs JS
  `rn2(79)` after matched `makemaz` `rnd(2)=2`.
- C locus: `dat/soko1-2.lua`; `sp_lev.c` `load_special`; `mkmaze.c`
  `makemaz`.
- Change: `js/mklev.js` `load_soko1_2` + dispatch (map, traps,
  mimics, zoo, percent(25) reward, flip).
- Verification: rng-diff **22651→24531**; runner RNG **24545**/35386
  Scr 22/124; green+strict; cohort 28/28.
- Next: makemon rn2(5) @24531; or dosounds @8468.
## 2026-07-16 19:26 — #602 D-0542 m_initinv S_QUANTMECH
- Objective: peel seed0373 @21730 C `m_initinv` `rn2(20)` vs JS
  trailing `rn2(50)`.
- C locus: `makemon.c` `m_initinv` S_QUANTMECH.
- Change: `js/makemon.js` SchroedingersBox arm (`!rn2(20)` +
  LARGE_BOX + HOUSECAT corpse / stop ROT / container / mpickobj).
- Verification: rng-diff **21730→22651**; runner RNG **22674**/35386
  Scr 22/124; green+strict; cohort 28/28.
- Next: nhlib shuffle @22651; or dosounds @8468.
## 2026-07-16 19:22 — #601 D-0541 m_initweap is_elf kit
- Objective: peel seed0373 @19071 C `m_initweap` `rn2(2)` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap` `is_elf`; `mondata.h` `M2_ELF`.
- Change: `js/monsters.js` `is_elf`; `js/makemon.js` full S_HUMAN elf kit.
- Verification: rng-diff **19071→21730**; runner RNG **21757**/35386
  Scr 22/124; green+strict; cohort 28/28.
- Next: m_initinv S_QUANTMECH @21730; or dosounds @8468.
