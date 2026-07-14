# Agent loop journal archive (rotate 12)

## 2026-07-14 20:33 — #333 D-0310 bot skip uhp==-1

- Objective: seed0030 @580 HP:0 vs C HP:11 (CURRENT).
- C locus: `botl.c` `bot` — no-op when `u.uhp == -1`.
- Change: cache last status; suppress botl paint on exact overkill (D-0310).
  Hypothesis “wand/melee over-damage” falsified — damage after hitmsg is
  faithful; display refreshed too early.
- Verification: prefix **580→582**; Scr **1383→1387**; green+strict;
  17 PASS cohort + strict sample.
- Next: @582 Maganasipi takes all your possessions.
