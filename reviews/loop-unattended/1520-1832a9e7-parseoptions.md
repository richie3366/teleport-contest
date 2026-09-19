# Review 1520 — 1832a9e7 — options.c parseoptions (D-2561)

## Metadata

- SHA: `1832a9e7`
- D-id: D-2561. Next index: 1520.
- Files: `js/options.js` (+345: optlist exception
  sets, `match_optname` family,
  `determine_ambiguities`, duplicate machinery,
  `parseoptions`), `scripts/parseoptions.test.mjs`
  (+142, new, 13/13 passing re-run here).
- C locus: `nethack-c/upstream/src/options.c:488–691`
  (`parseoptions`, 204 L; `csym.mjs` range) plus
  helpers `length_without_val` `:6739–6758`,
  `match_optname` `:6760–6771`,
  `reset_duplicate_opt_detection` `:6773–6780`,
  `duplicate_opt_detection` `:6782–6788`
  (all read directly), `strncmpi`
  (`hacklib.c:717`), 17 C callers (all named,
  none re-pointed — recursion only).

## Intent vs deliverable

Subject promises: the whole 199-line body in C
order + 8 parsing-support callees with optlist
flag columns extracted from the compiler. Diff
delivers that plus a committed 13-test suite.
Promise matches deliverable on structure; the
data claim has one miss (see C-wrong 1).

## Inventory

- New: `parseoptions` (exported sync),
  `match_optname` (exported),
  `reset_duplicate_opt_detection` (exported),
  `set/clear_ignore_errors_on_unmatched` +
  `config_unmatched_ignored` (exported),
  file-local `isOptSpace`, `optStrncasecmp`,
  `length_without_val`, `string_for_opt`,
  `bad_negation` (no-op, named),
  `complain_about_duplicate` (no-op, named),
  `determine_ambiguities`,
  `duplicate_opt_detection`, 4 const sets.
- Callees, all LIVE: `lowc`/`strstri`/
  `strsubst`/`str_start_is` (hacklib.js),
  `parsesymbols`/`PRIMARYSET`,
  `check_gold_symbol`, `opt_set_in_config`
  (defined `:3617` — dormant arm is safe),
  `BUFSZ`/`OPTN_*`/`REQ_DO_SET`.
- No deleted symbols → no clone→import audit.
  `match_optname` single export (`sym.mjs`).

## C ↔ JS fidelity

Matching core vs C, verified arm by arm:
comma recursion (first-comma split, tail-first)
✓; length/trim/empty gates ✓; `!`/`no`/`no-`
negation fold (incl. 1-char and exact-`"no"`
edges, checked against `strncmpi` NUL arms —
JS `\0`-padding is zero/nonzero-identical) ✓;
`length_without_val` first-separator + blank
backtrack ✓; pfx-then-name loop with the
ambiguous-`break` ✓; alias loop over all rows
✓; `in_parseoptions`++/leak-on-bad-negation ✓
(pinned by test); dormant optfn guard (all JS
optfns null ≡ C null guard) ✓; S_ fallback
(`startsWith` ≡ `strstr==opts`,
`check_gold_symbol`, `OPTN_OK`) ✓; tail gates
`:670–690` incl. the `allopt[-1]` range guard —
traced outcome-identical (that path returns
FALSE at a later gate regardless of the UB
read) ✓. `determine_ambiguities` pairwise scan
(min 3, clamp) with the sentinel correctly
excluded (JS has no sentinel row) ✓.
`strncmpi`/`lowc` ASCII folds match C ✓.

**Independent data audit (this review):**
replicated the porter's extraction — `cc -E`
on `optlist.h` with `NHOPT_PARSE` under the
contest-linux set (ALTMETA/BACKWARD_COMPAT/
INSURANCE/CRASHREPORT/STATUS_HILITES/
TTY_GRAPHICS/NEWS/TIMED_DELAY/PREV_MSGS;
`/tmp/optprobe.i`, `/tmp/optcmp.mjs` probes).
Result: **217 rows, order identical
name-for-name, 0 mismatches**; dupeok-Yes
(22), pfx (cond_/font), and all 14 aliases
(incl. the `customsymbols` self-alias) exact.

**Gap (C-wrong 1, below):** `travel_debug`
(non-DEBUG `#else` row, `:794–796`, negateok
`No`) is missing from `OPT_NEGATEOK_NO` — C
has 64 negateok-No rows, JS lists 63, and the
D-log's "(63 negateok-No …)" count claim is
wrong. Latent today (both gate paths return
FALSE while optfns are dormant; only the
`in_parseoptions` leak differs), but it is this
SHA's headline data delivered one short, and it
goes live the moment optfns ship.

## Hallucinations / overclaim

The "(63 negateok-No, 22 dupeok-Yes …)
extracted … JS row order verified identical
name-for-name" sentence overclaims by one row:
the count is 64/63 on negateok-No. Everything
else in the sentence verified exact, so this
reads as a dropped row, not a fabricated claim.

## Density

One 204-line C function + 8 helpers + tests,
two files, ~490 insertions. At the §2b ceiling
but justified: the function ships with its
whole matching core and a pinning suite.

## Verification

- D-log: `verify.mjs --fn parseoptions` →
  PASS, honestly framed as config-parser /
  0-blocked. Committed suite 13/13 (re-run).
- Re-run here: `hidden-proxy.mjs verify
  parseoptions --base 1832a9e7~1 --reach-all`
  → 0 blocked both trees (vacuous, honestly
  reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits for FORCE/DIAG/
  getRngLog/fastforward.

## Actionable C-wrongs

1. `OPT_NEGATEOK_NO` missing `travel_debug`
   (`js/options.js`, new this SHA): add it per
   `optlist.h:794–796` (non-DEBUG arm,
   negateok `No`). One-line fix; extends the
   committed suite with a negated-`travel_debug`
   bad-negation case.

Verdict: **QUALITY-RISK**

**Addressed:** D-2566 `7b8badd1`
