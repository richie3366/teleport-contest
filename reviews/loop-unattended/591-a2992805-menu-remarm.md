# Review 591 — a2992805 — do_wear.c menu_remarm / pickup.c query_category query_objlist (D-1630)

## Metadata
- Full / short hash: `a29928051cd1b09917f627724371e12c488044e5` / `a2992805`
- Parent: `eb3b1438` (audit #2030). This file audits **this SHA only** (first of nine `js/` commits since review **590**). Archive **Addressed:** D-1630 `a2992805`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 06:50:36 +0200
- D-id: **D-1630**
- Stats: `js/pickup.js` +413, `js/do_wear.js` +83/−8, `js/invent.js` +2/−1. Band **200–450** (js/ insertions **498** >250; id >454).
- Claims to close: Open `menu_remarm` after D-1619. Not take_off occupation. Not `obj_to_glyph`. `reviews/loop-2026-08-15/` has no unpaid menu_remarm Must-fix.
- JS / map: `do_wear.js` `menu_remarm`; `pickup.js` `query_category` / `query_objlist` / `is_worn_by_type`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **580** named `menu_remarm` `:3089` after `take_off` occupation.

## Intent vs deliverable

Git subject promises: `'A'` MENU_FULL shows worn-type `query_category` then invent `query_objlist` PICK_ANY (and COMBINATION `ggetobj` combo), instead of skipping the take-off menu after D-1619.

Pinned C `do_wear.c` `menu_remarm` `:3089–3138` (`node scripts/csym.mjs menu_remarm`). Caller `doddoremarm` `:3040` (`--callers menu_remarm`: `:40` prototype, `:3040` call, `pickup.c:1321` comment). `doddoremarm` `:3021–3057`. Callees `pickup.c` `query_category` `:1225–1508`, `query_objlist` `:1024–1216`, `is_worn_by_type` `:608–612`, `count_categories` `:1510–1536`. `invent.c` `is_worn` `:2155–2161`. `ggetobj` combo ALL_FINISHED is D-1602. take_off occupation is D-1619.

```3089:3138:nethack-c/upstream/src/do_wear.c
staticfn int
menu_remarm(int retry)
{
    int n, i = 0;
    menu_item *pick_list;
    boolean all_worn_categories = TRUE;

    if (retry) {
        all_worn_categories = (retry == -2);
    } else if (flags.menu_style == MENU_FULL) {
        all_worn_categories = FALSE;
        n = query_category("What type of things do you want to take off?",
                           gi.invent, (WORN_TYPES | ALL_TYPES
                                    | UNPAID_TYPES | BUCX_TYPES),
                           &pick_list, PICK_ANY);
        if (!n)
            return 0;
        for (i = 0; i < n; i++) {
            if (pick_list[i].item.a_int == ALL_TYPES_SELECTED)
                all_worn_categories = TRUE;
            else
                add_valid_menu_class(pick_list[i].item.a_int);
        }
        free((genericptr_t) pick_list);
    } else if (flags.menu_style == MENU_COMBINATION) {
        unsigned ggofeedback = 0;

        i = ggetobj("take off", select_off, 0, TRUE, &ggofeedback);
        if (ggofeedback & ALL_FINISHED)
            return 0;
        all_worn_categories = (i == -2);
    }
    if (menu_class_present('u')
        || menu_class_present('B') || menu_class_present('U')
        || menu_class_present('C') || menu_class_present('X'))
        all_worn_categories = FALSE;

    n = query_objlist("What do you want to take off?", &gi.invent,
                      (SIGNAL_NOMENU | USE_INVLET | INVORDER_SORT),
                      &pick_list, PICK_ANY,
                      all_worn_categories ? is_worn : is_worn_by_type);
    if (n > 0) {
        for (i = 0; i < n; i++)
            (void) select_off(pick_list[i].item.a_obj);
        free((genericptr_t) pick_list);
    } else if (n < 0 && flags.menu_style != MENU_COMBINATION) {
        There("is nothing else you can remove or unwield.");
    }
    return 0;
}
```

Old JS (D-1619): `doddoremarm` TRADITIONAL `ggetobj`+`select_off` then `take_off`; non-traditional / `'m'` skipped `menu_remarm` (named omit). `query_category` / invent `query_objlist` were NOT FOUND.

The diff **does** add local `menu_remarm` (FULL category then object list; COMBINATION combo+ALL_FINISHED; retry `-2` all-worn), wire `doddoremarm` assignment `result = ggetobj(...) < -1`, export `is_worn_by_type` / `query_category` / `query_objlist` / local `count_categories`, import `is_worn` into `do_wear.js`. It **does not** port `obj_to_glyph(rn2_on_display_rng)`, INCLUDE_HERO fake-you, ParanoidAutoAll `paranoid_ynq`, invent.c `dotypeinv` PICK_ONE, loot `query_loot_category` rewrite, or floor `query_objlist_pickup`. Named. Floor pickup still uses the existing clone.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `menu_remarm` | C `:3089–3138` staticfn, **LIVE this SHA** | local do_wear.js; do not export #2 |
| `doddoremarm` | C `:3021–3057`, **LIVE this SHA** | wires `:3040` |
| `query_category` | C `:1225–1508`, **LIVE this SHA** | pickup.js export; `how`→`select_menu_pick_any` |
| `query_objlist` | C `:1024–1216`, **LIVE this SHA** | invent/take-off; no glyph |
| `is_worn_by_type` | C `:608–612`, **LIVE this SHA** | `is_worn && allow_category` |
| `count_categories` | C `:1510–1536` staticfn, **LIVE this SHA** | local; WORN skip W_ARMOR\|ACCESSORY\|WEAPONS |
| `is_worn` | C `:2155–2161`, **LIVE** | invent.js import, not cloned |
| `select_off` | C, **LIVE** | local do_wear.js (D-1602) |
| `ggetobj` combo | C, **LIVE** | invent.js D-1602 ALL_FINISHED |
| `add_valid_menu_class` / `menu_class_present` | C, **LIVE** | pickup.js |
| `count_buc` / `count_unpaid` | C invent.c, **LIVE** | pre-existing; FULL BUCX/UNPAID |
| `allow_category` / `sortloot` / `let_to_name` / `doname_with_price` | C, **LIVE** | |
| `select_menu_pick_any` | C `select_menu` PICK_ANY, **CLONE** | options.js; this SHA’s `how` |
| `obj_to_glyph` / `rn2_on_display_rng` | C `:1132`, **OMIT named** | |
| INCLUDE_HERO / `this_title` | C `:1064` / `:1092`, **OMIT named** | |
| ParanoidAutoAll / `paranoid_ynq` | C `:1382` / `:1464`, **OMIT named** | `verify_All` stays false; menu_remarm does not pass CHOOSE_ALL |
| `query_objlist_pickup` / `query_loot_category` | floor/loot, **CLONE kept** | named; not this arm |
| invent.c `dotypeinv` PICK_ONE | C `:3873`, **OMIT named** | |

`node scripts/csym.mjs menu_remarm` → `do_wear.c:3089-3138`. `query_category` → `pickup.c:1225-1508`. `query_objlist` → `pickup.c:1024-1216`. `is_worn_by_type` → `pickup.c:608-612`. `count_categories` → `pickup.c:1510-1536`. `doddoremarm` → `do_wear.c:3021-3057`. `is_worn` → `invent.c:2155-2161`. `--callers menu_remarm` `:3040`. `--callers query_category` includes `do_wear.c:3100`, `do.c:994` (`menu_drop`, later D-1635), `pickup.c:3286` (`menu_loot`), `invent.c:3873` PICK_ONE.

RNG: none in `menu_remarm`. C `query_objlist` calls `obj_to_glyph(curr, rn2_on_display_rng)` per row — **named omit** (display RNG, not positional). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
menu_remarm      NOT EXPORTED — 1 LOCAL js/do_wear.js:1545
doddoremarm      js/do_wear.js:1601   ASYNC — await required
query_category   js/pickup.js:384   ASYNC — await required
query_objlist    js/pickup.js:581   ASYNC — await required
is_worn_by_type  js/pickup.js:334   sync
count_categories NOT EXPORTED — 1 LOCAL js/pickup.js:357
is_worn          js/invent.js:475   sync
select_off       NOT EXPORTED — 1 LOCAL js/do_wear.js:1226
allow_category   js/pickup.js:302   sync
add_valid_menu_class js/pickup.js:274   sync
menu_class_present js/pickup.js:297   sync
ggetobj          js/invent.js:535   ASYNC — await required
ALL_FINISHED     js/const.js:1693   sync
ALL_TYPES_SELECTED js/const.js:1710   sync
query_objlist_pickup NOT EXPORTED — 1 LOCAL js/pickup.js:1214
obj_to_glyph     NOT FOUND in js/**
let_to_name      js/invent.js:933   sync
doname_with_price js/shk.js:2682   sync
select_menu_pick_any js/options.js:1225   ASYNC — await required
```

`--can do_wear.js pickup.js query_category`: ALREADY. Same for `query_objlist` / `is_worn_by_type` / `add_valid_menu_class`. `--can do_wear.js invent.js is_worn`: ALREADY. `--can pickup.js invent.js is_worn` / `count_unpaid` / `let_to_name`: ALREADY. `--can pickup.js shk.js doname_with_price`: ALREADY. `--can pickup.js options.js select_menu_pick_any`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `menu_remarm` #2. Do **not** add `query_objlist` #3 (floor clone stays `query_objlist_pickup`). Do **not** add a no-op `obj_to_glyph`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`doddoremarm` gate. C `menu_style != TRADITIONAL || (result = ggetobj(..., FALSE)) < -1` then `menu_remarm(result)`. JS the same assignment in the `||` arm, `result` starts 0 so FULL/COMBINATION pass retry 0. **Match `:3036–3040`.** Empty-worn / continue occupation unchanged (D-1185 / D-1619).

`menu_remarm` FULL. Flags `WORN_TYPES|ALL_TYPES|UNPAID_TYPES|BUCX_TYPES`, PICK_ANY. `const.js` bits match `hack.h:1257–1269` (`WORN_TYPES=0x0010`, `ALL_TYPES=0x0020`, `BUCX_TYPES=BUC_ALLBKNOWN|BUC_UNKNOWN`, `ALL_TYPES_SELECTED=-2`). Empty category list → return 0. ALL_TYPES_SELECTED sets `all_worn_categories`; else `add_valid_menu_class`. Then unpaid/BUCX `menu_class_present` forces false. **Match `:3098–3124`.**

```1225:1308:nethack-c/upstream/src/pickup.c
    ccount = count_categories(olist, qflags);
    /* no point in actually showing a menu for a single category */
    if (ccount == 1 && !do_unpaid && !do_usedup && num_buc_types <= 1) {
        for (curr = olist; curr; curr = FOLLOW(curr, qflags)) {
            if (ofilter && !(*ofilter)(curr))
                continue;
            break;
        }
        if (curr) {
            *pick_list = (menu_item *) alloc(sizeof(menu_item));
            (*pick_list)->item.a_int = curr->oclass;
            n = 1;
        } else {
            n = 0;
        }
        return n;
    }
```

Single-class skip. C `count_categories` WORN skips `!(owornmask & (W_ARMOR|W_ACCESSORY|W_WEAPONS))` — not `is_worn` (no `W_SADDLE`). JS `count_categories` same mask; `inv_order_pack()` without INCLUDE_VENOM ≡ C `flags.inv_order` only. Early return `[{a_int: curr.oclass}]`. **Match `:1287–1308` / `:1510–1536`.** Journal “single-class skip canary” is this arm.

`query_category` WORN ofilter. C `ofilter = is_worn` when WORN_TYPES; BUC `count_buc(..., ofilter)`. JS same. Priest `count_buc` bknown side effect is the pre-existing invent.c port, not a new clone.

COMBINATION. C `ggetobj(..., TRUE, &ggofeedback)`; `ALL_FINISHED` → return 0; `all_worn_categories = (i == -2)`. JS `ggofeedback.bits`. **Match `:3113–3120`.**

TRADITIONAL `'m'`. C ggetobj `-2`/`-3` is `< -1`; retry `-2` keeps all-worn, `-3` does not. JS `retry === -2`. **Match `:3096–3097`.**

`query_objlist` flags. C `SIGNAL_NOMENU|USE_INVLET|INVORDER_SORT`, PICK_ANY, `is_worn` vs `is_worn_by_type`. n>0 `select_off(a_obj)` (count unused). n<0 and not COMBINATION → There. JS `pline('There is nothing else you can remove or unwield.')`. Empty invent Array early-out `{n:0}` ≡ C `!olist` return 0 (not SIGNAL_NOMENU −1). Allowed-none with SIGNAL_NOMENU → −1. **Match `:3126–3136` and `:1048–1071` for this caller.**

`query_objlist` sort. C `sortloot` flags from sortloot `'f'`/`'l'`+USE_INVLET, sortpack, FEEL_COCKATRICE; INVORDER_SORT groups via `flags.inv_order`. JS same; `doname_with_price`; USE_INVLET selector from `invlet`. **Match the invent walk.** Cockatrice `look_here` abort is in the body (unhit for take-off).

Callee closure (FULL arm). LIVE: `query_category`, `query_objlist`, `is_worn`, `is_worn_by_type`, `add_valid_menu_class`, `menu_class_present`, `select_off`, `count_categories`, `count_buc`, `count_unpaid`, `allow_category`, `sortloot`, `let_to_name`, `doname_with_price`, `pline`. CLONE: `select_menu_pick_any` (PICK_ANY only). OMIT named: `obj_to_glyph`, INCLUDE_HERO, ParanoidAutoAll/`paranoid_ynq`. STUB: none on this arm. COMBINATION arm LIVE `ggetobj`. The arm may ship. Not “dispatch ported, callee is a stub.”

`query_category` `how`. C `select_menu(win, how, pick_list)`. JS always `select_menu_pick_any`. This SHA’s only caller passes PICK_ANY (`:3103`). invent.c `:3873` PICK_ONE and loot/drop CHOOSE_ALL are **not** this SHA’s callers (loot still `query_loot_category`; drop is D-1635). Do **not** stamp “Match C `select_menu(how)` for PICK_ONE.”

CHOOSE_ALL / ParanoidAutoAll. C `:1382` `verify_All = (how==PICK_ANY) && ParanoidAutoAll` then `:1454–1502` `paranoid_ynq` or lone-`'A'` reject. JS draws the `'A'` row when the flag is set, always the first hint if cmdassist, and only the lone-`'A'` reject (`:1495–1501`). C first hint is `!ga.A_first_hint++ || iflags.cmdassist` (always once). menu_remarm **does not pass CHOOSE_ALL** (`pickup.c:1321` comment). Named. Do **not** stamp “Match C `paranoid_ynq`.”

ESC vs confirm. C `query_objlist` `n < 0` becomes SIGNAL_ESCAPE ? −2 : 0 (`:1205–1208`). This caller does not pass SIGNAL_ESCAPE, so ESC and empty confirm are both 0 and skip the There. JS `!picked.length` uses the same flag. **Match for menu_remarm.** C `query_category` `n < 0` → 0 (`:1505–1506`); JS empty pick array. **Match.**

## Hallucinations / overclaim

Subject MENU_FULL category then invent PICK_ANY, COMBINATION combo, instead of skipping after D-1619: **true.** D-log TRADITIONAL `'m'` retry and ALL_FINISHED: **true.** Map `obj_to_glyph` / INCLUDE_HERO / ParanoidAutoAll named: **true.** Do **not** stamp “Match C `obj_to_glyph` / `rn2_on_display_rng`.” Do **not** stamp “Match C INCLUDE_HERO fake-you.” Do **not** stamp “Match C ParanoidAutoAll `paranoid_ynq`.” Do **not** stamp “Match C `dotypeinv` PICK_ONE (`invent.c:3873`).” Do **not** stamp “Match C `menu_loot` / `query_loot_category` rewrite.” Do **not** stamp “Match C `menu_drop`” (D-1635). Do **not** stamp “Match C take_off occupation” (D-1619). Public `'A'` MENU_FULL is **public-unhit** (fortress does not prove the new menus).

Loot still uses local `query_loot_category` (`pickup.js:1838`); C `menu_loot` `:3286` calls live `query_category`. Named remaining clone — not this SHA’s `'A'` arm.

## Density

+498 across `menu_remarm` (C 50) plus the two pickup callees it cannot ship without (`query_category` C 284, `query_objlist` C 193, `count_categories` C 27, `is_worn_by_type` C 5). §2b one `'A'` envelope, not two Open rows glued. Did not rewrite loot/floor clones. Did not glue take_off. Above a one-`if` peel; large but one family.

## Verification

Wired: `doddoremarm` FULL / COMBINATION / TRADITIONAL `'m'`; `query_category` single-class skip; `is_worn_by_type`. Unwired C: `obj_to_glyph` rows; INCLUDE_HERO; ParanoidAutoAll yn; `dotypeinv` PICK_ONE; `menu_loot` still the loot clone. Conf: no `rn2` in this SHA’s take-off path. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict; single-class skip canary. **Public-unhit** for MENU_FULL `'A'`, COMBINATION combo, `'m'` retry, SIGNAL_NOMENU “nothing else”, and display-RNG glyphs. Fortress `'A'` TRADITIONAL (D-1602/D-1619) is the old path.

Do not treat fortress 44/44 as proof of the new FULL object list. Default `menu_style` is MENU_FULL in JS (`?? MENU_FULL`) as in C, but public keys do not press `'A'`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `obj_to_glyph` / `rn2_on_display_rng` (`pickup.c:1132`); INCLUDE_HERO fake-you / `this_title`; ParanoidAutoAll `paranoid_ynq` (`:1454–1502`); invent.c `dotypeinv` PICK_ONE (`:3873`); floor `query_objlist_pickup` and loot `query_loot_category` clones remain. `query_category`/`query_objlist` `how` is PICK_ANY-only (`select_menu_pick_any`). Do not add `menu_remarm` #2. Do not re-port `take_off` (D-1619). Do not stub `obj_to_glyph` as a constant glyph and call it Match C. Do not rewire floor pickup onto invent `query_objlist` without FEEL_COCKATRICE / BY_NEXTHERE proof.

Do not add `query_category` #2 in do_wear or loot.

Verdict: **ACCEPT-WITH-DEBT**
