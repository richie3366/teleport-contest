# Rotated from AGENT-LOOP-JOURNAL.md after D-1024 / #1293

## 2026-07-22 06:12 — #1280 cadence + D-1009 use_towel

**Objective:** cadence full `sessions` @#1280 + map-driven towel
cluster (CURRENT next apply tools).
**C locus:** `apply.c` use_towel; `weapon.c` wet/dry_a_towel /
finish_towel_change / is_wet_towel; `trap.c` burnarmor wet-towel dry.
**Change:** port use_towel + shared wet/dry helpers; wire doapply
TOWEL; burnarmor dry path (D-1009). Score refresh in CURRENT.
**Verified:** green+strict PASS; apply/trap cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Full sessions **43**/44 Scr
**11404**/11405 RNG **100%** speed `30+0.26/turn`. Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or crystal ball.
**Blocked:** none.
