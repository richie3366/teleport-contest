# Review 1687 — d61cfd75f — `dogmove.c` dog_eat whole body (D-2728)

Metadata: commit `d61cfd75f`, D-2728, `js/dogmove.js` only + new `scripts/dog-eat.test.mjs`. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises six arms → live: bee bypass, pool silence, tunnels, `distant_name`, rust spit, apport `impossible`. The diff delivers all six in C order, stays async, plus a bonus fix (`pline`→`pline_mon` in the sawpet arm, matching C). Promise matches deliverable.

## Inventory

Changed JS: `dog_eat` (`js/dogmove.js`, arms added, no signature change); new consts `LUMP_OF_ROYAL_JELLY`/`PM_KILLER_BEE`/`PM_RUST_MONSTER` (file idiom); new imports `bee_eat_jelly` (existing monmove edge), `costly_alteration` (existing shk edge), `COST_DEGRD` (const). New unit test (rust arm). No deleted symbols, no clones.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (new names + forced-shape check):

```text
Underwater       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/sit.js:150
bee_eat_jelly    js/monmove.js:2151   ASYNC — await required
costly_alteration js/shk.js:2288   ASYNC — await required
```

All arms LIVE: `bee_eat_jelly`/`costly_alteration` are live async and both awaited; `is_pool`/`tunnels`/`distant_name`/`unpaid_cost`/`impossible` live on existing edges (`--can` ALREADY on both sampled). The `game.u?.uinwater` inline is not a clone-reject: C `Underwater` is `(u.uinwater)` (`youprop.h:279`, as cited), no live JS export exists, and the inline matches the dominant convention (`apply.js:516`, `botl.js:2247`, `cmd.js:1923`). No STUB in any arm.

## C ↔ JS fidelity

C locus read: `dog_eat — dogmove.c:217-345` (csym range; message cites `:217–345`), arms read verbatim. Branch-by-branch:

- bee `:257–261`: `data==KILLER_BEE && otyp==JELLY && (res=bee_eat_jelly)>=0 → return res+1` ✓ verbatim; mndx-compare is current-form pointer-equality faithful (mnum fallback only when data is null — degenerate).
- pool `:266–270`: `is_pool && !Underwater` silence with the `:268` TODO kept as comment ✓.
- messages: seeobj/sawpet formulas unchanged ✓; `distant_name(obj, doname)` ×3 with the side-effect comment ✓; tunnels → `pline_mon "digs in"` else `pline_mon eats/devours` ✓ (the sawpet arm's `pline`→`pline_mon` matches C — a second real fix); `else if (seeobj)` plain `pline "It …"` ✓ (`Monnam` only in the rust arm ✓).
- rust `:300–311`: unpaid→`costly_alteration(COST_DEGRD)` awaited ✓, derust + `mstun=1` ✓, `canseemon && verbose` → `Monnam spits … in disgust!` ✓, and the whole rust arm skips `m_consume_obj` (else-shape) ✓ exactly as C.
- apport `:312–330`: `prior_apport` captured ✓, `200/(dropdist+moves-droptime)` trunc ✓, all 7 `impossible` args in C order (`%ld/%u`→`%d` is the house `impossible()` format limit, disclosed) ✓.
- unpaid bill `:332–337` + `m_consume_obj` inside else ✓; `:339` DEADMONSTER→2 ✓.
- Callers (dog.c:1212/:1265, dog_invent, dog_move): already await, unchanged ✓.
- RNG: no draw added/removed/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic. The unit test's "fails pre-fix" claim is falsifiable and behaviorally sound (old code fell through to `dogfood` RNG on the rustproof snack).

## Density

Breadth-phase whole-function completion, one module, zero new edges, plus a unit test. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base d61cfd75f~1 --reach-all`) — both lines, matching the D-log:

```text
verify dog_eat: baseline d61cfd75f~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dog_eat: no corpus session is blocked on it at d61cfd75f~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke dog_eat: no RNG-tagged reach; fixed smoke spread (24 run, 6.2s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log (full skipped — single non-shared module, acceptable); unit test 1/1. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
