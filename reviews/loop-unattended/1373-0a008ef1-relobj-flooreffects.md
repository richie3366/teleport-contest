# Review 1373 — 0a008ef1 — relobj death-drop flooreffects (D-2407)

- SHA: `0a008ef1`, D-2407 (Open `[measure]`-delivered writer row:
  Samurai-92032 step 59 + Wizard-92219 step 115 lava death-drops).
  JS files: `js/mkobj.js` (+8/−3), `js/mhitm.js` (+2/−2 awaits),
  plus `scripts/relobj-flooreffects.test.mjs` (+75, headless unit).
- Prior reviews closed: none (writer row from the delivered
  obj_resists `[measure]`).

## Intent vs deliverable

Subject promises the `flooreffects(obj, omx, omy, "fall")` gate
before place+stack in `relobj_on_death`, async propagation to both
callers, no new static edge. Diff delivers exactly that. Promise
kept.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `relobj_on_death` (mkobj.js:2313) | sync → async + new gate | LIVE — C `mdrop_obj` `:840–843` order |
| `flooreffects` (do.js:707) | C callee, dynamic import | LIVE, async, awaited (`--can` → SAFE) |
| `grddead` / `m_detach` awaits (mhitm.js) | call-site propagation | LIVE — both fns already async |
| vault-guard gold (off-grddead path) | unported | OMIT — named (map + D-log, below) |
| pet-path `mdrop_obj` arms | untouched | OMIT — pre-existing D-0029/D-2401 |

No symbols deleted or re-pointed. Required `sym.mjs`: `flooreffects
→ js/do.js:707 ASYNC`; `relobj_on_death → js/mkobj.js:2313 ASYNC`.

## C ↔ JS fidelity

C loci read in pinned source: `mdrop_obj` (`steal.c:813–846`) +
`relobj` (`:868–898`); callers (`--callers`: dogmove.c:420 pet,
mon.c:2779 m_detach, vault.c:181 grddead, extern.h decl).

- Gate verbatim: `if (!flooreffects(obj, omx, omy, "fall")) {
  place_object; stackobj; }` — JS matches call, args (incl. the
  `"fall"` reason), polarity, and post-place order. Distant-name
  pre-extract observe order kept. ✓
- Callee closure: this arm's only callee is `flooreffects` (LIVE);
  the surrounding loop body is the pre-existing port. Dynamic import
  matches the `mon.js`/`dothrow.js` precedent; no new static edge
  into the SCC. ✓
- Caller coverage complete: all three C `relobj` sites route —
  pet → `dogmove` (pre-existing, arms named), death → `m_detach`
  (awaited here), guard → `grddead` (awaited here, isgd-gold inline
  as C `:874–882`). `show && cansee → newsym` preserved on the
  m_detach path (caller issues it); correctly absent on the
  show=0 guard path. No `verbosely` pline owed (is_pet=FALSE on
  both wired paths). ✓
- Named, not hidden: guard-dying-off-grddead gold (C gold arm only
  fires via `grddead` in JS; a combat-killed isgd routes through
  `m_detach` without it) is named in the D-log with the path
  condition and in the map (`turns.md:3289` vault-guard gold). Saddle
  `no_charge`/extrinsics tails stay under the same pre-existing map
  line; absent before and after, not this SHA's delta. ✓
- No RNG re-decisions: burn draws stay inside the established
  `lava_damage`/`delobj_core` ports; the gate only decides
  place-vs-burn where C decides it. ✓

## Hallucinations / overclaim

None — including the sharpest corner: the verify movement label
read "js-throw at step 96" for Samurai, and the D-log disputes its
own tooling with recorded evidence (scoreboard row `kind=screen,
error=null`, RNG 20913/20913 matched; two direct replays). I
re-read that scoreboard row this audit: `step 96, kind screen,
error null, owner null` — the Note holds. That is anti-overclaim,
not overclaim.

## Density

One arm + two awaits + a pure-gate unit test: one C locus family,
one falsifier (lava death-drop burns). Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify obj_resists --base 0a008ef1~1`
  → `1 PASS, 1 moved past, 3 unchanged, 0 worse → PROGRESS`
  (Wizard-92219 → PASS; Samurai 59→96; Knight-92182 @95,
  Arch-92238 @166, Healer-92173 @230 unchanged — other writers as
  row NOTE'd). Reproduces the D-log exactly; genuine movement.
- `node --test scripts/relobj-flooreffects.test.mjs` → 2/2 pass
  (re-run this audit; fails-on-prefix proven via stash per D-log).
  D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

None. The shipped arm matches C; remaining gaps are named omits
with falsifier conditions.

Verdict: **ACCEPT**
