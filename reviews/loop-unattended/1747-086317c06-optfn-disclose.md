# Review 1747 — 086317c06 — optfn_disclose (D-2788)

- SHA: `086317c06` (`options.c` optfn_disclose, D-2788)
- Files: `js/options.js` (+232/−40), `js/hacklib.js` (`strkitten`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises `optfn_disclose` and `handler_disclose` in C order,
`strkitten`, and removal of `parseDiscloseOption`. Diff delivers those.
do_handler is async and wired from `doset_optfn_do_handler`
(`options.js:1881`).

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_disclose` | C body minus do_handler | `options.c:1441–1560` |
| `handler_disclose` | do_handler callee, async | `:5674–5777` |
| `strkitten` | imported | `hacklib.c:275–283` (append one char at eos) |
| `disclose_strcmpi` | local `strcmpi` | used at `:1488–1490` |
| `parseDiscloseOption` | deleted | no C name |

`sym.mjs`:

```
optfn_disclose   js/options.js:264   sync
handler_disclose js/options.js:353   ASYNC — await required
strkitten        js/hacklib.js:171   sync
parseDiscloseOption NOT FOUND
```

## C ↔ JS fidelity

`do_init` returns `optn_ok`. `do_set` uses `string_for_opt(opts, TRUE)`.
Negated with a value → `bad_negation` + `optn_err`. Empty, `all`, or
`none`: `none` forces negated, then every slot is `'-'` or `'y'`
(`DISCLOSE_NO_WITHOUT_PROMPT` / `DISCLOSE_PROMPT_DEFAULT_YES`,
`flag.h:110–114`). Otherwise the walk lowercases, maps `k`→`v` and
`d`→`o`, and indexes `"iavgco"` (`decl.c:54`). A prefix in
`yn?+-#` is held and applied to the next category; `?` and `#` become
`y` and `+` unless the category is `v` or `g`. No prefix stores `+`.
Space is ignored. Anything else is `config_error_add` + `optn_err`.
`num` is never incremented, so `num < sizeof end_disclose - 1` (7−1)
does not stop the walk. JS keeps that. get_val / get_cnf_val emit
`y i a v …` via `strkitten` (mode char, letter, spaces). No RNG.

Mode characters in `js/const.js:1196–1201` are `y n ? + - #`.

`handler_disclose` builds the six category rows, then a per-category
PICK_ONE menu. Vanquished and genocides add the `#` and `?` rows.
`n > 1` (second pick when the first equals the old mode, `:5769–5770`)
is folded into `select_menu_pick_one` and named. `nul_glyphinfo` is
named. `bad_negation` / `config_error_add` still do not print (named).

## Hallucinations / overclaim

"Whole-body" matches both functions. The `n > 1` fold is stated in
the subject, not hidden. `parseDiscloseOption` is gone.

## Density

~232 lines for 120 + 104 lines of C, minus the window boilerplate
the menu helpers already own. In range.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_disclose --base
086317c06~1 --reach-all`:

```
verify optfn_disclose: baseline 086317c06~1 (scoreboard at 6864eb3d8, 2026-09-25T16:32:16.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_disclose: no corpus session is blocked on it at 086317c06~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_disclose: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
