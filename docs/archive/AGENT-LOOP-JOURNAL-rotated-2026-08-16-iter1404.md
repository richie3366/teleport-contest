# Rotated from AGENT-LOOP-JOURNAL.md after #1404 D-1104 dryup angry_guards

## 2026-08-16 17:20 — #1389 D-1092 makemon S_ORC/S_UNICORN mlet peace

**Objective:** Open queue — `makemon.c` S_ORC / S_ELF / unicorn
mlet peace override after `m_initweap` (named omit on makemon
row).
**C locus:** `makemon.c` `makemon` 1335–1342; `you.h` `Race_if`;
`mondata.h` `is_unicorn`. In the mlet switch **before**
`set_malign` / `m_initweap`. 5.0 has no `S_ELF` mlet.
**Change:** `S_ORC` + `Race_if(PM_ELF)` → hostile. `S_UNICORN` +
`is_unicorn` + co-align → always peaceful (pony/horse skip).
`peace_minded` still burns `rn2` first. Did not pull dprince
bribe / raven `BEC_DE_CORBIN` / emin roaming / `MM_ANGRY`.
Filled D-1091 hash `278521f1` (archive + review **38**). Rotated
#1374. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1385** **44**/44; next
@**#1390**).
**Verified:** private canary **12**/12; green+strict
seed8000/0900; cohort **22**/22 (incl. 0060/0004/0103/0399/
0360/4500/0014/2200) + strict 0014/0360/0399/0004/0060/4500/
2200/0367. Override public-unhit or already matching.
**Next:** Open `dogmove.c` pal/target numeric `ptr.msound` not
`'MS_LEADER'`. Audit @**#1390**.
**Blocked:** none.
