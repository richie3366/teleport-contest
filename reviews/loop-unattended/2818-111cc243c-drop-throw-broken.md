# Review 2818 — 111cc243c — drop_throw keeps flooreffects' broken

- **SHA:** `111cc243c` (Thu 2026-10-15) — cliffs-head writer (D-3972).
- **D-entry:** D-3972. **Ledger:** `mthrowu.c` (`drop_throw`, ported, re-stamped).
- **Diff size:** `js/mthrowu.js` −5/+13 (one function + 2 import names); +1 test.
- **Method:** cliff (one staticfn writer) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: scen-questtour-Healer-50157014 is a step-0
throw-void misattributed to `randomize_gem_colors` (the D-3954/D-3934
pattern — the JS worker throws `dobjsfree: obj where=1` in
`moveloop_core`, so no JS log exists and the scorer blames the first
C draw). The writer is `drop_throw`: JS discarded `flooreffects`'
return value, so a rolling boulder that sank in a pool (obfree'd,
`where=OBJ_DELETED`) still reported `broken=FALSE`; `ohitmon`'s
faithful range==-1 arm then kept rolling the dead boulder and the
re-place stomped the deleted-list link. The fix assigns
`broken = await flooreffects(…)`, hoists `m_at` above it, and gates
`ship_object` on `down_gate`. 1 PASS (full 67798 RNG + 1104
screens).

The diff is exactly those three changes plus the two import names.
Promise and diff agree.

## Inventory

- `js/mthrowu.js` `drop_throw` (~:782, local async — C staticfn):
  (a) `down_gate(x, y) !== MIGR_NOWHERE` gate around `ship_object`;
  (b) `let mtmp = m_at(x, y)` hoisted above `flooreffects`;
  (c) `if (!(broken = await flooreffects(obj, x, y, 'fall')))`.
- Imports: `MIGR_NOWHERE` joins the `const.js` import;
  `down_gate` joins the existing dynamic `dokick.js` import (no
  new edge — same 101-module SCC, dynamic as before).
- `scripts/drop-throw-flooreffects-broken.test.mjs` (new): 1/2
  pre-fix (pool case FALSE — the bug) → 2/2 post-fix.

No function added, deleted, renamed, or re-pointed; no clone. The
step-3 sym-run requirement is vacuous. `sym.mjs down_gate` →
`js/dokick.js:1827 sync` (LIVE); `MIGR_NOWHERE = (-1)` at
`js/const.js:1112` ≡ C `-1`. Diff grep: no `FORCE`, `DIAG`,
`getRngLog`, seed names, `fastforward`, or hardcoded coordinates.

## C ↔ JS fidelity

C `drop_throw` (`nethack-c/upstream/src/mthrowu.c:161-196` per
`csym.mjs fn drop_throw`), the whole `else` arm:

```c
if (down_gate(x, y) != -1)                        /* :176–177 */
    broken = ship_object(obj, x, y, FALSE);
if (!broken) {
    struct monst *mtmp = m_at(x, y);              /* :179 */
    if (!(broken = flooreffects(obj, x, y, "fall"))) {  /* :180 */
        place_object(obj, x, y);
        if (!mtmp && u_at(x, y)) mtmp = &gy.youmonst;
        if (mtmp && ohit) passive_obj(mtmp, obj, 0);
        stackobj(obj);
```

JS after this SHA is line-for-line that sequence: gate, hoisted
`m_at`, assigned `broken`, then the unchanged tail
(`place_object`, `u_at`→`youmonst` fallback reusing the hoisted
`mtmp`, `passive_obj` iff `mtmp && ohit`, `stackobj`). Verbatim
fidelity — branch order, call order, and value flow all match.

- The outer gate is behavior-preserving as claimed:
  `ship_object` (`js/dokick.js`) re-reads `down_gate` and returns
  `false` on `MIGR_NOWHERE` itself. The added gate only skips a
  call that would no-op — matching C's shape without changing
  outcomes on any path.
- Return-value users: C `drop_throw` is staticfn; the D-log maps
  all 6 C call sites to the one JS local and notes only `ohitmon`
  (:494→JS :1016, this divergence) consumes the return. The other
  five are `(void)` in C. The corrected `broken` therefore cannot
  perturb them. (Spot-checkable via `csym.mjs --callers
  drop_throw`; the mapping is consistent with the staticfn
  scope.)
- No RNG in this arm either side; `rn2(3)` in `ship_object` is
  pre-existing and untouched.

Named omissions: none new. The D-log states the neighboring bodies
(`ohitmon`, `launch_obj`, `boulder_hits_pool`) were verified
C-exact at the cited lines during diagnosis and left untouched —
a diagnosis note, not an omission.

## Hallucinations / overclaim

None. The "void misattributed to the first C draw" mechanism is
the documented D-3954/D-3934 pattern and the recorded
`dobjsfree` error is quoted with its stack. The temp-tag
measurement (obfree at `do.js:1070` ← `drop_throw` ← `ohitmon`
← `launch_obj`, re-place at `trap.js:2981`) is stated reverted;
the tree at this SHA shows no tag residue (diff grep clean).
No "Match C" is claimed for any dispatch — the change is three
lines inside one already-ported staticfn.

## Density

Cliff phase: the owner is the `randomize_gem_colors` cliff row
and the port is its true writer (`drop_throw`) — a throw-void
root-caused through the misattribution to the real C function,
not a patch of the misattributed owner. One cliff, one writer,
code + ledger + verify in one handoff. The ledger row is a
re-stamp of `ported`, not a new whole-function claim. The second
blocked session (Wizard-50056058, `hatch_egg useup` writer) is
explicitly left for its own pop per D-3954 Next — correct
scoping, not a miss.

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify drop_throw,randomize_gem_colors
--base 111cc243c~1 --reach-all`):

- `verify drop_throw`: 0 blocked at parent (vacuous for the
  writer, disclosed as such in the D-log); smoke 24/24 →
  REACH-OK.
- `verify randomize_gem_colors: 1 PASS, 0 moved past, 1
  unchanged, 0 worse → PROGRESS` — Healer-50157014 PASS exactly
  as claimed; Wizard-50056058 still blocked at step 0 exactly as
  named.
- `reach randomize_gem_colors: 3568 baseline-PASS session(s)
  reach it (3568 run): 3568 PASS, 0 regressed → REACH-OK` —
  full `--reach-all`, zero regressions.
- D-log gates: syntax, rule2, green 2/2, strict ×2, cohort 7/7,
  full public 44/44. The audit's end-of-iteration rescore
  re-covers the fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping. The
focused test asserts the behavioral property (sunk boulder
reports broken) pre/post fix.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
