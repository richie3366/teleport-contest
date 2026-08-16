# Rotated from AGENT-LOOP-JOURNAL.md after D-1058 / #1333

## 2026-08-15 23:54 — #1318 D-1048 Vlad case 10 HConfusion only

**Objective:** Must-fix D-1033 risk 2 — Vlad special case 10 sets
`HConfusion` only; JS must not also force flat `u.Confusion`.
**C locus:** `sit.c` `special_throne_effect` case 10 (~310);
`read.c` `seffect_remove_curse` `Confusion != 0` (~1495);
`youprop.h` `#define Confusion HConfusion`.
**Change:** save/set/restore `HConfusion` only. `seffect_remove_curse`
reads `!!(u.HConfusion|0)` (not flat/`EConfusion`). Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1315**; next @**#1320**).
**Verified:** green+strict PASS; sit cohort **3**/3 (seed0106 Scr
**267**/267; seed0107 **98**/98; seed4500 **1814**/1814) + seed0108
**303**/303. Private node **12**/12 (no flat write; restore;
leftover flat/EConfusion unconfused). Path **unhit**.
**Next:** Must-fix `take_gold` `remove_worn_item` (D-1034 risk 3).
**Blocked:** none.
