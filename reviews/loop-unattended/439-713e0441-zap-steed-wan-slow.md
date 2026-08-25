# Review 439 — 713e0441 — zap.c zap_steed WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm (D-1478)

## Metadata
- Full / short hash: `713e0441b633899ac762efd0b34e265efc86fcd5` / `713e0441`
- Parent: `c3f67016` (D-1477). This file audits **this SHA only** (third of nine `js/` commits since review **436**). Archive **Addressed:** D-1478 `713e0441` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 14:56:29 +0200
- D-id: **D-1478**
- Stats: 9 files, +108 / −30 — `js/zap.js` +29 / −7.
- Claims to close: Open `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm (named from D-1474 / review **435**). Not STRIKING. `reviews/loop-2026-08-15/` has no unpaid steed-slow Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` WAN/SPE_SLOW (D-1424). Caller `weffects` `:3437–3439`. `c-js-map/turns.md`. Remaining speed / SPE_CURE_SICKNESS named.
- Prior reviews this SHA claims to close: **435** named remaining bhitm-routed slow after STRIKING; **411** named `zap_steed` SPE_SLOW after wand-duplicate.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm so a downward slow wand or slow-monster spell while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3124–3125` in the `:3115–3134` bhitm group. Caller `weffects` `:3437–3439` disclose + skip `zap_updown` when `oc_dir != NODIR`. Callee `bhitm` `:218–232` (D-1424): `!resist` NOTELL then `seemimic` + `mon_adjust_speed(mtmp,-1,otmp)` + `check_gear_next_turn`; whirly engulfer `expels`; **no** `helpful_gesture` (speed has it). High-mr resist still discloses via weffects. SPBOOK skips `makeknown`.

Old JS: SLOW defaulted `zap_steed` false → `zap_updown`. `bhitm` slow already live for lateral zaps / SPE_SLOW weffects (D-1451).

The diff **does** add `case WAN_SLOW_MONSTER: case SPE_SLOW_MONSTER:` to the existing `bhitm(steed)` group. It **does not** change `bhitm` slow bodies (comment only). It **does not** add speed/CURE_SICKNESS. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN/SPE_SLOW arm | C `:3124–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | |
| `bhitm` WAN_SLOW/SPE_SLOW | C `:218–232`, **imported live** (D-1424) | |
| `resist` NOTELL | C `zap.c` `resist`, **imported live** | |
| `mon_adjust_speed` | C `worn.c` / JS `muse.js` (D-0871), **imported live** | |
| `check_gear_next_turn` | C `worn.c`, **imported live** | |
| `expels` whirly | C `:226–229`, **imported live** | land-hard named on callee |
| `helpful_gesture` | C speed-only `:241`, **correctly absent** | |
| remaining `zap_steed` bhitm otyps | C `:3126–3128`, **named omit** | speed / CURE |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** riding-down slow now reaches `resist` (`rn2` MR). `mon_adjust_speed(-1)` may consume further dice (pre-existing callee). Public fortress does not zap slow while mounted.

## C ↔ JS fidelity

`zap_steed` SLOW now `bhitm` then `steedhit=true`. Match `:3124–3134`. **Callee is not a stub:** `resist` NOTELL, `mon_adjust_speed(-1)`, gear flag, whirly `expels`. Hallucination check: “Match C via bhitm” while **D-1424 `bhitm` slow is live** is **not** a dispatch-stub lie.

Pinned C (SLOW is in the same `bhitm` group as STRIKING; riding-down must **not** take `zap_updown`):

```3115:3134:nethack-c/upstream/src/zap.c
    case WAN_STRIKING:
    case SPE_FORCE_BOLT:
    case WAN_SLOW_MONSTER:
    case SPE_SLOW_MONSTER:
    case WAN_SPEED_MONSTER:
    // ... HEALING / DRAIN / OPENING ...
        (void) bhitm(u.usteed, obj);
        steedhit = TRUE;
```

Callee (this SHA does **not** rewrite; D-1424 already shipped):

```218:232:nethack-c/upstream/src/zap.c
    case WAN_SLOW_MONSTER:
    case SPE_SLOW_MONSTER:
        if (!resist(mtmp, otmp->oclass, 0, NOTELL)) {
            // seemimic; mon_adjust_speed(-1); check_gear_next_turn
            // whirly engulfing_u → expels
        }
```

JS `bhitm` `:3749–3770` copies that order. No `helpful_gesture` on slow (speed sets it; not this SHA). `weffects` disclose still learns on a resist (`learn_it` inside `bhitm` is not this arm’s job). SPE_SLOW SPBOOK skips `makeknown`. Match.

JS after this SHA: SLOW joins the `bhitm(steed)` group. SPEED/CURE stay `default`. Unmounted down SLOW still hits `zap_updown` `default` `return false` (review **437** Must-fix) — **not this caller**. Riding-down is the C path this SHA ports.

## Hallucinations / overclaim

Subject says downward slow while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown`; `bhitm` MSLOW or resist; disclose still learns. **False until named** for speed/CURE steed, unmounted down `zap_map` via `zap_updown` default. Stamping **Addressed:** D-1478 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed WAN_SPEED_MONSTER.” Do **not** treat fortress PASS as a riding-down slow wand.

## Density

One `zap_steed` otyp pair through existing `bhitm`. ~4 lines of real JS plus comments. Playbook §2b thin but the same envelope as D-1470…D-1474. Did not glue SPEED. Acceptable.

## Branch-by-branch confirm

1. Riding-down WAN_SLOW, mr=0: `mon_adjust_speed(-1)`, disclose, learnwand. Match `:218–224` / `:3437–3439`.
2. High-mr resist: skip speed change; weffects still disclose. Match.
3. SPE_SLOW: same `bhitm` body; SPBOOK skip makeknown; XP `more_experienced(0,10)` still. Match.
4. Mimic steed: `seemimic` before slow. Match `:221–222`.
5. No `helpful_gesture` (unlike speed). Match.
6. STRIKING/INVIS/POLY/CANCEL/OPENING/DRAIN/HEAL still `bhitm`. Unchanged.
7. SPEED still `default`. Named.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded steed coordinates.

## Verification

Journal: private canary **25**/25 (C/JS grep; Rule #2; riding-down WAN_SLOW mr=0 MSLOW+disclose+gear flag; high-mr resist still disclose; SPE_SLOW MSLOW+XP skip makeknown; D-1474…D-1443 regressions; speed/cure/locking still named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `bhitm` slow. Callee is not a stub.

Named omits (map / Open, not Must-fix):

1. `zap_steed` WAN_SPEED_MONSTER / SPE_CURE_SICKNESS — Open after this SHA
2. `zap_updown` default down `bhitpile`+`zap_map` — Must-fix from review **437** (unmounted; not this rider path)
3. `expels` land-hard / `spoteffects` (D-1424 debt)

Do not Must-fix “bhitm SPE_SLOW is a stub” (D-1424 live). Do not Must-fix “SPEED should have shipped in this SHA.” Do not Must-fix “helpful_gesture on slow” (C does not).

## Callers / RNG ledger

C callers: `weffects` when `u.usteed && u.dz>0 && oc_dir!=NODIR`. New dice: existing `resist` `rn2`. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
