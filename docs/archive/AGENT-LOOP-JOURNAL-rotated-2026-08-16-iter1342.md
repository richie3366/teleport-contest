# Rotated from AGENT-LOOP-JOURNAL.md after #1342 D-1063

## 2026-08-16 01:55 — #1326 review D-1052/D-1053 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`1710bd41` D-1052, `178d60f2` D-1053)
against pinned C, not the journal.
**C locus:** `youprop.h` `Glib`; `potion.c` `make_glib`/`set_itimeout`;
`apply.c` `use_lamp`/`use_towel`/`use_grease`; `timeout.c` generic
TIMEOUT `--`; `sounds.c` `cry_sound`/`growl_sound`; `monflag.h`
`enum ms_sounds`; `monst.c` `SIZ`.
**Change:** reviews 13 ACCEPT (ticking `uprops[GLIB].intrinsic`
remainder; H\|E is the old review’s name, not a C macro) and 14
ACCEPT (`msounds[]` is C SIZ; cry no longer always-chitter). No new
Must-fix. Filled Addressed hash `178d60f2`. No `js/` edits. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1325** **44**/44; next
@**#1330**).
**Verified:** C read of `youprop.h:112`, `potion.c:56–78`/`460–467`,
`apply.c:125–167`/`1669–1673`/`2633–2643`, `timeout.c:670–671`/`935–936`,
`monflag.h:10–59`, `sounds.c:351–397`/`617–654`/`696–697`,
`zap.c:654–688`; 35/35 `msounds[]` samples; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix `get_obj_location` flags `0` vs CONTAINED
(D-1036 risk 4). `timeout.js` already gates CONTAINED on
`CONTAINED_TOO`; prove remaining `where`/clone or close the row.
**Blocked:** none.
