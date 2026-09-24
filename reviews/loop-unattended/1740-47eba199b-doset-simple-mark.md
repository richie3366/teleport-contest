# Review 1740 — 47eba199b — doset_simple hasHandler mark (D-2781)

- SHA: `47eba199b` (`options.c` doset_simple hasHandler arms mark `opt_set_in_config`, D-2781)
- Files: `js/options.js` (+10/−4), docs
- Queue row: Must-fix from review 1737 (0 corpus blocks cited)
- Banned grep: 0 hits in the hunk (`AUTOUNLOCK_FORCE` is a pre-existing bit name, not a `FORCE` gate). `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises the review-1737 mark: capture `reslt` from the four
`doset_compound_via_getlin` hasHandler arms and set
`opt_set_in_config` on `optn_ok`, plus `handler_pickup_types`
returning `optn_ok`. Diff delivers exactly that. No new function.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `handler_pickup_types` (return added) | C callee, local | `options.c:6113–6121` |
| `doset_compound_via_getlin` (mark added) | simple-menu compound arm | `options.c:8535–8702` (`:8664–8670` is the mark) |
| `handler_perminv_mode` / `handler_menu_colors` / `handler_number_pad` | unchanged callees, results now kept | `:6010–6083`, `:6406–6499`, `:5892–5950` |

Nothing deleted. Nothing re-pointed from a local clone to an import.
`sym.mjs` (required; no delete/re-point, so the changed names):

```
handler_pickup_types NOT EXPORTED — 1 LOCAL at js/options.js:2591
doset_compound_via_getlin NOT EXPORTED — 1 LOCAL at js/options.js:3482
handler_perminv_mode NOT EXPORTED — 1 LOCAL at js/options.js:2604
handler_menu_colors js/options.js:3261 ASYNC
handler_number_pad js/options.js:1622 ASYNC
optn_ok / OPTN_OK NOT FOUND (consts, not functions: both 1 at :648 and :5161)
allopt_idx NOT EXPORTED — 1 LOCAL at js/options.js:1085
```

"LOCAL CLONE" here is sym's label for the one definition. No second copy.

## C ↔ JS fidelity

C `doset_simple_menu` (`:8664–8670`): if `has_handler && optfn`, call
`do_handler`, then `opt_set_in_config[k] = TRUE` when
`reslt == optn_ok && allopt[k].idx != pfx_cond_`. `k` is the allopt
array slot (`a_int = i + 1`). JS writes
`opt_set_in_config[allopt_idx(name)]`. `allopt_idx` returns `row.idx`.
A scan of the 217-row table: 0 mismatches of position vs `idx`
(`pickup_types` 134, `perminv_mode` 128, `number_pad` 122,
`menu colors` 108). The serializer at `all_options_strbuf` tests
`opt_set_in_config[i]` with that same index. The four slots are not
215 (`pfx_cond_`), so dropping the guard on this arm matches C.

Returns, call-for-call (no RNG in any of these):

- `handler_pickup_types` `:6113–6121` is nine lines and one
  `return optn_ok`. JS now returns `optn_ok` after the menu assign.
- `handler_perminv_mode` `:6082` is the only return, after the
  `n >= 0` block, so ESC still returns `optn_ok`. JS returns
  `optn_ok` on `kind !== 'pick'` and at the end. The mark fires on
  cancel, as C does.
- `handler_menu_colors` returns `optn_ok` at the done label (`:6430`,
  also the add-ESC `goto`) and at `:6498` when `pick_cnt < 0`.
  JS `menucolors_done` and the `picks === null` arm both return
  `optn_ok`.
- `handler_number_pad` `:5949` returns `optn_ok` after the switch,
  including no-pick. JS returns `OPTN_OK` the same way. `optn_ok` and
  `OPTN_OK` are both 1, so `reslt === OPTN_OK` holds.

Unmatched `hasHandler` names leave `reslt` at `OPTN_ERR` and do not
mark. That deferral (symset and the other simple-menu handlers) is
the pre-existing comment, restated in the map, not a new stub.

Full doset (`:4563–4566`) still drops `handler_pickup_types` /
`handler_perminv_mode` and does not mark those two. C `doset`
`:8935–8939` marks on `optn_ok`. The map names that remainder
(D-2773). It is outside this diff.

`get_option_value` emits a CompOpt line only when `optfn` is set.
`number_pad` has `optfn_number_pad`, so this mark reaches a save
line. `pickup_types` and `perminv_mode` still have `optfn: null`, and
`menu colors` is OthrOpt (the save loop skips OthrOpt; menucolors
dump is unconditional). The flag write is what `:8668` does; the
missing optfns are older gaps, not this hunk.

Callers of `doset_simple_menu`: declaration `:374` and
`doset_simple` `:8724` only. JS `doset_simple_menu` `:3837` is that
call. No site C never calls.

## Hallucinations / overclaim

"Match C" is the mark, not a new whole-function port. The four
"returns `optn_ok` on every path" cites (`:6120`, `:6082`, `:6430` +
`:6498`, `:5949`) match the csym bodies. No dispatch-with-stub claim.

## Density

+10/−4 on a Must-fix that was one mark plus one return. In range for
that row. Not a coverage-function claim.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify handler_number_pad --base 47eba199b~1 --reach-all`:

```
verify handler_number_pad: 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify handler_number_pad: no corpus session is blocked on it at 47eba199b~1 — a vacuous verify is NOT a corpus PASS.
smoke handler_number_pad: no RNG-tagged reach; fixed smoke spread (24 run, 9.6s): 24 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the vacuous note is the expected
one. 0 REGRESSED. Matches the D-log.

## Actionable C-wrongs

None in this hunk. The full-doset pickup_types/perminv_mode drop
stays a named map omit (D-2773 remainder), not a new Must-fix.

Verdict: **ACCEPT**
