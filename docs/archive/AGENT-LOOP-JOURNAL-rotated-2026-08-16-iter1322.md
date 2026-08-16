# Rotated from AGENT-LOOP-JOURNAL.md after review #1338

## 2026-08-16 01:20 — #1323 review D-1050/D-1051 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`4e55ff2f` D-1050, `7e389050` D-1051)
against pinned C, not the journal.
**C locus:** `pickup.c` `pickup_object`/`lift_object`/`carry_count`/
`fatal_corpse_mistake`/`rider_corpse_revival`; `engrave.c`
`u_wipe_engr`; `apply.c` `display_*_positions`; `defsym.h` S_goodpos.
**Change:** reviews 11 ACCEPT (telekinesis TRUE silent encumbrance
refuse + skip petrify; scare `carry_count` FALSE; ynq default `q`)
and 12 ACCEPT (real `u_wipe_engr`; three `tmp_at` S_goodpos loops;
paint on `$` like C). No new Must-fix. Filled Addressed hash
`7e389050`. No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** C read of `pickup.c:273–313` / `1570–1888`,
`hack.c:4391–4396`, `hack.h:1330` ynq, `engrave.c:187–289`,
`apply.c:1959–1984` / `3334–3352` / `3701–3725` / `3561` / `3809–3810`,
`defsym.h:207`; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix cursed-lamp `make_glib` HGlib|EGlib (D-1023).
**Blocked:** none.

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
