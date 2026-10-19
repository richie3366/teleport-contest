# Review 2924 — 511b97189 — extcmd_via_menu prompt: promptstyle + blank item

- SHA: `511b97189` (cliff, owner `extcmd_via_menu`)
- D-entry: D-4083; Ledger: cmd.c (`extcmd_via_menu`, D-4083)
- `js/` diff: `js/getline.js` +8 −2

## Intent vs deliverable

Promise: the `#` extended-command menu (extmenu on) unshifted only the
«Extended Command: %s» prompt. It had no `tty_menu_promptstyle` and no
blank item under it, so every entry rose one row and page 1 held one item
too many (5 PASS, 1 moved). Diff: the unshift adds `...menu_prompt_style()`
and `{ text: '', selectable: false }`. Promise = diff.

## Inventory

- `extcmd_via_menu` prompt block — getline.js:1609–1616; C cmd.c:856–857
  (`Snprintf(prompt, …, "Extended Command: %s", cbuf); end_menu(win, prompt);`).
- Callee `menu_prompt_style` — options.js:6274 (sync, sym.mjs).

## C ↔ JS fidelity

C tty_end_menu (wintty.c:2679–2689) prepends a blank item, then the
prompt with `tty_menu_promptstyle.attr/.color`. This happens after
`reverse(cw->mlist)`, so the screen order is prompt, blank, items. JS
`raw.unshift(prompt, blank)` gives the same order. The rows are added
before `lmax`/`npages` are computed (C :2692–2693), so page breaks move by
one row, as the session shows («(1 of 2)»). The prompt text uses the live
`cbuf`. The PICK_ONE path and the `matchlevel > QBUFSZ - 2` arm are
unchanged. No RNG.

This is the same shape as D-4082 (review 2923) and the earlier menus that
already pass `menu_prompt_style()`. It does not touch the ten hard-coded
`ATR_INVERSE` rows listed in review 2922.

## Hallucinations / overclaim

None. The Named line ("end_menu prompt headers outside options.js and
getline.js still unaudited") matches the open debt from review 2922.

## Density

One call site, one C idiom. One Ledger bullet.

## Verification

```text
verify extcmd_via_menu (--base 511b97189~1): 5 PASS, 1 moved past, 0 unchanged, 0 worse
  options-Monk-50355008, options-Ranger-50457019, options-Samurai-50355036,
  options-Samurai-50355039, options-Tourist-49951011: PASS
  options-Rogue-50557417 → getobj s145 (was 138)
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.
Rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
