# Agent loop journal archive (rotated @#1155)

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

