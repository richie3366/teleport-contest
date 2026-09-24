# Review 1732 — 55da228b3 — doset do_handler dispatch (D-2773)

- SHA: `55da228b3` (`options.c` doset do_handler for msg_window / paranoid_confirmation / versinfo, D-2773)
- Files: `js/options.js` (+98/−~12), `js/jsmain.js` (+3/−1), docs
- Queue row: Must-fix from review 1724 (QUALITY-RISK actionable #1), 0 corpus blocks
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises the C `doset` do_handler dispatch for the three
`has_handler` compounds plus the recorder versinfo default. Diff
delivers: new `doset_optfn_do_handler` (three arms), new
`optfn_paranoid_confirmation_get_val` (`:3021–3037`), new
`doset_compopt_get_val` helper, three rows flipped to `handler: true`
with live value columns, the handler-loop `else` arm with
`opt_set_in_config` marking, the `flags.versinfo` default, and doc
comment updates. Goes one arm beyond review 1724 (which allowed
paranoid "stays literal"): the paranoid get_val arm is ported too.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `doset_optfn_do_handler` (new, async) | C dispatch | `options.c` doset `:8933–8939` → arms `:2516–2518`, `:3039–3041`, `:4511–4516`+`:4530` |
| `optfn_paranoid_confirmation_get_val` (new) | C arm | `options.c:2817–3043` (arm `:3021–3037`) |
| `doset_compopt_get_val` (new) | C call shape | doset_add_menu `:9038–9042` get_val call |
| `flags.versinfo` default | C default | `options.c:7174` initoptions_init |
| handler/optfn doc comments | comment-only | — |

Nothing deleted or re-pointed. Callees all LIVE: `handler_msg_window`,
`handler_paranoid_confirmation`, `handler_versinfo`, `optfn_msg_window`,
`optfn_versinfo`, `allopt_name`/`allopt_idx`, `set_optbuf`,
`mark_opt_need_redraw`, `pline`, `REQ_*`/`OPTN_*` (values verified
identical to the C enums at `options.c:83–88`), `paranoia` table (zero
sentinel present, order accepted in review 1724).

## C ↔ JS fidelity

- Paranoid get_val walked against `:3021–3037`: tmpbuf init ✓, `for`
  over `flagmask != 0` ✓, bits test ✓, BONES hidden unless `wizard`
  or `get_cnf_val` ✓ (`wizard || debug` is the repo-wide precedent,
  same as the accepted D-2765 handler), `" %s"` append → `slice(1)`
  / `"none"` ✓, `OPTN_OK` ✓. `set_optbuf` on a fresh holder matches
  C's `opts[0]=0; strncat` ✓.
- msg_window/paranoid do_handler: bare `return handler_*()` matches C
  `:2517`/`:3040`, result propagated to the caller's `optn_ok` test ✓.
- Versinfo arm walked against `:4476–4477`/`:4511–4516`/`:4530`: `vi`
  snapshot ✓, `(void) handler_versinfo()` ✓, pline
  `'%s' %s %u.` with `== vi ? "not changed, still" : "changed to"` ✓,
  `!= vi && !opt_initial` → `opt_need_redraw` via
  `mark_opt_need_redraw` ✓.
- `opt_set_in_config[allopt_idx(name)]` matches C
  `opt_set_in_config[k]`: verified by script that `idx ==` array
  position for all 217 JS rows (117/125/200 for the three) ✓.
- `doset_compopt_get_val` call shape
  `optfn(idx, get_val, FALSE, buf, empty_optstr)` matches C
  doset_add_menu `:9038–9042` ✓.
- Versinfo default: C `:7174` is `have_branch ? 4 : 1` with
  `have_branch = git_branch && *git_branch`; JS
  `g.nomakedefs?.git_branch ? VI_BRANCH : VI_NUMBER` with
  `VI_BRANCH=4`/`VI_NUMBER=1` (match `flag.h:99–101`) and JS
  `git_branch: null` (`js/date.js:168`) → 1 both ways ✓. No RNG.

Comment nit (not a C-wrong): the `js/jsmain.js` comment says `:7174`
is "absent from pinned upstream" — it is present in pinned upstream
at exactly that line (`sed -n '7115,7180p'` above). Behavior is
C-faithful; only the provenance note is wrong.

## Hallucinations / overclaim

None. "Allopt idx == array position, checked" verified true.

## Density

Must-fix, one item alone, ~70 behavior lines. Correct size. The
`doset_optfn_do_handler` default `return OPTN_OK` is currently
unreachable (all five `handler: true` comp rows dispatch explicitly —
verified by grep), but a future handler row would silently no-op while
marking itself in-config; worth an `impossible()` if that file is next
touched. Not queueable now.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify handler_msg_window --base
55da228b3~1 --reach-all`: 0 blocked + vacuous note (expected — review
Must-fix with 0 corpus blocks), smoke 24/24 REACH-OK. Matches the
D-log, which also shows green/strict/cohort/full 44/44.

## Actionable C-wrongs

None. Review 1724's Must-fix is closed (stamped `D-2773`, hash filled
by `332cdb7ef`).

Verdict: **ACCEPT**
