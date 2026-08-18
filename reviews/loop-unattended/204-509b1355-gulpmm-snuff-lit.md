# Review 204 — 509b1355 — mhitm.c gulpmm `snuff_lit` minvent (D-1242)

## Metadata
- Full / short hash: `509b13551d88cc2c56bf62a1212f7b7c114d2d25` / `509b1355`
- Parent: `271e92e2` (reviews **200–203** + cadence **#1575**). JS parent `9b5bd39d` (D-1241). This file audits **this SHA only**. Archive row **Addressed:** D-1242 `509b1355` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 00:50:23 +0200
- D-id: **D-1242**
- Stats: 10 files, +174 / −41 — `js/apply.js` +67; `js/mhitm.js` +22 / −5.
- Claims to close: Open `mhitm.c` gulpmm `snuff_lit` minvent (named from D-1231 / D-1241 / review **193** / **203**). Not `m_at` swap. `reviews/loop-2026-08-15/` has no unpaid snuff Must-fix.
- JS / map: `mhitm.js` `gulpmm`; `apply.js` `snuff_lit` / `snuff_candle`; `c-js-map/data.md`. `!goodpos` / AD_DGST eat still named at this SHA (D-1243 / D-1244 later).
- Prior reviews this SHA claims to close: **193** named omit snuff_lit; **203** next Open was snuff_lit.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c gulpmm snuff_lit so a non-flaming engulf snuffs the defender's minvent lamps and candles, instead of leaving them burning.”

C `gulpmm` (`mhitm.c:868–871`) after the vis swallow pline, before vampshifter `newcham`: `if (!flaming(magr->data))` walk `mdef->minvent` `nobj` and `snuff_lit(obj)`. `snuff_lit` (`apply.c:1497–1514`): if `lamplit` and otyp OIL_LAMP / MAGIC_LAMP / BRASS_LANTERN / POT_OIL, `get_obj_location`, MINVENT `cansee` else `!Blind` pline `Yname2`/`otense("go")`, `end_burn(TRUE)`; else `snuff_candle`. `snuff_candle` (`:1472–1491`): `Is_candle` or CANDELABRUM, same loc/Blind gate, `Shk_Your` candle flame pline, `end_burn(TRUE)`. No `rn2`.

Old JS: comment “snuff_lit minvent named”; flaming skip was a comment only.

The diff **does** the `!flaming` nobj walk via dynamic `import('./apply.js')` and ports both callees. It does **not** pull `splash_lit`, gulpmu invent, gulpum, `litroom` artifact_light, pickup `obj_is_burning`, dokick `snuff_candle`, `!goodpos`, or AD_DGST eat. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gulpmm` snuff loop | C `:868–871`, **wired** | before vampshifter, before occupancy |
| `snuff_lit` | C `:1497–1514`, **new, faithful** | no RNG |
| `snuff_candle` | C `:1472–1491`, **new, faithful** | |
| `end_burn` | C `timeout.c:1804–1822`, **imported live** | TRUE → `stop_timer(BURN_OBJECT)`; MAGIC_LAMP/`artifact_light` force FALSE |
| `Is_candle` / `get_obj_location` | C `obj.h` / `zap.c`, **imported live** | timeout.js |
| `yname` / `shk_your` | C `objnam.c` / `shk.c`, **imported live** | MINVENT `mon_owns` |
| `Yname2_snuff` / `Shk_Your_snuff` | C `Yname2` / `Shk_Your`, **clone** | capitalize live `yname`/`shk_your` |
| `otense_snuff` | C `otense`, **clone** | `quan!=1` not `is_plural` |
| `flaming` | C `mondata.h:59–61`, **imported live** | vortex/sphere/elemental/salamander |
| `Blind()` | C `youprop.h`, **local apply.js** | H\|\|E && !B |
| gulpmu / gulpum / `litroom` / pickup / dokick | C other callers, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` / `J_DIAG` in apply.js are pre-existing C flag names, not this SHA. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C loop (`mhitm.c:868–871`):

```
    if (!flaming(magr->data)) {
        for (obj = mdef->minvent; obj; obj = obj->nobj)
            (void) snuff_lit(obj);
    }
```

JS: same gate, `for (let obj = mdef.minvent; obj; obj = obj.nobj) await snuff_lit(obj)`. Walk is **before** occupancy shuffle, so `ocarry.mx/my` is still the defender cell. Match.

`snuff_lit` otyp list is the four C lamps/oil; else `snuff_candle`. Sunsword is `artifact_light`, not those otyps — stays lit. Match. `end_burn(otmp, true)` is the live timeout.js callee (MAGIC_LAMP forces untimed del_light like C).

MINVENT message uses live `yname`/`shk_your` (`mon_owns` → `s_suffix(y_monnam(ocarry))`), then capitalize. That is closer to C `Yname2`/`Shk_Your` than timeout.js’s invent-only `Yname2` clone. `otense_snuff` uses `quan!=1` instead of C `is_plural` (pairs of boots). Lamps/candles are not pair-types. Named clone gap, not a no-op snuff.

`get_obj_location` fail → JS `{x:0,y:0}`; C leaves stack `x,y`. After a live minvent walk, loc is the carrier. Not a Must-fix of the claimed loop.

## Hallucinations / overclaim

Subject + D-1242 say a non-flaming engulf snuffs minvent lamps/candles. **The nobj walk + live `end_burn` are the hunk.** Stamping **Addressed:** D-1242 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `splash_lit`” or “Match C gulpmu invent snuff” or “Match C `is_plural` otense.”

## Density

One C caller arm plus the two callees that arm actually calls. ~70 JS lines. Right size. Did not glue `!goodpos` or AD_DGST.

## Branch-by-branch confirm

1. Flaming magr: skip the loop. Match.
2. Unlit minvent: `snuff_lit` false, stay unlit. Match.
3. Lit MAGIC_LAMP / OIL_LAMP / lantern / POT_OIL: pline if MINVENT `cansee` else `!Blind`; `end_burn` TRUE. Match.
4. Lit tallow/wax: `snuff_candle`. Match.
5. Lit candelabrum via `snuff_lit` else-arm. Match.
6. Sunsword otyp: not snuffed. Match.
7. Hero invent oil (not MINVENT): `!Blind` gate. Match C’s else-of-MINVENT.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `apply.js` is scored ESM. Plain ESM.

## Verification

Journal: private canary **27**/27 (C loop; JS nobj walk; fog MAGIC_LAMP chain; unlit; Sunsword; tallow; candelabrum; invent oil; flaming vortex skip; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a non-flaming AT_ENGL gulps a minvent lamp. Cadence this audit: full `sessions` **44**/44.

## Actionable C-wrongs

None for Must-fix. Loop through live `snuff_lit`/`end_burn`. `otense` `quan` vs `is_plural` is a named clone gap on pair-objects this path does not snuff.

Named omits (map, not Must-fix):

1. `splash_lit`; gulpmu invent / gulpum / `litroom` artifact_light / pickup `obj_is_burning` / dokick `snuff_candle`
2. `otense` `is_plural` (boots/gloves)
3. `!goodpos` return-home / AD_DGST eat (later SHAs)

Do not Must-fix “burn `rn2` in snuff” (C has none). Do not skip flaming.

## Callers / RNG ledger

C: `gulpmm` only on this SHA. JS same. No RNG in snuff. Public fortress is not evidence a lamp was snuffed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a non-flaming engulf now walks defender minvent through live `snuff_lit`/`end_burn`; other snuff callers stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1242 `509b1355`.
