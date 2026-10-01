# Review 2202 — ea58ae969 — dowaterdemon live mhis/mhe + You; gem stale

Metadata: SHA `ea58ae969`, D-3241, js/fountain.js only (2 import
lines + 1 call site + doc). Parent baseline `2b9efeed4`.

## Intent vs deliverable

Subject promises: wire live `mhis`/`mhe` + `You` into
`dowaterdemon`, moving Monk terrain 0→220, with
`randomize_gem_colors` closed stale. Delivered exactly that. The
misattribution analysis (ReferenceError voiding the run, first C
RNG entry becoming owner) is measured (`hidden-proxy show` throw
chain) and the fix targets the throw, not the owner. No drift.

## Inventory

- `dowaterdemon`: unleash line `pline("You unleash …")` → live
  async `You("unleash …")` (awaited); `mhis`/`mhe` now live
  mondata.js sync imports (both edges pre-existing, extended).
- No body edits to `randomize_gem_colors` (declared stale-complete).

## C ↔ JS fidelity

`dowaterdemon` — C fountain.c:63–90, walked in full. G_GONE gate,
makemon WATER_DEMON at u.ux/u.uy MM_NOMSG, `!Blind →
You("unleash %s!", a_monnam)` else You_feel ✓ (channel now the
live `You`, same vpline path, identical text); `rnd(100) > 80 +
level_difficulty()` → grateful-pline with live `mhis`/`mhe`
(exact you.h:322–324 macro ports, verified) + mongrantswish ✓;
else-if `t_at` → mintrap ✓; GONE else: pline_The text rendered via
`pline('The fountain bubbles…')` — text-identical — with
`Soundeffect(se_furious_bubbling, 20)` named (contest !SND_LIB:
C macro empty, JS no-op; dig.js precedent cited) ✓. RNG
call-for-call (`rnd(100)`). Verdict: whole body exact.

`randomize_gem_colors` stale claim — verified, not trusted: C
o_init.c:84–109 (two `rn2(2)` gates + `rn2(4)` 4-arm switch) vs JS
o_init.js:114–131 — complete, same draws, same targets; sole C
caller o_init.c:189 fires in the GEM_CLASS arm, wired at
js/o_init.js:299–302. The queue row's owner was indeed a phantom
of the voided run. Verdict: correctly closed stale.

Helpers: `mhis`/`mhe`/`You` all LIVE (sync/sync/async-awaited).
`a_monnam` stays the file's pre-existing local clone (fountain.js:278)
— named debt with a switch-falsifier requirement, behavior unchanged
in passing sessions; no divergence evidence in this arm (water demon,
non-hallu), so no queue item. Pre-existing `u.Blind || u.ublind`
flat (untouched lines) noted, out of scope.

## Hallucinations / overclaim

None. "No corpus session blocked on dowaterdemon" is stated as a
note, not a PASS; movement is evidenced under the row's owner fn.

## Density

Single-function throw fix + one verified stale: right-sized. Own
C-locus, Callers, Verify, Named-omissions bullets and own `Ledger:`
entries (both fns). No Must-fix bundled.

## Verification

- Banned-pattern grep on the diff hunks: clean.
- Re-measured in one call: `hidden-proxy.mjs verify
  dowaterdemon,randomize_gem_colors --base ea58ae969~1 --reach-all`
  → dowaterdemon vacuous (0 blocked, as logged) + smoke 24/24
  REACH-OK; randomize_gem_colors "0 PASS, 1 moved past, 0 unchanged,
  0 worse → PROGRESS" (Monk-94060 0→yn_function@220 ✓); reach
  677/678 with one `REGRESSED — error worker:` on
  explore-seed0360-wizard-world-tour-5dfef5c4. That regress is a
  worker-pool flake, not a code regression: solo replay at HEAD
  seconds later PASSES fully (RNG 121528/121528, screens 881/881,
  error null). The empty-message `worker:` crash at
  undefined/undefined under a 678-session parallel run vs a full
  PASS on identical code is dispositive. No Must-fix; recorded
  here so the flake is not re-litigated.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
