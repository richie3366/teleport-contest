# Review 435 — dfd88d1b — zap.c zap_steed WAN_STRIKING/SPE_FORCE_BOLT via bhitm (D-1474)

## Metadata
- Full / short hash: `dfd88d1b9a9db6362e50b0281eb105a65ea41819` / `dfd88d1b`
- Parent: `e6a44782` (D-1473). This file audits **this SHA only** (eighth of nine `js/` commits since review **427**). Archive **Addressed:** D-1474 `dfd88d1b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 13:28:54 +0200
- D-id: **D-1474**
- Stats: 9 files, +109 / −31 — `js/zap.js` +30 / −7.
- Claims to close: Open `zap.c` `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via bhitm (named from D-1473 / review **434**). Not SLOW. `reviews/loop-2026-08-15/` has no unpaid steed-striking Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` STRIKING/FORCE (D-1388). Caller `weffects` `:3437–3439`. `c-js-map/turns.md`. Remaining bhitm-routed steed otyps named.
- Prior reviews this SHA claims to close: **434** named STRIKING after INVIS; **348** named `zap_steed` striking after FORCE_BOLT IMMEDIATE.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_STRIKING/SPE_FORCE_BOLT via bhitm so a downward striking wand or force bolt while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3122–3123` in the `:3115–3134` bhitm group. Caller `weffects` `:3437–3439` disclose + skip `zap_updown` (so riding-down striking must **not** run D-1456 destroy-drawbridge). Callee `bhitm` `:189–217` (D-1388): WAN_STRIKING FALLTHROUGH SPE_FORCE_BOLT; `resists_magm` Boing + `shieldeff`; else `uswallow || rnd(20) < 10+find_mac` then `d(2,12)` (+ Knight `dbldam` named) + SPE `spell_damage_bonus` + `resist` TELL; miss skips `learn_it`. `weffects` disclose still learns on a miss.

Old JS: STRIKING defaulted `zap_steed` false → `zap_updown`. `bhitm` STRIKING already live for lateral zaps.

The diff **does** add `case WAN_STRIKING: case SPE_FORCE_BOLT:` to the existing `bhitm(steed)` group. It **does not** change `bhitm` striking bodies. It **does not** add slow/speed/CURE_SICKNESS. Named. It **does not** add `bhit` doorlock STRIKING. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN_STRIKING/SPE_FORCE arm | C `:3122–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | |
| `bhitm` WAN_STRIKING/SPE_FORCE | C `:189–217`, **imported live** (D-1388) | |
| `find_mac` / `d(2,12)` / `spell_damage_bonus` / `resist` TELL | C, **imported live** | |
| `resists_magm` Boing | C `:196–201`, **stub `return false`** | named; magm never Boing |
| Knight questart `dbldam` | C `:206–207`, **named omit** | `void Role_if` |
| `shieldeff` on magres | C `:199`, **named omit** | |
| remaining `zap_steed` bhitm otyps | C `:3124–3126`, **named omit** | slow/speed/CURE |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT`. **New gameplay RNG:** riding-down striking now reaches `rnd(20)` / `d(2,12)` / `resist` (already in `bhitm`). Public fortress does not zap striking while mounted.

## C ↔ JS fidelity

`zap_steed` STRIKING/FORCE now `bhitm` then `steedhit=true`. Match `:3122–3134`. **Callee is not a stub on the keep path** (`rnd(20)` to-hit, `d(2,12)`, SPE bonus, `resist` TELL, miss). Hallucination check: “Match C via bhitm” while **hit/miss/`d(2,12)` are live** is **not** a dispatch-stub lie. `resists_magm` still `return false` (same as review **432**); magres never takes the Boing skip. Named on the callee, not introduced as “Match C magm Boing” here.

`weffects` disclose still learns on a miss (`learn_it=false` inside `bhitm` does not clear weffects disclose). SPE_FORCE_BOLT SPBOOK skips `makeknown`. Match.

