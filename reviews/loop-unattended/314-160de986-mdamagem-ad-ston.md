# Review 314 — 160de986 — uhitm.c mhitm_ad_ston mhitm leftover (D-1352)

## Metadata
- Full / short hash: `160de9869fc00a2dc80e7bbd546b4d4189f30e68` / `160de986`
- Parent: `48f2f0a2` (D-1351). This file audits **this SHA only**. Archive **Addressed:** D-1352 `160de986` already has the short hash (filled by D-1353).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 10:00:56 +0200
- D-id: **D-1352**
- Stats: 11 files, +261 / −125 — `js/mhitm.js` +81 / −5 (`AD_STON=18`, `do_stone_mon`, `mhitm_ad_ston`, `mdamagem` dispatch). Journal rotate in this SHA.
- Claims to close: Open `mhitm.c` `mdamagem` AD_STON leftover (named from D-1338 / reviews **300** / **313**). Not shade_miss. `reviews/loop-2026-08-15/` has no unpaid ston Must-fix.
- JS / map: `mhitm.js` `mdamagem` / `mhitm_ad_ston` / `do_stone_mon`; callees `poly_when_stoned`, `mon_to_stone`, `resists_ston`, `monstone`, `grow_up`; `c-js-map/turns.md` + `debt.md`. `munstone` / uhitm you-as-agr / mhitu `mhitm_ad_ston_u` (already live) / phys corpse-wep still named.
- Prior reviews this SHA claims to close: **313** / D-1351 named leftover after silver sear; **300** / D-1338 named it after `gazemm`.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_ston so a monster's petrify hit actually stones the defender, instead of applying leftover HP.”

C `mhitm_ad_ston` mhitm arm (`uhitm.c:4254–4261`) after you-as-agr / you-as-def:

```
    } else {
        /* mhitm */
        if (magr->mcan)
            return;
        do_stone_mon(magr, mattk, mdef, mhm);
        if (mhm->done)
            return;
    }
```

C `do_stone_mon` (`:3945–3978`): `munstone` then `poly_when_stoned` → `mon_to_stone` damage 0; else `!resists_ston` → `"turns to stone!"` / `monstone` / `grow_up` `done`; else leftover `AD_STON?0:1`. Caller `mdamagem` already rolled `d(damn,damd)` (`mhitm.c:1025`) then `mhitm_adtyping` case AD_STON (`uhitm.c:4796`).

Old JS: `mdamagem` had no AD_STON arm; leftover `d()` subtracted as generic HP.

