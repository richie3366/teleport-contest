# Rotated from AGENT-LOOP-JOURNAL.md after #1512 D-1190 kill_genocided

## 2026-08-17 21:10 — #1497 D-1178 goto_level fix_shop_damage

**Objective:** Open — `do.c` `goto_level` `fix_shop_damage` (named).
Not obj_delivery.
**C locus:** `do.c` `goto_level` 1985–1986 `if (!new)` after
`in_out_region` before `do_fall_dmg`/`pickup`; callee `shk.c`
`fix_shop_damage` 4849–4874 / `repair_damage` catchup 4731–4845.
**Change:** port catchup repair (`shk_impaired`, delay/occupancy/
trap/owner gates, trap convert, terrain restore, litter
`rn2(9)`). Wire `!madeNew` after `in_out_region`. Catchup skips
only post-`block_point` messages. Did not pull `shk_fixes_damage`
in `shk_move`, allmain/bones callers, or `do_fall_dmg`. Filled
D-1177 archive hash `36e0ce72`. Rotated #1482. Open 11 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1495** **44**/44; next
@**#1500**).
**Verified:** green+strict seed8000/0900; cohort **10**/10
(green + 1500/1800/0015/0002/0014/2200/4500/0367) full RNG+
screens. Path public-unhit unless a session revisits a damaged
shop after 5 turns.
**Next:** Open `do.c` `goto_level` `do_fall_dmg` (named). Not
fix_shop_damage.
**Blocked:** none.
