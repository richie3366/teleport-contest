# Rotated from AGENT-LOOP-JOURNAL.md at #950

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

