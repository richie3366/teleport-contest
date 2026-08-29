# Review 617 — 9ac19d6f — apply.c use_grease trailing update_inventory (D-1656)

## Metadata
- Full / short hash: `9ac19d6f03da1a1806fee6257dfc6d3adbc8e553` / `9ac19d6f`
- Parent: `d34f23ee` (D-1655). This file audits **this SHA only** (ninth of nine `js/` commits since review **608**). Archive **Addressed:** D-1656 (hash missing on the DONE row — fill in this audit commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 14:04:54 +0200
- D-id: **D-1656**
- Stats: `js/apply.js` +24/−127, `js/invent.js` +2/−2, `js/objnam.js` +18/−0. Band **150–350** (`js/` insertions **44** <250; id >454).
- Claims to close: Open `apply.c` `use_grease` after D-1615. Not `consume_obj_charge`. Not iactions remaining. `reviews/loop-2026-08-15/` has no unpaid grease Must-fix.
- JS / map: `apply.js` `use_grease`/`grease_ok`; `objnam.js` `gloves_simple_name`; live `invent.js` `getobj`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named trailing `:2652` and getobj clone after D-1615.

## Intent vs deliverable

Git subject promises: empty and charged paths call `update_inventory` and live `getobj` with `GETOBJ_EXCLUDE` 0, instead of skipping `:2652` and a getobj clone after D-1615.

Pinned C `apply.c` `use_grease` `:2603–2654` (`node scripts/csym.mjs use_grease`). `grease_ok` `:2584–2601`. `--callers use_grease`: `apply.c:4283` `CAN_OF_GREASE`. `getobj` invent.c with `GETOBJ_PROMPT`. `Tobjnam` `objnam.c:2289–2299`. `fingers_or_gloves` `do_wear.c:59–65`. `gloves_simple_name` `objnam.c:5531–5547`. `consume_obj_charge` `invent.c:1336–1346`. `make_glib` `potion.c:460–468`. `hack.h` `GETOBJ_PROMPT` `0x2`.

```2608:2654:nethack-c/upstream/src/apply.c
    if (Glib) {
        pline("%s from your %s.", Tobjnam(obj, "slip"),
              fingers_or_gloves(FALSE));
        dropx(obj);
        return ECMD_TIME;
    }
    if (obj->spe > 0) {
        ...
        otmp = getobj("grease", grease_ok, GETOBJ_PROMPT);
        ...
    } else {
        if (obj->known)
            pline("%s empty.", Tobjnam(obj, "are"));
        else
            pline("%s to be empty.", Tobjnam(obj, "seem"));
    }
    update_inventory();
    return ECMD_TIME;
```

Old JS: `getobj_grease` clone; no `:2652`; `gloves_simple_name_towel` always `"gloves"`; `Tobjnam_grease` (not `otense`). The diff **does** trailing `update_inventory`, live `getobj('grease', grease_ok, GETOBJ_PROMPT)`, `Tobjnam` import, `gloves_simple_name` gauntlets `strstri`, `Glib()` for the `if` and `Glib() & TIMEOUT`. It **does not** port sit.c `special_throne_effect` grease spray or `shk_owns`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `use_grease` | C `:2603–2654`, **LIVE this SHA** | **ASYNC**; `doapply` CAN_OF_GREASE |
| `grease_ok` | C `:2584–2601` static, **LIVE this SHA** (local) | do **not** add clone #2 |
| `getobj` | C invent.c, **LIVE** | this SHA retires `getobj_grease` |
| `update_inventory` | C invent.c, **LIVE** | trailing `:2652` |
| `consume_obj_charge` | C `:1336–1346`, **LIVE** | D-1615; not re-ported |
| `Tobjnam` | C `:2289–2299`, **LIVE this SHA** on this arm | apply `Tobjnam_grease` remains for other arms |
| `gloves_simple_name` | C `:5531–5547`, **LIVE this SHA** | fountain + trap clones — **do not add #3** |
| `fingers_or_gloves_apply` | C `:59–65`, **CLONE** | now calls LIVE `gloves_simple_name` |
| `Glib` | C youprop.h, **LIVE** | potion.js; not `Glib_apply()` for TIMEOUT |
| `make_glib` | C `:460–468`, **LIVE** | |
| `dropx` | C do.c, **LIVE** | **ASYNC** |
| `yname` | C objnam, **LIVE** | cover-object pline |
| `inaccessible_equipment` | C do_wear, **LIVE** | `equipment_is_inaccessible` predicate |
| `hands_obj` | C, **LIVE** | weapon.js |
| `GETOBJ_PROMPT` | C `0x2`, **LIVE** | const.js `0x02` |
| `GETOBJ_EXCLUDE` | C hack.h **`-3`**, JS const.js **`0`** | live getobj uses JS `0` |
| sit.c throne grease | C sit.c `:268–276`, **OMIT named** | same COIN skip as `grease_ok` |
| `shk_owns` | C inaccessible, **OMIT named** | |
| fountain/trap/potion `gloves_simple_name` | **CLONE** leftover | trap still always `"gloves"` |
| `getobj_grease` | **deleted this SHA** | |

`node scripts/csym.mjs use_grease` → `:2603-2654`. `grease_ok` → `:2584-2601`. `Tobjnam` → `objnam.c:2289-2299`. `fingers_or_gloves` → `do_wear.c:59-65`. `gloves_simple_name` → `:5531-5547`. `make_glib` → `potion.c:460-468`. `consume_obj_charge` → `:1336-1346`. `--callers use_grease`: `:4283`. `--callers gloves_simple_name`: apply towel `:169`; do_wear; pray; trap; zap; objnam armor.

RNG: cursed/Fumbling `!rn2(2)` **before** getobj; then `rn1(6,10)` (object, cursed, `!nohands`) or `rn1(11,5)` (hands). **Same order as C.** No seed gate. getobj itself has no extra `rn2` here.

`node scripts/sym.mjs` on new / re-pointed / deleted names:

```
use_grease       js/apply.js:2262   ASYNC — await required
grease_ok        NOT EXPORTED — 1 LOCAL js/apply.js:2246
             => Do NOT write clone #2.
getobj           js/invent.js:6014   ASYNC — await required
gloves_simple_name js/objnam.js:991   sync
             !! ALSO 2 LOCAL CLONE(S) — js/fountain.js:995  js/trap.js:2934
Tobjnam          js/objnam.js:1371   sync
             !! ALSO 7 LOCAL CLONE(S) — detect/do/dothrow/mthrowu/music/sit/…
Glib             js/potion.js:825   sync
make_glib        js/potion.js:853   sync
update_inventory js/invent.js:3290   sync
consume_obj_charge js/invent.js:3311   ASYNC — await required
yname            js/objnam.js:1936   sync
             !! ALSO 4 LOCAL CLONE(S) — lock/music/pickup/uhitm
fingers_or_gloves NOT EXPORTED — 2 LOCAL js/eat.js:2012  js/fountain.js:1010
             => Do NOT write clone #3. (apply uses fingers_or_gloves_apply)
dropx            js/do.js:2147   ASYNC — await required
inaccessible_equipment js/apply.js:2208   ASYNC — await required
```

`--can apply.js invent.js getobj`: ALREADY. `--can apply.js objnam.js Tobjnam`: ALREADY. `--can apply.js objnam.js gloves_simple_name`: ALREADY. `--can apply.js potion.js Glib`: ALREADY. `--can apply.js potion.js make_glib`: ALREADY. `--can apply.js objnam.js yname`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `gloves_simple_name` #3. Do **not** add `Tobjnam` #8. Do **not** add `fingers_or_gloves` #3. Do **not** add `yname` #5. Do **not** add `grease_ok` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`Glib` first. C `if (Glib)` then `Tobjnam`/`fingers_or_gloves(FALSE)`/`dropx`/`ECMD_TIME` — **no** trailing update. JS `Glib()` (not boolean-only `Glib_apply()`), live `Tobjnam`, clone fingers, `dropx`, early return. **Match `:2608–2613`.**

Charged slip. C `(cursed || Fumbling) && !rn2(2)` then `consume_obj_charge(obj, TRUE)` then slip pline/`dropx`/`ECMD_TIME`. JS same, `await consume_obj_charge(obj, true)`. **Match `:2615–2625`.** getobj is not reached.

`getobj("grease", grease_ok, GETOBJ_PROMPT)`. JS `await getobj('grease', grease_ok, GETOBJ_PROMPT)`. **Match `:2626`.** `!otmp` → `ECMD_CANCEL` (no `:2652`). **Match `:2627–2628`.** `inaccessible_equipment(otmp, "grease", FALSE)` → `ECMD_OK`. **Match `:2629–2628`.** Then `consume_obj_charge` then grease/hands. **Match.**

`grease_ok`. C null → `GETOBJ_SUGGEST` (hands). Coin → `GETOBJ_EXCLUDE`. `inaccessible_equipment(obj, NULL, FALSE)` → `EXCLUDE_INACCESS`. Else SUGGEST. JS `!obj` SUGGEST; coin `GETOBJ_EXCLUDE_C` (const.js `0`); `equipment_is_inaccessible(obj, false)`. **Match the branches.** C `GETOBJ_EXCLUDE` is **`-3`** (`hack.h:515`). JS live `getobj` compares `=== GETOBJ_EXCLUDE` from const.js **`0`**. The deleted clone used apply’s local `-3`, which would **not** hit invent.js gold/`silly_thing`. Returning `0` is required for the **LIVE** callee, not because C’s enum is 0. **Do not stamp Match C `-3`.** Semantic: coins excluded, gold “You cannot grease gold.” Live `getobj_finish_pick` `:6154–6157`. **Match that message path.** Hands SUGGEST + `GETOBJ_PROMPT` `0x2`. **Match C `0x2`.**

Hands vs object. C `otmp != &hands_obj`: `yname` cover, `greased=1`, cursed `!nohands` `make_glib(oldglib+rn1(6,10))` then fingers TRUE. Else `make_glib(oldglib+rn1(11,5))` coat fingers TRUE. JS `otmp !== hands_obj`, `yname`, `nohands(game.youmonst?.data)`, `Glib() & TIMEOUT` as `oldglib`. **Match `:2633–2645`.** `make_glib` may `update_inventory` when `uarmg` (C `:466–467`); then trailing `:2652` still runs. **Match the double call.**

Empty. C known `"are" empty` else `"seem" to be empty` via `Tobjnam`. JS live `Tobjnam` (not `Tobjnam_grease` which skipped `otense` when `quan!==1`). **Match `:2646–2651`.** Then `update_inventory()`. **Match `:2652`.** Early Glib/slip/cancel/inaccessible still skip it. **Match.**

`gloves_simple_name`. C `dknown` then `strstri(oc_name_known ? OBJ_NAME : OBJ_DESCR, "gauntlets")`. JS `objectNameStrs`/`objectDescrs` + `strstri_objnam`. **Match `:5531–5547`.** `use_towel` glib wipe also switched from the always-`"gloves"` stub. Related envelope. fountain/potion clones still local; trap clone still stubs `"gloves"`. Named.

Callee closure (`use_grease` arms). LIVE: `getobj`, `update_inventory`, `consume_obj_charge`, `Tobjnam`, `gloves_simple_name`, `Glib`, `make_glib`, `dropx`, `yname`, `inaccessible_equipment`, `Fumbling`, `nohands`. CLONE: `grease_ok` (C static); `fingers_or_gloves_apply` matched to `:59–65` here. OMIT named: sit throne; `shk_owns`; other-file gloves. STUB: **none** in this arm (`getobj_grease` deleted). Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject trailing `:2652` + live getobj: **true.** D-log / map “COIN `GETOBJ_EXCLUDE` 0”: **true for `js/const.js` and invent.js `getobj`**, **false as a C `hack.h` citation** (`GETOBJ_EXCLUDE = -3`). Do **not** stamp “Match C enum `-3` via const 0.” Do **not** stamp “Match C sit.c `special_throne_effect` grease.” Do **not** stamp “Match C `shk_owns`.” Do **not** stamp “Match C trap.js `gloves_simple_name`.” Do **not** stamp “Match C `consume_obj_charge`” as this SHA (D-1615). Public can-of-grease apply is **public-unhit** on the tourist green pair.

## Density

+44 / −127: retire getobj clone + C `:2652` + 17-line `gloves_simple_name`. C `use_grease` is 52 lines. §2b one `use_grease` family; related towel gloves. Did not glue sit.c. Above a one-`if` peel.

## Verification

Wired: `:2652`; live getobj PROMPT; coin exclude vs live `0`; gauntlets `strstri`; `Tobjnam`; `Glib() & TIMEOUT`. Unwired C: sit throne; `shk_owns`; do_wear/pray/zap/trap gloves callers. Conf: `rn2`/`rn1` order as C. No seed gate.

D-log private canary **23**/23 (empty known/seem; gold CANCEL; cover dagger; hands glib 5..15; canned `-`; handsbuf fingers; gauntlets strstri); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for empty-can perm_invent and gauntlets. Fortress does not prove `:2652`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): sit.c `special_throne_effect` grease (`:268–276`); `shk_owns` in `inaccessible_equipment`; fountain/trap/potion/do_wear `gloves_simple_name`; apply `Tobjnam_grease` leftover; `fingers_or_gloves_apply` still a suffix clone; iactions remaining. Do **not** add `gloves_simple_name` #3. Do **not** add `Tobjnam` #8. Do **not** add `fingers_or_gloves` #3. Do **not** re-port `consume_obj_charge` (D-1615). Do **not** re-port `invlet_constant` (D-1655).

Verdict: **ACCEPT-WITH-DEBT**
