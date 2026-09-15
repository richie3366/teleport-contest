# Review 1318 — 9cc2b25f — pickup count-N PICK_ONE drops PICK_ANY-only petrify arms (D-2352)

Metadata: SHA `9cc2b25f`, D-2352, closes the review-1316 Must-fix
(stamped `**Addressed:** D-2352` in this same commit). Method:
`js/` hunk read (1 file, +11/−4); C `pickup` count vs PICK_ANY
arms (`nethack-c/upstream/src/pickup.c:671-910` via `csym.mjs`,
count arm `:761-772` vs PICK_ANY `:774-776` read) + C
`query_objlist` gating lines (`FEEL_COCKATRICE →
SORTLOOT_PETRIFY`, CORPSE `will_feel` abort, both on `qflags &
FEEL_COCKATRICE`); all three `query_objlist_pickup` callers
read; added-line banned grep (0 hits); `imports.mjs --rulecheck`
(clean, re-run); `hidden-proxy verify pickup --base 9cc2b25f~1`
re-run. No symbol deleted or re-pointed → no `sym.mjs` owed.

## Intent vs deliverable

Subject promises to gate the two PICK_ANY-only behaviors out
of the new count-N PICK_ONE arm. Diff delivers exactly that —
`sortflags` starts `(how === PICK_ANY) ? SORTLOOT_PETRIFY : 0`
and the CORPSE `will_feel_cockatrice` abort gains a `how ===
PICK_ANY` conjunct, both with C citations — no new modules,
imports, or edges. Promise kept.

## Inventory

- `js/pickup.js` `query_objlist_pickup` only: two gates +
  C-cited comments + doc-header touch-up.
- Named: none new.

## C ↔ JS fidelity

Branch-by-branch confirm. C count arm (`:761-772`) calls
`query_objlist(qbuf, objchain_p, traverse_how, …, PICK_ONE,
n_or_more)` — bare `traverse_how`, no `FEEL_COCKATRICE`. C
PICK_ANY arm (`:774-776`) passes `(traverse_how |
FEEL_COCKATRICE)`. C `query_objlist` gates both effects on
`qflags & FEEL_COCKATRICE` (PETRIFY augment line; CORPSE
`will_feel` → menu-destroy + `look_here(0)` line — both
confirmed in the pinned body). JS gates both on `how ===
PICK_ANY`, and the caller audit shows the gate is exact: the
count arm passes `how: PICK_ONE` (gate off ≡ C bare
traverse_how ✓), the PICK_ANY arm passes `{autoselect: true}`
so `how` defaults to `PICK_ANY` (gate on ≡ C `|
FEEL_COCKATRICE` ✓). PICK_ANY path is byte-identical behavior
— the only behavior change is the buggy arm. No clone / stub /
callee shape (two predicates, no callees). The traditional
fallback (no opts → default PICK_ANY → gate on) is unchanged
from pre-SHA behavior and emulates no C `query_objlist` call
either way — not a new C-wrong here.

## Hallucinations / overclaim

None. "PICK_ANY path byte-identical" verified via the caller
audit above. The no-unit-test note (no `tests/` dir, sessions
are the suite, file-local async over display/input) is a
disclosed limitation, not an overclaim — and matches the
D-2350 precedent review 1316 already accepted.

## Density

Must-fix alone, +11/−4, one arm, one falsifier. Exemplary.

## Verification

D-log: `verify.mjs --fn pickup` PASS (syntax / rule2 /
hidden-vacuous-disclosed / green 2/2 / strict ×2 / cohort 7/7)
+ pre-change `--no-cohort` PASS. Re-measured:

```text
verify pickup: baseline 9cc2b25f~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches exactly; vacuous honestly labeled, row cited 0 blocks
(and review 1316 already re-measured 0 at `b214fb72~1`), so no
older `--base` owed. Added-line banned grep 0 hits;
`--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
