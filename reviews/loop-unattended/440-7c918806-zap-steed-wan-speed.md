# Review 440 — 7c918806 — zap.c zap_steed WAN_SPEED_MONSTER via bhitm (D-1479)

## Metadata
- Full / short hash: `7c918806fbb04cb3f63fc6012009d33947aa3323` / `7c918806`
- Parent: `713e0441` (D-1478). This file audits **this SHA only** (fourth of nine `js/` commits since review **436**). Archive **Addressed:** D-1479 `7c918806` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 15:09:43 +0200
- D-id: **D-1479**
- Stats: 10 files, +113 / −33 — `js/zap.js` +32 / −10.
- Claims to close: Open `zap.c` `zap_steed` WAN_SPEED_MONSTER via bhitm (named from D-1478 / review **439**). Not SLOW. `reviews/loop-2026-08-15/` has no unpaid steed-speed Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` WAN_SPEED (D-1422). Caller `weffects` `:3437–3439`. `c-js-map/turns.md`. SPE_CURE_SICKNESS named. C has no SPE_SPEED in `zap_steed` (haste-self is NODIR).
- Prior reviews this SHA claims to close: **439** named remaining speed after SLOW; **382** named `bhitm` WAN_SPEED.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_SPEED_MONSTER via bhitm so a downward speed wand while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3126` in the `:3115–3134` bhitm group. `objects.h` WAN_SPEED_MONSTER is IMMEDIATE (not NODIR), so `weffects` `:3437` `oc_dir != NODIR` reaches this. Callee `bhitm` `:233–242` (D-1422): `!resist` NOTELL then `seemimic` + `mon_adjust_speed(+1)` + `check_gear_next_turn`; **`helpful_gesture = TRUE` always** (wake without anger, even on resist). Disclose still learns. No SPE_HASTE_SELF here (`spell.c` self `speed_up`).

Old JS: SPEED defaulted `zap_steed` false → `zap_updown`. `bhitm` speed already live for lateral zaps.

The diff **does** add `case WAN_SPEED_MONSTER:` to the existing `bhitm(steed)` group. It **does not** change `bhitm` speed bodies (comment only). It **does not** add SPE_CURE_SICKNESS. Named. It **does not** invent SPE_SPEED in `zap_steed`. Honest.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN_SPEED arm | C `:3126–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | IMMEDIATE wand |
| `bhitm` WAN_SPEED_MONSTER | C `:233–242`, **imported live** (D-1422) | |
| `resist` NOTELL | C, **imported live** | |
| `mon_adjust_speed(+1)` | C `worn.c` / JS `muse.js`, **imported live** | |
| `check_gear_next_turn` | C, **imported live** | |
| `helpful_gesture` → `wakeup(..., false)` | C `:241` / bhitm epilogue, **imported live** | |
| SPE_HASTE_SELF | not in C `zap_steed`, **correctly absent** | |
| SPE_CURE_SICKNESS | C `:3116`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** riding-down speed now reaches `resist`. Public fortress does not zap speed while mounted.

## C ↔ JS fidelity

`zap_steed` SPEED now `bhitm` then `steedhit=true`. Match `:3126–3134`. **Callee is not a stub:** `resist` NOTELL, `mon_adjust_speed(+1)`, gear flag, `helpful_gesture`. Hallucination check: “Match C via bhitm” while **D-1422 `bhitm` speed is live** is **not** a dispatch-stub lie.

Callee (unchanged this SHA):

```233:242:nethack-c/upstream/src/zap.c
    case WAN_SPEED_MONSTER:
        if (!resist(mtmp, otmp->oclass, 0, NOTELL)) {
            // seemimic; mon_adjust_speed(+1); check_gear_next_turn
        }
        helpful_gesture = TRUE;
```

JS `bhitm` `:3772–3785` copies that: `helpful_gesture = true` **outside** the `!resist` block, so a high-mr steed still wakes peaceful. Epi `wakeup(mtmp, helpful_gesture ? false : true)` at `:4132`. Match. SLOW still has no `helpful_gesture`. Contrast is correct.

`weffects` disclose still learns on resist. Tame steed stays tame (helpful). Match.

JS after this SHA: SPEED joins the group. CURE still `default`. SPE_HASTE_SELF is NODIR — `weffects` never calls `zap_steed` for it. Do not invent that arm.

## Hallucinations / overclaim

Subject says a downward speed wand while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true`; MFAST or resist; disclose; helpful wake. **False until named** for SPE_CURE_SICKNESS. Stamping **Addressed:** D-1479 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed SPE_HASTE_SELF.” Do **not** treat fortress PASS as a riding-down speed wand.

## Density

One `zap_steed` otyp through existing `bhitm`. ~3 lines of real JS plus comments. Playbook §2b thin; same envelope as D-1478. Did not glue CURE. Acceptable.

## Branch-by-branch confirm

1. Riding-down WAN_SPEED, mr=0: `mon_adjust_speed(+1)`, disclose, learnwand, stay tame. Match `:233–241`.
2. High-mr resist: skip haste; still `helpful_gesture`; still disclose. Match.
3. Mimic: `seemimic` before haste. Match.
4. SLOW still −1 without helpful. Unchanged.
5. SPE_HASTE_SELF not in this switch. Match C.
6. CURE still `default`. Named.
7. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **25**/25 (C/JS grep; Rule #2; riding-down WAN_SPEED mr=0 MFAST+disclose+helpful; high-mr resist still disclose; SLOW regression; CURE/locking named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `bhitm` speed. Callee is not a stub.

Named omits (map / Open, not Must-fix):

1. `zap_steed` SPE_CURE_SICKNESS — Open after this SHA
2. `zap_updown` default — Must-fix from review **437** (unmounted)

Do not Must-fix “bhitm WAN_SPEED is a stub” (D-1422 live). Do not Must-fix “SPE_HASTE_SELF should be in zap_steed.” Do not Must-fix “CURE should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `weffects` mounted down IMMEDIATE. New dice: existing `resist` `rn2`. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
