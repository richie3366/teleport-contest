# Rotated from AGENT-LOOP-JOURNAL.md after #1344 review D-1063/D-1064

## 2026-08-16 02:40 — #1329 review D-1054/D-1055 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3f8469fe` D-1054, `e13735f8` D-1055)
against pinned C, not the journal.
**C locus:** `restore.c` `restobjchn`; `zap.c` `get_obj_location`;
`sit.c` `dosit` in_water; `youprop.h` `Underwater`; `potion.c`
`split_mon`; `mhitu.c` `cloneu`.
**Change:** reviews 15 ACCEPT (restore stamps `cobj` CONTAINED;
flags switch was already C) and 16 QUALITY-RISK (`in_water` body
matches; sit reads unset `u.Underwater` vs C `u.uinwater`).
Must-fix prepended. Filled Addressed hash `e13735f8`. No `js/`
edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** C read of `restore.c:270–277`, `zap.c:657–689`,
`obj.h:75–81`/`450–451`, `sit.c:430–435`/`505–525`,
`youprop.h:279`, `potion.c:2873–2898`, `mhitu.c:2616–2638`,
`mondata.h:78–79`; grep `uinwater=` vs `u.Underwater` reads.
**Next:** Must-fix sit `Underwater` → `u.uinwater`.
**Blocked:** none.
