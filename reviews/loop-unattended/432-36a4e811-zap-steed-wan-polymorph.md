# Review 432 — 36a4e811 — zap.c zap_steed WAN_POLYMORPH/SPE_POLYMORPH via bhitm (D-1471)

## Metadata
- Full / short hash: `36a4e8118ce0f458b76971a1f13dce8793e25dbf` / `36a4e811`
- Parent: `444e2080` (D-1470). This file audits **this SHA only** (fifth of nine `js/` commits since review **427**). Archive **Addressed:** D-1471 `36a4e811` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 12:56:37 +0200
- D-id: **D-1471**
- Stats: 11 files, +111 / −34 — `js/zap.js` +23 / −5; `js/spell.js` comment (+2 / −1).
- Claims to close: Open `zap.c` `zap_steed` WAN_POLYMORPH/SPE_POLYMORPH via bhitm (named from D-1470 / review **431**). Not INVIS. `reviews/loop-2026-08-15/` has no unpaid steed-poly Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` POLY (D-1459) / `newcham`. Caller `weffects` `:3437–3439`. `c-js-map/turns.md` + `debt.md`. Remaining bhitm-routed steed otyps named.
- Prior reviews this SHA claims to close: **431** named POLY after CANCEL; **419** named `zap_steed` poly after the cast dispatch.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_POLYMORPH/SPE_POLYMORPH via bhitm so a downward polymorph while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3120–3121` in the `:3115–3134` bhitm group: `(void) bhitm(u.usteed, obj); steedhit = TRUE`. Caller `weffects` `:3437–3439` disclose + skip `zap_updown`. Callee `bhitm` `:263–334` (already D-1459): long-worm `has_mcorpsenm` skip; else `resists_magm` `shieldeff_mon`; else `!resist` NOTELL then `bypass_obj` minvent, `cham==NON_PM && !rn2(25)` system shock `xkilled` NOCORPSE, else `newcham(NULL, ncflags)` + cham fallback.

Old JS: POLY defaulted `zap_steed` false → `zap_updown`. `bhitm` POLY already live for lateral zaps.

The diff **does** add `case WAN_POLYMORPH: case SPE_POLYMORPH:` to the existing `bhitm(steed)` group. It **does not** change `bhitm` poly bodies (comment only). It **does not** add invis/striking/slow/speed/CURE_SICKNESS. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN/SPE_POLY arm | C `:3120–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | |
| `bhitm` WAN/SPE/POT_POLY | C `:263–334`, **imported live** (D-1459) | |
| `resist` NOTELL / `newcham` / `xkilled` | C, **imported live** | |
| `bypass_obj` minvent | C `:283–285`, **imported live** | |
| `resists_magm` | C `:270–273`, **stub `return false`** | named; magm does **not** skip |
| long-worm `has_mcorpsenm` skip | C `:266–269`, **named no-op** | still allows first hit |
| remaining `zap_steed` bhitm otyps | C `:3116–3126`, **named omit** | potionhit was next Open after this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** riding-down poly now reaches `resist` / `rn2(25)` / `newcham` (already in `bhitm`). Public fortress does not zap poly while mounted.

## C ↔ JS fidelity

`zap_steed` POLY now `bhitm` then `steedhit=true`. Match `:3120–3134`. **Callee is not a stub on the keep path** (`resist` / `rn2(25)` shock / `newcham`). Hallucination check: “Match C via bhitm” while **`newcham` is live** is **not** a dispatch-stub lie.

`weffects` disclose still learns when `resist` fails (C `(void) bhitm`). SPE_POLY SPBOOK skips `makeknown`. Match.

Callee (unchanged this SHA, already reviewed **419**): typical `!resist` then `rn2(25)` or `newcham` matches `:274–305`. Two **named** gaps:

1. JS `resists_magm` is `return false` (“deferred → false (no shield RNG)”). C `:270–273` would `shieldeff_mon` and **skip** poly. Review **419** said “magm still skips poly” — that is **false** while the stub returns false; magm monsters still take `resist`/`newcham`. Named omit on the callee, not introduced as “Match C `resists_magm`” here.
2. Long-worm `has_mcorpsenm` skip is an empty `if` then fallthrough. Named.

Typical riding horse is not magm and not a long worm. The steed **route** matches C.

Pinned C default group (POLY is `:3120–3121` in the same `bhitm` list as CANCEL):

```3115:3134:nethack-c/upstream/src/zap.c
    case WAN_POLYMORPH:
    case SPE_POLYMORPH:
    case WAN_STRIKING:
    // ... SLOW / SPEED / HEALING / DRAIN / OPENING ...
        (void) bhitm(u.usteed, obj);
        steedhit = TRUE;
