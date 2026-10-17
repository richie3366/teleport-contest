# Review 2885 — a9fdda84f — freed invoked artifacts revoke on death-drop + gamestate restore (D-4044)

- SHA: `a9fdda84f` (cliff, 1 C family: `drop_upon_death` + gamestate restore envelopes)
- D-entry: D-4044; Ledger: artifact.c / bones.c / nhlua.c
- `js/` diff: `js/do.js` +7/−1, `js/end.js` +6/−1 (2 envelope call
  sites + 1 import name); test
  `scripts/artifact-revoke-death-restore.test.mjs` (new, 2 tests)

## Intent vs deliverable

Promise: 3 kind=rng sessions diverge at artifact.c:2194 (C `rnz(100)`
+ «You float gently…» vs JS next-draw) because the `arti_invoke`
body is whole but its caller is missing — C's freeinv_core W_ART-off
re-invoke (invent.c:1383 → artifact.c:880–885) reached via
death-drops' obj_extract_self (×2) and gamestate restore's useupall
(×1). Diff adds the two envelope call sites in C order, dropx/zap
pattern verbatim. No new helpers or clones; one import name on an
existing edge. Promise = diff.

## Inventory

- `drop_upon_death` (js/end.js:1645–1655): changed — envelope added.
- `tutorial_leave_gamestate` restore loop (js/do.js:1157–1166):
  changed — envelope added.
- end.js:31 import: changed — `revoke_invoked_property` added.
  C: `bones.c:259–303` drop_upon_death, `invent.c:1355–1399`
  freeinv_core + `:1311–1317` useupall (ranges per `csym.mjs`),
  `artifact.c:880–885` revoke arm, `nhlua.c:1742–1743` restore loop,
  `mkobj.c:2556–2592` obj_extract_self — all verified in pinned
  source.

## C ↔ JS fidelity

Chain, verified call-for-call: bones.c:275 `obj_extract_self` →
OBJ_INVENT arm calls `freeinv` (mkobj.c verified) → `freeinv_core`
(invent.c:1407 verified) → oartifact arm
`set_artifact_intrinsic(obj, 0, W_ART)` (:1383 verified) →
artifact.c W_ART-off arm (`:880–885` verified: `inv_prop ≤
LAST_PROP` + W_ARTI extrinsic → `arti_invoke`). Restore path:
nhlua.c:1742–1743 `while (gi.invent) useupall(gi.invent)`
(verified) → useupall = setnotworn + freeinv + obfree
(:1311–1317 verified). JS placement matches C order in both
sites: end.js between extract (shift/OBJ_FREE) and the
`!mtmp || is_undead` obj_no_longer_held gate (bones.c:275 before
:279 ✓); do.js right after `useupall_gamestate` (setnotworn+extract;
obfree skipped per its pre-existing named note, RNG-silent here).
The callee is LIVE: `revoke_invoked_property` js/artifact.js:1196
ASYNC per `sym.mjs`, body ports the :880–885 predicates exactly
(oartifact, real oart, inv ≤ LAST_PROP, W_ARTI extrinsic, then
`arti_invoke`). do.js already imported it (:156) with a prior
envelope site (:2848); end.js joins the existing artifact.js edge —
`imports.mjs --can js/end.js js/artifact.js` → "ALREADY … No new
edge needed" (verbatim). Pattern matches the zap.js:5623 sibling.
No RNG in the envelope either side; the moved C draw (`rnz(100)`
levitation-float message) comes from the re-invoked toggle, as
claimed. No symbol deleted or re-pointed.

Named omissions (1)–(2) are the honest remainder: sync
useup/useupall can't await (Constitution §2.6), other freeinv_core
sync effects unobserved/RNG-silent. Named, not silent.

## Hallucinations / overclaim

None. `arti_invoke` explicitly not re-ported (whole per
D-2805/D-3407/D-3411, ledger ported-ok) — the D-log claims only the
caller wiring, and the per-session path evidence (matched drop draws
right before the divergence ×2; «Resetting time…» restore context
×1) makes the attribution measured.

## Density

Cliff-phase: one cause, two call sites, all 3 probes moved (one of
them +694 steps to s1048). New blockers named as next rows. Not a
no-op: `js/` + test + 3 moved. `Ledger` updated (3 files).

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify arti_invoke --base a9fdda84f~1 --no-reach`
  → `0 PASS, 3 moved past, 0 unchanged, 0 worse` — exact match,
  same sessions and steps (49956023 →look_here@484,
  49959107 →look_here@205, 50850040 →one_characteristic@1048).
  Non-vacuous (3 blocked).
- D-log Verify bullet: full `verify.mjs --fn` (syntax 2 files,
  rule2, hidden line, REACH 1/1, green + strict ×2, cohort 7/7,
  auto full 44/44 on shared-file change), focused test 2/2 —
  shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
