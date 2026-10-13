# Review 2771 — aebed1065 — hurtle Punished guard reads live uball

- SHA: `aebed1065` (D-3918)
- Scope: `js/dothrow.js` +6/−4 (guard + comment), 1 test, ledger
  `dothrow.c.jsonl`
- Method: cliff commit (1 guard); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `insight.c` background_enlightenment (Wiz-587307
s365) is misattributed (literal-tie-break on "Elemental", prints
nothing here); the writer is `hurtle`'s `:1090` Punished guard, which
ANDed the dead `u.Punished` flat — so a punished hero (uball on floor
at feet, `Punished=undefined`) was hurled 2 cells instead of
tug-returning, losing the More-paused «tug from the iron ball».
Claimed: probe PASS.

Diff actually does: guard becomes `u.uball && u.uball.where !==
OBJ_INVENT` with macro cites; doc reworded (former "diagonal-chain
slack" omit shipped). Nothing else.

## Inventory

- `hurtle` guard (js/dothrow.js:3181–3186): C dothrow.c:1077–1126
  (`csym` range; D-log cites :1078–1126), guard at :1090–1093. Changed:
  guard predicate.
- No helpers added/deleted/re-pointed; no new imports/edges.

## C ↔ JS fidelity

C :1090 `if (Punished && !carried(uball))` → `You_feel("a tug…")` +
`nomul(0)` + return, verified in pinned C. Both macros expand exactly
to the new JS: `Punished ≡ (uball != 0)` (youprop.h:77 ✓),
`carried ≡ where == OBJ_INVENT` (obj.h:332 ✓). The dead-flat claim
verified myself: zero `js/` lines write `.Punished` (the remaining
`u.Punished` reads are comments plus do.js:1806/2288 `u.uball ||
u.Punished`, which ≡ `u.uball` and are named out-of-scope in the D-log
— behaviorally correct, different file). Tug arm body (You_feel +
nomul(0) + return, no movement) untouched and C-exact. No RNG, one
print — both preserved. All 10 hurtle call sites share the one guard;
the D-log forced full 44/44 for that reason.

## Hallucinations / overclaim

None. "hurtle whole vs C" is scoped honestly (the walk_path→for-loop
shape is flagged pre-existing structure, not re-ported here).

## Density

Cliff-phase: background_enlightenment was the head at the parent
(1651cae7f block: 1 block, RNG lost 26403, s365 — verified in the
parent tree). Owner stands (whole D-2971, read once), writer ported
with the divergence measured (JS@364 RNG-exact, JS@365 moved vs C
stayed, C s366 reveals the queued tug). One cliff, one file, code +
ledger + test + verify in one handoff. `Ledger: hurtle ported`
present. Not a no-op, not unreached (probe PASS).

## Verification

Re-measured myself (`verify background_enlightenment,hurtle --base
aebed1065~1 --reach-all`):

- `verify background_enlightenment: 1 PASS, 0 moved past, 0 unchanged,
  0 worse → PROGRESS` (587307 PASS)
- `smoke` both fns: 24/24 → REACH-OK (hurtle blocks no session —
  disclosed writer-only); zero `worse`/REGRESSED. Matches the D-log
  Verify bullet exactly.

Grep of added lines: clean. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`). No seed/step/coordinate reads. New test
3/4 pre-fix (tug red, 3 controls green) → 4/4 post-fix with a
pre-fix-guard roundtrip per the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
