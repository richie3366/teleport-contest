# Review 1801 — 686390b2d — handler_msgtype (D-2842)

- SHA: `686390b2d` (coverage; `options.c` `handler_msgtype`)
- Files: `js/options.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `handler_msgtype`: done and ESC return `optn_ok`; add only when the pattern is non-empty, the regex compiles, and `query_msgtype` is not −1; the error line only when `msgtype_add` fails; list is `PICK_NONE` and remove is `PICK_ANY`; a negative pick count returns; each removal passes `a_int - 1 - pick_idx`. The diff is that function, `query_msgtype`, `free_one_msgtype`, `msgtype_count`, the menu-text helper, `optfn_o_message_types`, the doset row, and the value column.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `handler_msgtype` | async `options.js:5051` | `options.c:6501–6570` |
| `query_msgtype` | local async `:518` | `:7700–7728` |
| `free_one_msgtype` | local `:574` | `:7771–7794` |
| `msgtype_count` | local `:624` | `:7830–7841` |
| `msgtype_menu_text` | local | `:6545–6551` |
| `msgtype_add` | LIVE sync `:539` | `:7730` |
| `test_regex_pattern` | local `:4689` | `:7871–7900` |
| `handle_add_list_remove` | local async `:4708` | `:9208–9251` |
| `select_menu_pick_none` | LIVE async `invent.js:3120` | `PICK_NONE` |
| `select_menu_pick_any` | LIVE async `options.js:6867` | `PICK_ANY` |
| `select_menu_pick_one` | LIVE (query) | `PICK_ONE` |
| `tty_wait_synch` | LIVE async `display.js:7427` | `wait_synch` |
| `msgtype2name` | local `:8614` | `:7690–7697` |
| `optfn_o_message_types` | sync; handler arm does not call | `:8388–8411` |

`sym.mjs` (C `static` helpers are the single local definition, not a second clone):

```
handler_msgtype  js/options.js:5051   ASYNC — await required
query_msgtype    NOT EXPORTED — local js/options.js:518
free_one_msgtype NOT EXPORTED — local js/options.js:574
msgtype_count    NOT EXPORTED — local js/options.js:624
msgtype_add      js/options.js:539   sync
test_regex_pattern NOT EXPORTED — local js/options.js:4689
tty_wait_synch   js/display.js:7427   ASYNC — await required
select_menu_pick_none js/invent.js:3120   ASYNC — await required
select_menu_pick_any js/options.js:6867   ASYNC — await required
```

No symbol was deleted or re-pointed. The doset string `'(0 currently set)'` became `currently_set_val(msgtype_count())`.

## C ↔ JS fidelity

`csym` caller is `options.c:8408`, `optfn_o_message_types` `do_handler`. JS `doset` awaits `handler_msgtype()` for that row (`options.js:7565`). The optfn's `REQ_DO_HANDLER` returns `OPTN_OK` without calling it, because that function is sync. The in-game menu is the doset call. `doset_compound_via_getlin` does not list this name; it is not a `dosetSimpleOpts` row.

The loop is `msgtypes_again`. `opt_idx == 3` returns `optn_ok` (1, same as C `TRUE`). Add: `getlin`. First byte `0x1b` returns `optn_ok`. The `&&` chain is non-empty, `test_regex_pattern`, `query_msgtype() !== -1`, then `!msgtype_add`. Only that last failure `pline`s and `tty_wait_synch`. Then the loop repeats. `query_msgtype` offers rows that have a `descr`, `a_int` is `msgtyp + 1`, and the return is `a_int - 1`. Cancel and empty finish are −1 (`pick_cnt <= 0`). `pick_cnt > 1` is inside `select_menu_pick_one`. Named. Glyph columns are absent. Named. The `end_menu` string is the header row. Named.

List or remove walks `plinemsg_types`. `a_int` is a pre-increment from 1. The text is `%-5s "` (`padEnd(5)`), then the pattern, or `ln - 3` characters and `..."` when `strlen > ln`. `ln` is `BUFSZ - prefix - 2` (`sizeof "\""`). A null `msgtype2name` is an empty name. Named. List uses `select_menu_pick_none` (ESC −1, finish 0). Remove uses `select_menu_pick_any` with `cancelValue: null` so cancel is −1 and an empty finish is 0. `pick_cnt > 0` calls `free_one_msgtype(a_int - 1 - pick_idx)` so earlier removals do not shift the later index. `free_one_msgtype` walks until `i == 0`, `regex_free`s, unlinks, and returns; a miss falls off the list. `pick_cnt >= 0` repeats; a negative count returns `optn_ok`. `destroy_nhwindow` is inside the select helpers.

`optfn` init returns `OPTN_OK`. `do_set` is empty and falls through. `get_val` / `get_cnf_val` write `(%d currently set)` via `msgtype_count`, or `OPTN_ERR` when `opts` is null. That is `n_currently_set`. The doset value column uses the same count. No `rn2`.

## Hallucinations / overclaim

The subject says done and ESC return `optn_ok`. Both returns are `OPTN_OK`, which is 1. It says the error pline runs only when `msgtype_add` fails. The `&&` short-circuit does that. It says `optfn_o_message_types` keeps the empty `do_set` fall-through into `get_val`. The empty `if` is there, and `get_val` is the next test.

## Density

`handler_msgtype` and the three static helpers it needed (`query_msgtype`, `free_one_msgtype`, `msgtype_count`), plus the optfn and the doset wire. The C caller is that optfn.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify handler_msgtype --base 686390b2d~1 --reach-all`.

```
verify handler_msgtype: baseline 686390b2d~1 (scoreboard at dcaae0c59) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke handler_msgtype: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2842's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
