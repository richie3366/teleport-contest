# Review 2121 — a8bd0bc2e — optfn_statushilites + optfn_statuslines

- SHA: `a8bd0bc2e23926af81533ffae603e6710bf01077` (D-3161)
- Date: 2026-09-30. `js/` delta: +103 options.js, comment-only botl.js;
  +15-test suite (15/15 + sibling 20/20, both re-ran).
- Cluster: 2 ports + 4 stale dispositions = 6 functions, one C file.
- Prior-review closure claimed: none. (Also repairs the D-3159 IBM
  ledger `omit` text in this commit — the fix review 2119 notes.)

## Intent vs deliverable

Subject promises the two status optfns. Diff actually adds: both
ports, allopt + rc + doset wirings, the `reset_status_hilites`
import-name, and the suite. Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `optfn_statushilites` (options.js, sync export) | new, C order | whole |
| `optfn_statuslines` (options.js, sync export) | new, C order | whole |
| `gloc_filter_classify_glyph`, `pass_two`, `pass_three`, `remove_autopickup_exception` | ledger stale → ported | dispositions (sites verified) |

Callee closure, all LIVE: `string_for_opt`, `opt_atoi`,
`bad_negation`, `allopt_name`, `config_error_add`, `set_optbuf`,
`wc2_supported`, `mark_opt_need_redraw`, `reset_status_hilites`
(new import-name on a pre-existing edge — `imports.mjs --can`
returns ALREADY, verified). No stubs. Nothing deleted/re-pointed.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`optfn_statushilites`** — C `options.c:4012–4064` (`csym`).
STATUS_HILITES defined (`config.h:616`, verified) so the three
`#else` arms are compiled out ✓. negated → 0 ✓; else
`string_for_opt(TRUE)`, empty/empty_optstr → 3 else atol (JS `!op`
covers both C disjuncts since EMPTY_OPTSTR is `''`) ✓, <0 → 1 ✓;
`!opt_from_file` → reset ✓; get_val strings byte-exact ✓;
get_cnf_val `%ld` with C's fall-through (no early return) ✓. rc
valued/valueless arms pass negation through (negateok Yes) with
`optFromFile=true` skipping the reset like C's file parse ✓. Confirm.

**`optfn_statuslines`** — C `:4066–4107`: retval/itmp init ✓;
`string_for_opt(opts, negated)` ✓; negated arm (bad_negation,
itmp=2, ERR) falls through to the range check with no early return
— JS mirrors the fall-through ✓; valued → atoi, bare → itmp 0 →
SILENTERR ✓; error text ✓; store + `!optInit` → redraw ✓; gets read
the wc2 gate with the `:4101`/`:4103` arms ✓. rc arms carry the
`:626` negateok-No gate ✓. Confirm.

**Doset statuslines display (explicit note, not a C-wrong):** the
full-doset row inlines the `:4101` supported arm instead of calling
the live get_val, because the deliberate minimal JS wincap2
(`install_tty_wincap2`: URGENT_MESG|SUPPRESS_HIST only) would make
the live optfn read 'unknown'. C-observable output on the contest
tty (which sets WC2_STATUSLINES, `wintty.c:119`, verified) is
'2'/'3' — the inline preserves exactly that, and the ported get_val
remains whole for the dump path. Documented in code and D-log.
Whether JS wincap2 should set the bit is out of scope for this SHA.

## Hallucinations / overclaim

None. "No corpus session blocked on either" matches my re-run; the
wincap2 divergence is disclosed, not hidden.

## Density

- Whole-function verdicts: both whole (every arm verified; allopt +
  rc valued/valueless + doset + dump paths wired).
- Cluster: one C file, 2 ports + 4 stales = 6 ≤ 10. One `Ledger:`
  entry per function — present.

## Verification

Re-measured myself (`--base a8bd0bc2e~1 --reach-all`, both):

```text
verify <each of 2>: baseline a8bd0bc2e~1 — 0 session(s) blocked on it
smoke <each of 2>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Suites 15/15 + 20/20
(re-ran). No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
