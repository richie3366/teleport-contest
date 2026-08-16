# Rotated from AGENT-LOOP-JOURNAL.md after #1406 D-1105 watchman Deaf shake/wave

## 2026-08-16 17:42 — #1391 D-1093 dogmove pal/target numeric msound

**Objective:** Open queue — `dogmove.c` pal/target tests must
compare numeric `ptr.msound` not string `'MS_LEADER'` (named from
D-1053 review **14**).
**C locus:** `dogmove.c` `find_friends` 728–730 / `score_targ`
767–769 / `dog_move` 1124–1126; `monflag.h` MS_LEADER=36 /
MS_GUARDIAN=38.
**Change:** `dogmove.js` compares `(ptr.msound | 0) === MS_LEADER`
/ `MS_GUARDIAN`. Did not pull `perceives`, conf/`Is_qstart` score,
faith/AT_NONE/vampshifter, or melee `haseyes`/`mon_reflects`.
Stamped reviews **14**/**53**/**40**/**49**. Filled D-1092 hash on
review **49**. Rotated #1376. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **12**/12 + strict 1800/0004/0367/0360/0014/2200/0361.
Path public-unhit.
**Next:** Open `makemon.c` `m_initweap` MS_NEMESIS mitem
`ptr.msound` not `urole.neminum`.
**Blocked:** none.
