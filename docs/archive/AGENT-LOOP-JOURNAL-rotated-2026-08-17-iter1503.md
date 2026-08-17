# Rotated from AGENT-LOOP-JOURNAL.md after #1503 D-1183 rloc_to_core ustuck-together

## 2026-08-17 18:57 — #1488 D-1171 rloc_pos_ok shk/priest room lock

**Objective:** Open — `teleport.c` `rloc_pos_ok` isshk/ispriest room
lock (named). Not make_angry_shk.
**C locus:** `teleport.c` `rloc_pos_ok` 1620–1626 in the on-map
`xx` arm after `goodpos` before `tele_jump_ok`.
**Change:** dest `levl.roomno` vs ESHK.shoproom / EPRI.shroom
(`unsigned char`) when `isshk && inhishop` else-if
`ispriest && inhistemple`. Not `in_rooms`. Did not pull
`make_angry_shk` (D-1162) or mx==0 updest/dndest. Filled D-1170
archive hash `5a6be1fe`. Rotated #1473. Open 8 after archive
(no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **25**/25 (C/JS order; dest roomno
not in_rooms; unsigned char; mx==0 deferred; no angry/fs/FORCE;
resident shk/priest stay; ordinary/`!inhishop`/`!shrine` not
locked; candy fallback; SHARED skip; isshk else-if; tele_jump
after; goodpos first; thenable); green+strict seed8000/0900;
cohort **41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002/0700/0015/
0116/0106. Path public-unhit on resident shk/priest dest filter.
**Next:** Open `teleport.c` `rloc` steed `tele()` (named). Not
Wizard stair.
**Blocked:** none.
