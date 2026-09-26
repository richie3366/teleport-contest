# Review 1789 — db4f455db — five options.c optfns (D-2830)

- SHA: `db4f455db` (coverage; `options.c` boulder, pickup_types, runmode, scores, sortloot)
- Files: `js/options.js` the five optfns, three handlers, `pickup_types_apply`, `choose_classes_menu`; `js/hack.js` `runmode_delay_output` enum gate
- Queue row: five Open coverage rows, 0 corpus blocks cited
- Banned grep: the only `FORCE` match is context (`AUTOUNLOCK_FORCE`), not an added line. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the five optfns in C order, `do_init` returning `optn_ok` without writing `initoptions` defaults, `get_val` stand-ins only when the field is unset, `pickup_types` kept as a display-symbol string, and the `getlin` prompt in the async handler. The diff is those functions plus the doset / parseoptions / `do_init` wires. `runmode_delay_output` accepts the enum and still accepts a raw word.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_boulder` | `options.js:5110` | `options.c:1170–1246`; `BACKWARD_COMPAT` is `#define`d at `:19`, so the `#else` is out |
| `optfn_pickup_types` / `pickup_types_apply` / `handler_pickup_types` | `:5181` / `:3881` / `:3942` | `:3307–3401` and `handler_pickup_types` `:6113–6121` |
| `choose_classes_menu` | local clone `:3796` | `windows.c:1643–1761` category 1 |
| `optfn_runmode` / `handler_runmode` | `:5224` / `:5262` | `:3626–3666` and `:6123–6149` |
| `optfn_scores` | `:5294` | `:3668–3760`; no handler |
| `optfn_sortloot` / `handler_sortloot` | `:5381` / `:5420` | `:3913–3955` and `:6166–6203` |
| `runmode_delay_output` | `hack.js:1618` | enum first, then the prefix table |
| `config_error_add` | sink `botl.js:1152` | message text discarded |
| `bad_negation` | empty clone `options.js:7855` | same sink |
| `string_for_opt` / `string_for_env_opt` | local clones `:7842` / `:2822` | missing-parameter text not added |
| `str_start_is` | LIVE `hacklib.js:132` | `str` starts with `chkstr` |
| `update_inventory` | LIVE sync `invent.js:4653` | sortloot `'f'` refresh |

`sym.mjs`:

```
string_for_opt   NOT EXPORTED — local clone js/options.js:7842
string_for_env_opt NOT EXPORTED — local clone js/options.js:2822
config_error_add js/botl.js:1152   sync
bad_negation     NOT EXPORTED — local clone js/options.js:7855
update_inventory js/invent.js:4653   sync
def_char_to_objclass js/objects.js:109   sync
getlin           js/getline.js:243   ASYNC — await required
```

`csym --callers optfn_sortloot` is 0 references: these are `NHOPTC` function pointers, not direct calls. JS wires them at `do_init` `:3152–3156`, the rc `do_set` branches `:3450–3474` and `:3585–3608`, doset handlers `:6014` and `:6037–6040`, and `doset_compopt_get_val` `:6101–6104`.

## C ↔ JS fidelity

`optfn_boulder`. `do_init` returns `optn_ok`. `do_set` takes `string_for_opt(..., FALSE)`; empty is `OPTN_ERR` (C returns `FALSE`, and `optn_err` is 0). `escapes`, then clash 1 when the character is in `def_monsyms` (`BOULDER_MON_GLYPHS` is the `mondata.js:837` key set: letters, `@`, space, `'&;:~]`). Clash 2 is `'1'` up to but not including `'0'+WARNCOUNT`. A character below space, including empty, reports the control-character error and returns `optn_ok` without storing. A clash reports and does not store. Otherwise both override slots and, when not `opt_initial`, `showsyms[SYM_BOULDER+SYM_OFF_X]` if that array exists. `get_othersym` would return that same character: both slots were just set to it. `get_val` is the override, else `showsyms[ROCK_CLASS+SYM_OFF_O]` (`objects[BOULDER].oc_class`), else the default rock symbol.

