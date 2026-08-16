# Rotated from AGENT-LOOP-JOURNAL.md after #1398 D-1099

## 2026-08-16 16:05 — #1383 D-1087 rndcurse Antimagic shieldeff

**Objective:** Open queue — `sit.c` `rndcurse` `shieldeff` (named
omit). Not update_inventory / hcolor.
**C locus:** `sit.c` `rndcurse` (~581–583); `display.c` `shieldeff`
(~1109–1124); `decl.c` `shield_static`; `display.h` SHIELD_COUNT 21.
**Change:** `display.js` `shieldeff` matches C (sparkle opt_out On;
`cansee`; 21 ASCII S_ss1..4 + `flush_screen(1)` + `nh_delay_output`;
`newsym` restore). `rndcurse` awaits it on Antimagic. Did not pull
`update_inventory` / hcolor / other callers. Filled D-1086 hash
`89a97acc`. Rotated #1369 to archive. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1380** **44**/44; next
@**#1385**).
**Verified:** private canary 8/8 (21-frame `shield_static`; `!sparkle`
/ `!cansee` skip; `rndcurse` Antimagic 21 vs !Antimagic 0);
green+strict seed8000/0900; cohort **9**/9 (0106/0107/0108/4500/
1500/1800/0017/0360/2200) + sit strict.
**Next:** Open `makemon.c` `m_initweap` `ptr.msound` MS_GUARDIAN /
MS_PRIEST.
**Blocked:** none.
