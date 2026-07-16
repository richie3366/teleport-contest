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

## 2026-07-16 16:51 — #574 D-0517 wizard Force + pleased
- Objective: seed0116 @6246 C wipe rn2(70) vs JS gethungry rn2(20).
- C locus: `pray.c` dopray Force; `eat.c` gethungry uinvulnerable;
  `pray.c` pleased.
- Change: Force yn → p_type 3 + uinvulnerable; pleased You_feel/rn1/rnz(350).
- Verification: seed0116 **6246→6373** Scr **101→107**/127;
  green+strict; cohort **30/30**. seed5006 still @8468.
- Next: seed0116 @6373 getbones / `print_dungeon` `^V?` /
  seed0373 / seed5006 dosounds.

## 2026-07-16 16:42 — #573 D-0516 zap_dig WAN_DIGGING
- Objective: seed0116 @5910 C `zap_dig` rn1(18,8) vs JS rn2(5).
- C locus: `zap.c` `weffects`; `dig.c` `zap_dig`.
- Change: `zap_dig` horizontal beam + door/maze/obstructed dig;
  `weffects` dig dispatch.
- Verification: seed0116 **5910→6246** Scr **79→101**/127;
  green+strict; cohort **30/30**. seed5006 still @8468.
- Next: seed0116 @6246 moveloop / seed5006 `dosounds` /
  seed0373 `print_dungeon`.

## 2026-07-16 16:40 — #572 D-0515 ^V level_tele numeric
- Objective: near-miss survey — shared getbones blockers.
- C locus: `cmd.c` wizlevelport; `wizcmds.c` `wiz_level_tele`;
  `teleport.c` `level_tele`; `dungeon.c` `get_level`; `allmain.c`
  `deferred_goto` after rhack.
- Change: bind `^V`; wizard getlin numeric → `get_level` →
  `schedule_goto`; moveloop `deferred_goto`.
- Verification: seed0116 **2978→5910** Scr **9→79**; seed5006
  **4182→8468** Scr **4→121**; green+strict; cohort **28/28**.
  seed0373 still @2549 (`print_dungeon` `?`). Suite survey **30/44**.
- Next: seed0116 `zap_dig` / seed5006 `dosounds` / seed0373 menu.
