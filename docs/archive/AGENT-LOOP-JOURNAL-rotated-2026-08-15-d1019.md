# Rotated from AGENT-LOOP-JOURNAL.md after D-1019

## 2026-07-22 05:30 — #1275 cadence + D-1004 lycan wires

**Objective:** cadence full `sessions` @#1275 + map-driven lycanthropy
you_were wires (pray/potion/mhitm).
**C locus:** `pray.c` TROUBLE_LYCANTHROPE; `potion.c` peffect_water +
potionbreathe POT_WATER; `mhitm.c` mon_poly youmonst; `uhitm.c`
mhitm_ad_poly; `mondata.c` mon_hates_blessings.
**Change:** wire TROUBLE_LYCANTHROPE → you_unwere; peffect_water + vapor;
mon_poly hero + mhitu AD_POLY — D-1004.
**Verified:** green+strict PASS; pray/potion/combat cohort **16**/17
(seed0009 Scr 72/73 pre-existing). Cadence **43**/44 Scr **11404**/11405
RNG **100%** speed `31+0.27/turn`. Rule #2: no fs.
**Next:** next_to_u/check_leash; or absent.md thin; or mon_poly mon arm.
**Blocked:** none.
