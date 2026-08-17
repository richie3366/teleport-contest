# Rotated from AGENT-LOOP-JOURNAL.md after #1514 D-1192 newgame wizkit

## 2026-08-17 21:26 — #1499 D-1180 rloc_to_core telemsg

**Objective:** Open — `teleport.c` `rloc_to_core` telemsg (named).
Not RLOC_ERR.
**C locus:** `teleport.c` `rloc_to_core` 1658–1659 same-cell
return; 1662–1672 set telemsg; 1712–1719 `"%s vanishes and
reappears%s."` next / close-by / closer / farther.
**Change:** emit the reappear pline with C suffix order; same-cell
`rloc_to_flag` return before vanish/appear. Did not pull
ustuck-together, wand `makeknown`, `set_msg_xy`, or `RLOC_ERR`.
Filled D-1179 archive hash `5f08f9e5`. Rotated #1484. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a spotted monster teleports
to a still-visible cell.
**Next:** Open `teleport.c` `rloc` `RLOC_ERR` impossible()
(named). Not vanish-msg.
**Blocked:** none.
