# Review 648 — bad8cbd6 — invent.c dotypeinv Traditional itemize yn (D-1687)

## Metadata
- Full / short hash: `bad8cbd6559e403040ddfd4e7d6ea4b970113263` / `bad8cbd6`
- Parent: `300d7098` (D-1686). This file audits **this SHA only** (fourth of nine `js/` commits since review **644**). Archive **Addressed:** D-1687 `bad8cbd6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 22:28:25 +0200
- D-id: **D-1687**
- Stats: `js/invent.js` +302/−6; `js/pickup.js` +56/−21; `js/shk.js` +76/−2; `js/cmd.js` +7/−2; `js/getline.js` +5/−0. Total `js/` insertions **446** >250. Band **200–450**.
- Claims to close: Open Traditional itemize yn after D-1686. Not `cheapest_item`. Not `buy_container`. Not yn addcmdq. `reviews/loop-2026-08-15/` has no unpaid `dotypeinv` Must-fix.
- JS / map: `invent.js` `dotypeinv`/`tally_BUCX`/`this_type_only`; `pickup.js` PICK_ONE / this_title; `shk.js` `doinvbill`; `cmd.js` `'I'`; `getline.js` inventtype. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **636** / **647** named Traditional itemize (not rub/swap).

## Intent vs deliverable

Git subject promises: Traditional `I` / inventtype `yn_function` itemizes a class then `query_objlist` PICK_ONE + `itemactions`, instead of omitting `dotypeinv` after D-1686.

`node scripts/csym.mjs dotypeinv` → `invent.c:3826–4032`. `--callers`: `cmd.c:46`; comments `pickup.c:1092` / `extern.h:2447`. `this_type_only` `:3792–3823`. `tally_BUCX` `:3578–3616` (`--callers` `:3853`, `pickup.c:181`). `doinvbill` `shk.c:4196–4271` (`--callers` `:3838` / `:3945`). `collect_obj_classes` `pickup.c:100–118`. `query_objlist` this_title `:1091–1096`. `yn_function` `cmd.c:5471` 4th arg `addcmdq`; caller `:3928` TRUE. cmd tab `'I'` `"inventtype"` `cmd.c:1742–1743` `IFBURIED|GENERALCMD`.

```3838:3853:nethack-c/upstream/src/invent.c
    boolean billx = *u.ushops && doinvbill(0);
    ...
    if (!gi.invent && !billx) {
        You("aren't carrying anything.");
        goto doI_done;
    }
    ...
    tally_BUCX(gi.invent, FALSE, &bcnt, &ucnt, &ccnt, &xcnt, &ocnt, &jcnt);
```

```4003:4017:nethack-c/upstream/src/invent.c
        gt.this_type = oclass; /* extra input for this_type_only() */
    }
    if (strchr("BUCXP", c)) {
        Sprintf(title, "Items %s", (before && *before) ? before : after);
        (void) mungspaces(title);
        Strcat(title, ":");
        gt.this_title = title;
    }
    if (query_objlist((char *) 0, &gi.invent, ... PICK_ONE, this_type_only) > 0)
        (void) itemactions(otmp);
```

Old JS: no `dotypeinv`; `'I'` unbound / Unknown; `query_objlist` always PICK_ANY, no this_title. The diff **does** the C function plus `tally_BUCX`, `this_type_only`, `doinvbill`, PICK_ONE + this_title, `'I'` / #inventtype. It **does not** port `yn_function` addcmdq (`:5496`), Hallu `obj_to_glyph` `rn2_on_display_rng`, `cheapest_item`, or `buy_container`. Named those. Pickup keeps a local `tally_BUCX_list` clone (no priest `bknown`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dotypeinv` | C `:3826–4032`, **LIVE this SHA** | Traditional + FULL/PARTIAL |
| `this_type_only` | C `:3792–3823`, **CLONE** (local static) | oclass / BUCXP / goldX |
| `tally_BUCX` | C `:3578–3616`, **LIVE this SHA** | priest `bknown`; coins goldX |
| `doinvbill` | C `:4196–4271`, **LIVE this SHA** | mode 0 count / mode 1 menu |
| `dounpaid` | C `:3653`, **LIVE** (D-1663) | Iu |
| `collect_obj_classes` | C `:100–118`, **LIVE** | already exported |
| `query_category` PICK_ONE | C `:1225–1508`, **LIVE this SHA** | single-class skip already |
| `query_objlist` PICK_ONE / this_title | C `:1024–1216` / `:1091–1096`, **LIVE this SHA** | |
| `itemactions` | C `:4016`, **LIVE** | dynamic import |
| `yn_function` addcmdq | C `:5496` TRUE, **OMIT named** | 3-arg JS; ESC-tail hide LIVE |
| `obj_to_glyph` display RNG | C `:1131`, **OMIT named** | |
| pickup `tally_BUCX_list` | **CLONE** (pre-existing) | no priest; not this arm |
| `cheapest_item` / `buy_container` | **OMIT named** | |

