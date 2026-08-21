# Review 345 — 5be02746 — mhitm.c mdamagem AD_CONF leftover (D-1385)

## Metadata
- Full / short hash: `5be027461deaefd0960db56a858f36cc751cc413` / `5be02746`
- Parent: `ec703f48` (D-1384). This file audits **this SHA only** (seventh of eight `js/` commits since review **338**). Archive **Addressed:** D-1385 `5be02746` already has the short hash (filled by D-1386).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 18:46:31 +0200
- D-id: **D-1385**
- Stats: 10 files, +136 / −28 — `js/mhitm.js` +58 / −3 (`mhitm_ad_conf` + `mdamagem` arm).
- Claims to close: Open `mhitm.c` `mdamagem` AD_CONF leftover (named from D-1352 / review **314**). Not STON. `reviews/loop-2026-08-15/` has no unpaid AD_CONF Must-fix.
- JS / map: `mhitm.js` `mdamagem` / `mhitm_ad_conf`. `c-js-map/turns.md` + `debt.md`. uhitm/mhitu arms / STUN/FIRE leftover still named.
- Prior reviews this SHA claims to close: **314** named CONF leftover after STON.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_conf so a monster's AD_CONF hit actually confuses the defender, instead of only applying leftover HP.”

C `uhitm.c` `mhitm_ad_conf` mhitm arm `:3713–3724` via `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping`:

```
        if (!magr->mcan && !mdef->mconf && !magr->mspec_used) {
            if (gv.vis && canseemon(mdef))
                pline_mon(mdef, "%s looks confused.", Monnam(mdef));
            mdef->mconf = 1;
            mdef->mstrategy &= ~STRAT_WAITFORU;
        }
```

Does **not** set `mspec_used`. Does **not** zero `mhm->damage` (unlike HALU/BLND). uhitm you-as-agr and mhitu you-as-def are other arms. `AD_CONF` is `monattk.h:67` **25**.

Old JS: AD_CONF fell through generic `mdamagem` HP.

The diff **does** add `AD_CONF=25`, `mhitm_ad_conf` (mhitm arm only), and a leftover-HP envelope copied from AD_STON. It does **not** port uhitm/mhitu. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_conf` mhitm | C `:3713–3724`, **wired** | vis pline + mconf + WAITFORU |
| `mdamagem` AD_CONF | C `:1059` leftover, **wired** | keeps `d()` |
| `AD_CONF` | C 25, **wired** | not a fake token |
| `_mm_vis` | C `gv.vis`, **pre-existing live** | set in `mattackm` |
| `pline_mon` | C, **imported live** | |
| uhitm you-as-agr | C `:3694–3700`, **named omit** | |
| mhitu you-as-def | C `:3701–3712`, **named omit** | `rn2(4)` + `make_confused` |
| STUN / FIRE leftover | C, **named omit** | already Open STUN |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in `mhitm_ad_conf`. Leftover `d(damn,damd)` already burned in `mdamagem` before the arm (C same). mhitu’s `rn2(4)` is not this SHA.

## C ↔ JS fidelity

JS `void mhm` so leftover `d()` stays. Guard `!mcan && !mconf && !mspec_used`. Vis: `_mm_vis && canseemon(mdef)` then `pline_mon`. `mconf=1`; clear `STRAT_WAITFORU`. Cancelled / already-conf / `mspec_used`: skip confuse, still apply leftover (unless 0). Match `:3719–3724` + `:1070–1073`.

Does **not** zero dice (HALU/BLND do). Does **not** set `mspec_used` (C comment: no real duration). `gazemm` already returns `mdamagem` after the gaze pline; cancelled gaze returns MISS first so no leftover confuse. Match C `gazemm` `:802`.

JS only implements the mhitm arm. `mdamagem` is mon-vs-mon; youmonst uhitm/mhitu go other files. Named omit of those arms is honest.

Hallucination check: “Match C `mhitm_ad_conf`” while **the mhitm body is live** is not a dispatch-stub lie. Do **not** stamp “Match C mhitu `make_confused`.” Do **not** stamp “Match C AD_STUN leftover.”

## Hallucinations / overclaim

Subject says a monster’s AD_CONF hit actually confuses the defender instead of only leftover HP. **True on the keep-path** for vis or invis mon-vs-mon when `!mcan && !mconf && !mspec_used`. **False until named for you-as-agr / you-as-def.** Stamping **Addressed:** D-1385 for `:3713–3724` is fair. Do **not** treat fortress PASS as an umber hulk gaze leftover.

## Density

One `mhitm_adtyping` arm plus the leftover envelope this file already used for STON. ~58 lines of JS. Playbook §2b right size. Did not glue STUN/FIRE. Did not glue unskilled fireball (next SHA).

## Branch-by-branch confirm

1. Umber gaze leftover `d()==0`, vis, !mconf: looks confused; mconf=1; no HP. Match.
2. Cancelled gaze (`mcan` / !cansee / sleep): gazemm MISS; no mdamagem. Match.
3. Already mconf: skip pline; leftover HP. Match.
4. `mspec_used`: skip confuse; leftover HP. Match.
5. Bite AD_CONF with `d()>0`: confuse + HP. Match.
6. STON arm unchanged. Match.
7. **Public-unhit** unless a session has vis mon-vs-mon AD_CONF.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `25` is C’s `AD_CONF`. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS shape; umber leftover 0 confuses; cancelled miss; already-conf skip pline; bite leftover + confuse; mspec_used leftover no confuse; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD `1f94d5e3` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The mhitm arm matches `:3713–3724` and leftover `d()` is kept.

Named omits (map / already-Open, not Must-fix):

1. uhitm you-as-agr AD_CONF
2. mhitu you-as-def (`hitmsg` + `rn2(4)` + `make_confused`)
3. AD_STUN leftover (already Open)
4. AD_FIRE leftover

Do not Must-fix “zero leftover like HALU” (C keeps `d()`). Do not Must-fix “set `mspec_used`” (C does not).

## Callers / RNG ledger

C mhitm: no extra die in the conf arm. JS same. Public fortress never hits this leftover.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_CONF now sets `mconf` and keeps leftover `d()`; uhitm/mhitu stay named.
- Must-fix stays empty for this SHA.
