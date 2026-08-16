# Rotated from AGENT-LOOP-JOURNAL.md after cadence #1345

## 2026-08-16 02:46 — #1330 D-1056 dosit Underwater ≡ u.uinwater

**Objective:** Must-fix — `dosit` water predicates use C
`Underwater` (`u.uinwater`), not unset `u.Underwater`.
**C locus:** `sit.c` `dosit` ~430 / ~505; `youprop.h:279`.
**Change:** local `Underwater()` returns `u.uinwater`; both sit
predicates use it. Did not rewrite other `js/` `u.Underwater` or
second `water_damage` to `uarmf`. Rule #2: no fs.
**Score:** cadence **#1330** **44**/44 Scr **11405**/11405 RNG
**100%** speed `31+0.27/turn` (R² 0.88). Next @**#1335**.
**Verified:** private node `uinwater=1` muddy 0×`rn2(10)`;
`uinwater=0` in_water 2×`rn2(10)`; dead `u.Underwater` ignored;
picnic vs skip; eel underwater having-fun. green+strict PASS;
cohort **6**/6; full `sessions` **44**/44.
**Next:** Open `dosit` sink/altar/grave/stairs/ladder messages.
**Blocked:** none.
