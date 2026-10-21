# Review 3026 — 7f4e4a57a — invent.js headings and prompts use the shared menu styles

- SHA: `7f4e4a57a` (cliff; board row inuse_classify,
  scen-options-Barbarian-49959007 s214, «Weapons» heading missing bright cyan)
- D-entry: D-4186; Ledger: add_menu_heading + invent.c menu builders
- `js/` diff: invent.js +26 −34

## Intent vs deliverable

Promise: windows.c add_menu_heading paints with `iflags.menu_headings`
attr **and** colour, both cleared during end-of-game disclosure
(`:1816–1828`). tty_end_menu paints a menu prompt with the relayed
promptstyle, which has no gameover gate. invent.js hard-coded
ATR_INVERSE with no colour, through a local helper plus inline copies.

Diff: the local `add_menu_heading_attr()` is deleted. Every heading row
spreads `menu_heading_style()`, and the end_menu prompt/title rows
(reroll, display_pickinv query, minventory title, binv title, used-invlets
prompt) spread `menu_prompt_style()`. The promise matches the diff.

## Inventory

- add_menu_heading_attr — deleted (clone of windows.c:1815–1828).
- menu_heading_style / menu_prompt_style — options.js:6331 / :6318
  (existing ports, newly imported).
- Sites: invent_lines, pickinv_build_inuse (×2), display_pickinv_reply
  (Miscellaneous, class, Special, query), build_wizid_pickinv_items,
  display_minventory (×4), query_objlist_pick_none_binv (×2),
  display_cinventory, build_used_invlets_items, display_used_invlets,
  reroll_menu.

`sym.mjs` on the deleted name (`grep -anw` → 0 hits in js/):

```text
add_menu_heading_attr NOT FOUND in js/** (no export, no local function/const).
```

## C ↔ JS fidelity

- **Heading style.** C add_menu_heading takes `menu_headings.attr` and
  `.color` and sets both to none when `program_state.gameover`.
  menu_heading_style returns `{attr: 0, color: NO_COLOR}` on gameover,
  else `cattr_to_cell(mh.attr)` and `mh.color`. That is the same
  function.
- **Heading vs prompt classification**, checked per site against C:
  - invdisp_nothing (invent.c:5289–5305) calls `add_menu_heading(win,
    hdr)`, then `end_menu(win, NULL)`. So display_cinventory's and
    display_minventory's empty-case header rows are **headings**, and
    JS uses menu_heading_style there. Correct.
  - The non-empty display_minventory and binv paths go through
    query_objlist → `end_menu(win, qstr)`, so their titles are
    **prompts** and JS uses menu_prompt_style. Correct.
  - reroll_menu's title is `end_menu(win, "Reroll this character?")`
    (invent.c:2599), a prompt. Correct.
  - The display_pickinv query and the "Inventory letters used:" title
    are end_menu prompts. Correct.
- **Class rows / "In use" / "Special" / "Engulfed Creatures"** are
  add_menu_heading calls in C. All now use the heading style.

## Hallucinations / overclaim

None. The D-log names the remaining hard-coded ATR_INVERSE rows:
dodiscovered's heading lines (o_init.c code that lives in invent.js
`:5379–5433`) and o_init.js doclassdisco / rename_disco. Those have been
ledger-partial since D-4166 (review 3006), and leaving them as another C
file's work is right.

## Density

One local clone deleted for an existing port, plus 18 call-site
rewrites. Right-sized.

## Verification

```text
verify inuse_classify,add_menu_heading --base 7f4e4a57a~1 --no-reach
  inuse_classify:   1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  add_menu_heading: 0 blocked (vacuous)
```

This reproduces the D-log: Barbarian-49959007 PASS, and Rogue-51151031
is now at tipcontainer_gettarget s153 on the rescored board.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
