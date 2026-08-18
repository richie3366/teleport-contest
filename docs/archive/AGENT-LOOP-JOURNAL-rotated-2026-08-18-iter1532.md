# Rotated from AGENT-LOOP-JOURNAL.md after #1532 D-1206 scrolltele steed whobuf

## 2026-08-18 01:18 — #1517 D-1194 goto_level notice_mon_off

**Objective:** Open — `do.c` `goto_level` `notice_mon_off`
(named). Not docrt.
**C locus:** `do.c` `goto_level` 1839 after vision_reset before
docrt; 1971–1972 after uz0 before print_level_annotation.
Macros `flag.h` 233–237; callee `hack.c` `notice_all_mons`
1744–1783 (D-1142).
**Change:** `notice_mon_off` before `docrt`; `notice_mon_on` +
`notice_all_mons(TRUE)` after uz0. Did not pull `reset_glyphmap`,
docrt, vision.c `:856`, newgame/mapping/wizcmds/save, or
`spot_monsters` wiring. Default Off so public catch-up is a
no-op. Filled D-1193 archive hash `2d2e68c7`. Rotated #1502.
Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **29**/29; green+strict
seed8000/0900; cohort **41**/41 + strict lengths.
**Next:** Open `teleport.c` `rloc_to_core` wand `makeknown`
(named). Not ustuck-together.
**Blocked:** none.
