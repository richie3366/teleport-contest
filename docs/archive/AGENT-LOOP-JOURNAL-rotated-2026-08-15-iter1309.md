# Rotated from AGENT-LOOP-JOURNAL.md (#1298 D-1029, iter #1309)

## 2026-08-15 16:28 — #1298 D-1029 use_figurine

**Objective:** map-driven apply cluster — C `use_figurine`
(CURRENT FIGURINE).
**C locus:** `apply.c` use_figurine/figurine_location_checks/doapply
FIGURINE; `dog.c` make_familiar/pick_familiar_pm; `makemon.c`
MM_IGNOREWATER gpflags.
**Change:** doapply dispatch (res TIME/OK/CANCEL); swallow room;
getdir cmdq+self+vertical; loc TIME; You set/release/toss;
make_familiar extinct dust / shatter / BUC 80-10-10 / initedog;
stop FIG_TRANSFORM; useup. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (swallow; cancel; wall TIME; extinct
dust; blessed spawn+useup). Path **unhit** by public traces.
**Next:** apply.js use_unicorn_horn (UNICORN_HORN).
**Blocked:** none.
