# Rotated from AGENT-LOOP-JOURNAL.md after D-1025 / #1294

## 2026-07-22 04:22 — #1281 D-1010 use_crystal_ball

**Objective:** map-driven — apply CRYSTAL_BALL / detect
`use_crystal_ball` (CURRENT next cluster).
**C locus:** `detect.c` use_crystal_ball/level_distance + thin
object_detect/trap_detect/furniture_detect; `drawing.c` def_char_*;
`apply.c`/`artifact.c` wire.
**Change:** port Blind/fail/hallu/uncharged/charged detect envelopes;
wire doapply + arti_invoke — D-1010.
**Verified:** green+strict PASS; apply/detect cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or blindfold-as-tool / containers.
**Blocked:** none.
