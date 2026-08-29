# Review 580 — 597fd9ba — do_wear.c take_off occupation (D-1619)

## Metadata
- Full / short hash: `597fd9bac2f06c84a1763ff60fa9b15f20f01a1e` / `597fd9ba`
- Parent: `c98a5fab` (D-1618). This file audits **this SHA only** (eighth of nine `js/` commits since review **572**). Archive **Addressed:** D-1619 `597fd9ba`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 03:43:34 +0200
- D-id: **D-1619**
- Stats: `js/do_wear.js` +271/−16. Band **200–450** (js/ insertions **271** >250; id >454).
- Claims to close: Open `take_off` occupation after D-1602. Not ggetobj. Not `menu_remarm`. `reviews/loop-2026-08-15/` has no unpaid take_off Must-fix.
- JS / map: `do_wear.js` `take_off` / `do_takeoff` / `Amulet_off`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **563** named `take_off` `:2899` + continue `set_occupation`.

## Intent vs deliverable

Git subject promises: `'A'` after `select_off` walks `takeoff_order` with `oc_delay` occupation (and `do_takeoff` removes the item), instead of leaving `takeoff.mask` set and worn gear on.

Pinned C `do_wear.c` `take_off` `:2899–2987`; `do_takeoff` `:2823–2896`; `takeoff_order` `:17–21`; caller `doddoremarm` `:3020–3056` (`:3050` `take_off()`, `:3027–3030` continue). `Amulet_off` `:1089–1189`. `cursed` `:1892–1917`. `--callers take_off`: `:3050`. `--callers do_takeoff`: `:2911` and swapwep `:3085` (unwired). Occupation runner `allmain.js:1019` `await g.occupation()`.

```17:21:nethack-c/upstream/src/do_wear.c
static NEARDATA const long takeoff_order[] = {
    WORN_BLINDF, W_WEP,      WORN_SHIELD, WORN_GLOVES, LEFT_RING,
    RIGHT_RING,  WORN_CLOAK, WORN_HELMET, WORN_AMUL,   WORN_ARMOR,
    WORN_SHIRT,  WORN_BOOTS, W_SWAPWEP,   W_QUIVER,    0L
};
```

Old JS (D-1602): TRADITIONAL `ggetobj`+`select_off` set mask + disrobing verb; `take_off` / continue `set_occupation` named omit.

The diff **does** port `takeoff_order`, `take_off` (delay, cloak/suit extra, occupation `--`, `set_occupation`), `do_takeoff` (I_SPECIAL + slot `*_off`), wire `doddoremarm`, and `Amulet_off` ESP/`RESTFUL_SLEEP`/`GUARDING` so the WORN_AMUL arm and `'T'` amulet are not `confer_oc_oprop`. It **does not** port `menu_remarm`, `cancel_doff`, Glib `cursed` retry, MAGICAL_BREATHING drown / STRANGULATION / FLYING bodies, or `:3085` swapwep `do_takeoff`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `take_off` | C `:2899–2987` staticfn, **LIVE this SHA** | local; do not export #2 |
| `do_takeoff` | C `:2823–2896` staticfn, **LIVE this SHA** | local |
| `takeoff_order` | C `:17–21`, **LIVE this SHA** | same 14 slots + 0 |
| `doddoremarm` | C `:3020–3056`, **LIVE this SHA** | `await take_off` + continue occupation |
| `Amulet_off` | C `:1089–1189`, **LIVE this SHA** | ESP/RESTFUL/GUARDING; drown/fly named |
| `cursed_blocks` | C `cursed` `:1892`, **CLONE** | via `cursed_check`; Glib named |
| `Armor_off` / `Cloak_off` / `Boots_off` / `Ring_off` / `Blindf_off` | C, **LIVE** | async, awaited |
| `Gloves_off` / `Helmet_off` / `Shield_off` / `Shirt_off` | C, **LIVE** | sync, not awaited |
| `setuwep` / `setuswapwep` / `setuqwep` / `empty_handed` | C, **LIVE** | wield.js export (not invent clone) |
| `set_occupation` | C, **LIVE** | `engrave.js`; allmain awaits |
| `see_monsters` / `find_ac` | C, **LIVE** | ESP / GUARDING |
| `menu_remarm` | C `:3089`, **OMIT named** | NOT FOUND in js/ |
| `cancel_doff` | C, **OMIT named** | I_SPECIAL bit set; body missing |
| swapwep `:3085` `do_takeoff` | C, **OMIT named** | |

