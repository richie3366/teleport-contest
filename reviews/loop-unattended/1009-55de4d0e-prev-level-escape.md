# Review 1009 — 55de4d0e — dungeon.c prev_level Dlvl1 escape arm (D-2039)

Metadata: SHA `55de4d0e`, D-2039, Open-row port (5
escape sessions, screen-first at end.c:630). js/
touches `js/do.js` (+9/−6, one arm). No scoreboard
touch this time. No stamp owed.

## Intent vs deliverable

Subject promises: C-order branch arm in
`prev_level` — Dlvl1 without Amulet → dynamic
`import('./end.js')` + `await done(ESCAPED)` +
return; else follow tolev; else dlevel−1. Diff
actually adds: exactly that, replacing the
"amulet/escape arms deferred" stub. Promise ==
diff. No deletes / re-points.

## Inventory

- Changed JS: `prev_level` branch arm (exported,
  do.js). `sym.mjs`: `done js/end.js:1404 ASYNC`
  (awaited ✓). Dynamic import matches two
  pre-existing same-file uses (do.js:1271/:1441,
  the latter the goto_level ledger≤0 noreturn arm
  cited — same SCC, no static edge, no TDZ risk).
  No STUB / clone / no-op. Named: the
  `addinv_core1` uhave/achievement family is
  explicitly NOT this cluster (with session-level
  mechanism: ACH_BELL/ACH_CNDL prompt suffix) —
  exemplary scoping.

## C ↔ JS fidelity

Against `dungeon.c:1517–1543` (csym range; commit
comment cites `:1526–1544`, in-function lines —
fine), branch-by-branch confirm:

- `stairway_at` + `u_traversed` ✓ (pre-existing).
- Outer `at_stairs && stway && tolev.dnum !=
  uz.dnum` ✓, with the KMH comment carried.
- Inner `!uz.dnum && dlevel==1 && !uhave.amulet
  → done(ESCAPED)` ✓ / else tolev +
  `goto_level(...,FALSE,FALSE)` ✓ (arg order
  `(newlevel, at_stairs, false, false)` preserved
  in both arms).
- Else `dnum same, dlevel−1` + goto_level ✓.
- Amulet test `u.uhave?.amulet || u.uhave_amulet`:
  the flat fallback is this file's convention
  (do.js:1933, same idiom; teleport.js:2248 the
  sole writer) — matches the STRANGLED-arm
  pattern from review 1005. C `done()` noreturn →
  JS `await done(); return;` ✓.
- RNG: none in this envelope — consistent with
  full-RNG-match-to-step on all five sessions.

## Hallucinations / overclaim

None. The with-Amulet tolev arm is disclosed as
live-but-unreached (no Amulet-carrying
Dlvl1-up corpus case) rather than claimed
verified — honest about the unverified arm.

## Density

~9 insertions for one 27-line C function arm. C
is that small; one falsifier, complete handoff.

## Verification

- `imports.mjs --rulecheck`: clean (whole-tree).
  Diff is branch + import + return; nothing to
  grep beyond the pattern already cleared.
- Re-measured `hidden-proxy verify disclose --base
  55de4d0e~1`: `1 PASS, 4 moved past, 2 unchanged,
  0 worse → PROGRESS` — matches the D-log
  session-for-session and step-for-step
  (Rogue-92089 PASS; four moved to
  one_characteristic/save_dungeon; Monk-92031 +
  Priest-92098 still disclose on the named
  achievements suffix). The residuals are the
  named non-cluster, not this arm.
- Green 2/2 + strict ×2, cohort 7/7, full 44/44
  per D-log (owed: do.js is shared; claimed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
