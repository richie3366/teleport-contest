# Review 2745 — 3fef422cd — doset in-order pick_list walk

Metadata: SHA `3fef422cd`, D-3888, `js/options.js` (+ 1-line comment fix
in `js/cmd.js`), 1 function (`doset`). Cliff-head writer fix.

Intent vs deliverable: subject promises the category-partition
(bool→getlin→handler→othr batch loops) replaced by one
`for (const it of selected)` loop dispatching per pick in menu order,
moving Ranger-582811 s91 to PASS (scen-options 21/21). Diff actually
adds: the restructured loop with per-kind arms (help/bool/handler/
getlin/othr), each arm body verbatim, plus a new ESC gate on the getlin
arm and updated C cites. Promise = diff.

Inventory: `doset` (js/options.js:11462) — changed, pick-walk only.

C ↔ JS fidelity: C `options.c:8914–8959` (read directly): one
`for (pick_idx…)` loop over `pick_list` in collection order; HELP_IDX →
`display_file` + `continue`; `BoolOpt` → `parseoptions("!name")`; else
(has_handler && optfn) → `do_handler` + optn_ok mark, else `getlin("Set
%s to what?")` with `abuf[0]=='\\033' → continue` (skipping both
parseoptions and preference_update), then `preference_update` per pick.
JS now mirrors this arm-for-arm: help→display_file+continue; bool→live
toggle path (D-0499 body, verbatim); comp+handler→do_handler + OPTN_OK
mark; comp→`doset_compound_via_getlin` with `abuf==='\\x1b' → continue`;
othr→per-name handlers. ESC-gate helper contract verified:
`doset_compound_via_getlin` (js/options.js:9583) returns `'\\x1b'` on ESC
(line 9645) and internally skips parseoptions on ESC, and returns `abuf`
at the end (line 9692) — so the doset gate skips exactly
`preference_update`, matching C's `continue`. Menu-order claim verified:
`select_menu_pick_any` returns `items.filter(...)` (js/options.js:10302,
10311), which preserves menu order like C's `tty_select_menu` mlist
walk. No RNG in the walk. The js/cmd.js hunk is a comment-only
`othrPicks` → `othr` rename.

Hallucinations / overclaim: none. "Each arm body verbatim" holds — the
diff shows pure relocation plus the ESC gate, which is itself C (`:8947–
8948`). No dispatch-over-stub: handler/getlin bodies are the shipped
live ones.

Density: one cliff-head writer, whole-walk fix, one probe session,
movement claimed, plus a family completion (scen-options 21/21). Ledger
touch present. Session-reaching.

Verification: re-measured myself. `verify optfn_pickup_types --base
3fef422cd~1 --reach-all`: 1 blocked at baseline,
`scen-options-Ranger-582811: PASS`, `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`, smoke 24/24 REACH-OK. D-3888 movement claim
reproduces; no REGRESSED row. No symbol delete/re-point, so no `sym.mjs`
output required. Rule #2 clean (checked this iteration). No FORCE/DIAG/
seed/coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