`node scripts/csym.mjs take_off` → `:2899-2987`. `do_takeoff` → `:2823-2896`. `Amulet_off` → `:1089-1189`. `I_SPECIAL` `0x20000000` (`prop.h:143` / `const.js`).

RNG: none in `take_off` / `do_takeoff`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
take_off         NOT EXPORTED — 1 LOCAL js/do_wear.js:1447
do_takeoff       NOT EXPORTED — 1 LOCAL js/do_wear.js:1374
Amulet_off       js/do_wear.js:1773   ASYNC — await required
cursed_blocks    NOT EXPORTED — 1 LOCAL js/do_wear.js:1341
cursed_check     js/do_wear.js:219   sync
set_occupation   js/engrave.js:627   sync
empty_handed     js/wield.js:42   sync  (+ invent.js:2870 clone; imported the export)
Armor_off        js/do_wear.js:579   ASYNC — await required
Gloves_off       js/do_wear.js:630   sync
menu_remarm      NOT FOUND (do not add a stub)
cancel_doff      NOT FOUND (do not add a stub)
```

`--can do_wear.js engrave.js set_occupation`: ALREADY. `--can do_wear.js wield.js empty_handed`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `take_off` #2. Do **not** add `empty_handed` #3. Do **not** add a no-op `menu_remarm`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`takeoff_order`. Blindfold, weapon, shield, gloves, left/right ring, cloak, helm, amulet, suit, shirt, boots, swap, quiver, then `0L`. **Match `:17–21`.** Not wear-on order (`Armor_on` cloak-before-suit). JS `takeoff_order` is the same 14 masks. WORN_BLINDF is `W_TOOL` in both `const.js` and C.

```2978:2986:nethack-c/upstream/src/do_wear.c
    /* Since setting the occupation now starts the counter next move, that
     * would always produce a delay 1 too big per item unless we subtract
     * 1 here to account for it.
     */
    if (doff->delay > 0)
        doff->delay--;

    set_occupation(take_off, doff->disrobing, 0);
    return 1;
