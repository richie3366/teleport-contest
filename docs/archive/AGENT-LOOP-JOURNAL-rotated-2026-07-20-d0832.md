# Agent loop journal (rotated 2026-07-20 D-0832)

Older crumbs moved out of hot `docs/AGENT-LOOP-JOURNAL.md`.

## 2026-07-20 03:13 — #949 D-0826 postmov engulfer u_on_newpos
- Objective: seed0383 @10374 post-swallow fleeck vs engulfer mattacku.
- C locus: `monmove.c` postmov `engulfing_u`→`u_on_newpos`.
- Change: port that arm. Falsified as @10374 cause (in-place attack).
  Refined: C skips PM_GNOME dochug; JS double-fleecks (fmon/skip next).
- Verification: prefix still **10374**; green+strict PASS; cohort 7/7.
- Next: which gnome dies / why C skips gnome at 46,2.

## 2026-07-20 02:51 — #948 D-0825 mattacku AT_ENGL + gulpmu
- Objective: seed0383 @10281 C `rnd(20)` mattacku vs JS `rn2(12)`.
- C locus: `mhitu.c` AT_ENGL/`gulpmu`; `monmove.c` engulfing_u→mattacku.
- Change: port AT_ENGL + partial gulpmu; wire dochug engulfing attack.
- Verification: prefix **10281→10374**; Scr **142**/219; green+strict;
  cohort 7/7.
- Next: @10374 post-swallow fleeck order (2 extra fleecks before engulfer).

## 2026-07-20 02:35 — #947 D-0824 monmove could_reach + may_passwall
- Objective: seed0383 @10024 m_move mtrack rn2(16) vs rn2(20).
- C locus: `dogmove.c` `could_reach_item`; `hack.c` `may_passwall` via
  `mon.c` `mfndpos`.
- Change: **D-0824** real `could_reach_item` in `monmove.js` + wire
  `may_passwall` in `mfndpos`. Prefix **10024→10281**.
- Verification: green+strict PASS; cohort 7/7; Scr still 141/219.
- Next: @10281 `mattacku` `rnd(20)` vs `rn2(12)`.

## 2026-07-20 02:15 — #946 D-0823 could_reach_item
- Objective: seed0383 @9709 obj_resists vs rn2(8) peel.
- C locus: `dogmove.c` `could_reach_item` / `dog_goal` APPORT gate.
- Change: **D-0823** real pool/lava/boulder reach check in
  `js/dogmove.js` (was always-true stub). Prefix **9709→10024**.
- Verification: green+strict PASS; cohort 10/10; Scr still 141/219.
- Next: @10024 `m_move` mtrack `rn2(16)` vs `rn2(20)`.

## 2026-07-20 02:09 — #945 score + D-0822 bigrm-12
- Objective: cadence full `sessions` + seed0383 first RNG peel.
- C locus: `dat/bigrm-12.lua`; `mkmaze.c` `makemaz`; `sp_lev.c`
  `load_special` / `noflipy`.
- Change: **D-0822** `js/mklev.js` `load_bigrm_12` + dispatch.
  Score **38/44**; Scr **8937**/11405 (**+96**); RNG **659766**
  (83.22%, **+7585**); speed `37+0.22/turn`. seed0383 Scr
  **45→141**; prefix **2493→9709**.
- Verification: green+strict PASS; full suite; cohort PASS.
- Next: @9709 `obj_resists` rn2(100) vs JS rn2(8).

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

