# Review 2510 — 48a2765fa — config_erradd windowed arm + doset optfn path

Metadata: SHA `48a2765fa` (D-3630), cliffs-head `options.c` optfn_boulder
writer (config_erradd !ready windowed arm) + crash_urlmax companion (same
doset flow — Barbarian picks both). js diff: `js/cfgfiles.js` +30/−8,
`js/options.js` +26/−4, no new test file (justified: Barbarian full-pass is
the corpus-maintained test). ≤10-function SHA: full Method on all touched.

## Intent vs deliverable

Promise: (1) `config_erradd` !ready arm splits by window state — pre-window
→ configMsg (C raw_print), windowed → return the display promise
`pline('%s', msg)` + `tty_wait_synch()`, C `:1559–1562` in order. (2)
`config_error_add`/`vconfig_error_add` keep sync signatures, propagate the
return (sync arms → undefined, 60+ callers unaffected). (3) optfn_boulder
control/clash arms + optfn_crash_urlmax invalid arm chain the promise to
their C returns. (4) `doset_compound_via_getlin` drives boulder/crash_urlmax
via awaited direct optfn calls replicating parseoptions `:504–505`+`:636–640`.
Claims 1 PASS (Barbarian-94191) + 1 moved (Tourist-94351 20→125) + REACH-OK.

Diff actually adds: exactly that. Matches the promise.

## Inventory

- `config_erradd` (`js/cfgfiles.js:308`) — !ready arm split; ready/in_lua arms
  untouched.
- `config_error_add` / `vconfig_error_add` — `return` plumbing only.
- `optfn_boulder` (control + clash arms), `optfn_crash_urlmax` (invalid arm) —
  `const bad` + promise chain; sync numeric returns preserved.
- `doset_compound_via_getlin` — new boulder/crash_urlmax branch; fruit/
  suppress_alert/else paths untouched.

## C ↔ JS fidelity

C `config_erradd` (`nethack-c/upstream/src/cfgfiles.c:1543–1589`, via
`csym.mjs`; sole C caller `:1889`): !ready arm `:1557–1563` =
`pline("%s%s%s", !window_inited ? "config_error_add: " : "", buf, punct)` +
`wait_synch()`. JS: pre-window → `configMsg('config_error_add: ' + text +
punct)` (exact prefix shape); windowed → `pline('%s', msg)` + `tty_wait_synch()`
in C order. The `%s` wrapper matches C's verbatim-arg shape (no re-scan of
`%` in message text). The pline/wait_synch idiom matches the file's own
`:175–185` arms (verified at `js/cfgfiles.js:76–79`). RNG: none on this path.

C optfn returns (verified at pinned `options.c`): boulder control arm
`return optn_ok` (`:1201`), clash arm falls to shared `return optn_ok`
(`:1228`); crash_urlmax invalid arm `return optn_err` (`:1325`). JS chains
`bad.then(() => OPTN_OK/OPTN_ERR)` respectively, and when `bad` is undefined
(pre-window) falls through to the unchanged numeric returns — so parseoptions
`:639–640` (`optresult === OPTN_OK`) stays exact. C control flow preserved:
the clash arm still has no early numeric return pre-window.

New doset branch mirrors C `parseoptions(buf, FALSE, FALSE)` (`:504–505`
globals set explicitly; `:636` string_for_opt TRUE; `:637–638` optfn do_set
with explicit opt_initial FALSE; `:639–640` mark). The 6th `optInitial` arg
(FALSE here vs TRUE at the rc sites `:5250`/`:5432`) matches C's global at
each call shape. Bypassed arms (`:522`/`:529–533`/`:540–543`/`:621–623`) are
named with the well-formed-doset-input rationale; doset values (exact menu
name + getlin abuf) cannot carry `!` negation or dupe scope.

Promise blast radius (audited, not assumed): `config_error_add` has 129 JS
call sites; only the 3 new `const bad` sites read the return — the "no caller
uses the return" claim verified by search. Windowed promise producers are only
these two optfns' error arms; their windowed callers are only the new awaited
doset branch (parseoptions dispatch `:12721` is pre-window for rc/env/bool
paths — doset fallback `:9543` now excludes both names; `toggle_bool_option`
is BoolOpt-only; `doset_compopt_get_val` is promise-tolerant and REQ_GET_VAL
never hits error arms). `cnf_error`/`earlyarg` erradd callers are pre-window.
`sym.mjs` re-point check: N/A — no symbol deleted/re-pointed; pline +
tty_wait_synch were already imported (`js/cfgfiles.js:14`).

## Hallucinations / overclaim

None. The Tourist-125 `js-throw` token is pre-explained as the owner-null
fallback — I confirmed independently via `hidden-proxy show`: `error: null`,
`owner: null`, RNG 3952/3952, step 125, topline `a - fruit[b]` vs
`a - fruit[slime mold]`, exactly as described. The "windowed errors from
other sync-called optfns paint detached" limitation is named with its
falsifier (a mores-bearing one would fail; none does). No dispatch-over-stub.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads/
`fastforward`/hardcoded coords. Rule #2: global `--rulecheck` clean (2506).

## Density

Cliff phase: one cliff row (optfn_boulder, 2 blocks) + its same-flow
companion (crash_urlmax, picked in the same Barbarian doset) — same C file,
same probe path, not bundled unrelated work. Five `Ledger:` entries, one per
function. No-op/busywork: no (1 PASS + 1 strictly-later move).

## Verification

Re-measured:
`node scripts/hidden-proxy.mjs verify optfn_boulder,optfn_crash_urlmax --base 48a2765fa~1 --reach-all`:

- `verify optfn_boulder: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Barbarian-94191 PASS; Tourist-94351 moved → step 125, was 20)
- `smoke optfn_boulder: 24 PASS, 0 regressed → REACH-OK`
- `verify optfn_crash_urlmax: no corpus session is blocked` (companion, 0
  blocked — D-log claims no PASS for it)
- `smoke optfn_crash_urlmax: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
