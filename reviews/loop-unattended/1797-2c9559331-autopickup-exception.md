# Review 1797 — 2c9559331 — handler_autopickup_exception (D-2838)

- SHA: `2c9559331` (coverage; `options.c` `handler_autopickup_exception`)
- Files: `js/options.js` the handler, parser, and doset value; `js/cfgfiles.js` the config line; `js/invent.js` `select_menu_pick_none` ESC; `js/pickup.js` comment only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one handler in C order: add quotes the getlin text and parses `"<"`, `">"`, then the plain quoted form, including the `>` comment fallthrough; a node is prepended; list ESC leaves; remove unlinks by identity. The diff is that handler, `add_autopickup_exception`, `count_apes`, `remove_autopickup_exception`, the config-line producer, the doset count, and `@`'s exception phrase. `check_autopickup_exceptions` already walked the list.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `handler_autopickup_exception` | async `options.js` | `options.c:6330–6404` |
| `add_autopickup_exception` | sync export | `options.c:9299–9346` |
| `ape_sscanf_quoted` | local sscanf stand-in | the three `sscanf` formats |
| `count_apes` / `remove_autopickup_exception` | local | `:9190–9202`, `:9348–9369` |
| `handle_add_list_remove` | already live | `:9208–9251` |
| `regex_compile` / `regex_init` / `regex_free` | LIVE `options.js:478` | `:9334–9340` |
| `regex_error_desc` | STUB phrase | `posixregex.c`; named |
| `config_error_add` | existing sink, named no-op | `:9330`, `:9342` |
| `cnf_line_AUTOPICKUP_EXCEPTION` | `cfgfiles.js` | `cfgfiles.c:611–616` |
| `select_menu_pick_none` | LIVE async | ESC now −1 |

`sym.mjs`:

```
add_autopickup_exception js/options.js:4780   sync
handler_autopickup_exception js/options.js:4860   ASYNC — await required
select_menu_pick_none js/invent.js:3120   ASYNC — await required
regex_compile    js/options.js:478   sync
```

`imports.mjs --can cfgfiles.js options.js add_autopickup_exception`: `ALREADY`. No deleted symbol.

## C ↔ JS fidelity

`csym` callers: declaration `options.c:412`; `optfn_o_autopickup_exceptions` `do_handler` `:8318`. JS `doset` and `doset_compound_via_getlin` await the handler. The sync `optfn` `REQ_DO_HANDLER` arm returns `OPTN_OK` without calling it. The commit says that arm cannot await. Both in-game entries call the async function.

`ape_again`: `count_apes`, then `handle_add_list_remove`. That helper increments `a_int` before skipping list/remove on an empty set, so exit is still 4 → index 3. Cancel returns 3. Done (`3`) returns `OPTN_OK` (1). C returns `TRUE` (1) there and `optn_ok` (1) on menu cancel.

Add: `getlin` then `mungspaces` (`getline.js:1348` collapses whitespace and trims; ESC `\x1b` stays). ESC returns. A non-empty line is clipped to `BUFSZ - 1` characters (C writes NUL at `apebuf[sizeof - 2]` before the closing quote) and passed as `"…"`. Empty input loops. No `rn2`.

`add_autopickup_exception` (`:9318–9328`): `"<text>"` with `n == 1`, or `n == 2` and the next character `#`, stores `grab` true. Otherwise `">text"` only when `n == 1`. A `">text" #` comment makes that first `sscanf` return 2, and the `||` runs the plain `"text"` scan, which then owns `n` and the text (the pattern keeps the `>`). JS does that second scan in the `else`. Plain `n == 1` or `n == 2` and `#` stores `grab` false. Anything else calls `config_error_add` and returns 0. The scanset needs one character, stops at 253, and the format space skips whitespace including none. A failed `regex_compile` frees the regex, reports a fixed phrase instead of `regex_error_desc`, and does not link the node. Success prepends (`unshift`). `game.apelist` is null when empty, so `dotogglepickup`'s `if (game.apelist)` matches `if (ga.apelist)` (`:9264–9268`): one exception vs some.

List (`opt_idx == 1`) is `PICK_NONE`. The prompt is the first row (this painter's `end_menu`). The heading uses `menu_headings` attr; color stays `NO_COLOR` (named). ESC from `select_menu_pick_none` is −1 and leaves; Enter or space on the last page is 0 and loops. Other `select_menu_pick_none` callers ignore the return. Remove (`PICK_ANY`) unlinks each picked object (`===`), frees its regex, and nulls the head when the array is empty. Cancel leaves. A zero pick loops.

`check_autopickup_exceptions` (`pickup.c:912–927`) already walks from the head and returns the first `regex_match`. Newest-first matches the prepend. `all_options_apes` prints `autopickup_exception="<%s"` / `">%s"` (`:9649`). `cnf_line_AUTOPICKUP_EXCEPTION` calls `add_autopickup_exception` and returns true (`cfgfiles.c:614–615`).

## Hallucinations / overclaim

The subject describes the `>` comment fallthrough. The code runs the plain scan whenever the `>` scan is not `n == 1`, which is what the C `||` does. It does not claim `regex_error_desc` or `config_error_add` gained a body. The chain is an array, and the commit says so.

## Density

The handler, its add/remove/count callees, the config producer, and the doset/`@` readers. One options family.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify handler_autopickup_exception --base 2c9559331~1 --reach-all`.

```
verify handler_autopickup_exception: baseline 2c9559331~1 (scoreboard at e41959f29) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke handler_autopickup_exception: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2838's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
