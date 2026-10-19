# Review 2925 — 412137c41 — wish_history_menu prompt takes promptstyle

- SHA: `412137c41` (cliff, owner `wish_history_menu`)
- D-entry: D-4084; Ledger: zap.c (`wish_history_menu`, D-4084)
- `js/` diff: `js/zap.js` +4 −3

## Intent vs deliverable

Promise: the «Wish what?» prompt row already had its blank item but no
attr. It drew plain where tty_end_menu paints `tty_menu_promptstyle`
(inverse on these recordings; 3 sessions). Diff: `...menu_prompt_style()`
on the prompt row, with `menu_prompt_style` imported from options.js next
to `select_menu_pick_one`. Promise = diff.

## Inventory

- `wish_history_menu` items head — zap.js:7681–7684; C zap.c:6297
  `end_menu(win, "Wish what?")`, then `select_menu(win, PICK_ONE, …)`.

## C ↔ JS fidelity

The C order after tty_end_menu (wintty.c:2679–2689) is prompt
(promptstyle attr/color), blank, then the items. The JS rows were already
prompt + blank, so only the attr was missing, and that's the whole diff.
The history loop (`MAX_WISH_HISTORY - 1 … 0`) and the PICK_ONE result
handling are unchanged. The import is from options.js. zap.js already
imported `select_menu_pick_one` from there, so this adds no new module
edge. No RNG.

## Hallucinations / overclaim

None. The Named line points at the ten hard-coded `ATR_INVERSE` headers
from review 2922 and says correctly that they differ only when
`menu_promptstyle` is not inverse.

## Density

One attribute on one row. One Ledger bullet.

## Verification

```text
verify wish_history_menu (--base 412137c41~1): 3 PASS, 0 moved past, 0 unchanged, 0 worse
  scen-sweep-Archeologist-620013, scen-sweep-Monk-50556001, scen-sweep-Wizard-620057: PASS
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
