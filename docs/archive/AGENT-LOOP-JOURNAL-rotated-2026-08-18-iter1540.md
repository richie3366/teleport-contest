# Rotated from AGENT-LOOP-JOURNAL.md after #1540 review D-1209–D-1212 + cadence score

## 2026-08-18 05:25 — #1525 review D-1197–D-1200 + cadence score

**Objective:** audit = written C-fidelity review **and** full
`sessions` score (iteration-count % 5 == 0). No `js/` port.
**C locus:** `teleport.c` `scrolltele` 865–870 / `hack.h` `y_n` /
`pline.c` `You_feel`; `dog.c` `migrate_to_level` 913–915 /
`dungeon.c` `In_W_tower`; `dog.c` `mon_arrive` 607–613 /
`losedogs` 390–401 / `mon.c` `mnearto` FALSE; `allmain.c`
`newgame` 771 / 844–848 / `hack.c` `notice_all_mons`.
**Change:** reviews **159** ACCEPT D-1197 (W-tower OR + live
`yn_function` Override; unconscious/steed named), **160**
ACCEPT D-1198 (`In_W_tower` `|=2` on pre-relmon coords; `my`
still 0 until D-1199), **161** ACCEPT-WITH-DEBT D-1199
(After_you copies `my=xyflags` then `rloc`/`mnearto`;
failed_arrivals/wander/`MON_STILL_ARRIVING` named, not
Must-fix), **162** ACCEPT D-1200 (newgame off/on + catch-up
after Hello; `dolookaround` / vision.c caller named). Filled
D-1200 archive hash `15cb4a37`. No new Must-fix prepend.
Open 9 (no refill). Rotated #1510. Rule #2: no fs.
**Score:** cadence **#1525** **44**/44 Scr **11405**/11405 RNG
**792838**/792838 (100%) speed `31+0.27/turn` (R² 0.878). Next
@**#1530**.
**Verified:** C read of the four loci vs JS hunks; grep FORCE/fs/seed;
full `sessions` `__RESULTS_JSON__`.
**Next:** Open `artifact.c` `init_artifacts` (named). Not
wizkit.
**Blocked:** none.
