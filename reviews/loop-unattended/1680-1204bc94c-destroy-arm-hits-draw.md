# Review 1680 — 1204bc94c — `do_wear.c` destroy_arm C-order hits draw (D-2721)

Metadata: commit `1204bc94c`, D-2721, `js/do_wear.js` only (3-line behavior change + doc). Corpus-residual row (Caveman-92202's later owner after D-2719 → session PASS). No prior review claimed closed.

## Intent vs deliverable

Subject promises: C-order restart — `hits = rn2(4)+1` drawn at declaration before the gather/early-return, dead null guard dropped; everything else (gather order, predicates, erode flags, ret/break, `stop_occupation` tail) verified unchanged. Diff delivers exactly that. Promise matches deliverable.

## Inventory

Changed JS: `destroy_arm` (`js/do_wear.js:3736`, async) — one line moved up, one guard deleted, doc rewritten. No imports touched; no symbols deleted or re-pointed.

## Callee closure

Required `sym.mjs` output pasted verbatim (no deletion/re-point — same callees, new positions):

```text
destroy_arm      js/do_wear.js:3736   ASYNC — await required
```

All callees pre-existing LIVE edges per the D-log (`rn2`; `erosion_matters`/`is_damageable`; file-local `obj_erode_type :3097`, C-identical `:3260–3273` — a same-module staticfn-equivalent, correctly unexported; `erode_obj`; `stop_occupation`). No STUB in the arm.

## C ↔ JS fidelity

C locus read: `destroy_arm do_wear.c:3276–3316` (csym range; message cites `:3278–3316`, same body). RNG walked call-for-call — and the RNG order *is* the fix:

- `hits = rn2(4)+1` at C `:3282` declaration, before the gather and the `!idx → return 0` (`:3283–3293`) — JS now draws first, so a naked hero still consumes the draw ✓. Old JS drew after the early return (naked → no draw → downstream keystream shift). The session evidence nails it: C `rn2(4)`@destroy_arm vs JS `rn2(5)`@distfleeck — one missing draw upstream.
- Gather order uarm/uarmc/uarmh/uarms/uarmg/uarmf/uarmu incl. non-erodeable ✓; loop `armors[rn2(idx)]` ✓; predicate `erosion_matters && is_damageable && !oerodeproof` short-circuit ✓; `erode_obj(otmp, xname, erosion, EF_PAY|EF_DESTROY)` ✓; `r != ER_NOTHING → ret=1`, `r == ER_DESTROYED → break` ✓ (tail read this iteration, lines 3751–3765); `ret → stop_occupation()`, `return ret` ✓.
- Dropped `if (!otmp) continue`: C indexes a densely-gathered non-null array — the guard was dead; deleting it removes a divergence that could only trigger on a state C cannot produce ✓.
- Named: none new. D-2640 (`read.c` seffect_destroy_armor) correctly stays open for its own C file.

## Hallucinations / overclaim

None. "Whole 38-line body ported" checks out against the 41-line C body (3 lines are the signature/braces). No FORCE/DIAG/seed gates in the hunk.

## Density

Single-draw-order corpus-residual fix, one module. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 1204bc94c~1 --reach-all`) — both lines, matching the D-log exactly:

```text
verify destroy_arm: baseline 1204bc94c~1 — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-poly-Caveman-92202: PASS
verify destroy_arm: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
reach destroy_arm: 2 baseline-PASS session(s) reach it (2 run, 0.4s): 2 PASS, 0 regressed → REACH-OK
```

The queue row cited exactly 1 block and it is PASS — the three-link Caveman chain (D-2717 → D-2719 → D-2721) is fully closed. Genuine PROGRESS with a real RNG-tagged reach line (2/2, not smoke). Green/strict/cohort per D-log; Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
