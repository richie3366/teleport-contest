# Review 342 — 6077050a — mthrowu.c m_throw shade_miss (D-1382)

## Metadata
- Full / short hash: `6077050aac5a0ddf2fb28af1fbb675c7b6d17a33` / `6077050a`
- Parent: `e0594454` (D-1381). This file audits **this SHA only** (fourth of eight `js/` commits since review **338**). Archive **Addressed:** D-1382 `6077050a` already has the short hash (filled by D-1383).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 18:08:08 +0200
- D-id: **D-1382**
- Stats: 10 files, +91 / −33 — `js/mthrowu.js` +22 / −9; `js/mhitm.js` comment.
- Claims to close: Open `mthrowu.c` `shade_miss` caller (named from D-1354 / reviews **303** / **316**). Not uhitm hmon. `reviews/loop-2026-08-15/` has no unpaid mthrowu shade Must-fix.
- JS / map: `mthrowu.js` `m_throw`; callee `mhitm.js` `shade_miss` (D-1341) + `dmgval` shade/`shade_glare` (D-1354). `c-js-map/turns.md` + `debt.md`. zap `bhit` / hmon / `mhitm_ad_phys` still named at this SHA.
- Prior reviews this SHA claims to close: **316** named the remaining `shade_miss` callers after dmgval glare.

## Intent vs deliverable

Git subject promises: “Match C mthrowu.c m_throw shade_miss so a monster missile actually passes harmlessly through a shade and keeps flying, instead of always calling ohitmon.”

C `mthrowu.c` `m_throw` `:680–686`:

```
        if (mtmp && shade_miss(mon, mtmp, singleobj, TRUE, TRUE)) {
            mtmp = (struct monst *) 0;
        } else if (mtmp) {
            if (ohitmon(mtmp, singleobj, range, TRUE))
                break;
```

Callee `uhitm.c` `shade_miss` `:2016–2051` (JS `mhitm.js`): `mdef` must be PM_SHADE and `!(obj && dmgval(obj,mdef))`; thrown `The(what)` pline; `msleeping=0`; return TRUE.

Old JS: stub comment then always `ohitmon`.

The diff **does** `await shade_miss(..., true, true)` then skip `ohitmon` / keep flying. It does **not** assign `mtmp=null` (C does); the `else if (mtmp)` makes that equivalent. Silver/`shade_glare` still `ohitmon`. zap `bhit` / hmon still named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_throw` shade skip | C `:680–686`, **wired** | thrown verbose |
| `shade_miss` | C `:2016–2051`, **imported live** | D-1341 |
| `dmgval` shade/glare | C `weapon.c`, **imported live** | D-1354 |
| `ohitmon` | C, **imported live** | else arm |
| zap `bhit` / hmon | C, **named omit** | D-1383 / D-1384 next |
| `mhitm_ad_phys` | C, **named omit** | already Open |
| iron bars / sink / gem | C, **named omit** | later in the loop |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the wrapper; `shade_miss` uses `dmgval` (no extra die); `ohitmon` still burns `rnd(20)` when not skipped.

## C ↔ JS fidelity

`if (mtmp && shade_miss) { /* keep going */ } else if (mtmp) { ohitmon }` is C’s if/else. JS does not need to null `mtmp` because it is not reused after the skip. Hero-cell arm remains the `else`. Match `:680–687`.

Callee: PM_SHADE + `dmgval` zero → harmlessly-through + wake; silver/`shade_glare` nonzero → FALSE → `ohitmon`. Verbose thrown uses `The(what)`, not `Your`. Match `:2027–2049`. Empty `mtmp` short-circuits (no `shade_miss` call). Match.

Hallucination check: “Match C `m_throw` shade_miss” while **`shade_miss` is live** is not a dispatch-stub lie. Do **not** stamp “Match C zap.c `bhit`.” Do **not** stamp “Match C `hmon`.”

## Hallucinations / overclaim

Subject says a monster missile passes through a shade and keeps flying instead of always `ohitmon`. **True on the keep-path** when `dmgval` is zero vs PM_SHADE. **False for silver/glare** (C `ohitmon`s; JS does too). Stamping **Addressed:** D-1382 for `:680–686` is fair. Do **not** treat fortress PASS as a monster dart through a shade.

## Density

One caller of an already-live helper. ~12 lines of real JS. Playbook §2b thin — first of three sibling `shade_miss` callers split across SHAs. Each was the queued first Open. Process waste vs packing `m_throw`+`bhit`+`hmon`, but not a C-wrong of this SHA.

## Branch-by-branch confirm

1. No monster: skip shade_miss; hero-cell / fly. Match.
2. Shade + dart (`dmgval` 0): skip ohitmon; wake; fly. Match.
3. Shade + silver saber: `dmgval` nonzero; ohitmon. Match.
4. Gnome: shade_miss FALSE; ohitmon. Match.
5. **Public-unhit** unless a session has a monster missile through a shade.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS grep; dart/club harmlessly + wake + no `rnd(20)` + fly; silver glare ohitmon; gnome ohitmon; empty short-circuit; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The skip matches `:680–686`; the callee is live.

Named omits (map / later Open, not Must-fix):

1. zap.c `bhit` shade_miss (shipped D-1383)
2. uhitm.c `hmon` shade_miss (shipped D-1384)
3. `mhitm_ad_phys` shade_miss (already Open)
4. iron bars / sink / gem catch

Do not Must-fix “null mtmp after skip” (else-if is equivalent). Do not Must-fix “ohitmon on shade dart” (C skips).

## Callers / RNG ledger

C: no extra die in `shade_miss`; `ohitmon` skipped so no `rnd(20)`. JS same. Public fortress never hits this cell.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: monster missiles now `shade_miss` through a shade and keep flying; hero `bhit`/`hmon` were still named at this SHA.
- Must-fix stays empty for this SHA.
