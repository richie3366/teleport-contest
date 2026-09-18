# Review 1412 — 4a1a8b0f — domove_core missing arms (D-2453)

Metadata: SHA `4a1a8b0f`, 4 JS files (+286/−34: `cmd.js` domove arms,
`hack.js` 2 helpers, `steed.js` stucksteed, `do.js` one-word export).
Coverage MISSING → wired. D-log: D-2453.

## Intent vs deliverable

Promise: nine absent arms/wirings against C `hack.c:2711–2991`
(domove_core) into live `js/cmd.js domove`. Diff actually ships:
`air_turbulence`, `slippery_ice_fumbling`, `stucksteed` +
`helpless_steed` export, `reset_occupations` export, `earth_sense`,
`domove_attackmon_at` + displaceu swap arm, bhitpos, attack nomul
gate, end-of-move unhide/earth-sense/reset tail. One function family
(blind-move path), no second subsystem.

## Inventory

- New LIVE: `air_turbulence`, `slippery_ice_fumbling` (`hack.js`);
  `stucksteed` (`steed.js`); `earth_sense`, `domove_attackmon_at`
  (`cmd.js`). One-word exports: `helpless_steed`, `reset_occupations`.
- New static edges extend existing SCC edges only (`--can cmd.js
  mhitu.js`: ALREADY; hack→apply/mhitu call-time; all function-scope
  use, no TDZ read). No deleted symbols.

## C ↔ JS fidelity

Branch-by-branch confirm except debt item 1:
- `air_turbulence` (C `:2341–2361`): gate, `rn2(3)` triple
  (tumble+DEX/FALSE, You_cant, thin-air+DEX/TRUE), bare-return shape —
  exact.
- `slippery_ice_fumbling` (C `:2396–2415`): on-ice + snow-boots/
  resists_cold/Flying/floater-clinger-whirly exemptions,
  `Cold_resistance?rn2(3):rn2(2)`, `|=FROMOUTSIDE; &=~TIMEOUT; +=1`
  (JS parenthesization preserves the order), off-ice clear — exact.
- `stucksteed` (C `steed.c:878–895`): helpless→"won't move!",
  checkfeeding+meating→"still eating" — exact.
- `domove_attackmon_at` (C `:1954–1992`): known/forcefight/hider-eel
  gate, displacer `mndx`+`rn2(2)`+mux/muy==ux0/uy0+helpless/meating/
  mtrapped/utrap/ustuck/usteed+NODIAG-bad_rock diagonal veto+goodpos
  GP_ALLOW_U, attack-only-if-!displaceu — exact (`mndx` identity and
  NODIAG≡grid-bug per named precedent).
- Head wiring (`:2739–2799`): air→ice order, bhitpos `:2782`,
  nomul `:2791`, bump `:2794`, attack `:2798` — exact.
- Swap arm (C `:2886–2908`): noticed_it, place-by-coords, both
  newsyms, mux/muy, Something/YMonnam pline, map_invisible,
  mon_moving+minliquid→mintrap — exact modulo the pre-existing
  mx/my occupancy shape (named).
- Tail: `u.uundetected=0` + `earth_sense()` replicate C `u_on_newpos`
  arms (verified in `dungeon.c`), `reset_occupations()` = C `:2936` —
  exact. `earth_sense` body (C `:1548–1565`) exact.

## Hallucinations / overclaim

Small: the commit message cites `:2273`/`:2300` for air/ice (actual
`:2341`/`:2396` — the JS doc comments cite correctly, so this is a
message-only slip). "Converges the next turn" for the middle-skip
overstates: a middle early-return drops the swap rather than delaying
it (see debt item).

## Density

One C function family, ~280 insertions, whole-arm coverage: right-sized
breadth iteration.

## Verification

- `imports.mjs --rulecheck`: clean (global, this review).
- `hidden-proxy verify domove_core --base 4a1a8b0f~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24,
  0 regressed → REACH-OK. Matches. Full 44/44 D-log-reported.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

1. (Debt, map-named — no Must-fix) `if (!displaceu)` middle-skip
   (C `:2802–2858`): on displaceu turns JS still runs
   ironbars/web/empty/unmap/stucksteed/u_rooted/Paranoid/utrap/
   test_move/swim, exposing extra side-effects/RNG and letting a
   middle early-return swallow the swap C `:2886` would perform.
   Named in the commit + `c-js-map/turns.md` D-2453 line ("displaceu
   middle-skip"). Trigger needs a tracking displacer + `rn2(2)`;
   0 corpus reach. Next touch of `domove` should hoist the swap
   decision above the middle per C `:2802`.

Verdict: **ACCEPT-WITH-DEBT**
