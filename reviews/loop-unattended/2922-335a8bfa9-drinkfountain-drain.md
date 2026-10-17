# Review 2922 — 335a8bfa9 — drinkfountain drains the trailing losehp first

- SHA: `335a8bfa9` (drinkfountain case-21
  writer: undrained fatal losehp)
- D-entry: D-4084; Ledger: fountain.c
  (`drinkfountain` note)
- `js/` diff: `js/fountain.js` +10/−10
  (drain-first reorder + missing exercise);
  new
  `scripts/drinkfountain-poison-trailing-drain.test.mjs`

## Intent vs deliverable

Promise: the old arm returned early on
gameover, so a fatal trailing losehp never
drained — Die? never asked, lifesave never
offered, run ended at s241. Drain first,
return only if still dead, then wail +
the missing exercise; shop-Wizard-50057049
FULL PASS. The diff is exactly that
reorder. Promise = diff.

## Inventory

- `drinkfountain` case-21 non-poisRes
  (fountain.js:855–878): `if
  (_losehp_needs_done || gameover) {
  finish_losehp_done(); if (gameover)
  return; }` then unconditional
  finish_maybe_wail + exercise(A_CON,
  false). C: fountain.c :300–309.
- No import changes (both finishers
  already imported for the poisRes arm),
  no new helpers. No deleted symbols —
  step-3 paste not triggered.

## C ↔ JS fidelity

Confirmed against pinned C:

- C :306–309: poison_strdmg(...) then
  exercise(A_CON, FALSE) — the exercise
  is unconditional in source order (runs
  iff the hero survives) ✓. The old JS
  lacked it entirely; the new code adds
  it in C position.
- C poison_strdmg (attrib.c:274–278):
  losestr then losehp; fatal losestr
  never reaches losehp (done noreturns)
  ✓ vs JS `if (!gameover) losehp(...)`.
- Fatal-losehp bail shape verified in
  JS losehp (hack.js:1962–1972):
  gameover + _losehp_needs_done (+
  _losehp_gameover), mirroring C :4282–
  4288. Old code's leading `if
  (gameover) return` therefore skipped
  the drain on exactly the fatal path —
  the diagnosed bug, now fixed.
- Drain-first correct on all three
  paths: (a) losestr-fatal: marker
  unset → finish no-ops → gameover
  still true → return, no exercise ✓
  (true death); (b) losehp-fatal:
  done(DIED)/Die?/lifesave run; survived
  → wail + exercise = C's post-done
  continuation ✓; (c) non-fatal: skip
  drain → wail + exercise ✓.
- Unconditional wail safe: C runs
  maybe_wail only in the non-fatal
  `else if` (:4289–4291, :4274 poly);
  JS sets `_needs_maybe_wail` only in
  those same else-branches
  (hack.js:1944/1973) — survived-fatal
  no-ops ✓.
- Cites inside comments check out
  (hack.c:4287–4288 urgent_pline+done;
  really_done :1144 gameover).

## Hallucinations / overclaim

None. The C-flow reconstruction (steps
240–245) is presented as recording-
measured and matches the fixed behavior
(Die? consumes `n`, game runs to 579).
Standing partial omit (monflee arms)
explicitly out of scope.

## Density

Cliff writer, 1/1 → PASS, 338 screens.
One `Ledger:` entry. Ported arm now
complete on this path (pline → strdmg →
drain → exercise → dryup tail). Cohort
7/7 + reach 43/43 in-commit. No
unreached work.

## Verification

Re-measure (`--base 335a8bfa9~1 --no-reach`):

```text
verify drinkfountain: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-shop-Wizard-50057049: PASS
```

Exact match. Focused test 1/1 green
here. No FORCE/DIAG/seed/coords in the
`js/` hunk. Rule #2 clean (window
rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
