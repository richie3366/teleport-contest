# Review 2119 — 746254c61 — burden/runmode prompt rows + cond/mouse/IBM cluster

- SHA: `746254c61b31d14fee3057ba3c20e8170e25de7f` (D-3159)
- Date: 2026-09-30. `js/` delta: +212/−11 options.js; +231 test (20/20, re-ran).
- Cluster: 6 functions (2 paint fixes + 4 ports) + 4 dispositions (3 stale + 1 by-design) = 10, at the ceiling.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises the paint fixes plus the three optfns +
`count_cond`. Diff actually adds: the two prompt-row fixes, the four
ports, allopt + rc + doset wirings, the simple-menu cond-arm fix, and
the suite. Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `handler_pickup_burden` (options.js:2701) | prompt `{attr: ATR_INVERSE}` + blank row | whole (paint fix verified) |
| `handler_runmode` (options.js:6913) | same 3-line shape | whole |
| `optfn_mouse_support` (options.js:6951, sync export) | new, C order | whole |
| `optfn_IBMgraphics` (options.js:7013, sync export) | new, BACKWARD_COMPAT arm | partial (named file-IO remainder) |
| `optfn_o_status_cond` (options.js:11510, sync export) | new | whole |
| `count_cond` (options.js:11492, sync export) | new | whole |
| `doc_extcmd_flagstr`, `keylist_func_has_key`, `all_options_menucolors` | ledger stale → ported | dispositions (sites verified) |
| `optfn_windowchain` | ledger by-design | disposition (verified) |

Callee closure, all LIVE: `opt_atoi`, `string_for_opt`,
`allopt_name`, `config_error_add`, `set_optbuf`, `cond_menu`,
`condtests` (newly imported live `botl.js` export — not a clone),
`currently_set_val`, `Is_rogue_level`, `assign_graphics`,
`CONDITION_COUNT`/`NUM_GRAPHICS` (live const). No stubs. Nothing
deleted/re-pointed.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`handler_pickup_burden`** — C `options.c:6085–6111` (`csym`): body
(letters/ints/pick→burden−1/OK) matches; the added prompt+blank rows
match `tty_end_menu` `win/tty/wintty.c:2685–2689` (prepend blank,
then prompt with `tty_menu_promptstyle` → prompt, blank, items —
verified the prepend order). The corpus PROGRESS below proves the
attr value empirically. Confirm.

**`handler_runmode`** — C `:6123–6149`: same shape, same fix. Confirm.

**`optfn_mouse_support`** — C `:2395–2453`: compat `strlen<=13` ✓,
`string_for_opt(opts, compat||!optInit)` ✓, bare→`!negated` 1/0 ✓,
atoi + `<0||>2||(0&&*op!='0')` → error + ERR ✓, get_val unix table
✓ (out-of-range writes nothing, still OK ✓), get_cnf_val `%i` ✓.
rc arms carry the `:626` negateok-No gate. Confirm.

**`optfn_IBMgraphics`** — C `:1905–1960`, BACKWARD_COMPAT defined
(`optlist.h:15`, verified) so the `#else` ERR arm is compiled out ✓.
Loop: name-set → badflag, ROGUESET rename, dupstr; read_sym_file
failure arm + clear/switch named (Rule #2 file IO / by-design
seeds — the doc comment names them and the ledger row is `partial`)
✓; badflag → error + ERR ✓; `!optInit && rogue` assign ✓; gets
write empty ✓; negated skips to OK ✓. Confirm as partial.

**`optfn_o_status_cond`** — C `:8413–8442`: do_set/get_cnf_val `;`
✓, get_val `!opts`→ERR + `n_currently_set(count_cond())` ✓,
do_handler TRUE→`opt_set_in_config[pfx_cond_]` + unconditional OK —
the simple-menu arm now mirrors this exactly (was cancel→ERR and
dropped the mark) ✓. Confirm.

**`count_cond`** — C `:9178–9188`: exact. Confirm.

**Dispositions:** `optfn_windowchain` body under `#ifdef WINCHAIN`
(`:4855`), `config.h:618` commented — compiled out ✓. Three stales
at claimed sites ✓.

Ledger-text glitch (not a C-wrong): at this SHA the IBM row's `omit`
carried the section's first Named bullet (handler_pickup_burden's)
instead of the per-fn one — the same `omitFor` bug class as D-3149's
dosuspend, already repaired in-tree by D-3161 (`a8bd0bc2e`). Noted, not
queued.

## Hallucinations / overclaim

None. Per-function C-locus/Callers/Verify/Named bullets all present;
the IBM remainder is `partial`, not sold as whole.

## Density

- Whole-function verdicts: 5 whole + 1 partial (IBM, named file-IO
  remainder); every arm verified; every C caller path wired (allopt +
  rc valued/valueless + doset get/handler + dump).
- Cluster: one C file, 6 + 4 = 10 functions — exactly at the ceiling.

## Verification

Re-measured myself (`--base 746254c61~1 --reach-all`, all 6):

```text
verify handler_pickup_burden: 1 blocked — scen-options-Samurai-94071 moved → obj_resists at step 43 (was 41) → PROGRESS
verify <other 5>: 0 blocked each; smoke 24/24 PASS each → REACH-OK ×6
```

The D-log PROGRESS claim reproduces exactly (same session, same
steps, same later owner). Zero `REGRESSED`. Suite 20/20 (re-ran). No
seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
