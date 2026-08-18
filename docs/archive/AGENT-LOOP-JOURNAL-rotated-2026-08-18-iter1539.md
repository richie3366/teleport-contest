# Rotated from AGENT-LOOP-JOURNAL.md after #1539 D-1212 revive_corpse MINVENT/CONTAINED

## 2026-08-18 05:12 — #1524 D-1200 newgame notice_mon_off

**Objective:** Open — `allmain.c` `newgame` `notice_mon_off`
(named). Not wizkit.
**C locus:** `allmain.c` `newgame` 771 first after locals;
844–848 after `welcome(TRUE)`. Macros `flag.h` 233–237;
callee `hack.c` `notice_all_mons` 1744–1783 (D-1142).
**Change:** `notice_mon_off` at newgame entry; `notice_mon_on`
+ `notice_all_mons(TRUE)` after welcome (`!glyph_updates`).
Did not pull `dolookaround`, `reset_glyphmap`, vision.c
`:856`, mapping/wizcmds/save, `init_artifacts`, or
`spot_monsters` wiring. Default Off so public catch-up is a
no-op. Filled D-1199 archive hash `4dc76022`. Rotated #1509.
Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **38**/38; green+strict
seed8000/0900; cohort **14**/14 + strict 1500/1800/0012/0360/
4500/2200/0014/0004/0700/0006/0108/0116.
**Next:** Open `artifact.c` `init_artifacts` (named). Not
wizkit.
**Blocked:** none.
