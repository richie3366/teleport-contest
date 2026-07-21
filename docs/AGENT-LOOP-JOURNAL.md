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

## 2026-07-21 12:40 — #1145 score + interest_mapseen overview
- Objective: cadence full `sessions`; seed4500 @614 `#overview`
  DoD25/Gehennom40 vs JS current-only `(end)`.
- C locus: `dungeon.c` `interest_mapseen` / `traverse_mapseenchn` /
  `show_overview`.
- Change: ported `interest_mapseen`; `#overview` lists furthest-reached
  (+ OF_INTEREST / annotations); endgame-first order deferred.
- Verification: green+strict; cohort 6/6 (0106/0383/0399/1500+green);
  full **42/44** Scr **10591**/11405 RNG **100%**; seed4500 Scr
  **1000→1001**; prefix **@614→@630**.
- Next: @**630** C wizard `#enhance` `Advance skills without practice?`
  vs JS skills menu.

## 2026-07-21 12:33 — #1144 select_menu_pick_any MENU_SELECT_ALL
- Objective: seed4500 @559 `#wizintrinsic` `.` all-page `+` vs only a/r.
- C locus: `wintty.c` `process_menu_window` MENU_SELECT_ALL/PAGE.
- Change: `options.js` `select_menu_pick_any` SELECT_ALL/PAGE,
  UNSELECT/INVERT, `>`/`</`/`^`/`|`; ESC clears selections.
- Verification: green+strict; cohort 4/4; Scr **999→1000**; prefix
  **@559→@614**.
- Next: @**614** C `#overview` dungeon text vs JS corner `(end)`.

## 2026-07-21 12:30 — #1143 wizidentify Debug Identify unid_cnt==0
- Objective: seed4500 @541 `#wizidentify` unknown vs C Debug Identify.
- C locus: `wizcmds.c` `wiz_identify`; `invent.c` `display_pickinv` wizid
  (`override_ID`, `unid_cnt==0` all-identified strings).
- Change: `wiz_identify` + EXT_CMDS `wizidentify`; `display_pickinv_wizid`
  corner menu for `unid_cnt==0` (unid>0 PICK_ANY deferred).
- Verification: green+strict; cohort 8/8; Scr **998→999**; prefix
  **@541→@559**.
- Next: @**559** C `#wizintrinsic` all page-1 `+` after `a`/`r` vs JS
  only `a`/`r`.

## 2026-07-21 12:22 — #1142 dodiscovered NHW_TEXT pages + VENOM
- Objective: seed4500 @521 discoveries polearm `--More--` vs JS map.
- C locus: `o_init.c` `dodiscovered`; `wintty.c` NHW_TEXT putstr page-at-a-time;
  VENOM_CLASS append to `inv_order`.
- Change: `dodiscovered` → `show_text_pages` (attr-aware); append Venoms.
- Verification: green+strict; cohort 8/8; Scr **995→998**; prefix
  **@521→@541**.
- Next: @**541** C `#wizidentify` Debug Identify vs JS unknown extcmd.

## 2026-07-21 12:14 — #1141 BALL very/chained + check_here uchain
- Objective: seed4500 @517/@518 iron ball/chain look + doname.
- C locus: `objnam.c` xname BALL / doname_base BALL|CHAIN;
  `pickup.c` `check_here` skip `uchain`.
- Change: `pretty_base` `very ` when `owt>oc_weight`; doname
  `(chained|attached to you)`; `check_here` skips `uchain`.
- Verification: green+strict; cohort 8/8; Scr **970→995**; prefix
  **@517→@521**.
- Next: @**521** C discoveries polearm menu `--More--` vs JS map.

## 2026-07-21 12:08 — #1140 score + makeplural singplur_compound
- Objective: cadence full `sessions` @#1140; seed4500 @372 scroll plural.
- C locus: `objnam.c` `singplur_compound` / `makeplural` / `makesingular`.
- Change: JS `singplur_compound` (`labeled`/`called`/`named`/…); score
  docs **42/44** Scr **10560**/11405 RNG **100%** `31+0.26/turn`.
- Verification: green+strict; cohort 6/6; seed4500 Scr **969→970**.
- Next: @**517**/@**518** BALL `very ` + `(chained to you)` / chain look.

## 2026-07-21 12:05 — #1139 hideunder You_see + statue simpleonames
- Objective: seed4500 @292 shimmering --More-- vs finish-prayer append.
- C locus: `mon.c` hideunder You_see; `objnam.c` minimal_xname corpsenm=NON_PM;
  `mondata.c` locomotion.
- Change: hideunder You_see + locomotion/y_monnam/ansimpleoname; simpleonames
  statue/figurine bare type (not "of a …").
- Verification: green+strict PASS; cohort 6/6; Scr **966→969**.
- Next: @**372** `scrolls labeled KIRJE` vs `scroll labeled KIRJEs`.

## 2026-07-21 11:55 — #1138 doset fruit getlin + menu page keys
- Objective: seed4500 @237 `Set fruit to what?` vs Options.
- C locus: `options.c` doset_simple_menu Comp getlin/`optfn_fruit`;
  `wintty.c` MENU_NEXT_PAGE `>` (space finishes last; `>` does not).
- Change: `doset_compound_via_getlin` + fruitadd subset; pick_one
  `>`/`<`/`^`/`|`; `give_opt_msg=false` in doset_simple.
- Verification: green+strict PASS; cohort 6/6; Scr **954→966**.
- Next: seed4500 screen peel (Scr **966**/1814).

## 2026-07-21 11:40 — #1137 getpos flush_screen(0) last-glyph curs
- Objective: seed4500 @195 jump cursor (cells OK).
- C locus: `getpos.c` curs+`flush_screen(0)`; `getpos_sethilite`
  force-newsyms; `wintty.c` print_glyph advances past map_x.
- Change: force-newsyms on getvalid change; `flush_screen_getpos_dirty`;
  clear `gnew` on full rebuild; pre-loop dirty flush (later iters full).
- Verification: green+strict PASS; cohort 6/6; Scr **950→954**; @195 match.
- Next: @**237** `Set fruit to what?` vs Options.

