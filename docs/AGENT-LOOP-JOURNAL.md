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

## 2026-07-16 17:49 — #583 D-0525 Bar-strt selection_do_randline
- Objective: peel seed0373 @3289 C `selection_do_randline` rn2(7) vs
  JS rn2(79) after forest replace_terrain.
- C locus: `selvar.c` `selection_do_randline`; `nhlsel.c`
  `l_selection_randline` (rec=12); `dat/Bar-strt.lua`.
- Change: port selection new/get/set + `selection_do_randline` in
  `js/mklev.js`; wire path carve + portal free spot in `load_bar_strt`.
- Verification: seed0373 **3289→3303**; runner RNG **3343**/35386
  Scr 20; green+strict; cohort PASS sample held; seed0116 RNG full.
- Next: @3303 C `induced_align` rn2(3) (Pelias/makemon) vs wallify;
  or seed5006 dosounds @8468.

## 2026-07-16 17:46 — #582 D-0524 m_avoid_soko_push_loc
- Objective: peel seed0116 @12521 C `distfleeck` rn2(5) vs JS
  `dog_move` rn2(3).
- C locus: `monmove.c` `m_avoid_soko_push_loc`; `dogmove.c` caller.
- Change: port Sokoban boulder-line skip in `js/mon.js` (was stubbed).
- Verification: seed0116 RNG **full 12562**/12562; Scr still 110/127;
  green+strict; cohort **30/30** PASS.
- Next: seed0116 screen residual; or Bar-strt @3289 / dosounds @8468.

## 2026-07-16 17:40 — #581 D-0523 were_change from m_calcdistress
- Objective: peel seed0116 @12461 C `were_change` `rn2(50)` vs JS
  `mcalcmove` `rn2(12)`.
- C locus: `were.c` `were_change`/`new_were`; `mon.c` `m_calcdistress`.
- Change: new `js/were.js`; call `were_change` after `mon_regen`.
- Verification: prefix **12461→12521** (RNG **12554**/12562) Scr 110;
  green+strict; cohort 28/28 PASS.
- Next: @12521 fleeck `rn2(5)` vs dog_move `rn2(3)`; C transform @12522.

## 2026-07-16 17:35 — #580 score + D-0522 TELE m_at reject
- Objective: mandatory full `sessions` score; peel seed0116 @12330
  `put_lregion_here` accept vs C reject.
- C locus: `mkmaze.c` `put_lregion_here` TELE `m_at` gate;
  `is_exclusion_zone`.
- Change: reject TELE placement on occupied mon when `!oneshot`;
  wire `is_exclusion_zone` (zones still unpopulated).
- Verification: #580 **30/44**, Scr **5898**/11405, RNG
  **321672**/792838 (40.57%), `29+0.15/turn`; seed0116
  **12330→12461** (RNG **12509**); green+strict; cohort 10/10.
- Next: `were_change` @12461; or Bar-strt / dosounds.

## 2026-07-16 17:35 — #579 D-0521 load_special must not fill
- Objective: seed0116 @12294 C `place_lregion` vs JS `rn2(1156)` after
  fill_zoo (NOTES guessed irregular/door filter).
- C locus: `sp_lev.c` `load_special` (no fill); `mklev.c:1416`
  `fill_special_room` once after `makemaz`.
- Change: remove premature `fill_special_room` from `load_soko1_1`
  (double zoo fill). Not a cell-filter bug.
- Verification: prefix **12294→12330** (RNG **12368**/12562) Scr 110;
  green+strict; cohort 8/8 PASS.
- Next: `put_lregion_here` accept vs C reject @12330; or Bar-strt /
  dosounds.

## 2026-07-16 17:25 — #578 D-0520 soko1-1 / builds_up difficulty
- Objective: seed0116 @9350 next special after bigrm (`makemaz` rnd(2)→soko1-1).
- C locus: `dat/soko1-1.lua`; `dungeon.c` builds_up/level_difficulty;
  `makemon.c` set_mimic_sym/m_initinv; `mkroom.c` fill_zoo; `sp_lev.c` flip.
- Change: load_soko1_1 + flip + fill_zoo ZOO; hacklib builds_up difficulty;
  Sokoban set_mimic_sym gate + t_at; leprechaun gold; spider/snake mkobj_at.
- Verification: seed0116 **9351→12294** (runner RNG **12336**/12562) Scr 110;
  green+strict; cohort 6/6 PASS. seed0373 still @3289.
- Next: fill_zoo cell filter after flip / place_lregion; or Bar-strt randline;
  or seed5006 dosounds.

## 2026-07-16 17:15 — #577 D-0519 makemaz / bigrm-2 / Bar-strt
- Objective: shared special-level `makemaz` after getbones (0116 @6374 /
  0373 @2550).
- C locus: `mkmaze.c` `makemaz`; `sp_lev.c` load_special / replace_terrain;
  `dat/bigrm-2.lua` / `Bar-strt.lua`; `makemon.c` nymph sleep+invent.
- Change: protofile `rnd(rndlevs)` + loaders; map-relative get_location;
  nymph/jabberwock sleep + S_NYMPH invent.
- Verification: seed0116 **6374→9351** Scr **107→110**; seed0373
  **2550→3289**; green+strict; cohort **30/30**.
- Next: seed0116 @9350 next special; Bar-strt randline; or seed5006
  dosounds.

## 2026-07-16 16:58 — #576 D-0518 print_dungeon(TRUE)
- Objective: shared `^V?` getbones blocker (seed0116 @6373 / seed0373 @2549).
- C locus: `dungeon.c` `print_dungeon`/`tport_menu`/`print_branch`;
  `teleport.c` `level_tele` levTport_menu force_dest.
- Change: bymenu PICK_ONE menu + `?`/menu_requested → force_dest
  `schedule_goto`; export `select_menu_pick_one`.
- Verification: seed0116 **6373→6383** (getbones+); seed0373
  **2549→2550**; Scr unchanged; green+strict; cohort **30/30**.
  seed5006 still @8468.
- Next: quest/`makemaz` special (0373/0116) or seed5006 `dosounds`.

## 2026-07-16 16:53 — #575 formal public score
- Objective: mandatory full `sessions` (#575÷5).
- Measured: **30/44** PASS; Scr **5895**/11405; RNG
  **314432**/792838 (39.66%); speed `26+0.14/turn` (R² 0.79).
- Δ vs #570: Scr +375, RNG +10941, PASS +1 (seed0398 formal).
- Notable non-PASS: seed0116 6373/107; seed5006 8507/121;
  seed0373 2578/20; seed2200 229/230 parked.
- Green+strict PASS. No port code this iteration.
- Next: shared `print_dungeon` (`^V?` / seed0373 / seed0116 @6373)
  or seed5006 `dosounds`.
