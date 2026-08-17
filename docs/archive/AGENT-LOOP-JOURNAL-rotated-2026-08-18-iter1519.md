# Rotated from AGENT-LOOP-JOURNAL.md after #1519 D-1196 rloc dest-msg set_msg_xy

## 2026-08-17 22:40 — #1504 D-1184 scrolltele make_blinded

**Objective:** Open — `teleport.c` `scrolltele` make_blinded (named).
Not W-tower amulet.
**C locus:** `teleport.c` `scrolltele` 861–863 after noteleport
return, before amulet/W-tower `rn2(3)`.
**Change:** `if (!Blinded()) await make_blinded(0, false)` via
dynamic `do.js` import. `Blinded` ≡ `HBlinded && !BBlinded` (not
Blindfold). Skip when Blinded so timeout/FROMFORM is not cured.
Did not pull W-tower Override yn. Filled D-1183 archive hash
`d2512b22`. Rotated #1489. Open 10 after archive (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **52**/52 (C/JS order; Blinded≠Blind;
0,FALSE not 1L; noteleport before; timeout/FROMFORM kept; Eyes
leftover TIMEOUT cleared; Blindfold uses Blinded; wizard still
calls; amulet after; no fs/FORCE); green+strict seed8000/0900;
cohort **12**/12 (1500/1800/0015/0002/0014/2200/4500/0367/0360/
0012/0004/0006) + strict 1500/0012/0360/4500/2200/0014/0004.
Path public-unhit unless Eyes leftover timeout on teleport.
**Next:** Open `do.c` `goto_level` `kill_genocided_monsters`
(named). Not run_timers.
**Blocked:** none.
