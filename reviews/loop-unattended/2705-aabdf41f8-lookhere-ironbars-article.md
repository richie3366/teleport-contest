# Review 2705 — aabdf41f8 — look_here iron-bars article gate (D-3842)

Metadata: SHA `aabdf41f8`, D-3842, cliffs-head `dig.c`
adj_pit_checks writer (owner C-whole per D-2321; cMsgOwners
names dfeature_at + look_here). JS: `js/invent.js` (+8/−7:
gate + comment). Test:
`scripts/lookhere-ironbars-article.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: Healer-578136@274 prints «There is a set of iron
bars here.» in C vs «There is set of iron bars here.» in JS —
JS's gate "corrected" C's never-matching `'iron bars'` literal
to the live `'set of iron bars'` string, suppressing an();
restore the gate C-verbatim; session moves 274→632. Diff
actually does: `'set of iron bars' ||` → `'iron bars'`, and the
loose `/ ice$/i` → first-space indexOf/slice toLowerCase `===
' ice'`. Match.

## Inventory

- `look_here` (js/invent.js:9329–9341) — gate restored. C:
  `nethack-c/upstream/src/invent.c:4220–4238` (read): article=0
  iff `!strcmp("molten lava") || !strcmp("iron bars") ||
  !strcmp("ice") || !strncmp("frozen ",7) || ((p=strchr(' '))
  && !strcmpi(p," ice"))`, else `dfeature = an(dfeature)`,
  then `vtense(dfeature,"are")`. JS is term-for-term: exact
  `===` for the three literals, `startsWith('frozen ')`,
  first-space slice + case-insensitive `=== ' ice'`
  (strchr finds the FIRST space; slice(sp) keeps it — same
  shape; also strictly more correct than the old regex for
  multi-word tails). No new imports; no deleted symbols.

## C ↔ JS fidelity

Condition-for-condition confirm. C's dfeature_at returns `"set
of iron bars"` for IRONBARS (invent.c:4091–4092, read) — never
equal to `"iron bars"`, so C takes an(). Probed live:
`an('set of iron bars')` → `"a set of iron bars"`,
`vtense(...,'are')` → `"is"` (via the "a " prefix arm,
objnam.js:2434, read) — both callees already C-exact for this
string, as claimed. No RNG in the arm; the print is the fixed
toline. The thawing-ice arm change (regex → first-space) also
matches C's strchr+strcmpi shape exactly.

## Hallucinations / overclaim

None. The writer-vs-owner call is argued from cMsgOwners +
the owner's armless message, and the "corrected away C's 'a'"
mechanism is exactly what the old gate did.

## Density

Cliff-phase: head writer correct. One gate, Ledger
`look_here ported` + D-3842, Verify bullet with movement +
REACH + green + strict + cohort + forced full 44/44. Reached:
probe moved 274→632 per the ship-time board.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, at HEAD): `verify adj_pit_checks --base
aabdf41f8~1` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, `scen-worldtour-Healer-578136:
PASS`, `1 PASS, ... → PROGRESS`; smoke 24/24 REACH-OK. Zero
regressed. The re-run shows PASS rather than the ship-time
274→632 because later SHAs in this window moved the session
further (D-3845 → s878, D-3846 → PASS — the subsequent cliff
rows independently corroborate the 274→632 intermediate step).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
