# Rotated from AGENT-LOOP-JOURNAL.md after D-1223 mhitm troll_baned mkcorpstat_norevive

## 2026-08-18 09:15 — #1539 D-1212 revive_corpse MINVENT/CONTAINED

**Objective:** Open — `do.c` `revive_corpse` OBJ_MINVENT /
OBJ_CONTAINED (named). Not BURIED.
**C locus:** `do.c` `revive_corpse` 2183–2215; `do_name.c`
`Adjmonnam` 1142–1148; `mondata.c` `locomotion` 1380–1392;
`zap.c` `get_obj_location` / `get_container_location`.
**Change:** C MINVENT drop/appear + CONTAINED pack/floor/minvent
sack plines after `revive`. `Adjmonnam` bite-covered (FLOOR +
MINVENT). Pack verb via `locomotion`. Snapshot where/mcarry/
container/oeaten before `revive`. `zap.js` `OBJ_FREE` for
contained `obfree`. Did not pull BURIED `!is_zomb` FALLTHROUGH
impossible or `Soundeffect`. Filled D-1211 archive hash
`481e005b`. Rotated #1524. Open 7 after archive; refill to 12.
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1535** **44**/44; next
@**#1540**).
**Verified:** private canary **20**/20; green+strict
seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004.
**Next:** Open `dig.c` `rot_corpse` invent/minvent worn plines
(named). Not REVIVE.
**Blocked:** none.
