# Rotated from AGENT-LOOP-JOURNAL.md after #1368 review D-1075/D-1076

## 2026-08-16 09:35 — #1353 review D-1068 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`990b06a8` D-1068) against pinned C, not
the journal. `dee3b2c6` is docs-only queue refill.
**C locus:** `sit.c` `dosit` 406–429; `mondata.h` `is_hider` /
`ceiling_hider`; `monsters.h` mimic/piercer/lurker/trapper; `engrave.c`
`can_reach_floor`; `cmd.c` `domonability`; `polyself.c` `dohide`.
**Change:** review **29** ACCEPT (`is_hider` + `!= PM_TRAPPER`, no
`newsym`, clear before reach; not `ceiling_hider`). No new Must-fix.
Filled Addressed hash `990b06a8`. No `js/` edits. Rule #2: no fs.
Rotated #1338 to archive.
**Score:** fortress unchanged (cadence **#1350** **44**/44; next
@**#1355**).
**Verified:** C read of `sit.c:398–429`, `mondata.h:36–45`,
`engrave.c:187–214`, `cmd.c:889–913`, `polyself.c:1860–1873`;
JS hunk grepped FORCE/fs/seed. `PM_TRAPPER` index 99.
**Next:** Open `dosit` `can_reach_floor(FALSE)` only.
**Blocked:** none.
