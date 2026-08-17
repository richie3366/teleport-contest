# Rotated from AGENT-LOOP-JOURNAL.md after #1517 D-1194 goto_level notice_mon_off

## 2026-08-17 22:10 — #1502 D-1182 rloc_pos_ok mx==0 updest/dndest

**Objective:** Open — `teleport.c` `rloc_pos_ok` mx==0 updest/dndest
(named). Not room lock.
**C locus:** `teleport.c` `rloc_pos_ok` 1592–1615 in the `!xx`
arm after `goodpos`, before on-map room lock.
**Change:** migrating `my` flags: `dndest.nlx`+`On_W_tower_level`
dest-in-exclude XOR `my&2`; else updest.lx moving-up minus nlx;
else dndest.lx moving-down minus nlx. On-map isshk/ispriest +
`tele_jump_ok` unchanged. Did not pull `migrate_to_level` bit 2
or `mon_arrive` `my=xyflags`. Filled D-1181 archive hash
`0b488053`. Rotated #1487. Open 7 after archive; refilled to 12
(wand makeknown / set_msg_xy / scrolltele Override / migrate
bit 2 / mon_arrive my=xyflags). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **84**/84 (C/JS order; goodpos first;
no dests fallthrough; down lx/exclude; up vs dndest.lx; W-tower
XOR precedence; nlx==0; !On_W_tower uses lx; on-map ignores lx;
tele_jump_ok; room lock on-map only; migrating shk unlocked;
rloc lands in dndest; on-map rloc can leave lx; no fs/FORCE);
green+strict seed8000/0900; cohort **12**/12 (green + 1500/1800/
0015/0002/0014/2200/4500/0367/0360/0012) + strict 1500/0012/
0360/4500/2200/0014. Path public-unhit on migrating arrival.
**Next:** Open `teleport.c` `rloc_to_core` ustuck-together pline
(named). Not telemsg.
**Blocked:** none.
