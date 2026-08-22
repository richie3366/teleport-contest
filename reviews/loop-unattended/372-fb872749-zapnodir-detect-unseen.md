# Review 372 — fb872749 — zap.c zapnodir SPE_DETECT_UNSEEN (D-1412)

## Metadata
- Full / short hash: `fb8727495484f3a122e3d50bc136134982394fec` / `fb872749`
- Parent: `71ee9186` (D-1411). This file audits **this SHA only** (eighth of nine `js/` commits since review **364**). Archive **Addressed:** D-1412 `fb872749` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 13:40:50 +0200
- D-id: **D-1412**
- Stats: 10 files, +116 / −34 — `js/zap.js` +16 / −4 (`SPE_DETECT_UNSEEN` shares SECRET_DOOR); `js/spell.js` +12 / −1 (NODIR `wand_duplicate_weffects`).
- Claims to close: Open `zap.c` `zapnodir` SPE_DETECT_UNSEEN (named from D-1404 / review **364**). Not stasis. `reviews/loop-2026-08-15/` has no unpaid detect-unseen Must-fix.
- JS / map: `zap.js` `zapnodir`; `spell.js` `spelleffects` / `wand_duplicate_weffects`. Callee `detect.js` `findit` (D-0074). `c-js-map/turns.md`. SPE_LIGHT cast dispatch / enlightenment still named.
- Prior reviews this SHA claims to close: **364** named SPE_DETECT_UNSEEN after stasis.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapnodir SPE_DETECT_UNSEEN so casting detect unseen reveals secrets via findit, instead of doing nothing.”

C `zap.c` `zapnodir` `:2552–2558`:

```
    case WAN_SECRET_DOOR_DETECTION:
    case SPE_DETECT_UNSEEN:
        /* findit() gives sufficient feedback to discover the wand even when
           blinded or when it fails to find anything */
        known = !!obj->dknown;
        (void) findit();
        break;
```

Then `:2595–2601` `more_experienced` + `learnwand` if known. `learnwand` `:133` skips `SPBOOK_CLASS` so a fake spellbook is not `makeknown`. Caller `spell.c` `:1473–1512`: wand-duplicate group; `oc_dir == NODIR` → `weffects(pseudo)` (no getdir). `weffects` `:3454` → `zapnodir`.

Old JS: zapnodir default skip after D-1404; `spelleffects` other-otyp “Nothing happens.”

The diff **does** share the SECRET_DOOR arm and route the spell through live `wand_duplicate_weffects` (NODIR `weffects`). It does **not** dispatch SPE_LIGHT cast (zapnodir SPE_LIGHT already D-1366). Named. It does **not** port enlightenment. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_DETECT_UNSEEN zapnodir | C `:2552–2558`, **wired** | shares SECRET_DOOR |
| spell NODIR weffects | C `:1474–1512`, **wired** | `wand_duplicate_weffects(..., false)` |
| `weffects` NODIR | C `:3454`, **already live** | `zapnodir` |
| `findit` | C `detect.c`, **imported live** | D-0074 |
| `learnwand` SPBOOK skip | C `:133`, **already live** | |
| `known = !!dknown` | C `:2556`, **wired** | Blind still discovers wand; spell skips makeknown |
| SPE_LIGHT **cast** | C `:1473`, **named omit** | zapnodir SPE_LIGHT already live |
| `peffect_enlightenment` | C, **named omit** | next SHA |
| findone flash/mimic | C `detect.c`, **named on callee** | D-0074 debt |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `findit`/`findone` may already burn vision/reveal dice (D-0074). This SHA adds **no** new `rn2` in zapnodir. Public fortress never casts detect unseen.

## C ↔ JS fidelity

`known = !!obj.dknown; await findit();` Match `:2556–2557`. Blind does **not** gate `known` (unlike LIGHT’s `dknown && !Blind`). Match the comment. `findit` is live D-0074 (`do_clear_area` / `findone` / “You find …” counts), not a no-op. Swallow returns 0 with no pline (C `findit` same). Adjacent SDOOR still converts via that callee.

After the switch: if known and `!oc_name_known`, `more_experienced(0,10)` then `learnwand`. Spell pseudo is `SPBOOK_CLASS` so `learnwand` returns immediately — XP can still fire when `dknown` (C same: `more_experienced` is **before** `learnwand`). Wait: C `:2595–2600`:

```
    if (known) {
        if (!objects[obj->otyp].oc_name_known)
            more_experienced(0, 10);
        learnwand(obj);
    }
```

