# Review 1653 — 3e86b108 — `u_init.c` ini_inv whole-body port (D-2694)

Metadata: commit `3e86b108`, D-2694, `js/u_init.js` only (+1
import, restarted body). No prior review claimed closed. Pops
the brief-verified PARTIAL `ini_inv` row (removed from the
queue in this commit).

## Intent vs deliverable

Subject promises: pauper/nudist/addinv-return arms. Diff
actually ships all four dropped behaviors the D-log names:
pauper early-return, substitution return + `nhUse`, nudist
armor-discard path, merged `addinv` return — plus the
if/else-if→C-switch reshape with the verbatim rely-on-order
comment. Matches the promise.

## Inventory

Changed JS: `ini_inv` (js/u_init.js:1355, file-local staticfn —
signature unchanged, all 36 C call sites pre-exist wired).
Re-pointed: `dealloc_obj` → `js/mkobj.js:3405` sync export
(sym.mjs pasted); joins the pre-existing `./mkobj.js` edge, no
new cycle. No deleted symbols.

## C ↔ JS fidelity

C locus: `ini_inv` `u_init.c:1300–1366` (csym, 67 L — whole body
read). No RNG in the changed lines (row cites RNG 0).

- Pauper (`:1308`): `if (u.uroleplay.pauper) return` →
  `if (game.u?.uroleplay?.pauper) return`. Confirm.
- UNDEF_TYP switch: C `switch (otyp)` with fallthrough-free
  `break`s and the verbatim three-facts comment → JS identical
  shape and comment. Nocreate assignments match arm-for-arm
  (`RIN_POLYMORPH_CONTROL`; then RIN/SPE/POT trio), as does
  the ring/spbook `nocreate4`. Confirm. (The `case` labels
  still go through `otypByName` — value-identical to int
  consts, a style nit, not a C-wrong.)
- Substitution (`:1346`): C `otyp =
  ini_inv_obj_substitution(trop, obj); nhUse(otyp)` → JS
  assignment + `void otyp`. C callee returns `short`
  (obj->otyp; `u_init.c:1180–1203` read this session). Confirm.
- Nudist (`:1349–1353`): C `dealloc_obj(obj); trop++;
  continue` with NO quan recompute → JS `dealloc_obj(obj);
  ti++; trop = tropArr[ti]; continue` with carried-over `quan`.
  The loop re-tests `trop.trclass` at the top, matching C's
  `while (trop->trclass)`. Safety: fresh `mksobj` objects
  carry no `where` (`undefined | 0 = 0 = OBJ_FREE`,
  js/const.js:1351) and no `nobj`, so `dealloc_obj` cannot
  take its throw paths (read `js/mkobj.js:3405` this session).
  Confirm.
- `quan = 1` on adjust (`:1356`), `obj = addinv(obj)`
  (`:1358`): `addinv` (js/u_init.js:988, async) returns the
  possibly-merged stack on every path (returns at :108/:114/
  :117/:143 of its body, verified this session), so the
  SPBOOK level-1 check now reads the merged stack per C.
  Previously the return was discarded — the exact wrong the
  row named. Confirm.
- `--quan` continue / `trop++` + `trquan` tail (`:1363–1365`):
  unchanged, C-order. Confirm.

Classify: `mksobj`/`dealloc_obj`/`addinv` = LIVE;
`ini_inv_mkobj_filter`/`ini_inv_obj_substitution`/
`ini_inv_adjust_obj`/`trquan` = same-file C-staticfn locals
(pre-existing, unchanged here — the correct home, not drift).
No STUB in any live arm. Named omissions: none in this
function.

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

None. "Whole-body port" is accurate: the four named gaps were
the only deltas between the live body and C, and all four
shipped with `:line` cites.

## Density

83 insertions for a 67-line C function restart: within the
breadth-phase band. Not padded.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify ini_inv --base 3e86b108~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
