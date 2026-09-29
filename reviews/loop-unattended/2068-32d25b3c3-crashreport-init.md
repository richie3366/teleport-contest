# Review 2068 — 32d25b3c3 — crashreport_init degenerate port

- SHA: `32d25b3c3` (D-3108)
- Subject: "report.c crashreport_init degenerate port + 2 stale pops (coverage)"
- js/ insertions: 47 (new js/report.js, zero imports)
- Prior index: 2067; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: degenerate remainder port of MISSING `crashreport_init`
(startup build-id init has no /proc or fd I/O in scored JS, so only
the once-guard + `skip:`-arm `bid="unknown"` survive) plus two stale
pops.

Diff actually adds: new js/report.js with the once-guard, the
skip-arm bid, and per-line cites for every omitted hash step; ledger
stale notes for the two pops. Matches the promise; no extra scope.

## Inventory

Single function:

- `crashreport_init` (js/report.js:28, sync export) — C report.c:112–174
  (csym range). Live: once-guard, `skip:` bid, nhUse voids. Named: the
  `:118–166` self-hash path, BETA arm, unported caller.

Helpers: none — zero imports (the only callee, raw_printf :128, sits
in the compiled-out BETA arm). No clones, no stubs. `sym.mjs`
confirms the single home (`js/report.js:28 sync`); nothing deleted
or re-pointed.

## C ↔ JS fidelity

Against C :112–174: `static int once` → module boolean, second-call
early return exact. The `:118–166` hash path dissolves step by
step: HASH_BINFILE is readlink /proc/self/exe with `goto skip` on
error (report.c:79–86, verified), then open + 4K read loop + nhmd4
init/update/finish + hex — every step needs /proc or fd I/O, which
has no scored analogue (Rule #2; nhmd4 is live but has no input
bytes here). C takes `goto skip` whenever any step fails, so
`bid="unknown"` is the only reachable outcome — JS renders exactly
that with `:168–169` cite. BETA `:127–129` arm: no `define BETA` in
config.h/patchlevel.h (verified) — compiled out, correctly cited.
HASH_CLEANUP is empty on Linux (verified) — correctly a no-op cite.
nhUse(argc/argv) → void cites. Sync like C. Exact degenerate
remainder: nothing reachable is dropped, nothing unreachable is
invented.

Callers: sole C caller allmain.c:38 (early_init, unported) — exported
unwired, named. Same-file bid readers (crashreport_bidshow, crash-URL
builder) noted as future rows; bid recomputed per startup, never
saved — no state contract broken.

Stale pops: `visible_region_summary` (review 488) + `vraw_printf`
(review 1532). Verified: 488 is ACCEPT-WITH-DEBT whose Actionable
section reads "None at the claimed listing" (debt is named omits,
not C-wrongs), 1532 is ACCEPT — the "no C-wrongs" claim holds and
both ledger notes cite the JS homes + wired callers. Legitimate pops.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.
Rule #2 clean by construction (no imports, no I/O).

## Hallucinations / overclaim

None. The degenerate shape is proved necessary (every hash step
traced to a Rule #2 boundary), not merely asserted.

## Density

Single-function cluster, 47 js/ insertions — below the ~80 line,
excused per the §2b unless-clause (sole report.c Open row; nothing
else in the file or callee closure is Open — zero imports). One
Inventory block, one `Ledger:` entry (`partial` with the omit),
one Verify line. Verdict: ACCEPT.

## Verification

Re-measured at this SHA (`--base 32d25b3c3~1 --reach-all`): 0 blocked
at baseline and working tree, vacuous note printed, smoke 24/24 →
REACH-OK. Matches the D-log exactly. No REGRESSED session. Shared
gates per D-log: syntax, rule2, green 2/2, strict ×2, cohort 7/7
(full skipped — new file, no importers, correct).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
