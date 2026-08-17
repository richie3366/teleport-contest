# Rotated from AGENT-LOOP-JOURNAL.md after #1516 D-1193 deliver_obj_to_mon

## 2026-08-17 21:53 — #1501 D-1181 rloc RLOC_ERR impossible

**Objective:** Open — `teleport.c` `rloc` `RLOC_ERR` impossible()
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc` 1884–1888 after candy; callee
`pline.c` `impossible` 584–634.
**Change:** no `rloc_pos_ok` and no `goodpos` backup + `RLOC_ERR`
→ urgent `"rloc(): couldn't relocate monster"` then disorder /
report then FALSE. Without the bit, silent FALSE. Thin
`display.js` `impossible` (`in_sanity_check` skip extra;
`something_worth_saving` save-hint). Did not pull ustuck-together,
wand `makeknown`, `set_msg_xy`, or `rloc_pos_ok` mx==0. Named
omit paniclog file / recursive panic / debug_fuzzer / CRASHREPORT.
Filled no prior missing archive hash. Rotated #1486. Open 8 after
archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1500** **44**/44; next
@**#1505**).
**Verified:** private canary **25**/25 (no-flag silent false;
RLOC_MSG-only silent; RLOC_ERR bug+disorder+report; NOMSG still
impossible; worth_saving hint; sanity skip extra; recursive
no-op; %s; null; exact C string; flag bits); green+strict
seed8000/0900; cohort **12**/12 (green + 1500/1800/0015/0002/
0014/2200/4500/0367/0360/0012) full RNG+screens. Path
public-unhit unless a RLOC_ERR caller cannot place.
**Next:** Open `teleport.c` `rloc_pos_ok` mx==0 updest/dndest
(named). Not room lock.
**Blocked:** none.
