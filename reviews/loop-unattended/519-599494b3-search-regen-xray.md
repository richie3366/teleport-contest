# Review 519 — 599494b3 — artifact.c SEARCH/REGEN/XRAY conferral (D-1558)

## Metadata
- Full / short hash: `599494b3be4b4796892ced4812d2a940e4dd1720` / `599494b3`
- Parent: `590a1656` (audit #1950). This file audits **this SHA only** (first of nine `js/` commits since review **518**). Archive **Addressed:** D-1558 `599494b3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 03:56:52 +0200
- D-id: **D-1558**
- Stats: `js/artifact.js` +25 / −2, `js/do_wear.js` +11 / −5. Band 150–350 (js/ insertions **36**).
- Claims to close: Open SEARCH/REGEN/XRAY after D-1539 / review **500**. Not cspfx. Not Protection. `reviews/loop-2026-08-15/` has no unpaid conferral Must-fix.
- JS / map: `artifact.js` `set_artifact_intrinsic`; `do_wear.js` `setworn`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **500** named SEARCH/REGEN/XRAY/PROTECT as omit (this SHA retires three; PROTECT stays named).

## Intent vs deliverable

Git subject promises: Excalibur / Trollsbane+Staff / Eyes confer SEARCH / REGEN / XRAY instead of skipping those `spfx` arms.

Pinned C `artifact.c` `set_artifact_intrinsic` SEARCH `:781–786`, REGEN `:812–817`, XRAY `:859–866`. Callers `csym --callers`: `do_name.c:407` (wielded `oname`); `invent.c:991` / `:1383` W_ART; `worn.c:106` / `:130` `setworn`; `worn.c:173` `setnotworn`. `artilist.h` Excalibur SEARCH `:85–88`, Trollsbane REGEN `:182–184`, Staff REGEN `:248–253`, Eyes XRAY `:260–263`. Palantir `#if 0` REGEN cspfx `:241–245`. Mitre/Tsurugi are SPFX_PROTECT, not SEARCH.

```781:786:nethack-c/upstream/src/artifact.c
    if (spfx & SPFX_SEARCH) {
        if (on)
            ESearching |= wp_mask;
        else
            ESearching &= ~wp_mask;
    }
```

```859:866:nethack-c/upstream/src/artifact.c
    if (spfx & SPFX_XRAY) {
        /* this assumes that no one else is using xray_range */
        if (on)
            u.xray_range = 3;
        else
            u.xray_range = -1;
        gv.vision_full_recalc = 1;
    }
```

```106:106:nethack-c/upstream/src/worn.c
                        if (oobj->oartifact)
                            set_artifact_intrinsic(oobj, 0, mask);
```

Old JS: HALRES/ESP/STLTH/TCTRL/WARN/EREGEN/HSPDAM/HPHDAM/REFLECT only. `setworn` conferred `oc_oprop` and skipped artifact spfx. `setuwep` already called `set_artifact_intrinsic` (so Excalibur SEARCH was a dead arm, not a missing caller). `setnotworn` already called it off (do.js, pre-this-SHA).

The diff **does** add `SPFX_SEARCH`/`SPFX_REGEN`/`SPFX_XRAY` bits, three arms in C order, and wire `setworn` on/off. It **does not** port SPFX_PROTECT, defn/cary, `inv_prop` drop, Sunsword EBlnd, `oname` `:407`, or `vision_recalc` xray IN_SIGHT `:631–660`. Named. **No RNG** in these arms.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `SPFX_SEARCH` 0x200 | C `artifact.h:24`, **LIVE this SHA** | Excalibur s1 |
| `SPFX_REGEN` 0x4000 | C `artifact.h:29`, **LIVE this SHA** | Trollsbane / Staff s1 |
| `SPFX_XRAY` 0x02000000 | C `artifact.h:41`, **LIVE this SHA** | Eyes s1 |
| SEARCH arm `:781–786` | C, **LIVE this SHA** | `set_spfx_extrinsic` |
| REGEN arm `:812–817` | C, **LIVE this SHA** | same helper |
| XRAY arm `:859–866` | C, **LIVE this SHA** | `xray_range` 3/−1 + recalc flag |
| `set_spfx_extrinsic` | C `EFoo \|= / &=~`, **CLONE** | one local; writes flat + `uprops` |
| `setworn` on/off | C `:106`/`:130`, **LIVE this SHA** | Eyes W_TOOL; was skip |
| `setuwep` | C via `setworn` W_WEP, **LIVE pre-existing** | not this diff; no double call |
| `setnotworn` | C `:173`, **LIVE pre-existing** | already imported |
| `Searching()` | C `youprop.h:177` H\|\|E, **LIVE** | attrib.js; reads `ESearching` |
| `Regeneration()` | C `youprop.h:345`, **LIVE** | allmain; flat + uprops |
| SPFX_PROTECT | C `:873–877`, **OMIT named** | Mitre / Tsurugi |
| defn/cary / `arti_invoke` / Sunsword | C `:740–767` / `:880` / `:887`, **OMIT named** | |
| `oname` wield conferral | C `do_name.c:407`, **OMIT named** | JS `oname` “intrinsic deferred” |
| `vision_recalc` xray circle | C `vision.c:631–660`, **OMIT named** | flag is set; circle is not |

`node scripts/csym.mjs set_artifact_intrinsic` → `artifact.c:715-893`. `--callers set_artifact_intrinsic`: do_name `:407`; invent `:991`/`:1383`; worn `:106`/`:130`/`:173`. `csym.mjs setworn` → `worn.c:72-145`. `--callers setworn`: wield `:106` W_WEP; do_wear Blindf `:1467` W_TOOL; many armor/amulet; restore; u_init. No `rn2`/`rnd`/`rn1`/`d` in the three arms or in `setworn` conferral.

`node scripts/sym.mjs` on every new / re-pointed name (this SHA does not delete a clone):

```
set_artifact_intrinsic js/artifact.js:614   sync
set_spfx_extrinsic NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/artifact.js:566
             => Do NOT write clone #2.
confer_oc_oprop  js/do_wear.js:263   sync
setworn          js/do_wear.js:415   sync
setuwep          js/wield.js:243   sync
SEARCHING        js/const.js:2393   sync   export const
REGENERATION     js/const.js:2416   sync   export const
SPFX_SEARCH      js/artifact.js:115   sync   export const
SPFX_REGEN       js/artifact.js:119   sync   export const
SPFX_XRAY        js/artifact.js:131   sync   export const
xray_range       NOT FOUND in js/** (no export, no local function/const).
```

`xray_range` is a field on `game.u`, not a function — `sym.mjs` correctly finds no symbol. Do **not** add a clone function. Do **not** write `set_spfx_extrinsic` #2.

`node scripts/imports.mjs --can do_wear.js artifact.js set_artifact_intrinsic`: ALREADY statically imported. `--can wield.js artifact.js set_artifact_intrinsic`: ALREADY. A cycle alone is not a blocker; no new TDZ read.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No RNG.**

## C ↔ JS fidelity

Bits. `SPFX_SEARCH=0x200`, `SPFX_REGEN=0x4000`, `SPFX_XRAY=0x02000000` match `artifact.h:24/:29/:41`. Generated `artifacts_data.js`: Excalibur `spfx=663` = NOGEN|RESTR|INTEL|SEEK|DEFN|SEARCH; Trollsbane `2113538` = RESTR|DCLAS|REGEN; Staff `16711` = NOGEN|RESTR|ATTK|INTEL|DRLI|REGEN; Eyes `33554439` = NOGEN|RESTR|INTEL|XRAY. cspfx 0 on all four — W_ART carry does not confer these three. Palantir remains `#if 0`. **Match `artilist.h`.**

Select. Unchanged `:770` `wp_mask !== W_ART` → `oart.spfx`. SEARCH/REGEN/XRAY live in s1, so wield/wear, not carry. **Match.**

SEARCH. After drop-strip, before HALRES — **Match C order `:781` then `:787`.** `set_spfx_extrinsic(SEARCHING, 'ESearching', wp_mask, on)` ≡ `ESearching |= wp_mask` / `&= ~`. Prop index `SEARCHING=34` matches `prop.h:54`. `Searching()` is `HSearching || ESearching` (`youprop.h:177`). **Match.**

REGEN. After STLTH, before TCTRL — **Match `:812` between `:806` and `:818`.** `REGENERATION=57` matches `prop.h:80`. `Regeneration()` reads flat + `uprops`. **Match.**

XRAY. After HPHDAM, before REFLECT — **Match `:859` then `:867`.** `u.xray_range = on ? 3 : -1`; `game.vision_full_recalc = 1` ≡ `gv.vision_full_recalc`. C comment “no one else is using xray_range” kept. Does **not** OR `IN_SIGHT` here; C also only sets the flag. `vision_recalc` `:631–660` circle is a **different function**, named. `allmain` already consumes `vision_full_recalc`. **Match the XRAY arm. Do not stamp “Match C xray IN_SIGHT circle.”**

`set_spfx_extrinsic`. Writes `uprops[idx].extrinsic` and the E* flat. C `ESearching` **is** `uprops[SEARCHING].extrinsic`. Verified CLONE of `|=` / `&=~`. One local. HALRES still skips `make_hallucinated` talk (named, pre-existing).

`setworn`. Off: `confer_oc_oprop` then `set_artifact_intrinsic(old, false, bit)` then clear mask — **Match `:106` after oc_oprop.** On: `confer_oc_oprop` then `set_artifact_intrinsic(obj, true, slotBit)` — **Match `:130`.** JS `setworn` has no W_WEP / SWAPWEP / QUIVER slots; C skips SWAPWEP|QUIVER at `:93`/`:121`. JS `setuswapwep`/`setuqwep` still do not confer. `setuwep` already confers W_WEP — **not double-called** because `setworn` never places `uwep`. `confer_oc_oprop` is unchanged (Keep: do not rewrite). `w_blocks` Eyes→BLINDED still named.

`setnotworn`. Already `set_artifact_intrinsic(obj, false, mask)` at C `:173`. This SHA does not touch do.js. Destroy-while-worn Eyes now actually clears `xray_range` because the arm exists.

Callee closure (SEARCH/REGEN/XRAY arms). LIVE: `set_spfx_extrinsic` (verified clone of `EFoo` write), `setworn` callers, `setuwep` (pre-existing), `setnotworn` (pre-existing). XRAY: field write + flag; `vision_recalc` later is not a callee of this function. OMIT named: PROTECT, defn/cary, `arti_invoke`, Sunsword, `oname:407`, xray circle. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject Excalibur/Trollsbane+Staff/Eyes confer SEARCH/REGEN/XRAY: **true** on wield/wear paths that already called `set_artifact_intrinsic`, plus Eyes via new `setworn`. D-log “carry W_ART no SEARCH”: **true** (cspfx 0). D-log “do not rewrite `confer_oc_oprop`”: **true**. Do **not** stamp “Match C SPFX_PROTECT” (Mitre still skipped). Do **not** stamp “Match C `oname` `:407`” (JS `oname` still defers intrinsic). Do **not** stamp “Match C `vision_recalc` xray IN_SIGHT.” Do **not** stamp “Match C Palantir cspfx REGEN” (`#if 0`). This is **not** “dispatch ported, callee stubbed.”

## Density

Three sibling `spfx` arms in one function plus the `setworn` caller C already uses for Eyes W_TOOL. +36 JS; C arms are small. Did not glue pickinv `&ctmp`. §2b OK for this cluster.

## Branch-by-branch confirm

1. Wield Excalibur `W_WEP`: `spfx & SEARCH` → `ESearching |= W_WEP`; `Searching()` true. Unequip clears. **Match.**
2. Carry Excalibur `W_ART`: cspfx 0, no SEARCH. **Match.**
3. Wield Trollsbane or Staff: `ERegeneration |= W_WEP`. **Match.**
4. Wear Eyes `setworn` W_TOOL: `xray_range=3`, `vision_full_recalc=1`. Remove: `xray_range=-1`. **Match the arm.**
5. Wear Mitre: SPFX_PROTECT still skipped; no `EProtection`. **Named.**
6. Sting: none of the three bits. **Match.**
7. Tsurugi: PROTECT not SEARCH; no `ESearching`. **Match named skip.**
8. `vision_recalc` xray circle `:631–660`: still not ported. **Named.**
9. Name Excalibur while already `uwep`: C `:407` confers; JS `oname` returns after `artifact_exists`. **Named omit.**

## Callers / RNG ledger

C: `setuwep`→`setworn` W_WEP; Blindf `setworn` W_TOOL; `setnotworn`; invent W_ART (silent for these bits); `oname` if already wielded. JS the first four; `oname` named. Public-unhit (no public Excalibur/Eyes wear). No seed gate. **No core RNG.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No scored `fs`. No FORCE. `xray_range = 3` is C’s constant, not a recorded coordinate.

## Verification

D-log canary **33**/33 (C/JS SPFX bits; Excalibur W_WEP ESearching + `Searching()`; carry W_ART no SEARCH; Trollsbane+Staff REGEN; Eyes `setworn` W_TOOL xray 3/−1 + `vision_full_recalc`; Mitre no EProtection; Sting none of the three; Tsurugi no SEARCH; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: SPFX_PROTECT (Mitre/Tsurugi); defn/cary resist; `inv_prop` `arti_invoke` on drop; Sunsword EBlnd; `oname` `:407` wield conferral; `vision_recalc` xray IN_SIGHT circle. Do not rewrite `confer_oc_oprop`. Do not add `set_spfx_extrinsic` clone #2. Do not zero `cspfx` on W_ART (D-1539).

Verdict: **ACCEPT-WITH-DEBT**
