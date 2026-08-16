# Rotated from AGENT-LOOP-JOURNAL.md after D-1061 / #1337

## 2026-08-16 01:10 — #1322 D-1051 apply u_wipe_engr + S_goodpos tmp_at

**Objective:** Must-fix D-1022 risk 7 — `u_wipe_engr` / `tmp_at`
no-ops in apply: wire them as C.
**C locus:** `engrave.c` `u_wipe_engr` (~264); `apply.c`
`display_polearm_positions` / `display_grapple_positions` /
`display_jump_positions`; `defsym.h` S_goodpos.
**Change:** real `u_wipe_engr` → `can_reach_floor`+`wipe_engr_at`.
Pole/grapple/jump hilite loops call existing `tmp_at(DISP_BEAM,
S_goodpos '$' HI_ZAP)`. Named: allmain/dokick/uhitm wipe callers;
getpos default Normal (paint on `$`). Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/jump cohort **6**/6
(seed0361 Scr **366**/366; seed4500 **1814**/1814). Private
**7**/7. Path **unhit**.
**Next:** Must-fix cursed-lamp `make_glib` HGlib|EGlib (D-1023).
**Blocked:** none.

## 2026-08-15 21:30 — #1309 D-1042 find_mac minvent ARM_BONUS

**Objective:** Must-fix review 02 item 1 — `find_mac` walk monster
`minvent` worn `ARM_BONUS` / amulet of guarding (thitmonst tmp).
**C locus:** `worn.c` `find_mac` (~717–735); `hack.h` `ARM_BONUS`.
**Change:** port the walk in `worn.js`; `mhitm.js` import+re-export
(local binding; re-export-only left `find_mac` undefined in mattackm).
Guarding −2 not `spe`/erosion; `AC_MAX` cap after the walk. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/combat/zap cohort **8**/8
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick; seed2200
zap). Private node **11**/11. Path **unhit** by public traces.
**Next:** Must-fix `should_mulch_missile` hero `!rnl(4)`.
**Blocked:** none.
