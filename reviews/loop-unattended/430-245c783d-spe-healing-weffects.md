# Review 430 — 245c783d — spell.c SPE_HEALING/SPE_EXTRA_HEALING directional weffects (D-1469)

## Metadata
- Full / short hash: `245c783ddd2a1c6d3ae7c4eacf7534a45a234b8e` / `245c783d`
- Parent: `3b4c39e2` (D-1468). This file audits **this SHA only** (third of nine `js/` commits since review **427**). Archive **Addressed:** D-1469 `245c783d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 12:40:05 +0200
- D-id: **D-1469**
- Stats: 11 files, +237 / −75 — `js/zap.js` +128 / −some; `js/spell.js` +55 / −some; `js/muse.js` `mcureblindness` export (+3 / −1).
- Claims to close: Open `spell.c` `spelleffects` SPE_HEALING/SPE_EXTRA_HEALING directional weffects (named from D-1468 / review **429**). Not TELE. `reviews/loop-2026-08-15/` has no unpaid heal-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; `zap.js` `bhitm` / `zap_steed` / `mimic_hit_msg`; `muse.js` `mcureblindness`; `mon.js` `healmon`. `c-js-map/turns.md`. Remaining bhitm-routed `zap_steed` named at this SHA.
- Prior reviews this SHA claims to close: **429** named HEALING after TELE; **421** named remaining IMMEDIATE after STONE (HEALING was last of that group).

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_HEALING/SPE_EXTRA_HEALING directional weffects so a directional heal calls weffects/bhitm healmon instead of skipping weffects.”

C `spell.c` `:1475–1476` in the `:1457–1514` wand-duplicate fallthrough. `objects.h:1313–1315` / `:1364–1366` both IMMEDIATE. `:1480–1485` skilled bless **only** these two otyps, then shared getdir / `zapyourself` / `weffects`. Self: `zapyourself` `:2908–2913` `healup(d(6, extra?8:4), 0, FALSE, blessed||extra)` already D-0135. Directed: `weffects` `:3440–3451` `bhit(rn1(8,6), bhitm, bhito)`. `bhitm` `:433–473`: `d(6, extra?8:4)`; non-Pestilence `wake=FALSE`, `healmon`, skilled||extra `mcureblindness`, looks better / mimic, Healer tame XP, tame/peaceful `adjalign`; Pestilence `resist(oclass, healamt/2, TELL)`. `skilled_spell` is `SPBOOK && blessed` (`:186`). `zap_steed` `:3127–3133` `(void) bhitm(usteed)`. `physical_damage` FORCE_BOLT-only.

Old JS: HEALING/EXTRA skilled bless + getdir + self-zap with `// else weffects deferred`. `bhitm` had no case (default no-op). `zap_steed` defaulted false so riding-down heal fell through to empty `zap_updown`.

The diff **does** call `wand_duplicate_weffects` after skilled bless, port `bhitm` `:433–473`, export `mcureblindness`, add `zap_steed` HEALING/EXTRA via `bhitm`, and add a local `mimic_hit_msg`. It **does not** change `zapyourself` healup. It **does not** add remaining bhitm-routed steed otyps. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` HEALING/EXTRA arm | C `:1475–1514`, **wired this SHA** | skilled bless then wrapper |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** | |
| `bhitm` SPE_HEALING/EXTRA | C `:433–473`, **wired this SHA** | |
| `healmon` | C `mon.c` `:4596–4614`, **imported live** (`mon.js`) | youmonst arm named there |
| `mcureblindness` | C `muse.c`, **imported live** (export this SHA) | |
| `mimic_hit_msg` | C `mon.c` `:5776–5793`, **local clone** | `objectNames` vs `simple_typename` |
| `set_mimic_sym` | C `makemon.c`, **imported live** | |
| `adjalign` / `more_experienced` / `newexplevel` | C, **imported live** | |
| `resist` TELL | C `zap.c` `resist`, **imported live** | shieldeff polish named |
| `zapyourself` SPE_HEALING | C `:2908–2913`, **pre-existing** (D-0135) | |
| `zap_steed` HEALING/EXTRA | C `:3127–3133`, **wired this SHA** | |
| remaining `zap_steed` bhitm otyps | C `:3116–3126`, **named omit** | cancel first after this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `#cast` directed now reaches `rn1(8,6)` plus `d(6,4)`/`d(6,8)` plus Pestilence `resist`. Public fortress does not `#cast` healing at a monster.

## C ↔ JS fidelity

Dispatch: skilled bless then `wand_duplicate_weffects(..., false)`. Match `:1480–1514`. Self still `zapyourself` healup; directed `weffects` `bhit`. **Callees are not stubs.** Hallucination check: “Match C weffects/bhitm healmon” while this SHA **ports** the `bhitm` arm and imports live `healmon`/`mcureblindness` is **not** a dispatch-stub lie.

`bhitm` `:186` `skilled_spell = SPBOOK && blessed` now computed (was unused). Match.

`:435–473` vs JS:

