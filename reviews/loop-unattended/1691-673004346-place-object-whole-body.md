# Review 1691 — 673004346 — `mkobj.c` place_object whole body (D-2732)

Metadata: commit `673004346`, D-2732, `js/mkobj.js` only (+59/−27). Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole body in C order with `:2330` named. The diff delivers every arm except `:2330` `obj_no_longer_held`, which is map-named with an evidence-carrying follow-up queue row in the same commit. Promise matches deliverable.

## Inventory

Changed JS: `place_object` (restarted in C order, stays sync); extended const imports (`COLNO`/`ROWNO`) and shk imports (`costly_spot`/`costly_adjacent`/`find_objowner`) plus `simple_typename`. No deleted symbols, no clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (all four new names):

```text
costly_spot      js/shk.js:832   sync
costly_adjacent  js/shk.js:4757   sync
find_objowner    js/shk.js:2352   sync
simple_typename  js/objnam.js:3813   sync
```

All LIVE sync on pre-existing edges (mkobj already imports shk/objnam/const — extended names only). No STUB in any shipped arm; the one unshipped callee (`:2330`) is OMIT with a same-commit queue row, which the method allows.

## C ↔ JS fidelity

C locus read: `place_object — mkobj.c:2304-2366` (csym range; message cites `:2305–2366`), body read verbatim. Branch-by-branch:

- `:2309–2323` isok gate: OOB → `panic` becomes `throw` (no live panic export; mklev.js:19190 precedent), x=0 column → floating `impossible()` (do_wear.js:619 precedent), then falls through and keeps going exactly as C's comment mandates ✓; message shape mirrors C (`"%s" [%d] off map <%d,%d>`) with sync `simple_typename` standing in for async-in-JS `safe_typename` ✓ disclosed.
- `:2325–2327` not-free → `throw` ✓ (`|0`-as-OBJ_FREE is a benign house adaptation for unset fields).
- `:2329` `assert` dropped ✓ (debug-only; no asserts in `js/`).
- `:2330` omitted with map line + missing-arm row (evidence: brief at @addccb0a7, async `costly_alteration` chain would force async across 91 sites/32 files) — the campaign pattern, not a silent stub.
- `:2332–2351` boulder gate + under-last-consecutive-boulder threading ✓ verbatim (JS `recalc_block_point`-after-place is the kept D-0270 pattern for C's `block_point`-before ✓ disclosed).
- `:2353–2361` ox/oy/OBJ_FLOOR + no_charge lapse (`costly_spot`/`costly_adjacent(find_objowner)` — exact predicate) ✓; `:2363–2366` fobj chain + timed ✓. JS statement order matches C order throughout.
- The new `throw`s mirror C `panic`s (abort semantics); both arms are unreachable in valid play and no corpus session throws (green gates hold).
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic.

## Density

Whole-function completion (63-line C body), one module, zero new edges, plus a compliant follow-up row. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 673004346~1 --reach-all`) — both lines; the D-log Verify bullet for this SHA was not pasted in the subject but the re-run is clean:

```text
verify place_object: baseline 673004346~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify place_object: no corpus session is blocked on it at 673004346~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke place_object: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous-but-stated shape with smoke REACH-OK. Green/strict/cohort per the iteration's verify (D-log); Rule #2 clean.

## Actionable C-wrongs

None (the `:2330` gap already has its own queue row from this commit — re-listing it would duplicate live queue).

Verdict: **ACCEPT**
