# Review 2531 — 70d5b54ed — yn_function_menu end_menu prompt rows

Metadata: SHA `70d5b54edee41c1a82452011c7f7b9fe4119d277`, D-3652, cliff-head
`do.c` doup via writer `cmd.c` yn_function_menu. js diff +8/−2 in
`js/getline.js` (+ focused test `scripts/yn-menu-prompt.test.mjs`).

## Intent vs deliverable

Promise (subject + D-log): the cliff owner `doup` is whole (D-3252 read,
ledger ported, audited D-3461), so the port is the writer C's draw names —
`yn_function_menu` dropped its `end_menu(win, query)` prompt rows; JS
painted only the Yes/No item rows at col 41 while C paints prompt row 0
(inverse) + blank + items at col 32. Deliverable: prepend the two C rows,
verbatim the D-3403/doset sibling pattern.

Diff actually adds: one import name (`menu_prompt_style` joins the existing
`options.js` edge) and two prepended non-selectable items in
`yn_function_menu` (`js/getline.js:1902–1912` at SHA). No other JS change.
Matches the promise; nothing bundled.

## Inventory

- `yn_function_menu` (`js/getline.js:1902`, local, async) — the only changed
  JS function. C: `nethack-c/upstream/src/cmd.c:5416–5463` (staticfn, per
  `csym.mjs` range print). One C caller: `cmd.c:5538` in `yn_function`.
- Helpers touched: none added; `menu_prompt_style` (live export
  `js/options.js:6053`, sync, returns `{attr,color}` only) newly imported.

## C ↔ JS fidelity

C body (`cmd.c:5416–5463`, 48 lines) walked branch-by-branch:

- `if (yn_menuable_resp(resp))` gate → `if (!yn_menuable_resp(resp)) return
  null` ✓ (FALSE→null is the house idiom; caller `yn_function`
  `js/getline.js:2027` awaits it — pre-existing wiring, D-log cites it).
- Opt tables: rightleft (r/l), hidespin (h/s), else y/n; ynaq→All;
  ynq/ynaq/hidespin→Quit — JS adds the same five arms in the same order ✓.
- `end_menu(win, query)` + `tty_end_menu` (`wintty.c:2680–2690`, prepends the
  prompt row in `tty_menu_promptstyle` + blank separator ahead of items) →
  JS builds `items` prompt-first: `{ text: query, selectable: false,
  ...menu_prompt_style() }` + `{ text: '', selectable: false }` ahead of
  the opts. C appends opts before `end_menu`, but the painted order is
  prompt/blank/opts on both sides — equivalent, with the C-cite comment ✓.
  Spread is safe: the relay returns only `{attr,color}` (verified above), so
  `text`/`selectable` cannot be clobbered.
- `select_menu PICK_ONE` + n>1 non-default arm → `select_menu_pick_one`
  (live import) + `pick.item.a_char`, cancel/space→def ✓. C's "two
  selected, use the non-default" collapses to the same char under the
  preselected-default toggle semantics; the comment says so.
- `pline("%s %s", query, key2txt)` + `clear_nhwindow(WIN_MESSAGE)` →
  `await pline(...)` + `await clear_nhwindow_message()` ✓.
- RNG: none in the C body; no draw-order risk. Prints: the one pline ✓.

Callee closure: `yn_menuable_resp`, `yn_func_menu_opt` (same-file locals),
`select_menu_pick_one` + `menu_prompt_style` (live `options.js` imports),
`key2txt`, `pline`, `clear_nhwindow_message` — all LIVE, no new edge
(`--can`: ALREADY, D-3652 states; the import line confirms same-edge join).
`sym.mjs yn_function_menu`: "NOT EXPORTED — 1 LOCAL CLONE in getline.js" —
correct, C is `staticfn` with one call site; no drift. No symbol deleted or
re-pointed, so no re-point paste is required.

## Hallucinations / overclaim

None. "Named: none new" is accurate for this body — the prompt rows were
the last gap and the rest (opts, res/cancel→def, pline+clear) reads whole.
"Long-query truncation is paint-clip equivalent" is a same-render claim,
not a dispatch-vs-callee overclaim.

## Density

Cliff-phase §2b: one cliff (head `doup` → writer `yn_function_menu`),
whole-function port, writer correctly chosen (owner audited whole; the
diverging paint is the menu prompt, which only the writer constructs).
Ledger entry `yn_function_menu ported` present. No bundling, no second C
file. Verdict line per function: `yn_function_menu` — whole, ACCEPT.

## Verification

- Diff grep (`FORCE|DIAG|getRngLog|fastforward|coords`): no hits.
  `imports.mjs --rulecheck`: "Rule #2 clean".
- D-log Verify: `verify doup: 0 PASS, 1 moved past` (Tourist-94171 85 →
  optfn_boolean@99) + REACH-OK + green/strict/cohort + full 44/44.
- Re-measure (this review):
  `hidden-proxy.mjs verify doup,yn_function_menu --base 70d5b54ed~1 --reach-all`
  → `verify doup: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Tourist-94171 now PASS — later SHAs D-3653… moved it further; strictly
  beyond the claimed landing, consistent); `yn_function_menu`: vacuous at
  baseline (0 blocked — D-log says so explicitly, "note hidden"); both
  smokes 24/24 REACH-OK. No REGRESSED, no WORSE.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
