# Review 2140 — 94d7337ef — option/menu dispatch and cleanup

SHA `94d7337ef`, D-3180; 2026-09-30; +216 JS. Revisits review 1465 suffix.

## Intent vs deliverable

“Option dispatch, menu-color handler and menu-key lookup with cleanup
exports” adds six exports, restarts menu-color handler, wires three allopt
entries, menu value/handler consumers and shared PICK_* command mapping.

## Inventory — optfn_o_bind_keys

New dispatcher; count_bind_keys/handler_rebind_keys imported LIVE.

## C ↔ JS fidelity — optfn_o_bind_keys

options.c:8323–8343 init/empty-set/get NULL guard/count/handler/default
match. Handler result is ignored before OK, after awaiting input.
Function-pointer registration and full-menu calls wired. Existing
parameter/command integration debt is explicitly named, not an empty callee.

## Inventory — optfn_o_menu_colors

New dispatcher; count and handler real LIVE callees.

## C ↔ JS fidelity — optfn_o_menu_colors

options.c:8367–8386 same guarded count requests, handler result returned
rather than ignored. Allopt and simple/full menus use it and mark success.

## Inventory — handler_menu_colors

Restarted body; regex/color/free callees LIVE; raw-menu/window adapters
are named CLONEs, no silent STUB. test_regex_pattern verified C-matched.

## C ↔ JS fidelity — handler_menu_colors

options.c:6406–6499 done/update, add/ESC and ordered regex→color→attr→add
short-circuit, list/remove loop match. Current :6466 contains two quotes
and no backslash; new suffix follows pinned C rather than review 1465's
old transcription. Truncation :6470–6477 and shifted removal indices match.
PICK_NONE/PICK_ANY ESC=-1 exits without done/update; nonnegative reloops.
No direct RNG. query_color/query_attr retain their existing live menu bodies.

## Inventory — optfn_monsters

New obsolete-option body; buffer adapter only.

## C ↔ JS fidelity — optfn_monsters

options.c:2377–2393 init/set OK and empty get/cnf output match.
Legitimate C no-op, not stubbed dispatch. Allopt registration wired.

## Inventory — map_menu_cmd

New export; mapped_menu_strings storage adapter, no duplicate lookup.

## C ↔ JS fidelity — map_menu_cmd

options.c:8110–8121 first matching command byte maps to same-index operation;
missing byte returns original. Implicit NUL is included. Shared readers
preserve explicit page choices; PICK_ONE also includes whole-menu unique
groups per wintty.c:1328–1768, :1525–1528/:1555–1561. Dedicated readers
remain specifically map-named omissions.

## Inventory — free_autopickup_exceptions

New export; regex_free LIVE, pattern/node ownership released by GC.

## C ↔ JS fidelity — free_autopickup_exceptions

options.c:9371–9382 regex release before head advance, repeated to NULL
matches array representation. Sole caller save.c:1155 absent and named;
no invented save path. No RNG.

## Inventory — options_free_window_colors

New export; wcolors_table is existing storage adapter.

## C ↔ JS fidelity — options_free_window_colors

options.c:10115–10127 four fg/bg pairs, non-NULL includes empty strings,
clear each then reset flag matches. Sole save.c:1176 caller named absent.

## Inventory / C ↔ JS fidelity — changed adapters

select_menu_pick_one/any/none implement process_menu_window's caller guard
:1555–1561; existing selectors remain prior to mapping. doset_compound_via_getlin,
simple_opt_get_val and doset reach the new dispatchers; options.c:8757–8975
successful handler changes now mark opt_set_in_config. Native-menu lifecycle
and dedicated-reader gaps remain explicit, not claimed newly ported.

## Hallucinations / overclaim

No “Match C” dispatcher hiding empty callee; monsters' no-op is C's body.
Prior 1465's suffix evidence differs from current pinned source; corrected
implementation is warranted. Required historical sym output:

```text
handler_rebind_keys js/cmd.js:2418 ASYNC — await required
handler_menu_colors js/options.js:6994 ASYNC — await required
count_bind_keys js/cmd.js:1508 sync
count_menucolors js/options.js:5835 sync
optfn_o_bind_keys js/options.js:12969 sync
optfn_o_menu_colors js/options.js:12991 sync
optfn_monsters js/options.js:13014 sync
map_menu_cmd js/options.js:13032 sync
```

Rule #2 clean; invent→options ALREADY. Diff scan empty, no TDZ read or
cycle-forced clone. Dispatcher handler requests are sync-or-promise.

## Density

Seven whole same-file functions plus their caller closure:

- Ledger: optfn_o_bind_keys ported — ACCEPT-WITH-DEBT.
- Ledger: optfn_o_menu_colors ported — ACCEPT.
- Ledger: handler_menu_colors partial — ACCEPT-WITH-DEBT.
- Ledger: optfn_monsters ported — ACCEPT.
- Ledger: map_menu_cmd partial — ACCEPT-WITH-DEBT.
- Ledger: free_autopickup_exceptions partial — ACCEPT-WITH-DEBT.
- Ledger: options_free_window_colors partial — ACCEPT-WITH-DEBT.

Individual Ledger/Verify lines present; uncompiled/stale rows are
retirements before the active head, not unrelated new C ports.

## Verification

Historical seven together, `--base 94d7337ef~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| optfn_o_bind_keys | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_o_menu_colors | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| handler_menu_colors | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_monsters | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| map_menu_cmd | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| free_autopickup_exceptions | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| options_free_window_colors | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

D-log green/strict, cohort 7/7, full 44/44. Isolated-oracle claims cover
control/strings/256 bytes, not terminal geometry; no hidden PASS overclaim.

## Actionable C-wrongs

None newly found; native-menu, dedicated-reader and teardown caller debt
remain individually named in the map.

Verdict: **ACCEPT-WITH-DEBT**
