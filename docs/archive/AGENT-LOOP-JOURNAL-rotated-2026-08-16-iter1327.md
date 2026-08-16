# Rotated from AGENT-LOOP-JOURNAL.md at #1327

## 2026-08-15 22:01 — #1312 D-1044 special_obj_hits_leader urole.questarti

**Objective:** Must-fix review 02 item 3 — `special_obj_hits_leader`
uses C `is_quest_artifact` (`urole.questarti`), not `u.questarti`.
**C locus:** `questpgr.c` `is_quest_artifact` (~67–70);
`dothrow.c` `special_obj_hits_leader` (~1969–1972); caller
`thitmonst` skips APPLIED.
**Change:** local `is_quest_artifact` compares `oartifact` to
`game.urole.questarti` (`want!==0` for sparse JS urole). Unique /
fake / `leader_m_id` unchanged. Catch/`finish_quest` still deferred.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`.
**Blocked:** none.

## 2026-08-15 21:48 — review D-1042 / D-1043 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`19e907f5` D-1042, `d3fac215` D-1043)
against pinned C, not the journal.
**C locus:** `worn.c` `find_mac`; `hack.h` `ARM_BONUS`; `dothrow.c`
`should_mulch_missile`; `rnd.c` `rnl`.
**Change:** reviews 03 ACCEPT (`find_mac` minvent walk / guarding −2 /
`AC_MAX`; stub gone) and 04 ACCEPT (hero blessed save `!rnl(4)`;
monster `rn2(3)` unchanged). No new Must-fix. No `js/` edits.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** C read of `worn.c:717–735`, `hack.h:1526–1528`,
`dothrow.c:1976–2002`, `rnd.c:112–151`, `questpgr.c:67–70`; JS hunks
grepped FORCE/fs/seed.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.
