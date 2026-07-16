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

## 2026-07-16 16:52 — D-0534 mktrap WEB giant spider
- Objective: seed0373 @9875 C `next_ident`/`newmonhp` vs JS `rnd(4)`.
- C locus: `mklev.c` `mktrap` WEB→`makemon(PM_GIANT_SPIDER)`;
  `sp_lev.c` `create_trap`.
- Change: `mktrap_seen_victim` creates spider unless `nospider`;
  wire `splev_create_trap`/`mktrap_room`; tut-1 WEB keeps nospider.
- Verification: rng-diff **9875→11957**; RNG **12021**/35386;
  green+strict PASS; cohort **28**/28 PASS.
- Next: @11957 `mksobj_init` `rn2(5)` vs `rn2(4)`; or seed5006.

## 2026-07-16 16:46 — D-0533 attach_egg_hatch_timeout
- Objective: seed0373 @9839 egg hatch `rnd(151)` vs JS `rn2(79)`.
- C locus: `timeout.c` `attach_egg_hatch_timeout`/`stop_timer`;
  `mkobj.c` `set_corpsenm` EGG + `mksobj` case EGG.
- Change: port hatch roll + `stop_timer`; wire EGG through
  `set_corpsenm`/`mksobj`. `hatch_egg` callback still deferred.
- Verification: rng-diff **9839→9875**; RNG **10034**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @9875 `next_ident` `rnd(2)` vs `rnd(4)`; or seed5006
  dosounds @8468.

## 2026-07-16 18:45 — #592 D-0532 qt_montype quest gate
- Objective: seed0373 @6811 C `rndmonst_adj` `rn2(7)` vs JS `rn2(3)`.
- C locus: `makemon.c` `rndmonst_adj`; `questpgr.c` `qt_montype`;
  `role.c` `roles[]` enemy1/2.
- Change: port `qt_montype` + quest `rn2(7)` gate; wire `enemy*`
  onto all roles → `game.urole`.
- Verification: seed0373 **6811→9839** (RNG **9872**, Scr 22/124);
  green+strict; cohort **30**/30; seed0116 RNG full Scr 110/127.
- Next: @9839 `attach_egg_hatch_timeout`; or seed5006 dosounds @8468.

## 2026-07-16 18:40 — #591 D-0531 on_locate + Bar-fila
- Objective: seed0373 @5497 nhlib shuffle vs Medusa `rn2(5)`.
- C locus: `quest.c` `on_locate`; `mklev.c` In_quest fill;
  `dat/Bar-fila.lua`/`Bar-filb.lua`; `sp_lev.c` `reset_xystart_size`.
- Change: port `on_locate`+Bar locate texts; `makelevel` → `Bar-fila`
  for `^V2` quest dlevel 2; reset splev bounds at load_special start.
- Verification: seed0373 **5497→6811** (RNG **6849**, Scr 22/124);
  green+strict; cohort **30**/30; seed0116 RNG full Scr 110/127.
- Next: @6811 `rndmonst_adj`/`qt_montype`; or seed5006 dosounds @8468.

## 2026-07-16 18:30 — #590 formal public score
- Objective: mandatory 5-iter score refresh (global #590).
- C locus: n/a (score+docs); light diagnose seed0373 @5497.
- Change: full `sessions` run; rewrite CURRENT Score. Hypothesis:
  @5497 missing next special after Bar-loca (`^V2` → Bar-goal/
  fila/filb); JS Medusa `rn2(5)` vs C nhlib shuffle `rn2(2)`.
- Verification: green+strict PASS; **30/44** PASS; Scr
  **5899**/11405; RNG **323852**/792838 (40.85%); speed
  `29+0.15/turn` (R² 0.80). Δ vs #585: Scr +1, RNG +1288.
- Next: identify C protofile for seed0373 `^V2` hop / port
  Bar-goal; or seed5006 `dosounds` @8468.

## 2026-07-16 18:28 — #589 D-0530 m_initweap S_TROLL
- Objective: seed0373 @5082 C `m_initweap` `rn2(2)` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap` `case S_TROLL`.
- Change: port S_TROLL polearm kit; ANGEL/KOP/LIZARD still deferred.
- Verification: rng-diff **5082→5497**; runner RNG **5511**/35386;
  green+strict; cohort 30/30 PASS; seed0116 RNG full.
- Next: @5497 C nhlib shuffle `rn2(2)` vs JS `rn2(5)`; or seed5006
  `dosounds` @8468.