RNG: none in `dotypeinv` / `tally_BUCX` / `this_type_only` / `doinvbill`. C `query_objlist` `obj_to_glyph(..., rn2_on_display_rng)` is the named Hallu omit. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
dotypeinv        js/invent.js:1392   ASYNC — await required
this_type_only   NOT EXPORTED — 1 LOCAL js/invent.js:1362
             => Do NOT write clone #2.
tally_BUCX       js/invent.js:1092   sync
doinvbill        js/shk.js:3851   ASYNC — await required
query_objlist    js/pickup.js:602   ASYNC — await required
query_category   js/pickup.js:392   ASYNC — await required
select_menu_pick_one js/options.js:1295   ASYNC — await required
collect_obj_classes js/pickup.js:269   sync
dounpaid         js/invent.js:1217   ASYNC — await required
yn_function      js/getline.js:1424   ASYNC — await required
itemactions      js/iactions.js:407   ASYNC — await required
def_char_to_objclass js/objects.js:106   sync
```

`--can invent.js shk.js doinvbill`: **ALREADY**. `--can invent.js pickup.js query_objlist`: **ALREADY**. `--can shk.js objnam.js xprname`: **ALREADY**. `itemactions` is dynamic `import('./iactions.js')`. Do **not** add `this_type_only` #2. Do **not** merge pickup `tally_BUCX_list` into a second export.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

**getline inventtype.** C `doextlist` / `rhack` `#inventtype` already mapped `'I'`. JS `getline.js` inventtype alias this SHA. Empty `class_count==1` skips yn (`:3924`). **Match.**

## C ↔ JS fidelity

**Empty / billx / unpaid / tally.** C `*u.ushops && doinvbill(0)`; no invent and !billx → “aren't carrying anything.” JS `ushops.charCodeAt(0)` + await count. `count_unpaid` invent/fobj/buried. `tally_BUCX` priest `Role_if(PM_CLERIC)` sets `bknown` except coins; coins increment X or U from `flags.goldX`; `pickup_prev` → j. **Match `:3838–3853` and `:3578–3616`.**

**FULL/PARTIAL vs Traditional.** C `menu_style != TRADITIONAL` then FULL|PARTIAL sets `traditional=FALSE` and `query_category(..., PICK_ONE)`; `this_type = a_int` (oclass integer or `'B'`…). COMBINATION stays Traditional. JS the same. C query_category `a_int = oclass` (`pickup.c:1360`); BUC rows `'B'`…`'P'`. Single-class skip `:1288–1304` already in JS (`ccount===1`). For FULL, C does **not** overwrite `this_type` with `def_char_to_objclass` (`:4003` is inside `if (traditional)`). JS the same. **Match `:3855–3878`.**

**Traditional yn.** C `collect_obj_classes` then space + `u`/`x`/BUCXP, ESC, then hidden extras including missing class syms; `class_count>1` → `yn_function(prompt, types, '\0', TRUE)`; else unpaid/`x`/types[0]. JS builds the same string (`\x1b` then extras); `yn_function` already strips ESC-tail for the shown prompt. Default `'\0'` is no `(c)` suffix. **Match the visible prompt and one-class skip.** 4th-arg addcmdq (canned KEY as the class letter) is **named omit**, not a silent stub: interactive `'I'` has no queue.

**`'x'` / `'u'` / `'X'`-as-billed.** C `'x'` or (`'X'` && billx && !xcnt) → `doinvbill(1)` or “No used-up objects…”. `'u'` or (`'U'` && unpaid && !ucnt) → `dounpaid` / “not carrying any unpaid.” JS `dotypeinv_eq` accepts letter or charCode. **Match `:3943–3957`.**

**`this_type_only`.** C: default `oclass==this_type`; `'P'` → `pickup_prev`; coins + BUCX → goldX `'X'` else `'U'`; B/U/C/X on non-coins. JS the same. **Match `:3792–3823`.**

