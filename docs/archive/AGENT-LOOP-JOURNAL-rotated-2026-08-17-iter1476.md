# Rotated from AGENT-LOOP-JOURNAL.md after #1476 D-1161 rloc_to update_monster_region

## 2026-08-17 09:05 — #1461 D-1149 mongone mdrop_special_objs

**Objective:** Must-fix — `mon.c` `mongone` `mdrop_special_objs` then
discard (elemental_clog victim). Not worn extract.
Source: reviews/loop-unattended/109-27274b3b-overcrowding.md.
**C locus:** `mon.c` `mongone` 3267–3282; `steal.c`
`mdrop_special_objs` 852–870; `mkobj.c` `discard_minvent` 2525–2536;
caller `elemental_clog` 3932–3936.
**Change:** `unstuck` when grabbing; reuse D-1148
`mdrop_special_objs`; discard remaining invent. Did not pull
`isgd`/`grddead`, `m_detach` wiz/shk/worm/`MON_DETACH`, worn
`extract_from_minvent`, or mongrantswish clone. Await vanish/
ghost/`*` genocide callers. Filled review **108** D-1148 hash
`27274b3b`. Rotated #1446. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **26**/26 (Bell/Book/Candelabrum/Amulet/
Rider/quest arti drop; ordinary `rn2(100)` discard; clog victim
Bell + rloc_to; clog skips Amulet holder); green+strict
seed8000/0900; cohort **26**/26 (0014 gush + 0360 lava + 0006
djinni vanish + 4500/2200/0030/0004/0002/0012/0007/0009/0106/
0108/0116/0367/0373/0383/0398/1500/1800/0060/0102/0700/0017) +
strict 8000/0900/0014/0360/4500/2200/0004/0030/0002/0006/0106/
0108. Path public-unhit on endgame clog.
**Next:** Open `hack.c` `domove` `invocation_message` (named).
Not teleds. Audit @**#1465**.
**Blocked:** none.
