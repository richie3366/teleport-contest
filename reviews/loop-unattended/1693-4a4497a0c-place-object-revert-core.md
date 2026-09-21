# Review 1693 — 4a4497a0c — place_object `:2330` sync revert core (D-2734)

Metadata: commit `4a4497a0c`, D-2734, `js/mkobj.js` only. Follow-up to the D-2732 missing-arm row (that row is archived; this ships the arm). No corpus blocks. No prior review claimed closed.

## Intent vs deliverable

Subject promises: module-local sync core replicating `do.c:893–920` in C order, `place_object` stays sync, billing tail floated + named. The diff delivers exactly that. Promise matches deliverable.

## Inventory

Changed JS: new file-local `place_object_no_longer_held` + one call line at the `:2330` position; new consts `CRYSKNIFE`/`WORM_TOOTH` (file idiom), `COST_DEGRD` (const edge), `costly_alteration` (existing shk edge). No deleted symbols.

## Callee closure

Required `sym.mjs` output pasted verbatim (the cloned export):

```text
obj_no_longer_held js/do.js:690   ASYNC — await required
```

This is a CLONE of a live export — the highest-scrutiny shape (playbook: import, don't clone). Verification that it is a *verified* clone, not drift:

- Against C (`do.c:891-920`, csym range; body read verbatim): null return ✓; `Has_contents` cobj/nobj recursion ✓ (C's `else-if` ≡ sequential-if-after-return — the comment's equivalence claim is correct since both paths reach the switch); CRYSKNIFE `!oerodeproof || !rn2(10)` short-circuit ✓ (normal draws no RNG, fixed draws one — matching C); `!mon_moving && !gameover` billing gate ✓; WORM_TOOTH revert + `oerodeproof=0` ✓. Branch-for-branch identical to C.
- Against the live twin (`js/do.js:690`): identical except `await` → `void`-float on the one async call. No other delta.
- The async-refusal justification is measured, not asserted: 91 call lines across 32 files (recounted exactly in this review) — awaiting the live export would force async across all of them, past any sane iteration cap. Same shape as the accepted D-2726 sync-forced inlines (`bury_an_obj`, `mongone` — both async-only live twins).
- `Has_contents` (const edge, `:60`) and `rn2` (`./rng.js`, `:13`) are the shared imports, not locals. No STUB anywhere.

Remaining delta (disclosed, named): the floated `void costly_alteration(COST_DEGRD)` completes on microtask *after* the revert for unpaid shop goods where C bills synchronously *before*. Bill-timing only, on the rarest sub-arm (unpaid crysknife reverting via floor placement); no falsifier session exists, so per row-eligibility no queue row is owed yet ("own row on a falsifier" is the correct disposition, and indeed no billing row exists in the live queue — verified).

## C ↔ JS fidelity

Covered above: the clone is C-exact in order, predicates, and RNG short-circuit, called at the `:2330` position (post-pile-read, pre-threading) preserving C order. `add_to_container :2683` + `extract_from_minvent` stay named (they are *callees elsewhere*, correctly not dragged into this arm). No RNG added/removed/reordered.

## Hallucinations / overclaim

None. The message discloses the float mechanism including the sync-prefix behavior. No FORCE/DIAG/seed/coordinate logic.

## Density

One arm + one call line, one module, zero signature changes. Right-sized campaign step.

## Verification

Re-measured per-SHA re-run (`--base 4a4497a0c~1 --reach-all`) — both lines, matching the D-log:

```text
verify place_object: baseline 4a4497a0c~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify place_object: no corpus session is blocked on it at 4a4497a0c~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke place_object: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log. Rule #2 clean.

## Actionable C-wrongs

None (billing-tail completion has no falsifier; per row-eligibility it earns a row only with evidence — noted here so a future falsifier can cite this review).

Verdict: **ACCEPT**
