# Rotated from AGENT-LOOP-JOURNAL.md at #1324

## 2026-08-16 00:45 — #1321 D-1050 pickup_object telekinesis

**Objective:** Must-fix D-1022 risk 6 — `pickup_object` honors
`telekinesis` like C (whip/grapple pull-in).
**C locus:** `pickup.c` `pickup_object` (~1803) / `lift_object`
(~1705) / `carry_count` (~1569) / `fatal_corpse_mistake` /
`rider_corpse_revival`.
**Change:** stop `void telekinesis`. Whip TRUE: silent encumbrance
refuse, remote corpse skip petrify, scare `raise`. Grapple FALSE:
`ynq` Continue?. Floor `carry_count`; `max_capacity` in invent.
Named: Sokoban boulder / LOADSTONE override / container `delta_cwt`
/ ghostly. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/pickup cohort **10**/10
(seed0361 Scr **366**/366). Private: light TRUE lifts; heavy TRUE
refuses; cockatrice TRUE no petrify. Path **unhit**.
**Next:** Must-fix `u_wipe_engr` / `tmp_at` (D-1022 risk 7).
**Blocked:** none.

## 2026-08-15 21:42 — Addressed HASH in the next real commit

**Objective:** stop stamp-only SHAs (`da0fabe3`…`9c087297`) and hash
chicken-egg spinning.
**C locus:** n/a (git hygiene).
**Change:** stamp `**Addressed:** D-NNNN` in the fix commit; fill the
short hash in the **next** commit that already has work (port / review /
cadence). No amend, no hash prediction, no stamp-only follow-up.
**Score:** unchanged (cadence still **#1310**).
**Verified:** n/a.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti` (and
backfill any missing hash in that same SHA).
**Blocked:** none.
