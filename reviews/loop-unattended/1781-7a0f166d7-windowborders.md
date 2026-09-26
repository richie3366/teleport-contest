# Review 1781 — 7a0f166d7 — windowborders option family (D-2822)

- SHA: `7a0f166d7` (coverage; seven option parsers in `options.c` / `o_init.c`)
- Files: `js/options.js` the seven `optfn_*` plus five handlers; `js/o_init.js` `get_sortdisco` `:521`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".

## Intent vs deliverable

Subject promises one function each for `windowborders`, `menustyle`, `pickup_burden`, `sortdiscoveries`, `align_message`, `align_status`, and `whatis_filter`, with handlers reached from `doset_optfn_do_handler`. The diff adds those bodies, wires `allopt[].optfn`, and calls `do_init` for `sortdiscoveries`. The full doset list still omits `windowborders`, `align_message`, and `align_status`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_windowborders` / `handler_windowborders` | sync / async | `options.c:4796–4853` / `:6619–6654` |
| `optfn_menustyle` / `handler_menustyle` | sync / async | `:2319–2375` / `:5543–5583` |
| `optfn_pickup_burden` / `handler_pickup_burden` | sync / async | `:3255–3305` / `:6085–6111` |
| `optfn_sortdiscoveries` | sync | `:3862–3911` |
| `get_sortdisco` | `o_init.js:521` | `o_init.c:1209–1220` |
| `choose_disco_sort` | existing async `o_init.js:589` | do_handler `:3907` |
| `optfn_align_message` / `optfn_align_status` / `handler_align_misc` | sync / async | `:922–970` / `:972–1019` / `:5585–5621` |
| `optfn_whatis_filter` / `handler_whatis_filter` | sync / async | `:4747–4794` / `:6278–6318` |
| `string_for_env_opt` | existing `:2815` | `:6682–6690` |
| `config_error_add` / `bad_negation` | no-op sinks | text discarded |

`csym --callers` is empty for these `staticfn`s. `NHOPT_PARSE` fills `allopt` (`options.js:6744` through `:7146`). `doset_optfn_do_handler` `:2594–2611` awaits the handlers. `choose_disco_sort(0)` is the sort handler.

`sym.mjs`:

```
optfn_windowborders js/options.js:2490   sync
handler_windowborders js/options.js:2536   ASYNC — await required
optfn_menustyle  js/options.js:2197   sync
get_sortdisco    js/o_init.js:521   sync
optfn_align_message js/options.js:2079   sync
handler_align_misc js/options.js:2163   ASYNC — await required
choose_disco_sort js/o_init.js:589   ASYNC — await required
```

## C ↔ JS fidelity

`windowborders`. `do_init` returns ok. `do_set`: `string_for_opt(opts, negated)`. Negated with a value is `bad_negation` and `optn_err`. Negated with no value stores 0. No value and not negated stores 1. Otherwise `atoi`; outside 0..4 is `optn_silenterr`; else store `wc2_windowborders`. `get_val` is the five `"N=..."` strings or `defopt` (`"default"`, `options.c:126`). `get_cnf_val` is `"%i"`. An absent field reads as 2 (`initoptions_init` `:7266`) and is not written. The handler's five lines match, accelerators `'a'+i` and `'0'+i` (`gselector`), store `a_int - 1`.

`menustyle`. `val_required` is `strlen(opts) > 5 && !negated`. Empty and required returns `optn_err`. Empty otherwise is `'n'` if negated, else `'f'`. `n`/`t` → `MENU_TRADITIONAL` (0), `c` → combination (1), `f` → full (2), `p` → partial (3). `get_val` is `menutype[style][0]`; an absent field reads as full (`:7258`). The handler builds `%-12.12s` plus the two description lines (`options.c:184–192` matches `MENUTYPE`), preselects the current index, stores `a_int - 1`, and plines changed/still when `chngd || verbose`. `n > 1` stays inside `select_menu_pick_one`. Named.

`pickup_burden`. `negated` is unused. `string_for_env_opt(..., FALSE)` rejects when `!opt_initial` (`:6685–6687`); the rc sites pass `true`. Letters `u b s n o/t l` are `UNENCUMBERED` through `OVERLOADED` (0..5), and `burdentype[]` (`:213–216`) is that order. Empty value is `optn_err`. `get_val` uses the word; an absent field reads as stressed (`MOD_ENCUMBER`, `:7207`). The handler uses `"ubsntl"`. `parseoptions` skips a negated name before the optfn (negateok-No).

`sortdiscoveries`. `do_init` stores `'o'` (`:3868`), and the rc builder calls it (`options.js:3130`). Negated stores `'o'`. Otherwise `0/o`, `1/s`, `2/c`, `3/a`, unknown is `optn_silenterr`, empty is `optn_err`. `get_val` calls `get_sortdisco`. C `strchr("osca", discosort)` (`o_init.c:599`, `:1212`). A miss stores `'o'` and uses index 0. `cnf` returns the character; otherwise the description (`:600–604`). The handler is `choose_disco_sort(0)`.

`align_message` / `align_status`. Same four `strncmpi` lengths (4, 3, 5, 6) onto `ALIGN_LEFT/TOP/RIGHT/BOTTOM` (1, 3, 2, 4). Unknown is `optn_err`. Negated is `bad_negation`. Empty and not negated returns ok. `get_val` maps the four values or `defopt`. Absent message reads as top (`:7260`); absent status as bottom (`:7261`). `align_status` negate is also rejected in `parseoptions` before the call. `handler_align_misc` offers t/b/l/r with those `a_int`s and writes message or status from `optidx`.

`whatis_filter`. Negated stores `GFILTER_NONE` (0) and returns. Otherwise `n/v/a` → none/view/area (0/1/2). Empty is `optn_err`. `get_val` is `"view"` / `"area"` / `"none"`. The handler preselects the current filter and stores `a_char - 1`. `pick_cnt > 1` stays in the picker. Named.

`string_for_opt` (`:6664–6680`) still returns `empty_optstr` without the missing-parameter `config_error_add`. Callers that branch on empty see the same pointer C returns after that message.

## Hallucinations / overclaim

The subject says each parser is the C function and the three gameview rows stay off the full menu. `doset` compounds include menustyle, pickup_burden, sortdiscoveries, and whatis_filter (`:6493–6517`) and not the other three. `config_error_add` and `bad_negation` discard text. `choose_disco_sort`'s preselect highlight is not rewritten here.

## Density

One C file's option cluster, plus `get_sortdisco` in the file the sort optfn calls. Not a second subsystem.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify optfn_windowborders --base 7a0f166d7~1 --reach-all`.

```
verify optfn_windowborders: baseline 7a0f166d7~1 (scoreboard at 3c5dbb972) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke optfn_windowborders: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2822's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
