# Review 387 — 91c11733 — spell.c SPE_LIGHT NODIR wand-duplicate (D-1427)

## Metadata
- Full / short hash: `91c117332fe90190a384324d8ed85c76d44bf09f` / `91c11733`
- Parent: `e50968db` (D-1426). This file audits **this SHA only** (fifth of nine `js/` commits since review **382**). Archive **Addressed:** D-1427 `91c11733` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 01:01:21 +0200
- D-id: **D-1427**
- Stats: 10 files, +101 / −33 — `js/spell.js` +13 / −6; `js/zap.js` comments +8 / −5.
- Claims to close: Open remaining SPE_LIGHT wand-duplicate (named from D-1412 / review **372**). Not detect unseen. `reviews/loop-2026-08-15/` has no unpaid light-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callee `zap.js` `zapnodir` SPE_LIGHT (D-1366) → `litroom` / `lightdamage`. `c-js-map/turns.md`. SLEEP / DIG / IMMEDIATE still named.
- Prior reviews this SHA claims to close: **372** named SPE_LIGHT cast dispatch after detect-unseen.

## Intent vs deliverable

Git subject promises: “Match C spell.c wand-duplicate NODIR weffects so casting SPE_LIGHT lights the room via zapnodir instead of doing nothing.”

C `spell.c` `spelleffects` `:1473–1514` puts `SPE_LIGHT` in the wand-duplicate group with `SPE_DETECT_UNSEEN`. `objects.h:1309` `oc_dir` is `NODIR`, so `:1479` is false and `:1511–1512` calls `weffects(pseudo)` (no `getdir`) then `update_inventory()`. `weffects` `:3453–3454` → `zapnodir`. `zapnodir` `:2544–2550` (already D-1366):

```
    case WAN_LIGHT:
    case SPE_LIGHT:
        known = (obj->dknown && !Blind);
        litroom(TRUE, obj);
        (void) lightdamage(obj, TRUE, 5);
        break;
```

Then `:2595–2601` XP + `learnwand`. Fake spellbook is `SPBOOK_CLASS` so `learnwand` `:133` skips `makeknown`.

Old JS: `spelleffects` other-otyp “Nothing happens.” after D-1412; `zapnodir` SPE_LIGHT already live (wand of light / D-1366).

The diff **does** add SPE_LIGHT to the same `wand_duplicate_weffects(..., false)` arm as DETECT_UNSEEN. It **does not** retouch `zapnodir` / `litroom` / `lightdamage` bodies. It **does not** port SLEEP / DIG. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_LIGHT `spelleffects` | C `:1473–1514`, **wired** | NODIR `weffects` |
| `wand_duplicate_weffects` | C `:1479–1513`, **already live** | D-1412 helper |
| `weffects` NODIR | C `:3454`, **already live** | `zapnodir` |
| `zapnodir` SPE_LIGHT | C `:2544–2550`, **already live** | D-1366; not a stub |
| `litroom` | C `read.c`, **imported live** | swallow/water named |
| `lightdamage` | C `zap.c`, **imported live** | gremlin `rnd` |
| `learnwand` SPBOOK skip | C `:133`, **already live** | |
| SPE_SLEEP / SPE_DIG | C siblings, **named omit** | still “Nothing happens.” |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this dispatch. `lightdamage` may `rnd` if the hero is a gremlin (pre-existing callee). `litroom` has no dice. Public fortress never casts light.

## C ↔ JS fidelity

`oc_dir === NODIR` (`objects.h:1309`) → skip getdir → `weffects` → `zapnodir`. Match `:1479` / `:1511–1512`. `physical_damage` false (FORCE_BOLT-only). Match. `update_inventory()` after the group. Match `:1513`.

`zapnodir` SPE_LIGHT is unchanged D-1366: `known = dknown && !Blind()` then `litroom(true, obj)` then `lightdamage(obj, true, 5)`. Match `:2548–2550`. Blind with dknown: `known` false, still lights (C same). `!dknown`: still `litroom`, no XP. Spell pseudo: `more_experienced` may fire when `known && !oc_name_known`, then `learnwand` no-ops on SPBOOK. Wand of light still `learnwand`s. Match D-1366 / D-1412.

`litroom` is the live `read.js` export (ordinary “A lit field surrounds you!”, Rogue whole-room, swallow/water `no_op`). Swallow engulfer-lit msgs named. `lightdamage` is live (gremlin hurt; SPBOOK says “spell of light”). Not a dispatch-stub.

Hallucination check: “Match C SPE_LIGHT via `zapnodir`” while **`zapnodir` SPE_LIGHT / `litroom` / `lightdamage` / NODIR `weffects` are already live** is not a dispatch-stub lie. “Match C SPE_SLEEP / SPE_DIG weffects” **would** be. Do **not** stamp “Match C swallow engulfer-lit pline.” Do **not** stamp “Match C `learnwand` makeknown of the spellbook.”

## Hallucinations / overclaim

Subject says casting SPE_LIGHT lights the room via `zapnodir` instead of doing nothing. **True on the keep-path** (NODIR `weffects` → D-1366 arm). **True that SPBOOK skips makeknown.** **True that Blind still lights but skips XP.** **False until named for SLEEP / DIG / IMMEDIATE.** Stamping **Addressed:** D-1427 for `:1473` dispatch is fair. Do **not** treat fortress PASS as a light cast.

## Density

One extra otyp on an existing NODIR helper. ~15 lines of JS. Playbook §2b thin dispatch when the callee is live. Did not glue SLEEP/DIG. Right size.

## Branch-by-branch confirm

1. Seeing, dknown: lit field + possible XP; no makeknown. Match.
2. `!dknown`: still `litroom`; no XP. Match.
3. Blind: `known` false; still lights. Match `:2548`.
4. Swallow: `no_op` skip radius; no ordinary pline. Match D-1366; engulfer msgs named.
5. WAN_LIGHT still learns. Regression-safe.
6. DETECT_UNSEEN still D-1412. Match.
7. SPE_SLEEP still “Nothing happens.” Named.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Comment-only `zap.js` hunk is not gameplay.

## Verification

Journal: private canary **21**/21 (C/JS grep; NODIR SPBOOK vs WAN_LIGHT; cast lit-field + radius; dknown XP + skip makeknown; !dknown still litroom no XP; Blind silent no XP; swallow no ordinary pline; WAN_LIGHT learnwand regression; weffects NODIR; SLEEP still Nothing happens; DETECT_UNSEEN/STASIS/ENLIGHTEN/WISH/CREATE still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD. Fortress PASS is not a light spell.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch hits live `zapnodir` SPE_LIGHT / `litroom` / `lightdamage`. Not a stub.

Named omits (map / Open, not Must-fix):

1. wand-duplicate SPE_SLEEP / SPE_DIG / remaining IMMEDIATE
2. `litroom` swallow engulfer-lit messages
3. `litroom` snuff_lit / artifact_light / gremlin hits

Do not Must-fix “spellbook should makeknown” (C `learnwand` skips SPBOOK). Do not Must-fix “Blind should skip litroom” (C lights). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `docast` → `spelleffects`. No new `rn2` in this SHA. Gremlin `lightdamage` `rnd` is pre-existing.

Verdict: **ACCEPT-WITH-DEBT**
