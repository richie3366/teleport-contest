# Rotated from AGENT-LOOP-JOURNAL.md after #1509 D-1188 domagicportal

## 2026-08-17 20:25 — #1494 D-1176 mhurtle_step m_in_out_region

**Objective:** Open — `dothrow.c` `mhurtle_step` `m_in_out_region`
(named). Not hurtle_step.
**C locus:** `dothrow.c` `mhurtle_step` `:1000`; callee `region.c`
533–576.
**Change:** three-loop `m_in_out_region` (attach_2_m skip;
can_enter/leave then leave/enter; gas NO_CALLBACK never rejects).
`mhurtle_step` `will_hurtle && m_in_out_region` before place.
`make_gas_cloud` `attach_2_m=0`. Did not pull steed `u_on_newpos`,
petrify, `place_monster` vs rloc, NODIAG, minliquid, or
`goto_level` `obj_delivery`. Filled D-1175 archive hash
`7188da5b`. Rotated #1479. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **53**/53 (C/JS `&&` source; gas
add/stay/remove; can_enter/leave reject; attach_2_m skip; leave
then enter; NO_CALLBACK; null; empty; no fs/FORCE); green+strict
seed8000/0900; cohort **43**/43 (CURRENT shared + 0014/0383/4500/
2600 + green) + strict 0101/0012/0360/4500/2200/0014/0004/0103/
0104/0367/0373/0002/0700/0015/0116/0106. Path public-unhit on
knock through a live force field.
**Next:** Open `do.c` `goto_level` `obj_delivery` (named). Not
in_out_region. Audit @**#1495**.
**Blocked:** none.
