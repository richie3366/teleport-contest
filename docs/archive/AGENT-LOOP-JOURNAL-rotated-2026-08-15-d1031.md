# Rotated from AGENT-LOOP-JOURNAL.md (#1300 / D-1031)

## 2026-08-15 13:02 — D-1016 shopdig um_dist snatch polarity

**Objective:** C-wrong Keep — D-0958 snatch ran when shk was far.
**C locus:** `shk.c` `shopdig` `!um_dist && !helpless && bill`;
`apply.c` `um_dist`; `worn.c` `setnotworn`.
**Change:** skip snatch iff `um_dist || helpless || !bill`; snatch
loop uses exported `do.js` `setnotworn` (extrinsics). Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; shop/dig/wear cohort **9**/9
(seed0116/0060/0361/1800/0009/0014/0360/0103/0104). Snatch path
likely **unhit** by public traces — fortress not a snatch proof.
**Next:** D-1017 `cancel_monst` invent Array vs `nobj`.
**Blocked:** none.
