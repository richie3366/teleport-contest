# Review 559 — 9a4cbd04 — mextra.h has_mcorpsenm (D-1598)

## Metadata
- Full / short hash: `9a4cbd0436bad18141db8dab82d9a23c0d34dbfd` / `9a4cbd04`
- Parent: `9244ce75` (D-1597). This file audits **this SHA only** (fifth of nine `js/` commits since review **554**). Archive **Addressed:** D-1598 `9a4cbd04`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 22:30:27 +0200
- D-id: **D-1598**
- Stats: `js/makemon.js` +28/−7, `js/zap.js` +18/−8, `js/apply.js` +14/−3, `js/mon.js` +8/−7, `js/const.js` +4, plus display/pager/worm. Band **150–350** (js/ insertions **78**).
- Claims to close: Open `has_mcorpsenm` after D-1525/D-1574. Not object_detect cursed-mimic. Not `altarmask_at`. `reviews/loop-2026-08-15/` has no unpaid mcorpsenm Must-fix.
- JS / map: `const.js` `has_mcorpsenm`; `makemon.js` `newmcorpsenm`/`freemcorpsenm`; callers seemimic / copy_mextra / zap bhitm / wormgone / display / pager / stethoscope. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **535** named `has_mcorpsenm`/`freemcorpsenm`; pager local clone.

## Intent vs deliverable

Git subject promises: a mimic or long worm with `MCORPSENM==NON_PM` is unset instead of a live corpse type.

Pinned C `mextra.h:234` `has_mcorpsenm` = `mextra && MCORPSENM != NON_PM`. `MCORPSENM` `:225`. `makemon.c` `newmcorpsenm` `:2369–2375` / `freemcorpsenm` `:2378–2383`. `set_mimic_sym` stale `:2543–2546`. Callers `--callers has_mcorpsenm`: apply `:418`; detect `:762`; display `:573`; seemimic `:4413`; copy_mextra `:2644`; pager `:338`; pray `:2499`; worm `:330`; worn `:1096`; zap `:266`/`:322`. `--callers newmcorpsenm`: set_mimic_sym statue/slime/altar; zap `:323`. `--callers freemcorpsenm`: seemimic `:4414` only.

```234:234:nethack-c/upstream/include/mextra.h
#define has_mcorpsenm(mon) ((mon)->mextra && MCORPSENM(mon) != NON_PM)
```

Old JS: `mcorpsenm != null` (so `NON_PM` counted set); pager `| 0` local; seemimic skip `freemcorpsenm`; zap always allowed first long-worm hit; `copy_mextra` `hasOwnProperty`.

The diff **does** export C `has_mcorpsenm`, `newmcorpsenm`/`freemcorpsenm`, and wire those live callers. It **does not** port detect cursed-mimic, pray `altarmask_at`, worn `clear_bypasses`, zap `shieldeff`. Named. Pager drops `has_mcorpsenm_look`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `has_mcorpsenm` | C `:234`, **LIVE this SHA** | `const.js` |
| `MCORPSENM` | C `:225`, **LIVE** | `?? -1` ≡ `NON_PM` |
| `newmcorpsenm` | C `:2369–2375`, **LIVE this SHA** | |
| `freemcorpsenm` | C `:2378–2383`, **LIVE this SHA** | |
| `set_mimic_sym` stale | C `:2543–2546`, **LIVE** | |
| `seemimic` free | C `:4413–4414`, **LIVE** | |
| `copy_mextra` | C `:2644–2645`, **LIVE** | no longer copies `NON_PM` |
| zap long-worm skip+flag | C `:266–332`, **LIVE** | `shieldeff` named |
| `wormgone` | C `:330–331`, **LIVE** | |
| display `PM_TENGU` | C `:573`, **LIVE** | |
| pager `object_from_map` | C `:338`, **LIVE** | import not clone |
| stethoscope slime-mold | C `:418–420`, **LIVE** | `simpleonames` |
| detect `:762` | **OMIT named** | |
| pray `altarmask_at` | C `:2499`, **OMIT named** | |
| worn `clear_bypasses` | C `:1096`, **OMIT named** | |

`node scripts/csym.mjs has_mcorpsenm` → `mextra.h:234`. `newmcorpsenm` → `:2369-2375`. `freemcorpsenm` → `:2378-2383`. zap poly arm in `bhitm` `:263–334`.

