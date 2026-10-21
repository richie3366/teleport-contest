# Review 3041 — 9a0385eed — pickup.c menu prompt/heading styles + tipcontainer_gettarget restart

- SHA: `9a0385eed` (cliffs head, owner tipcontainer_gettarget, region
  heuristic: scen-options-Rogue-51151031 step 153)
- D-entry: D-4201; Ledger: tipcontainer_gettarget, query_objlist,
  query_category, in_or_out_menu, doloot_core, choose_tip_container_menu
  ported
- `js/` diff: pickup.js +61 −75

## Intent vs deliverable

Promise: pickup.c end_menu prompts paint in tty_menu_promptstyle and its
class / engulfer headings go through add_menu_heading. Both carry the
live menu_headings colour. JS hard-coded ATR_INVERSE at seven sites.
tipcontainer_gettarget is restarted on select_menu_pick_one, replacing
a hand loop that skipped menucolors, re-dismissed on every key and
emulated PICK_ONE by toggling.

Diff: six prompt/heading literals become `menu_prompt_style()` /
`menu_heading_style()` spreads (query_category, query_objlist ×3,
in_or_out_menu, loot_which_containers_menu, choose_tip_container_menu).
tipcontainer_gettarget is rewritten in C order. The ATR_INVERSE import
is dropped, and get_menu_coloring / cattr_to_cell are imported. The
promise matches the diff.

## Inventory

- tipcontainer_gettarget — pickup.js:4702 (C pickup.c:3868–3948).
- query_objlist headings `:858` / `:926` + prompt `:945` (C `:1125`,
  `:1153`, `:1166`); query_category `:710` (C `:1448`); in_or_out_menu
  `:2613` (C `:3465`); loot_which_containers_menu `:4238` (C doloot_core
  `:2255`); choose_tip_container_menu `:5157` (C `:3536`).
- Callees: select_menu_pick_one (options.js:10076), get_menu_coloring
  (options.js, `use_menu_color` gate as C windows.c `:1845`), the D-4186
  style helpers. All LIVE. ATR_INVERSE: `grep -anw ATR_INVERSE
  js/pickup.js` returns no hits on HEAD, so the import removal is safe.

## C ↔ JS fidelity

tipcontainer_gettarget, branch by branch:

- Row order: `-` "on the floor" MENU_ITEMFLAGS_SELECTED, add_menu_str
  "", then the containers (`:3896–3923`). JS: prompt + blank (the
  tty_end_menu prepend), floor row preselected, blank, containers. Same.
- Skip test `!Is_container || (BAG_OF_TRICKS && dknown && oc_name_known)`
  and `if (!n_conts++) hands_available = u_handsy()`: verbatim.
- `exclude_it = !hands_available || (olocked && lknown)`, `any.a_obj = 0`,
  invlet 0, four-space indent: JS emits an identifier-less row with that
  text. add_menu's menucolor replacement (`:1803–1807`) also applies to
  an identifier-less row, and JS applies get_menu_coloring to it.
- Outcomes against `:3929–3939`. The key fact is that an explicit
  selector beats a mapped menu command (wintty.c `:1554–1561`), so `-`
  is the floor row, not MENU_UNSELECT_PAGE:
  - Return/space → n=1 floor → otmp 0. JS: finishPick floor → null.
  - `-` → toggle off → PICK_ONE finished, n=0 → otmp 0, cancelled
    false. JS: hit = floor row → `pick` → null, not cancelled. Same.
  - Another letter → n=2, the non-dummy wins. JS: hit → that container.
  - ESC → n=-1 → cancelled. JS: `cancel` → cancelled true.
  - An invalid key → nhbell, the window stays up: select_menu_pick_one's
    `continue`.
- The heading/prompt sites match add_menu_heading (windows.c
  `:1815–1828`) and tty_end_menu (wintty.c `:2685–2689`), as reviewed for
  the same helpers at 3026 / 3039.

No RNG on these paths (u_handsy prints only).

## Hallucinations / overclaim

None. The remaining add_menu_heading drift list (cmd.c, botl.c, o_init.c,
shk.c, spell.c, wizcmds.c) is accurate. Each is its own C file, and no
corpus row reaches them now.

## Density

One C file: seven style sites and one whole-function restart.
Right-sized.

## Verification

```text
verify tipcontainer_gettarget,query_objlist,query_category,in_or_out_menu,doloot_core,choose_tip_container_menu --base 9a0385eed~1 --no-reach
  tipcontainer_gettarget: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
    scen-options-Rogue-51151031: PASS
  the other five: 0 blocked (vacuous)
```

D-log: green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 674
baseline-PASS 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
