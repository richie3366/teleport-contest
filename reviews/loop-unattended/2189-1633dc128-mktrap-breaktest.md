# Review 2189 — 1633dc128 — mktrap_victim clone retirement to live breaktest

SHA `1633dc128`, D-3228; 2026-10-01; js/mklev.js (+4/−18) only.
Single-function cluster (mklev.c). Closes no prior review.

## Metadata

- Subject: "`mklev.c` mktrap_victim: retire mktrap_breaktest clone
  to live breaktest (D-3228)."
- Promises: delete the 17-line local clone; import live
  dothrow.js breaktest (--can SAFE); call site cites C :1877–1885
  + D-0864; no other body change.

## Intent vs deliverable

Kept exactly. Clone deleted, import added, one call site
re-pointed with an accurate comment. Nothing else in the body
moves.

## Inventory — mktrap_victim

Changed: `mktrap_victim` (js/mklev.js, local) — one call site.
Deleted: `mktrap_breaktest` (local clone). Added import:
`breaktest` from dothrow.js. Required `sym.mjs` on the
deleted/re-pointed symbols:

```text
mktrap_breaktest NOT FOUND in js/** (no export, no local function/const).
breaktest        js/dothrow.js:1308   sync
```

Clean deletion, single live export, no remaining clones.

## C ↔ JS fidelity — mktrap_victim

C `mklev.c:1814–1934` (csym range; sole call site `:2151` inside
mktrap's victim gate ✓). The touched arm (`:1877–1885`): PIT-as-
exploded-LANDMINE → `breaktest(otmp)` → dealloc else place ✓ —
JS now calls the live export in that exact shape.

The swap is a fidelity fix, verified both directions. C
`breaktest` (dothrow.c:2581–2609, csym): glass-armor 90-chance,
`obj_resists(obj, nonbreakchance, 99)`, glass-otyps, POTION→
POT_WATER switch. The deleted clone inlined the resist as bare
`rn2(100)` with `chance < (oartifact ? 99 : nonbreakchance)`,
dropping obj_resists' no-RNG invocation-arti/rider early-true arm
(D-0864) — i.e. it consumed RNG where C consumes none and could
break what C keeps. The live export (dothrow.js:1308, re-read)
calls `obj_resists(obj, nonbreakchance, 99)` ✓ with the identical
switch ✓ — a faithful port of C. Signature-compatible (sync
obj→bool into a sync caller; no await cascade). Import safety:
`--can` reports ALREADY (mklev→dothrow edge pre-exists), so not
even a new module edge — safer than the claimed SAFE.

Untouched-body claims check out: `curse()` sync calls and
`if (!otmp)` guards are context lines, unchanged by this SHA.
RNG: the only stream change is the intended one (early-true arms
no longer burn `rn2(100)`), matching C call-for-call.

Diff grep: 1 hit, commit message only ("No DIAG/FORCE/seed
gates"), 0 in code. Rule #2 clean (js-internal import).

## Hallucinations / overclaim

None. The D-1849-class diagnosis matches the deleted code
verbatim.

## Density

One whole C function completed (clone retirement), one file, no
Must-fix bundled ✓. Below the ~80 guideline with 2 stale pops en
route — legitimate small-C exception, named in the D-log.

- Ledger: mktrap_victim ported — ACCEPT.

## Verification

Re-measured (current tree):

```text
verify mktrap_victim: baseline 1633dc128~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach mktrap_victim: 325 baseline-PASS session(s) reach it (325 run, 144.9s): 325 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + full-spread 325/325 REACH-OK).
No REGRESSED session — the RNG-stream fix disturbs no passing
session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
