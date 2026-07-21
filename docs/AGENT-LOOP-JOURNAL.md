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
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 15:05 — #1166 unmap_object map_background + fight_empty

- Objective: seed4500 @1048 Blind map `:_` vs C DEC ROOM `~~`.
- C locus: `display.c` `unmap_object` (background not objects);
  `hack.c` `domove_fight_empty` always unmap.
- Change: `map_background` + fix `unmap_object`; fight_empty always
  unmap (+ boulder/statue remap); export `map_object` (D-0928 #1166).
- Verification: green+strict PASS; cohort 19/19; prefix **@1048→@1053**;
  Scr **1434→1413**.
- Next: @**1053** carrots alternate-weapons prinv vs bites.

## 2026-07-21 14:49 — #1165 public score + Blind ice diagnosis

- Objective: cadence full `sessions` @#1165; diagnose seed4500 @1048.
- C locus: `display.c` `feel_location` / Blind memory vs `map_object`
  (Punished chain + corpse); ICE typ still suspected under C `~~`.
- Change: docs only — Score **42**/44 Scr **11024**/11405 RNG
  **100%** `30+0.25/turn`; @1048 = 2 cells C ice vs JS `:`/`_`.
- Verification: green+strict PASS; focused seed4500 **1434**/1814.
- Next: C dump typ/glyph at map `(42,6)`/`(43,6)`, or port
  `feel_location` / ice persistence (D-0928).

## 2026-07-21 14:42 — #1164 makemon_appear_msg wizgenesis

- Objective: seed4500 @1034 invent `appears close by` vs C path.
- C locus: `makemon.c` !MM_NOMSG appear Norep (Amonnam +
  next2u(**requested** x,y) + MM_NOEXCLAM); `read.c`
  `create_particular_creation` has no caller pline.
- Change: drop invent create_particular appear; add
  `makemon_appear_msg` + await from creation (D-0928 #1164).
- Verification: green+strict PASS; cohort 36/36; Scr **1433→1434**;
  prefix **@1034→@1048**.
- Next: @**1048** Blind map `(41,7)`/`(42,7)` C `~~` vs JS `:_`.

## 2026-07-21 14:36 — #1163 waterbody_name Medusa shallow sea

- Objective: seed4500 @1001 C `shallow sea` vs JS `moat`.
- C locus: `pager.c` `waterbody_name` MOAT → `Is_medusa_level`
  / juiblex / samurai-qstart / hallu; ICE; waterlevel wall.
- Change: `hack.js` `waterbody_name` ports those arms; SURFACE_AT
  drawbridge still deferred (D-0928 #1163).
- Verification: green+strict PASS; cohort 36/36; Scr **1431→1433**;
  prefix **@1001→@1034**.
- Next: @**1034** C empty vs JS `A minotaur appears close by.`
  (`create_particular` invents pline).

## 2026-07-21 14:32 — #1162 zap_over_floor hissing-gas Norep

- Objective: seed4500 @997 C hissing gas vs JS fire-blast hits-you.
- C locus: `zap.c` `zap_over_floor` ZT_FIRE/is_pool → `Norep`;
  `hit` via objnam `The`.
- Change: async fire-pool Norep (+ Deaf/waterlevel/MOAT see_it);
  `hit_zap` uses objnam `The`; await from `dobuzz` (D-0928 #1162).
- Verification: green+strict PASS; cohort 36/36; Scr **1427→1431**;
  prefix **@997→@1001**.
- Next: @**1001** C `shallow sea` vs JS `moat` (`waterbody_name`).

## 2026-07-21 14:25 — #1161 wakeup wake_msg + growl

- Objective: seed4500 @985 JS nymph disarm vs C wakes up.
- C locus: `mon.c` `wake_msg`/`wakeup`; `sounds.c` `growl` →
  `wake_nearto` wake_msg.
- Change: async `wake_msg` before clear sleep; `was_sleeping` →
  dynamic-import `growl`; sounds `wake_nearto` awaits wake_msg
  (D-0928 #1161).
- Verification: green+strict PASS; cohort 36/36; Scr **1423→1427**;
  prefix **@985→@997**.
- Next: @**997** C `You hear hissing gas` vs JS fire-blast order.

## 2026-07-21 14:16 — #1160 score + lastseentyp savelev/getlev

- Objective: cadence full `sessions` + seed4500 @941 `#overview`
  extra Level-1 / Mines-5 fountains.
- C locus: `save.c`/`restore.c` Sfo/Sfi_schar `lastseentyp` with
  savelev/getlev; JS in-memory stash had omitted it.
- Change: `do.js` `goto_level` clone lastseentyp into `level_info`
  and restore on getlev (D-0928 #1160).
- Verification: green+strict PASS; cohort PASS; full `sessions`
  **42/44** Scr **11013**/11405 RNG **100%**; seed4500
  **1412→1423**; @941 OK.
- Next: seed4500 @985 wood nymph disarm vs wake (D-0928).

## 2026-07-21 14:12 — #1159 D-0928 goto_level climb great_effort

- Objective: seed4500 @929 C climb-stairs `--More--` vs JS Dlvl:6.
- C locus: `do.c` `goto_level` — `great_effort = Punished && !Levitation`
  + `u_locomotion("climb")` + Flying ladder " along".
- Change: `do.js` climb pline (Levitation/Flying helpers); poly
  locomotion / steed-flyer deferred.
- Verification: green+strict PASS; cohort 12/12; Scr **1409→1412**;
  prefix **@929→@941**.
- Next: seed4500 @941 `#overview` extra Level-1 fountain + Mines 5
  (D-0928).

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

## 2026-07-21 13:42 — #1155 score + D-0929 pager overlay
- Objective: cadence full `sessions`; document suite drop.
- C locus: `wintty.c` / `pager.js` `show_nhw_menu_text` overlay
  `_pending_message` (bisect #1151 `5bc9b1ad`).
- Change: docs only — Score **38/44** Scr **10974**/11405 RNG
  **100%** `29+0.25/turn`; D-0929 open; primary = narrow pager
  restore (not blanket revert; keep teleds placebc).
- Verification: green+strict PASS; full sessions recorded; pager-only
  revert falsifies (0006/0007/0009/0360 PASS, seed4500 **1389→1381**).
- Next: gate overlay keep/restore to look_here/getpos; then @893
  `#overview` Level 3 vs 25.

## 2026-07-21 13:37 — #1154 stairs_description depth
- Objective: seed4500 @832 stair “level 5” vs JS “level 1”.
- C locus: `stairs.c` `stairs_description` (`depth` / `dunlev`).
- Change: `mklev.js` use `depth_of_level` unless quest/knox.
- Verification: green+strict PASS; cohort 14/14; Scr **1388→1389**;
  prefix **@832→@893**.
- Next: @**893** `#overview` Level 3 (shop+fountain) vs Level 25.

## 2026-07-21 13:32 — #1153 maybe_wail CwnAnnwn
- Objective: seed4500 @831 CwnAnnwn `--More--` vs JS staircase getpos.
- C locus: `hack.c` `maybe_wail` / `losehp` (uhp*10 < uhpmax).
- Change: `hack.js` `maybe_wail` + `finish_maybe_wail`; `ball.js`
  `drag_down` + `do.js` stair-fall await finish. Soundeffect deferred.
- Verification: green+strict PASS; cohort 14/14; Scr **1386→1388**;
  prefix **@831→@832**.
- Next: @**832** C stair up to level **5** vs JS **1**.

## 2026-07-21 13:26 — #1152 mkstairs dunlev-end no-op
- Objective: seed4500 @814 C floor vs JS stair `<` on Mines map.
- C locus: `mklev.c` `mkstairs` — no stairs off dungeon ends
  (`dunlev==1` up / botlevel down); minefill `des.stair("up")`.
- Change: `mklev.js` `mkstairs` early-return + `generate_stairs`
  skip down on `Is_botlevel`. Branch via `place_branch` unchanged.
- Verification: green+strict PASS; cohort 14/14; Scr **1366→1386**;
  prefix **@814→@831**.
- Next: @**831** C `You hear the howling of the CwnAnnwn...--More--`.
