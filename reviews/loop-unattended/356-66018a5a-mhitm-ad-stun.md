# Review 356 — 66018a5a — uhitm.c mhitm_ad_stun leftover (D-1396)

## Metadata
- Full / short hash: `66018a5abf951a2dfb5897683ec146ef7459aa1e` / `66018a5a`
- Parent: `0a5d4447` (docs-only review D-1387–D-1395). This file audits **this SHA only** (first of nine `js/` commits since review **355**). Archive **Addressed:** D-1396 `66018a5a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 22:25:17 +0200
- D-id: **D-1396**
- Stats: 11 files, +285 / −142 — `js/mhitm.js` +95 / −8 (`stagger` + `mhitm_ad_stun` + `mdamagem` AD_STUN envelope).
- Claims to close: Open `mhitm.c` `mdamagem` AD_STUN leftover (named from D-1352 / review **345** / **354**). Not CONF. `reviews/loop-2026-08-15/` has no unpaid AD_STUN Must-fix.
- JS / map: `mhitm.js` `mdamagem` / `mhitm_ad_stun` / local `stagger`. `c-js-map/turns.md` + `debt.md`. uhitm/mhitu arms / FIRE leftover / `locomotion()` still named.
- Prior reviews this SHA claims to close: **345** named STUN leftover after CONF; **354** kept it Open after shade_miss.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_stun so a monster's AD_STUN hit actually stuns the defender, instead of only applying leftover HP.”

C `uhitm.c` `mhitm_ad_stun` mhitm arm `:4410–4420` via `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping`:

```
        if (magr->mcan)
            return;
        if (canseemon(mdef))
            pline_mon(mdef, "%s %s for a moment.", Monnam(mdef),
                  makeplural(stagger(pd, "stagger")));
        mdef->mstun = 1;
        mhitm_ad_phys(magr, mattk, mdef, mhm);
        if (mhm->done)
            return;
```

Does **not** check `mconf` / `mspec_used` / already-`mstun` / `STRAT_WAITFORU` (unlike CONF). Does **not** zero leftover `d()` before phys; `mhitm_ad_phys` may `shade_miss` it to 0. Cancelled `mcan` returns **keeping** leftover. uhitm you-as-agr (`!Blind`, no `mcan` gate) and mhitu you-as-def (`hitmsg` + `!mcan && !rn2(4)` `make_stunned` + `damage/=2`) are other arms. `AD_STUN` is `monattk.h:54` **12**.

Callee `mondata.c` `stagger` `:1395–1407` shares locoverbs with `locomotion()`; `locoindx` is 2 if `*def != highc(*def)` else 3 (`hacklib.c` `highc` a–z only). Arrays: floater wobble, small flyer flutter, large flyer stagger, slithy falter, amorphous tremble, `!mmove` pulsate, `nolimbs` falter, else `def`.

Old JS: AD_STUN fell through generic `mdamagem` HP. `gazemm` already returned `mdamagem` after the gaze pline.

The diff **does** add `AD_STUN=12`, local `stagger` (locoindx 2/3 only), `mhitm_ad_stun` (mhitm arm only), and a leftover-HP envelope copied from AD_CONF/STON. It does **not** port uhitm/mhitu. Named. It does **not** retouch `gulpmm` `:1410–1418` (still `makeplural('stagger')` without the helper). Named as locomotion-besides-this-verb.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_stun` mhitm | C `:4410–4420`, **wired** | mcan return; canseemon pline; mstun; phys |
| `mdamagem` AD_STUN | C `:1059` leftover, **wired** | keeps `d()` unless phys zeros |
| `stagger` | C `:1395–1407`, **clone matching this caller** | locoindx 2/3; not `locomotion()` 0/1 |
| `mhitm_ad_phys` | C `:4128+`, **same-file live** | D-1394 shade (later D-1402/1403) |
| `makeplural` / `pline_mon` / `canseemon` | C, **imported live** | objnam / display |
| `is_floater` / `is_flyer` / `slithy` / `amorphous` / `nolimbs` | C `mondata.h`, **imported live** | monsters.js |
| `AD_STUN` | C 12, **wired** | not a fake token |
| uhitm you-as-agr | C `:4394–4402`, **named omit** | `!Blind`; no mcan |
| mhitu you-as-def | C `:4403–4409`, **named omit** | `rn2(4)` + half dmg |
| `locomotion()` | C `:1379–1391`, **named omit** | indices 0/1 |
| `gulpmm` AD_STUN | C `:1410–1418`, **pre-existing clone** | hardcoded “stagger” not this helper |
| AD_FIRE leftover | C, **named omit** | already Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the mhitm stun arm. Leftover `d(damn,damd)` already burned in `mdamagem` before the arm (C same). mhitu’s `rn2(4)` is not this SHA. `mhitm_ad_phys` may later burn `dmgval` / `rn1(4,3)` (D-1402, after this SHA).

## C ↔ JS fidelity

`mdamagem` still rolls leftover `d()` first. `mcan`: JS returns without stun/phys; leftover stays; knockback + HP envelope still runs. Match `:4412–4413` + `:1070–1073`.

`!mcan`: `canseemon(mdef)` only — **not** `_mm_vis && canseemon` (CONF uses vis). Already-stunned still prints and sets `mstun=1`. No `mspec_used`. No `STRAT_WAITFORU` clear. Then live `mhitm_ad_phys` (shade may zero). Match `:4414–4420`.

