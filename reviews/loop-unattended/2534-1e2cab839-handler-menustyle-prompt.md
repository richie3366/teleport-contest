# Review 2534 — 1e2cab839 — handler_menustyle prompt style + blank

Metadata: SHA `1e2cab8396ef1ae2ab8f44aab90dced2d7fba541`, D-3655, cliff-head
`options.c` handler_menustyle. js diff +7/−1 in `js/options.js` (+ focused
test `scripts/menustyle-prompt-style.test.mjs`).

## Intent vs deliverable

Promise: same attribute-only class as D-3654 — C paints the `end_menu`
prompt inverse + blank separator + items from row 2; JS painted it plain,
items shifted up. Verbatim D-3403/D-3654 sibling pattern, same-file relay,
no new import; loop/select/pline arms already whole. Diff changes exactly
the one menu construction. Matches; nothing bundled.

## Inventory

- `handler_menustyle` (`js/options.js:2820` at HEAD, async, exported) — the
  only changed JS function. C: `nethack-c/upstream/src/options.c:5543–5583`
  (41 lines, staticfn, per `csym.mjs`). One C caller: `optfn_menustyle`
  do_handler arm `options.c:2372`.
- No helpers added/removed/re-pointed.

## C ↔ JS fidelity

Full C body walked against JS at SHA:

- `old_menu_style`, `sep = menu_tab_sep ? '\t' : ' '` ✓.
- Loop `SIZE(menutype)`: `Sprintf(buf,"%-12.12s%c%.60s",…)` ✓
  (`slice(0,12).padEnd(12)` + sep + `slice(0,60)`), `a_int=i+1` ✓, letter
  `*buf` ✓ (`buf[0]`), preselected `i==menu_style` ✓.
- Second line `"%4s%-12.12s%c%.60s","","",sep,tail` ✓ (4sp+12sp+sep+tail,
  non-selectable).
- `end_menu(tmpwin,"Select menustyle:")` (`:5570`) → prompt row now spreads
  `menu_prompt_style()` + blank separator ✓ (the fix).
- `PICK_ONE`; `n>0` → `i=pick[0].a_int-1`, `flags.menu_style=i` ✓;
  `:5573–5576` n>1 keep-non-preselected fold stays named in-comment
  (whatis_coord precedent, pre-existing, untouched) ✓.
- `chngd`; `pline` when `chngd||verbose` with exact format ✓ (`verbose !==
  false` = default-On convention); `return optn_ok` → `OPTN_OK` ✓.
- Callers wired: `js/options.js:3560` + `:9603`, both citing C `:2372` ✓
  (one sync-return, one awaited — pre-existing shape, not this diff).
- RNG: none. Prints: the one pline ✓.
- `sym.mjs`: exported async, single definition — no clone issue. Nothing
  deleted or re-pointed.

## Hallucinations / overclaim

None. "No other body change — loop/select/pline arms were already whole"
confirmed by the walk; the n>1 fold is named, not hidden.

## Density

Cliff-phase §2b: one cliff, head function itself, last-gap completion.
Ledger entry updated. No bundling. Per-function: `handler_menustyle`
whole, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/`.
  Rule #2: same-file relay, no new import.
- D-log Verify: `VERIFY: PASS` (syntax/rule2/green/strict/cohort/full 44/44).
- Re-measure: `verify handler_menustyle --base 1e2cab839~1 --reach-all` →
  `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (Wizard-94291:
  PASS — exactly the claimed 96→PASS) + smoke 24/24 REACH-OK.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
