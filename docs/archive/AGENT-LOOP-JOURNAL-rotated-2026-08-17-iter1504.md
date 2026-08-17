# Rotated from AGENT-LOOP-JOURNAL.md after #1504 D-1184 scrolltele make_blinded

## 2026-08-17 19:10 — #1489 D-1172 rloc steed tele()

**Objective:** Open — `teleport.c` `rloc` steed `tele()` (named). Not
Wizard stair.
**C locus:** `teleport.c` `rloc` 1808–1811 before iswiz stair.
**Change:** `rloc(usteed)` `await tele(); return true` even if tele
does not move (noteleport). Not Wizard stair (D-1122). Did not pull
`mnexto` `control_mon_tele`, vanish-msg, or `RLOC_ERR`. Filled
D-1171 archive hash `822498d3`. Rotated #1474. Open 7 after archive
→ refill Open to 12 from teleport named omits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1485** **44**/44; next
@**#1490**).
**Verified:** private canary **33**/33 (C tele()+TRUE before iswiz;
teleport_pet FALSE other locus; JS await tele then true; no
`return false` for steed; Wizard stair kept; noteleport TRUE + no
50× rnd + stay + mysterious-force; ordinary still rnd; iswiz steed
not stairs; teleport_pet still FALSE; thenable; no fs/FORCE);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/0004/
0103/0104/0367/0373/0002/0700/0015/0116/0106. Path public-unhit on
riding `rloc(usteed)`.
**Next:** Open `mon.c` `mnexto` `control_mon_tele` (named). Not rloc.
**Blocked:** none.
