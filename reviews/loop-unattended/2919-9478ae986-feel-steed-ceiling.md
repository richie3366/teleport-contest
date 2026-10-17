# Review 2919 — 9478ae986 — feel_can_reach_floor steed + ceiling arms

- SHA: `9478ae986` (moverock_core writer:
  missing can_reach_floor arms)
- D-entry: D-4081; Ledger: display.c
  (`feel_location`-family note)
- `js/` diff: `js/display.js` +19/−6 (two
  arms in `feel_can_reach_floor`, two import
  names, doc); no new test file

## Intent vs deliverable

Promise: wire the :200–201 steed-rank arm
and the :203 ceiling-hider arm in C order,
mirroring the canonical engrave.js shape;
Caveman PASS, Priest separate writer stays.
The diff is exactly the two arms plus
retired doc omits. Promise = diff.

## Inventory

- `feel_can_reach_floor`
  (display.js:6289–6312): NEW usteed +
  P_RIDING-rank arm, NEW uundetected +
  ceiling_hider arm. C: engrave.c :186–214.
- Import names only: `ceiling_hider`
  (mon.js edge pre-existed via mdistu),
  P_RIDING/P_BASIC (const.js edge
  pre-existed). No new edges, no new
  helpers, no deleted symbols — step-3
  paste not triggered.

## C ↔ JS fidelity

Confirmed against pinned C (csym :186–214):

- Branch order exact: uswallow/ustuck/
  Levit FALSE-arms (pre-existing) →
  `:200–201` usteed + P_SKILL(P_RIDING) <
  P_BASIC → FALSE ✓ → `:203` uundetected +
  ceiling_hider(youmonst.data) → FALSE ✓ →
  Flying → TRUE → fallthrough TRUE.
- Steed read is line-identical to the
  canonical engrave.js:596–600
  (`weapon_skills?.[P_RIDING]`,
  object-or-flat rank, `< P_BASIC`) ✓.
- Ceiling arm matches engrave.js:603 and
  calls the canonical export
  (mon.js:3916, hoisted `export function`
  — no TDZ), not a third clone: sym.mjs
  already lists 2 clones (engrave.js:550,
  music.js:149) and this commit correctly
  did NOT add one. The export itself is
  C-exact vs the mondata.h:43–45 macro
  (`is_hider && ((clinger && mlet !=
  S_MIMIC) || flyer)`) ✓.
- msize subsumption sound: with
  check_pit=FALSE, C's `:205–206` TRUE-arm
  and the skipped `:208–210` arm both
  yield TRUE, so JS `if (Flying()) return
  true; return true;` ≡ C on every path ✓.
- youmonst?.data is the monmove.js:2017
  house shape cited (D-3919), same as the
  pre-existing ustuck arm above it.

## Hallucinations / overclaim

None. The Priest-50556028 residual is
specified (poly'd air elemental, not
mounted; gbuf divergence quoted) and
assigned its own iteration, not folded in.

## Density

Cliff writer, 1/2 → PASS with the second
named as a separate writer. One `Ledger:`
entry. Mirror complete vs C :187–210.
Full 44/44 in-commit (display.js shared).
No unreached work.

## Verification

Re-measure (`--base 9478ae986~1 --no-reach`):

```text
verify moverock_core: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-50055085: PASS
  scen-sweep-Priest-50556028: still moverock_core at step 1737
verify feel_location: no corpus session is blocked (vacuous, disclosed)
```

Exact match, including the Priest quotes.
No FORCE/DIAG/seed/coords in the `js/`
hunk. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
