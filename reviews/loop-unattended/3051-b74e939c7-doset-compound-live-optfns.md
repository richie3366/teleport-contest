# Review 3051 — b74e939c7 — doset's pile_limit/crash_urlmax/glyph rows read their optfns

- SHA: `b74e939c7` (cliffs head: owner use_stethoscope, a region-
  heuristic guess; row scen-options-Healer-52451011 step 88)
- D-entry: D-4211; Ledger: doset_add_menu split
  js=options.js:doset_add_menu+options.js:doset_compopt_get_val+options.js:doset
- `js/` diff: options.js +3 −3

## Intent vs deliverable

Promise: options.c doset_add_menu prints each compound option's current
value through its optfn get_val (`:9036–9044`). JS doset's compound
table still painted pile_limit, crash_urlmax and glyph from literals, so
after `O` set pile_limit to 9 the next `O` menu showed «pile_limit [5]»
where C shows «[9]». The three rows now read their live optfns.

Diff: three entries in doset's `compounds` table change from
`val: '5'` / `val: '-1'` / `val: '(to be done)'` to
`get_val: () => doset_compopt_get_val(optfn_X, 'X')`, the same shape as
every neighbouring row. The promise matches the diff. Before the commit
the table held 3 `val: '…'` literals and now it holds 0, so the family
in this table is closed.

Owner: use_stethoscope was the region heuristic's painter guess. The
failing cell is the `O` menu value column, whose writer is doset →
doset_add_menu, and that is what changed. This is a valid cliff.

## Inventory

- doset compound table rows — js/options.js:11682 (crash_urlmax), :11686
  (glyph), :11702 (pile_limit). C options.c doset_add_menu `:9017–9065`.
- Re-pointed: three literals → existing optfns. sym.mjs output:

```text
optfn_pile_limit js/options.js:4120   sync
optfn_crash_urlmax js/options.js:4039   sync
optfn_glyph      js/options.js:4078   sync
doset_compopt_get_val NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:3786
```

doset_compopt_get_val has a single local definition (not a duplicated
clone). It is the established adapter for C's
`(*allopt[i].optfn)(idx, get_val, FALSE, buf2, empty_optstr)` call. No
symbol was deleted.

## C ↔ JS fidelity

C doset_add_menu `:9038–9044`:

```c
reslt = (*allopt[i].optfn)(allopt[i].idx, get_val, FALSE, buf2, empty_optstr);
if (reslt == optn_ok && buf2[0])
    value = (const char *) buf2;      /* else "unknown" */
```

- pile_limit: C optfn_pile_limit get_val `:3430–3432`
  `Sprintf(opts, "%d", flags.pile_limit)`. JS :4140–4141
  `set_optbuf(opts, String(flags.pile_limit | 0))`, from the same
  game.flags that the do_set arm (:4124–4135) writes. ✔ The default 5
  comes from `PILE_LIMIT_DFLT` (options.js:9437, C `:7175`), so an
  untouched game still shows «[5]».
- crash_urlmax: C `:1332–1336` `if (!opts) return optn_err;
  Sprintf("%d", gc.crash_urlmax)`. JS :4057–4062 has the same shape,
  with `gc.crash_urlmax ?? -1` standing in for C decl.c `:261`'s `-1`
  initializer. The do_set arm writes `gc.crash_urlmax` (:4052). ✔
- glyph: C `:1840–1842` `Sprintf(opts, "%s", to_be_done)` with
  `to_be_done[] = "(to be done)"` (`:125`). JS :4097–4099 is the same. ✔
- "unknown" fallback: doset_compopt_get_val returns `holder.buf` and
  ignores the result code. For these three get_val arms the code is
  always optn_ok and the buffer is never empty (`%d`, a constant
  string), so C's `reslt == optn_ok && buf2[0]` test always takes the
  buffer. ✔ Net-identical here. The neighbouring string rows already
  add `|| 'unknown'`.
- RNG: none.

## Hallucinations / overclaim

None. «crash_urlmax now follows an rc `crash_urlmax:` value» is true
because the rc path calls optfn_crash_urlmax DO_SET (options.js:9963),
which writes gc.crash_urlmax.

## Density

A three-row table fix on the cliffs-head writer, closing the whole
literal family in that table. Small, but it is one cliff with a measured
moved row, so §2b is satisfied.

## Verification

```text
node scripts/hidden-proxy.mjs verify use_stethoscope,doset_add_menu --base b74e939c7~1 --no-reach
  scen-options-Healer-52451011: PASS
verify use_stethoscope: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify doset_add_menu: no corpus session is blocked on it at b74e939c7~1 (vacuous; owner is use_stethoscope)
Rule #2: imports.mjs --rulecheck clean (HEAD, review 3047)
```

The diff contains no FORCE/DIAG/getRngLog/seed/fastforward reads or
coordinates. The D-log shows the frozen runner PASS (RNG 3776/3776,
Screen 146/146), REACH-OK ×2, full 44/44, and `sweep moveloop_core`
674 with 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
