# Agent loop journal archive — rotated @#1170

Entries #1156–#1158.

## 2026-07-21 14:04 — #1158 D-0928 show_map_spot engraving

- Objective: seed4500 @902 map `` ` `` vs `·` after `#wizmap`.
- C locus: `detect.c` `show_map_spot` — `map_engraving` when
  `!IS_FURNITURE` and no tseen trap (`S_engroom`).
- Change: `detect.js` `show_map_spot` remaps `engr_at` via
  `map_engraving` after trap branch (wine-cellar engroom).
- Verification: green+strict PASS; cohort 14/14; Scr **1390→1409**;
  prefix **@902→@929**.
- Next: seed4500 @929 climb-stairs `--More--` vs JS Dlvl:6 (D-0928).

## 2026-07-21 13:55 — #1157 D-0928 mapseen overview shops/branches

- Objective: seed4500 @893 `#overview` Level 3 vs 25.
- C locus: `dungeon.c` `recalc_mapseen`/`room_discovered`/
  `recbranch_mapseen`/`shop_string`/`print_mapseen`;
  `detect.c` `show_map_spot`; `do.c` leave recalc + recbranch;
  `hack.c` special-room `room_discovered`.
- Change: msrooms + leave `recalc_mapseen`; find_mapseen keeps
  `lastseentyp`; `show_map_spot`→`room_discovered` (mapped shops);
  `recbranch_mapseen`; shop_string/branch/wizard proto print.
- Verification: green+strict PASS; cohort 14/14; Scr **1389→1390**;
  prefix **@893→@902**.
- Next: seed4500 @902 map `~` vs `·` / DEC walls (D-0928).

## 2026-07-21 13:44 — #1156 D-0929 look_here overlay leftover

- Objective: suite restore — narrow #1151 pager keep/restore.
- C locus: `invent.c` `look_here` `display_nhwindow(WIN_MESSAGE,FALSE)`
  + `wintty.c` NHW_MENU corner `tty_clear_nhwindow` no-op when EMPTY.
- Change: `show_nhw_menu_text(..., { keep_message_leftover })` only from
  `look_here`; other corner menus clear `_pending_message` again.
- Verification: green+strict PASS; 0006/0007/0009/0360 PASS; seed4500
  Scr **1389**; full `sessions` **42/44** Scr **10979**/11405 RNG 100%.
- Next: seed4500 @893 `#overview` Level 3 vs 25 (D-0928).

