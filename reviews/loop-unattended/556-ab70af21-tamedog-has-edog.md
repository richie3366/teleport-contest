# Review 556 — ab70af21 — dog.c tamedog initedog has_edog (D-1595)

## Metadata
- Full / short hash: `ab70af21c015138e85aec88bf970345d9b5bba8f` / `ab70af21`
- Parent: `dc1d6d94` (D-1594). This file audits **this SHA only** (second of nine `js/` commits since review **554**). Archive **Addressed:** D-1595 `ab70af21`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 21:53:00 +0200
- D-id: **D-1595**
- Stats: `js/makemon.js` +40/−9, `js/dog.js` +23/−14, `js/mon.js` +2/−2. Band **150–350** (js/ insertions **65**).
- Claims to close: Open `has_edog` vs `!mtame` after D-1593. Not ogoal `-1`. Not livelog. `reviews/loop-2026-08-15/` has no unpaid tamedog-edog Must-fix.
- JS / map: `dog.js` `tamedog`/`initedog`; `makemon.js` `newedog`/`MM_EDOG`; `mon.js` `copy_mextra`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **546** / **554** named `has_edog`.

## Intent vs deliverable

Git subject promises: a feral former pet keeps edog fields instead of resetting them on `!mtame`.

Pinned C `dog.c` `tamedog` `:1253–1259` after quest-leader reject. `newedog` `:22–32`. `initedog` `:44–88` (`EDOG(mtmp)`). `has_edog` `mextra.h:232` `mextra && EDOG`. `EDOG` `:223` `mextra->edog`. `makemon.c` `:1245–1246` `MM_EDOG`. `hack.h:1158` `MM_EDOG 0x00000800`. `copy_mextra` `:2634` `newedog` then `*EDOG`. `clone_mon` `:928–936` zero `mtame` then `tamedog` then copy edog. `abuse_dog` `:1372–1373`. restore `:352`. `--callers newedog`: tamedog `:1255`; makemon `:1246`; copy_mextra `:2634`; restore `:352`. `--callers initedog`: makedog `:282`; make_familiar `:204`; tamedog `:1256`/`:1258`; `cloneu` `:2631`; read lights `:1771`.

```1253:1259:nethack-c/upstream/src/dog.c
    /* add the pet extension */
    if (!has_edog(mtmp)) {
        newedog(mtmp);
        initedog(mtmp, TRUE);
    } else {
        initedog(mtmp, FALSE);
    }
```

Old JS: `if (!mtmp.edog) mtmp.edog={}; initedog(mtmp, !(mtmp.mtame))`. Feral `mtame==0` with leftover edog reset abuse/apport.

The diff **does** live `!has_edog` → `newedog`+`initedog(true)` else `initedog(false)`; `initedog` reads `EDOG`; `makemon` `MM_EDOG`; `copy_mextra`/`clone_mon` via `newedog`/`EDOG`. It **does not** set `ogoal` to `-1`. It **does not** livelog first pet, `free_edog`, or restore `newedog`. Named in this commit’s map row.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tamedog` has_edog arm | C `:1253–1259`, **LIVE this SHA** | not `!mtame` |
| `newedog` | C `:22–32`, **LIVE this SHA** | in `makemon.js` with other `new*` |
| `initedog` `EDOG` | C `:44–88`, **LIVE this SHA** | no more `edog={}` |
| `has_edog` / `EDOG` | C `mextra.h:232`/`:223`, **LIVE** | `const.js` |
| `MM_EDOG` | C `hack.h:1158`, **LIVE** | `0x00000800` |
| `makemon` MM_EDOG | C `:1245–1246`, **LIVE this SHA** | before `m_id` |
| `copy_mextra` edog | C `:2634–2638`, **LIVE this SHA** | |
| `clone_mon` tamedog+copy | C `:928–936`, **LIVE this SHA** | |
| `abuse_dog` `EDOG->abuse` | C `:1372–1373`, **LIVE** | dual-read fallback |
| `ogoal.x/y = -1` | C `:64–65`, **OMIT named** | still `{0,0}` |
| livelog first pet | C `:73–80`, **OMIT named** | `pets++` still |
| `free_edog` | **OMIT named** | `sym` NOT FOUND |
| restore `newedog` | C `:352`, **OMIT named** | |

`node scripts/csym.mjs newedog` → `:22-32`. `initedog` → `:44-88`. `tamedog` arm in `:1142-1282`. `copy_mextra` → `:2596-2646`. `has_edog` → `mextra.h:232`.

RNG: none in this arm. `clone_mon` still `rn2` luck tame **before** the tamedog block (unchanged). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
newedog          js/makemon.js:250   sync
has_edog         js/const.js:2962   sync
EDOG             js/const.js:2954   sync
initedog         js/dog.js:82   sync
tamedog          js/dog.js:365   ASYNC — await required
copy_mextra      js/mon.js:2504   sync
clone_mon        js/makemon.js:3081   ASYNC — await required
MM_EDOG          js/const.js:2215   sync   export const
free_edog        NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
```

