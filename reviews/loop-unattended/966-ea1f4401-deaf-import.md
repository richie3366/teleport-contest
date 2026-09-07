# Review 966 — ea1f4401 — invent.js missing DEAF import (D-1996)

Metadata: SHA `ea1f4401`, D-1996, Must-fix from review 965. js/
touches 1 file, +2/−1 (`js/invent.js`). Stamps
`**Addressed:** D-1996` on review 965. No `c-js-map` edit (import-only,
D-1988 precedent).

## Intent vs deliverable

Subject promises: fix `ReferenceError: DEAF is not defined` that threw
for any deaf hero on `^X`/death disclosure (fortress 43/44 at
`seed0002-healer-reflection-drummer`). Diff actually adds: exactly one
word — `DEAF` — to an existing `./const.js` import list in
`js/invent.js` (after `BLINDED`, with a C-citation comment). No new
function, helper, branch, or module edge. Promise == diff.

## Inventory

- Changed JS function: none (no body touched; call site
  `from_what(DEAF)` at `js/invent.js:4882` pre-existed from D-1995).
- Changed import: `DEAF` added to the existing `import { … } from
  './const.js'` block.
- Deleted/re-pointed symbols: none (pure addition; no clone removed).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/attrib.c:904–1001` (`from_what`;
`csym.mjs` range). The DEAF arm is `attrib.c:935–936`:
`(propidx == DEAF && u.uroleplay.deaf)` → `" from birth"`. Caller:
`insight.c:1059–1074` Blind/Deaf `you_are("deaf",
from_what(DEAF))` (D-log cite). JS call site passes the same constant;
the fix only makes the already-ported call resolvable. `sym.mjs DEAF`
→ `js/const.js:2561 sync export const` (value 16, matching C
`BLINDED=15, DEAF=16` order cited in the comment). No branch order or
RNG (`rn2`/`rnd`) involved — constant binding only. Confirm: no
semantic port, so no branch-by-branch walk applies; fidelity holds by
construction (same callee, same argument).

Required `sym.mjs` output (only symbol the diff touches):

```text
DEAF  js/const.js:2561  sync  export const
```

No local clone → import re-point exists to verify beyond this (the
binding was always the live export; nothing deleted).

## Hallucinations / overclaim

None. D-log says "one-word addition to the existing same-edge import",
"no new module edge", "import-only" — all true. It does not claim a
corpus PASS: the Verify bullet explicitly marks the hidden-proxy note
as vacuous ("Must-fix review row, not a corpus-owner row; NOT claimed
as a corpus PASS"). No "Match C" dispatch-over-stub pattern.

## Density

One-line Must-fix, alone in its commit — correct per §2b (Must-fix
stays one item, alone). Far below the 80–400-line port target, but
density minimums do not apply to a throw fix that restores 44/44; a
`ReferenceError` forfeits the whole session (Constitution §10.14), so
shipping it solo is right-sized, not waste.

## Verification

- Re-ran myself: `node frozen/ps_test_runner.mjs
  sessions/seed0002-healer-reflection-drummer.session.json` →
  `PASS (RNG 27158/27158, Screen 595/595)`, 1/1 passing (HEAD
  `4a48e698` checkout; matches D-log claim).
- `node scripts/imports.mjs --rulecheck` → `Rule #2 clean` (re-ran this
  iteration).
- `node scripts/imports.mjs --can invent.js ./const.js DEAF` →
  `ALREADY: invent.js already statically imports const.js. No new edge
  needed.` No TDZ/cycle risk (`const.js` hoisted const, same SCC).
- Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/
  `fastforward` tokens (one import line + comment).
- Corpus re-measure N/A by design: `from_what` owns no corpus row
  (D-log says so explicitly); no `hidden-proxy verify` baseline to
  re-run. Green/cohort claims (`PASS green 2/2` + strict, `PASS cohort
  7/7`) are on the port iter to prove, already stamped `VERIFY: PASS`
  there; the session I re-ran is the load-bearing evidence and it holds.

## Actionable C-wrongs

None. Import-only fix; no divergence from C introduced or left.

Verdict: **ACCEPT**
