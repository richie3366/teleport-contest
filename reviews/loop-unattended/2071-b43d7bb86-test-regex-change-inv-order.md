# Review 2071 — b43d7bb86 — test_regex_pattern + change_inv_order

- SHA: `b43d7bb86` (D-3111)
- Subject: "`options.c` test_regex_pattern + change_inv_order (THIN→whole + MISSING→whole; 16 stale rows declared)"
- js/ insertions: js/options.js only (+64/−10)
- Prior index: 2070; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: complete THIN `test_regex_pattern` (NULL-only str gate,
errmsg default, both config_error_add sinks, OOM free-before-message
order; regex_error_desc named omit) and port MISSING
`change_inv_order` whole as a file-local over the number-array
inv_order model; 16 stale ledger rows declared along the pop chain.

Diff actually adds: exactly those two function bodies, no new
imports. Matches the promise; no extra scope.

## Inventory

Per function (cluster of 2, same file):

- `test_regex_pattern` (js/options.js:5359, file-local — C
  staticfn, correct shape) — C options.c:7869–7901 (csym range).
  Live: NULL-only str gate, errmsg default, regex_init +
  OOM sink arm, compile, free-before-message, failure sink.
  Named: `regex_error_desc` `:7893` (sys/ port, value flows only
  into the config sink; resolved next by D-3114).
- `change_inv_order` (js/options.js:5384, file-local — C
  staticfn) — C options.c:7465–7510. Live: GOLD_SYM prepend,
  per-char loop with all three reject arms, retain, fill,
  truncation, Strcpy replace. Named: sole C caller :2680
  (optfn_packorder unported; packorder row optfn:null verified).

Helpers: all LIVE pre-existing — regex_init/compile/free
(same-file :498–532), config_error_add (botl.js:1540, no-op
sink by tree design), def_char_to_objclass (objects.js:109),
COIN_CLASS (generated), MAXOCLASSES. No clones, no stubs, no
deletions or re-points.

## C ↔ JS fidelity

`test_regex_pattern` vs C :7869–7901: `!str` (pointer NULL-only)
→ `str == null` exact — old `!str` wrongly rejected `""`, genuine
fix; `!errmsg` (also pointer NULL-only) → `== null` exact, C
does not default `""` either; OOM arm format `"%s"` exact;
free-before-message order exact (C :7892 comment honored);
failure sink `"%s: %s"` kept with `null` desc placeholder — the
sink is a no-op, so the placeholder never renders, and keeping
the call preserves order for D-3114's fill. No RNG; sync.

`change_inv_order` vs C :7465–7510: GOLD_SYM `'$'` verified
(defsym.h:479); prepend arm exact; all three reject arms exact
with verbatim formats — including the subtle char-vs-class
distinction (`strchr(sp+1,*sp)` → `indexOf(ch,k+1)`, char-based
like C, not oc_sym-based); fill-in-previous-order exact;
`buf[MAXOCLASSES-1]=NUL` → length-cap exact (no-op when short,
like C); Strcpy → in-place clear+push on the live array,
read-before-write order preserved. NUL-terminator steps
correctly cited as having no array analogue.

Callers: :6438→js/options.js:5690 ✓, :6520→:5816 ✓ (other two
C refs are comments, verified); :2680 unwired + named ✓
(packorder optfn:null at :9810, verified).

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "JS was" paragraph accurately describes the old THIN gaps
(`void errmsg`, `!str`); the named omits are real and cited.

## Density

2-function same-file cluster, per-function Ledger + Verify
lines, ≤10, no Must-fix bundled. +64/−10 with a 16-stale pop
chain across 7 ledger files — the below-80 line is excused by
the pop-chain work, not idleness. Per-function verdicts: both
ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (`--base b43d7bb86~1 --reach-all`, both in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×2. Matches the D-log's
verbatim tail exactly. No REGRESSED session. Green 2/2, strict
×2, cohort 7/7 per D-log (full correctly skipped — single
non-shared-file change... note: options.js is widely imported;
verify decides full need, and the D-log tail shows no full line —
acceptable, no shared-shape change).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