`--can dog.js makemon.js newedog`: ALREADY. `--can mon.js makemon.js newedog`: ALREADY. `--can dog.js const.js has_edog`: ALREADY. Do **not** add `newedog` #2 in `dog.js`. Do **not** invent `free_edog` as a no-op.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

has_edog split. `!has_edog` → `newedog` + `initedog(true)`; else `initedog(false)`. **Match `:1253–1259`.** `has_edog` is `!!mextra?.edog`. **Match `mextra.h:232`.** Already-tame `mtame>=10` with edog no longer resets. Feral `mtame==0` with edog keeps abuse/apport/revivals. **Match the subject.**

`newedog`. Alloc `mextra.edog` if missing; zero fields; `parentmid = m_id`. **Match `:22–32` at tamedog** (monster already has `m_id`). Mirrors `mtmp.edog` so dogmove/sounds still read the same object — JS dual-store, not a second struct. `makemon` then overwrites `parentmid` after `next_ident()` (same as JS egd/eshk/emin/epri). C leaves `parentmid==0` for MM_EDOG birth because `newedog` runs on `zeromonst` **before** `m_id`. Pre-existing JS mextra pattern, not a new clone. Not Must-fix.

`initedog`. `EDOG(mtmp)`; domestic 10 else 5; `mtame = max`; peaceful; `set_malign`; everything vs apport<=0; hungrytime floor. **Match `:47–69` except ogoal.** everything still writes `ogoal {0,0}` with a comment that C is `-1`. **Mismatch `:64–65`.** Named in this commit (`data.md` + Open `initedog ogoal -1`). `pets++` without livelog. **Match increment; omit printf.** `make_familiar` / `makedog` still `initedog(true)` after `MM_EDOG` makemon. **Match `:204` / `:282`.** sit `cloneu` uses `MM_EDOG` then `initedog` — C `mhitu.c:2625–2631`. This SHA’s alloc makes `EDOG` defined there; old `initedog` self-alloc would have hidden a missing `newedog`.

`makemon` `MM_EDOG`. Flag `0x00000800`. **Match.** Call `newedog` with other `new*` before `m_id`. **Match `:1245–1246`.** JS `new*` order EGD/ESHK/EMIN/EPRI/EDOG vs C EGD/EPRI/ESHK/EMIN/EDOG is pre-existing; adding EDOG last **matches C’s last new\***.

`copy_mextra`. `newedog` then assign. **Match `:2634–2638`.** Still accepts top-level `mtmp1.edog` if `mextra` missing (migration). C only `EDOG(mtmp1)`.

`clone_mon`. `mtame=0`; `tamedog` (now `!has_edog` full init); copy `EDOG`. **Match `:928–936`.** Comment that tamedog will not re-tame a tame dog is why they zero `mtame` — **Match C comment.**

Callee closure (has_edog arm). LIVE: `has_edog`, `newedog`, `initedog`, `EDOG`. OMIT named: livelog inside `initedog`; ogoal `-1`; `free_edog`; restore. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject feral former pet keeps edog fields: **true** (`initedog(false)`). D-log “not `!mtame`”; **true.** `MM_EDOG` / `copy_mextra` / `clone_mon`: **true.** Do **not** stamp “Match C `ogoal.x/y = -1`.” Do **not** stamp “Match C livelog first pet.” Do **not** stamp “Match C `free_edog`.” Do **not** stamp “Match C restore `Sfi_edog`.” Do **not** stamp “Match C makemon `parentmid==0` at `newedog`.” Do **not** stamp “retired top-level `mtmp.edog` reads.” Public suite starting pet is `makedog` `initedog(true)` — does not exercise the feral `has_edog` else-arm.

## Density

One `tamedog` arm + the C alloc/init callees (`newedog`, `MM_EDOG`, `copy_mextra`). +65 JS. Did not glue ogoal `-1` / livelog. §2b OK.

## Branch-by-branch confirm

1. No edog: `newedog` + full `initedog`. **Match.**
2. Has edog (feral or mtame>=10): `initedog(false)` keeps abuse. **Match.**
3. `MM_EDOG` makemon then `initedog(true)` (makedog/familiar/cloneu). **Match.**
4. `clone_mon` copy after tamedog. **Match.**
5. `ogoal -1` / livelog / `free_edog` / restore. **Named.**

## Callers / RNG ledger

Food `dothrow`; magic taming still reaches this arm (after moon/ustuck). `newedog` restore unhit. No extra `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Keep `newedog` next to `neweshk` in `makemon.js`; do not add a `dog.js` clone. Do not treat `mtmp.edog={}` as `has_edog`. Do not skip Open ogoal `-1` by teaching `dog_goal` that `0` is `-1`.

## Verification

D-log private canary **11**/11; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for feral re-tame. A starting-pet canary does not falsify the else-arm. restore `newedog` unhit.

## Actionable C-wrongs

None for Must-fix. Named: `initedog` `ogoal.x/y = -1` (`:64–65`; Open already); livelog first pet (`:73–80`); `free_edog`; restore `newedog` (`:352`). Do not revert to `initedog(..., !mtame)`. Do not add `free_edog` as a no-op.

Verdict: **ACCEPT-WITH-DEBT**
