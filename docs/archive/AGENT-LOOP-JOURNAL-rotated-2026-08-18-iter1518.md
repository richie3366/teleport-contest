# Rotated from AGENT-LOOP-JOURNAL.md after #1518 D-1195 rloc wand makeknown

## 2026-08-17 22:25 — #1503 D-1183 rloc_to_core ustuck-together

**Objective:** Open — `teleport.c` `rloc_to_core` ustuck-together
pline (named). Not telemsg.
**C locus:** `teleport.c` `rloc_to_core` 1710–1711 first post-msg
arm after dest, before telemsg/appear.
**Change:** `mtmp==ustuck && !u_at(ux0,uy0)` →
`You("and %s teleport together.")` via `mon_nam`; else-if telemsg
reappear; else appear/arrives. Did not pull wand `makeknown` or
`set_msg_xy`. Filled D-1182 archive hash `01c8c41f`. Rotated
#1488. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **44**/44 (C/JS order; together beats
telemsg; grab adjacent ux==ux0 silent; grab ux!=ux0 together;
grab far unstuck; RLOC_NOMSG; same-cell; in_mklev; Blind arrives;
`mon_nam` the- not The-; no fs/FORCE); green+strict seed8000/0900;
cohort **12**/12 (green + 1500/1800/0015/0002/0014/2200/4500/0367/
0360/0012) + strict 1500/0012/0360/4500/2200/0014. Path
public-unhit unless swallowed/ustuck teleports with messages.
**Next:** Open `teleport.c` `scrolltele` make_blinded (named). Not
W-tower amulet.
**Blocked:** none.
