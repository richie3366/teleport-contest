# Review 3040 — 52a916c0b — set_item_state paints the toggled mark in the item's style

- SHA: `52a916c0b` (cliffs head, owner label status_hilite_menu_add,
  region heuristic: scen-options-Caveman-50151031 step 40)
- D-entry: D-4200; Ledger: set_item_state partial
  js=options.js:select_menu_pick_any+invent.js:paint_corner_nhw_menu+invent.js:paint_overlay
- `js/` diff: options.js +16 −8, invent.js +14

## Intent vs deliverable

Promise: wintty.c set_item_state repaints a toggled entry's mark
(str[2]) in `item->attr` / `item->color` (`:1175–1194`). Every runtime
toggle reaches it: toggle_menu_curr, set/unset_all_on_page,
invert_all_on_page, for both select and deselect. JS tracked only
runtime selects and painted every mark plain.

Diff: `_retoggled` now means "set_item_state repainted this entry since
the last page paint". It is set on invert (both arms), both unselect
arms, a toggle_menu_curr that returns true, and any entry a search
changed (selected **or** count). A retoggled row carries
`markStyle {attr, color}` = its post-menucolor attr and colour. Both
painters draw that one cell in it (paint_overlay `i === 3` after the pad
space; the corner/fullscreen painter `i === 2`). The promise matches the
diff.

## Inventory

- select_menu_pick_any — options.js:10440ff (C wintty.c
  process_menu_window `:1440–1760`): five `_retoggled` sites changed.
- invert_pick_any_matching — options.js:10405 (invert_all_on_page
  `:1240–1270`).
- paint_overlay — invent.js:3030; paint_corner_nhw_menu — invent.js:3190.
- No symbol deleted or re-pointed (sym.mjs not required).

## C ↔ JS fidelity

C `:1175–1194`:

```c
char ch = item->selected ? (item->count == -1L ? '+' : '#') : '-';
tty_curs(window, 4, lineno);
term_start_attr(item->attr);
if (item->color != NO_COLOR) term_start_color(item->color);
(void) putchar(ch);
```

- Mark choice: JS `!selected ? '-' : count === -1 ? (_retoggled ? '+'
  : '*') : '#'`. A retoggled entry gets exactly C's `+`/`#`/`-`; `*` is
  only for the page paint's preselected entries (`:1467–1473`).
- Style: item attr/colour after add_menu's menucolor replacement
  (windows.c `:1803–1807`): JS `mattr`/`mcolor` are the same
  post-menucolor values the row text uses. tty_map_color is applied as
  for the text cells.
- Callers: toggle_menu_curr `:1126/:1132/:1140/:1145` call
  set_item_state only when they act, which matches JS gating on the
  return value. unset_all_on_page `:1233`, invert `:1264` either way,
  set_all_on_page `:1212` (already `_retoggled`).
- UNSELECT_ALL / INVERT_ALL: C repaints only the current page and flips
  the rest silently (`:1679–1695`). JS marks every changed item, but
  every page change runs `clearRetoggled()` over all items
  (options.js:10570–10583), so an off-page mark is never drawn styled.
  The same holds for a search that flips an off-page entry (C
  set_item_state only `if (in_view)`). Net-identical.

No RNG on this path.

## Hallucinations / overclaim

None. The ledger says `partial`, which is honest: set_item_state is
modelled as a flag read by two painters, not as a function. The named
omission is true: choose_classes' own PICK_ANY loop (options.js:5954)
keeps a plain mark, and its items are always ATR_NONE / NO_COLOR, so the
output does not change.

## Density

One C function's effect across its four C callers. Right-sized.

## Verification

```text
verify status_hilite_menu_add,set_item_state,process_menu_window --base 52a916c0b~1 --no-reach
  status_hilite_menu_add: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-options-Caveman-50151031: PASS
  set_item_state, process_menu_window: 0 blocked (vacuous)
```

D-log: green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 673
baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
