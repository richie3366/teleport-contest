# Review 2650 — 6301e5617 — healup canonical Upolyd gate (D-3786)

Metadata. SHA `6301e5617` (2026-10-10), D-3786, parent
`6816eb0b4` (HEAD). js diff: `js/potion.js` +4/−1 —
healup's `u.Upolyd` flat → canonical `Upolyd(u)`
+ comment; new focused test (3 its). Works
cliffs row-2 do_statusline2 (95346).

## Intent vs deliverable

Promise: 95346@474 — C HP:18 vs JS HP:19 on
identical toplines; prefix-state bisect pinned
the +1 to step 448's quaffed-booze healup(1)
while poly'd: the gate read never-written
`u.Upolyd`, so healing hit human uhp instead of
mh.

Diff delivers the one-gate swap to the canonical
live `Upolyd(u)` (already imported, 5 live
sites). Promise and diff match.

## Inventory

Changed JS (1 writer):

- healup gate — `js/potion.js:2346–2350`. C:
  `potion.c:1427–1458` (whole body read; gate
  `:1432 `if (Upolyd)`).
- Macro: `you.h:554` `#define Upolyd
  (u.umonnum != u.umonster)` — read; JS
  `js/const.js:3216` canonical export matches
  exactly (umonnm vs umonster, `| 0`).

## C ↔ JS fidelity

**Gate C-exact.** `grep '\.Upolyd\s*=' js/`
confirms zero writes to the flat this audit
re-ran — the old gate was always-false, the new
gate is the macro. JS healup remainder is whole
vs C: mh arm + cap (`u.mh = (u.mhmax += nxtra)`
shape), uhp arm + cap + uhppeak, cureblind
order (cream → make_blinded → make_deaf),
curesick (vomiting → sick), botl. The named
healmon→healup youmonst arm (`mon.c:4600`) is a
documented no-op at `js/mon.js:2329` with its
comment — pre-existing, different C function,
correctly not wired here. No symbol deleted or
re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The localization is
measured (prefix-state bisect 407→450, C log
441–450 with the single state-changing event),
not inferred from the HP delta. Unchanged
sessions named as independent writers.

## Density

Cliff-phase §2b: one row-2 writer, one gate
line, no bundling. 95346 474 → 751 (+277).
potion.js not shared — full suite correctly
skipped per matrix.

## Verification

D-log Verify: do_statusline2 1 moved, 3
unchanged; REACH-OK both fns; gates + cohort
PASS.

Re-measured by this audit (`verify do_statusline2
--base 6301e5617~1 --reach-all`):

```text
verify do_statusline2: 0 PASS, 1 moved past, 3 unchanged, 0 worse → PROGRESS
  scen-sweep-Healer-95346: moved → polymon at step 778 (was 474)
smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (95346 at 778 vs 751 — later
SHAs moved it further). 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
