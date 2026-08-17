# Rotated from AGENT-LOOP-JOURNAL.md after #1501 D-1181 rloc RLOC_ERR impossible

## 2026-08-17 18:05 — #1486 D-1169 run_regions hero_inside bit

**Objective:** Open — `region.c` `run_regions` `hero_inside` bit
(named). Not walk caller.
**C locus:** `region.c` `run_regions` 439–441 after ttl age;
callee `inside_gas_cloud` 1091–1165 (D-1146). Caller
`allmain.c:274` after `nh_timeout`.
**Change:** hero `inside_f` uses `hero_inside(reg)` (`REG_HERO_INSIDE`)
instead of `inside_region(u.ux,u.uy)`. Gas tag + monster list
unchanged. Did not flip `region_danger` / `region_safety`
(still geometric). Filled D-1168 archive hash already
`0ff54fb4`. Rotated #1471. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **26**/26 (C/JS hero_inside vs
geometry; allmain nh_timeout then run_regions; danger/safety
still geometric; no fs/FORCE; fog ttl bit-set/geo-miss fires,
bit-clear/geo-hit does not; both/neither; NO_CALLBACK skip;
monster list independent; ttl==0 expire; empty; overlap only
bit-set; human dam0 no fog +5; age before inside_f; thenable);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on stale bit
vs cell.
**Next:** Open `teleport.c` `rloc_to` occupation `dochugw`
(named). Not mintrap.
**Blocked:** none.
