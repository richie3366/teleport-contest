# Review 2975 — 6f5963d7a — process_menu_window object-symbol slot (display_pickinv)

- SHA: `6f5963d7a` (near-pass cliff; board owner wield.c ready_weapon,
  writer wintty.c process_menu_window + invent.c display_pickinv)
- D-entry: D-4135; Ledger: display_pickinv split
  (display_pickinv_reply + pickinv_build_inuse + pickinv_obj_glyphinfo);
  process_menu_window partial (paint_corner_nhw_menu +
  menu_show_obj_syms + menu_objsym_cell)
- `js/` diff: `js/invent.js` +66/−9

## Intent vs deliverable

Promise: with `menu_objsyms` on, tty draws an item's object glyph in the
`-` slot of «a - …» in the glyph's colour. JS always painted `-`.
Diff: new `pickinv_obj_glyphinfo` (obj_glyph → map_glyphinfo, the
display-RNG burn kept), `menu_show_obj_syms` (the whole-menu
`menuobjsyms & 4` test), and `menu_objsym_cell`, wired into both corner
painters and the display_pickinv entry builders, which now mark C's
nonzero identifiers. Promise = diff.

## Inventory

- `pickinv_obj_glyphinfo` — invent.js:2974; C invent.c:3319–3320.
- `menu_show_obj_syms` — invent.js:2988; C wintty.c:1335–1336, :1386–1393.
- `menu_objsym_cell` — invent.js:2999; C wintty.c:1474–1486.
- paint_overlay / paint_corner_nhw_menu slot writes; display_pickinv
  entry flags (`identifier: true` for the hands, xtra, special and object
  rows; `glyphinfo` only for object rows).

## C ↔ JS fidelity

```c
show_obj_syms = iflags.use_menu_glyphs;
if (only_if_no_headers)                       /* menuobjsyms & 4 */
    for (curr = cw->mlist; curr; curr = curr->next)
        if (curr->identifier.a_void == 0) { show_obj_syms = FALSE; break; }
...
} else if (n == 2 && curr->identifier.a_void != 0 && show_obj_syms
           && curr->glyphinfo.glyph != NO_GLYPH) {
    toggle_menu_attr(TRUE, gcolor, ATR_NONE);  putchar(ttychar); ...
```

The decision is made once over the whole list (JS: every page's
entries). The selected `*`/`#` arm wins first (JS returns null when
`entry.selected`). Rows added with `nul_glyphinfo` (NO_GLYPH) get no
`glyphinfo`, so they keep `-`. Row colour: C sets `attr_n = 4` for
«x - …» rows (:1443–1447), so menu colouring starts after the slot and
cannot bleed into it. JS paints the slot with the glyph colour and
ATR_NONE. The deleted bare `obj_glyph(otmp)` calls (display-RNG burns)
move into the helper, so each object still draws exactly one burn.

`sym.mjs`: `obj_glyph js/display.js:2669 sync`, `map_glyphinfo
js/display.js:5044 sync`.

## Hallucinations / overclaim

None. Named, and correctly not claimed: other object menus
(query_objlist, menu_drop / pickup lists, display_minventory,
build_used_invlets_items) still paint `-` because their entries carry no
identifier / glyphinfo. The ledger records process_menu_window as
partial.

## Density

A tty arm plus its feeding caller. The remaining callers are named
omissions.

## Verification

```text
verify ready_weapon (--base 6f5963d7a~1): scen-options-Wizard-50557409 PASS → PROGRESS
verify display_pickinv: 0 blocked (vacuous)
```

Exact match with the D-log.

## Actionable C-wrongs

None beyond the named caller list (map debt, not Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
