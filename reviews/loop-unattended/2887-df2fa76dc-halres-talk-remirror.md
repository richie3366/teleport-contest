# Review 2887 — df2fa76dc — HALRES talk pline + resist-aware Hallu re-mirror (D-4046)

- SHA: `df2fa76dc` (cliff, 1 owner `make_hallucinated`, 2 writers:
  HALRES talk + timeout re-mirror)
- D-entry: D-4046; Ledger: artifact.c
- `js/` diff: `js/artifact.js` +52/−2 (new `halresTalk` +
  `halresConfers` + 1 import name), `js/wield.js` +12/−2 (2
  envelopes), `js/timeout.js` +5/−1 (resist-aware mirror),
  `js/potion.js` +1/−1 (export `hallucResisted`); test
  `scripts/halres-talk.test.mjs` (new, 2 tests)

## Intent vs deliverable

Promise: Healer wields Grayswandir at 289 with a hallu timeout
running — C queues «boring» behind the weld (289/290/291) while JS
printed nothing, shifting the RNG stream one step (JS-289 draws
C-290's values; JS-290 cum = C-291 cum exactly); second writer same
session: timeout.js re-mirrored `u.Hallucination` from the raw flat
without the resist check, re-hallucinating from 291 while C stays
false. Diff adds the talk-half envelope at ready_weapon's two sites
plus the resist-aware mirror. No clones; all names join existing
edges. Promise = diff.

## Inventory

- `halresTalk` (js/artifact.js:1236–1262) + `halresConfers`
  (:1207–1213): new — C talk half.
- `ready_weapon` bare-hands (:573–587) + equip (:630–644) sites:
  changed — envelopes.
- `nh_timeout` HALLUC mirror (js/timeout.js:1264–1272): changed —
  resist-aware.
- `hallucResisted` (js/potion.js:1172): changed — newly exported
  (body pre-existing).
  C: `artifact.c:788–796` HALRES arm, `potion.c:369–438`
  make_hallucinated, `worn.c:106→130` remove-before-equip,
  `wield.c:99–135` setuwep (range per `csym.mjs`),
  `youprop.h:120` Hallucination macro, `artilist.h:170`
  Grayswandir — all verified in pinned source.

## C ↔ JS fidelity

(a) Talk half. C artifact.c:788–796 verified: SPFX_HALRES calls
`make_hallucinated(!on, !restoring, wp_mask)`. C mask arm
(:385–392 verified): changed iff timeout runs; !xtime→boring
(cover arrives), xtime→cosmic (cover leaves); talk suppressed by
restoring (call site) and Unaware (:377–378 verified); verb
looks/feels on Blind (:382 verified). JS matches every gate:
restoring ✓, `Unaware()` (eat.js:477, same-edge import) ✓,
changed-OR identical to the sync arm ✓, removed→cosmic then
equipped→boring per worn.c remove(:106)→equip(:130) order
(verified) ✓, literals verbatim ✓. Awaited before the shine-stop
pline: C setuwep runs setworn at :106 before the shine pline at
:114–118 (verified) ✓. Promise-only-when-printing with
synchronously frozen values ✓ (verb/jobs computed before the
closure; flips never touch HHallucination). Grayswandir sole
HALRES (`grep -c` = 1) with cspfx 0 (:170 verified) justifies the
worn/wielded-only `halresConfers` and the dead addinv/freeinv
carrier note.

(b) Changed-arm split. The sync HALRES arm in
set_artifact_intrinsic (pre-existing, re-read :1084–1109) already
ports the mask flip + re-mirror + full changed refresh
(eatmupdate/see_monsters/see_objects/see_traps/update_inventory/
botl, C :414–436); halresTalk adds only the talk pline both
halves gate on the identical changed-OR — no double-print, no
missed refresh. Wield_tool/uwepgone/quiver/evaporate/do_name
carriers stay named (same call, unfired) — honest remainder.

(c) Timeout mirror. C `youprop.h:120` verified: `#define
Hallucination (HHallucination && !Halluc_resistance)` — the macro
is resist-aware. JS timeout.js now mirrors exactly that formula,
character-identical to the potion.js mask-arm (:1219) and else-arm
(:1237) mirrors (verified) via the pre-existing full-union
`hallucResisted` (H||E, flats + uprops). Direction correct: the
pre-fix mirror re-hallucinated a resisted runner every turn.

(d) Helpers: `halresConfers` is a C-predicate port (spfx &
SPFX_HALRES on a real oart), not a clone; no symbol deleted or
re-pointed (nothing to `sym.mjs` beyond noting).

## Hallucinations / overclaim

None. The one-step RNG shift is pinned to cum equality
(JS-290 = C-291 = 6264) and identical draw values, and the
second writer to the C macro — measured, not inferred.

## Density

Cliff-phase: one owner, two writers, same session — both required
for the 290→296 move (talk fixes the stream shift, mirror fixes
the bit from 291). One moved, 0 unchanged, 0 worse; new owner
named as next row. Not a no-op: `js/` + test + movement.
`Ledger` updated.

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify make_hallucinated --base df2fa76dc~1
  --no-reach` → `0 PASS, 1 moved past, 0 unchanged, 0 worse`
  (Healer-50556037 →moveloop_core@296, was 290) — exact match.
  Non-vacuous (1 blocked).
- D-log Verify bullet: focused test 0/2→2/2, full `verify.mjs
  --fn` (syntax 4 files, rule2, hidden line, REACH 24/24, green +
  strict ×2, cohort 7/7; full skipped per runner, no shared file)
  — shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
