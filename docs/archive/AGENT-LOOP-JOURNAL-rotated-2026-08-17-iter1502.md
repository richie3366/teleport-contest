# Rotated from AGENT-LOOP-JOURNAL.md after #1502 D-1182 rloc_pos_ok mx==0

## 2026-08-17 18:20 — #1487 D-1170 rloc_to occupation dochugw

**Objective:** Open — `teleport.c` `rloc_to` occupation `dochugw`
(named). Not mintrap.
**C locus:** `teleport.c` `rloc_to_core` 1761–1763 after bill
before mintrap; callee `monmove.c` `dochugw` 204–238 (`chug`
FALSE).
**Change:** `rloc_maybe_occupation` when occupation is a function
→ existing `dochugw(mtmp, false)`. Silent `rloc_to` after bill;
`rloc_to_flag` after appear+angry+bill. No extra `dochug`. Did
not pull `onscary` or makemon occupation. Filled D-1169 archive
hash `0f1ce7c6`. Rotated #1472. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **38**/38 (C/JS order; helper
`dochugw(false)`; no fs/FORCE; hostile dest stops; idle/peaceful/
too-far/`!mcanmove`/unseen/minvis keep; Hallu; 81 vs 82;
same-cell; adjacent-to-adjacent; AT_BOOM; thenable; defer until
flag; dest-bare mintrap after; worm skip mintrap); green+strict
seed8000/0900; cohort **41**/41 (CURRENT shared + 0014/0383/4500/
2600) + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/
0700/0015. Path public-unhit on busy-hero + rloc interrupt.
**Next:** Open `teleport.c` `rloc_pos_ok` isshk/ispriest room lock
(named). Not make_angry_shk.
**Blocked:** none.