```

`take_off` busy piece. `what` set: if `delay>0` decrement return 1; else `do_takeoff`, `off_msg` if otmp, clear that bit, `what=0`. **Match `:2906–2914`.** Then scan `takeoff_order` for the next set bit; `delay=0`. **Match `:2917–2924`.** `what==0` → `You("finish %s.", disrobing)` return 0. **Match `:2926–2928`.** Unknown mask: `impossible` return 0. JS same. **Match `:2970–2972`.**

Delay / slot ledger (C `:2929–2976` then `+= objects[otmp->otyp].oc_delay` if `otmp` then occupation `--`):

| `what` | Base delay | Extra | `otmp` for `oc_delay` |
|--------|------------|-------|------------------------|
| W_WEP / SWAP / QUIVER | 1 | — | none (no `+= oc_delay`) |
| WORN_ARMOR | 0 + extras | `uarmc`: `2*cloak_oc_delay+1` | `uarm` |
| WORN_CLOAK / BOOTS / GLOVES / HELMET / SHIELD | 0 | — | that slot |
| WORN_SHIRT | 0 + extras | `uarm`: `2*suit`; `uarmc`: `2*cloak+1` | `uarmu` |
| WORN_AMUL / LEFT_RING / RIGHT_RING / WORN_BLINDF | 1 | — | none |

JS `oc_delay_of` then `if (delay>0) delay--` then `set_occupation(take_off, disrobing, 0)` return 1. **Match `:2975–2986`.** Cloak kludge comment in C (cloak `oc_delay` is 0 so `+1` matters) is in the JS comment. Blindfold is 1, not the old 2 (`:2967–2969`).

`do_takeoff` switch. `mask \|= I_SPECIAL` first, `&= ~I_SPECIAL` last. **Match `:2830` / `:2893`.** W_WEP: `cursed(uwep)` then `setuwep(NULL)` + twoweap vs `empty_handed()` pline; **does not** assign `otmp`, so `take_off` skips `off_msg`. **Match `:2831–2838`.** SWAPWEP/QUIVER: **no** `cursed`; `setuswapwep`/`setuqwep` + their You(); no `otmp`. **Match `:2839–2846`.** Armor slots assign `otmp` then `if (!cursed) *_off`. **Match `:2847–2874`.** WORN_AMUL: `otmp=uamul`; `Amulet_off` if not cursed. **Match `:2875–2878`.** Rings: `Ring_off(uleft/uright)`. **Match `:2879–2886`.** WORN_BLINDF: `cursed(ublindf)` then `Blindf_off`; **`otmp` stays NULL** so no second `off_msg` from `take_off`. **Match `:2887–2889`.** Default `impossible`. JS awaits async `Armor_off`/`Cloak_off`/`Boots_off`/`Ring_off`/`Blindf_off`/`Amulet_off`; sync `Gloves_off`/`Helmet_off`/`Shield_off`/`Shirt_off` not awaited. **Match those JS types.** `empty_handed` is the `wield.js` export (`sym.mjs`); invent clone is not used.

`cursed`. C `:1892–1917`: `!otmp` impossible; welded if `otmp==uwep` else `otmp->cursed`; plural boots/gloves/lenses/`quan>1`; Glib retry `fingers_or_gloves`; else `You("can't.  %s cursed.")`; `set_bknown`. JS `cursed_blocks` → `cursed_check` for welded/cursed + plural + `bknown`. **Match the stuck test and the non-Glib message.** Glib arm **named.**

`Amulet_off`. `mask &= ~W_AMUL` first. **Match `:1095`.** ESP: early `setworn`+`off_msg`+`see_monsters`. **Match `:1098–1105`.** LIFE_SAVING / VERSUS_POISON / REFLECTION / CHANGE / UNCHANGING / FAKE: `break` (trailing `setworn`+`off_msg`). **Match `:1106–1112`.** RESTFUL: `setworn` then `HSleepy &= ~TIMEOUT` iff `!ESleepy && !(HSleepy & ~TIMEOUT)` — JS also reads `uprops[SLEEPY].extrinsic` as `ESleepy`. **Match `:1149–1153`.** GUARDING: `find_ac()` then trailing setworn. **Match `:1176–1177`.** YENDOR: `break`. **Match `:1179–1180`.** Trailing `setworn(NULL,W_AMUL)`; `off_msg` unless `early_off_msg`; `makeknown` if `mkn`. **Match `:1183–1188`.** MAGICAL_BREATHING / STRANGULATION / FLYING: C early setworn+off_msg then drown/`region_danger` / `Strangled=0`+Breathless neck / `float_vs_flight`+land/`spoteffects`. JS `break` then the shared setworn+off_msg (`mkn` stays false). Amulet still comes off. Bodies **named.** `take_off` still `off_msg(otmp)` after `do_takeoff` when `otmp` is the amulet — C `:2911–2912` does that too (ESP already printed `off_msg` inside `Amulet_off`; second line is C).

`doddoremarm`. Busy `what||mask`: continue pline + `set_occupation` return `ECMD_OK`. **Match `:3026–3029`.** Empty worn (no wep/swap/quiver/amul/blindf/rings/`wearing_armor`): not-wearing pline `ECMD_OK`. **Match `:3030–3033`.** `add_valid_menu_class(0)`. **Match `:3036`.** C `menu_style != TRADITIONAL || ggetobj(...) < -1` then `menu_remarm(result)`. JS the same gate with an empty body. **Named `menu_remarm`.** If mask: `disrobing` vs `disarming` from `mask & ~W_WEAPONS`, `take_off()`, return `ECMD_OK` (comment: do not add a turn). **Match `:3042–3056`.** Default `?? MENU_FULL` still skips `ggetobj`; FULL `'A'` still needs `menu_remarm`.

Occupation. `set_occupation(..., 0)` so `go.occupation = take_off` not `timed_occupation` (`cmd.c:206–212`). `allmain.js:1017–1023` `await g.occupation()`; 0 clears it; `monster_nearby` → `stop_occupation`. `take_off` is async. **Not a stub.** `cancel_doff` would see `I_SPECIAL`; `setworn` does not call it. Named.

Callee closure (`take_off` occupation). LIVE: `do_takeoff`, every `*_off` used in a live slot, `Amulet_off`, `setuwep`/`setuswapwep`/`setuqwep`/`empty_handed`, `set_occupation`, `off_msg`, `oc_delay`/`objects[].oc_delay`, `ggetobj`/`select_off` (D-1602), `impossible`, `see_monsters`, `find_ac`. CLONE: `cursed_blocks` (Glib omit). STUB: none in a live slot. OMIT named: `menu_remarm`, `cancel_doff`, amulet drown/fly/strangle, `:3085`. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `'A'` TRADITIONAL after `select_off` actually removes gear via occupation: **true when `menu_style==TRADITIONAL`.** D-log “continue `'A'` re-`set_occupation`”: **true.** Do **not** stamp “Match C `menu_remarm` FULL/COMBINATION.” Do **not** stamp “Match C `cancel_doff`.” Do **not** stamp “Match C Amulet_off drown / Strangled / Flying land.” Do **not** stamp “Match C Glib `cursed` retry.” Do **not** stamp “Match C `:3085` swapwep `do_takeoff`.” Do **not** stamp “Match C `select_off` / `ggetobj` takeoff” (D-1602). Do **not** stamp “Match C `Armor_on` order.” Public `'A'` is unhit.

## Density

One occupation family: `take_off` + `do_takeoff` + `takeoff_order` + WORN_AMUL `Amulet_off` + `doddoremarm` wire. +271 JS. Did not glue `menu_remarm`. §2b OK (large but one C file).

## Branch-by-branch confirm

1. Delay tick: `--delay` return 1. **Match `:2907–2909`.**
2. Delay 0: `do_takeoff` + `off_msg` iff otmp + clear bit + next `takeoff_order` bit. **Match.**
3. Mask empty: finish pline return 0. **Match.**
4. W_WEP/SWAP/QUIVER delay 1, no `otmp`, no `oc_delay` add. **Match.**
5. Suit with cloak: `2*cloak_delay+1` then `uarm` `oc_delay` then occupation `--`. **Match.**
6. Shirt with suit+cloak: both extras + `uarmu` `oc_delay`. **Match.**
7. Cloak/boots/gloves/helm/shield: `otmp` only, then `--`. **Match.**
8. Cursed suit: stays on, still `off_msg` of `otmp` (C returns otmp even when cursed). **Match.**
9. Blindfold: `Blindf_off` messages; `do_takeoff` leaves `otmp` NULL so no second `off_msg`. **Match `:2887–2889`.**
10. ESP / RESTFUL / GUARDING / inert otyp (LIFE_SAVING…FAKE, YENDOR). **Match.**
11. Breathing/strangle/fly bodies. **Named.**
12. Continue `'A'` `set_occupation` `ECMD_OK`. **Match `:3026–3029`.**
13. `menu_remarm` / `cancel_doff` / `:3085`. **Named.**

## Callers / RNG ledger

Wired: `doddoremarm` `:3050` and continue `:3029`; `armor_or_accessory_off` now `Amulet_off` (`'T'`). Unwired C: `:3085` swapwep. No `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore mask-without-occupation. Do not add `menu_remarm` as `return`. Do not `confer_oc_oprop` the amulet. Do not add `take_off` in `invent.js`. ggetobj takeoff is D-1602. Do not wrap `wildmiss` as `pline_mon`.

## Verification

D-log private canary **19**/19; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `'A'` / `#takeoffall` (and for TRADITIONAL `menu_style`). Fortress `'T'` of a non-amulet does not prove occupation delay. `menu_remarm` / Glib cursed / flying amulet unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `menu_remarm` (`do_wear.c:3089`); `cancel_doff`; Glib `cursed` (`:1907–1912`); Amulet_off MAGICAL_BREATHING drown/`region_danger`, STRANGULATION Breathless, FLYING land/`spoteffects`; `:3085` swapwep `do_takeoff`. Do not add `take_off` #2. Do not treat FULL `'A'` as TRADITIONAL `ggetobj`.

Verdict: **ACCEPT-WITH-DEBT**
