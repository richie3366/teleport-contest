# Rotated from AGENT-LOOP-JOURNAL.md after #1544 D-1216 set_msg_dir/pline_dir

## 2026-08-18 06:17 — #1529 D-1204 eatspecial SCR_MAIL + uwepgone light

**Objective:** Open — `eat.c` `eatspecial` (named). Not
doeat_nonfood.
**C locus:** `eat.c` `eatspecial` 2432–2447 MAIL_STRUCTURES
`SCR_MAIL` before scare/YUM/salt; `wield.c` `uwepgone` 873–885
`artifact_light`/`end_burn`/Tobjnam; gone-trio + `apply.c`
`o_unleash` `update_inventory`.
**Change:** junk-mail PAPER arm; async `uwepgone` snuff+shine
before `setuwep`; inventory on gone trio/`o_unleash`; await
from eat/steal/`selftouch`. Did not pull lesshungry
choke/fullwarn or setuwep begin_burn. Filled D-1203 archive
hash `a16884ab`. Rotated #1514. Open 10 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1525** **44**/44; next
@**#1530**).
**Verified:** canary **17**/17; green+strict seed8000/0900;
cohort **16**/16 + strict lengths (1500/1800/0014/0006/0361/
0108/0116/0004/0012/0360/4500/2200/0002/0007/0398/0373).
Public-unhit unless a metallivore eats mail or last lit
Sunsword is destroyed.
**Next:** Open `teleport.c` `scrolltele` unconscious (named).
Not Override yn.
**Blocked:** none.
