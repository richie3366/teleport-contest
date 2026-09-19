# Review 1492 — 32ba8af0 — invent.c merged (D-2533)

## Metadata

- SHA: `32ba8af0`
- D-id: D-2533. Next index: 1492.
- Files: `js/mkobj.js` (restart + export), `js/invent.js`
  (clone→wrapper), `js/zap.js` (loop core→import),
  `js/u_init.js` (duplicate core→import).
- C locus: `nethack-c/upstream/src/invent.c:813–948` (`merged`,
  136 L).

## Intent vs deliverable

Subject promises: whole `merged` in C order (THIN → live) + three
clone rewirings. Diff actually adds: exported `merged`
(`js/mkobj.js:2549`), `invent_merged` → wrapper, zapyourself loop →
`merged`, `absorbInto` → `merged` + `added:` tail. Promise matches
deliverable. No RNG in C; none added.

## Inventory

- Changed: `merged` (local → exported; `sym.mjs` single hit —
  no rival def).
- Re-pointed ×3 (required `sym.mjs` reasoning): `invent_merged`
  body → `merged` call; zap loop quan/known/extract inline core →
  `merged`; `absorbInto` age/quan/weight/ID/pline duplicate core →
  `merged`. All three duplicate cores deleted, single canonical
  body remains. No straggler defs (only `merged` resolves).
- New imports: `setnotworn` (do.js), `setworn` (do_wear.js),
  `obj_merge_light_sources` (timeout.js), `W_SWAPWEP`/`W_QUIVER`/
  `LOST_THROWN` const words. `--can mkobj.js do.js setnotworn`
  and `--can mkobj.js do_wear.js setworn`: both ALREADY (specifier
  extensions, no new edge). Pasted above.

## C ↔ JS fidelity

`csym.mjs` body `:813–948` vs JS, in order:

- `:819` mergable gate (live, D-2207; gate stays — D-2324).
  Extra `!otmp || !obj` guard is defensive JS, unreachable via
  real callers. Confirm.
- `:826–831` age average skipped when `obj` lamplit/globby
  (comment records why: burn stop/restart, glob weight-average
  in obj_absorb). `Math.trunc` over non-negative ages ≡ C `/`.
  Confirm.
- `:833–834` quan except globby survivor (stays 1). Confirm.
- `:835–840` coin reweigh + `bknown = 0`, else reweigh unless
  `Is_pudding(otmp)` (old JS reweighed puddings — fixed).
  Confirm.
- `:841–842` oname absorb (`otmp = *potmp = oname(...)` —
  JS assigns both; `|| otmp` guards a null return; in-place per
  file convention). Confirm.
- `:843` extract. Confirm.
- `:845–846` `pickup_prev` when survivor in invent. New (was
  missing). Confirm.
- `:849–852` light merge THEN stop timers ("really should merge
  the timeouts" order — old JS stopped timers without the light
  merge; fixed). `obj_merge_light_sources` sync (`sym.mjs`
  `js/timeout.js:1691` sync) — safe in sync `merged`. Confirm.
- `:853–876` known/rknown/bknown reconcile with the exact
  `discovered` conditions (rknown needs `oerodeproof`, bknown
  exempts `Role_if(PM_CLERIC)` ≡ hero-role check). Old JS set
  all three dims unconditionally — fixed. Confirm.
- `:878–913` worn fixup: gate `obj->owornmask && carried(otmp)`
  ≡ worn-obj + `where == OBJ_INVENT` (`carried` is that macro);
  W_WEP > W_SWAPWEP > W_QUIVER preference; `impossible` else
  keeping otmp's mask; `setnotworn`/`setworn`/`setnotworn`
  sequence. Both `sym.mjs`-sync (`do_wear.js:603`,
  `do.js:491`) — safe unawaited. `impossible` is async
  (`display.js:7947`) → `void`-fired per the file's D-0993
  sync-context pattern; only reachable on strangely-worn
  stacks. `#if 0` mcarried arm (`:906–912`) named compiled-out.
  Arm live but unreachable until D-2324 lifts the mergable
  gate — disclosed in D-log and comment. Confirm.
- `:919–920` bypass follows the absorbed stack. New. Confirm.
- `:922–928` globby moved to C position (old JS branched
  before age/quan/extract — reordered to C order) →
  `pudding_merge_message` + `obj_absorb` (sync `:2727`) +
  return 1. Confirm.
- `:930–938` compare-learn pline with double `LOST_THROWN`
  exemption + invent gate. `void pline` fire-and-forget (sync
  context; u_init's previously-awaited pline now unfired-order
  — full 44/44 + cohort green covers the reorder). Confirm.
- `:940` `obfree(obj, otmp)`, return 1. The removed
  `potmp.obj = otmp` line is safe: same reference unless the
  oname arm ran, which assigns `potmp.obj` itself. Confirm.
- Callers: mkobj-internal (`:241` add_to_container, `:263`
  add_to_minv, `:529` unsplitobj, `:2655` stackobj) unchanged;
  invent/zap/u_init rewired to the canonical body. `zap.c:5552`
  fracture_rock named (async cascade deferred). No unwired
  caller left silent.

Callee closure: all LIVE/sync/file-local; omits (`#if 0` arm,
mergable gate D-2324, zap pre-check shape) named with loci. No
STUB in any live arm.

## Hallucinations / overclaim

None. The "3 clones rewired" claim is exactly the three
call-site diffs; the D-2324 gate dependency is disclosed, not
sold as shipped.

## Density

One 136-line C function + three dedup wirings, four files on
ALREADY edges. At the §2b ceiling but one semantic cluster —
acceptable.

## Verification

- D-log: syntax (4 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44
  PASS → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify merged
  --base 32ba8af0~1 --reach-all` → 0 blocked both trees (vacuous
  note, honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
