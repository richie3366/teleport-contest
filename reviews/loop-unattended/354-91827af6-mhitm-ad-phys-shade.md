# Review 354 — 91827af6 — uhitm.c mhitm_ad_phys shade_miss (D-1394)

## Metadata
- Full / short hash: `91827af67885535877673ad9e2c8b9d8b7b93362` / `91827af6`
- Parent: `7863ae2a` (D-1393). This file audits **this SHA only** (eighth of nine `js/` commits since review **346**). Archive **Addressed:** D-1394 `91827af6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 21:41:28 +0200
- D-id: **D-1394**
- Stats: 9 files, +139 / −32 — `js/mhitm.js` +44 / −4 (`mhitm_ad_phys` + `mdamagem` AD_PHYS).
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` shade_miss (named from D-1341). Not hmon. Review **344** named this after `hmon`. `reviews/loop-2026-08-15/` has no unpaid mhitm-phys Must-fix.
- JS / map: `mhitm.js` `mdamagem` / `mhitm_ad_phys`. `c-js-map/turns.md` + `debt.md`. Kick thick / mwep dmgval / STUN leftover still named.
- Prior reviews this SHA claims to close: **344** named `mhitm_ad_phys`; **345** named STUN/FIRE leftover (not this).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys shade_miss so a monster AD_PHYS blow that reaches mdamagem actually passes harmlessly through a shade, instead of still subtracting leftover dice.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4128–4137`:

```
        struct obj *mwep = MON_WEP(magr);
        boolean vis = canseemon(magr) && canseemon(mdef);
        if (mattk->aatyp != AT_WEAP && mattk->aatyp != AT_CLAW)
            mwep = 0;
        if (shade_miss(magr, mdef, mwep, FALSE, vis)) {
            mhm->damage = 0;
        } else if (kick thick_skinned) …
          else if (mwep) dmgval / gauntlets / artifact …
```

`AT_CLAW=1`, `AT_WEAP=254`. Callee `shade_miss` `:2016–2051` (JS D-1341): not shade **or** `(obj && dmgval(obj,mdef))` → FALSE; else verbose pline, wake, TRUE. Thrown is FALSE (melee). vis is **canseemon both**, not `gv.vis` (that is `hitmm`).

Caller `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping` `case AD_PHYS` `:4791`. Then knockback; if `!mhm.damage` return `hitflags` (usually MISS). `hitmm` `:660` already `shade_miss`s unarmed shades (D-1341) **before** `mdamagem`. `explmm` AD_PHYS skips `hitmm`, so this arm is the remaining shade gate. Silver wep on a **bite** is nulled (`aatyp` not WEAP/CLAW) so still shade_misses.

Old JS: AD_PHYS fell through generic leftover HP.

The diff **does** `mhitm_ad_phys` (MON_WEP, null unless WEAP/CLAW, `shade_miss(..., false, vis)`, zero `mhm.damage`) and a leftover envelope copied from AD_STON/CONF. It does **not** port thick_skinned kick, mwep `dmgval`, youmonst/mhitu arms. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_phys` mhitm | C `:4128–4137`, **wired** | shade only this SHA |
| `mdamagem` AD_PHYS | C `:1059`/`:4791`, **wired** | leftover envelope |
| `shade_miss` | C `:2016–2051`, **imported live** | same file, D-1341 |
| `MON_WEP` | C, **imported live** | weapon.js |
| `AT_WEAP` / `AT_CLAW` | C 254 / 1, **wired** | |
| `canseemon` | C, **imported live** | vis both |
| AT_KICK thick_skinned | C `:4138–4141`, **named omit** | already Open |
| mwep `dmgval` / gauntlets / arti | C `:4142+`, **named omit** | already Open |
| youmonst / mhitu arms | C `:3981+`, **named omit** | |
| AD_STUN leftover | C, **named omit** | already Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this arm. `shade_miss` uses `dmgval` for zero/not-zero (weapon.c D-1354); leftover `d(damn,damd)` already burned in `mdamagem` before `mhitm_adtyping` (C same). Kick `rn1(4,3)` gauntlets is not this SHA.

## C ↔ JS fidelity

JS `mdamagem` already rolled leftover `d()` into `damage` (like C `mhm.damage`). AD_PHYS builds `mhm` with that leftover, calls `mhitm_ad_phys`, then if `done || !damage` knockback + return `hitflags`. Non-zero falls through to the shared knockback + HP (one knockback, not two). C: `mhitm_adtyping` then **always** knockback then `!damage` return. Shade (damage 0): both knockback once and return MISS. Non-shade (damage stays): both knockback once then subtract HP. Match `:1059–1071` on those two keep-paths.

