# Review 1737 — 1adad9065 — number_pad option (D-2778)

- SHA: `1adad9065` (`options.c` handler_number_pad + optfn_number_pad, D-2778)
- Files: `js/options.js` (+206/−14 incl. a deleted display clone), docs
- Queue row: Open coverage (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises the handler + optfn with the option live in both O
menus. Diff delivers: `optfn_number_pad`, `handler_number_pad`, the
full-doset arm, allopt wiring, doset row, doset_simple hasHandler arm,
delegating display (deleting the `game.Cmd` clone), and two rc sites
with `!number_pad` skipped per negateok-No. Bodies whole; one dispatch
effect missing (below).

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `optfn_number_pad` (new, export) | C body minus do_handler arm | `options.c:2573–2645` |
| `handler_number_pad` (new, export) | C body | `options.c:5892–5950` |
| doset arm + allopt + doset row + simple arm + rc sites | C callers | doset `:8935`, doset_simple `:8665`, parseoptions `:636` |
| deleted `simple_opt_get_val` number_pad block | clone → live delegation | — (no named symbol; no `sym.mjs` needed) |

Nothing else deleted or re-pointed. Callees LIVE: `string_for_opt`
(shape-verified), `bad_negation` (named message stub, live call),
`doset_compopt_get_val`, `allopt_idx/name`. optlist.h `:535`:
negateok=No (the `continue` skips match C `:626` rejection outcome),
has_handler=Yes (both menu wirings legitimate) ✓.

## C ↔ JS fidelity

- do_set walked against `:2583–2620`: `compat = len ≤ 10` on the
  full string ✓, op recomputed via `string_for_opt` ignoring the
  passed `_op` ✓ (so the trimmed-`val` question is moot — interior
  spaces survive in `stripped`), empty arm with the
  `compat||negated||optInit` gate ✓, negated-valued → live
  `bad_negation` call + OPTN_ERR ✓, `atoi` ⟺ `parseInt` with the
  `mode==0 && *op!='0'` rule (`0x`→(off,0), `x`→err both ✓),
  `≤0 → (FALSE, mode<0)` / `>0 → (TRUE, bits)` ✓.
- get_val index: C reads post-`reset_commands` `gc.Cmd`; the JS
  derivation re-checked against the sync formulas at `cmd.c:3377`
  (`num_pad`), `:3384` (`swap_yz=(mode&1)?!num_pad:FALSE`), `:3397`
  (`pcHack=(mode&1)?num_pad:FALSE`), `:3416`
  (`phone=(mode&2)?num_pad:FALSE`) — the compare-and-set converges
  to exactly the JS expressions ✓. `numpadmodes` strings verbatim
  ✓; get_cnf_val `%i` with 5→−1 ✓. Deleting the `game.Cmd` display
  clone is a fidelity gain (rc `number_pad:4` displayed `1=on`
  before, `4=…` now, matching C).
- Handler walked against `:5892–5950`: six texts verbatim ✓, no
  preselect (`selected` omitted ⟺ MENU_ITEMFLAGS_NONE) ✓, a_int /
  letter / gacc ✓, six switch pairs ✓.
- Init: C `:7158` is `reset_commands(TRUE)` (four FALSE); JS
  falsy-unset is equivalent for the `?.`/`|0`/`!!` readers ✓.
  `tty_number_pad` checked: state 0 is a no-op but state 1 emits
  the KE termcap string — the map's "tty platform no-op" elides
  that; no scored channel carries termcap output, so the naming
  conclusion (nothing to port) stands. Comment nit only.

**C-wrong (missing dispatch effect).** C `doset_simple_menu`
`:8668–8669` marks `opt_set_in_config[k]=TRUE` when a has_handler
compound's do_handler returns `optn_ok`. The new
`doset_compound_via_getlin` number_pad arm awaits the handler and
marks nothing — and since `handler_number_pad` returns OPTN_OK
even on cancel, C marks on *every* simple-menu pick. The full-doset
else arm (D-2773) marks correctly; the simple menu is the gap, and
unlike its D-2773 sibling it is not named in the map.

## Hallucinations / overclaim

None. "Output-identical to the gc.Cmd read" holds via the sync
formulas verified above.

## Density

~170 behavior lines for two C functions + both menus + rc: in
range. Named omits (reset_commands with the derivation bridge,
number_pad(), error sink, glyph columns) are in the map.

## Verification

Re-ran both `node scripts/hidden-proxy.mjs verify {handler,optfn}_number_pad --base 1adad9065~1 --reach-all`: 0 blocked + vacuous note (expected) + smoke 24/24 REACH-OK each. Matches the D-log.

## Actionable C-wrongs

1. `js/options.js` `doset_compound_via_getlin` number_pad arm: mark
   `opt_set_in_config[allopt_idx('number_pad')]` when the handler
   returns OPTN_OK (C `:8668–8669`; the D-2773 full-doset else-arm
   pattern — same one line suits the three sibling hasHandler
   arms).

Verdict: **QUALITY-RISK**
