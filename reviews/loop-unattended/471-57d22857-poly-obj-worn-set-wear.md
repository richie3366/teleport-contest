# Review 471 — 57d22857 — zap.c poly_obj worn set_wear (D-1510)

## Metadata
- Full / short hash: `57d22857321c7992804f13316b5451ca37433ce2` / `57d22857`
- Parent: `7092fab7` (D-1509). This file audits **this SHA only** (seventh of nine `js/` commits since review **464**). Archive **Addressed:** D-1510 `57d22857`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:58:42 +0200
- D-id: **D-1510**
- Stats: 11 files, +260 / −57 — `js/zap.js` +77 / −22, `js/worn.js` +108 / −5, `js/potion.js` +1 / −1. Band 150–350 (185 JS ins).
- Claims to close: Open `zap.c` `poly_obj` worn `set_wear` (named from D-1499 / review **460**). Not addinv_core. `reviews/loop-2026-08-15/` has no unpaid worn-poly Must-fix.
- JS / map: `zap.js` `poly_obj`; `worn.js` `wearslot` / `wearmask_to_obj`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **460** named worn `set_wear` (async).

## Intent vs deliverable

Git subject promises: a worn item that polymorphs stays in a compatible slot and runs `set_wear` instead of leaving the hero unequipped.

Pinned C `zap.c` `poly_obj` `:1900–1951`: `get_obj_location`; `old_wornmask = owornmask & ~(W_ART|W_ARTI)`; `replace_object`; if invent: `freeinv_core` + `addinv_core1/2`; if `old_wornmask`: `new_wornmask = (old & W_WEAPONS) ? old : (wearslot(otmp) & old)`; `remove_worn_item(obj, TRUE)`; then W_WEP `setuwep`/`set_twoweap`, else W_SWAPWEP, else W_QUIVER `setuqwep`, else `setworn`+`set_wear`+`wearmask_to_obj` (amulet of change may destroy `otmp`). Callees `worn.c` `wearslot` `:282–351` / `wearmask_to_obj` `:206–214` (`worn[]` suit…chain). `prop.h` `W_WEAPONS`.

Old JS: invent `replace_object` + `freeinv_core` only. Comment said `set_wear` is async.

The diff **does** make `poly_obj` async, port `wearslot`/`wearmask_to_obj`, and insert that remap. All `poly_obj(` sites (`potion.js` dip, `stone_to_flesh_obj`, `bhito`) **await**. It **does not** port `addinv_core1/2` (`sym` NOT FOUND). Named. Floor boulder / shop bill / gem `rnd(4)` / egg/leash named. `remove_worn_item` amulet/ring/blindfold still `setworn` stand-ins. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `poly_obj` worn `if` | C `:1921–1950`, **LIVE this SHA** | function now async |
| `wearslot` | C `:282–351`, **LIVE export** | ARMOR via JS `oc_skill` ≡ C `oc_armcat` |
| `wearmask_to_obj` | C `:206–214`, **LIVE export** | `worn[]` order match |
| `remove_worn_item` | C steal.c, **LIVE** | inner Amulet_off named omit |
| `set_wear` | C do_wear.c, **LIVE** | async |
| `setuwep` / `setuswapwep` / `setuqwep` / `set_twoweap` | C wield.c, **LIVE** | |
| `setworn` | C, **LIVE** | |
| `bimanual` zap.js | C `obj.h`, **CLONE this SHA** | worn.js already has one; `sym` 10 locals |
| `addinv_core1/2` | C `:1912–1913`, **OMIT named** | **NOT FOUND** |
| floor boulder / shop | C `:1952–1967`, **OMIT named** | |

`node scripts/sym.mjs poly_obj wearslot wearmask_to_obj set_wear remove_worn_item setuwep setuswapwep setuqwep set_twoweap setworn addinv_core1 bimanual`:

