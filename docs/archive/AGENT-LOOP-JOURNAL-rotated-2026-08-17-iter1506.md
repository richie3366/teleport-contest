# Rotated from AGENT-LOOP-JOURNAL.md after #1506 D-1185 doddoremarm

## 2026-08-17 19:39 — #1491 D-1173 mnexto control_mon_tele savemm

**Objective:** Open — `mon.c` `mnexto` `control_mon_tele` (named). Not
rloc.
**C locus:** `mon.c` `mnexto` 3974–3978 after enexto; callee
`teleport.c` `control_mon_tele` 1898–1934 via_rloc FALSE.
**Change:** after successful enexto, `iflags.mon_telecontrol` (not
wizard at caller, not mx!=0) `control_mon_tele(..., false)` then
restore savemm coord copy on FALSE so cancel/hero-cell cannot stick.
Default Off. Did not pull vanish-msg, `RLOC_ERR`, or OPTIONS= doset.
Filled no prior missing hash (D-1172 already `e7c5c8ac`). Rotated
#1476. Open 11 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1490** **44**/44; next
@**#1495**).
**Verified:** private canary **38**/38 (C/JS order; via_rloc FALSE;
savemm copy; no wizard/mx gate; Off (11,10); On without wizard;
steed sync; wizard `.` / ESC / hero `h.` restore; STONE force y/n;
mx==0 still prompts; rloc still rnd; thenable; `.` consumed; no
fs/FORCE); green+strict seed8000/0900; cohort **41**/41 (CURRENT
shared + 0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/
0014/0004/0103/0104/0367/0373/0002/0700/0015/0116/0106. Path
public-unhit on wizard `montelecontrol`.
**Next:** Open `mhitm.c` `mdisplacem` `update_monster_region` (named).
Not rloc_to.
**Blocked:** none.