The diff **does** dispatch AD_STON like the HALU clone (mhm bag, `mhitm_ad_ston`, knockback, leftover HP or `done` return). `mhitm_ad_ston` is the **mhitm arm only**. It does **not** call `munstone`. Named. It does **not** port uhitm `minstapetrify` or re-touch mhitu `mhitm_ad_ston_u`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mdamagem` AD_STON | C `:1059` via `mhitm_adtyping`, **wired** | after opening `d()` |
| `mhitm_ad_ston` mhitm arm | C `:4254–4261`, **wired** | local; not youmonst either side |
| `do_stone_mon` | C `:3945–3978`, **wired** | minus `munstone` |
| `AD_STON` | C `monattk.h:60` `=18`, **wired** | |
| `poly_when_stoned` | C `mondata.c`, **imported live** | golem→stone unless genocided; JS passes `game.mvitals` |
| `mon_to_stone` | C `mon.c`, **imported live** | `newcham` stone golem |
| `resists_ston` | C, **imported live** | `mresists\|mextrinsics\|mintrinsics & MR_STONE`; worn STONE_RES named inside callee |
| `monstone` | C, **imported live** | |
| `grow_up` | C `makemon.c`, **imported live** | |
| `deadmonster` | C `DEADMONSTER` `mhp<1`, **local clone** | pre-existing |
| `munstone` | C `muse.c:2884–2903`, **named omit** | treat as false (no lizard/acid eat) |
| uhitm arm | C `:4207–4211`, **named omit** | `munstone`+`minstapetrify` |
| mhitu arm | C `:4212–4253`, **pre-existing live** | `mhitm_ad_ston_u` in `mhitu.js` |
| phys corpse wep | C `mhitm_ad_phys` → `do_stone_mon`, **named omit** | |
| `touch_petrifies` prefix | C `mdamagem:1032–1057`, **named omit** | aggressor stones |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in these two functions. Opening `d(damn,damd)` already ran; cancelled keeps it. `munstone` would have eaten-item RNG — omitted.

## C ↔ JS fidelity

Cancelled: `if (magr.mcan) return` leaves `mhm.damage` as the opening `d()`. Then knockback (RNG-burn stub, pre-existing), then `if (!damage) return` else HP subtract. Match `:4256–4257` plus `mdamagem:1067–1073`. A cancelled cockatrice still deals leftover dice and does not stone.

Not cancelled: `do_stone_mon`. Flesh golem / other `poly_when_stoned`: `mon_to_stone`, damage 0, not `done` — leftover zeroed, no HP. Match `:3955–3958`. `!resists_ston`: vis+`canseemon` `pline_mon` `"turns to stone!"`; `monstone`; lifesave → `M_ATTK_MISS` `done`; tame+`!vis` peculiarly-sad pline (C `You(brief_feeling, "peculiarly sad")`); else `DEF_DIED | (grow_up?0:AGR_DIED)` `done`. Match `:3960–3975`. Resists and `adtyp==AD_STON`: leftover 0. Match `:3977`. Resists with other adtyp (corpse-wep caller, named) would set 1.

`munstone` is **not** a stub that returns true. The call is skipped (always-false). A defender with a lizard corpse does not eat it here. Named, not a diverging clone of `munstone`.

Hallucination check: “Match C `mhitm_ad_ston`” while **uhitm/mhitu arms are not this function** is an overclaim on the C symbol as a whole. The **mhitm arm** matches `:4254–4261`. Dispatch from `mdamagem` is live, not a stub `AD_STON` that still subtracts HP when `do_stone_mon` sets `done`. Do **not** stamp “Match C `munstone`.” Do **not** stamp “Match C uhitm `minstapetrify`.”

## Hallucinations / overclaim

Subject says a monster's petrify hit stones the defender instead of leftover HP. **True for mon-vs-mon AD_STON when `!mcan` and `!resists_ston` (or poly golem).** False until named for lizard-in-inventory (`munstone`) and for cockatrice-corpse weapons. False for hero-as-agr (different arm). D-1352 **Not this iter** names those. Stamping **Addressed:** D-1352 for leftover `mdamagem` is fair. Do **not** treat fortress PASS as a `"turns to stone!"` mon-vs-mon line.

## Density

One C function arm plus its `do_stone_mon` callee and the queued `mdamagem` case. ~80 lines. Playbook §2b right size (not “finish mhitm_ad_*”). Did not glue CONF/STUN/FIRE leftover or `ureflects`. Acceptable.

## Branch-by-branch confirm

1. Cancelled: keep `d()`, no stone. Match `:4256–4257`.
2. Flesh golem: `mon_to_stone`, leftover 0. Match `:3955–3958`.
3. Stone golem / `resists_ston`: leftover 0 for AD_STON. Match `:3977`.
4. Gnome vs Medusa gaze leftover via `mdamagem`: vis `"turns to stone!"`, `monstone`, `grow_up` `done`. Match `:3960–3975`.
5. Lifesave: `!DEADMONSTER` → `M_ATTK_MISS` `done`. Match `:3965–3968`.
6. Tame, `!vis`: sad feeling. Match `:3969–3970`.
7. `munstone` lizard: still stones (call skipped). Named.
8. uhitm you-as-agr: this function is not called. Named.
9. mhitu: already `mhitm_ad_ston_u`. Not this SHA.
10. **Public-unhit** unless a session faces mon-vs-mon AD_STON.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `AD_STON=18` is `monattk.h`, not a seed gate. Plain ESM.

## Verification

Journal: private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on mon-vs-mon stone. This audit cadence: full `sessions` at HEAD `6570ddba` **44**/44 Scr **11,405** RNG 100% speed `37+0.31/turn`. I did not re-run the private canary. Fortress PASS is not a petrify pline.

## Actionable C-wrongs

None for Must-fix. The mhitm arm matches C `:4254–4261` (`mcan` keeps leftover `d()`; else `do_stone_mon`). Poly / resist / stone / `grow_up` match `:3955–3977` minus `munstone`. Callees `mon_to_stone` / `monstone` / `grow_up` are live, not a dispatch that still applies HP after `done`. `munstone` is a named omit of the first C `if`, not a clone that returns the wrong boolean.

Named omits (map, not Must-fix):

1. `munstone` lizard/acid tin (`muse.c:2884`)
2. uhitm `munstone`+`minstapetrify`
3. `mhitm_ad_phys` cockatrice-corpse `do_stone_mon`
4. `mdamagem` `touch_petrifies` aggressor prefix
5. CONF/STUN/FIRE leftover `mhitm_ad_*`

Do not Must-fix “cancelled should also stone” (C returns). Do not Must-fix “AD_STON resist leftover 1” (C uses 0). Do not Must-fix “skip opening `d()`” (C always rolls first).

## Callers / RNG ledger

C: `mdamagem` `d()` → `mhitm_ad_ston` (no RNG) → maybe `munstone` eat RNG (omitted) → knockback `rn2`s. JS: same minus `munstone`. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_STON now stones or zeros leftover in C order; `munstone` stays named.
- Must-fix stays empty for this SHA.
