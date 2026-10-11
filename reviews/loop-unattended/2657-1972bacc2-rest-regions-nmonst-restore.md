# Review 2657 — 1972bacc2 — rest_regions n_monst restore (D-3793)

Metadata. SHA `1972bacc2` (2026-10-10), D-3793, parent
`7b77f6f77` (last audit). js diff: `js/region.js` +1/−0 —
`reg.n_monst = nMonst;` in rest_regions. Works
cliffs row-2 distfleeck (95203 + row-3 95249).

## Intent vs deliverable

Promise: 95203@418 — JS drew one extra size-1 gas-cloud
ttl C never draws; region-history DIAG shows JS created
the (69,6) vapor at step 341, removed it thin at 412,
and sustained it once then aged it with `n_monst=0,
mids=[733]` — the rest_regions fingerprint (remove paths
trim the array; only rest produces live-prefix-0 with a
surviving mid array).

Diff adds exactly the one line. Promise and diff match.

## Inventory

Changed JS (1 writer gap):

- rest_regions — `js/region.js:756` (`sym.mjs`: sync
  export). C: `region.c:798–892` (csym range; sole
  caller `restore.c:1225`).

## C ↔ JS fidelity

**C-exact.** C `:876` restores `r->n_monst` from the
record, `:877–884` the mid array + `max_monst =
n_monst`. JS restored the array and max but left the
literal `n_monst: 0`, so run_regions never visited the
restored mids (no fog sustain, no inside damage) and
later adds clobbered slot 0. The one line assigns the
count before the array/max lines, in C order. No branch
order, no RNG, no callee is touched; the ghostly
post-pass (`reset_region_mids` when `n_monst > 0`) now
fires per C `:886–888` instead of never. The stash
architecture (JSON record vs NHFILE) is the ledgered
D-2639 omit, unchanged. No symbol deleted or
re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero code hits (DIAG mentions are
commit-message prose for reverted temp traces). The
95249 second PASS is honestly flagged as "internal path
not separately traced" rather than claimed.

## Density

Cliff-phase §2b: one row-2 writer, one line, no
bundling. Row-1 randomize skip re-verified live
(`verify randomize_gem_colors: 0/0/2 unchanged`, both
probes step-0 D-3733 voids) — the exhausted-park
discipline, not head-skipping.

## Verification

D-log Verify: focused 3/4 → 4/4; distfleeck 1 PASS;
REACH 80/80 + 24/24; green/strict/cohort/full PASS.

Re-measured by this audit (`verify
distfleeck,rest_regions --base 1972bacc2~1 --reach-all`,
re-run on HEAD code):

```text
verify distfleeck: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Samurai-95203: PASS
reach distfleeck: 993 baseline-PASS reach it: 993 PASS, 0 regressed → REACH-OK
verify rest_regions: 0 blocked (vacuous, matches the D-log note)
```

Matches the D-log; the `--reach-all` reach (993/993)
is stronger than the shipped 80-spread. 0 regressed.
Committed scoreboard: 1039 → 1041 (+95203, +95249),
0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