**`itemactions` after pick.** C does not re-prompt Traditional after the action returns; JS the same (one PICK_ONE). `flags.invlet_constant` USE_INVLET on the object list. **Match `:4014–4027`.**

**COMBINATION.** C `menu_style == COMBINATION` stays Traditional (`:3856–3864` only FULL|PARTIAL flip). JS the same. Do not treat COMBINATION as `query_category`. Do not add a second Traditional yn.

**this_title + query_objlist.** C `add_menu_str(this_title)` without heading attr (`:1091–1094`); qstr NULL so no inverse prompt. PICK_ONE; `USE_INVLET` if `invlet_constant`; `INVORDER_SORT|INCLUDE_VENOM`. JS pushes `this_title` without ATR_INVERSE; `qstr` null skips the inverse row; PICK_ONE via `select_menu_pick_one`. **Match.** `obj_to_glyph` RNG named.

**`doinvbill`.** mode 0: debit?1:0 plus useup or `quan < bquan`. mode 1: heading, `xprname` used-up rows (`suppress_price`), debit GOLD_SYM, Total `*`. JS `xprname(obj, let, dot, quan, txt, cost)` is the existing JS argument order ≡ C `(obj, txt, let, dot, cost, quan)`. **Match `:4196–4271`.** `bp_to_obj` invent-only is named (billobjs).

Callee closure (Traditional arm). LIVE: `doinvbill`, `tally_BUCX`, `collect_obj_classes`, `yn_function` (prompt), `dounpaid`, `query_objlist`, `this_type_only`, `itemactions`. CLONE: `this_type_only` matched here. OMIT named: addcmdq; Hallu glyph; billobjs `find_oid`. STUB: **none**. FULL arm: LIVE `query_category` PICK_ONE. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

**cmd.c `'I'`.** C `"inventtype"` `IFBURIED|GENERALCMD` `:1742–1743`. JS cmd tab the same after this SHA. After PICK_ONE, C `itemactions(otmp, FALSE)` (`:4024`); JS awaits `itemactions` on the picked object. Empty Traditional (no classes, no bill, no unpaid) still `You aren't carrying anything.` / `Never_mind` on ESC. **Match the cmd entry and post-pick.**

**`tally_BUCX` goldX.** C coins with BUCX requested count as `'X'` not `'U'` (`:3588–3592`). JS the same so Traditional `X` is not an unpaid-only menu. Pickup’s `tally_BUCX_list` priest walk stays a named clone (not this SHA).

## Hallucinations / overclaim

Subject “Traditional I/inventtype yn_function itemizes a class then query_objlist PICK_ONE + itemactions”: **true** for MENU_TRADITIONAL (and FULL/PARTIAL via query_category). Do **not** stamp “Match C yn_function addcmdq.” Do **not** stamp “Match C `obj_to_glyph` `rn2_on_display_rng`.” Do **not** stamp “Match C `cheapest_item`.” Do **not** stamp “pickup `tally_BUCX_list` is the C priest walk.” Private canary (tally BUC/goldX; empty invent; doinvbill no-shop; this_type B/oclass/P) is the right split. Public-unhit for `'I'` itemize.

## Density

+446: one C function plus the callees that arm actually calls (`tally_BUCX`, `this_type_only`, `doinvbill`, PICK_ONE/this_title). §2b cluster, large but not “finish invent.c.” Did not glue `cheapest_item`.

## Verification

Wired: `'I'` / #inventtype; Traditional yn class string; Iu/Ix; BUCXP title; PICK_ONE `itemactions`; priest tally; goldX coins. Unwired C: addcmdq; Hallu glyph RNG; billobjs; pickup tally clone priest. Conf: no extra `rn2` in the new functions. No seed gate.

Journal: private canary **10**/10; green+strict seed8000/0900; cohort **7**/7 + strict. Public suite does not type `'I'`.
Rule #2 `--rulecheck` at HEAD clean.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): yn addcmdq; Hallu `obj_to_glyph`; `find_oid`/billobjs in `bp_to_obj`; pickup `tally_BUCX_list` priest; `cheapest_item`; `buy_container`. Do **not** add `this_type_only` #2. Do **not** re-port D-1686 rub/swap. Do **not** restore `'I'` Unknown.

Verdict: **ACCEPT-WITH-DEBT**