1. `healamt = d(6, extra?8:4)`; `reveal_invis=true`. Match dice.
2. Non-Pestilence: C `mtmp->data != &mons[PM_PESTILENCE]`. JS `mndx === PM_PESTILENCE || data === mons(PM_PESTILENCE)`. Equivalent pointer/index test.
3. `delta = mhpmax-mhp`; `wake=false`; `healmon(mtmp, healamt, 0)`. Live `mon.js` monster arm matches `:4603–4612`.
4. `skilled_spell || extra` → `mcureblindness(mtmp, canseemon)`. Unskilled plain HEALING does **not** cure. Match comment `:443–446`.
5. `canseemon`: STRANGE_OBJECT mimic `set_mimic_sym`+`newsym`; else `mimic_hit_msg`; else “looks” / “looks much better.” `is_obj_mappear` ≡ `M_AP_OBJECT && mappearance===STRANGE_OBJECT` (`monst.h:243`).
6. Tame + Healer + `delta>0`: `more_experienced(min(delta,healamt), 0)` + `newexplevel`. Match.
7. Tame/peaceful: `adjalign(Healer?1:sgn(ualign.type))`. JS `atype<0?-1:atype!==0?1:0` is `sgn`. Match.
8. Pestilence: `resist(oclass, healamt/2, TELL)`. JS `(healamt/2)|0`. C **comment** “half of (healamt/2)” does not match the **call**; JS follows the call. Do not Must-fix healamt/4.

`mimic_hit_msg`: C `pline_mon` + `The(simple_typename(ap))` + `c_obj_colors[oc_color]`. JS local clone: `C_OBJ_COLORS_ZAP` **matches** `decl.c:20–36` 16 strings; name is `objectNames` lowercased (stand-in for `simple_typename`). Typical “chest”/“gold piece” still reads. Clone, not a no-op. Not a silent “Match C `simple_typename`” stamp.

`zap_steed` now `bhitm(steed)` + `steedhit=true` so riding-down heal does **not** `zap_updown`. Match `:3127–3133` / `:3437–3439`.

`zapyourself` unchanged and already matches `:2908–2913`. Wrapper now also `update_inventory` after self-heal (`:1513`). Old JS skipped that.

## Hallucinations / overclaim

Subject says directional heal calls `weffects`/`bhitm` `healmon` instead of skipping. **True:** skilled bless; directed `bhit` heals (or Pestilence resist); extra/skilled cure blindness; riding-down via `bhitm`; self still `healup`. **False until named** for remaining steed otyps, `resist` TELL shieldeff, `simple_typename` vs `objectNames`. Stamping **Addressed:** D-1469 for **dispatch + live healmon arm + steed route** is fair. Do **not** stamp “Match C zap_steed CANCEL.” Do **not** treat fortress PASS as a heal-at-monster cast.

## Density

One otyp pair plus the `bhitm` callee C actually runs (`healmon` / `mcureblindness` / mimic / Pestilence) plus the `zap_steed` route. ~80 lines of real JS. Playbook §2b caller/callee cluster. Did not glue CANCEL. Acceptable.

## Branch-by-branch confirm

1. `#cast` directed SPE_HEALING: `weffects` `bhit(rn1(8,6))` then `healmon` `d(6,4)`. Match `:1475–1510` / `:435`.
2. SPE_EXTRA_HEALING: `d(6,8)` + “looks much better” + always `mcureblindness`. Match.
3. Unskilled SPE_HEALING: no `mcureblindness`. Match `:447`.
4. Skilled bless: `skilled_spell` true → cure. Match `:186` / `:447`.
5. Pestilence: no looks-better; `resist(healamt/2, TELL)`. Match `:468–470`.
6. atme: `zapyourself` `healup` + You_feel; SPBOOK skip makeknown. Match `:2908–2913`.
7. Riding down: `zap_steed` `bhitm`. Match `:3127–3133`.
8. Tame/peaceful `adjalign` sgn. Match `:465–467`.
9. CANCEL/POLY still default `zap_steed` false. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `d(6,4)` is C `:435`, not a recorded index. Color table matches `decl.c`, not a session screen.

## Verification

Journal: private canary **18**/18 (C/JS grep; IMMEDIATE SPBOOK; atme You_feel + skip makeknown; zapyourself extra much better; bhitm kobold looks better + HP + adjalign; extra mcureblindness; unskilled no-cure; blessed skilled_spell cures; Pestilence no looks-better; east cast TIME + looks better; skilled cast cures; zap_steed via bhitm; prior TELE/STONE/POLY/CANCEL/TURN/KNOCK/SLOW/LOCK/RAY/NODIR/DRAIN stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dice, wake, Pestilence gate, skilled-cure, `sgn` align, and steed route match. `healmon`/`mcureblindness` are C callees. `mimic_hit_msg` is a named-shape clone (colors match; typename is `objectNames`).

Named omits (map / Open, not Must-fix):

1. remaining `zap_steed` bhitm otyps (CANCEL first after this SHA)
2. `resist` TELL shieldeff polish
3. `mimic_hit_msg` `simple_typename` vs `objectNames`
4. `healmon` youmonst `healup` arm (not this caller)

Do not Must-fix “dispatch is a stub.” Do not Must-fix “Pestilence damage should be healamt/4” (C **call** is `healamt/2`). Do not Must-fix “unskilled HEALING must cure blindness.”

## Callers / RNG ledger

C callers: `spelleffects`; `weffects` steed-down. Dice: `rn1(8,6)`; `d(6,4|8)`; `resist`. Public fortress does not hit the new directed arm.

`weffects` IMMEDIATE does not set `disclose` on horizontal `bhit`. Fake SPBOOK skips `makeknown`. `zapyourself` sets `learn_it` (no-op for SPBOOK).

Verdict: **ACCEPT-WITH-DEBT**