`stagger(pd, 'stagger')`: first letter is lowercase so `highc` differs → locoindx 2. JS `cap` is false → lowercase verbs. Floater wobble, `msize<=MZ_SMALL` flyer flutter, larger flyer stagger, slithy falter, amorphous tremble, `!mmove` pulsate, `nolimbs` falter, else the passed `def`. `MZ_SMALL=1` matches `monflag.h`. `is_floater` uses generated `mlet` `'S_EYE'`/`'S_LIGHT'` (same as C `S_EYE`/`S_LIGHT` in this port). `makeplural('stagger')` → “staggers”; `makeplural('wobble')` → “wobbles”. Match `:1395–1407` for this lowercase caller. `locomotion()` indices 0/1 are not this helper.

Cancelled gaze (`gazemm` miss before `mdamagem`) still never reaches the arm. Gaze leftover `d()==0` still stuns (then phys/shade). Bite leftover `d()>0` stuns then HP. Match C `gazemm` `:802`.

JS only implements the mhitm arm. `mdamagem` is mon-vs-mon; youmonst uhitm/mhitu go other files. Named omit of those arms is honest.

Hallucination check: “Match C `mhitm_ad_stun`” while **`mhitm_ad_phys` is the live D-1394 function** is not a dispatch-stub lie. Local `stagger` is a clone, but it matches C’s locoindx 2/3 tables for `'stagger'`. Do **not** stamp “Match C mhitu `make_stunned`.” Do **not** stamp “Match C uhitm `!Blind` stagger.” Do **not** stamp “Match C `gulpmm` AD_STUN stagger(ptr).” Do **not** stamp “Match C AD_FIRE leftover.”

## Hallucinations / overclaim

Subject says a monster’s AD_STUN hit actually stuns the defender instead of only leftover HP. **True on the keep-path** for vis or unseen mon-vs-mon when `!mcan` (pline only if `canseemon`). **True for already-stunned** (C reprints). **False until named for you-as-agr / you-as-def.** D-log “gaze leftover HP + stun + WAITFORU kept; cancelled gaze miss; already-stun still prints; bite leftover HP + stun; cancelled leftover HP no stun; mspec_used still stuns; gazemm shade stun then harmlessly; hitmm shade bypass no stun; amorphous tremble” are the right falsifiers (`WAITFORU kept` is a CONF contrast, not a STUN mutation). Stamping **Addressed:** D-1396 for `:4410–4420` + `:1395–1407` is fair. Do **not** treat fortress PASS as a Baalzebub gaze leftover.

## Density

One `mhitm_adtyping` arm plus the leftover envelope this file already used for STON/CONF, plus the six-line C stagger tables needed for the pline. ~95 lines of JS. Playbook §2b right size. Did not glue FIRE. Did not glue SPE_JUMPING (next SHA). Did not rewrite `confer_oc_oprop`.

## Branch-by-branch confirm

1. Gaze leftover `d()==0`, `canseemon`, !mcan: stagger pline; `mstun=1`; phys/shade may zero; no HP. Match.
2. Cancelled gaze (`mcan` / !cansee / sleep): gazemm MISS; no mdamagem. Match.
3. `magr.mcan` inside mdamagem: no pline, no mstun, leftover HP. Match.
4. Already `mstun`: still prints; leftover HP. Match. Unlike CONF.
5. `mspec_used`: still stuns. Match. Unlike CONF.
6. Bite AD_STUN with `d()>0`: stun + phys leftover HP. Match.
7. Shade defender: stun then `shade_miss` zeros leftover. Match D-1394 after this arm.
8. Amorphous `stagger` → “trembles”; floater → “wobbles”. Match locoindx 2.
9. CONF/STON arms unchanged. Match D-1385/D-1352.
10. **Public-unhit** unless a session has vis mon-vs-mon AD_STUN.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `12` is C’s `AD_STUN`. Plain ESM. Local `stagger` is not a trace-shaped verb list.

## Verification

Journal: private canary **15**/15 (C/JS shape; gaze leftover HP + stun + WAITFORU kept; cancelled gaze miss; already-stun still prints; bite leftover HP + stun; cancelled leftover HP no stun; mspec_used still stuns; gazemm shade stun then harmlessly; hitmm shade bypass no stun; amorphous tremble; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (see end-of-iter Score). Fortress PASS is not a stun gaze.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The mhitm arm matches `:4410–4420`; leftover `d()` is kept unless phys/shade zeros; `stagger` matches C’s 2/3 tables for this caller.

Named omits (map / already-Open, not Must-fix):

1. uhitm you-as-agr (`!Blind` stagger + phys; no `mcan`)
2. mhitu you-as-def (`hitmsg` + `!rn2(4)` `make_stunned` + dmg/2)
3. AD_FIRE leftover (already Open)
4. `locomotion()` indices 0/1 (other callers)
5. `gulpmm` `:1410–1418` still `makeplural('stagger')` not `stagger(magr.data,'stagger')` (pre-existing; floaters/oozes print “staggers” there)

Do not Must-fix “skip pline when already stunned” (C reprints). Do not Must-fix “gate on `_mm_vis` like CONF” (C stun uses `canseemon` only). Do not Must-fix “set `mspec_used` / clear WAITFORU” (C does not). Do not Must-fix “zero leftover like HALU” (C then calls phys).

## Callers / RNG ledger

C mhitm arm: no extra die. JS same. Public fortress never hits this leftover. `gulpmm` AD_STUN `tmp=0` is a different switch (already live, wrong verb only).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_STUN now sets `mstun` and runs live phys/shade; uhitm/mhitu and FIRE stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1396 `66018a5a` already stamped.
