# Review 2533 — 80e386ab0 — handler_disclose prompt style + blank

Metadata: SHA `80e386ab078ed3be1782fa33a959b690aed11333`, D-3654, cliff-head
`options.c` handler_disclose. js diff +11/−2 in `js/options.js` (both menus;
+ focused test `scripts/disclose-prompt-style.test.mjs`).

## Intent vs deliverable

Promise: the step-68 diff is attribute-only (row 0 col 35, identical text)
— C paints the `end_menu` prompt inverse via `tty_menu_promptstyle` with a
blank separator and items from row 2; JS painted it plain, items shifted up.
Verbatim D-3403/D-3646/D-3647 sibling pattern on both menus, same-file
relay, no new import. Diff actually changes exactly the two menu
constructions (main + sub). Matches; nothing bundled.

## Inventory

- `handler_disclose` (`js/options.js:420`, async, exported) — the only
  changed JS function. C: `nethack-c/upstream/src/options.c:5674–5777`
  (104 lines, staticfn, per `csym.mjs`). One C caller:
  `optfn_disclose` do_handler arm `options.c:1557`.
- No helpers added/removed/re-pointed. `menu_prompt_style` is the same-file
  D-3648 relay (no new edge by construction).

## C ↔ JS fidelity

Full C body walked against the JS body at SHA (not just the diff):

- Main menu: `Sprintf(buf,"%-12s[%c%c]",…)` ✓ (`padEnd(12)`), `a_int=i+1` ✓,
  letter `disclosure_options[i]` ✓, `disc_cat[i]=0` ✓.
- `end_menu(tmpwin,"Change which…:")` (`:5704`) → prompt row now spreads
  `menu_prompt_style()` + blank separator ✓ (the fix; paint order
  prompt/blank/items matches `tty_end_menu` prepend semantics).
- `PICK_ANY` + `pick_cnt>0` loop (`a_int-1` → `disc_cat=1`) ✓ (JS adds a
  bounds guard — defensive, no C behavior change); free→GC, destroy→GC ✓.
- Sub loop `if (disc_cat[i])` → `continue` inversion ✓; `c`,
  `"Disclosure options for %s:"` ✓ (prompt styled + blank — the second fix).
- Five/six mode rows in C order with the `*name=='v'||'g'` `#`/`?` gates on
  vanquished/genocides, exact texts, preselected flags ✓.
- `end_menu(buf)` + `PICK_ONE` ✓; `n>0` → `end_disclose[i]=pick[0]` ✓;
  `:5769–5770` n>1 keep-second fold stays named in-comment (pre-existing
  D-2788/D-3146, untouched) ✓; `return optn_ok` → `OPTN_OK` ✓.
- Caller wired: `js/options.js:3519 return handler_disclose()` cites C
  `:1557` ✓. RNG: none. Prints: none in-body.
- `sym.mjs handler_disclose`: exported async, single definition — no clone
  issue. Nothing deleted or re-pointed (no paste required).

## Hallucinations / overclaim

None. "Post-fix JS step-68 screen string is byte-identical to C's" is a
measured replay claim with the focused test pinning it; "the rest was
already whole per D-3146" confirmed by the walk above (only the named n>1
fold predates this SHA and stays named).

## Density

Cliff-phase §2b: one cliff, head function itself, whole-body port completed
(the prompt paint was the last gap). Ledger entry updated. No bundling.
Per-function: `handler_disclose` whole, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/`.
  Rule #2: same-file relay, no new import.
- D-log Verify: `VERIFY: PASS` (syntax/rule2/green/strict/cohort/full 44/44).
- Re-measure: `verify handler_disclose --base 80e386ab0~1 --reach-all` →
  `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Wizard-94291 now PASS — D-3655 moved it past the claimed 68→96 landing;
  strictly beyond, consistent) + smoke 24/24 REACH-OK. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
