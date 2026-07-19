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

## 2026-07-20 01:36 — #939 D-0817 blank S_stone non-travel
- Objective: seed0360 @678 C `stone` vs JS `unexplored area` (^T).
- C locus: `pager.c` lookat case S_stone (+ TER_DETECT gbuf).
- Change: **D-0817** `auto_describe_text` blank→stone via
  seenv/lastseentyp without travelmode; TER_DETECT stays
  unexplored. Scr **824→826**; @678–679 fixed.
- Verification: green+strict PASS; seed0012/1500/1800/0004/
  0060/0361 PASS; RNG FULL.
- Next: @719 `Can't find dungeon feature '_'` (feature matching).

## 2026-07-20 01:32 — #938 D-0816 tele_restrict + wildmiss
- Objective: seed0360 @668 tengu teleport More vs unknown-dir '7'.
- C locus: `teleport.c` tele_restrict; `mhitu.c` wildmiss Displaced.
- Change: **D-0816** (1) async tele_restrict canseemon pline;
  (2) wildmiss + !foundyou skipnonmagc. Scr **818→824**; @668–677 fixed.
- Verification: green+strict PASS; cohort 35/35 PASS; RNG FULL.
- Next: @678 stone vs unexplored (post-^T getpos).

## 2026-07-20 01:20 — #937 D-0815 getpos door + visctrl
- Objective: seed0360 @632 travel `closed door` vs `unexplored area`.
- C locus: `pager.c` lookat door defsyms; `getpos.c` unknown-dir
  `visctrl((char)c)`.
- Change: **D-0815** (1) `cmap_defsym_explanation` DOOR arms
  (doorway/open/broken/closed); (2) unknown-direction uses `visctrl`.
  Scr **812→818**; @632–661 fixed.
- Verification: green+strict PASS; cohort 15/15 + 6/6 PASS; RNG FULL.
- Next: @668 tengu teleport More vs unknown-direction `'7'`.

## 2026-07-20 01:15 — #936 D-0814 wiz_map traps + blocked stair
- Objective: seed0360 @624 residual (NOTES said blocked stair).
- C locus: `wizcmds.c` wiz_map; `detect.c` show_map_spot map_trap;
  `pager.c` do_screen_description blocked staircase.
- Change: **D-0814** (1) wiz_map walks `level.traps` (ftrap empty);
  (2) show_map_spot uses `map_trap` not newsym for tseen; (3) blocked
  staircase down when qstart !ok_to_quest. Scr **694→812**.
- Verification: green+strict PASS; cohort 15/15 PASS; seed0360 RNG FULL.
- Next: @632 travel `closed door` vs `unexplored area`.

## 2026-07-20 01:02 — #935 D-0813 TRAVP_VALID + travel stone
- Objective: cadence full score + seed0360 @539 stone (no travel path).
- C locus: `hack.c` is_valid_travelpt/findtravelpath(TRAVP_VALID);
  `pager.c` lookat S_stone.
- Change: **D-0813** VALID BFS hero→dest; travel blank+lastseentyp→stone.
  Scr **689→694**; prefix **539→624**. Cadence **37/44** Scr **8702**.
- Verification: green+strict PASS; cohort 12/12; seed0012 PASS; full suite.
- Next: @626 `blocked staircase down` (qstart !ok_to_quest).

## 2026-07-20 00:53 — #934 D-0812 lookat ROOM darkroom
- Objective: seed0360 @531 C `dark part of a room` vs JS `floor of a room`.
- C locus: `pager.c` `lookat` S_darkroom / NOTHING; `display.c` newsym
  !cansee S_room→DARKROOMSYM when !waslit||(dark_room&&use_color).
- Change: **D-0812** `room_cmap_explanation` in getpos (+ pager brief_at /
  describe_looked). Scr **684→689**; prefix **531→539**.
- Verification: green+strict PASS; cohort **35/35** PASS.
- Next: @539 `stone (no travel path)` vs `unexplored area`.

## 2026-07-20 00:48 — #933 D-0811 lookat CLOUD fog/vapor
- Objective: seed0360 @523 C `fog/vapor cloud` vs JS `unexplored area`.
- C locus: `pager.c` `lookat` case `S_cloud` (+ `Is_airlevel`).
- Change: **D-0811** `getpos`/`pager` CLOUD → fog/vapor / cloudy area.
  Scr **679→684**; prefix **523→531**.
- Verification: green+strict PASS; cohort **35/35** PASS.
- Next: @531 `dark part of a room` vs `floor of a room`.

## 2026-07-20 00:45 — #932 D-0810 setworn no find_ac
- Objective: seed0360 @497 C `AC:2` vs JS `AC:-2` displacement More.
- C locus: `worn.c` `setworn`; `do_wear.c` `Cloak_on`; delay-0 unmul.
- Change: **D-0810** `setworn`/`Cloak_on` never early `find_ac`;
  GUARDING amulet explicit `makeknown`+`find_ac`. Scr **678→679**;
  prefix **497→523**.
- Verification: green+strict PASS; cohort **35/35** PASS.
- Next: @523 farlook fog/vapor `~` vs unexplored `·`.

## 2026-07-20 00:36 — D-0809 travel "(no travel path)"
- Objective: seed0360 @395 C `unexplored area (no travel path)` vs bare.
- C locus: `getpos.c` `auto_describe` + `hack.c` `is_valid_travelpt`.
- Change: export `is_valid_travelpt`; getpos appends suffix in travel mode.
- Verification: green+strict PASS; cohort 8/8; seed0360 Scr **673→678**/833.
- Next: @497 C `AC:2` vs JS `AC:-2` on cloak-of-displacement wear More.

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
