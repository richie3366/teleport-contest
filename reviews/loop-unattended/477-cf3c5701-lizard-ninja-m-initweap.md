# Review 477 — cf3c5701 — makemon.c m_initweap S_LIZARD skip + PM_NINJA (D-1516)

## Metadata
- Full / short hash: `cf3c57019454d1df6a918add4fbdab2173a7a841` / `cf3c5701`
- Parent: `3a5f062e` (D-1515). This file audits **this SHA only** (fourth of nine `js/` commits since review **473**). Archive **Addressed:** D-1516 `cf3c5701`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 02:20:55 +0200
- D-id: **D-1516**
- Stats: 10 files, +216 / −147 — `js/makemon.js` +12 / −4. Band 150–350 (js/ insertions 12).
- Claims to close: Open `makemon.c` non-salamander S_LIZARD `m_initweap` (named from D-1515). Not S_KOP. `reviews/loop-2026-08-15/` has no unpaid ninja Must-fix.
- JS / map: `makemon.js` `m_initweap` `S_HUMAN` `PM_NINJA` + `S_LIZARD` comment. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map omit after D-0556 salamander / D-1088 guardian; D-1515 named S_LIZARD as next Open.

## Intent vs deliverable

Git subject promises: non-salamander lizards stay unarmed and quest ninja get shuriken or dart plus short sword or axe.

Pinned C `makemon.c` `m_initweap` S_LIZARD `:495–499`: `if (mm == PM_SALAMANDER) mongets(spear/trident/stiletto); break`. Caller `makemon` `:1443` only if `is_armed` (`mondata.h:87` AT_WEAP). Among `S_LIZARD`, only salamander has AT_WEAP; newt/gecko/iguana/baby crocodile/lizard/chameleon/crocodile never enter this function. S_HUMAN `:263–272`: priest/`quest_mon_represents_role(..., PM_CLERIC)` mace, **else if** `mm == PM_NINJA` two `mongets`, **else if** `MS_GUARDIAN`. Ninja `monsters.h` `:3868–3875` `AT_WEAP` + `G_NOGEN`. Roshi is `MS_GUARDIAN`, not this arm.

Old JS: salamander kit already D-0556; ninja was a named omit between priest and guardian (`else if` jumped to `MS_GUARDIAN`).

The diff **does** insert the ninja `else if` with live `mongets`. The S_LIZARD hunk is **comment-only** — the `if (mm === pm('SALAMANDER'))` body is unchanged. Non-salamander lizards were already unarmed via `is_armed`. Subject’s lizard half is map-row retirement, not a new kit.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_initweap` PM_NINJA | C `:270–272`, **LIVE this SHA** | between priest and guardian |
| `m_initweap` S_LIZARD | C `:495–499`, **already LIVE** | comment only |
| `mongets` | C `:2181`, **LIVE** | |
| `is_armed` | C `mondata.h:87`, **LIVE** | `has_at_weaps` |
| `quest_mon_represents_role` | C priest predicate, **LIVE** | not this SHA |
| `pm('NINJA')` | C `PM_NINJA`, **LIVE** | index 378 |
| SHURIKEN/DART/SHORT_SWORD/AXE | C otyps, **LIVE** | `objectNames` 25/24/46/44 |
| `set_mimic_sym` maze/`in_town` | C, **OMIT named** | next Open |

`node scripts/sym.mjs m_initweap mongets is_armed quest_mon_represents_role`:

```
m_initweap       NOT EXPORTED — 1 LOCAL js/makemon.js:1259
mongets          js/makemon.js:1200   sync
is_armed         js/monsters.js:723   sync
quest_mon_represents_role NOT EXPORTED — 1 LOCAL js/makemon.js:1251
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** ninja `rn2(4)` throw then `rn2(4)` melee (each before `mongets`/`mksobj`). S_LIZARD adds none. **Public-unhit** until quest ninja create (`G_NOGEN`). Ordinary lizards already public.

## C ↔ JS fidelity

Ninja. C `:270–272`:

```270:272:nethack-c/upstream/src/makemon.c
        } else if (mm == PM_NINJA) { /* extra quest villains */
            (void) mongets(mtmp, rn2(4) ? SHURIKEN : DART);
            (void) mongets(mtmp, rn2(4) ? SHORT_SWORD : AXE);
```

