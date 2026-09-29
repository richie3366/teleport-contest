# Review 2070 — d27c7b945 — max_passive_dmg restart + mondata cluster

- SHA: `d27c7b945` (D-3110)
- Subject: "mondata.c max_passive_dmg restart + ranged_attk/can_track/levl_follower/is_fshk (coverage)"
- js/ insertions: ~66 (js/mhitm.js, js/mondata.js, js/monsters.js, js/dog.js, js/shk.js, js/artifact.js)
- Prior index: 2069; queue Must-fix at review time: empty

**Addressed:** D-3118 `c1be7a049`

## Intent vs deliverable

Promise: restart PARTIAL `max_passive_dmg` whole (add the
complete-burn/rot/rust → magr.mhp arm, replace the inline mres
bitmask with resists_* calls), port MISSING `ranged_attk` +
`is_fshk`, complete the `can_track` Excalibur arm and both
`levl_follower` arms, plus 4 stale siblings.

Diff actually adds: all five bodies as promised, the Excalibur
late-bind hook pair, `is_fshk` import into dog.js. Matches the
promise — but the resists_* calls are bits-only in-file locals,
not the live full semantics (see below).

## Inventory

Per function (cluster of 5 + 4 stale):

- `max_passive_dmg` (js/mhitm.js:2299, local + re-export) — C
  mondata.c:718–767 (csym range). Live: multi2 loop, new
  burn/rot/rust arm, dice math, `×multi2/break/return`.
  DIVERGED: the elemental arm calls mhitm.js-local resists_*
  (`:407–431`) that implement only the resistance-bits arm of C
  `Resists_Elem` (mondata.c:129–197); the wielded-artifact
  `defends` (`:173–176`) and worn/carried (`:178–196`) arms are
  dropped while the full `Resists_Elem` is live at
  js/mondata.js:240 — already imported by mhitm.js:15.
- `ranged_attk` (js/mondata.js:1235, export) — C :401–410. Live:
  whole body; DISTANCE_ATTK_TYPE ≡ SPIT/BREA/MAGC/GAZE
  (monattk.h:31–34, verified). No C callers — unwired export OK.
- `can_track` (js/monsters.js:403, export) — C :622–628. Live:
  whole body; Excalibur arm via late-bind hook set at
  artifact.js eval. No new static edge (TDZ empirically confirmed:
  first verify failed cohort 0/7 ReferenceError).
- `levl_follower` (js/dog.js:346, export) — C :1210–1226. Live:
  whole body; mon_has_amulet (apply.js, pre-existing import),
  is_fshk (added to existing shk.js edge).
- `is_fshk` (js/shk.js:237, export) — C shk.c:5011–5015. Live:
  whole body over live ESHK.

Helpers: `completely*_mm` (mhitm.js:2981–2997, pre-existing
locals) match C mondata.h:223–227 exactly (paper/straw,
wood/leather, iron; mndx ≡ pointer compare). No new clones, no
stubs, nothing deleted or re-pointed. `sym.mjs` on the touched
locals confirms the mhitm resists_* are duplicates of canonical
exports (zap.js/monsters.js) — which are themselves bits-only
with named artifact/worn omits.

## C ↔ JS fidelity

`max_passive_dmg` vs C :718–767: multi2 contact set exact (10
aatypes; CLAW comment typo fixed), burn/rot/rust arm exact
(`dmg = magr->mhp`, data-pointer args), dice `damn||mlevel+1`
× damd exact, tail `dmg *= multi2; break; return dmg` exact.
BUT the elemental arm diverges: C `resists_fire(magr)` is the
monst.h:272 macro for `Resists_Elem(magr, FIRE_RES)` — bits OR
wielded-artifact OR worn/carried. JS calls locals that test
bits only. The old inline bitmask had identical semantics, so
this is behavior-neutral vs the parent — but the commit sells
it as the fidelity fix ("instead of the live resists_* calls")
while the live full function sits one import away, already
imported. D-1849 pattern (clone dropping C predicates where the
export is live). C-wrong, not a named omit: D-3110 names "none".

`ranged_attk`: exact, macro verified. `can_track`: exact —
`u_wield_art(ART_EXCALIBUR)` ≡ is_art(uwep) at call time;
haseyes fallback; hook null-guard only matters pre-artifact-eval.
`levl_follower`: exact, comments verbatim, `u.uhave.amulet`
read right. `is_fshk`: exact.

Callers: dogmove.c:1123→js/dogmove.js:1432 ✓,
monmove.c:1880→js/monmove.js:2120 ✓, dog.c:811→js/dog.js:482 ✓
(D-log :474 pre-drift), mondata.c:1220 wired this iter ✓,
ranged_attk none ✓. Stale siblings resolve (little_to_big,
big_to_little, mon_knows_traps exported; gender local exact —
`is_neuter→2 else female`, all 3 C sites live: 2 via the D-3093
dispatcher, uhitm.c:2208 via exact inline).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (imports.mjs --rulecheck, iteration-wide).

## Hallucinations / overclaim

Yes: "elemental arm used an inline mres bitmask instead of the
live resists_* calls" + "max_passive_dmg: none — whole body,
every callee live". The new callees are bits-only clones with
the same semantics as the removed bitmask — the "fix" is a
no-op rename, and the callee gap (artifact/worn arms of live
Resists_Elem) is unnamed. The burn/rot/rust arm is a genuine
fix; the resists half is presentation without substance.

## Density

5-function one-file + callee-closure cluster (is_fshk is
levl_follower's sole callee), ≤10, no Must-fix bundled, per-function
Ledger + Verify lines. ~66 js/ insertions, below ~80 — the
unless-clause claim (no more mondata.c rows) is plausible and
the cluster carries 5 whole functions + 4 stale sets, so density
is not the defect here. Per-function verdicts: max_passive_dmg
QUALITY-RISK; ranged_attk, can_track, levl_follower, is_fshk
ACCEPT. SHA verdict is the worst: QUALITY-RISK.

## Verification

Re-measured (`--base d27c7b945~1 --reach-all`, all 5 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×5. Matches the D-log;
honestly framed, no REGRESSED session. Shared gates per D-log:
syntax 6 files, rule2, green 2/2, strict ×2, cohort 7/7 (after
the TDZ fix re-run).

## Actionable C-wrongs

1. `max_passive_dmg` elemental arm (js/mhitm.js:2318–2322) calls
   bits-only resists_* locals; C resists_* ≡ Resists_Elem
   (mondata.c:129–197) whose artifact (`:173–176`) and
   worn/carried (`:178–196`) arms are live at js/mondata.js:240
   and already imported (mhitm.js:15). Call
   `Resists_Elem(magr, ACID_RES/COLD_RES/FIRE_RES/SHOCK_RES)` —
   or import the canonical bits-only exports and name the omit.
   One port iter: 4-line swap + verify.

Verdict: **QUALITY-RISK**
