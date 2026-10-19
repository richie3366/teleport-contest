# Review 2922 — d038cfd88 — choose_disco_sort blank row + preselection

- SHA: `d038cfd88` (cliff, owner `choose_disco_sort`)
- D-entry: D-4081; Ledger: o_init.c (`choose_disco_sort`, D-4081)
- `js/` diff: `js/o_init.js` +5 −2

## Intent vs deliverable

Promise: the 'Ordering of discoveries' menu lacked tty_end_menu's blank
item under the prompt, so every row sat one high. It also lacked
`MENU_ITEMFLAGS_SELECTED` on the current sort («o -» vs «o *»; 3 PASS, 2
moved). Diff: a blank non-selectable row after the title, and
`selected: DISCO_ORDER_LET[i] === game.flags.discosort`. Promise = diff.

## Inventory

- `choose_disco_sort` — o_init.js:664–702; C o_init.c:610-657.

## C ↔ JS fidelity

```c
add_menu(tmpwin, &nul_glyphinfo, &any, (char) any.a_int, 0, ATR_NONE, clr,
         disco_orders_descr[i],
         (disco_order_let[i] == flags.discosort) ? MENU_ITEMFLAGS_SELECTED : MENU_ITEMFLAGS_NONE);
… mode 2: add_menu_str "" + 3 note lines …
end_menu(tmpwin, "Ordering of discoveries");
n = select_menu(tmpwin, PICK_ONE, &selected);
if (n > 0) { choice = selected[0]…; if (n > 1 && choice == flags.discosort) choice = selected[1]…; flags.discosort = choice; }
```

tty_end_menu (wintty.c:2681–2689) prepends the blank item, then the
prompt with `tty_menu_promptstyle.attr/.color`, after it reverses the
list. Displayed order is prompt, blank, items. JS order matches. The
selector is the sort letter, the mode-2 notes follow the items, and the
preselect flag is right. The n > 1 arm is named, and it is honestly
unreachable while JS's PICK_ONE returns one item.

**Prompt attr is hard-coded.** JS passes `attr: ATR_INVERSE`
(o_init.js:695). C uses `tty_menu_promptstyle`, set from the
`menu_promptstyle` option (wintty.c:2905). The next commit (D-4082)
paints the same prompt with `...menu_prompt_style()` (options.js:6274),
so this file and its sibling now disagree. The default is inverse in
both, so no session diverges unless `menu_promptstyle` is changed. The
options family does exercise `O`. The same hard-coded row appears at ten
sites: artifact.js:2250, botl.js:3960, cmd.js:3575, dungeon.js:3550/3581,
getpos.js:1091, options.js:10279/10300, weapon.js:1186, o_init.js:695
(o_init needs `grep -a`). Some of these are add_menu_heading headers
rather than end_menu prompts, and each needs its C locus checked.

## Hallucinations / overclaim

The doc says the prompt is "set by tty end_menu … (set_vanq_order
shape)". The blank row and the selection are right. The prompt attr is
not C's.

## Density

One function, two items. One Ledger bullet.

## Verification

```text
verify choose_disco_sort: 3 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  options-Knight-50355037 → domonnoise s67 (was 24); options-Wizard-50255903 → getobj s156 (was 147)
  options-Valkyrie-50355017, options-Wizard-50162010, options-Barbarian-50351031: PASS
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

1. choose_disco_sort prompt row: `...menu_prompt_style()` in place of
   `attr: ATR_INVERSE`. Do the same for each of the other nine sites
   whose C is an `end_menu` prompt. This is debt, with no session
   divergence measured (§10.19).

Verdict: **ACCEPT-WITH-DEBT**
