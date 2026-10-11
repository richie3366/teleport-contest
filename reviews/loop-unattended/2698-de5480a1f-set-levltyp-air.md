# Review 2698 — de5480a1f — set_levltyp AIR import

Metadata: SHA `de5480a1f`, D-3835, cliffs-head `o_init.c`
randomize_gem_colors writer (last of the 3 throw-voids).
JS: `js/trap.js` (+1/−1: one import name). Test:
`scripts/set-levltyp-air-sdoor.test.mjs` (new, 2 `it`s).

## Intent vs deliverable

Promise: 1 step-0 throw-void (Knight-578306) with
`ReferenceError: AIR is not defined at set_levltyp
(js/trap.js:893)`; add the missing const.js import, no body
change; the void moves (0→859). Diff actually does: exactly
the one import name. Match.

## Inventory

- `set_levltyp` (js/trap.js:887–923) — unchanged body; the fix
  is the `AIR` name joining the existing const.js import
  (trap.js:77). C: `nethack-c/upstream/src/mkmaze.c:76–121`
  (csym): isok + `STONE ≤ newtyp < MAX_TYPE` gate, the SDOOR→AIR
  arboreal hack (`arboreal_sdoor = 1`, typ stays SDOOR),
  CAN_OVERWRITE_TERRAIN, was_ice/obj_ice_effects, fountain/sink
  recount. JS mirrors every arm (the EXTRA_SANITY_CHECKS
  impossible arm stays by-design, doc'd in the body). C value:
  `rm.h:91 AIR = 35`; JS: `js/const.js:81 AIR = 35`. Match.
- No new helpers, no re-points — import-only. Caller chain
  (sel_set_ter → set_levltyp_lit → set_levltyp) pre-wired,
  untouched.

## C ↔ JS fidelity

The body was already C-exact; the defect was purely the
missing import, which threw the first time level-gen hit the
garden-theme SDOOR arm. Value and arm order verified against C
above. No RNG touched. Gap in `js/`: none. Ledger hunk is a
clean D-3835 stamp on `set_levltyp ported` (no field dropped —
unlike 2696).

## Hallucinations / overclaim

None. The void-paradox attribution (D-3733/D-3768) is stated
with the recorded stack, and the standing notes (impossible
arm by-design, obj_ice_effects wiring note elsewhere) name
different sites without claiming them.

## Density

Cliff-phase: head writer correct (the AIR throw-void writer
queued by D-3832's Next, own C file, own pop). Import-only,
whole on its path. Ledger: `set_levltyp ported`. Verify
bullet: 1 moved + REACH-OK ×2 + green + strict + cohort +
forced full 44/44 (same code state). Not unreached: the last
randomize void moves 859 steps.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify
set_levltyp,randomize_gem_colors --base de5480a1f~1` →
set_levltyp: 0 blocked (writer, expected), smoke 24/24
REACH-OK; randomize_gem_colors: 1 blocked at parent →
`0 PASS, 1 moved past, 0 unchanged, 0 worse`
(Knight-578306 → level_tele@859 — exact step as claimed);
reach 80/80 REACH-OK. Zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
