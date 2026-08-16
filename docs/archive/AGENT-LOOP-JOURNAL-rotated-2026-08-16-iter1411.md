# Rotated from AGENT-LOOP-JOURNAL.md after #1411 D-1109 lspo_exclusion

## 2026-08-16 18:48 — #1396 D-1097 kill_eggs after genocide

**Objective:** Open queue — `mon.c` `kill_eggs` after genocide
(named from sit D-1034). Not seffects SCR_GENOCIDE.
**C locus:** `mon.c` `kill_eggs` 5607–5635 /
`kill_genocided_monsters` 5637–5677; `timeout.c` `kill_egg`;
`dead_species(..., TRUE)`.
**Change:** walk invent array + nobj lists; EGG → `dead_species`
→ `kill_egg`; else `Has_contents` recurse `cobj`. Call on every
live fmon minvent then invent/fobj/migrating/buried. No
`continue` past minvent on deferred `newcham`. TIN/CORPSE `#if 0`
not ported. Stamped D-1034 review **Addressed:** D-1097.
Rotated #1381. Open 11 (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1395** **44**/44; next
@**#1400**).
**Verified:** private canary **24**/24; green+strict seed8000/0900;
cohort **15**/15 + strict 0106/0107/4500/0360. Path public-unhit.
**Next:** Open `read.c` `seffects` SCR_GENOCIDE. Not kill_eggs.
**Blocked:** none.
