# Review 1449 — 86faaeed — mhitm_ad_legs whole-body port (D-2490)

Metadata: SHA `86faaeed`, `js/mhitm.js` +57 only. C `uhitm.c:4424–4489` (mhitm arm `:4482–4489`) + `monattk.h:59` (`AD_LEGS 17`). D-log: D-2490.

## Intent vs deliverable

Promise: mhitm mon→mon AD_LEGS arm + `mdamagem` dispatch, mirroring shipped were/heal; mhitu arm already live. Diff delivers exactly that: `AD_LEGS` const, `mhitm_ad_legs`, dispatch arm. Promise = deliverable.

## Inventory

- Added: `AD_LEGS = 17` (≡ `monattk.h:59`, verified), `export async function mhitm_ad_legs`, `mdamagem` AD_LEGS arm.
- `sym.mjs` (required): no deleted/re-pointed symbols (pure addition). Callees all same-module locals (`is_youmonst`, `mhitm_ad_phys`, knockback/grow_up/monkilled tails) — no new imports, no clones, no stubs. `mhitm_ad_legs_u` live in mhitu.js (single local, cited as the mhitu arm).

## C ↔ JS fidelity

mhitm arm branch-by-branch ≡ C `:4482–4489` (the third arm of `mhitm_ad_legs :4424–4489`):

```c
} else {
    /* mhitm */
    if (magr->mcan) {
        mhm->damage = 0;
        return;
    }
    mhitm_ad_phys(magr, mattk, mdef, mhm);
    if (mhm->done)
        return;
}
```

JS: `is_youmonst(mdef)` → return (deferred to live `mhitm_ad_legs_u`, same convention as shipped were/heal — shape verified identical below); `magr.mcan` → damage 0 + return; else `mhitm_ad_phys`. The post-phys `if (mhm->done) return` needs no separate statement — falling off the end leaves identical observable state and the caller checks `mhm.done`. Hero-as-attacker takes the default phys path like were/heal (C's uhitm arm `:4432–4444` is phys + a `#if 0`-dead cancel arm — no live behavior lost). `AD_LEGS = 17` verified at `monattk.h:59` (`#define AD_LEGS 17  /* damages legs (xan) */`).

Convention check — shipped `mhitm_ad_were` (`js/mhitm.js:1309`, D-2049):

```js
export async function mhitm_ad_were(magr, mattk, mdef, mhm) {
    if (is_youmonst(mdef)) return;
    await mhitm_ad_phys(magr, mattk, mdef, mhm);
}
```

legs adds only the `mcan` zeroing C's mhitm arm has (were/heal arms lack it in C too). Dispatch envelope diffed textually against the AD_HEAL arm: identical except the callee name (knockback preempt per `mhitm.c:1061–1065`, done check, leftover damage, lifesaved/grow_up tail). No RNG in the arm. Callee closure: all LIVE same-module locals, no OMITs needed beyond the map-kept poly-`body_part` name.

Required pastes:

```text
is_youmonst      NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
               js/do_name.js:122  js/mhitm.js:579  js/trap.js:1423
mhitm_ad_phys    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mhitm.js:1489
mhitm_ad_legs_u  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mhitu.js:2332
```

("clone" here = same-module locals matching C staticfn shape — the established convention, not drift; no new imports, no new edges.)

## Hallucinations / overclaim

None. "No new imports" and "identical 3-arm shape" both verified true.

## Density

Minimal whole-arm port, one file — correct size for the row.

## Verification

`hidden-proxy verify mhitm_ad_legs --base 86faaeed~1 --reach-all` (re-run here):

```text
verify mhitm_ad_legs: baseline 86faaeed~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
reach mhitm_ad_legs: 13 baseline-PASS session(s) reach it (13 run): 13 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated); reach 13/13 matches the D-log. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Placement note: the AD_LEGS dispatch arm sits directly before the AD_HEAL arm in `mdamagem`; C's `mhitm_adtyping` is a switch (order-free) and JS adtyp values are unique per arm, so if-chain order is immaterial.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
