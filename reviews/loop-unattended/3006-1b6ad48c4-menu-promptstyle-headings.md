# Review 3006 — 1b6ad48c4 — menu prompts in tty_menu_promptstyle, headings in live menu_headings; petattr as recorded

- SHA: `1b6ad48c4` (cliff; scen-options-Knight-50457009 owner-null head +
  4 options rows)
- D-entry: D-4166; Ledger: 13 functions ported (doset_simple_menu,
  choose_disco_sort, cond_menu, enhance_weapon_skill, add_skills_to_menu,
  9 option handlers), tty_print_glyph split
- `js/` diff: options.js +21 −19, display.js +21 −24, weapon.js +8 −6,
  botl.js +5 −4, o_init.js +3 −2

## Intent vs deliverable

Promise: tty_end_menu paints every end_menu prompt in
`tty_menu_promptstyle` (wintty.c `:2685–2689`). add_menu_heading paints in
the live `iflags.menu_headings` colour and attribute, with none during
disclosure (windows.c:1815–1828). JS hard-coded `attr: ATR_INVERSE` in 21
menus. Separately, the recorder's shadow buffer keeps only INVERSE / BOLD
/ ULINE (patch 006 nomux_set_attr). An italic pet therefore records
plain, where D-2810 painted the terminal's underline fallback.

Diff: 20 prompt rows spread `menu_prompt_style()`. doset_simple_menu's
section headings and add_skills_to_menu's skill-range headings spread
`menu_heading_style()`. enhance_weapon_skill's PICK_NONE re-map now passes
`color`. petattr_to_tty is reduced to nomux_set_attr's three cases. The
promise matches the diff for the sites it lists.

## Inventory

- Prompt rows → menu_prompt_style (options.js:6276, pre-existing): 16
  options.js handlers, o_init.js choose_disco_sort, botl.js cond_menu +
  hiliteMenuRows, weapon.js enhance_weapon_skill.
- Heading rows → menu_heading_style (options.js:6289, pre-existing):
  doset_simple_menu (C options.c:8584–8585), add_skills_to_menu (C
  weapon.c:1255).
- petattr_to_tty — display.js:466 (patch 006 termcap.c nomux_set_attr).
- Imports: o_init.js, botl.js, weapon.js take options.js helpers (existing
  edges; botl.js's back-edge was already `--can` SAFE).

## C ↔ JS fidelity

Spot-checked C sites: options.c:8642 `end_menu(tmpwin, "Options")`, :9241
`end_menu(tmpwin, "Do what?")`, botl.c:1423 / :4549, and o_init.c:644 are
end_menu prompts. options.c:8585 and weapon.c:1255 are add_menu_heading
calls. Each converted row is the right kind. menu_heading_style returns
`{0, NO_COLOR}` under gameover (windows.c:1822–1824), else the live
menu_headings attr and colour through cattr_to_cell. menu_prompt_style
reads tty_menu_promptstyle, which handler_menu_headings relays
(adjust_menu_promptstyle). add_skills_to_menu's old `gameover ? ATR_NONE
: ATR_INVERSE` is now the same rule with colour.

petattr_to_tty: inverse → INVERSE, bold → BOLD, uline → UNDERLINE, else 0.
That is the shadow-buffer rule the C capture shows (Knight-50457009
s159). D-2810's s_atr2str fallback was the real terminal's output, not
what is scored.

**Gap (debt, unreached).** The same heading family still drops the colour
or hard-codes inverse in functions this window touched or labelled:

1. cond_menu (botl.js:2233), Ledger `ported` in this SHA: its
   add_menu_heading row "sorted …" (C botl.c:1411) uses
   `menu_heading_attr()` (options.js:7396), which returns the attribute
   only. C passes `iflags.menu_headings.color` too. The same helper serves
   the «Always pickup '<'; never pickup '>'» heading (options.js:7438, C
   options.c:6373).
2. o_init.js, a file this SHA edited: rename_disco's prompt and class
   headings (o_init.js:525/:544, C o_init.c:1185/:1169) and doclassdisco's
   prompt and putstr heading (:831/:845, C :1029/:1049) keep
   `ATR_INVERSE`. The D-log's "~30 more" list names other files, but not
   o_init.js.

The full rescore has no failing row owned by these sites.
scen-town-Tourist-630002's doclassdisco row is a missing `{buy 250}` price
quote, a different cause. Per the unreached-debt rule this is
ACCEPT-WITH-DEBT: I set cond_menu, rename_disco and doclassdisco to
`partial` with the omit text. There is no Must-fix.

## Hallucinations / overclaim

"Every end_menu prompt row in options.js" is close to true. cond_menu's
`ported` label overclaims by one heading row (above).

## Density

20+ rows, one cause, 3 PASS + 2 moved. A family fix rather than a single
writer, but the cause is one helper per row kind. Right-sized.

## Verification

```text
verify doset_simple_menu,handler_runmode,handler_rebind_keys,enhance_weapon_skill --base 1b6ad48c4~1 --no-reach
  doset_simple_menu: 2 PASS, 1 moved (Barbarian-50355007 30 → save_dungeon 92) → PROGRESS
  handler_runmode: 1 PASS (Rogue-50557410)
  handler_rebind_keys: 1 moved (Rogue-51151031 88 → inuse_classify 96)
  enhance_weapon_skill: NO MOVEMENT (Knight-50557414 `[yn] (n)` suffix — named different cause)
```

The doset_simple_menu PASS rows include Knight-50355037 and
Samurai-50162003, which later window SHAs fixed. Knight-50457009 (owner
null) PASSes in the full rescore. The claim reproduces.

## Actionable C-wrongs

1. cond_menu / the autopickup-exception heading: use menu_heading_style()
   (colour too). Unreached; ledger partial.
2. o_init.js rename_disco / doclassdisco prompt + headings. Unreached;
   ledger partial.

Verdict: **ACCEPT-WITH-DEBT**
