# Review 1041 — 357757d9 — mhitm_ad_corr mhitu arm (D-2071)

## Metadata

- SHA: `357757d9` — `uhitm.c mhitm_ad_corr mhitu arm never ported: black-pudding AD_CORR fell into mhitm_adtyping_u default, so JS drew knockback rn2(3) where C drew erode_armor rn2(5) (queue owner erode_armor) (D-2071).`
- JS diff: `js/mhitu.js` +26/−3 (local `AD_CORR`, `mhitm_ad_corr_u`, `case AD_CORR`, doc-list touch-ups, `ERODE_CORRODE` import).
- Docs: D-2071 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1041.

## Intent vs deliverable

Subject promises: the black-pudding AD_CORR mhitu arm now routes to
`erode_armor` (rn2(5)) instead of the `mhitm_knockback` default
(rn2(3)). Diff actually adds exactly that: one file-local handler +
one dispatch case + import. Promise == diff.

## Inventory

- New file-local fn: `mhitm_ad_corr_u` (js/mhitu.js:2307, per `sym.mjs` — sole clone, no drift).
- Changed: `case AD_CORR` in `mhitm_adtyping_u`; rust-arm doc narrowed CORR→DCAY; `ERODE_CORRODE` joins the existing `./const.js` import (no new module edge).
- No deleted symbols (no `sym.mjs` re-point check owed beyond the import, which resolves: `ERODE_CORRODE` is `js/const.js:2488` sync export; `erode_armor` is `js/mhitm.js:1703` async — the `await` is present).
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads, no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `mhitm_ad_corr` (`uhitm.c:2337–2360`, via `csym.mjs`): three arms
keyed on `magr`/`mdef` vs `&gy.youmonst`. The mhitu arm (`:2346–2351`)
is `hitmsg(magr, mattk); if (magr->mcan) return;
erode_armor(mdef, ERODE_CORRODE);` — notably it does NOT zero
`mhm->damage` (unlike the uhitm/mhitm arms). JS mirrors arm-for-arm:
`await hitmsg(mtmp, mattk)` always; `if (mtmp.mcan) return` (mtmp is
the attacker here, correct operand); `await
erode_armor(game.youmonst, ERODE_CORRODE)`; `void mhm`. The kept base
`hitmu d()` matches C's non-zeroed damage. Callee closure: `hitmsg`
and `erode_armor` both LIVE (same call shape as the adjacent
`mhitm_ad_rust_u`), zero RNG in the arm itself. Branch-by-branch
confirm — no divergence.

Named omits are precise: uhitm arm (`:2342–2345`) and mhitm arm
(`:2352–2359`, `STRAT_WAITFORU` + damage zero) stay map-named; whole
`mhitm_ad_dcay` (`:2363–2402`) deferred with the no-blocked-session
citation; passive `!rn2(30)` corroder wiring is a pre-existing defer.

## Hallucinations / overclaim

None. «No new module edge» verified true (both names resolve to live
exports on already-imported modules). The dispatch-vs-callee shape is
sound: the newly ported dispatch arm calls only LIVE callees.

## Density

26 insertions for one 6-line C arm + dispatch. Below the ~40
guideline, but C is that small — the arm is the whole C locus family
reached by these two sessions, and the sibling-arm cadence (RUST, then
CORR, then STUN/SAMU) tracks one queue row per arm with its own
falsifier. Acceptable.

## Verification

D-log Verify bullet: `verify --fn erode_armor` → `0 PASS, 2 moved
past` (Knight-92185 74→collect_coords@77; Tourist-92044 re-attributed
at step 106 to screen-first do_statusline2, RNG 3544/3544) + green +
strict + cohort 7/7, no full suite (mhitu.js not shared). Re-measured
myself: `hidden-proxy.mjs verify erode_armor --base 357757d9~1` →
`0 PASS, 2 moved past (1 re-attributed at the same step), 0
unchanged, 0 worse → PROGRESS` with both moves identical to the
claim. No WORSE, no vacuous check (2 baseline sessions, both named).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
