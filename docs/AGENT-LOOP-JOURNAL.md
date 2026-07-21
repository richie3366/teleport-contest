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

## 2026-07-21 11:24 — #1136 getpos look_at_object auto_describe
- Objective: seed4500 @231 statue vs floor `(invalid target)`.
- C locus: `pager.c` `lookat`/`look_at_object`; `getpos.c` `auto_describe`.
- Change: `auto_describe_text` deferred objects → ROOM cmap. Port shown
  floor via `look_shown_at` + `distant_name`/`doname` (`TER_OBJ`).
- Verification: green+strict PASS; cohort 6/6; Scr **949→950**; @231 match.
- Next: @**195** jump cursor (cells OK); @**237** `Set fruit to what?`.

## 2026-07-21 11:16 — #1135 score + getpos S_ss1 '0'; screen peel
- Objective: cadence full `sessions`; seed4500 @136 feature `'0'`.
- C locus: `getpos.c` matching[] / `defsym.h` `S_ss1` `'0'`.
- Change: suite RNG closed 100% after #1134; `feature_match_tags('0')`
  → ss1 so Can't find… (was Unknown direction). Scr **947→949**.
- Verification: green+strict PASS; suite **42/44** Scr **10539**/11405
  RNG **792838**/792838 (100%) `29+0.25/turn`.
- Next: @**231** statue vs floor `(invalid target)`; cadence @#1140.

## 2026-07-21 11:10 — #1134 Kni-goal load_special; RNG complete
- Objective: seed4500 @107646 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Kni-goal.lua`; `sp_lev.c` `load_special`; `mkmaze.c` `makemaz`.
- Change: no Kni-goal loader → empty maze → ordinary `rn2(79)`. Port
  `load_kni_goal` (map + Mirror + stock + Ixoth/quasits/jellies) + dispatch.
- Verification: green+strict PASS; cohort 12/12; rng-diff **108275**/108275;
  runner Scr **941→947**.
- Next: seed4500 screen peel (RNG done); cadence @#1135.
