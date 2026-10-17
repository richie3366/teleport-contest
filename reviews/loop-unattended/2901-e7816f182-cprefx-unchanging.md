# Review 2901 — e7816f182 — cprefx Unchanging canonical read

- SHA: `e7816f182` (cliff writer: 1 predicate, rank-15 eatcorpse)
- D-entry: D-4060; Ledger: eat.c (`cprefx ported`, D-4060
  appended)
- `js/` diff: `js/eat.js` +3/−2 (import + gate call);
  new `scripts/eat-cprefx-unchanging-uprops.test.mjs`

## Intent vs deliverable

Promise: replace the flat-only Unchanging read in cprefx's
green-slime gate with the canonical `Unchanging(u)` (D-4037/
D-4055 class); Ranger-50250033 s648 → FULL PASS; Wizard-50156033
cprefx attribution diagnosed as a separate cause. Delivers
exactly that. Promise = diff.

## Inventory

- `cprefx` PM_GREEN_SLIME gate — eat.js:3785: `!Unchanging(u)`
  replacing the 3-flat local. C: eat.c:852 (csym range
  :790–864), macro youprop.h:372 H||E.
- Import: `Unchanging` added to the existing `./polyself.js`
  import (ALREADY edge; hoisted `export function`, TDZ-neutral).

No deleted symbols, no clones. The removed block-scoped const
has no other use in the case block — no shadowing residue
(syntax + gates green confirm).

## C ↔ JS fidelity

C (eat.c:851–857):

```c
case PM_GREEN_SLIME:
    if (!Slimed && !Unchanging && !slimeproof(gy.youmonst.data)) {
        You("don't feel very well.");
        make_slimed(10L, (char *) 0);
        delayed_killer(SLIMED, KILLED_BY_AN, "");
    }
    FALLTHROUGH;
```

JS keeps the gate shape, the message text (`You("don't feel
very well.")` ≡ `pline("You don't feel very well.")`), the
`make_slimed(10, null)` + `delayed_killer(SLIMED, …)` order, and
the FALLTHROUGH into the acidic/Stoned default. The only change
is the predicate: canonical `Unchanging(u)` (polyself.js:438 —
flats + `uprops[UNCHANGING]` intrinsic|extrinsic) for C's
`HUnchanging || EUnchanging`. On the probe state (poly expired
s343, unchanging amulet worn s384–386, never removed) C's gate
holds via E-from-uprops while the old JS fired — the exact fork,
with the C-side wear/remove trace in the D-entry (no removal
message through 648, slime text absent both sides before 648).
Step-648 RNG identical (9 draws enumerated) — pure message-order
divergence, consistent with a gate predicate fix. Rest of cprefx
(:791–864) audited whole in-commit; Slimed read left as-is for
lack of evidence — correct restraint. Sibling flat-only sites
named with file:lines (D-4012 precedent: ship when named).

## Hallucinations / overclaim

None. The tool's `VERIFY: FAIL solely on hidden-attribution`
is disclosed verbatim rather than buried: the cliff
(`eatcorpse`) is PROGRESS, the second attribution (`cprefx`)
is NO MOVEMENT with a demonstrated separate cause.

## Density

Cliff writer (committed rank 15, first actionable past
re-verified parks) with FULL PASS on the owned session.
Whole-function holds. One `Ledger:` entry, accurate.

## Verification

Re-measure (`--base e7816f182~1 --no-reach`):

```text
verify eatcorpse: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Ranger-50250033: PASS
verify cprefx: 0 PASS, 0 moved past, 1 unchanged, 0 worse → NO MOVEMENT
  scen-sweep-Wizard-50156033: still cprefx at step 512
```

Exact match, including the separate-cause evidence: the Wizard
toplines are byte-identical both sides *including* the slime
text, so the :852 gate fires identically there and cannot be
that session's writer (residual is map row 11). Focused test 1/1
green. No FORCE/DIAG/seed strings. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
