# Rotated from AGENT-LOOP-JOURNAL.md after #1386 D-1089

## 2026-08-16 13:12 — #1372 D-1078 sit split_mon monster clone_mon

**Objective:** Open queue — `sit.c` `split_mon` monster `clone_mon`
arm (JS named omit).
**C locus:** `potion.c` `split_mon` 2899–2912; `makemon.c`
`clone_mon` 837–943.
**Change:** `makemon.js` `clone_mon` (C home) + sit local
`split_mon` else no longer `return null`. Halves current HP then
max. Did not pull trap rust / `minliquid` / uhitm AD_COLD callers.
Stamped review **38** named omit **Addressed:** D-1078. Rule #2:
no fs. Rotated #1357 to archive.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary (20/20 both 10/10; odd stays; `mhp<=1`
/ `G_EXTINCT` null; named; peaceful luck `rn2`; hero `cloneu`);
green+strict seed8000/0900; cohort **15**/15 (8000/0900/1500/1800/
0060/0102/0700/0017/0106/0107/4500/0014/0360/2200/0009) + strict
0014/4500/0360/2200. Path public-unhit.
**Next:** Open `makemon.c` `peace_minded` / `set_malign` read
`ptr.msound`. Audit @**#1375**.
**Blocked:** none.
