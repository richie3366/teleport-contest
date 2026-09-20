# Review 1618 — e34aa845 — dogmove.c dog_nutrition whole-body restart (D-2659)

**Metadata:** SHA `e34aa845`, `dogmove.c` `dog_nutrition`,
D-2659. JS: `js/dogmove.js` (+99/−41: restart + `eaten_stat`
import join). Fixes four real divergences the subject names
honestly (deferred oeaten arm, `msize > MZ_HUGE` gigantic
wrong, COIN `< 1` vs `< 0`, clamped else arm, instance-field
corpse reads).

## Intent vs deliverable

Subject promises: single if/else-if/else with one tail
return, table-direct corpse reads, C-exact switch with
stacked default+MEDIUM and file-local `MZ_GIGANTIC = 7`,
live `eaten_stat`, C-exact COIN guards, clamp deleted.
Diff delivers all of it. Promise matches deliverable.

## Inventory

- `dog_nutrition(mtmp, obj)` (dogmove.js, sync, exported)
  — C `dogmove.c:155–214` (60 L).
- `eaten_stat` joins the existing mkobj.js import (`--can`
  ALREADY per subject; `sym.mjs`: mkobj.js:363 sync) ✓.
  No deleted symbols, no re-points.

## C ↔ JS fidelity

C locus read in full (`csym.mjs` → `:155–214`). No RNG
either side. Branch-by-branch confirm:

- CORPSE `:165–167`: `3 + (mons_cwt(corpsenm) >> 6)` /
  `mons_cnutrit(corpsenm)` — table-direct; helpers read
  `mons(corpsenm)?.cwt ?? 10` / `?.cnutrit ?? 20`
  (JS-only fallbacks for missing table entries, named) ✓.
  Instance-field reads (`obj.cwt/obj.cnutrit`, never
  written by any JS writer) gone ✓.
- Non-corpse `:168–171`: `oc_delay ?? 1` + name-map
  nutrition (extractor omits `oc_nutrition` — pre-existing
  D-0364 state, named) ✓.
- Switch `:173–193`: exact, stacked `default:`+MEDIUM,
  `MZ_GIGANTIC = 7` verified at monflag.h:183 ✓. The old
  `msize > MZ_HUGE → ×2` wrong (sizes 5–6) is gone.
- oeaten `:194–197`: `eaten_stat(meating)` +
  `eaten_stat(nutrit)` via the live export (signature
  `(base, obj)` matches C use) ✓ — previously deferred
  entirely.
- COIN `:198–205`: `trunc(quan/2000)+1` with `< 0 → 1`,
  `trunc(quan/20)` with `< 0 → 0` ✓ (old `< 1` fixed).
- Else `:206–213`: `trunc(owt/20)+1` with the clamp
  deleted, `5 ×` nutrition ✓ (old clamp fixed).
- One tail `return nutrit` unifies the three early
  returns ✓. Null guards (`?.msize ?? MEDIUM`,
  `?? 0/1`) are JS-only, named.
- Callee closure: `mons()`, `eaten_stat` LIVE; no STUB.

## Hallucinations / overclaim

None. The subject lists the old body's four wrongs
concretely (with line cites and the mechanism each time)
rather than claiming a vague "cleanup".

## Density

Breadth phase: one-function restart (99 ins, 1 file) —
right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note · REACH-OK smoke 24/24 · green · strict · cohort)
plus a 5-case probe with C-order values. Re-measured
here: `hidden-proxy.mjs verify dog_nutrition --base
e34aa845~1 --reach-all` → 0 blocked both sides (vacuous
note, correctly labeled coverage row) + smoke 24/24
PASS, 0 regressed → REACH-OK. Claim true. Diff grep: 0
hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
