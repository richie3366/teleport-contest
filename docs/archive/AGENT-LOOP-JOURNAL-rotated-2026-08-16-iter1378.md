# Rotated from AGENT-LOOP-JOURNAL.md after #1378 D-1083

## 2026-08-16 11:10 — #1364 D-1074 dosit dragon money_cnt meager hoard

**Objective:** Open queue — `sit.c` `dosit` dragon coin hoard:
`money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare
“hoard”).
**C locus:** `sit.c` `dosit` (~443–446); `hack.c` `money_cnt`
(first `COIN_CLASS` quan, not a sum).
**Change:** local `money_cnt` in `sit.js`; prefix `"meager "` when
`obj.quan + money_cnt(invent) < u.ulevel * 1000`. Equal-to-threshold
is bare. Did not pull `lay_an_egg` / `clone_mon` split_mon. Filled
Addressed hash `1f21183f` (D-1073). Rule #2: no fs. Rotated #1349
to archive. Refilled Open to 12.
**Score:** fortress unchanged (cadence **#1360** **44**/44; next
@**#1365**).
**Verified:** private canary (meager/bare/ulevel/first-coin-not-sum);
green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017.
**Next:** Open `sit.c` `dosit` `lay_an_egg`.
**Blocked:** none.
