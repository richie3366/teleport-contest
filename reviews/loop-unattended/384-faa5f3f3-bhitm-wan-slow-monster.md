# Review 384 — faa5f3f3 — zap.c bhitm WAN_SLOW_MONSTER (D-1424)

## Metadata
- Full / short hash: `faa5f3f3cdde0dd9395d650e766f826346df1dd5` / `faa5f3f3`
- Parent: `1200fdb0` (D-1423). This file audits **this SHA only** (second of nine `js/` commits since review **382**). Archive **Addressed:** D-1424 `faa5f3f3` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 00:25:24 +0200
- D-id: **D-1424**
- Stats: 10 files, +127 / −29 — `js/zap.js` +43 / −5 (docs the rest).
- Claims to close: Open `zap.c` `bhitm` WAN_SLOW_MONSTER (named from D-1422 / review **382**). Not locking. `reviews/loop-2026-08-15/` has no unpaid slow-monster Must-fix.
- JS / map: `zap.js` `bhitm`; callee `muse.js` `mon_adjust_speed` (D-0871); `worn.js` `check_gear_next_turn`; `mhitu.js` `expels`. `c-js-map/turns.md`. zapyourself WAN_SLOW / WAN_LOCKING / WAN_PROBING still named at this SHA.
- Prior reviews this SHA claims to close: **382** named WAN_SLOW (whirly expels) as the follow-up omit.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhitm WAN_SLOW_MONSTER so a monster-aimed slow wand calls mon_adjust_speed(-1) (and whirly expels) instead of doing nothing.”

C `zap.c` `bhitm` `:218–232`:

```
    case WAN_SLOW_MONSTER:
    case SPE_SLOW_MONSTER:
        if (!resist(mtmp, otmp->oclass, 0, NOTELL)) {
            if (disguised_mimic)
                seemimic(mtmp);
            mon_adjust_speed(mtmp, -1, otmp);
            check_gear_next_turn(mtmp);
            if (engulfing_u(mtmp) && is_whirly(mtmp->data)) {
                You("disrupt %s!", mon_nam(mtmp));
                pline("A huge hole opens up...");
                expels(mtmp, mtmp->data, TRUE);
            }
        }
        break;
```

Unlike WAN_SPEED `:240–241`, there is **no** `helpful_gesture = TRUE`, so later `wakeup(mtmp, !helpful_gesture)` can anger a peaceful target. Callee `worn.c` `mon_adjust_speed` `:510–515` switch `adjust==-1`: `permspeed==MFAST` → 0 else `MSLOW`; worn FAST boots force `mspeed`; seen mobile unsleeping pline `"moving %sslower"` + `learnwand(obj)`. `check_gear_next_turn` is `mon.c` `:5915–5918` (`misc_worn_check |= I_SPECIAL`). `zap_steed` `:3124–3132` default-routes this otyp through `bhitm`. Self-zap `:2868–2873` is `u_slow_down` when `HFast & (TIMEOUT|INTRINSIC)` — a different function.

Old JS: WAN_SLOW / SPE_SLOW hit `default` (no slow, no expel, `wakeup(..., true)` already angered but never slowed).

