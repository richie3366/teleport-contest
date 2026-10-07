# Review 2474 — 4a967d2f0 — whatis doset addr repoint (D-3592)

**Metadata.** SHA `4a967d2f0` (2026-10-07, D-3592). Type: **cliff**:
writer port for the cliffs head `apply.c use_whip` (region
heuristic matched the getpos_menu title; owner body whole and
untouched). `js/` insertions: 2 (`js/options.js` +2/−2) +
committed test.

## Intent vs deliverable

Promise: doset's bool table bound `whatis_menu`/`whatis_moveskip`
to dead `iflags.whatis_*` keys while getpos.js reads the live
`getloc_*` fields, so C took the getpos.c:1016 menu path and JS
cycled; repointing both keys moves Tourist-94111 109→185.

Diff actually adds: the two key repoints with optlist cites.
Promise matches diff. No symbols deleted or re-pointed (table
keys, not imports — the equivalent diligence is the reader grep
below).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | optfn_boolean do_set/doset bool addr binding | ported (binding fix) | [options.js](/home/debian/dev/teleport-contest/js/options.js:10343) | optlist.h:874–879, options.c:5192–5449, getpos.c:1016 |

Helpers: none added, none stubbed.

## C ↔ JS fidelity

**Both addrs are exactly C.** optlist.h:874–879 (read):
`NHOPTB(whatis_menu, … &iflags.getloc_usemenu)`,
`NHOPTB(whatis_moveskip, … &iflags.getloc_moveskip)` ✓. Consumer
getpos.c:1016 (read): `if (iflags.getloc_usemenu)` ✓, and the
moveskip consumer arm reads `iflags.getloc_moveskip` ✓. JS
`getpos.js` reads/writes exactly those live fields
(:1143/:1170/:1580/:1683/:1704/:1720, grepped) ✓. Repo-wide grep
confirms zero remaining `iflags.whatis_*` field accesses — the
old keys were write-only dead (display + toggle agreed with each
other through step 108, which is why every options screen matched
while getpos saw false) ✓. Both doset paths flow through the
repointed table (`doset_bool_value` :10455, `optfn_boolean_do_set`
:10666) ✓, and the `allopt` mirror (:12149/:12151) already
carried the C-correct addrs — the two tables now agree ✓. No RNG.

## Hallucinations / overclaim

One harmless D-log inaccuracy: "rc/sysconf … is fixed on the same
lines" — the rc path (`optfn_boolean` REQ_DO_SET, :10482, read)
writes via `allopt[].addr`, which was already C-correct, so rc was
never broken and is unchanged; only the doset display/toggle path
needed the fix. The `js/` change itself is exactly right, and the
"6 other mismatches left for evidence-driven work" scoping is
honest cliff-phase discipline.

## Density

Cliff §10.18: cliffs-head writer, one binding completing the
ported row, own `Ledger:` touch (D-append on optfn_boolean).
Per-function verdict ACCEPT → SHA ACCEPT. Nit (pre-existing, not
this SHA): the row's note "no JS symbol (measured MISSING)" is
stale — `optfn_boolean` is live at options.js:10482.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2471).
- Committed test `whatis-menu-doset-addr.test.mjs`: 2/2 PASS now
  (0/2 pre-fix claimed in-ship via stash — consistent with a
  binding-only change).
- Re-measure (mine): `verify use_whip --base 4a967d2f0~1
  --reach-all` → **0 PASS, 1 moved past, 0 unchanged, 0 worse**
  (Tourist-94111 → handler_paranoid_confirmation@185, was 109 —
  the D-log's line exactly) + smoke 24/24 REACH-OK. No REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