`bhitm` `:189–217` unchanged this SHA: FALLTHROUGH `zap_type_text="wand"` vs `"spell"`; `learn_it=cansee(bhitpos)`; hit `d(2,12)` then SPE `spell_damage_bonus`; miss `learn_it=false`. Knight `dbldam` still `void`. Match keep path.

Pinned C (STRIKING/FORCE are `:3122–3123`; riding-down must **not** take `zap_updown` D-1456 destroy-drawbridge):

```3115:3134:nethack-c/upstream/src/zap.c
    case WAN_STRIKING:
    case SPE_FORCE_BOLT:
    case WAN_SLOW_MONSTER:
    // ... SPEED / HEALING / DRAIN / OPENING ...
        (void) bhitm(u.usteed, obj);
        steedhit = TRUE;
```

Callee keep-path (this SHA does **not** rewrite; D-1388 already shipped hit/miss):

```189:216:nethack-c/upstream/src/zap.c
    case WAN_STRIKING:
        zap_type_text = "wand";
        FALLTHROUGH;
    case SPE_FORCE_BOLT:
        // resists_magm → Boing + shieldeff
        // else uswallow || rnd(20) < 10+find_mac → d(2,12) + SPE bonus + resist TELL
        // else miss; learn_it = FALSE
```

JS `resists_magm` still `return false`, so magres never Boing; `shieldeff` on that arm is named. Knight `dbldam` is `void Role_if`. Named. Hit `rnd(20)` / `d(2,12)` / SPE `spell_damage_bonus` / miss are live (`js/zap.js` `:3695–3725`).

JS after this SHA: `case WAN_STRIKING: case SPE_FORCE_BOLT:` join the `bhitm(steed)` group (`:5901–5928`). SLOW/SPEED/CURE_SICKNESS stay `default`. `bhit` doorlock STRIKING is a different caller (Open after D-1475).

## Hallucinations / overclaim

Subject says downward striking/force bolt while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown` drawbridge; `bhitm` hit or miss; disclose still learns. **False until named** for magm Boing, Knight dbldam, remaining steed otyps, doorlock STRIKING. Stamping **Addressed:** D-1474 for the **steed switch arm** is fair. Do **not** stamp “Match C `resists_magm` Boing on a steed.” Do **not** treat fortress PASS as a riding-down strike.

## Density

One `zap_steed` otyp pair through existing `bhitm`. ~4 lines of real JS plus comments. Playbook §2b. Did not glue SLOW or doorlock STRIKING. Acceptable.

## Branch-by-branch confirm

1. Riding, `dz>0`, WAN_STRIKING: `bhitm(steed)` then disclose. Match `:3122–3133` / `:3437–3439`.
2. Easy hit: `d(2,12)` + `resist` TELL. Match `:202–211`.
3. Miss: `learn_it=false`; weffects still disclose. Match `:212–215` + `:3437–3439`.
4. SPE_FORCE_BOLT: `spell_damage_bonus`; SPBOOK skip makeknown. Match `:208–209`.
5. SLOW/SPEED still default `zap_steed` false. Named.
6. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rnd(20)` / `d(2,12)` are C `:202` / `:205`, not recorded indices.

## Verification

Journal: private canary **24**/24 (C/JS grep; Rule #2; riding-down WAN_STRIKING easy-hit dmg+disclose; miss still disclose; SPE_FORCE_BOLT dmg+XP skip makeknown; D-1473…D-1443 regressions; slow/speed/locking still named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The switch arm matches `:3122–3133`. Hit/miss/`d(2,12)` are C callees. `resists_magm` always-false and Knight `dbldam` are **named** callee omits (pre-existing D-1388).

Named omits (map / Open, not Must-fix):

1. remaining `zap_steed` SLOW/SPEED/SPE_CURE_SICKNESS
2. `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT — Open already after D-1475
3. `resists_magm` live Boing + `shieldeff`; Knight questart `dbldam`

Do not Must-fix “dispatch is a stub.” Do not Must-fix “miss should skip disclose.” Do not Must-fix “SLOW should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `weffects` steed-down. Dice: `rnd(20)`; `d(2,12)`; `resist`. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
