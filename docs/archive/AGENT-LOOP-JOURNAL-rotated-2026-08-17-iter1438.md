# Rotated from AGENT-LOOP-JOURNAL.md at port #1438

## 2026-08-17 00:40 — #1423 D-1119 teleok tele_jump_ok / in_out_region

**Objective:** Open queue — `teleport.c` `teleok` `tele_jump_ok`
/ `in_out_region` (named). Not vibrating.
**C locus:** `teleport.c` `teleok` 440–443 / `tele_jump_ok`
386–417; `region.c` `in_out_region` 480–527.
**Change:** `teleok` after `goodpos` runs `tele_jump_ok(u.ux,
u.uy,x,y)` then `in_out_region`. Port `in_out_region` three
loops (can_enter/leave; leave bit; enter bit). Gas stays
NO_CALLBACK so never rejects. `make_gas_cloud` inits those
fields + `add_region` hero_inside. Did not pull enter_msg
pline, force fields, `update_player_regions`, or
hack.c/dothrow callers. Filled D-1118 hash `8a01c200`.
Rotated #1408. Open 9 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1420** **44**/44; next
@**#1425**).
**Verified:** private canary **35**/35; green+strict seed8000/0900;
cohort **24**/24 (0360/4500/0373/0367 + 2200/0014/0004/0009/
1500/1800/0060/0102/0700/0017/0030/0116/0383/0007/0361/0108/
0002/0012/5002/2600) + strict 0360/4500/0014/2200/0004/0009/
0367/0373/0030/0012/0002/0116. Path public-unhit on restricted
dests.
**Next:** Open `teleport.c` `tele_trap` Antimagic wrenching
pline. Not vault_tele.
**Blocked:** none.
