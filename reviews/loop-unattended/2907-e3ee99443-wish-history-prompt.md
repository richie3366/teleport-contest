# Review 2907 — e3ee99443 — wish_history_menu prompt via relayed promptstyle

- SHA: `e3ee99443` (cliff: menu prompt attribute, 3 sessions)
- D-entry: D-4068; Ledger: zap.c (`wish_history_menu ported`,
  +D-4068 tag)
- `js/` diff: `js/zap.js` +5/−2 (import extension + prompt
  item spread); new `scripts/wish-history-promptstyle.test.mjs`

## Intent vs deliverable

Promise: the `wish_history_menu` prompt item spreads the
relayed `menu_prompt_style()` instead of painting plain;
3 sweep sessions FULL PASS. The diff is exactly that one
spread plus the import-name extension on the pre-existing
`./options.js` line. Promise = diff.

## Inventory

- `wish_history_menu` prompt item (zap.js:7681–7684):
  `{ text: 'Wish what?', selectable: false,
  ...menu_prompt_style() }`. C: zap.c end_menu :6297,
  painted per wintty.c :2685–2689.
- Import: `menu_prompt_style` added to the existing
  `./options.js` import (zap.js:235) — name only, zero
  new module edge.

No deleted symbols, no re-pointed clones — step-3 paste
not triggered. Callee evidence anyway:

```text
menu_prompt_style js/options.js:6264   sync
```

LIVE export, hoisted function declaration (TDZ-neutral),
called at 9 sites across getline/options/zap — this was
the last plain end_menu-prompt item in the wish path.

## C ↔ JS fidelity

Confirmed: C `end_menu(win, "Wish what?")` (zap.c:6297 —
see the cite nit below) with DEBUG-on; the tty layer
paints that prompt with the relayed `tty_menu_promptstyle`
(wintty.c :2685–2689, verified in review 2906). JS
`menu_prompt_style()` reads exactly that relayed slot
with the C-default fallback (review 2906, arm B). Spread
order is safe (`{attr,color}` cannot collide with
`text`/`selectable`). No geometry change — text/position
were already identical, RNG 100 % pre-fix on all three,
so the attribute was the only possible divergence; the
spread is the complete fix. Buf/ring walk, empty-menu
early return, and the makewish gate
(`menu_requested && wish_history[0] && tries===0`,
zap.js:7743 mirroring C :6335) are untouched and proven
live by runs continuing hundreds of steps past the wish
in sync.

Cite nit (not a C-wrong): the true `end_menu` line is
zap.c:**6297** (`grep -n`), but the commit message, the
D-log C locus, and the new JS comment all say :6298.
Comment-only, no behavior delta; next port iter touching
zap.js may correct the comment.

## Hallucinations / overclaim

None. "Correct under rc menu_headings overrides too"
holds: the spread reads the live relayed slot, which the
D-4067 path re-relays on menu_headings change. No stubbed
callee anywhere in the path.

## Density

Cliff row done whole: owner wish_history_menu is the
genuine owner (DEBUG-menu prompt attribute, 1 missed
screen ×3), first live past re-verified parks + stale
ranks (the 4 HEAD-healed rows were re-measured, not
assumed). One `Ledger:` entry, verified. Named omissions:
none — correct, the function is now C-exact on every arm
the sessions execute. No unreached work.

## Verification

Re-measure (`--base e3ee99443~1 --no-reach`):

```text
verify wish_history_menu: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Archeologist-620013: PASS
  scen-sweep-Monk-50556001: PASS
  scen-sweep-Wizard-620057: PASS
```

Exact match — same 3 probes, all FULL PASS (baseline
resolves to the f5ebab89b board, the same board the D-log
cited). Focused test 1/1 green on HEAD. No
FORCE/DIAG/seed/coords in the `js/` hunks. Rule #2 clean
(window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
