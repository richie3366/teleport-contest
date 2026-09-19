# Review 1506 — a2ab86c1 — options.c all_options_strbuf BoolOpt/CompOpt loop `break`→`continue` (D-2547)

## Metadata

- SHA: `a2ab86c1`
- D-id: D-2547. Next index: 1506.
- Files: `js/options.js` (2 lines changed); review stamp on
  `reviews/loop-unattended/1503-f01391aa-all-options-strbuf.md`.
- C locus: `nethack-c/upstream/src/options.c:9677–9748`
  (`all_options_strbuf`, 72 L; the two edited predicates at
  `:9697–9698` and `:9703–9706`).
- Closes review 1503's single Must-fix line (break→continue ×2).

## Intent vs deliverable

Subject promises: apply the review-1503 Must-fix — two
switch-`break`s mistranslated as loop-`break`s become `continue`,
nothing else; export name/signature and callers unchanged. Diff
actually delivers exactly that: two one-word changes in
`all_options_strbuf` with `:line` cites, plus the
`**Addressed:** D-2547` stamp on review 1503 and the Must-fix
line's removal from `LOOP-QUEUE.md` (archived to DONE in the
same commit). Promise matches deliverable. No RNG in C; none
added.

## Inventory

- Changed: `all_options_strbuf` BoolOpt arm (`break` → `continue`)
  and CompOpt arm (`break` → `continue`).
- No new functions, no new imports, no deleted or re-pointed
  symbols → no clone→import audit needed (`sym.mjs` run not
  applicable; nothing deleted or re-pointed).
- No other `js/` hunks in this SHA (stat: `js/options.js` 4 +−…
  i.e. 2 changed lines).

## C ↔ JS fidelity

C `csym.mjs all_options_strbuf` prints range `:9677–9748`, cited
here as that range. Branch-by-branch confirm of the two edits:

1. C `:9695–9701` (BoolOpt arm): `bool_p = allopt[i].addr;`
   `if (!bool_p || bool_p == &flags.female) break; /* obsolete */`
   — the `break` sits inside `switch (allopt[i].opttyp)`, so it
   exits the switch and the `for` loop proceeds to the next
   option. JS (this SHA): `if (!addr || (addr.obj === 'flags' &&
   addr.key === 'female')) continue;` — skips the entry, loop
   proceeds. The `addr.obj === 'flags' && addr.key === 'female'`
   term ≡ C's `bool_p == &flags.female` (established in D-2544,
   unchallenged here). Correct.
2. C `:9702–9706` (CompOpt arm): `if (!(setwhere == set_in_config
   || == set_gameview || == set_in_game)) break;` — same
   switch-break = skip entry. JS (this SHA): identical predicate
   over `SET_IN_CONFIG/GAMEVIEW/GAME` ending in `continue`.
   Correct.

Both surrounding arms (OthrOpt `break`, the cond-guard tail at
`:9731–9733`, the key_binds/savedsym/menucolors call order)
untouched — confirmed by the 2-line diff. No other branch of
this function is reachable any differently than at f01391aa.

## Hallucinations / overclaim

None. The D-log calls it a "C-wrong branch semantics,
doubly-dead today" fix and says "nothing else" — the diff bears
that out. The "becomes silent config truncation once [2/7]
fills `allopt`" claim is accurate: with an empty registry the
loop body never executes, so the fix is latent until D-2548.

## Density

Two words changed to land a review Must-fix, bundled with its
queue bookkeeping. Correctly minimal for a Must-fix carrier —
§2b density floors govern coverage ports, not one-line
C-wrong repairs. (Note: at this SHA the registry is still
empty, so the fix's live effect arrives with D-2548; shipping
it standalone before [2/7] is exactly what review 1503
required.)

## Verification

- D-log: `verify.mjs --fn all_options_strbuf` → VERIFY: PASS
  (syntax 1 file; rule2; 0 blocked; smoke 24/24 REACH-OK;
  green 2/2 + strict ×2; cohort 7/7; full 44/44 on shared
  options.js). Post-fix probe: 0 bare loop-`break`s.
- Re-run here: `hidden-proxy.mjs verify all_options_strbuf
  --base a2ab86c1~1 --reach-all` → 0 blocked at baseline and
  working tree (vacuous, honestly reported by the tool) +
  smoke 24 PASS, 0 regressed → REACH-OK. Matches the D-log;
  no corpus session executes this function (unreached until
  [7/7] wires the caller), so smoke + gates are the evidence.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed names in
  control flow/hardcoded coordinates.

## Actionable C-wrongs

None. The one C-wrong this SHA was asked to fix is fixed; no
new divergence introduced (no new code paths exist).

Verdict: **ACCEPT**

**Addressed:** — (this SHA is itself the addresser of review
1503's Must-fix; no new Must-fix arises from it)
