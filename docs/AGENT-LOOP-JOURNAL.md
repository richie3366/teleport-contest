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

## 2026-07-20 00:31 — #930 D-0808 Wiz firsttime + score
- Objective: cadence full `sessions` + seed0360 @373 materialize More.
- C locus: `dat/quest.lua` Wiz `firsttime`; `quest.c` `on_start`.
- Change: **D-0808** `js/questpgr.js` Wiz firsttime text. Score
  **37/44**; Scr **8679**/11405 (**+56** vs #925); RNG **652181**
  (82.26%, **0**); speed `36+0.21/turn`. seed0360 Scr **670→673**;
  prefix **373→395**.
- Verification: green+strict PASS; cohort 12/12 PASS; full suite.
- Next: @395 `unexplored area (no travel path)` vs bare message.

## 2026-07-20 00:24 — #929 D-0807 sel_set_ter lava lit
- Objective: seed0360 @324 C DEC lava `` ` `` vs JS blank (orcus).
- C locus: `mkmaze.c` `set_levltyp` — `IS_LAVA(newtyp) → lit=1`
  (hell_tweaks / des.terrain keep lit under SET_LIT_NOCHANGE).
- Change: `js/mklev.js` `sel_set_ter` force lit on IS_LAVA; orcus
  region unlit → sel_set_lit (lava stays lit). Named: other inline
  `loc.lit=false` loops.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360
  Scr **638→670**/833; prefix **324→373**; RNG FULL.
- Next: @373 fakewiz1 materialize C `--More--` vs JS heat/smoke.

## 2026-07-20 00:16 — #928 D-0806 mazewalk ftyp ROOM
- Objective: seed0360 @318 C `·` vs JS `#` on baalz materialize+hot.
- C locus: `sp_lev.c` `lspo_mazewalk` — 3-arg form ftyp=ROOM;
  corrmaze only gates wallify / `ftyp<1` substitute.
- Change: `js/mklev.js` `splev_mazewalk` default typ=ROOM (was
  corrmaze→CORR). Named: table-form typ optional.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **633→638**/833; prefix **318→324**; RNG FULL.
- Next: @324 Dlvl:40 materialize C DEC lava `` ` `` vs JS blank.
## 2026-07-20 00:05 — #927 D-0805 Rogue arrival + graphics
- Objective: seed0360 @301 materialize `--More--` / `*:0` / `.` floors.
- C locus: `do.c` `goto_level` Rogue pline + `assign_graphics`;
  `symbols.c` / `display.c` Rogue nocolor.
- Change: `js/do.js` + `js/display.js` — ROGUESET swap, gold `*`,
  DEC off, nocolor strip, first-visit primitive pline. Named:
  RogueIBM / full showsyms / knox / bigroom.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **628→633**/833; prefix **301→318**; RNG FULL.
- Next: @318 materialize+hot C `·` vs JS `#` (3,18).
## 2026-07-19 23:56 — #926 D-0804 flip_level object piles
- Objective: seed0360 @249 JS `%` vs C `/` after ^V Sokoban-4 materialize.
- C locus: `sp_lev.c` `flip_level` — swap `level.objects` with terrain.
- Change: `js/mklev.js` — stop fobj nexthere rebuild; swap `_objects_at`
  with cell flip; buried coord flip. Named: monsters[][] / drawbridge.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **617→628**/833; prefix **249→301**; RNG FULL.
- Next: @301 materialize `--More--` (Dlvl:18).
## 2026-07-19 23:47 — #925 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no peel).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8623**/11405 (**+98** vs #920); RNG
  **652181**/792838 (82.26%, **+7528** = D-0800…D-0803 soak); speed
  `36+0.21/turn` R² 0.796. seed0360 suite Scr **617**/833 @249.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: seed0360 @249 ^V materialize map cells (no FORCE).
## 2026-07-19 23:45 — #924 D-0803 Sokoban cant_squeeze
- Objective: seed0360 @231 vain-push vs `cannot pass that way.`
- C locus: `hack.c` `test_move` / `cant_squeeze_thru` case 3.
- Change: hero squeeze after `blocksMove`, before `moverock`; export
  `bad_rock`/`cant_squeeze_thru` (Sokoban→3). Named: can_fog/worm_cross.
- Verification: green+strict PASS; cohort 37/37 PASS; seed0360 Scr
  **616→617**/833; prefix **231→249**; RNG FULL.
- Next: @249 ^V materialize map cells.
## 2026-07-19 23:39 — #923 D-0802 lit grow minetn/minend
- Objective: seed0360 @180 leave-Gehennom blank BROWN walls.
- C locus: `sp_lev.c` `lspo_region` 2-arg `selection_do_grow` + lit.
- Change: `load_minetn_5`/`load_minend_2` use `light_region` (wall
  expand when lit). Named: castle/other interior lit; minetn-1/3/4/6/7.
- Verification: green+strict PASS; cohort 35/35 PASS; seed0360 Scr
  **589→616**/833; prefix **180→231**; RNG FULL.
- Next: @231 boulder push message divergence.
## 2026-07-19 23:26 — #922 D-0801 Valley/smoke/Geh wall
- Objective: seed0360 screen residual @164 missing `--More--`.
- C locus: `do.c` goto_level Valley + hellish_smoke_mesg; `display.h`
  cmap_walls_to_glyph / wall_color(gehennom_walls).
- Change: Valley arrival plines + gehennom_entered; smell/sense smoke;
  heat/smoke gone; wall_glyph CLR_RED in hellish. Named: ACH_HELL; knox.
- Verification: green+strict PASS; cohort 34/34 PASS; seed0360 Scr
  **561→589**/833; prefix **164→180**; RNG FULL.
- Next: @180 leave-Gehennom remembered walls (map memory).
## 2026-07-19 23:16 — #921 D-0800 Wiz-loca/fila/filb
- Objective: seed0360 @113103 getbones → lua shuffle vs JS rn2(79).
- C locus: `dat/Wiz-loca.lua` / `Wiz-fila.lua` / `Wiz-filb.lua`; `sp_lev.c`.
- Change: `load_wiz_loca` + `load_wiz_fila`/`load_wiz_filb` + dispatch.
  Named omissions: Wiz-goal; humidity get_location; m_dowear; hellfill/fakewiz.
- Verification: green+strict PASS; cohort 20/20 PASS; seed0360 RNG
  **FULL 120639**; Scr **519→561**/833.
- Next: seed0360 screen residual (RNG matched); or parked 0399/0014.
## 2026-07-19 23:10 — #920 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only handoff).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8525**/11405; RNG **644653**/792838 (81.31%);
  speed `35+0.21/turn`. Δ vs #915: Scr **+128**, RNG **+839**, PASS **0**
  (D-0798/D-0799). seed0360 still **113111**/519 @113103.
- Verification: green+strict PASS; full suite exit 0 with 37/44.
- Next: seed0360 @113103 C lua shuffle after matched getbones vs JS rn2(79).
## 2026-07-19 23:08 — #919 D-0799 set_apparxy can_fog
- Objective: seed0360 @112857 C distfleeck vs JS set_apparxy.
- C locus: `monmove.c` `can_fog` / `set_apparxy` closed_door arm.
- Change: **D-0799** — vampshifter bat Displacement image on locked
  door needs `can_fog`; JS stub was false. Prefix **112857→113103**;
  RNG **113111**; Scr **519**.
- Verification: green+strict PASS; cohort 37/37 PASS; DIAG removed.
- Next: @113103 C lua shuffle after matched getbones vs JS rn2(79).
## 2026-07-19 23:00 — #918 D-0798 quest Home ok_to_quest gate
- Objective: seed0360 @112279 C fleeck vs JS getbones (umov theory).
- C locus: `do.c` `goto_level` quest-home arm; `quest.c` `ok_to_quest`.
- Change: **D-0798** — falsified umov surplus; C mysterious-force after
  ^V `A` (Wiz-goal) from Home; JS ported gate. Prefix **112279→112857**;
  Scr **504→519**; RNG **112956**.
- Verification: green+strict PASS; cohort 35/35 PASS; DIAG removed.
- Next: @112857 C distfleeck vs JS set_apparxy (mux-image).
## 2026-07-19 22:46 — #917 D-0797 acurr GoP + umov peel
- Objective: seed0360 @112279 C fleeck vs JS rn2(3).
- C locus: `attrib.c` `acurr` GoP/`STR19(25)`; moveloop umovement after EOT62.
- Change: **D-0797** `js/attrib.js` GoP + Dunce. Falsified same-site
  fleeck theory — JS `getbones` after early hero (`umov=12` vs C `<12`).
  FORCE −12/MOD →112574. Scr **391→504**; peel still @112279.
- Verification: green+strict PASS; cohort 9/9 PASS; DIAG removed.
- Next: C path leaving `umovement<12` after EOT62 (surplus +12).
## 2026-07-19 22:30 — #916 D-0796 castmu HASTE_SELF
- Objective: seed0360 @112243 apprentice leftover (D-0794).
- C locus: `mcastu.c` `MCAST_HASTE_SELF` → `mon_adjust_speed`; `mcalcmove` MFAST.
- Change: **D-0796** `js/mcastu.js` HASTE_SELF + CURE_SELF. Closes D-0794
  (was deferred spell body, not PRE skip). Prefix **112243→112279**;
  focused RNG **112272→112326**.
- Verification: green+strict PASS; cohort 12/12 PASS; DIAG removed.
- Next: @112279 C fleeck vs JS rn2(3) after EOT62.
