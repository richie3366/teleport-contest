# Review 2974 — aaeebada5 — doset_simple_menu k-swap picks roguesymset

- SHA: `aaeebada5` (near-pass cliff; board owner symbols.c do_symset,
  writer options.c doset_simple_menu)
- D-entry: D-4134; Ledger: doset_simple_menu ported
- `js/` diff: `js/options.js` +17/−13

## Intent vs deliverable

Promise: on the Rogue level, C swaps the whole symset row for the
roguesymset row (`k = opt_roguesymset; name = allopt[k].name;
any.a_int = k + 1;`). JS swapped only the name, and the get_val went
through a symset special case. The pick still reached handler_symset as
opt_symset, so «Select symbol set:» opened where C opens «Select rogue
level symbol set:». Diff: one `k` object
(`{ ...opt, name: 'roguesymset' }`) is used for the row text, the
get_val and the pick. simple_opt_get_val gets a separate roguesymset arm,
and format_simple_opt_line drops its `dispName` parameter. Promise = diff.

## Inventory

- `doset_simple_menu` — options.js:10274 region; C options.c:8535–8702
  (k-swap :8605–8611, get_val :8614–8616, pick :8645–8686).
- `simple_opt_get_val` (symset / roguesymset arms) — options.js:9955.
- `format_simple_opt_line` — options.js:10005 (parameter removed; no
  other caller passed it).

## C ↔ JS fidelity

```c
k = i;
if (allopt[i].optfn == optfn_symset && Is_rogue_level(&u.uz)) {
    k = opt_roguesymset;  name = allopt[k].name;  any.a_int = k + 1;
}
... reslt = (*allopt[k].optfn)(allopt[k].idx, get_val, ...);   /* :8614 */
...
k = pick_list[0].item.a_int - 1;                                 /* :8645 */
if (allopt[k].has_handler && allopt[k].optfn) ... do_handler
```

JS now keys all three uses on `k`. The pick dispatches by name in
doset_compound_via_getlin, so it reaches the roguesymset handler and
do_symset's `rogueflag`. The help line still reads `allopt[i].descr` (JS
`opt.descr`, the unswapped row), as C does at :8627. The `(for
autopickup)` suffix tests `allopt[i]` in both. The spread copies symset's
`hasHandler` and `opttyp` onto the roguesymset row. Both are true / Comp
for roguesymset in allopt, so no arm changes.

## Hallucinations / overclaim

None. The Verify bullet reports doset_simple_menu's 2 NO MOVEMENT rows
honestly (Barbarian-50355007 s30, Samurai-50162003 s120, other causes
present at baseline).

## Density

Whole k-swap arm. The rest of doset_simple_menu was already ported.

## Verification

```text
verify do_symset (--base aaeebada5~1): scen-symset-Ranger-50150023 PASS → PROGRESS
verify doset_simple_menu: 2 unchanged (s30, s120) → NO MOVEMENT (pre-existing)
```

Exact match with the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
