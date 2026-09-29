# Review 2066 — cb3b01855 — append_str impossible arm + NULL test

- SHA: `cb3b01855` (D-3106)
- Subject: "pager.c append_str: impossible arm + NULL-exact strstri test (coverage)"
- js/ insertions: ~15 (pager.js only)
- Prior index: 2065; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port the missing `:93–95` overfull-buf `impossible()` arm in
C position and fix the `:89` strstri presence test from JS truthiness
to C NULL-ness.

Diff actually adds: `!= null` presence test, the nested overfull arm
with fire-and-forget `impossible`, and position cites. Matches the
promise; no extra scope.

## Inventory

Single function:

- `append_str` (js/pager.js:1021, export) — C pager.c:79–104 (csym
  range; D-log cites 82–104, body lines). Whole body: strstri guard,
  overfull+impossible, sep/new_str strncat pair.

Helpers: both LIVE — strstri (hacklib.js), impossible (async import,
fire-and-forget). No clones, no stubs, no deleted/re-pointed symbols
(`sym.mjs` check not triggered).

## C ↔ JS fidelity

Branch-by-branch against C :79–104:
- `:89` presence test: C tests the returned pointer against NULL.
  JS strstri returns a string on match (empty needle → `s`, verified
  hacklib.js:597) or `null` on no-match (three `return null` paths
  verified) — so `!= null` is NULL-exact for every input, including
  empty new_str (C returns buf, non-NULL → 0; JS `'' != null` → 0).
  The old truthiness form was a real (if unreachable — all 10 live
  sites pass literals/`an`/`the`) C-wrong, now fixed.
- `:92–97` overfull: nested `>` with `impossible("append_str: 'buf'
  contains %lu characters.", (unsigned long)oldlen)` then `return 0`
  — shape exact. Message: `%lu` preformatted via `String(oldlen >>>
  0)` into `%s` (JS formatter expands `%s`/`%d` only) — text C-exact
  for all realistic lengths. Fire-and-forget `void` is forced (sync
  look helper vs async impossible) with three cited precedents.
- `:100–103` appends: `sep.slice(0, space_left)` ≡ strncat(sep);
  `space_left > sep.length` ≡ `> sizeof sep - 1` (4 both sides);
  `String(new_str).slice(0, space_left - 4)` ≡ strncat(new_str).
  Return 1. Exact.

Callers: 10 live C sites (:1237–:1538) each mapped to a JS line in
the D-log; `:1559` confirmed inside `#if 0` (pager.c:1550, verified)
with the JS cite at :1614–1615 — correctly no site. No unwired caller.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. "Whole body" and "message text C-exact" both hold.

## Density

Single-function cluster, ~15 js/ insertions — below the ~80 line,
excused per the §2b unless-clause (only pager.c Open row; callees
strstri/impossible already declared, so no growth path) — same shape
as the ACCEPTed D-3099/D-3102. One Inventory block, one `Ledger:`
entry (`ported`), one Verify line. Verdict: ACCEPT.

## Verification

Re-measured at this SHA (`--base cb3b01855~1 --reach-all`): 0 blocked
at baseline and working tree, vacuous note printed, smoke 24/24 →
REACH-OK. Matches the D-log exactly. No REGRESSED session. Shared
gates per D-log: syntax, rule2, green 2/2, strict ×2, cohort 7/7
(full skipped — pager.js unshared here, correct).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
