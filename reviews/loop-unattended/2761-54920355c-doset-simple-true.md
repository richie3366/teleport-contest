# Review 2761 — 54920355c — doset_simple restores give_opt_msg TRUE

- SHA: `54920355ceb53eef6da3938b7306852100166c80`
- Subject: D-3908 doset_simple `:8733` prevGive restore muted later toggle messages (Tourist-585611 s102 → PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3908` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: JS `doset_simple` restored prevGive where C writes TRUE
unconditionally, so an idlecheckpoint-poisoned FALSE survived the
simple menu and muted later full-doset toggle messages. Fix writes
`true`; Tourist-585611 → FULL PASS.

Diff actually adds: `js/options.js` (+5/−3: finally arm + C cites) +
new focused test `scripts/doset-simple-give-opt-msg.test.mjs`. No other
`js/` hunks, no new edge.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `doset_simple` (js/options.js:11580, exported async) | options.c:8705–8735 (csym) | changed: exit arm |

## C ↔ JS fidelity

C (`options.c:8705–8735`, csym): menu_requested early-return to doset()
(before any write) → `:8719` opt_phase → `:8722` FALSE → pick loop →
`:8733` unconditional TRUE. C writes to this flag exist only at `:5318`
(FALSE, idlecheckpoint arm), `:8722` (FALSE), `:8733` (TRUE) plus the
static-init TRUE (`:108`) — the D-log's "sole TRUE path" claim verified
by grep.

JS now matches exactly: menu_requested early return (untouched, before
the FALSE write), entry `false`, `finally` writes `true`. The change is
strictly toward C: old code differed from C only when prevGive was
false; true/undefined restored true either way. All JS readers use
`!== false`, so the only behavior delta is false→true at simple-menu
exit — C's direction. No RNG either side.

Callers: diff touches none; D-log's four wirings (cmd `O`, `#options`,
doset `:8777` arm, pager help-text) are pre-existing and the body change
needs no rewiring. Helper classification: no helpers; no clones, no
stubs. Nothing deleted or re-pointed. Grep: zero `FORCE`/`DIAG`/
`getRngLog`/`fastforward`/seeds.

## Hallucinations / overclaim

None. The measured chain (commit #2's three silences matched only
because C was still poisoned there too) is precise, and the
no-regression shape argument is sound.

## Density

Cliff phase: optfn_boolean row-2, head UNPORTABLE-terminal; owner body
verified whole, writer (one arm) shipped whole. `Ledger: doset_simple
ported` present. Not a no-op.

## Verification

D-log: `verify optfn_boolean: 1 PASS` (FULL PASS), both smokes 24/24,
green/strict/cohort, full 44/44.
Audit re-measure (`verify optfn_boolean,doset_simple --base 54920355c~1
--reach-all`): `scen-options-Tourist-585611: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (1 blocked at
baseline — not vacuous); both smokes 24/24 → REACH-OK. Claim confirmed
verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