The diff **does** add both otyps, dynamic-import live `mon_adjust_speed(-1)`, call live `check_gear_next_turn`, whirly `engulfing_u` + `is_whirly` + `expels(..., true)`. It **does not** set `helpful_gesture`. It **does not** port zapyourself WAN_SLOW / WAN_LOCKING. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhitm` WAN_SLOW / SPE_SLOW | C `:218–232`, **wired** | |
| `resist(..., NOTELL)` | C `zap.c`, **imported live** | |
| `seemimic` | C `mon.c`, **imported live** | |
| `mon_adjust_speed(mtmp,-1,otmp)` | C `worn.c:488–564`, **imported live** | muse.js D-0871; not a local clone |
| `check_gear_next_turn` | C `mon.c:5915–5918`, **imported live** | `I_SPECIAL` |
| `engulfing_u` | C `hack.h`, **imported live** | `uswallow && ustuck===mon` |
| `is_whirly` | C `mondata.h:57–58`, **imported live** | S_VORTEX or air elemental |
| `expels` | C `mhitu.c:264–306`, **C callee live, tail named** | unstuck+mnexto; `spoteffects`/`um_dist` deferred |
| `You` / `mon_nam` | C, **wired** | local `You` prefixes `"You "` |
| `helpful_gesture` | C, **correctly unset** | can anger |
| zapyourself WAN_SLOW | C `:2868–2873`, **named omit** | `u_slow_down` |
| WAN_LOCKING / probing | C siblings, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `resist` `rn2(100+alev-dlev)` (wand alev 12). `mon_adjust_speed` itself has no extra dice; `learnwand` is observation. Public fortress never zaps a monster with a slow wand.

## C ↔ JS fidelity

Case sits immediately before WAN_SPEED, matching C order. Resist-then-seemimic-then-adjust(-1)-then-gear-then-whirly matches `:220–231` call-for-call. No `helpful_gesture` assignment in this arm: `wakeup(mtmp, true)` can anger. Match the contrast with D-1422. SPE_SLOW shares the case. Match `:218–219`.

`mon_adjust_speed(-1)` is the D-0871 body, not a no-op: MFAST→0 else MSLOW; SPEED_BOOTS keep `mspeed` MFAST (C tests `oc_oprop==FAST`; only FAST armor in 3.7 is speed boots — same D-0871 named note). Seen unsleeping slower-pline + `learnwand(obj)`. `check_gear_next_turn` is `misc_worn_check |= I_SPECIAL` — match `:5915–5918`.

Whirly: `engulfing_u` is `uswallow && ustuck===mon` (`const.js:2984` ≡ C). `is_whirly` is vortex letter or `PM_AIR_ELEMENTAL` (`monsters.js:469–473` ≡ `mondata.h:57–58`; JS `mlet==='S_VORTEX'` matches generated data). Messages `"disrupt …!"` / `"A huge hole opens up..."` match C `You`/`pline`. `expels(mtmp, mtmp.data, true)` is the live `mhitu.js` export: `botl`, digest/enfold/whirly blast pline, `unstuck`, `mnexto(RLOC_NOMSG)`, `newsym`. C `:303–305` `um_dist` land-hard pline and `spoteffects(TRUE)` are still deferred in that callee (pre-existing comment). Hero **does** leave the whirly. That is not a dispatch-stub. The landing trap/pool is a named omit of the callee tail, not a C-wrong on `permspeed`/`mspeed`/`I_SPECIAL`/anger.

Hallucination check: “Match C `mon_adjust_speed(-1)` / whirly `expels`” while **both callees are the live worn.c / mhitu.c bodies** is not a dispatch-stub lie. “Match C `zapyourself` `u_slow_down`” **would** be. Do **not** stamp “Match C `zap_steed` wrapper” (named; C still calls this `bhitm`). Do **not** stamp “Match C `spoteffects` after expel.”

## Hallucinations / overclaim

Subject says a monster-aimed slow wand calls `mon_adjust_speed(-1)` and whirly expels instead of doing nothing. **True:** resist miss → `permspeed`/`mspeed`/`I_SPECIAL`/possible `learnwand`; whirly swallow → disrupt + hole + `unstuck`/`mnexto`. **True that peaceful targets can be angered** (no `helpful_gesture`). **True that SPE_SLOW shares the arm.** **False until named for self-zap `u_slow_down` and locking.** Stamping **Addressed:** D-1424 for `:218–232` is fair. Do **not** treat fortress PASS as a slow-wand zap.

## Density

One C `bhitm` case wiring three already-ported callees. ~30 lines of JS. Playbook §2b allows a thin dispatch when the callees are live. Did not glue WAN_LOCKING. Right size for this otyp.

## Branch-by-branch confirm

1. Not resisted, permspeed 0: → MSLOW; seen unsleeping slower-pline + `learnwand`; `I_SPECIAL`; angered wakeup. Match.
2. Already MSLOW: silent (mspeed unchanged); still `I_SPECIAL` + anger. Match.
3. MFAST: → 0 (normal), not MSLOW. Match adjust -1.
4. Speed boots: `mspeed` stays MFAST; no learn if oldspeed==mspeed. Match.
5. Asleep: skip pline/learn (`msleeping`). Match.
6. Resist: no `mon_adjust_speed`; no expel; still `wake` true (can anger). Match.
7. Mimic: `seemimic` before adjust. Match.
8. Whirly engulfer: disrupt + hole + `expels`. Match keep-path; `spoteffects` named.
9. Non-whirly swallow: no disrupt (C requires `is_whirly`). Match.
10. SPE_SLOW same arm. Match.
11. WAN_SPEED still `helpful_gesture`. Regression-safe.
12. zapyourself WAN_SLOW still default. Named.
13. WAN_LOCKING still default at this SHA. Named.
14. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. The only new dice is existing `resist` `rn2`, not a recorded index. Dynamic `import('./muse.js')` is the same cycle break as D-1422. Plain ESM.

## Verification

Journal: private canary **15**/15 (C/JS grep; Rule #2; IMMEDIATE wand; 0→MSLOW pline+learn+I_SPECIAL+anger; already MSLOW silent; asleep skips learn; MFAST→0 not MSLOW; resist no speed but angered; boots keep MFAST no learn; mimic seemimic; SPE_SLOW same arm; WAN_LOCKING still default; WAN_SPEED still peaceful; zapyourself WAN_SLOW still default); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a slow wand.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Resist / seemimic / `mon_adjust_speed(-1)` / `I_SPECIAL` / no-`helpful_gesture` / whirly `expels` match `:218–232`. Callees are live C functions, not clones that contradict C.

Named omits (map / Open, not Must-fix):

1. `zapyourself` WAN_SLOW / `u_slow_down` (`:2868–2873`)
2. `bhitm` WAN_LOCKING / WAN_PROBING
3. `zap_steed` wrapper (C still hits this case)
4. `expels` `um_dist` land-hard + `spoteffects(TRUE)`
5. `mon_adjust_speed` `oc_oprop==FAST` vs SPEED_BOOTS otyp (D-0871)

Do not Must-fix “slow should set `helpful_gesture`” (C does not). Do not Must-fix “self-zap should use `mon_adjust_speed`” (C `zapyourself` is `u_slow_down`). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: IMMEDIATE `weffects` → `bhit` → `bhitm`; `zap_steed`. New RNG: `resist` only. Public fortress does not zap monsters with this wand.

Verdict: **ACCEPT-WITH-DEBT**
