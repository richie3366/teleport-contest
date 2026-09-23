# Review 1724 — 1b02bce10 — optfn_msg_window + 4 same-file option functions (D-2765)

- SHA: `1b02bce10` (`options.c` msg_window / paranoid_confirmation / symset / versinfo / warnings, D-2765)
- Files: `js/options.js` (+500 / −14), docs
- Queue rows: five Open coverage rows (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises "whole-body ports" of five option functions. The diff
adds eleven functions (`optfn_msg_window`, `handler_msg_window`,
`handler_paranoid_confirmation`, `optfn_symset`, `handler_versinfo`,
`optfn_versinfo`, `warning_opts`, `string_for_env_opt`,
`rejectoption`, `assign_warnings`, `optfn_warnings`), three tables
(`msgwind`, `paranoia`, `known_handling`), wires four `allopt[].optfn`
slots and replaces the two inline msg_window fragments in
`parseNethackrc` plus the symset key. The bodies are real. What is
missing is the C caller of the three menu handlers.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `optfn_msg_window` | C body minus do_handler arm | `options.c:2455–2520` |
| `handler_msg_window` | C body; **no JS caller** | `:5831–5890` |
| `handler_paranoid_confirmation` | C body ('m' substitution named); **no JS caller** | `:5952–6008` |
| `optfn_symset` | C body; file I/O + do_handler named | `:4166–4236` |
| `handler_versinfo` | C body; **no JS caller** | `:6572–6617` |
| `optfn_versinfo` | C body minus do_handler arm | `:4471–4534` |
| `warning_opts` / `optfn_warnings` | C bodies | `:7520–7538` / `:4681–4700` |
| `string_for_env_opt` / `rejectoption` | C bodies (MICRO arm named) | `:6682–6690` / `:6811–6820` |
| `assign_warnings` | C body + lazy `gw.warnsyms` seed | `:7540–7548` |
| `select_menu_pick_one/any`, `status_version` | LIVE callees | `sym.mjs`: `options.js:2839 ASYNC`, `:3107 ASYNC`, `botl.js:1927 sync` |

Nothing deleted or re-pointed (the removed lines are inline fragments,
not symbols).

## C ↔ JS fidelity

- `optfn_msg_window`: empty-op `negated ? 's' : 'f'` ✓, negated+value
  → bad_negation + err ✓, `lowc(*op)` s/c/f/r switch ✓, default
  config_error_add sink + err ✓. get_val curses coercion kept behind a
  false `WINDOWPORT(curses)` ✓. `EMPTY_OPTSTR === ''` so the rc
  `msg_window:` empty value now takes the C empty arm ✓ (C
  `string_for_opt` returns `empty_optstr` for a bare colon).
- `handler_msg_window`: `%-12.12s%c%.60s` + `%4s%-12.12s%c%.60s`
  second line ✓; selector `*buf` ✓; preselect on `c == prevmsg_window`
  ✓; `%.20s` pline ✓. The C `n > 1` disambiguation (`:5872–5873`) is
  outcome-equivalent: `select_menu_pick_one` returns the key pressed,
  which is the non-preselected item C chooses.
- `handler_paranoid_confirmation`: table text/order matches `:136–182`
  row for row; BONES skipped unless wizard ✓; `i >= 0` reset,
  `while (--i >= 0)` OR ✓. `select_menu_pick_any` returns preselected
  rows (`:3196`/`:3205` filter on `selected`), so finish-with-Return
  keeps them as C does.
- `handler_versinfo`: n/g/b letters with `n+'0'` group accelerators ✓,
  RELEASED "(not applicable)" ✓, `n > 0`, `&= 7`, nonzero store ✓.
- `optfn_versinfo`: negated → silenterr ✓, `op` reassigned from
  `string_for_opt(opts, FALSE)` ✓, atoi + `& ~7` reject ✓, `%u:`
  get_val chain from the snapshot `vi` with live `flags.versinfo` in
  `%u` ✓, `:4530` redraw gate ✓.
- `warning_opts`: env gate → `rejectoption` ✓, `escapes` then per-slot
  translate; `def_warnsyms[i].sym` read as `.ch` (JS shape; that arm is
  unreachable after strlen anyway) ✓. `assign_warnings` nonzero-only ✓.
- `optfn_symset`: get_val reads a union of homes (`gs.symset` name, then
  `symset`, `_parsed_rc`, `flags`) — commented as pending home
  unification, not C-exact but no reader depends on the difference yet.
- No RNG in any body.

**C-wrong (unwired caller).** `optlist.h:509/556/816` declare
`msg_window`, `paranoid_confirmation`, `versinfo` with
`has_handler = Yes`; C `doset` (`options.c`, csym line 179–180) calls
`allopt[k].optfn(idx, do_handler, …)` for them, which reaches the three
handlers (and, for versinfo, the `:4514–4516` "changed to / not
changed, still" pline). In JS `doset`, those three rows are pushed at
`js/options.js:3688/3691/3709` without `handler: true` and with
hardcoded values (`'single'`, `'1: number (5.0.0)'`), so a pick is
silently dropped at `:3751`. The async argument in the D-log is not a
blocker: the same loop already awaits `handler_perminv_mode` and
`handler_pickup_types` directly (`:3766–3771`). Result: three
exported async handlers are dead code, and an O-menu pick of any of
them diverges from C on the next screen.

## Hallucinations / overclaim

"Whole-body ports" is accurate for the bodies. The D-log files the
missing `doset` dispatch under "Named", but the playbook's deliverable
is "every C caller wired"; a one-line `handler` flag plus one dispatch
arm per option, in the same file, is not a structural omission.

## Density

500 insertions over ~370 lines of C across eleven functions: in range
(above the 250-line mark, so a longer review ceiling applies). Five
rows in one C file is allowed when every callee is live or named; the
gap is the caller side, not a callee stub.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_msg_window --base
1b02bce10~1 --reach-all`:
- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`
- `smoke … 24 run, 3.0s: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log. The corpus cannot see the gap: no corpus session
picks these rows in `doset`.

## Actionable C-wrongs

1. `js/options.js` `doset` (full O menu): mark `msg_window`,
   `paranoid_confirmation`, `versinfo` as handler rows, render their
   values through `optfn_msg_window`/`optfn_versinfo` REQ_GET_VAL
   (paranoid stays literal until `optfn_paranoid_confirmation`
   `:2818` lands), and dispatch picks to `handler_msg_window`,
   `handler_paranoid_confirmation`, and `handler_versinfo` + the
   `optfn_versinfo` `:4513–4516` pline, per C `doset` do_handler
   (`optlist.h:509/556/816` has_handler).

Verdict: **QUALITY-RISK**

**Addressed:** D-2773 (55da228b3)