`mhitm_ad_phys`: re-read `MON_WEP`; if `aatyp` is not WEAP/CLAW set `mwep=null`; `shade_miss(magr, mdef, mwep, false, canseemon&&canseemon)`. Success → `mhm.damage=0`. Does **not** set `done` (C does not). Does **not** set HIT. Match `:4128–4137`.

`shade_miss` is the live function: `PM_SHADE` else false; `obj && dmgval` (silver/glare) else false; verbose pline “pass harmlessly through”; `msleeping=0`. `explmm` vs shade: no `hitmm` gate, leftover `d()` would have killed; now zero + harmlessly + exploder still dies on its own HP. D-log canary. Silver on a **claw/weap** keeps `mwep`, `dmgval` nonzero, shade_miss false — leftover HP still applies (mwep **bonus** still named). Silver on a **bite**: JS nulls wep, shade_miss true. Match C `:4133–4134`.

`hitmm` D-1341 unchanged: unarmed melee shade still misses before `mdamagem`. Canary “jackal hitmm regression.”

Hallucination check: “Match C `mhitm_ad_phys` shade_miss” while **`shade_miss` is live and the mhitm body zeros leftover `d()`** is not a dispatch-stub lie. Do **not** stamp “Match C mwep `dmgval`.” Do **not** stamp “Match C AT_KICK thick_skinned.” Do **not** stamp “Match C `mhitm_ad_phys_u`.”

## Hallucinations / overclaim

Subject says a monster AD_PHYS blow that reaches `mdamagem` passes harmlessly through a shade instead of subtracting leftover dice. **True on the keep-path** for explmm / any `mdamagem` AD_PHYS vs shade when the (possibly nulled) wep does not `dmgval`. **False until named for kick thick / mwep bonus / you-as-agr.** Stamping **Addressed:** D-1394 for `:4128–4137` is fair. Do **not** treat fortress PASS as an exploder vs shade.

## Density

One `mhitm_adtyping` arm plus the leftover envelope this file already used for STON/CONF. ~48 lines of JS. Playbook §2b right size. Did not glue STUN/FIRE (Open). Did not glue mwep `dmgval` (next Open). Did not re-open D-1384 `hmon`.

## Branch-by-branch confirm

1. explmm AD_PHYS vs shade, vis: harmlessly; leftover 0; MISS; exploder still dies. Match.
2. Silver mwep on non-WEAP/CLAW: wep nulled; still miss. Match.
3. AT_WEAP silver: `dmgval` nonzero; shade_miss false; leftover HP. Match this SHA (bonus named).
4. Gnome vs gnome: shade_miss false; leftover HP. Match.
5. hitmm unarmed shade: still D-1341 before `mdamagem`. Match.
6. AD_CONF / STON arms unchanged. Match.
7. AT_KICK thick_skinned: leftover HP. Named.
8. **Public-unhit** unless a session has mon-vs-shade AD_PHYS via `mdamagem`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `AT_WEAP=254` is C. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS grep; explmm AD_PHYS vs shade HP+harmlessly+exploder dies; silver mw still miss because aatyp nulls wep; gnome still hurt; jackal hitmm D-1341 regression; AT_WEAP silver keeps mwep and hurts; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not explmm-vs-shade.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `:4128–4137` is live `shade_miss` with C’s wep-null and vis. Remaining `mhitm_ad_phys` body is named Open.

Named omits (map / already-Open, not Must-fix):

1. `mhitm_ad_phys` mwep `dmgval` / gauntlets / `artifact_hit` / rust / poison (already Open)
2. AT_KICK `thick_skinned` (already Open)
3. purple worm vs shrieker cap
4. youmonst `damageum_ad_phys`; mhitu `mhitm_ad_phys_u`
5. `mdamagem` AD_STUN leftover (already Open; next after D-1395)

Do not Must-fix “skip `d()` before shade_miss” (C leftover is already rolled). Do not Must-fix “use `gv.vis` instead of canseemon both” (C mhitm arm is both). Do not Must-fix “set HIT on shade_miss” (C leaves MISS). Do not Must-fix “shade_miss thrown TRUE” (C FALSE here).

## Callers / RNG ledger

C this arm: no new die; `dmgval` is zero/not-zero. JS same. Public fortress likely never hits explmm-vs-shade.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `mdamagem` AD_PHYS now zeros leftover dice through live `shade_miss` after C’s MON_WEP/AT_WEAP|CLAW null; kick thick and mwep `dmgval` stay named Open.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1394 `91827af6` already stamped.
