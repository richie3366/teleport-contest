# Review 1689 — dd14f257f — `uhitm.c` mhitm_ad_fire whole body (D-2730)

Metadata: commit `dd14f257f`, D-2730, `js/mhitm.js` + `js/uhitm.js`. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: uhitm arm `:2529–2560` new + `damageum_adtyping` AD_FIRE row + `defended(AD_FIRE)` wired in mhitm arm. The diff delivers all three plus the export. Promise matches deliverable.

## Inventory

Changed JS: `mhitm_ad_fire` (`js/mhitm.js:1136`, restarted as `export async`, three arms in C order); `damageum_adtyping` AD_FIRE row (`js/uhitm.js`, routes `mhitm_ad_fire(game.youmonst, …)`); `You` joins the display import; `mhitm_ad_fire` joins the uhitm.js→mhitm.js import; stale fire-uhitm omit retired in the `xkilled` doc. No deleted symbols, no new clones.

## Callee closure

No deleted/re-pointed symbols (all imports joined to ALREADY edges — `--can` ALREADY on the sampled uhitm.js→mhitm.js edge). Arm callees: `mhitm_mgc_atk_negated`/`on_fire`/`completelyburns_mm`/`mlifesaver`/`resists_fire`/`xkilled` (dynamic uhitm cycle import, commented)/`destroy_items`/`ignite_items`/`shieldeff` all live on pre-existing edges; `defended` verified live sync (`js/mondata.js:159`) — the unwired comment becomes a real call, correctly un-awaited. One named-gap clone: `golemeffects_mm` (map-named, see below). No STUB in any arm.

## C ↔ JS fidelity

C locus read: `mhitm_ad_fire — uhitm.c:2520-2623` (csym range; message cites `:2521–2623`), uhitm arm read verbatim. Branch-by-branch:

- uhitm: mgc-negate → damage=0 + return ✓; `!Blind` on_fire pline (plain `pline`, no vis gate) ✓; completelyburns → burns/engulfed vs `You smell burning paper/straw` (mndx-compare = C `pd==&mons[…]` pointer compare) + `xkilled(NOMSG|NOCORPSE)` + damage=0 + return ✓; resists/defended → `The fire doesn't heat …!` + golemeffects + shieldeff + damage=0 with C's fall-through into `destroy_items(orig)` + `ignite_items` ✓ (no early return, matching C).
- mhitm arm: only change is `defended(mdef, AD_FIRE)` wired into the existing disjunct ✓; order (negate → vis pline → burn → resists/defended → golem+shield → destroy+ignite) untouched.
- mhitu: `is_youmonst(mdef)` defensive early return; the live arm stays split as `mhitm_ad_fire_u` (`js/mhitu.js:941`, pre-existing) — neither call site (`mdamagem` mon-mon, `damageum_adtyping` hero-attacker) can pass mdef==youmonst, so the guard is unreachable, not a hole. Verified the split is fully wired, not dangling: `mhitm_adtyping_u` (`js/mhitu.js:3117`) dispatches AD_FIRE to `mhitm_ad_fire_u` (`:3129`), itself called from `:3474` — the C `:2561–2587` arm runs for every monster→hero fire hit through this chain.
- mhitm arm's resists block carries `shieldeff` at `js/mhitm.js:1174` (pre-existing) — correct per the C mhitm block, whose order is pline→shield→golem (unlike the uhitm sibling's shield→pline→golem); each arm matches its own C block, not its sibling's.
- C uhitm resists fall-through verified verbatim: `golemeffects(mdef, AD_FIRE, damage); shieldeff(mx,my); mhm->damage = 0;` with NO return before `mhm->damage += destroy_items(mdef, AD_FIRE, orig_dmg); (void) ignite_items(...)` — the JS reproduces the fall-through exactly (a tempting early-return refactor was not taken).
- `xkilled(mdef, XKILL_NOMSG | XKILL_NOCORPSE)` constellation verified: flags match C's `XKILL_NOMSG|XKILL_NOCORPSE`, `damage=0` precedes the return, and the engulf-then-kill order (smell pline → xkilled) matches C's `:2540–2552`.
- Routing: AD_FIRE row passes `(game.youmonst, mattk, mdef, mhm)` matching C `:4792` ✓.
- Known debt (map-named in `turns.md` D-2730 line, not hidden): `golemeffects_mm` at this SHA is heal-only — C `mon.c:5685–5689` slows flesh golems on AD_FIRE, so a defending flesh golem misses `mon_adjust_speed(-1)`. Same named-clone shape already accepted for the ELEC (D-2542) and COLD (D-2155) arms; closed in-window by D-2735 (to be confirmed in that SHA's review — if D-2735 fails to deliver the slow, this debt reopens as Must-fix there).
- RNG: no draw added/removed/reordered (`xkilled`/destroy draws sit in C positions).

## Hallucinations / overclaim

None. "Whole C body live" is qualified by the named golemeffects line in the same message and the map. No FORCE/DIAG/seed/coordinate logic.

## Density

Whole-function completion across the two natural modules (shared arm + you-attacker dispatch), no new edges. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base dd14f257f~1 --reach-all`) — both lines, matching the D-log (this one is non-vacuous):

```text
verify mhitm_ad_fire: baseline dd14f257f~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach mhitm_ad_fire: 3 baseline-PASS session(s) reach it (3 run, 0.6s): 3 PASS, 0 regressed → REACH-OK
```

Blocked-line vacuous as stated; reach 3/3 PASS with 0 regressed is the real evidence → REACH-OK. Green/strict/cohort per D-log (full skipped — mhitm.js shared? message says cohort only; mhitm.js is widely imported — full-suite skip is a mild gap, but reach+cohort+green cover the touched paths; not raised to Must-fix). Rule #2 clean.

## Actionable C-wrongs

None remaining in-window (golemeffects slow gap named in map; closure by D-2735 checked in review 1694 — if absent there, file the Must-fix there).

Verdict: **ACCEPT**