```

Callee keep-path (this SHA does **not** touch it; D-1459 already shipped `newcham`):

```270:305:nethack-c/upstream/src/zap.c
        } else if (resists_magm(mtmp)) {
            shieldeff_mon(mtmp);
        } else if (!resist(mtmp, otmp->oclass, 0, NOTELL)) {
            // ... bypass_obj minvent ...
            if (mtmp->cham == NON_PM && !rn2(25)) {
                // shudder + xkilled NOCORPSE
            } else {
                // newcham(..., ncflags) + cham fallback
```

JS `resists_magm` is still `return false`, so the C `shieldeff_mon` skip is never taken; magm steeds still hit `resist`/`rn2(25)`/`newcham`. Named on the callee. Long-worm `has_mcorpsenm` is an empty `if` then fallthrough (`js/zap.js` `:3800–3803`) — C would skip a second-hit worm. Named.

JS after this SHA: `case WAN_POLYMORPH: case SPE_POLYMORPH:` join the existing `bhitm(steed)` group (`:5903–5928`). INVIS/STRIKING still `default` at this SHA.

## Hallucinations / overclaim

Subject says downward poly while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown`; `bhitm` `resist`/`rn2(25)`/`newcham`; disclose still learns. **False until named** for magm skip, long-worm second-hit skip, remaining steed otyps. Stamping **Addressed:** D-1471 for the **steed switch arm** is fair. Do **not** stamp “Match C `resists_magm` shieldeff on a steed.” Do **not** treat fortress PASS as a riding-down poly.

## Density

One `zap_steed` otyp pair through existing `bhitm`. ~6 lines of real JS plus comments. Playbook §2b. Did not glue INVIS. Acceptable.

## Branch-by-branch confirm

1. Riding, `dz>0`, WAN_POLYMORPH: `bhitm(steed)` then disclose. Match `:3120–3133` / `:3437–3439`.
2. mr=0, `cham==NON_PM`, `rn2(25)` miss: `newcham`. Match `:290–305`.
3. `!rn2(25)`: shudder + `xkilled` NOCORPSE. Match `:290–297`.
4. High-mr `resist` NOTELL: no poly; still disclose. Match `:274` + weffects disclose.
5. SPE_POLYMORPH: same arm; SPBOOK skip makeknown. Match.
6. INVIS/STRIKING still default `zap_steed` false. Named.
7. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rn2(25)` is C `:290`, not a recorded index.

## Verification

Journal: private canary **22**/22 (C/JS grep; Rule #2; riding-down WAN_POLYMORPH mr=0 disclose learn; SPE skip makeknown; high-mr resist still disclose; cancel/opening/teleport/probing/drain siblings; invis/striking/locking still default; no-steed / dx / dz<0 skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps poly while riding down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The switch arm matches `:3120–3133`. `newcham` is a C callee. `resists_magm` always-false and long-worm skip are **named** callee omits (pre-existing D-1459), not silent “Match C magm” for this routing.

Named omits (map / Open, not Must-fix):

1. `zap_steed` WAN_MAKE_INVISIBLE via bhitm — later D-1473
2. remaining striking / slow / speed / SPE_CURE_SICKNESS
3. `resists_magm` live MR_MAGM + `shieldeff_mon`; long-worm `has_mcorpsenm` skip

Do not Must-fix “dispatch is a stub.” Do not Must-fix “INVIS should have shipped in this SHA.” Do not Must-fix “resist failure should skip disclose.”

## Callers / RNG ledger

C callers: `weffects` steed-down. Dice: `resist`; `rn2(25)`; `newcham`. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
