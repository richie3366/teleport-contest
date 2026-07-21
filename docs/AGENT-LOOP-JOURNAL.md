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
- Objective: ...
- C locus: ...
- Change: ...
- Verification: ...
- Next: ...
```

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

## 2026-07-21 13:16 — #1151 teleds placebc + overlay topline
- Objective: seed4500 @789 C `Things that are here:` chain/ball
  `--More--` vs JS map-only after ^T stairs.
- C locus: `teleport.c` `teleds` unplacebc/placebc; `wintty.c`
  `display_nhwindow(WIN_MESSAGE,FALSE)` leaves getpos glyphs.
- Change: `teleport.js` teleds Punished ball/chain place; `pager.js`
  overlay keeps/restores `_pending_message` across dismiss.
- Verification: green+strict PASS; cohort 7/7; Scr **1147→1366**;
  prefix **@789→@814**.
- Next: @**814** C floor `·` vs JS stair `<` on map.

## 2026-07-21 13:07 — #1150 score + doname FOOD oeaten
- Objective: cadence full `sessions`; seed4500 @753 invent
  `partly eaten apple`.
- C locus: `objnam.c` `doname_base` FOOD_CLASS `oeaten` →
  `partly eaten `; `greased ` before class switch.
- Change: `objnam.js` `doname` greased + FOOD oeaten prefixes
  (before `just_an`). CORPSE/EGG/`partly used` deferred.
- Verification: green+strict PASS; cohort 8/8; Scr **1146→1147**;
  @753 OK. Suite **42/44** Scr **10737**/11405 RNG **100%**
  `30+0.25/turn`.
- Next: @**789** stairs `Things that are here:` chain/ball More.

## 2026-07-21 13:05 — #1149 self_lookat Punished + bare ball
- Objective: seed4500 @787 C `…chained to a heavy iron ball` vs JS.
- C locus: `pager.c` `self_lookat` Punished; `objnam.c`
  `minimal_xname` bareobj owt=0 → `ansimpleoname` never `very `.
- Change: `pager.js`/`getpos.js` Punished suffix; `objnam.js`
  `simpleonames` BALL → `heavy iron ball` (xname/doname keep `very `).
- Verification: green+strict PASS; cohort 7/7; Scr **1142→1146**;
  @787 OK.
- Next: @**753** invent `partly eaten apple` vs bare `apple`.

## 2026-07-21 13:00 — #1148 getobj_takeoff yn leave toplines
- Objective: seed4500 @751 C takeoff prompt after `e` vs JS blank.
- C locus: `invent.c` getobj → `yn_function` leaves `gt.toplines`;
  `do_wear.c` delayed `armoroff` (no immediate `off_msg`).
- Change: `do_wear.js` `getobj_takeoff` → `yn_function` +
  `mark_topline_prompt` on success (stop clearing pending msg).
- Verification: green+strict PASS; cohort 7/7; Scr **1141→1142**;
  prefix **@751→@787**.
- Next: @**787** C `self_lookat` Punished `, chained to … ball`.

## 2026-07-21 12:55 — #1147 docallcmd getobj name_ok + do_oname
- Objective: seed4500 @707 C `#name` `[a-km or ?*]` vs JS `[?]`.
- C locus: `do_name.c` `name_ok` / `docallcmd` case `i` /
  `do_oname`; `invent.c` `getobj`.
- Change: `do_name.js` — replace invent stub with `getobj_name`
  (SUGGEST+compactify, `?`/`*`) + `do_oname` getlin/`oname`.
- Verification: green+strict PASS; cohort 8/8 (0102/0106/0383/0399/
  1500/1800+green); Scr **1120→1141**; prefix **@707→@751**.
- Next: @**751** C `take off? [cdef or ?*]` vs JS blank.

## 2026-07-21 12:48 — #1146 enhance_weapon_skill wizard y_n/speedy
- Objective: seed4500 @630 C wizard `#enhance` y_n vs JS skills menu.
- C locus: `weapon.c` `enhance_weapon_skill` / `can_advance` /
  `skill_advance` / `add_skills_to_menu`.
- Change: wizard `yn_function`, can/could/peaked/slots/`skill_advance`,
  wizard practice columns, speedy PICK_ONE loop, `bot()` after dismiss.
- Verification: green+strict PASS; cohort 5/5 (0106/0383/0399/1500/1800);
  Scr **1001→1120**; prefix **@630→@707**.
- Next: @**707** C `#name` `[a-km or ?*]` vs JS `[?]`.