HEAD JS `:1448–1453`: same `else if` after priest/`quest_mon_represents_role`, before `MS_GUARDIAN`. `rn2(4) ? otyp('SHURIKEN') : otyp('DART')` then `mongets`; same for SHORT_SWORD/AXE. `otyp` is a table lookup. **Match call-for-call.** Always two `mongets` (canary “throw+melee always”). **Match.** Roshi still hits guardian (`MS_GUARDIAN`), not this arm. **Match.** Ninja has AT_WEAP so `is_armed` calls `m_initweap`. **Match.**

S_LIZARD. C `:495–499` `if (mm == PM_SALAMANDER)` then break, no `else` kit. JS already had that `if` (D-0556). This SHA only documents that `is_armed` skips the rest. **Match C; no new JS.** Calling the arm for a gecko would `break` with no `rn2`. **Match.** gecko never calls it.

Callee closure (ninja arm). LIVE: `mongets` → `mksobj`/`mpickobj`. OMIT: `set_mimic_sym`. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.” Ninja `G_NOGEN` (`monsters.h` `:3868`): not random generation; quest `makemon(PM_NINJA)` / `create_monster` is the caller. **Match C.** Each `rn2(4)` runs before the corresponding `mongets`. **Match call-for-call.**

## Hallucinations / overclaim

Subject ninja shuriken/dart + short sword/axe: **true**. Subject “non-salamander lizards stay unarmed”: **true of C and of pre-existing JS**, **false as a new kit this SHA** (comment only). D-log “named omit treated S_LIZARD as unfinished”: fair **map** cleanup, not a logic fix. Stamping **Addressed:** D-1516 for **`:270–272` plus documenting `:495–499`** is fair. Do **not** stamp “Match C salamander kit” (D-0556). Do **not** treat fortress PASS as a quest-ninja fight (`G_NOGEN`, public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

+12 JS. Ninja C is three lines; lizard was already matched. Playbook §2b C-small carve-out. Sibling of S_KOP (D-1515) could have been one `m_initweap` envelope; they split. Thin sequential peels, not a C-wrong.

## Branch-by-branch confirm

1. Priest / cleric-role: mace, skip ninja. **Unchanged; Match `:263–269`.**
2. `mm == PM_NINJA`: two `mongets`, skip guardian. **Match `:270–272`.**
3. `rn2(4)` truthy → SHURIKEN else DART; second `rn2(4)` SHORT_SWORD else AXE. **Match.**
4. Roshi `MS_GUARDIAN`: guardian kit, not shuriken. **Match.**
5. Salamander: existing spear/trident/stiletto. **Unchanged; Match `:496–498`.**
6. Other lizards: `!is_armed`, never enter. **Match caller.**
7. **Public-unhit** for ninja until quest create.

## Callers / RNG ledger

C: quest `makemon(PM_NINJA)` / `is_armed`. JS the same once a ninja exists. New `rn2` only in the ninja arm. No seed gate.

`monsters.h` ninja is `G_NOGEN` + `AT_WEAP`. Random `makemon` class generation will not pick it; `is_armed` is true so a direct `makemon(PM_NINJA)` still enters `m_initweap`. **Match C.** The two `rn2(4)` are independent (throw then melee), not one shared roll. **Match.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. No seed-shaped ninja kit; otyps are table lookups (`SHURIKEN` 25 / `DART` 24 / `SHORT_SWORD` 46 / `AXE` 44).

Comment-only S_LIZARD is not a FORCE/DIAG hide.

## Verification

D-log: private canary **19**/19 (seven non-salamander `!is_armed`; salamander 40/40 kit kept; 200 ninja throw+melee always, shuriken=147 dart=53 short=151 axe=49; roshi not shuriken); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until quest ninja. Cohort is shared-startup. Honest.

## Actionable C-wrongs

None. Remaining **named** (map / Open): `set_mimic_sym` maze/sokoban/`in_town` (next SHA). Do not Must-fix “should have changed S_LIZARD JS” (already matched C). Do not Must-fix roshi (guardian, not ninja).

Verdict: **ACCEPT-WITH-DEBT**