```
poly_obj         js/zap.js:4915   ASYNC — await required
wearslot         js/worn.js:273   sync
wearmask_to_obj  js/worn.js:242   sync
set_wear         js/do_wear.js:870   ASYNC — await required
remove_worn_item js/steal.js:133   ASYNC — await required
setuwep          js/wield.js:173   sync
setuswapwep      js/wield.js:219   sync
setuqwep         js/wield.js:250   sync
set_twoweap      js/wield.js:760   sync
setworn          js/do_wear.js:413   sync
addinv_core1     NOT FOUND in js/**
bimanual         NOT EXPORTED — 10 LOCAL clones (zap.js added another)
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG:** none in the remap itself. `set_wear` / `Amulet_on` may. Public-unhit until a session polys worn gear.

## C ↔ JS fidelity

Mask. `old_wornmask = owornmask & ~(W_ART|W_ARTI)`. **Match `:1901`.** `W_WEAPONS` keep-old vs `wearslot(otmp) & old`. **Match `:1928–1929`.** Unworn (`old==0`) skips the `if`. **Match.**

Weapon arms. W_WEP: `was_twohanded || !bimanual(otmp) || !uarms` then `setuwep`; then `was_twoweap && uwep && !bimanual(uwep)` `set_twoweap`. JS `u.uwep` after `setuwep`. **Match `:1932–1936`.** Swap and quiver **Match `:1937–1943`.**

Armor/amulet/ring/tool. `setworn(otmp, new_wornmask)`; `await set_wear(otmp)`; `otmp = wearmask_to_obj(new_wornmask)` (may be null after change-amulet). **Match `:1944–1949`.** `set_wear` is LIVE (`do_wear.js:870`), not a stub.

`wearslot`. AMULET `W_AMUL`; RING left|right; ARMOR by ARM_* ; WEAPON W_WEP|SWAP (+QUIVER if `oc_merge`); TOOL blindfold/towel/lenses `W_TOOL`, weptool/tin-opener weapons, saddle `W_SADDLE`; FOOD meat-ring; GEM quiver; BALL/CHAIN. **Match `:290–350`.** C armor uses `oc_armcat`; this port stores that in `oc_skill` (existing convention; canary fedora→helm).

`wearmask_to_obj`. C `worn[]` suit, cloak, helm, shield, gloves, boots, shirt, left, right, wep, swap, quiver, amulet, tool, ball, chain. JS the same pointers. **Match `:18–35`.** No saddle in either table.

`remove_worn_item(obj, true)`. LIVE. Armor goes through `*_off`. Amulet/ring/blindfold still `setworn(null)` (D-log). C would `Amulet_off` / `Ring_gone` / `Blindf_off`. Named inner omit of a live callee, not a no-op remap.

`addinv_core1/2` skipped. C updates carried extrinsics before re-wear. JS relies on `set_wear` for the worn case. Named. Canary fedora luck went through `set_wear`/`Helmet_on`.

Callers. `poly_obj` is async; every `poly_obj(` in `js/` is `await`ed. No leftover Promise leak.

Callee closure (worn arm). LIVE: `wearslot`, `wearmask_to_obj`, `remove_worn_item`, `setuwep`/`setuswapwep`/`setuqwep`/`set_twoweap`, `setworn`, `set_wear`. CLONE: `bimanual` (matches `obj.h`; extra local). OMIT named: `addinv_core*`, floor boulder, shop, gem `rnd`, egg/leash, Amulet_off. STUB: none in the remap. **Arm may ship.**

## Hallucinations / overclaim

Subject worn poly stays in a compatible slot and runs `set_wear`: **true** when `new_wornmask` is non-zero and `set_wear`’s slot helpers run. Fedora→plate `wearslot & old` is 0 → unequip. **Match C.** D-log “callers await”: **true**. Stamping **Addressed:** D-1510 for **`:1921–1950` + live `set_wear`** is fair. Do **not** stamp “Match C `addinv_core1`.” Do **not** stamp “Match C `Amulet_off` in `remove_worn_item`.” Do **not** stamp “Match C gem `rnd(4)`.” Do **not** treat fortress PASS as a worn fedora poly.

This is **not** “dispatch ported, callee stubbed.” `set_wear` is exported and has the C slot sequence.

## Density

One C function’s worn tail + two callees it needs (`wearslot`, `wearmask_to_obj`). ~185 JS. Playbook §2b. Related; did not glue fruit. Acceptable. Extra `bimanual` local is clone hygiene, not a second subsystem.

## Branch-by-branch confirm

1. Unworn invent poly: no remap. **Match.**
2. Wielded → still weapon: keep `W_WEAPONS`, `setuwep`. **Match.**
3. Helm→helm: `setworn`+`set_wear`. **Match** (canary luck).
4. Helm→plate: `wearslot & old` 0, `remove_worn_item` only. **Match.**
5. Two-handed + shield: skip `setuwep` unless `was_twohanded`. **Match.**
6. Change amulet: `wearmask_to_obj` may null. **Match.**
7. Floor poly: no worn `if`. Boulder named. **Match skip.**
8. `addinv_core*`. **Named omit.**
9. **Public-unhit** until a session polys worn gear.

## Callers / RNG ledger

C: `potion_dip`, `bhito` POLY, `stone_to_flesh_obj`. JS same, all await. Remap has no `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Making `poly_obj` async is the C `set_wear` await seam, not a second input boundary.

## Verification

D-log: private canary **12**/12 (grep, Rule #2, wearslot helm/ring/amulet/gem/meat/tool/wep, fedora→helm luck-1, fedora→fedora luck 0, fedora→plate unequip, unworn skip, wielded sword→dagger W_WEP). Green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until worn poly. Cohort is not a dip-worn session.

## Actionable C-wrongs

None that belong on Must-fix. The cited remap matches C branch order; `set_wear` is LIVE.

Remaining named (map / Open): `addinv_core1/2`; sokoban_guilt; egg/leash; shop bill; gem mineral `rnd(4)`; spestudied; floor boulder block; steal `Amulet_off`/`Ring_gone`/`Blindf_off`. Do not Must-fix “should have imported worn.js `bimanual`.” Do not Must-fix “`oc_skill` must be renamed `oc_armcat` this iter” (port-wide stand-in). Do not Must-fix “`poly_obj` should stay sync.”

Verdict: **ACCEPT-WITH-DEBT**
