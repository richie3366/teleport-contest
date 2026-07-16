# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

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
## 2026-07-16 19:20 — #600 score + D-0540 soldier polearm rn1
- Objective: mandatory 5-iter score refresh; peel seed0373 @16261
  C `m_initweap` `rn2(12)` vs JS `rn2(2)`.
- C locus: `makemon.c` `m_initweap` PM_SOLDIER/PM_WATCHMAN.
- Change: full `sessions` → CURRENT Score; port soldier/watchman
  `rn1(PARTISAN..BEC_DE_CORBIN)` + `P_POLEARMS` filter.
- Verification: **30/44** Scr **5900**/11405 RNG **337400**/792838
  (42.56%) `31+0.15/turn` (R² 0.74); rng-diff **16261→19071**;
  runner RNG **19086**; green+strict; cohort 28/28.
- Next: m_initweap is_elf @19071; or dosounds @8468.
## 2026-07-16 19:15 — D-0539 bigrm-8 load_special
- Objective: peel seed0373 @15574 C nhlib shuffle vs JS get_location
  after matched makemaz rnd(13)=8 / getbones.
- C locus: `dat/bigrm-8.lua`; `sp_lev.c` load_special; `mkmaze.c` makemaz.
- Change: `js/mklev.js` `load_bigrm_8` + dispatch (map, percent F-replace,
  flip_level_rnd).
- Verification: rng-diff **15574→16261**; runner RNG **16275**/35386
  Scr 22; green+strict; cohort 28/28 (+green 30); seed0116 RNG full.
- Next: m_initweap soldier polearm @16261; or dosounds @8468.
## 2026-07-16 19:10 — #598 D-0538 STATUE_TRAP mk_trap_statue
- Objective: peel seed0373 @14748 C `rndmonst_adj` rn2(7) vs JS rnd(4)
  after matched `traptype_rnd` (STATUE_TRAP).
- C locus: `trap.c` `maketrap` / `mk_trap_statue`.
- Change: port `mk_trap_statue` + STATUE_TRAP case in `js/trap.js`.
- Verification: rng-diff **14748→15574**; runner RNG **15601**/35386
  Scr 22; green+strict; cohort 30/30 PASS.
- Next: nhlib shuffle @15574; or dosounds @8468.
## 2026-07-16 19:05 — #597 D-0537 mineralize In_quest probs
- Objective: peel seed0373 @12327 C `mineralize` rn2(1000) vs JS rnd(2).
- C locus: `mklev.c` `mineralize` In_quest `goldprob/=4` `gemprob/=6`.
- Change: port quest sparsify arm in `js/mklev.js` `mineralize`.
- Verification: rng-diff **12327→14748**; runner RNG **14774**/35386
  Scr 22; green+strict; cohort 28/28 PASS.
- Next: `rndmonst_adj` @14748; or dosounds @8468.
## 2026-07-16 19:05 — #596 D-0536 create_monster MON_AT→enexto
- Objective: peel seed0373 @11988 C `collect_coords` rn2(8) vs JS rn2(2).
- C locus: `sp_lev.c` `create_monster` MON_AT→`enexto`; `makemon.c`
  `MM_ADJACENTOK`→`enexto_core`.
- Change: `splev_resolve_occupied` in `splev_create_monster`; makemon
  occupied arm matches C.
- Verification: rng-diff **11988→12327**; runner RNG **14397**/35386
  Scr 22; green+strict; cohort 28/28 PASS.
- Next: `mineralize` @12327 (goldprob/gemprob); or dosounds @8468.
## 2026-07-16 18:55 — #595 score + D-0535 offensive FALLTHROUGH
- Objective: mandatory full `sessions` score; peel seed0373 @11957
  mksobj_init rn2(5) vs rn2(4).
- C locus: `muse.c` `rnd_offensive_item` case 0; `do_wear.c` `hard_helmet`.
- Change: SCR_EARTH only if hard helm/amorph/walls/noncorp/unsolid;
  else FALLTHROUGH → WAN_STRIKING; animal/expl/mindless early return.
- Verification: #595 **30/44**, Scr **5900**/11405, RNG
  **330332**/792838 (41.66%), `31+0.15/turn`; seed0373
  **11957→11988** (RNG **12023**); green+strict; cohort 28/28.
- Next: `collect_coords` @11988; or seed5006 dosounds @8468.
