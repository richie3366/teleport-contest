# Rotated from AGENT-LOOP-JOURNAL.md (#1459)

## 2026-08-17 08:31 — #1459 D-1148 deal_with_overcrowding limbo

**Objective:** Open queue — `fountain.c` `gush`
`deal_with_overcrowding` (named). Not lava xkilled.
**C locus:** `mon.c` `deal_with_overcrowding` 3986–3995;
`m_into_limbo` 3833–3840; `migrate_mon` 3843–3861;
`elemental_clog`/`ok_to_obliterate` 3864–3949; callers
`minliquid_core` 1061–1062 / 1104–1105 and `mnexto` 3966–3968.
**Change:** port dispatcher + limbo/clog arms; wire minliquid
failed survivor `rloc` and `mnexto` failed-enexto. Thin
`mdrop_special_objs` (invocation/`obj_resists(0,0)`). Did not
pull steed Fly/Lev, `engulfing_u`, or full `mdrop_obj` worn.
Filled D-1147 archive hash `5c43dbc9`. Rotated #1444. Open 10
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1455** **44**/44; next
@**#1460**).
**Verified:** private canary **46**/46; green+strict seed8000/0900;
cohort **24**/24 (0014 gush + 0360 lava + 4500/2200/0030/0004/
0002/0012/0006/0007/0009/0106/0108/0116/0367/0373/0383/0398/
1500/1800/0060/0102/0700/0017) + strict 8000/0900/0014/0360/
4500/2200/0004/0030/0002/0006/0106/0108 (seed0012 isolated
PASS). Path public-unhit on gush `m_at` overcrowding.
**Next:** Open `hack.c` `domove` `invocation_message` (named).
Not teleds. Audit @**#1460**.
**Blocked:** none.
