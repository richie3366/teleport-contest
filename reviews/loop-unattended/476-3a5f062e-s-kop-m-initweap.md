# Review 476 — 3a5f062e — makemon.c m_initweap S_KOP (D-1515)

## Metadata
- Full / short hash: `3a5f062e0a7b4f59e182e5c788d0aab46c19183b` / `3a5f062e`
- Parent: `9a50ef27` (D-1514). This file audits **this SHA only** (third of nine `js/` commits since review **473**). Archive **Addressed:** D-1515 `3a5f062e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 02:09:28 +0200
- D-id: **D-1515**
- Stats: 9 files, +90 / −32 — `js/makemon.js` +7 / −1. Band 150–350 (js/ insertions 7).
- Claims to close: Open `makemon.c` S_KOP `m_initweap` specials (named from D-1507). Not throws_rocks. `reviews/loop-2026-08-15/` has no unpaid Kop Must-fix.
- JS / map: `makemon.js` `m_initweap` `case 'S_KOP'`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map omit after D-1507 / D-0556 salamander; review **468** still named S_KOP as next Open.

## Intent vs deliverable

Git subject promises: Keystone Kops get cream pies and club/rubber hose instead of an empty kit.

Pinned C `makemon.c` `m_initweap` `S_KOP` `:402–409`: `if (!rn2(4)) m_initthrow(mtmp, CREAM_PIE, 2);` then `if (!rn2(3)) mongets(mtmp, rn2(2) ? CLUB : RUBBER_HOSE);` then `break`. Callee `m_initthrow` `:148–158`: `mksobj(otyp, TRUE, FALSE)`; `quan = rn1(oquan, 3)` so pies are 3 or 4; `weight`; ORCISH_ARROW poison N/A; `mpickobj`. `mongets` `:2181`. Caller `makemon` `:1443` `is_armed` → `m_initweap` (`mondata.h:87` `attacktype(AT_WEAP)`). After the switch, `:1613` JS / C `if (m_lev > rn2(75)) mongets(rnd_offensive_item)`. `muse.c` `rnd_offensive_item` `:2040–2042` returns 0 for `S_KOP` with **no** RNG. Kops are `G_NOGEN` (`monsters.h`); the shop-theft spawner is `shk.c` `makekops` `:5113`.

Old JS: `case 'S_KOP': break` with a deferred comment.

The diff **does** port that arm onto live `m_initthrow` / `mongets`. It **does not** port `makekops`. It **does not** change S_LIZARD or PM_NINJA (next SHA). D-log “non-salamander S_LIZARD C break already matched” is **true of the `is_armed` gate** (only salamander has AT_WEAP among lizards) and **false as “the S_LIZARD case is finished”** (C still has the salamander kit; JS already had D-0556).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_initweap` S_KOP | C `:402–409`, **LIVE this SHA** | |
| `m_initthrow` | C `:148–158`, **LIVE** | `rn1(2,3)` pies |
| `mongets` | C `:2181`, **LIVE** | exported |
| `is_armed` | C `mondata.h:87`, **LIVE** | `monsters.js:723` |
| `rnd_offensive_item` | C `muse.c:2035`, **LIVE** | S_KOP → 0, no RNG |
| `otyp('CREAM_PIE'/'CLUB'/'RUBBER_HOSE')` | C object ids, **LIVE** | `objectNames` table |
| `makekops` | C `shk.c:5113`, **OMIT unnamed in map** | **NOT FOUND** in `js/**` |
| S_LIZARD / PM_NINJA | C `:495` / `:270`, **OMIT this SHA** | shipped D-1516 |

`node scripts/sym.mjs m_initweap m_initthrow mongets rnd_offensive_item is_armed makekops CREAM_PIE RUBBER_HOSE`:

```
m_initweap       NOT EXPORTED — 1 LOCAL js/makemon.js:1259
m_initthrow      NOT EXPORTED — 1 LOCAL js/makemon.js:1131
mongets          js/makemon.js:1200   sync
rnd_offensive_item NOT EXPORTED — 1 LOCAL js/makemon.js:1162
is_armed         js/monsters.js:723   sync
makekops         NOT FOUND in js/**
CREAM_PIE        NOT FOUND in js/** (no export, no local function/const).
RUBBER_HOSE      NOT FOUND in js/**
```

