# Review 407 — 4dde6eeb — uhitm.c mhitm_ad_phys poison leftover (D-1447)

## Metadata
- Full / short hash: `4dde6eeb1dce737a0a6fe871a07c05c45744deb5` / `4dde6eeb`
- Parent: `ed218e86` (D-1446). This file audits **this SHA only** (seventh of nine `js/` commits since review **400**). Archive **Addressed:** D-1447 `4dde6eeb` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 05:18:49 +0200
- D-id: **D-1447**
- Stats: 9 files, +174 / −36 — `js/mhitm.js` +97 / −12. Docs-only besides that file.
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` poison leftover (named from D-1415 / D-1442 / review **402** / **375**). Not rustm. `reviews/loop-2026-08-15/` has no unpaid m-vs-m wep-poison Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_phys` / `mhitm_really_poison` / `permapoisoned`. `c-js-map/turns.md`. mhitu `poisoned()` / `mhitm_ad_drst` 1/8 / worm-shrieker still named.
- Prior reviews this SHA claims to close: **402** named poison leftover; **375** named `mhitm_really_poison`.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys poison leftover so a poisoned or Grimtooth monster weapon can apply mhitm_really_poison after rustm, instead of skipping the 1/4 leftover.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4182–4189` after D-1442 rustm, still inside `else if (mwep)`:

```
            if (mhm->damage)
                rustm(mdef, mwep);
            if ((mwep->opoisoned || permapoisoned(mwep)) && !rn2(4)) {
                mhitm_really_poison(magr, mattk, mdef, mhm);
            }
```

Poison is **not** gated on leftover damage (unlike rustm). `permapoisoned` `:2837–2840` is Grimtooth only. Callee `mhitm_really_poison` `:3104–3118` is m-vs-m only (not `mcan`, not AD_DRST 1/8):

```
    if (gv.vis && canspotmon(magr))
        pline("%s %s was poisoned!", s_suffix(Monnam(magr)), mpoisons_subj(...));
    if (resists_poison(mdef)) { vis both → "doesn't seem to affect"; }
    else { mhm->damage += rn1(10, 6);
           if (damage >= mhp && vis && canspotmon(mdef)) "deadly..."; }
```

`mpoisons_subj` `:149–153`: AT_WEAP uses `opoisoned` **not** `permapoisoned` (Grimtooth without `opoisoned` says “attack”). mhitu `:4107` `poisoned()` is a **different** site.

Old JS: rustm live; leftover skipped poison so `opoisoned` / Grimtooth never added `rn1(10,6)`.

The diff **does** add `permapoisoned`, `mpoisons_subj_mm`, `resists_poison_mm`, `mhitm_really_poison`, and the `!rn2(4)` call after rustm. It **does not** port mhitu `poisoned()` / `mhitm_ad_drst` 1/8 / purple-worm cap / worn poison grants. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| leftover `!rn2(4)` | C `:4184–4189`, **wired this SHA** | not gated on leftover dmg |
| `mhitm_really_poison` | C `:3104–3118`, **C callee** | |
| `permapoisoned` | C `artifact.c:2837`, **C callee** | Grimtooth via `is_art` |
| `mpoisons_subj_mm` | C `mhitu.c:145`, **clone** | mhitu.js cycle |
| `resists_poison_mm` | C `resists_poison`/`Resists_Elem`, **clone subset** | mresists\|mextrinsics\|mintrinsics |
| `_mm_vis` | C `gv.vis`, **pre-existing** | |
| `rn1(10,6)` | C `:3115`, **live** | `rn2(10)+6` |
| mhitu `poisoned()` | C `:4107`, **named omit** | |
| `mhitm_ad_drst` 1/8 | C `:3131`, **named omit** | |
| purple worm vs shrieker | C `:4191+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** always `rn2(4)` when `opoisoned||Grimtooth`; then `rn2(10)+6` unless resist. Public fortress does not need mon-vs-mon poisoned wep.

## C ↔ JS fidelity

