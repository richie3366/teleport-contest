# Review 551 — 094af60d — invent.c display_pickinv wizid PICK_ANY (D-1590)

## Metadata
- Full / short hash: `094af60deea17c728406a1cfef362db34e632dd3` / `094af60d`
- Parent: `7415056f` (D-1589). This file audits **this SHA only** (sixth of nine `js/` commits since review **545**). Archive **Addressed:** D-1590 `094af60d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 20:19:35 +0200
- D-id: **D-1590**
- Stats: `js/invent.js` +110/−18, `js/options.js` +64/−13. Band **150–350** (js/ insertions **174**).
- Claims to close: Open wizid unid_cnt>0 after D-0928/D-1580/D-1589. Not `display_used_invlets`. `reviews/loop-2026-08-15/` has no unpaid wizid Must-fix.
- JS / map: `invent.js` `display_pickinv_wizid`/`build_wizid_pickinv_items`; `options.js` `select_menu_pick_any` SKIPINVERT/gacc. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **541** named wizid unid_cnt>0 PICK_ANY.

## Intent vs deliverable

Git subject promises: `#wizidentify` lists unidentified items with `_`/`^I` `identify_pack` instead of dismissing.

Pinned C `invent.c` `display_pickinv` `:3222–3407`. Empty `:3140–3142`. Title+`'_'` SKIPINVERT `:3222–3251`. Skip `!not_fully_identified` `:3274–3275`. `select_menu` PICK_ANY `:3380–3407` (`override_ID=0`; fakeobj → `identify_pack(0,FALSE)` break; else `identify`; `!all_id` `update_inventory`). `identify_pack` `:2710–2744` ends `update_inventory`. `windows.c` `menuitem_invert_test` `:1561–1589` (`mode UNUSED`). `hacklib.c` `visctrl` `:468–493`. `MENU_ITEMFLAGS_SKIPINVERT` `wintype.h:167` `0x2`. Caller `wizcmds.c` `wiz_identify` sets `override_ID` then `display_inventory`. `--callers display_pickinv`: getobj `:1979`; `display_inventory` `:3451`; perm `:3458`.

```3222:3250:nethack-c/upstream/src/invent.c
    if (wizid) {
        ...
        if (!unid_cnt) {
            add_menu_str(win, "(all items are permanently identified already)");
            gotsomething = TRUE;
        } else {
            any.a_obj = &wizid_fakeobj;
            ...
            add_menu(win, &nul_glyphinfo, &any, '_', iflags.override_ID,
                     ATR_NONE, clr, prompt, MENU_ITEMFLAGS_SKIPINVERT);
```

Old JS: unid_cnt==0 dismiss live; unid_cnt>0 cleared `override_ID` and returned. `select_menu_pick_any` bulk-toggled SKIPINVERT rows.

The diff **does** live the PICK_ANY menu, `_`/`^I`/`letters`/class gacc, SKIPINVERT, `identify_pack`+`update_inventory`. It **does not** port MENU_SEARCH, count-prefix, MENU_PREV/FIRST/LAST, `display_used_invlets`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `display_pickinv` wizid>0 | C `:3222–3407`, **LIVE this SHA** | |
| `build_wizid_pickinv_items` | C same, **LIVE** | export for canary |
| `WIZID_FAKEOBJ` | C `wizid_fakeobj`, **LIVE** | |
| `select_menu_pick_any` SKIPINVERT/gacc | C wintty + `:1561`, **LIVE this SHA** | |
| `menuitem_invert_test` | C `:1561–1589`, **LIVE** | `mode UNUSED` |
| `visctrl` | C `:468–493`, **LIVE** | import; not a clone |
| `identify_pack` `update_inventory` | C `:2744`, **LIVE this SHA** | was named omit |
| `identify` / `count_unidentified` / `not_fully_identified` | **LIVE** | |
| `pickinv_item_gacc(..., true)` | D-1580, **LIVE** | |
| MENU_SEARCH / count digits / PREV | **OMIT named** | |
| `display_used_invlets` | **OMIT named** | later D-1591 |

`node scripts/csym.mjs menuitem_invert_test` → `:1561-1589`. `visctrl` → `:468-493`. `count_unidentified` → `:2697-2707`. `identify_pack` → `:2710-2744`.

