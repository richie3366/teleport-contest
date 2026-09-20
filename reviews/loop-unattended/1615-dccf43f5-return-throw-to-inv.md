# Review 1615 — dccf43f5 — dothrow.c return_throw_to_inv whole-body port (D-2656)

**Metadata:** SHA `dccf43f5`, `dothrow.c`
`return_throw_to_inv`, D-2656. JS: `js/dothrow.js` (+61/−30:
missing objsplit-unsplit arm ported into the file-local
function). Retires the "objsplit unsplit" named omit.

## Intent vs deliverable

Subject promises: the missing `:1865–1882` unsplit arm in C
order, `otmp = null`, oid gate on live `game.context.objsplit`,
where-gate relink, live `unsplitobj`, `nomerge` bracketing,
autoquiver/re-wield/twoweap kept, `encumber_msg`
unconditional. Diff delivers all of it. Promise matches
deliverable.

## Inventory

- `return_throw_to_inv(obj, wep_mask, twoweap, oldslot)`
  (dothrow.js, file-local async) — C `dothrow.c:1852–1909`
  (58 L, staticfn).
- No new imports (`unsplitobj` already imported :17 — no new
  edge, correct). No deleted symbols, no re-points.

## C ↔ JS fidelity

C locus read in full (`csym.mjs` → `:1852–1909`). No RNG on
the path. Branch-by-branch confirm:

- `:1862` `otmp = NULL` → `let otmp = null` ✓.
- `:1865–1867` oid gate → `obj.o_id` vs
  `split?.parent_oid / split?.child_oid` on the live
  `game.context.objsplit` (writer mkobj.js:431) ✓. The `?.`
  guards are JS-only null-tolerance; a spurious entry (oid
  0, no split recorded) converges: `unsplitobj` requires a
  nonzero oid match (`mkobj.js:526/530` `oid && …`) and
  returns null → the C `:1873–1878` failure arm below ✓.
- `:1868–1871` chain-prepend + `where = OBJ_INVENT` →
  `obj.where = OBJ_INVENT` only. Adaptation verified here:
  live `unsplitobj` (mkobj.js:508, sync export) rejects
  FREE/FLOOR/etc. (`:511–516`) and locates the parent by
  scanning `game.invent[]` (`find_oid_in_invent :537/544`),
  so no array splice is needed — the where-gate is exactly
  what the callee requires, and the net effect (parent quan
  rejoined, chain/array otherwise unchanged) matches ✓.
- `:1873–1878` merge-failure unlink (`gi.invent =
  obj->nobj; nobj = 0; where = FREE`) → `obj.where =
  OBJ_FREE`: JS never spliced the array, so there is
  nothing to unlink — equivalent ✓. Success `obj = otmp`
  `:1880–1881` ✓.
- `:1889–1891` `nomerge = 1 / addinv_before /
  nomerge = 0` → same bracketing around live
  `addinv_before_throw` (the documented `addinv_core0`
  equivalent) ✓; autoquiver `:1895–1897`, re-wield
  `:1899–1904`, twoweap `:1906–1909` byte-identical inside
  the `!otmp` branch ✓; `encumber_msg` unconditional
  `:1911–1912` ✓.
- `if (!obj) return obj` (skips `encumber_msg`) and the
  null-guarded `nomerge` writes are pre-existing defensive
  guards (old body identical) — C dereferences
  unconditionally, so C defines no behavior there; not this
  SHA's wrong.
- Callers `throwit :1587` + boomerang-caught `:1608` are
  pre-existing file-local call sites, untouched. Callee
  closure: `unsplitobj` LIVE, `addinv_before_throw`
  LIVE, `encumber_msg` LIVE — no STUB in a live arm.

## Hallucinations / overclaim

None. "Behaviorally silent on the fortress and C-exact
regardless" is properly split: silence from the no-RNG
argument, exactness from the arm walk.

## Density

Breadth phase: one missing arm (61 ins) into its function —
right-sized for a restart-completion.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note 0 blocked · REACH smoke 24/24 · green · strict ·
cohort). Re-measured here: `hidden-proxy.mjs verify
return_throw_to_inv --base dccf43f5~1 --reach-all` → 0
blocked both sides (vacuous note, correctly labeled
coverage row) + smoke 24/24 PASS, 0 regressed → REACH-OK.
Claim true. Diff grep: 0 hits for
FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
