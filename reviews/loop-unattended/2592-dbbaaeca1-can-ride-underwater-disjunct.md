# Review 2592 — dbbaaeca1 — can_ride Underwater disjunct

SHA: `dbbaaeca1` (D-3722). Underwater-idiom family residual, 1
disjunct, `js/steed.js` only (+6/−2). Ledger: steed.c.jsonl
(can_ride ported).

## Intent vs deliverable

Promise: C forbids riding a non-swimmer steed while submerged
(steed.c:172–173); JS read dead-false sticky `u.Underwater` →
disjunct reads live `(u.uinwater | 0)`. Diff actually adds: the
one-condition rewire + expanded C-cite comment. Promise matches
diff.

## Inventory

- `can_ride` (js/steed.js:206) ↔ C
  nethack-c/upstream/src/steed.c:168–174 (csym range), disjunct
  :172–173.

## C ↔ JS fidelity

C `:168–174` is a single 5-conjunct return: `mtame &&
humanoid && !verysmall && !bigmonst && (!Underwater ||
is_swimmer(mtmp->data))`. JS is the guard-clause expansion:
`!mtame → false`; `!humanoid || verysmall || bigmonst →
false`; `(u.uinwater | 0) && !is_swimmer → false`; else true.
The last guard is exactly C's `(!Underwater || swimmer)` by
De Morgan — branch-for-branch equivalent, call order identical,
no RNG either side. `sym.mjs`: `can_ride js/steed.js:206
sync`, `is_swimmer js/monsters.js:451 sync` — both LIVE, no
clone, no STUB, nothing deleted or re-pointed, no import. C
callers (polyself.c:963, steed.c:322/:856, worn.c:1322) are
unchanged by this SHA (predicate body only).

## Hallucinations / overclaim

None. D-log states the vacuous verify plainly.

## Density

One whole predicate (7-line C body, all arms live) + focused
test + ledger + verify on an empty queue. Right-sized;
successor lead (D-3723 use_saddle) named.

## Verification

Re-measured: `verify can_ride --base dbbaaeca1~1 --reach-all`
→ 0 blocked (vacuous, as stated) + `smoke can_ride: no
RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS,
0 regressed → REACH-OK`. Matches the D-log. Rule #2 clean.
Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