`optfn_runmode`. Negation stores `RUN_TPORT` (0). Otherwise `str_start_is("teleport"|"run"|"walk"|"crawl", op, TRUE)` in that order (`flag.h:548` `RUN_TPORT` then `RUN_LEAP`/`RUN_STEP`/`RUN_CRAWL`; `runmodes[]` at `options.c:217` is `teleport/run/walk/crawl`). Unknown and missing values are `optn_err`. `get_val` is `RUNMODES[runmodeNow]`; an unset field is `RUN_LEAP` (`initoptions` `:7176`), a stored enum is that index. `handler_runmode` is PICK_ONE, no preselect, `a_int - 1`. `runmode_delay_output` uses the enum when it is one of the four, otherwise the same prefix table, then returns unless `context.run || multi`, and always returns on `RUN_TPORT`.

`optfn_scores`. `do_set` zeros `end_top`, `end_around`, and `end_own`, then walks tokens. A leading `!` or `no` (and `no-`) negates that token. Digits are `atoi`. `t` / `a` / `o` / `n` match `:3707–3717`. `-` before a digit, and any other character, are `optn_silenterr` (`-1`). `letter()` (`hacklib.c:68–72`) is `'@'..'Z'` or `'a'..'z'`; `scoresLetter` is that test. Slash and spaces separate tokens. `get_val` joins `N top` / `N around` / `own`, or `none`. `scoresNow` substitutes 3 and 2 only when the field is not a number (`initoptions` `:7171–7172`). A stored 0 stays 0, so `scores:none` still reads `none`.

`optfn_sortloot`. `do_set` is `string_for_env_opt` then `n`/`l`/`f`. `get_val` copies the `sortltype[]` word (`:220`). Unset reads as `'l'` (`:7208`). `handler_sortloot` preselects the current letter. C's `n > 1` swap (preselected row plus a new pick) does not arise: `select_menu_pick_one` returns the one typed row, or the preselected row on Enter. `perm_invent` calls sync `update_inventory`.

`optfn_pickup_types`. `compat` is `strlen(opts) <= 6`. Empty value with compat, negation, or `opt_initial` sets `flags.pickup = !negated`. A sync in-game empty value restores the previous list and returns `optn_err`; the prompt is `handler_pickup_types` (`doset` `:6014`), because `parseoptions` cannot await. The handler clears the list, and for `MENU_TRADITIONAL` or `MENU_COMBINATION` uses `getlin`. Spaces leave it empty. Escape restores the prior string. A leading `m` opens the menu. Otherwise `pickup_types_apply`. That tail rejects negation, skips a leading `a`/`A` (list stays cleared, meaning all), and records each `def_char_to_objclass` once. JS stores `def_oc_syms[oc].sym`, which is what `invent.js` already reads; C stores the class index and prints it back through `oc_to_str`. The menu's `A` returns `''` immediately (C confirms PICK_ANY, then collapses a space pick to the blank list). Escape returns the prior string. Both end as "all" or the previous symbol list.

## Hallucinations / overclaim

The subject says `do_init` does not write the defaults and `get_val` stand-ins apply only when the field is unset. `scoresNow` / `sortlootNow` / `runmodeNow` do that, and a numeric 0 is not replaced. `config_error_add` and `bad_negation` are sinks, as named. The symbol-string `pickup_types` matches the existing reader. `csym` callers are empty because the C uses are function pointers; the JS dispatcher calls are real.

## Density

Five functions from one C file, plus the three handlers and the one `hack.c` reader that consumes `runmode`. Above the 200-line band (601 `js/` insertions) and inside the 1500 cap. The prompt arm is in the handler rather than inside sync `do_set`; that split is named and the handler is what doset calls.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify optfn_sortloot --base db4f455db~1 --reach-all`.

```
verify optfn_sortloot: baseline db4f455db~1 (scoreboard at 4d4432b8f) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke optfn_sortloot: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue rows cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2830's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None. The message sinks, the symbol-string `pickup_types`, and the sync empty-value `optn_err` are the named omits.

Verdict: **ACCEPT**
