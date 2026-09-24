# Review 1731 — 2254700ea — vanqsort_cmp MCLS arms (D-2772)

- SHA: `2254700ea` (`insight.c` vanqsort_cmp: MCLS_LTOH/HTOL arms ported, D-2772)
- Files: `js/insight.js` (+24/−5 incl. comments), docs
- Queue row: Must-fix from review 1728 (QUALITY-RISK actionable #1), 0 corpus blocks
- Banned grep: 0 hits (no FORCE/DIAG/seed/coords in the hunk). `imports.mjs --rulecheck`: "Rule #2 clean" (whole tree, re-run this audit).

## Intent vs deliverable

Subject promises the MCLS_LTOH/HTOL arms: class order, punctclasses
remap, Riders first. Diff delivers exactly that: the MCLS case body
(~22 lines), one new import (`DEF_MONSYM_MLET` from `./mondata.js`),
and retirement of the stale stub note in the `list_vanquished` doc
comment. Nothing else in `js/`.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `vanqsort_cmp` MCLS case | C arm | `insight.c:2620–2714` (arm `:2658–2699`) |
| `DEF_MONSYM_MLET` (new import) | LIVE table | `defsym.h:295–364` MONSYM order |
| `is_rider` (import, D-2769) | LIVE | `monsters.js:912` export (`mondata.h`) |
| tiebreak / other arms | unchanged | pre-existing |

Nothing deleted or re-pointed (no `sym.mjs` re-point check needed).
`sym.mjs`: `DEF_MONSYM_MLET js/mondata.js:731 export const`;
`is_rider js/monsters.js:912` (+1 pre-existing local clone in
`mkobj.js:920`, untouched here).

## C ↔ JS fidelity

Walked JS `vanqsort_cmp` MCLS case against C `:2658–2699` line by line:

- Numeric mlet: JS `DEF_MONSYM_MLET.indexOf(mlet)` — table verified
  entry-by-entry against `defsym.h` MONSYM 1–60 (S_ANT=1 … S_ZOMBIE=52
  … S_MIMIC_DEF=60): exact 1:1 order, so the `mcls1 - mcls2` signed
  compare is exact (all values positive, < 127 — the C `schar` comment
  is moot here).
- Both-punct guard `mcls1 > S_ZOMBIE && mcls2 > S_ZOMBIE` ✓ (S_ZOMBIE=52
  both sides); `punctclasses` order LIZARD/EEL/GOLEM/GHOST/DEMON/HUMAN
  matches C; remap `S_ZOMBIE + 1 + k` (max 58, no schar wrap) ✓;
  non-listed punct classes keep internal order via the `>= 0` guard,
  matching C's `strchr != 0` ✓.
- Rider tie `(is_rider(p2)) - (is_rider(p1))` matches C
  `is_rider(&mons[indx2]) - is_rider(&mons[indx1])` (boolean normalized
  to 0/1; `mons()` entries carry both `mndx` and `mlet` —
  `js/monsters.js:203+`) ✓.
- mlevel low→high, negated for HTOL ✓; `if (res) break` breaks the
  `switch` in both languages (JS case is a block, same as C) ✓;
  mndx tiebreak after the switch pre-existing ✓.
- VANQ constants: JS `const.js:1737–1743` 0..7 chain matches the C
  `vanq_order_modes` enum order in `hack.h:921–931` ✓. No RNG.

Null-`mons()` path (`indexOf(undefined)` → −1) is unreachable —
`mindx[]` indices are always valid — and degrades to the tiebreak
rather than a throw.

## Hallucinations / overclaim

None. D-log says "whole C body live" for `vanqsort_cmp` — the other
six arms were already live and are untouched; the claim is scoped to
this comparator and holds.

## Density

Must-fix, one item alone, ~22 behavior lines closing a named STUB in a
live arm. Correct size.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify vanqsort_cmp --base
2254700ea~1 --reach-all`:

- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)` + the vacuous-verify note
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log exactly. The vacuous note is expected, not a cheat:
the queue row is a review Must-fix that cited 0 corpus blocks (review
1728 assigned the wish-session owner to a map cell, phase-2).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
