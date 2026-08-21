# Review 352 — adfd4533 — zap.c bhit M_AP_OBJECT skip (D-1392)

## Metadata
- Full / short hash: `adfd45331a4934af8855db10226afcf582fa2238` / `adfd4533`
- Parent: `a4923869` (D-1391). This file audits **this SHA only** (sixth of nine `js/` commits since review **346**). Archive **Addressed:** D-1392 `adfd4533` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 21:20:25 +0200
- D-id: **D-1392**
- Stats: 9 files, +126 / −38 — `js/zap.js` +39 / −11 (`bhit_xyglyph_known_monster` + same `if` as D-1383).
- Claims to close: Open `zap.c` `bhit` M_AP_OBJECT skip (named from D-1383). Not WEB. Review **343** named this or. `reviews/loop-2026-08-15/` has no unpaid mimic-skip Must-fix.
- JS / map: `zap.js` `bhit`. `c-js-map/turns.md`. WEB stick / throwit fly / FLASHED_LIGHT DISP_BEAM still named.
- Prior reviews this SHA claims to close: **343** named M_AP_OBJECT as the other conjunct of `:3984–3992`.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit M_AP_OBJECT skip so a thrown or kicked missile actually flies over a mimic pretending to be an object, instead of always stopping on the monster.”

C `zap.c` `bhit` `:3983–3992` (same `if` as D-1383 shade):

```
        xyglyph = glyph_at(x, y);
        if (mtmp && (((weapon == THROWN_WEAPON || weapon == KICKED_WEAPON)
                      && (shade_miss(&gy.youmonst, mtmp, obj, TRUE, TRUE)
                          || (M_AP_TYPE(mtmp) == M_AP_OBJECT
                              && !glyph_is_monster(xyglyph)
                              && !glyph_is_warning(xyglyph)
                              && !glyph_is_invisible(xyglyph))))
                     || (weapon == FLASHED_LIGHT
                         && M_AP_TYPE(mtmp) == M_AP_OBJECT)))
            mtmp = (struct monst *) 0;
```

C comment `:3977–3982`: hero is aiming over the apparent object unless the gbuf already shows a monster/warning/`I`. FLASHED_LIGHT skips every object-mimic with **no** glyph gate (furniture mimics wait for `flash_hits_mon`). ZAPPED_WAND does **not** take this skip. `M_AP_OBJECT = 2` (`monst.h:54`).

C `throwit` still calls `bhit(THROWN_WEAPON)`. JS ordinary `throwit` still inlines a fly loop that stops on any `m_at` (review **343**). Named.

Old JS: D-1383 only `shade_miss` then `mtmp=null`; mimic-as-object still stopped the missile.

The diff **does** add `bhit_xyglyph_known_monster(loc)` (disp_kind monster/`I` + `glyph_is_invisible` + `def_warnsyms[].ch`) and extend the existing `if` to C’s `|| (M_AP_OBJECT && !known_mon)` plus FLASHED_LIGHT `M_AP_OBJECT`. It does **not** port WEB stick, throwit fly, or FLASHED_LIGHT DISP_BEAM. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| M_AP_OBJECT skip | C `:3986–3992`, **wired** | thrown/kicked + FLASHED_LIGHT |
| `bhit_xyglyph_known_monster` | C `glyph_is_monster/warning/invisible`, **clone** | gbuf stand-in |
| `glyph_is_invisible` | C display.h, **imported live** | remembered I |
| `shade_miss` | C, **already live** | D-1383; still first conjunct |
| `M_AP_TYPE` / `M_AP_OBJECT` | C 2, **wired** | const.js |
| FLASHED_LIGHT skip | C `:3990–3991`, **wired** | no glyph gate |
| ZAPPED_WAND | C, **wired skip** | still `fhitm` |
| WEB stick | C `:3926–3938`, **named omit** | later D-1393 |
| throwit fly | C via `bhit`, **named omit** | still inlines |
| FLASHED_LIGHT DISP_BEAM | C `:3861`, **named omit** | JS still DISP_FLASH |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the mimic conjunct (`M_AP_TYPE` is a field). `shade_miss` RNG unchanged (still first, still short-circuits the mimic test when true). WEB `!rn2(3)` is not this SHA.

## C ↔ JS fidelity

JS operator shape matches C: `mtmp && ((THROWN||KICKED) && (shade_miss || (M_AP_OBJECT && !known))) || (FLASHED_LIGHT && M_AP_OBJECT)`. `await shade_miss` is still evaluated before the mimic or, so a shade mimic still burns D-1383 first. Match `:3984–3992`.

`known_mon` is De Morgan of C’s three `!glyph_is_*`: true if monster **or** warning **or** invisible. Then skip mimic only when `M_AP_OBJECT && !known_mon` — hero did not already see a monster/`I`/warning on that cell. Early-false for `disp_kind` object/terrain/trap matches “looks like an object.” `glyph_is_invisible(loc)` is the live remembered-I helper, not a stub.

