# Rotated from AGENT-LOOP-JOURNAL.md after #1409 D-1108 wash_hands

## 2026-08-16 18:22 — #1394 D-1096 dryup wizard y_n

**Objective:** Open queue — `fountain.c` `dryup` wizard yn (named).
Not angry_guards.
**C locus:** `fountain.c` `dryup` 216–219; `hack.h` `y_n`;
`flag.h` `wizard` ≡ `flags.debug`.
**Change:** after town warn, `isyou && wizard_mode()` →
`yn_function('Dry up fountain?', 'yn', 'n')`; `'n'` (and
quit→def) return without drying. No `debug_fuzzer` gate.
Did not pull `angry_guards` / cloud-glyph / Deaf shake.
Filled D-1095 hash `a86a7111`. Rotated #1379. Refilled Open
to 12 from fountain named omits. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1390** **44**/44; next
@**#1395**).
**Verified:** private canary **12**/12; green+strict seed8000/0900;
cohort **15**/15 + strict 0014/0006/2200/0360. Path public-unhit.
**Next:** Open `mon.c` `kill_eggs` after genocide.
**Blocked:** none.
