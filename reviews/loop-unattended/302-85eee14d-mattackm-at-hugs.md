# Review 302 — 85eee14d — mhitm.c mattackm AT_HUGS (D-1340)

## Metadata
- Full / short hash: `85eee14db73ce7db9e6a52e94c13977cba0ed749` / `85eee14d`
- Parent: `fdb30435` (D-1339). This file audits **this SHA only**. Archive **Addressed:** D-1340 `85eee14d` already has the short hash (filled by D-1341).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 06:03:28 +0200
- D-id: **D-1340**
- Stats: 10 files, +108 / −34 — `js/mhitm.js` +31 / −4.
- Claims to close: Open `mhitm.c` AT_HUGS (named from D-1327 / review **301**). Not `shade_miss`. `reviews/loop-2026-08-15/` has no unpaid mon-vs-mon hug Must-fix. Review **289** is mhitu `mattacku` AT_HUGS (different locus).
- JS / map: `mhitm.js` `mattackm` `case AT_HUGS` + `hitmm` squeeze verb; `c-js-map/turns.md`. `shade_miss` still named at this SHA (D-1341 next).
- Prior reviews this SHA claims to close: **289** named mhitm AT_HUGS after mhitu hugs; **288** / D-1339 named it after explmm.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c mattackm AT_HUGS so a hugger actually squeezes another monster when the previous two attacks hit, instead of falling out of mattackm.”

C `mattackm` (`mhitm.c:476–490`):

```
        case AT_HUGS: /* automatic if prev two attacks succeed */
            strike = (i >= 2 && res[i - 1] == M_ATTK_HIT
                      && res[i - 2] == M_ATTK_HIT);
            if (strike) {
                if (failed_grab(magr, mdef, mattk))
                    strike = 0;
                else
                    res[i] = hitmm(magr, mdef, mattk, (struct obj *) 0, 0);
            }
            break;
```

C `hitmm` AT_HUGS verb (`:691–695`): `"squeezes"` unless `magr != u.ustuck`; else FALLTHROUGH `"hits"`. No distmin skip. `failed_grab` already live (`:597–639`).

Old JS: no `AT_HUGS` arm (default `attk=0`). `hitmm` defaulted hugs to `"hits"`.

The diff **does** the exact `== M_ATTK_HIT` gate (not a bitmask; not mhitu’s truthy `sum[i-1] && sum[i-2]`), `failed_grab`, `hitmm(null, 0)`, and the squeeze verb. It does **not** port `shade_miss`. Named. Hugs pass `mwep=NULL` so D-1341 unarmed shade miss will apply on the next SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mattackm` `AT_HUGS` | C `:476–490`, **wired** | was fallthrough |
| `failed_grab` | C `:597–639`, **imported live** | D-1327; no RNG |
| `hitmm` | C `:644`, **imported live** | dieroll 0, no weapon |
| squeeze verb | C `:691–695`, **wired** | unless `magr === u.ustuck` |
| `M_ATTK_HIT` | C `monattk.h:109` `0x1`, **exact ==** | not `& HIT`; not mhitu truthy |
| `shade_miss` | C `hitmm:660`, **named omit** this SHA | |
| silver sear / artifact wep | C `hitmm:706`, **named omit** | hugs pass mwep 0 anyway |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on the hug gate:** none. `hitmm` still rolls `mdamagem` `d(damn,damd)`. `failed_grab` has none. Auto-hit itself has none.

## C ↔ JS fidelity

Predicate is `i>=2 && res[i-1]===M_ATTK_HIT && res[i-2]===M_ATTK_HIT`. C uses `==` not `res[i-1] && res[i-2]`. `M_ATTK_DEF_DIED` (2) is truthy but **not** `== HIT` (1), so a kill on slot 0/1 does not auto-hug (target is usually already gone via the `i>0` dead continue anyway). mhitu D-1327 used truthy sums **and** `ustuck` at range — this SHA correctly does **not** copy that; C mattackm has no `magr==u.ustuck` auto-hit. Match `:477–478`.

No distmin skip: if slots 0–1 `continue`d at range, `res[]` stay MISS and hug does not fire. Match.

`failed_grab` unsolid/notonhead **and** AT_HUGS: pass-through pline, `strike=0`, no `hitmm`. Live helper. Match `:485–488`.

`hitmm(..., null, 0)`: vis squeeze unless `magr !== game.u?.ustuck` is false, then else `"hits"` (C FALLTHROUGH default). `!vis` still `noises`. Match `:691–697` / `:728–729`. Silver sear named; mwep is null so `silverhit` is false in C too.

`get_mattk` already rewrites AT_HUGS to claw when `mspec_used` (C `getmattk`). Pre-existing. Hug case then never sees that slot. Match.

Hallucination check: dispatch is `hitmm`, not a stub. `failed_grab` is live. This is **not** “Match C `shade_miss`.”

## Hallucinations / overclaim

Subject + D-1340 say a hugger squeezes when the previous two attacks hit instead of falling out of `mattackm`. **The case plus squeeze verb are the hunk.** Stamping **Addressed:** D-1340 is fair. Do **not** stamp “Match C `shade_miss`.” Do **not** stamp “Match C mhitu AT_HUGS `ustuck` at range” (different function). Do **not** stamp “Match C silver sear.” Do **not** treat fortress PASS as an owlbear `"squeezes"`.

## Density

Whole `AT_HUGS` switch arm plus the `hitmm` verb it needs. ~31 lines. Playbook §2b “one deferred if” would be too small; this is the practical hug envelope (sibling of AT_GAZE/AT_EXPL). Did not glue `shade_miss`. Acceptable.

## Branch-by-branch confirm

1. `i<2`: no hug. Match `:477`.
2. Prev two exact `M_ATTK_HIT`: `hitmm` squeeze. Match `:477–488`.
3. Prev hit was `DEF_DIED` only: no hug. Match exact `==`.
4. Unsolid / notonhead: `failed_grab`, no `hitmm`. Match `:485–486`.
5. `magr === u.ustuck`: vis `"hits"` not `"squeezes"`. Match `:692–696`.
6. distmin>1 with missed melee: no auto-hug. Match (no skip in the case).
7. `shade_miss`. Still omitted at this SHA. Named.
8. **Public-unhit** unless a session has mon-vs-mon hug.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **12**/12; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on mon-vs-mon hug. Cadence this audit: full `sessions` at HEAD `e3a30202` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not evidence an owlbear squeezed a goblin.

## Actionable C-wrongs

None for Must-fix. Auto-hit exact `M_ATTK_HIT`, `failed_grab`, `hitmm(NULL,0)`, squeeze-unless-ustuck match C `:476–490` / `:691–695`.

Named omits (map, not Must-fix):

1. `shade_miss` (D-1341 next)
2. hitmm silver sear / artifact wep
3. mdamagem AD_STON leftover

Do not Must-fix “hug if prev slots were any non-zero” (C mattackm does not). Do not Must-fix “ustuck hugs at range here” (that is mhitu).

## Callers / RNG ledger

C: `mattackm` AT_HUGS → `hitmm` `d()`. JS: same. Public fortress is not those rolls.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: AT_HUGS now auto-hits after two exact hits and squeezes; `shade_miss` stays named at this SHA.
- Must-fix stays empty for this SHA.
