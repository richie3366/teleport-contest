# Review 1743 — 310accbad — optfn_sortvanquished (D-2784)

- SHA: `310accbad` (`options.c` optfn_sortvanquished, D-2784)
- Files: `js/options.js` (+109), `js/insight.js` (rename `VANQORDERS` → export `vanqorders`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises the whole `optfn_sortvanquished` (`options.c:3958–4010`),
the insight table exported, and do_handler split out because
`set_vanq_order` / `pline` are async. Diff delivers
`optfn_sortvanquished`, `optfn_sortvanquished_do_handler`, rc do_init
and both do_set sites (each copies `vanq_sortmode` onto the rc flags
bag), doset menu row, `doset_optfn_do_handler` and
`doset_compound_via_getlin` arms, and `allopt` `optfn`.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `optfn_sortvanquished` | C body minus do_handler | `options.c:3957–4010` |
| `optfn_sortvanquished_do_handler` | do_handler arm, async | `:3997–4008` |
| `vanqorders` | exported table (was local) | `insight.c:2601–2618` |
| `set_vanq_order` | imported, writes `vanq_sortmode` | `insight.js:955` |
| `string_for_env_opt` | existing local | `options.c:6682–6690` |
| `config_error_add` | imported no-op sink | named |

`csym --callers`: 0 (pointer, `optlist.h:690`). `sym.mjs`:

```
optfn_sortvanquished js/options.js:3880   sync
optfn_sortvanquished_do_handler js/options.js:4413   ASYNC
vanqorders       js/insight.js:888   sync   export const
VANQORDERS       NOT FOUND
set_vanq_order   js/insight.js:918   ASYNC
string_for_env_opt NOT EXPORTED — 1 LOCAL at js/options.js:2100
```

`OPTN_SILENTERR` is a const (`options.js:6126`, value -1), not a function.

## C ↔ JS fidelity

`do_init` stores `VANQ_MLVL_MNDX` (0, key `t`). `do_set` calls
`string_for_env_opt(name, opts, FALSE)`, which rejects and returns
empty when `!go.opt_initial` (`:6685–6687`) and otherwise
`string_for_opt`. Negation still assigns mode 0 after that call
(`:3971–3972`) and returns `optn_ok`. Non-empty: `strchr("tdaACcnz")`
then `strchr("01234567")`, else `config_error_add` + `optn_silenterr`.
Empty non-negated → `optn_err`. get_val copies key and, only for
`get_val`, `": "` + short text (`[1]`). do_handler saves the mode,
`set_vanq_order(TRUE)`, then the `'%s' %s "%s: %s".` pline. No RNG.

JS `indexOf('tdaACcnz')` / `'01234567'.includes` is the same first-char
test. The eight `vanqorders` rows match `insight.c:2602–2617` including
the menu text. do_handler is awaited from both doset sites; it is not
inside the sync function, so a rc `do_set` cannot hit the menu. Rc
passes `optInitial true` into `string_for_env_opt`'s fourth argument,
which is how that helper reads `go.opt_initial`. Unknown parameters
return `OPTN_SILENTERR` (-1) before the store.

`config_error_add` still does not print (named). `rejectoption`'s
`pline` is not awaited (pre-existing helper).

## Hallucinations / overclaim

"Whole-body" matches the four requests. do_handler is a sibling, as
the subject says, and both C doset call styles are wired. The table
export is the same eight rows, not a second copy.

## Density

~111 lines for a 54-line function, the table export, and the call
sites. In range.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_sortvanquished
--base 310accbad~1 --reach-all`:

```
verify optfn_sortvanquished: baseline 310accbad~1 (scoreboard at 315a5ae66, 2026-09-25T15:53:42.671Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_sortvanquished: no corpus session is blocked on it at 310accbad~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_sortvanquished: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