RNG: none in the predicate. zap system-shock `rn2(25)` unchanged. `set_mimic_sym` `rn2` fruit/altar unchanged. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
has_mcorpsenm    js/const.js:2965   sync
newmcorpsenm     js/makemon.js:277   sync
freemcorpsenm    js/makemon.js:287   sync
MCORPSENM        js/const.js:2956   sync
```

Parent pager had a local `has_mcorpsenm_look`; this SHA deletes it and imports the export. Not clone #2. `--can makemon.js const.js has_mcorpsenm`: ALREADY. `--can zap.js makemon.js newmcorpsenm`: ALREADY. `--can mon.js makemon.js freemcorpsenm`: ALREADY. Do **not** add `has_mcorpsenm` in pager again.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates (`FORCEBUNGLE` in apply imports is a C flag name). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Predicate. `mextra && MCORPSENM !== NON_PM`. `NON_PM` is `-1`. `MCORPSENM` `?? -1` so a missing field is unset, not “set to 0”. **Match `:234`.** Old `!= null` treated `-1` as set. **That is the subject.**

`newmcorpsenm`. Alloc `mextra`, `mcorpsenm = NON_PM`. **Match `:2369–2375`.** `set_mimic_sym` statue/corpse/egg/tin, slime-mold, altar call it then store the real value. **Match `:2527–2541`.** Stale else `has_mcorpsenm` → `NON_PM`. **Match `:2543–2546`.**

`freemcorpsenm`. If has, set `NON_PM` (field remains). **Match `:2378–2383`.** `seemimic` before `M_AP_NOTHING`. **Match `:4413–4414`.**

`copy_mextra`. Copy only `has_mcorpsenm(src)`. **Match `:2644–2645`.** No longer copies a stored `NON_PM` via `hasOwnProperty`.

zap `bhitm`. Long worm + has → skip; else magm (shieldeff named); else `!resist` poly; then if still alive long worm, `newmcorpsenm` if needed, `MCORPSENM=PM_LONG_WORM`, `bypasses`. **Match `:266–332` including “even if poly failed” inside the `!resist` arm.** First zap hit is no longer a free extra poly on a later segment.

`wormgone`. Long worm + has → `NON_PM`. **Match `:330–331`.** display corpse glyph `has ? MCORPSENM : PM_TENGU`. **Match `:573`.** pager slime-mold override. **Match `:338–343`.** stethoscope dummy `spe` + `simpleonames`. **Match `:418–420`.**

Callee closure (predicate + alloc). LIVE: `has_mcorpsenm`, `MCORPSENM`, `newmcorpsenm`, `freemcorpsenm`. OMIT named: detect / pray / worn. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `NON_PM` is unset: **true** at the wired sites. D-log “pager local retired”: **true.** Do **not** stamp “Match C `object_detect` cursed-mimic `:762`.” Do **not** stamp “Match C pray `altarmask_at`.” Do **not** stamp “Match C worn `clear_bypasses` long-worm.” Do **not** stamp “Match C zap `shieldeff_mon`.” Public suite rarely hits mimic slime-mold / long-worm poly zap.

## Density

One `mextra.h` predicate + the C alloc/free pair + the callers that were already lying. +78 JS. Did not glue detect/pray/worn. §2b OK.

## Branch-by-branch confirm

1. `mcorpsenm == NON_PM`: `has_mcorpsenm` false. **Match.**
2. Missing mextra / missing field: unset. **Match.**
3. Statue mimic stored mndx: has true. **Match.**
4. seemimic clears. **Match.**
5. Long-worm second zap segment skipped. **Match.**
6. detect / pray / worn. **Named.**

## Callers / RNG ledger

Wired: set_mimic_sym, seemimic, copy_mextra, bhitm, wormgone, display, pager, stethoscope. Unwired C sites named. No extra `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore pager `has_mcorpsenm_look`. Do not treat `mcorpsenm != null` as has. Do not add `newmcorpsenm` in `zap.js`.

## Verification

D-log private canary **18**/18; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for long-worm poly zap / slime-mold stethoscope. A canary that never stores `NON_PM` does not falsify the old `!= null` bug. detect cursed-mimic unhit.

## Actionable C-wrongs

None for Must-fix. Named: `detect.c` `object_detect` `:762`; pray `altarmask_at` `:2499`; worn `clear_bypasses` `:1096`; zap `shieldeff_mon` on magm. Do not copy `NON_PM` in `copy_mextra`. Do not skip `freemcorpsenm` in `seemimic`.

Verdict: **ACCEPT-WITH-DEBT**
