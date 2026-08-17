# Rotated from AGENT-LOOP-JOURNAL.md after #1508 D-1187 ParanoidTrap portal yn

## 2026-08-17 20:12 — #1493 D-1175 youmonst m_everyturn_effect

**Objective:** Open — `allmain.c` `m_everyturn_effect` youmonst
(named). Not m_postmove_effect.
**C locus:** `allmain.c` 481 after bot before `context.move`;
callee `monmove.c` `m_everyturn_effect` 658–674 `is_u?u.ux:mx`.
**Change:** await `m_everyturn_effect(youmonst)` once-per-input.
Helper: fog at current `u.ux` (`data.mndx`); await
`create_gas_cloud(1,0)`; `movemon_singlemon` awaits. Human no-op.
Did not pull udemigod/`amulet()`/`glibr`/`do_storms`/
`mkot_trap_warn` or `mhurtle_step`. Filled D-1174 archive hash
`e5ec6685`. Rotated #1478. Open 9 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **27**/27 (C/JS after bot before
context.move; helper `is_u` ux not ux0; import; await create;
data.mndx first; null; human no cloud/RNG; Hezrou/Steam not this
function; fog ux not ux0/not mx; size-1 dmg 0; ttl `rn1`;
heros_fault; hero_inside; no envelop; thenable; door skip;
visible_region skip; monster mx/my; stale mnum; `mon_moving`;
region elsewhere; no fs/FORCE); green+strict seed8000/0900;
cohort **43**/43 (CURRENT shared + 0014/0383/4500/2600 + green)
+ strict 0101/0012/0360/4500/2200/0014/0004/0103/0104/0367/
0373/0002/0700/0015/0116/0106. Path public-unhit on polyed Fog.
**Next:** Open `dothrow.c` `mhurtle_step` `m_in_out_region` (named).
Not hurtle_step.
**Blocked:** none.
