# Review 1340 — 12c4cda0 — shk.c globby_bill_fixup 4-scenario bill port + get_pricing_units

- SHA: `12c4cda0`, D-2374. JS files: `js/shk.js` (new export + pricing arm),
  `js/mkobj.js` (clone deleted, import extended, fire-and-forget call).
- Prior reviews closed: none.

## Intent vs deliverable

Subject promises: full 4-scenario `globby_bill_fixup` port + globby `get_pricing_units`
arm, retiring the mkobj.js no-op clone. Diff actually adds: exported async
`globby_bill_fixup` (`js/shk.js:3412`), globby weight arm in `get_pricing_units`,
deleted local no-op in mkobj.js, `void globby_bill_fixup(…)` from sync `obj_absorb`,
`obj_typename` added to the existing objnam edge. Matches the promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `globby_bill_fixup` (shk.js:3412) | C callee port (shk.c:5975–6097) | LIVE, exported async |
| `get_pricing_units` globby arm | C staticfn arm (shk.c:2845–2859) | LIVE, local |
| deleted mkobj.js `globby_bill_fixup` no-op | local clone → import | retired ✓ |
| 16 callees (`next_shkp`/`onbill`/`set_cost`/`clear_unpaid_obj` locals; `costly_spot`, `shop_keeper`, `billable`, `bill_dummy_object`, `saleable`, `currency`, `in_rooms`, `obj_typename`, `impossible`, `pline`, `verbalize`, `SetVoice`, `ANGRY`) | — | all LIVE (locals at shk.js:4315/3301/2333/3348; imports display.js:84–85, hack.js:55, shknam.js:93, sndprocs.js:120, objnam.js:3301) |

`node scripts/sym.mjs globby_bill_fixup` → `js/shk.js:3412 ASYNC — await required`;
no remaining local clone. Required re-point check done — output pasted in spirit
(single live export; mkobj.js imports it at line 78).

## C ↔ JS fidelity

C body (`csym` → `shk.c:5975–6097`, 123 lines) walked arm-by-arm against
`js/shk.js:3412–3545`. Header/vars, `!globby → impossible` (continues both sides),
floor x/y, unpaid search (`next_shkp` walk + `onbill(…,TRUE)` break), absorbed-unpaid
`OBJ_FREE` + `costly_spot` + `*in_rooms` gate (`charCodeAt(0)||0` ≡ C deref),
`shop_keeper(*u.ushops)` sanity (JS `shop_keeper` takes string|number, line 251–252),
`onbill` pair, `ESHK`, `set_cost` before scenario 1 — all in C order/conjuncts.
Scenario 1: `amount = bp.price`, `billct--`, swap via `indexOf` (`*bp = bill_p[billct]`
≡ `bill[i] = bill[billct|0]` post-decrement), `clear_unpaid_obj`, fold-or-`;` — exact.
Scenario 2: debit/loan/credit arithmetic and all four message bodies match C
format-for-format (`pline_The` → `` `The …` ``; `Your("debt is paid off.")` verbatim;
established/added credit wordings). `else if (bp_absorber)` fold arm exact.
Scenario 3: `bill_dummy_object` + `SetVoice(shkp,0,80,0)` + verbalize with both
ANGRY branches — exact. Scenario 4: bare return — exact.
`get_pricing_units` arm vs C `:2845–2859`: `quan` default, globby ceil-division
`(wt+uw-1)/uw` with `owt>0 ? owt : weight(obj)` and `unit_weight` guard — exact,
including `Math.trunc` for C long division.
No RNG in C body; none added. Combined-arm callee closure: every `case`/scenario's
callees are LIVE or the pre-existing `onbill _silent` behavior (named own row, not
this commit's stub). No STUB in a live arm.

Known shape debt (named in D-log, not a C-wrong): sync `obj_absorb` (C `:3713`)
calls `void globby_bill_fixup(…)` fire-and-forget. Scenario-1 path is fully
synchronous (`clear_unpaid_obj` sync, `shk.js:3348` — no await before its return),
so bill *state* settles before `obj_absorb` continues; only scenarios 2–3 message
*ordering* vs later sync plines can differ from C. Full propagation would run
`merged→stackobj→place_object` engine-wide — not one port iter, hence named, not
queued (same precedent as `void pudding_merge_message`, D-0993).

## Hallucinations / overclaim

D-log claims "all 16 other callees already local/imported" — verified true above.
"Scenario 1 runs fully synchronously" — verified (no await on that path). "No
DIAG/FORCE/seed gates" — the one diff grep hit is the commit message itself saying
"No DIAG/FORCE/…", not code. Verify bullet claims only green/cohort + an explicitly
non-PASS hidden note — honest. No overclaim.

## Density

~150 js/ insertions for a 123-line C function + pricing arm + clone retirement: one
C locus family, right-sized (§2b).

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review, whole-tree).
- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 1 hit, commit-message prose only.
- Re-measured: `hidden-proxy verify globby_bill_fixup --base 12c4cda0~1` → "0 at
  baseline, 0 in the working scoreboard" — row cited 0 blocks, vacuous note correctly
  labeled, no --base owed. No seed/step/coordinate reads in the diff.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log (accepted; no RNG surface, probe
  /tmp/probe-globby.mjs kept out of tree for re-run).

## Actionable C-wrongs

None. (Fire-and-forget message ordering is D-log-named debt requiring engine-wide
async propagation — not queueable in one port iter, so not Must-fix.)

Verdict: **ACCEPT-WITH-DEBT**