Clone risk: JS has no integer glyph ids. `def_warnsyms[].ch` vs `glyph_is_warning(xyglyph)` can disagree if `disp_ch` collides. D-log names the analogue. Do not treat a colliding letter as a Must-fix unless a session shows it; the keep-path (object-kind cell, unsensed mimic) is C’s fly-over.

FLASHED_LIGHT: skip every `M_AP_OBJECT` with no glyph test. Match `:3990–3991`. Whether JS camera/flash actually passes `FLASHED_LIGHT` into this `bhit` is still named (DISP_BEAM). The conjunct is not a stub.

ZAPPED_WAND: weapon is neither thrown/kicked nor FLASHED_LIGHT → mimic still `fhitm`. Match.

Kick (`dokick` → `bhit(KICKED_WEAPON)`) and tethered throw (`weapon` remapped to THROWN) take the new or. Ordinary `throwit` fly does **not**. Same overclaim family as review **343**.

Hallucination check: “Match C M_AP_OBJECT skip” while **the conjunct is in the live `bhit` `if` and `M_AP_TYPE` is the real field** is not a dispatch-stub lie. The glyph test is an explicit clone, not a fake `true`. Do **not** stamp “Match C `glyph_at` integer ids.” Do **not** stamp “Match C throwit fly.” Do **not** stamp “Match C WEB stick.”

## Hallucinations / overclaim

Subject says a thrown or kicked missile flies over a mimic pretending to be an object instead of always stopping. **True for `bhit` THROWN/KICKED** when the gbuf analogue is not monster/`I`/warning. **True for FLASHED_LIGHT M_AP_OBJECT** inside this `if`. **False for ordinary `throwit` fly** until that stand-in calls `bhit`. **False for ZAPPED_WAND** (C hits). D-log “unsensed object-glyph fly / monster/I/warning glyph stop / ZAPPED_WAND fhitm / shade_miss regression” are the right falsifiers. Stamping **Addressed:** D-1392 for `:3986–3992` is fair. Do **not** treat fortress PASS as a dart over a mimic.

## Density

The other conjunct of an `if` D-1383 already opened, plus the gbuf analogue that conjunct needs. ~40 lines of JS. Playbook §2b sibling of D-1383. Did not glue WEB (next Open). Did not re-open shade_miss.

## Branch-by-branch confirm

1. Unsensed mimic-as-object, thrown/kicked: `mtmp=null`; fly. Match.
2. Same cell already monster/`I`/warning: no skip; stop. Match `:3987–3989`.
3. Revealed mimic (`M_AP_NOTHING`): no skip. Match.
4. Kick: same or. Match.
5. Shade first: D-1383 still wins; mimic or not reached. Match.
6. Gnome (not mimic): stop. Match.
7. ZAPPED_WAND: `fhitm`. Match.
8. FLASHED_LIGHT + M_AP_OBJECT: skip, no glyph gate. Match.
9. WEB: still fly-through. Named (later D-1393).
10. Ordinary throwit: still inline stop. Named.
11. **Public-unhit** until a session throws/kicks over a mimic-as-object via `bhit`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `M_AP_OBJECT = 2` is C’s enum, not a recorded mimic coordinate. Plain ESM.

## Verification

Journal: private canary **16**/16 (C/JS grep; unsensed object-glyph fly; monster/I/warning glyph stop; kicked skip; revealed mimic stop; gnome stop; ZAPPED_WAND fhitm; shade_miss regression; FLASHED_LIGHT skip; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not a mimic skip.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The `:3986–3992` or is wired; the glyph helper is a named clone of gbuf tests, not a stub that always returns false.

Named omits (map / already-Open, not Must-fix):

1. WEB stick `!rn2(3)` (already Open at this SHA; later D-1393)
2. throwit THROWN_WEAPON fly still inlines without this skip
3. FLASHED_LIGHT DISP_BEAM / `flash_hits_mon` continue
4. integer `glyph_is_warning` (def_warnsyms ch stand-in)
5. skiprange rocks; shkcatch; map_invisible on stop

Do not Must-fix “ZAPPED_WAND also skips object-mimics” (C does not). Do not Must-fix “skip furniture mimics on thrown” (`M_AP_FURNITURE` is not in this or). Do not Must-fix “evaluate M_AP before shade_miss” (C is shade first).

## Callers / RNG ledger

C mimic skip: no extra die. JS same. Public fortress never takes this envelope via `bhit`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `bhit` thrown/kicked now flies over unsensed object-mimics (and FLASHED_LIGHT skips all of them) via C’s shade-or-M_AP `if`; throwit fly and WEB stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1392 `adfd4533` already stamped.
