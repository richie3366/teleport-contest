# Rotated from AGENT-LOOP-JOURNAL.md after #1498 D-1179 do_fall_dmg

## 2026-08-17 16:48 — #1483 D-1167 youmonst m_postmove_effect

**Objective:** Open — `hack.c` `m_postmove_effect` youmonst
(named). Not in_out_region.
**C locus:** `hack.c` `domove_core` 2877 after occupy before
steed; callee `monmove.c` `m_postmove_effect` 672–683.
**Change:** await `m_postmove_effect(youmonst)` after occupy.
Helper uses `is_u ? u.ux0 : mx/my`, `data.mndx`, awaits
`create_gas_cloud`. Hezrou 1×8 / Steam `!mcan` 1×0 trail
behind. Human form no-op. Monster `m_move` now awaits.
Did not pull `allmain` `m_everyturn_effect` youmonst or
moveloop fumaroles. Filled D-1166 archive hash `0cb3acbe`.
Rotated #1468. Open 12 after archive (refilled 5 from
`turns.md` / do.js named omits). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **30**/30 (src occupy/postmove/steed
+ helper `is_u` ux0; C same; import; null; human no cloud/RNG;
fog not this fn; Hezrou ux0 not ux/not mx; damage 8; trail not
inside / no envelop; Steam ux0 damage 0; `mcan`; monster mx/my;
data vs stale mnum; same-cell immune; thenable; `mon_moving`);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on polyed
Hezrou/Steam walk.
**Next:** Open `allmain.c` `moveloop` `fumaroles` (named). Not
mklev.
**Blocked:** none.
