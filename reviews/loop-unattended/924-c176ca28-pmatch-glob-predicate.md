# Review 924 — c176ca28 — strutil.c pmatch glob-match predicate singleton (D-1954)

Metadata: SHA `c176ca28`, D-1954, `js/cmd.js` + `js/pager.js`
(wrapper + lookup rewire). Reviewer re-ran C loci, callers, sym,
`--can`, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the case-sensitive `pmatch`
glob singleton plus retiring `pager.js`' hand-rolled RegExp clones.
Diff actually adds: exported `pmatch(patrn, strng)` in `js/cmd.js`
(before `pmatchi`, C declaration order), corrected `pmatch_internal`
header range, and `lookup_data_base` calling `pmatch(key, q)` for the
positive and `~`-exclusion passes with keys kept at file case.
Promise kept; no extra scope.

Inventory: one new JS function (`pmatch`, `js/cmd.js:411`, sync, per
`sym.mjs`). One re-pointed import (`pager.js` → `cmd.js` `pmatch`;
`--can` reports ALREADY — pre-existing static edge, no cycle issue).
Two retired RegExp clones (local, not symbols — nothing to `sym.mjs`).
`pmatch_internal` body unchanged (comment-only header fix).

C ↔ JS fidelity — branch-by-branch confirm:

- `pmatch` wrapper vs `strutil.c:144–148` (via `csym.mjs`): C
  `pmatch_internal(patrn, strng, FALSE, (const char *) 0)` → JS
  `pmatch_internal(patrn, strng, false)` (JS helper is 3-arg, sk
  always NULL). Exact.
- `sk` skip-set arm (`:119–127`) named omit: both live C wrappers
  pass NULL; `pmatchz` is declared (`extern.h:1265`) but never
  defined in pinned C. Correctly omitted, correctly cited.
- Lookup passes vs `pager.c:1023–1029` + `:866` (ranges read at
  HEAD): C lowercases the query (`lcase(dbase_str)`, `:866`) and
  matches file-case keys case-sensitively — JS now does exactly
  this (`q` lowered, `keys.push(k.trim())` file case). The OLD code
  lowercased keys, which diverged from C pass-0 on uppercase keys;
  the new code matches C pass-0 exactly, including `A.S*` being
  unreachable (dead in C too — see below). `~` veto after positives
  mirrors the `chk_skip` skip-entry arm outcome for every entry
  examined (spot-checked `armor*`/`*mail` and `*broadsword` entries).
- Matcher swap (regex → `pmatch_internal`): equivalent — anchored
  full match, `*` = 0+ chars, `?` = one char, all other chars
  literal in both. The 858k-comparison old-vs-new probe differing
  only on `A.S*` corroborates.

Hallucinations / overclaim: one comment inaccuracy (code is right,
rationale is wrong). The `pager.js` comment and D-log say `A.S*`
is "matche[d] only against un-lowered pass-1 alt" in C. Read at
HEAD, pass-1 `alt` derives entirely from the already-lowered
`dbase_str` (`ep + 7` into it, `givenname` copied from it,
`makesingular(dbase_str)`, lowercase fruit `oc_name`; `pager.c:949–992`),
so `alt` is always lowercase and case-sensitive `pmatch("A.S*",
alt)` fails exactly like pass 0 — the key is dead in C, not
pass-1-live. Outcome identical (dead in JS too), so no C-wrong;
but the rationale should read "dead key in C (both passes use
lowered strings)" lest a future porter "restore" it by un-lowering
`q`. Noted here, not queued (comment-only, code faithful).
Pre-existing note: C tests keys line-by-line with immediate break,
JS tests all positives then all `~` vetoes; a positive-before-tilde
double match would differ, but that structure predates this SHA
(old JS had the same two loops) — out of scope for this review,
no reachable instance shown.

Density: §2b right size — one predicate + its single consumer
rewire, two modules that already import each other, full suite
forced because the lookup is user-facing. OK.

Verification: D-log Verify shows preflight PASS, old-vs-new probe
PASS (honestly scoped — it compares matchers, not C-vs-JS; the C
half is covered by the range citations above), `verify.mjs --fn
pmatch` → PASS syntax/rule2/green/strict/cohort/full-44/44, and an
explicitly vacuous hidden note (0 blocks, no corpus-PASS claim).
Reviewer re-measured: `hidden-proxy verify pmatch --base
c176ca28~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean; Rule #2 clean
(intra-`js/` ESM only).

Actionable C-wrongs: none (one comment-rationale correction noted
above for the next toucher of `lookup_data_base`).

Verdict: **ACCEPT**
