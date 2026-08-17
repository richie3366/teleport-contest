# Rotated from AGENT-LOOP-JOURNAL.md after #1456 D-1145 Excalibur :441 update_inventory

## 2026-08-17 04:25 — #1441 D-1133 tele_trap teledest / else tele()

**Objective:** Open queue — `teleport.c` `tele()` / trap teledest
(named). Not tele_trap wrenching.
**C locus:** `teleport.c` `tele_trap` 1506–1532; `tele()` 841–845;
`track.c` `settrack`.
**Change:** lift `next_to_u` to C's sibling of once. Port teledest:
`settrack`, dest `m_at`, `enexto` fail → shudder, else `rloc_to` then
`teleds(TELEDS_TELEPORT)`; unnamed dest → `tele()`. Did not pull
`dotele` trap-at-feet or `vault_tele` tele() fallback. Rotated
#1426. Open 10 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **32**/32; green+strict seed8000/0900;
cohort **22**/22 (0012 vault + 0004 + 0007 snake + 0009 swim +
0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/0102/0700/
0017/0361/0108/0383/5002) + strict 0012/0360/4500/0004/2200/0367/
0373/0030/0009/0002. Path public-unhit on named-dest / random TELEP.
**Next:** Open `fountain.c` `dipfountain` `update_inventory` after
switch. Not Excalibur gift.
**Blocked:** none.
