# Rotated from AGENT-LOOP-JOURNAL.md after #1400 review D-1097–D-1100

## 2026-08-16 16:40 — #1385 review D-1085–D-1088 + cadence score

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`dfe4f198` closed D-1081–D-1084) against
pinned C. Cadence full `sessions` in the same iter.
**C locus:** `youprop.h` Flying 247–255; `steal.c` `remove_worn_item`
213–290; `display.c` `shieldeff` 1110–1124; `makemon.c` `m_initweap`
263–327 / `quest_mon_represents_role` 11–13; `youprop.h` Antimagic
55–57.
**Change:** reviews **46** ACCEPT (D-1085 Flying uprops), **47**
ACCEPT-WITH-DEBT (D-1086 armor `*_off`), **48** QUALITY-RISK (D-1087
`shieldeff` body matches; sit `Antimagic()` misses
`uprops[ANTIMAGIC]`), **49** ACCEPT (D-1088 priest/guardian msound).
Must-fix prepend sit Antimagic. Filled D-1088 hash `049af16e`.
Rotated #1371 + cadence-policy crumb. No `js/` edits. Rule #2: no fs.
**Score:** cadence **#1385** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.87). Next
@**#1390**.
**Verified:** C read of the four loci + `confer_oc_oprop` 261–288;
JS hunks grepped FORCE/fs/seed; full `sessions` `__RESULTS_JSON__`.
**Next:** Must-fix sit `rndcurse` `Antimagic()` via uprops. Not
`is_pool`.
**Blocked:** none.
