# Review 959 — 7ed1c205 — calendar.c getlt NY DST shift (D-1989)

- SHA: `7ed1c205` — "calendar.c getlt skipped the EDT→EST localtime shift, hiding the new-moon welcome pline (D-1989)."
- D-id: D-1989. JS: `js/calendar.js` (+78/−30). C locus: `nethack-c/upstream/src/calendar.c` `getlt` `:40–46` (`localtime(getnow())`, fetched this review); contest patch `001-deterministic-runtime.patch` `time_from_yyyymmddhhmmss` (fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the localtime DST shift behind the missing
new-moon pline. Diff actually adds: a module-local
America/New_York engine (transition rules, EST/EDT offset,
`nyLocaltime`), `getlt() = nyLocaltime(getnow())`, `lt_for_date`
on the same engine. Promise matches deliverable.

## Inventory

- New: 4 local functions (`daysInMonth`, `weekdayOf`, `nyTransitionsUTC`, `nyOffsetSecs`, `nyLocaltime` — engine), 1 rewritten export.
- Changed: `lt_for_date` arm.
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Mechanism verified end-to-end, not just asserted: patch 001
copies the recording machine's live `localtime` struct (EDT,
`tm_isdst = 1`) then overwrites civil fields before `mktime`,
so a winter stamp becomes a stamp-as-EDT epoch (UTC−4) — the
D-log's story is structurally true. Re-reading under NY rules
lands one hour earlier in EST: my spot probe at HEAD gives
`20000206000000` → Feb 5 23:00 Sat yday 35 isdst 0, exactly
the D-log claim (yday −1 → moon phase 0 → the pline) ✓.
Transition rules checked: pre-2007 first-Sun-Apr 07:00 UTC →
last-Sun-Oct 06:00 UTC; 2007+ second-Sun-Mar → first-Sun-Nov
✓ correct US rules; spring/fall UTC hours (07:00/06:00) encode
02:00 local on the right side ✓. `lt_for_date` now honors DST
instead of the fixed −4 ✓ (strictly closer to
`localtime(&date)`). UTC-year transition lookup is safe
(transitions far from Jan 1). Rule #2 clean: only
`Date.UTC`/getUTC* decomposition, no Intl/node TZ ✓ (imports
unchanged). No RNG.

Callee closure: no new imports at all. No STUBs, no clones.

## Hallucinations / overclaim

None. "Named: none — all live" holds (getlt/phase/friday/night/
midnight/yyyymmdd/hhmmss/getyear verified present by the
all-live claim; the wall-clock non-replication is disclosed as
intentional).

## Density

+78/−30, one C function + its engine in one module, 51 corpus
sessions. Dense per §2b.

## Verification

`verify welcome --base 7ed1c205~1` re-run this review → "3
PASS, 48 moved past, 0 unchanged, 0 worse → PROGRESS" (D-log
said 1/50 on its older baseline; same 51 sessions, two more
PASS now via later D-1990-class fixes — improvement, not drift).
Spot probe: Jul 4 unshifted EDT, Oct 13 Friday EDT (Friday-13th
cohort preserved, matching the 2/2 cohort claim). Green +
strict + cohort 7/7. `--rulecheck` clean (re-run). Added-line
grep: no banned tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