Order matches `:4182–4189`: rustm iff leftover; then poison iff `opoisoned || permapoisoned` and `!rn2(4)`. Artifact that zeros leftover still rolls poison. Bite nulls `mwep` so neither rustm nor poison. DEADMONSTER after artifact returns before both. Match D-1442 plus this leftover.

`mhitm_really_poison` is a line-for-line port of `:3107–3118`. `_mm_vis` ≡ `gv.vis`. Resist skip adds **no** HP. Else `rn1(10,6)` then deadly pline when leftover ≥ mhp (the HP subtract is later in `mdamagem`; the pline is a warning). **Callee is not a stub.**

`permapoisoned` is `is_art(ART_GRIMTOOTH)`. Match. Grimtooth without `opoisoned` still takes the leftover (`||`), then `mpoisons_subj` says “attack” because it only checks `opoisoned`. Match `:153`.

`resists_poison_mm` is the `Resists_Elem` monster-bit subset. Worn/artifact POISON_RES grants named. Orc intrinsic MR_POISON keep-path matches.

Hallucination check: “Match C leftover `mhitm_really_poison`” while **the helper adds `rn1(10,6)` and C-shaped vis plines** is **not** a dispatch-stub lie. “Match C mhitu `poisoned()`” **would** be. “Match C AD_DRST 1/8 `mhitm_ad_drst`” **would** be.

## Hallucinations / overclaim

Subject says a poisoned or Grimtooth monster weapon can apply `mhitm_really_poison` after rustm instead of skipping the 1/4 leftover. **True:** `!rn2(4)` after rustm; not gated on leftover; Grimtooth without `opoisoned`; resist skip; extras 6..15; deadly pline; bite nulls mwep. **False until named** for mhitu hero-hit `poisoned()`, AD_DRST 1/8, worm-shrieker cap, worn poison grants. Stamping **Addressed:** D-1447 for `:4184–4189` + `:3104–3118` is fair. Do **not** stamp “Match C `poisoned()`.” Do **not** treat fortress PASS as mon-vs-mon poison.

## Density

One leftover plus its C callee and two tiny helpers. ~80 lines of JS. Playbook §2b right size. Did not glue AD_DRST. Acceptable.

## Branch-by-branch confirm

1. Unpoisoned club: no `rn2(4)`. Match.
2. Poisoned wep, `!rn2(4)`, no resist: `rn1(10,6)` added. Match `:3115`.
3. Orc resist: vis pline; no HP. Match `:3110–3113`.
4. Grimtooth `!opoisoned`: still rolls `rn2(4)`; subj “attack”. Match.
5. Leftover 0 after artifact: rustm skip; poison still rolls. Match.
6. AT_BITE: `mwep` nulled; no poison. Match `:4133–4134`.
7. Deadly pline when leftover ≥ mhp and vis. Match `:3116–3117`.
8. mhitu `poisoned()` / AD_DRST 1/8 absent. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `_mm_vis` is C `gv.vis`, not a trace index. `rn2(4)` is C’s 1/4, not ALIGN.

## Verification

Journal: private canary **14**/14 (C/JS grep; unpoisoned club dmgval-only; poisoned gnome extras 6..15; orc resist no HP; bite nulls mwep; vis poisoned/resist/deadly plines; Grimtooth `rn2(4)` without opoisoned; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a poisoned m-vs-m hit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Leftover reaches live `mhitm_really_poison`. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. mhitu `mhitm_ad_phys_u` `poisoned()` (`:4107`)
2. `mhitm_ad_drst` 1/8 (uhitm / mhitu / mhitm)
3. purple worm vs shrieker cap (`:4191+`)
4. worn/artifact `POISON_RES` beyond `Resists_Elem` bits

Do not Must-fix “poison should require leftover damage” (C does not). Do not Must-fix “Grimtooth should say weapon.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `mdamagem` → `mhitm_adtyping` AD_PHYS. New RNG: `rn2(4)` then maybe `rn2(10)`. Public fortress does not need this path.

Verdict: **ACCEPT-WITH-DEBT**
