# Review 343 — 970c6097 — zap.c bhit shade_miss (D-1383)

## Metadata
- Full / short hash: `970c60976ebfbe6fa31b378c0f6374c2d60f79aa` / `970c6097`
- Parent: `6077050a` (D-1382). This file audits **this SHA only** (fifth of eight `js/` commits since review **338**). Archive **Addressed:** D-1383 `970c6097` already has the short hash (filled by D-1384).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 18:26:20 +0200
- D-id: **D-1383**
- Stats: 10 files, +105 / −34 — `js/zap.js` +19 / −6; `js/mhitm.js` comments; LOOP-QUEUE refill of later Open rows.
- Claims to close: Open `zap.c` `shade_miss` caller (named from D-1354 / D-1382). Not mthrowu. `reviews/loop-2026-08-15/` has no unpaid bhit shade Must-fix.
- JS / map: `zap.js` `bhit`; callee `mhitm.js` `shade_miss`. `c-js-map/turns.md`. `mhitm_ad_phys` / M_AP_OBJECT / WEB / throwit fly still named.
- Prior reviews this SHA claims to close: D-1382 follow-up named this Open.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit shade_miss so a thrown or kicked missile actually passes harmlessly through a shade and keeps flying, instead of always stopping on the monster.”

C `zap.c` `bhit` `:3984–3992`:

```
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

Then `if (mtmp)` stops THROWN/KICKED. ZAPPED_WAND does **not** call `shade_miss`.

C `throwit` `:1674–1677` always calls `bhit(..., THROWN_WEAPON or THROWN_TETHERED)`. JS `throwit` only calls `bhit` for tethered; ordinary throws still inline a fly loop that **stops on any `m_at`**. Named.

Old JS: stub comment then always stop.

The diff **does** thrown/kicked `shade_miss(youmonst, mtmp, obj, true, true)` then `mtmp=null` so the loop continues. It does **not** port M_AP_OBJECT skip or WEB stick. Named. Kick (`dokick.js`) already calls `bhit(KICKED_WEAPON)`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhit` shade skip | C `:3984–3986`, **wired** | THROWN \|\| KICKED |
| `shade_miss` | C `:2016–2051`, **imported live** | D-1341 |
| ZAPPED_WAND | C, **wired skip** | still `fhitm`; no shade_miss |
| M_AP_OBJECT / FLASHED_LIGHT | C `:3986–3991`, **named omit** | already later Open |
| WEB stick | C, **named omit** | already later Open |
| throwit ordinary fly | C `:1674` uses `bhit`, **named omit** | JS inline still stops |
| `hmon` shade | C, **named omit** | D-1384 next |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the wrapper.

## C ↔ JS fidelity

JS:

```
            if (mtmp && (weapon === THROWN_WEAPON || weapon === KICKED_WEAPON)
                && await shade_miss(game.youmonst, mtmp, obj, true, true)) {
                mtmp = null;
            }
```

That is C’s `shade_miss` conjunct only — not the M_AP_OBJECT or. Kick + tethered throw go through this `bhit`. Silver/`shade_glare` still stop. ZAPPED_WAND unchanged. Match the keep-path they stamped.

Ordinary `throwit` still inlines `:2297–2301` `if (mon) { hitmon=mon; break; }` with **no** `shade_miss`. C would have gone through this new `bhit` arm. D-log names that. The git **subject** still says “a thrown or kicked missile.” Thrown-via-`bhit` is true; thrown-via-`throwit` is not. That is overclaim, not a C-wrong inside `bhit`.

Hallucination check: “Match C `bhit` shade_miss” while **`shade_miss` is live** is not a dispatch-stub lie. Do **not** stamp “Match C `throwit` fly.” Do **not** stamp “Match C M_AP_OBJECT skip.”

## Hallucinations / overclaim

Subject says a thrown or kicked missile passes through a shade instead of always stopping. **True for `bhit` THROWN/KICKED** (kick; tethered throw; any other live `bhit` caller). **False for ordinary `throwit` fly** until that stand-in calls `bhit` or `shade_miss`. Stamping **Addressed:** D-1383 for `:3984–3986` is fair. Do **not** treat fortress PASS as a dart through a shade.

## Density

One caller of an already-live helper. ~13 lines of JS. Playbook §2b thin sibling of D-1382. Did not glue `hmon` (next SHA). Did not glue M_AP_OBJECT (already Open).

## Branch-by-branch confirm

1. Kicked club vs shade (`dmgval` 0): clear mtmp; fly; wake. Match.
2. Tethered THROWN vs shade: same via `bhit`. Match.
3. Silver saber: shade_miss FALSE; stop. Match.
4. Gnome: stop. Match.
5. ZAPPED_WAND: no shade_miss; `fhitm`. Match.
6. Ordinary throwit dart: still stops. Named.
7. **Public-unhit** unless a session kicks or tethers through a shade.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **13**/13 (C/JS grep; thrown dart + kicked club harmlessly + wake + fly; silver stop; gnome stop; empty short-circuit; ZAPPED_WAND no shade_miss; Rule #2). That “thrown dart” almost certainly called `bhit` directly — it would **not** have caught throwit’s inline stop. green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The `bhit` arm matches `:3984–3986`. throwit fly is a named omit of a **different** function, already in the map.

Named omits (map / already-Open, not Must-fix):

1. throwit THROWN_WEAPON fly still inlines without `shade_miss`
2. M_AP_OBJECT skip (already Open)
3. WEB stick (already Open)
4. `hmon` shade_miss (shipped D-1384)
5. `mhitm_ad_phys` (already Open)

Do not Must-fix “ZAPPED_WAND shade_miss” (C does not). Do not Must-fix “ohitmon on kicked shade dart” (C flies).

## Callers / RNG ledger

C `bhit` THROWN/KICKED: no extra die. JS same. Ordinary throwit still stops (no new die either). Public fortress never kicks through a shade.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `bhit` thrown/kicked now `shade_miss`-clears a shade and keeps flying; ordinary `throwit` fly stays named.
- Must-fix stays empty for this SHA.
