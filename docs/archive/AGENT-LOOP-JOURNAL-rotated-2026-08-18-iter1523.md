# Rotated from AGENT-LOOP-JOURNAL.md after #1523 D-1199 mon_arrive my=xyflags before rloc

## 2026-08-18 00:08 — #1508 D-1187 avoid_trap_andor_region ParanoidTrap

**Objective:** Must-fix human canary seed8243 `hack.c`
`avoid_trap_andor_region` ParanoidTrap portal yn. Not
maybe_smudge. Not kill_genocided.
**C locus:** `hack.c` `avoid_trap_andor_region` 2515–2581 /
`domove_core` 2825–2828; `trap.c` `into_vs_onto` 5375–5388 /
`immune_to_trap` 2783–2934 (MAGIC_PORTAL hero NOT_IMMUNE).
**Change:** yn `"Really step into that magic portal?"` via
`paranoid_query(ParanoidConfirm)` (default bits → yn, not
getlin yes). Call after `u_rooted` before `u.utrap`. Silent
TEST_MOVE subset. Gas-region arm via local clones. Did not
pull hero `domagicportal`. Filled D-1186 archive hash
`4dd396cc`. Rotated #1493. Open 10 + Must-fix portal
activate = 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **107→108**/129 (yn matches; @108
leftover yn vs C activate); green+strict seed8000/0900;
cohort **42**/42 (CURRENT shared + 0014/0383/0399/4500/2600
+ green) + strict 1500/0700/0009/0361/0015/0012.
**Next:** Must-fix seed8243 `teleport.c` `domagicportal`
`"You activated a magic portal!"` / tutorial ATSTAIRS.
Not maybe_smudge_engr.
**Blocked:** none.
