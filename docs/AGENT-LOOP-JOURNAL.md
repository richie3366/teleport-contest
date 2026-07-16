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

## 2026-07-16 18:25 — #588 D-0529 Bar-loca + traptype_rnd
- Objective: seed0373 @4571 C nhlib shuffle vs JS u_on_rndspot.
- C locus: `dat/Bar-loca.lua`; `mklev.c` `traptype_rnd`
  (`level_difficulty`).
- Change: `load_bar_loca` + dispatch; `traptype_rnd` uses
  `level_difficulty()` (was `dlevel`).
- Verification: rng-diff **4571→5082**; runner RNG **5133**/35386;
  green+strict; cohort 28/28 PASS; seed0116 RNG full.
- Next: m_initweap @5082; or seed5006 dosounds @8468.

## 2026-07-16 18:20 — #587 D-0528 tower1 + vampshift
- Objective: seed0373 @4159 — was mislabeled Bar-loca; C loads tower1.
- C locus: `dat/tower1.lua`; `makemon.c` cham/newcham; `mon.c`
  pickvampshape; `teleport.c` noteleport_level covetous.
- Change: `load_tower1`; vampshift/newcham; covetous noteleport bypass.
- Verification: rng-diff **4159→4571**; runner RNG **4596**/35386;
  green+strict; cohort 28/28 PASS; seed0116 RNG full.
- Next: Bar-loca @4571 (menu `z`); or seed5006 dosounds @8468.

## 2026-07-16 18:10 — #586 D-0527 onquest firsttime nhl shuffle
- Objective: seed0373 @4157 C nhlib shuffle vs JS rn2(79).
- C locus: `quest.c` onquest/on_start; `questpgr.c` qt_pager/
  com_pager_core nhl_init; `do.c` goto_level materialize→onquest.
- Change: `js/quest.js`; qt_pager Bar firsttime + nhl shuffle;
  wire inside goto_level; Barbarian homebase/ldrnum.
- Verification: rng-diff **4157→4159**; runner RNG **4209**/35386
  Scr 21/124; green+strict; cohort **30**/30; seed0116 RNG full.
- Next: Bar-loca load_special @4159; or seed5006 dosounds @8468.

## 2026-07-16 18:05 — #585 formal public score
- Objective: mandatory 5-iter score refresh (global #585).
- C locus: n/a (score+docs only).
- Change: full `sessions` run; rewrite CURRENT Score.
- Verification: green+strict PASS; **30/44** PASS; Scr
  **5898**/11405; RNG **322564**/792838 (40.68%); speed
  `29+0.15/turn` (R² 0.76). Δ vs #580: Scr 0, RNG +892.
- Next: seed0373 nhlib shuffle @4157; or dosounds @8468;
  or 0116 screen residual.

## 2026-07-16 18:00 — #584 D-0526 Bar-strt Pelias→branch
- Objective: peel seed0373 @3303 C `induced_align` (Pelias) vs JS
  wallify after D-0525 randline.
- C locus: `dat/Bar-strt.lua`; `makemon.c` MS_GUARDIAN `m_initweap` +
  eel sleep; `selvar.c` floodfill/rndcoord; `sp_lev.c` load_special
  flip/fixup.
- Change: `load_bar_strt` through branch; floodfill/area/and;
  guardian kit; eel sleep before invent; flip + oneshot LR_BRANCH.
- Verification: rng-diff **3303→4157**; runner RNG **4185**/35386;
  green+strict PASS; cohort **30**/30 PASS.
- Next: @4157 nhlib shuffle; or dosounds @8468; or 0116 screen.
