# Review 1525 — 7b8badd1 — optlist.h travel_debug negateok-No (D-2566)

## Metadata

- SHA: `7b8badd1`
- D-id: D-2566. Next index: 1525.
- Files: `js/options.js` (1 line: `'travel_debug'` joins `OPT_NEGATEOK_NO`), `scripts/parseoptions.test.mjs` (+1 `it`).
- C locus: `nethack-c/upstream/include/optlist.h:794–796` (non-DEBUG `#else` `NHOPTB(travel_debug, …)` arm).
- Closes review 1520 QUALITY-RISK C-wrong 1 (63/64 negateok-No rows).

## Intent vs deliverable

Subject promises: add `'travel_debug'` after `'traps'` (64 names) + a test pinning `parseoptions("!travel_debug", true, true) === false` with the `in_parseoptions` +1 leak per C `:628`. Diff delivers exactly that. Promise matches deliverable.

## Inventory

- Changed: `OPT_NEGATEOK_NO` set (`js/options.js`); `'travel_debug'` now occurs 2× in the file (definition row + the set — correct).
- No new functions, no deleted symbols, no callee changes → no clone→import audit needed. Dormant-optfn dispatch stays named (D-2561), untouched.

## C ↔ JS fidelity

Read the cited C range directly: `#else` arm gives `NHOPTB(travel_debug, Advanced, 0, opt_out, set_wizonly, Off, No, No, No, NoAlias, …)` — negateok `No` confirmed, so set membership is correct, and alphabetical placement after `'traps'` matches the set's ordering. The leak semantics (`:628` increment, no `:644` decrement on bad negation) were verified in review 1520; the new test pins exactly that (`+1` leak, returns false). Committed suite 14/14 passes (13 + 1 new, re-run here).

## Hallucinations / overclaim

None. The D-log frames the verify as 0-blocked honestly and names the dormant-dispatch omit.

## Cited evidence

C (`nethack-c/upstream/include/optlist.h:794–796`, read directly — the cited range):

```c
#else
    NHOPTB(travel_debug, Advanced, 0, opt_out, set_wizonly,
           Off, No, No, No, NoAlias, (boolean *) 0, Term_False,
           (char *)0)
#endif
```

The non-DEBUG arm carries negateok `No` (contrast the `#ifdef DEBUG` arm above it, which carries `Yes` in the same column) — so `travel_debug` belongs in `OPT_NEGATEOK_NO`, and review 1520's independent `cc -E` extraction (217 rows, order-identical) confirms the row was the single drop: C has 64 negateok-No rows, JS had 63.

JS after this SHA (`js/options.js`): `'traps', 'travel_debug', 'vary_msgcount', …` — 64 names, alphabetical placement matching the set's ordering. `'travel_debug'` occurs exactly 2× in the file (definition row + the set).

Mechanism note (why latent today): with optfn dispatch dormant, both the negated-gate path and the fall-through return FALSE; the only observable difference is the `in_parseoptions` leak (`:628` increment with no `:644` decrement on bad negation) — which is exactly what the new test pins:

```js
parseoptions("!travel_debug", true, true) === false  // in_parseoptions leaks exactly +1
```

Suite + verify outputs (re-run here):

```text
ℹ pass 14 / fail 0                               # parseoptions.test.mjs (13 + 1 new)
verify parseoptions: baseline 7b8badd1~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke parseoptions: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

## Density

One-line data fix + one test for a Must-fix item, alone in the iteration. Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn parseoptions` → PASS.
- Re-run here: `hidden-proxy.mjs verify parseoptions --base 7b8badd1~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep (js/ + scripts/): 0 hits for FORCE/DIAG/getRngLog/fastforward/RNG/seed.

## Actionable C-wrongs

None. The single C-wrong this SHA was enqueued for is fixed exactly.

Verdict: **ACCEPT**

**Addressed:** — (this SHA *is* the address of review 1520's Must-fix; stamped there as D-2566 `7b8badd1`)
