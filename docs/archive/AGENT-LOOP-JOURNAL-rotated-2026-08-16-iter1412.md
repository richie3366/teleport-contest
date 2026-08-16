# Rotated from AGENT-LOOP-JOURNAL.md after #1412 D-1110 goodpos live-mon onscary

## 2026-08-16 19:06 — #1397 D-1098 seffects SCR_GENOCIDE

**Objective:** Open queue — `read.c` `seffects` SCR_GENOCIDE
(named from sit). Not kill_eggs.
**C locus:** `read.c` `seffect_genocide` ~1722–1738 /
`do_class_genocide` ~2638–2820; `mondata.c` `name_to_monclass`
~1090–1176. Confusion ≡ HConfusion.
**Change:** wire `seffects` + `doread` allowlist; blessed → class
getlin (`name_to_monclass` then `name_to_mon`); `G_GENOD|G_NOCORPSE`
+ `kill_genocided_monsters`; own role/race `uhp=-1` / Unchanging
poly `done(GENOCIDED)`. Uncursed uses existing `do_genocide`.
livelog / Hallu / POLY_REVERT / cham `newcham` / `update_inventory`
still named. Filled D-1097 hash `d1e7ae23`. Rotated #1382.
Open 10 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary 21/21 `name_to_monclass` + 8/8 seffects;
green+strict seed8000/0900; cohort **10**/10 (5006/0002/0106/0105/
1500/1800/0009/0361/0107/2200). Public traces **unhit**.
**Next:** Open `teleport.c` `goodpos` youmonst swim/lev/fly/wwalk
pool and lava arms. Not `passes_walls`.
**Blocked:** none.
