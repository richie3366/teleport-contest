# Rotated from AGENT-LOOP-JOURNAL.md after #1497 D-1178 fix_shop_damage

## 2026-08-17 16:35 — #1482 D-1166 goto_level in_out_region

**Objective:** Open — `do.c` `goto_level` `in_out_region` (named).
Not walk.
**C locus:** `do.c` `goto_level` 1980–1981 after `obj_delivery`
before `fix_shop_damage`/`pickup`; callee `region.c`
`in_out_region` 480–527.
**Change:** await `in_out_region(u.ux,u.uy)` at that site and
`(void)` the return — do not abort the level change. Gas
`NO_CALLBACK` never rejects. Restored `REG_HERO_INSIDE` follows
the landing cell. Did not pull `obj_delivery` /
`fix_shop_damage` / `do_fall_dmg` or `run_regions` `hero_inside`
bit. Filled D-1165 archive hash `6d44ab7f`. Rotated #1467. Open 8
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1480** **44**/44; next
@**#1485**).
**Verified:** private canary **36**/36 (src void+order; empty;
enter/leave/stay-in/stay-out; `attach_2_u`; overlap; A→B; gas
NO_CALLBACK; can_enter/leave reject still completes; enter_f/
leave_f; same-level early return; rect edge; mixed attach);
green+strict seed8000/0900; cohort **41**/41 (CURRENT shared +
0014/0383/4500/2600) + strict 0101/0012/0360/4500/2200/0014/
0004/0367/0373/0002/0700/0015. Path public-unhit on arriving into
a live restored region.
**Next:** Open `hack.c` `m_postmove_effect` youmonst (named). Not
in_out_region.
**Blocked:** none.
