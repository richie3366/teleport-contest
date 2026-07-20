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
## 2026-07-20 02:05 — #944 D-0821 Displaced + speed boots
- Objective: seed0360 @828 ^X Attributes Displacement / Fast cause.
- C locus: `insight.c` Displaced; `attrib.c` from_what FAST/uarmf.
- Change: `invent.js` hero_Displaced line; `attrib.js` known boots +
  pair-of strip. Scr **832→833**/833 **PASS**; suite **38/44**.
- Verification: green+strict; cohort 38/38; full sessions PASS+1.
- Next: seed0383 hallu (seed0014/0399 parked).

## 2026-07-20 01:57 — #943 D-0820 Wiz locate_first
- Objective: seed0360 @780 materialize `--More--` / wisps locate.
- C locus: `dat/quest.lua` Wiz `locate_first`; `quest.c` `on_locate`.
- Change: `questpgr.js` Wiz locate_first/next. Scr **830→832**/833.
- Verification: green+strict PASS; cohort 35/35; RNG FULL.
- Next: @828 ^X Attributes missing Displacement cloak line.

## 2026-07-20 01:51 — #942 D-0819 getpos_help `?`
- Objective: seed0360 @729 getpos_help NHW_MENU + show_goal_msg.
- C locus: `getpos.c` `getpos_help` / help key → `show_goal_msg`.
- Change: `getpos.js` `getpos_help` via `show_nhw_menu_text`;
  `?` sets `show_goal_msg`. Scr **828→830**/833.
- Verification: green+strict PASS; cohort 13/13; RNG FULL.
- Next: @780 materialize `--More--` (level-tele `z`).

## 2026-07-20 01:44 — #941 D-0818 getpos feature `_`
- Objective: seed0360 @719 `Can't find dungeon feature '_'`.
- C locus: `getpos.c` matching[] / feature scan (`S_altar` defsym `_`).
- Change: `getpos.js` feature_match_tags + scan (altar/furniture/traps;
  `#` omitted for GETPOS_AUTODESC). Scr **826→828**/833.
- Verification: green+strict PASS; cohort 12/12; RNG FULL.
- Next: @729 `getpos_help` NHW_MENU first line + show_goal_msg.

## 2026-07-20 01:38 — #940 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no peel).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8834**/11405 (**+132** vs #935 = D-0814…D-0817
  soak); RNG **652181**/792838 (82.26%, **0**); speed `36+0.23/turn`
  R² 0.745. seed0360 suite Scr **826**/833 @719.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: seed0360 @719 getpos feature `_` (D-0817 next; no FORCE).

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
