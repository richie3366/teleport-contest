# Review 2067 — ebd112f3b — makemap_remove_mons + unmakemon

- SHA: `ebd112f3b` (D-3107)
- Subject: "wizcmds.c makemap_remove_mons + makemap_unmakemon whole (coverage)"
- js/ insertions: ~107 (wizcmds.js) + scripts test
- Prior index: 2066; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port MISSING `makemap_remove_mons` + callee
`makemap_unmakemon` whole and wire the `#wizmakemap` pre-arm (was a
named omit, so the old incarnation's monsters survived mklev).

Diff actually adds: file-local async `makemap_unmakemon`, exported
`makemap_remove_mons`, the awaited pre-arm call, extended/new imports,
a 3-case test. Matches the promise; no extra scope.

## Inventory

Per-function (cluster of 2, head + callee):

- `makemap_remove_mons` (export) — C wizcmds.c:108–150. Whole body:
  keepdogs, fmon walk, migrating walk, dmonsfree, fmon-empty check.
- `makemap_unmakemon` (file-local ≡ staticfn) — C :71–105. Whole
  body: vitals un-extinct/born--, isgd/dead/shk chain, migratory
  re-prepend, mongone.

Helpers: all LIVE — keepdogs (dog.js), setpaid (shk.js), mongone/
dmonsfree (mon.js), monsndx (mondata.js), on_level/impossible
(pre-existing), G_UNIQ/G_EXTINCT/MON_*/ESH-PRI-GD consts. No clones,
no stubs, no deleted symbols (`sym.mjs` check not triggered). Edge
safety re-checked (commit claims SAFE):

```text
ALREADY: wizcmds.js already statically imports dog.js. No new edge needed.
ALREADY: wizcmds.js already statically imports shk.js. No new edge needed.
```

## C ↔ JS fidelity

`makemap_unmakemon`, in C order: monsndx; unique un-extinct
(`geno&G_UNIQ → mvflags&=~G_EXTINCT`) and plain `born--` BEFORE the
dead-return — preserving C's "ignores DEADMONSTER" comment; the
255-cap guard correctly absent (it belongs to unmakemon's own C, not
this function). Vitals-ensure mirrors makemon.js unmakemon (C
svm.mvitals always present; JS on-demand) — house mapping.
isgd-clear-fallthrough / dead-return / same-level-shk-setpaid chain
verbatim (DEADMONSTER ≡ mhp<1). Migratory arm: mstate bit ops
verbatim, `nmon=fmon[0]; unshift` ≡ C prepend. mongone awaited
(async only for that). No RNG. Exact.

`makemap_remove_mons`, in C order: keepdogs(TRUE) awaited; fmon walk
skipping DEADMONSTER with unmakemon(FALSE) — snapshot walk is the
correct rendering of C's nmon walk under mongone-detach (mongone
never appends to fmon; keepdogs dog.js:448 precedent); migrating
mextra+home-level shk/priest/guard test verbatim with index-splice
≡ mprev unlink and unmakemon(TRUE); dmonsfree awaited; `if (fmon)
impossible("makemap_remove_mons: 'fmon' did not get emptied?")`
verbatim. Exact.

Callers: remove_mons' sole C caller cmd.c:992 → JS makemap_prepost
pre-arm awaits at the :992 position (in-diff, omit retired);
unmakemon's 2 C sites (:122 FALSE, :139 TRUE) both in-function.
No unwired caller.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. "Whole body, every callee live" holds for both.

## Density

Breadth-phase cluster: 2 functions, one C file + callee closure,
~107 js/ insertions. Each function has its own Inventory block, its
own `Ledger:` entry, its own Verify line. No bundled Must-fix.
Per-function verdicts: ACCEPT / ACCEPT.

## Verification

Re-measured at this SHA (`--base ebd112f3b~1 --reach-all`, one call):
both functions 0 blocked at baseline and working tree, vacuous notes
printed, smoke 24/24 → REACH-OK each. Matches the D-log exactly. No
REGRESSED session. Shared gates per D-log: syntax, rule2, green 2/2,
strict ×2, cohort 7/7 + committed test 3/3 (D-3092 pattern — the
pre-arm wiring is pinned, good).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
