# Rotated from AGENT-LOOP-JOURNAL.md after #1389 D-1092 makemon S_ORC/S_UNICORN mlet peace

## 2026-08-16 13:40 — #1374 D-1080 u_entered_shop deserted/angry/Invis/doorway

**Objective:** Open queue — `shk.c` `u_entered_shop` deserted /
angry / Invis / pickaxe doorway (named D-0307).
**C locus:** `shk.c` `deserted_shop` 723–747; `u_entered_shop`
751–917.
**Change:** Port deserted_shop + empty_shops latch; Invis /
angry/surcharge/robbed welcomes; pickaxe/mattock/steed/Fast
doorway extra `dochug`. `carrying()` walks `game.invent`. Did
not pull SetVoice / Soundeffect / Hallu shkname / `shk_move`
Fast+floor pickaxe. Filled D-1079 Addressed hash `d7d679c1`.
Rotated #1359 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** private canary 17 cases; green+strict seed8000/0900;
cohort **41**/41 (incl. 0030/0116/0361/1150) + strict
0030/0116/0361/0014/4500/0360/2200. New arms public-unhit.
**Next:** Open `eat.c` `cprefx` `revive_corpse` after rider
lifesave. Audit @**#1375**.
**Blocked:** none.
