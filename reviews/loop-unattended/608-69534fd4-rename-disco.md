# Review 608 — 69534fd4 — o_init.c rename_disco + disco_append_typename (D-1647)

## Metadata
- Full / short hash: `69534fd49d95c8621266cb2bcb7097ca7a702d4f` / `69534fd4`
- Parent: `48758020` (D-1646). This file audits **this SHA only** (ninth of nine `js/` commits since review **599**). Archive **Addressed:** D-1647 (this review commit fills `69534fd4` if the DONE row still lacks `%h`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 11:53:52 +0200
- D-id: **D-1647**
- Stats: `js/o_init.js` +135/−2, `js/do_name.js` +10/−5, `js/invent.js` +7/−31. Band **150–350** (js/ insertions **152** <250; id >454).
- Claims to close: Open `rename_disco` after D-1638. Not `'o'` getobj `"call"`. Not `do_mgivenname` (D-1638). Not MENU_SEARCH (D-1646). Review **599** named `'o'`/`rename_disco` still returning. `reviews/loop-2026-08-15/` has no unpaid rename_disco Must-fix.
- JS / map: `o_init.js` `rename_disco` / `disco_append_typename` / `interesting_to_discover`; `do_name.js` `docallcmd`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named `'d'`/`'\\'` return after D-0069/D-1638; invent clone of `interesting_to_discover`.

## Intent vs deliverable

Git subject promises: `#name` `d`/`\` lists callable discoveries by `inv_order` and `docall`s a dummy, instead of returning after D-1638.

Pinned C `o_init.c` `rename_disco` `:1130–1206` (`node scripts/csym.mjs rename_disco`). `--callers rename_disco`: `do_name.c:594` only. Callees `interesting_to_discover` `:525–540` (`--callers` `:828/:977/:1092/:1160`); `disco_append_typename` `:692–721` (`--callers` `:847/:1097/:1175`); `do_name.c` `objtyp_is_callable` `:428–463`; `docall` `:635–676`. `docallcmd` `:498–601` (`case 'd'` `:593–595`; `'\\'` is group accelerator `a_char='d'`).

```1130:1176:nethack-c/upstream/src/o_init.c
    /* Skip unique/artifact sections and venom (packorder omit). */
    for (s = flags.inv_order; *s; s++) {
        ...
            if (!dis || !interesting_to_discover(dis))
                continue;
            ct++;
            if (!objtyp_is_callable(dis))
                continue;
            mn++;
            ...
            disco_append_typename(buf, dis);
            add_menu(..., buf, ...);
```

Old JS: `'d'`/`'\\'` early return; `interesting_to_discover` lived in invent.js; dodiscovered inlined typename+price. The diff **does** C-home helpers, inv_order walk, empty/none-callable plines, PICK_ONE dummy `docall`, dodiscovered via `disco_append_typename`. It **does not** port `'o'` `getobj("call")`, `oc_uses_known` extract helper, or discosort unique+artifact `\` sections. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rename_disco` | C `:1130–1206`, **LIVE this SHA** | `o_init.js:355` ASYNC |
| `interesting_to_discover` | C `:525–540`, **LIVE this SHA** | C-home; invent clone **deleted** |
| `disco_append_typename` | C `:692–721`, **LIVE this SHA** | was `staticfn`; JS export |
| `rename_disco_inv_order` | C `flags.inv_order`, **CLONE** | array vs C string |
| `objtyp_is_callable` | C `:428–463`, **LIVE** | not re-ported |
| `docall` | C `:635–676`, **LIVE** | dummy is not `observe_object` |
| `let_to_name` | C invent.c, **LIVE** | headings |
| `select_menu_pick_one` | C `select_menu` PICK_ONE, **LIVE** | D-1646 SEARCH available |
| `docallcmd` `'d'`/`'\\'` | C `:593–595`, **LIVE this SHA** | `'o'`/`'n'` still return |
| `'o'` getobj `"call"` | C `:573–588`, **OMIT named** | |
| `oc_uses_known` extract | C dummy `known=`, **OMIT named** as helper | inline `!oc_uses_known` **LIVE** |
| discosort unique+artifact `\` | C dodiscovered sections, **OMIT named** | comment in `rename_disco` is skip of those **menu sections**, not a per-otyp `oc_unique` filter in the class loop |

`node scripts/csym.mjs rename_disco` → `o_init.c:1130-1206`. `interesting_to_discover` → `:525-540`. `disco_append_typename` → `:692-721`. `objtyp_is_callable` → `do_name.c:428-463`. `docall` → `do_name.c:635-676`. `docallcmd` → `do_name.c:498-601`. `--callers rename_disco`: `:594`. `--callers interesting_to_discover`: includes `:1160`. `--callers disco_append_typename`: includes `:1175`.

RNG: none in `rename_disco` / `interesting_to_discover` / `disco_append_typename`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
rename_disco     js/o_init.js:355   ASYNC — await required
disco_append_typename js/o_init.js:323   sync
interesting_to_discover js/o_init.js:306   sync
docall           js/do_name.js:1169   ASYNC — await required
objtyp_is_callable js/do_name.js:84   sync
```

`--can do_name.js o_init.js rename_disco`: ALREADY. `--can o_init.js do_name.js docall`: ALREADY. `--can o_init.js invent.js let_to_name`: ALREADY. `--can invent.js o_init.js interesting_to_discover`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** restore invent `interesting_to_discover` clone #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`docallcmd`. C `case 'd': rename_disco();` `'\\'` is the group accelerator for `a_char='d'`. JS `if (ch === 'd' || ch === '\\') await rename_disco(); return;` then `'o'`/`'n'` still return. **Match the `'d'` arm.** Do **not** stamp “Match C `'o'` getobj.”

`rename_disco` walk. C `flags.inv_order` bytes; skip unique/artifact **sections** and venom because packorder omits venom — the loop is still per `oclass` in inv_order, not a `oc_unique` continue. JS `rename_disco_inv_order()` array else `DEF_INV_ORDER`. `bases[oclass]` through `NUM_OBJECTS` same class. `disco[i]`; skip `!dis || !interesting_to_discover`; `ct++`; skip `!objtyp_is_callable`; `mn++`; heading `let_to_name` when class changes; `disco_append_typename("", dis)` as the selectable text. **Match `:1153–1180`.**

Empty / none-callable. C `ct==0` → `You("haven't discovered anything yet...")`; `mn==0` → `pline("None of your discoveries can be assigned names...")`; else `end_menu` + `select_menu` PICK_ONE. JS the two plines (You-string includes “You”) then `select_menu_pick_one`. C always `create_nhwindow` then `destroy` even on empty; JS never opens a menu when `ct==0`/`mn==0`. Analogue (no empty NHW_MENU), not a skipped You(). **Match the messages.**

Dummy. C `odummy = zeroobj`; `otyp=dis`; `oclass=objects[dis].oc_class`; `quan=1`; `known=!objects[dis].oc_uses_known`; `dknown=1` “not observe_object”. JS the same five fields. Extra `zeroobj` zeros **named analogue**. `docall` already live (D-1624 name_from_player). **Match `:1192–1202`.** Cancel / no pick leaves `STRANGE_OBJECT` and skips `docall`. **Match.**

`interesting_to_discover`. Samurai Japanese always; else `oc_uname` or `(known|encountered) && OBJ_DESCR`. JS `objectDescrs[di] != null`. **Match `:525–540`.** One C-home export; invent clone removed. Do **not** add clone #2.

`disco_append_typename`. If `len+typnm < BUFSZ` concat; else keep `" (actual type)"` tail when `lastIndexOf('(')` has space-before and `)`; else truncate. Then `append_price_quote`. JS returns a new string instead of mutating `buf`. **Match `:692–721`.** `append_price_quote` leftover BUFSZ is already named in shk.js.

Callee closure (`'d'` arm). LIVE: `interesting_to_discover`, `objtyp_is_callable`, `disco_append_typename`, `let_to_name`, `select_menu_pick_one`, `docall`. CLONE: `rename_disco_inv_order`. OMIT named: `'o'` getobj, discosort unique+artifact sections, `cmdq_pop` (pre-existing docallcmd). STUB: **none in the live `'d'` arm.** Combined-arm ships. Not “dispatch ported, callee stubbed.” `'o'` remains its own Open row.

## Hallucinations / overclaim

Subject `#name` `d`/`\` inv_order PICK_ONE dummy `docall`: **true.** D-log green+cohort: **claimed; this review does not re-run.** Do **not** stamp “Match C `'o'` getobj(`call`).” Do **not** stamp “Match C `oc_unique` skip inside the class loop” — C’s comment is about `\ ` menu **sections**. Do **not** stamp “Match C always create/destroy NHW_MENU on empty.” Public `#name` `d` is **public-unhit** unless a session names discoveries.

## Density

+152: C `rename_disco` 77 + `disco_append_typename` 30 + `interesting_to_discover` 16 + docallcmd wire + invent clone retirement. §2b one `o_init.c` discoveries family after D-1638. Did not glue `'o'`. Above a one-`if` peel.

## Verification

Wired: `'d'`/`'\\'`; ct/mn plines; dummy `dknown`/`quan`/`known`; C-home typename on `\` discoveries too. Unwired C: `'o'`; unique+artifact `\ ` sections; zeroobj padding. Conf: no `rn2`. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `#name` `d`. Fortress does not prove the disco menu.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `'o'` getobj `"call"`; discosort unique+artifact `\` sections; `cmdq_pop` / lootabc (pre-existing). Do **not** restore invent `interesting_to_discover` clone #2. Do **not** re-port `do_mgivenname` (D-1638). Do **not** re-port MENU_SEARCH (D-1646). Do **not** add `disco_append_typename` #2.

Verdict: **ACCEPT-WITH-DEBT**