RNG: `obj_glyph` on listed unID items (C pickinv Hallu burn). Menu keys no RNG. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
visctrl          js/dokeylist.js:40   sync
menuitem_invert_test js/options.js:1170   sync
select_menu_pick_any js/options.js:1202   ASYNC — await required
identify_pack    js/invent.js:1197   ASYNC — await required
identify         js/invent.js:1084   ASYNC — await required
count_unidentified js/invent.js:1091   sync
not_fully_identified js/invent.js:1032   sync
update_inventory js/invent.js:2141   sync
display_pickinv_wizid NOT EXPORTED — 1 LOCAL js/invent.js:1728
build_wizid_pickinv_items js/invent.js:1653   sync
WIZID_FAKEOBJ    js/invent.js:1643   sync   export const
MENU_ITEMFLAGS_SKIPINVERT js/const.js:1104   sync
```

`--can invent.js dokeylist.js visctrl`: ALREADY. `--can invent.js options.js select_menu_pick_any`: ALREADY. Do **not** add `visctrl` #2 in invent. Do **not** add `menuitem_invert_test` in invent.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty invent. `Not carrying anything.` **Match `:3140–3142`** (wizid still hits n==0 before the Debug menu).

unid_cnt==0. Title + all-identified string, dismiss. C still `select_menu` PICK_ANY on strings-only; JS corner+`nhgetch`. **Same net dismiss.** Not a stub of the >0 arm.

unid_cnt>0. `'_'` selector, gselector `override_ID` (C('I')=9), SKIPINVERT, prompt `visctrl` when >1 (`^I`). **Match `:3238–3250`.** `visctrl(9)` → `"^I"`. **Match `:482–487`.** Items: skip fully ID'd; sortpack `let_to_name` (no showsym: C `want_reply` false on inventory()); `doname`; wizid gacc. **Match `:3273–3325` intent.** JS header-on-oclass-change vs C `nextclass` inv_order walk is the same when PACK is on (`sortpack` default).

PICK_ANY. Letter toggles (including `_`) without SKIPINVERT (C skipinvert is bulk-only). Group gacc inverts matching `gselector`. Bulk select/deselect/invert call `menuitem_invert_test` with C’s unused `mode` and mim 0/1/2. **Match `:1561–1588`.** mim 1: Off allowed (`is_selected`), On denied. **Match.**

After menu. `override_ID=0` then fakeobj → `identify_pack(0,false)` + `all_id` break; else `identify` if still unID; `!all_id` `update_inventory`. **Match `:3391–3407`.** `identify_pack` now always `update_inventory()`. **Match `:2744`.** Nested pickinv during identify is not wizid. **Match the comment.**

Callee closure (unid_cnt>0 wizid). LIVE: `count_unidentified`, `not_fully_identified`, `sortloot`, `let_to_name`, `doname`, `obj_glyph`, `visctrl`, `select_menu_pick_any`, `menuitem_invert_test`, `collect_menu_gacc`, `identify`, `identify_pack`, `update_inventory`. OMIT named: MENU_SEARCH, digits, PREV. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject unid_cnt>0 PICK_ANY `_`/`^I` `identify_pack` instead of dismiss: **true.** D-log SKIPINVERT + gacc invert: **true.** Do **not** stamp “Match C `display_used_invlets`.” Do **not** stamp “Match C MENU_SEARCH / count-prefix.” Do **not** stamp “Match C TRADITIONAL `ggetobj` identify.” Do **not** stamp “non-wizard getobj pickinv is now PICK_ANY.” `wizid=false` remains on the getobj path. Public suite has no `#wizidentify`.

## Density

One `display_pickinv` wizid arm + the PICK_ANY invert/gacc callees that arm reaches. +174 JS. Did not glue used-invlets. §2b OK.

## Branch-by-branch confirm

1. Empty invent: pline, no menu. **Match.**
2. All identified: strings, dismiss. **Match net.**
3. Some unID: `_` SKIPINVERT + letters + class gacc. **Match.**
4. `_`/`^I` → identify all unID + pack update; no second update. **Match.**
5. Letter → `identify` + `update_inventory`. **Match.**
6. ESC: n<=0, no identify. **Match.**
7. Bulk invert with mim 2: skip `_`. **Match.**
8. used-invlets / MENU_SEARCH. **Named.**

## Callers / RNG ledger

C `#wizidentify` / `^I` only (`wiz_identify`). JS `wizcmds.js` already set `override_ID=9`. Extra `obj_glyph` Hallu on unID rows is C. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `menuitem_invert_test` at windows.c home (`options.js` already owns PICK_ANY). Do not add `visctrl` in invent. Do not export a second wizid menu in `wizcmds.js`.

## Verification

D-log private canary **25**/25; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** (wizard `#wizidentify` / `^I`). SKIPINVERT mim 1/2 unhit unless the canary set `menuinvertmode`.

## Actionable C-wrongs

None for Must-fix. Named: `display_used_invlets`; MENU_SEARCH; count-prefix; MENU_PREV/FIRST/LAST; TRADITIONAL ggetobj identify; perm InvInUse. Do not add `menuitem_invert_test` #2. Do not treat unid_cnt==0 corner dismiss as a miss of PICK_ANY.

Verdict: **ACCEPT-WITH-DEBT**
