# Review 2923 — 092428e95 — options.c end_menu prompts: promptstyle + blank item

- SHA: `092428e95` (cliff, owner `handler_msg_window`)
- D-entry: D-4082; Ledger: options.c (`handler_msg_window`, D-4082)
- `js/` diff: `js/options.js` +18 −6

## Intent vs deliverable

Promise: three options.c menus (handler_msg_window, query_msgtype,
handler_msgtype) painted their end_menu prompt with no promptstyle and no
blank item under it, so every row sat one high (3 PASS, 2 moved). Diff:
each header takes `...menu_prompt_style()` and is followed by
`{ text: '', selectable: false }`. Promise = diff.

## Inventory

- `query_msgtype` — options.js:600–606; C options.c:7719
  `end_menu(tmpwin, "How to show the message")`.
- `handler_msg_window` — options.js:1910–1916; C :5867
  `end_menu(tmpwin, "Select message history display type:")`.
- `handler_msgtype` list/remove — options.js:7669–7677; C :6553–6555
  `end_menu(tmpwin, mtbuf)` with "%s message types" (List of / Remove
  which).
- Callee `menu_prompt_style` — options.js:6274 (sync; sym.mjs).

## C ↔ JS fidelity

```c
/* wintty.c tty_end_menu :2679–2689, after reverse(cw->mlist) */
if (prompt) {
    tty_add_menu(window, …, ATR_NONE, clr, "", MENU_ITEMFLAGS_NONE);
    tty_add_menu(window, …, tty_menu_promptstyle.attr, tty_menu_promptstyle.color, prompt, …);
}
```

Both adds prepend, so the screen shows prompt, then blank, then items.
JS raw order (prompt, blank, items) matches. `menu_prompt_style()`
returns `{attr: cattr_to_cell(tty_menu_promptstyle.attr), color}` from
the live option (options.js:6264 setter, C wintty.c:2905). All three
sites are real `end_menu(win, prompt)` calls (verified at the cited C
lines). The text matches, including mtbuf's two forms. The pick modes
(PICK_ONE / PICK_NONE / PICK_ANY) are unchanged. No RNG.

## Hallucinations / overclaim

None. The Named line says prompt headers outside options.js were not
audited. Review 2922 lists them (ten hard-coded `ATR_INVERSE` rows,
choose_disco_sort among them, shipped one commit earlier).

## Density

Three call sites of one C idiom in one file. One Ledger bullet
(handler_msg_window); the other two are call-site edits.

## Verification

```text
verify handler_msg_window: 3 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  options-Caveman-50951031, options-Monk-50457010, options-Healer-50355030: PASS
  options-Knight-50255908 → handler_rebind_keys_add s98 (was 48)
  options-Valkyrie-50557405 → "js-throw" s94 (was 91)
verify query_msgtype, handler_msgtype: 0 blocked (vacuous)
```

The Valkyrie row is **not** a throw. `hidden-proxy show` has `error` and
`jsPanic` null, `kind: screen`, `owner: null`, and a map/menu row-16
diff at col 73. verify prints `r.owner || 'js-throw'`
(hidden-proxy.mjs:947), so an unattributed screen row looks like a throw.
It is not a §10.14 Must-fix. The rest matches the D-log exactly. No
FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