`CREAM_PIE` / `RUBBER_HOSE` are **otyp string keys**, not functions. `otyp('CREAM_PIE')` resolves via `objectNames.indexOf`. No clone #2 of `m_initthrow`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(4)` pies; inside throw `mksobj` then `rn1(2,3)`; `!rn2(3)` then `rn2(2)` club vs hose then `mongets`/`mksobj`; trailing `rn2(75)` still skipped for item because `rnd_offensive_item` returns 0 **before** that function’s `rn2`. **Public-unhit** until `makekops` or another explicit Kop `makemon` (G_NOGEN).

## C ↔ JS fidelity

Pinned C:

```402:409:nethack-c/upstream/src/makemon.c
    case S_KOP:
        if (!rn2(4))
            m_initthrow(mtmp, CREAM_PIE, 2);
        if (!rn2(3))
            (void) mongets(mtmp, (rn2(2)) ? CLUB : RUBBER_HOSE);
        break;
```

HEAD JS `:1588–1596`: same two independent `if`s; `rn2(2) ? otyp('CLUB') : otyp('RUBBER_HOSE')` is evaluated **before** `mongets` (clang left-to-right / C arg eval for the ternary). `otyp` is a table lookup, no RNG. **Match call-for-call.** `m_initthrow` `:1131–1137`: `mksobj(true,false)`, `quan = rn1(oquan, 3)`, `weight`, arrow poison, `mpickobj`. **Match `:148–158`.** Cream-pie `oquan==2` → quantity 3 or 4. **Match.**

`is_armed` gate: Kops have AT_WEAP so `makemon` calls this. **Match.** Trailing `rnd_offensive_item`: JS already returns 0 for `S_KOP` with no RNG (`:1167–1169`). **Match `:2040–2042`.** `mongets(0)` early-returns. **Match a 0 otyp.**

Callee closure. LIVE: `m_initthrow`, `mongets`, `mksobj`/`mpickobj`/`weight`/`rn1`/`rn2`, `is_armed`. OMIT: `makekops` (caller, not in this arm). STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.” The kit is live; the shop-theft **spawner** is still absent.

## Hallucinations / overclaim

Subject Kops get pies and club/hose instead of an empty kit: **true** when `makemon` creates an `S_KOP`. **False as a public shop-theft scene** because `makekops` is NOT FOUND. D-log 200-kop canary pies=51 weapons=71: **true of the arm’s dice**, not a session. D-log “non-salamander S_LIZARD C break already matched”: **true of `!is_armed` skip**, **overclaim if read as “S_LIZARD case finished”** (next SHA still had work). Stamping **Addressed:** D-1515 for **`:402–409`** is fair. Do **not** stamp “Match C `makekops`.” Do **not** treat fortress PASS as a Kop fight (public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

+7 JS. Playbook §2b “below ~40 insertions on a non-Must-fix port is a failed density handoff **unless C is that small**.” C arm is eight lines. Sibling `S_LIZARD` / PM_NINJA shipped the next SHA (`cf3c5701`) instead of one `m_initweap` envelope. Thin sequential peels; the C size carve-out holds. Did not glue `set_mimic_sym`.

## Branch-by-branch confirm

1. `!rn2(4)` → `m_initthrow(CREAM_PIE, 2)` → `rn1(2,3)` quan 3–4. **Match.**
2. Else skip pies; still roll `!rn2(3)`. **Match** (independent ifs).
3. `!rn2(3)` → `rn2(2)` CLUB else RUBBER_HOSE → `mongets`. **Match.**
4. Both fail: empty kit besides later `rn2(75)` which cannot add an item (`rnd_offensive_item==0`). **Match.**
5. `is_armed` false: this function is not called. Kops are armed. **Match.**
6. `makekops` absent. **Caller omit.**
7. **Public-unhit** until shop theft or wizard `#genesis` Kop.

## Callers / RNG ledger

C: `makekops` / explicit `makemon(PM_KEYSTONE_KOP,…)`. JS: only the latter path exists. New `rn2`/`rn1` only inside this arm. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **17**/17 (C/JS arm; four Kop PMs `is_armed`; 200 kops pies=51 weapons=71 clubs=30 hoses=41; pie quan 3–4; gecko no kit; salamander D-0556 kept); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until shop theft `makekops`. Cohort is shared-startup, not a Kop screen. Honest.

## Actionable C-wrongs

None in this arm. Remaining **named** (map, not Must-fix): `shk.c` `makekops` is still **NOT FOUND** and was not named in `c-js-map` at this SHA — that is spawn-path debt, not a kit contradiction. S_LIZARD / PM_NINJA are the next Open (D-1516). Do not Must-fix “should have glued S_LIZARD in this SHA” (density, not C-wrong). Do not Must-fix `rnd_offensive_item` (already 0).

Verdict: **ACCEPT-WITH-DEBT**
