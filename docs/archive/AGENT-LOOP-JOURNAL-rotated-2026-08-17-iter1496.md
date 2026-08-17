# Rotated from AGENT-LOOP-JOURNAL.md after #1496 D-1177 obj_delivery

## 2026-08-17 16:15 — #1481 D-1165 hurtle_step in_out_region

**Objective:** Open — `dothrow.c` `hurtle_step` `in_out_region`
(named). Not walk.
**C locus:** `dothrow.c` `hurtle_step` 787–790 after `isok` before
`*range==0`; callee `region.c` `in_out_region` 480–527.
**Change:** await `in_out_region(x,y)` at that site, C `else if`
order so range==0 still updates `REG_HERO_INSIDE` then returns
false without occupying. Gas `NO_CALLBACK` never rejects. Did not
pull do.c `goto_level` or `mhurtle_step` `m_in_out_region`.
Rotated #1466. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **41**/41 (empty; enter/leave/stay-in/
stay-out; can_enter/leave reject vs allow; gas NO_CALLBACK;
`attach_2_u`; A→B; overlap; range==0 bit; isok skip; m_at bump
bit; no-dir/ustuck/utrap); green+strict seed8000/0900; cohort
**41**/41 (CURRENT shared + 0014/0383/4500/2600) + strict
0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path
public-unhit on hurtle through a live region.
**Next:** Open `do.c` `goto_level` `in_out_region` (named). Not
walk.
**Blocked:** none.
