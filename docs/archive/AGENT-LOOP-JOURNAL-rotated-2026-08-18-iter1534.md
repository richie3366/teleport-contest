# Rotated from AGENT-LOOP-JOURNAL.md after #1534 D-1208 dotele trap-at-feet teledest

## 2026-08-18 01:32 — #1519 D-1196 rloc_to_core dest-msg set_msg_xy

**Objective:** Open — `teleport.c` `rloc_to_core` `set_msg_xy`
(named). Not makeknown.
**C locus:** `teleport.c` `rloc_to_core` 1708 after dest-msg gate
before dest plines. Callee `pline.c` `set_msg_xy`.
**Change:** export `hack.js` `set_msg_xy` and call it at dest
before `STRAT_APPEARMSG` clear. Silent / same-cell / `in_mklev`
/ unspotted skip. Did not pull `accessiblemsg` consume or
`scrolltele` W-tower Override. Filled D-1195 archive hash
`143f9a46`. Rotated #1504. Open 8 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1515** **44**/44; next
@**#1520**).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/
2200/0014.
**Next:** Open `teleport.c` `scrolltele` W-tower Override yn
(named). Not make_blinded.
**Blocked:** none.