For a never-discovered SPE_DETECT_UNSEEN book, `oc_name_known` is typically already true for spells the hero has in `spl_book`, or false for the fake mksobj? Pseudo from `mksobj(SPE_DETECT_UNSEEN)` — spellbook type may not be `oc_name_known` until identified. C still awards 10 XP then `learnwand` no-ops on SPBOOK. JS same. Wand SECRET_DOOR with dknown still `learnwand`s. Match D-1379-era SECRET_DOOR regression.

NODIR path: `wand_duplicate_weffects` skips getdir and calls `weffects` → `zapnodir`. Match `:1479` / `:1511–1512`. `physical_damage` false (FORCE_BOLT-only). Match.

Hallucination check: “Match C SPE_DETECT_UNSEEN `findit`” while **`findit` is the D-0074 export and `weffects` NODIR is live** is not a dispatch-stub lie. Do **not** stamp “Match C SPE_LIGHT cast.” Do **not** stamp “Match C `peffect_enlightenment`.” Do **not** stamp “Match C `learnwand` makeknown of the spellbook.”

## Hallucinations / overclaim

Subject says casting detect unseen reveals secrets via `findit` instead of doing nothing. **True on the keep-path** (NODIR `weffects` → shared SECRET_DOOR arm). **True that `known=!!dknown` even when Blind / findit finds nothing.** **True that SPBOOK skips makeknown.** **False until named for SPE_LIGHT cast / remaining wand-duplicates / enlightenment.** D-log “NODIR SPBOOK vs SECRET_DOOR wand; dknown XP + skip makeknown; !dknown still findit no XP; swallow silent; adjacent SDOOR reveal; wand SECRET_DOOR learnwand regression; weffects NODIR; STASIS/ENLIGHTEN/WISH/CREATE/LIGHT still wired” are the right falsifiers. Stamping **Addressed:** D-1412 for `:2552–2558` + `:1474` dispatch is fair. Do **not** treat fortress PASS as a detect-unseen cast.

## Density

One shared `zapnodir` case plus the NODIR caller C already used for FORCE_BOLT/FIREBALL. ~20 lines of JS. Playbook §2b right size. Did not glue enlightenment (next SHA). Did not retouch STASIS.

## Branch-by-branch confirm

1. Spell NODIR: no getdir; `findit`; no makeknown of the book. Match.
2. `dknown` spell: `more_experienced(0,10)` then learnwand no-op. Match.
3. `!dknown`: `known` false; `findit` still runs; no XP. Match.
4. Blind + dknown wand of secret door: still known/learnwand. Match.
5. Swallow: `findit` 0; known still follows dknown. Match.
6. SECRET_DOOR wand unchanged. Match D-0074 caller.
7. STASIS / ENLIGHTENMENT / WISH / CREATE / LIGHT arms unchanged. Match D-1404/D-1395/D-1380/D-1379/D-1366.
8. SPE_LIGHT **cast** still “Nothing happens.” Named.
9. **Public-unhit** until a session casts detect unseen.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; NODIR SPBOOK vs SECRET_DOOR wand; dknown XP + skip makeknown; !dknown still findit no XP; swallow silent; adjacent SDOOR reveal; wand SECRET_DOOR learnwand regression; weffects NODIR; STASIS/ENLIGHTEN/WISH/CREATE/LIGHT still wired; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The arm matches `:2552–2558`; the spell caller matches NODIR `weffects`; `findit` is live.

Named omits (map / Open, not Must-fix):

1. remaining wand-duplicate SPE_LIGHT / SLEEP / DIG / … **cast** dispatch
2. `potion.c` `peffect_enlightenment` (already next Open after this SHA)
3. `detect.c` `findone` flash/mimic/invis named on D-0074

Do not Must-fix “learnwand the spellbook” (C SPBOOK skip). Do not Must-fix “known requires !Blind” (C comment forbids it). Do not Must-fix “getdir for NODIR” (C `:1479` else `weffects`). Do not Must-fix “STASIS should findit” (different case).

## Callers / RNG ledger

C this arm: no `rn2` in zapnodir; `findit` may burn D-0074 dice. JS same. Public fortress never needs a new die. `weffects` still `exercise(A_WIS)` before `zapnodir` (C `:3436`) — pre-existing.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_DETECT_UNSEEN now shares SECRET_DOOR `findit` via NODIR `weffects`, with `known=!!dknown` and SPBOOK skip of `learnwand`; SPE_LIGHT cast and enlightenment stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1412 `fb872749` already has the short hash.
