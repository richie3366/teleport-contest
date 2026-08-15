# Rotated from AGENT-LOOP-JOURNAL.md at #1325

## 2026-08-15 21:44 — archive checked LOOP-QUEUE items

**Objective:** live queue must not accumulate `- [x]` rows.
**C locus:** n/a (queue hygiene).
**Change:** `scripts/archive-loop-queue-done.mjs` moves checked lines
to `docs/archive/LOOP-QUEUE-DONE.md` in the same commit as the fix;
supervisor runs it if leftover `[x]` remain. Drained D-1040–D-1043.
**Score:** unchanged (cadence still **#1310**).
**Verified:** helper no-op on unchecked-only queue; `bash -n` loop script.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.
