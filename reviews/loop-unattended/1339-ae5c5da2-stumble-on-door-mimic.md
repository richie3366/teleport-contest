# Review 1339 — ae5c5da2 — lock.c stumble_on_door_mimic shared door-mimic + 3 call sites

- SHA: `ae5c5da2`, D-2373. JS files: `js/lock.js` (+helper, 2 wires), `js/trap.js` (doorway wire).
- Prior reviews closed: none (fresh Open row; last audit ended at 1338/12cae556).

## Intent vs deliverable

Subject promises: shared `stumble_on_door_mimic` + 3 call-site wires (D-2373).
Diff actually adds: exported async `stumble_on_door_mimic(x, y)` (`js/lock.js:636`),
local `Protection_from_shape_changers()` (`js/lock.js:618`), wires in
`doopen_indir` (`:691`), `doclose` (`:899`), untrap doorway (`js/trap.js:7027-7028`
via lazy import). Matches the promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `stumble_on_door_mimic` (lock.js:636) | C callee port (lock.c:758–769) | LIVE, exported async |
| `Protection_from_shape_changers` (lock.js:618) | local clone of `were.js:57` export | **CLONE — diverges, see C-wrong 1** |
| `stumble_onto_mimic` | pre-existing import (lock.js:40, from uhitm.js) | LIVE |
| `m_at`, `M_AP_TYPE`, `S_hcdoor`, `S_vcdoor` | pre-existing imports (lock.js:17–18, mon.js) | LIVE |

`node scripts/sym.mjs stumble_on_door_mimic` → `js/lock.js:636 ASYNC — await required`.
`sym.mjs Protection_from_shape_changers` → export at `js/were.js:57` **plus 4 local
clones in 4 files** ("IMPORT the export; do NOT add another") — this commit adds the 5th.

## C ↔ JS fidelity

C body (`node scripts/csym.mjs stumble_on_door_mimic` → `lock.c:758–769`, 12 lines):
`m_at` + `is_door_mappear` + `!Protection_from_shape_changers` → `stumble_onto_mimic`, TRUE/FALSE.
`is_door_mappear` (`monst.h:240–242`) is exactly `M_AP_FURNITURE` + hcdoor/vcdoor —
JS `:638–640` matches arm-for-arm. Predicate draws no RNG either side; async wrapper is
display-plumbing only. Callers (`csym --callers`): `lock.c:820`, `lock.c:987`,
`trap.c:6026` — all three wired, each in exact C order (pit-reach→mimic→Confusion;
!isok→mimic→Confusion; box-loop→mimic→IS_DOOR). Confirmed against C text above.
`pick_lock :571` exclusion is correct: C inlines the predicate ungated there with a
`maybe_absorb_item` tail — different arm, rightly kept separate.

C-wrong: the local `Protection_from_shape_changers()` reads **flats only**
(`H…|0 || E…|0 || sticky`), while C `youprop.h:355–360` is `H || E` ≡
`u.uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic || .extrinsic`. The flats-only read is
exact only if every uprops writer mirrors the flats. It does not: C `worn.c:96–123`
(`setworn`) sets `u.uprops[p].extrinsic |= mask` generically, and the ring
`RIN_PROTECTION_FROM_SHAPE_CHAN` has `oc_oprop = PROT_FROM_SHAPE_CHANGERS`
(`objects.h:826`). JS mirrors that write (`setworn` → `confer_oc_oprop`,
`js/do_wear.js:546–581`), but `confer_oc_oprop` mirrors E flats for only 5 props
(BLINDED/FAST/TELEPAT/STEALTH/LEVITATION — `js/do_wear.js:349–376`), **not** this one;
no `set_extrinsic_bit(PROT_FROM_SHAPE_CHANGERS, …)` caller exists, and zero
`EProtection_from_shape_changers =` writers exist in `js/`. So with the ring worn:
C protected → no stumble (FALSE); JS clone unprotected → `stumble_onto_mimic` +
returns TRUE (ECMD_TIME/1). Wrong message, wrong return, at all three call sites.
The live export (`js/were.js:57–64`, flats + `uprops[].intrinsic/extrinsic`, same
shape as `display.js:994` and `mon.js:3013` clones) reads this state correctly.
`node scripts/imports.mjs --can lock.js were.js Protection_from_shape_changers` →
**SAFE** ("every name requested is a hoisted function declaration … Cite this
instead of a clone"). The clone was gratuitous, not cycle-forced.

## Hallucinations / overclaim

D-log Verify bullet claims only green/cohort + "note hidden (0 blocked … NOT a corpus
PASS)" — honest, no PASS claimed for a dispatch-with-stub (callee `stumble_onto_mimic`
is live, not a stub). The "no new static edge / no TDZ" claim checks out (lazy import
in trap.js; lock.js→trap.js statics are runtime-used only). No hallucination. One
soft overclaim: "(macro, not a clone)" on the local helper — it *is* a clone by the
audit's definition, and an inexact one.

## Density

~50 js/ insertions for one C function + 3 wires: right-sized (§2b). Lazy import to
dodge the lock↔trap static edge is proportionate and verified IN-SCC/runtime-only.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (this review).
- Diff grep `FORCE|DIAG|getRngLog|fastforward` → 0 hits.
- Re-measured: `node scripts/hidden-proxy.mjs verify stumble_on_door_mimic
  --base ae5c5da2~1` → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)". Row cited 0 blocks → vacuous check correctly labeled, no --base owed.
  No REJECT-shaped (seed/step/coordinate) reads in the diff.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log (not re-run; narrow predicate-only
  change with no RNG surface — D-log evidence accepted).

## Actionable C-wrongs

1. **Flats-only `Protection_from_shape_changers` clone drops the uprops extrinsic arm.**
   Wearing a ring of protection from shape changers sets
   `uprops[PROT_FROM_SHAPE_CHANGERS].extrinsic` (C `worn.c:96–123` via `objects.h:826`;
   JS `do_wear.js:581` via `confer_oc_oprop`) with no E-flat mirror, so the clone
   stumbles where C returns FALSE. Fix (one port iter): delete the `js/lock.js:618`
   local and import the `js/were.js:57` export (imports.mjs verdict SAFE, hoisted
   function declaration). Falsifier: wear the ring, open toward a door mimic —
   C FALSE vs JS TRUE.

Verdict: **QUALITY-RISK**

**Addressed:** D-2380
