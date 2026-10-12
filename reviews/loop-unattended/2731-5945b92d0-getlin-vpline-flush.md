# Review 2731 — 5945b92d0 — getlin prompt vpline vision flush (D-3871)

## Metadata

- SHA: `5945b92d0` (cliffs-head writer port)
- D-entry: D-3871; Ledger: `hooked_tty_getlin split`
- js diff: `js/getline.js` +10 (one call at each of 2 sites + cites)
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: the getlin/get_ext_cmd prompt must consume a pending
vision recalc via custompline→vpline (Caveman-95234 624→PASS).

The diff actually adds: one `vpline_flush_vision();` before the initial
`await paint();` in `getlin` and in `get_ext_cmd`, with C cites. Helper
already imported for yn — no new edge. Promise == deliverable.

## Inventory

- `getlin` (`js/getline.js:314`) and `get_ext_cmd` (`js/getline.js:1663`,
  both async) — one call each. No symbol deleted or re-pointed
  (`vpline_flush_vision` is the live `js/display.js:9572` export, already
  imported at `js/getline.js:23`, already used at `:2175` — no `sym.mjs`
  re-point paste required).

## C ↔ JS fidelity

C loci, read from pinned C:

- `win/tty/getline.c` hooked_tty_getlin (`:42–227` per csym): `:60–67`
  issues every prompt via
  `custompline(OVERRIDE_MSGTYPE | SUPPRESS_HISTORY, …)` → vpline.
- `src/pline.c` vpline: `:266–271` consumes a pending
  `gv.vision_full_recalc` (`vision_recalc(0)` with `in_pline` held),
  then `:277–278` flushes before `putmesg`.

JS order matches C order: recalc-consume (`vpline_flush_vision()`)
first, then the flush/paint half (`paint()` already implemented
`:277–278`). Echo repaints stay addtopl with no vpline — matches C
(the prompt vpline runs once before the input loop) and the in-file yn
precedent (`tty_yn_function`). The D-log's elimination proof (0 draws
in keys[623], every gap occupant newsym-free, NOMUX shadow order) plus
the instrumented `vision_full_recalc`-stuck-at-1 measurement (reverted)
is measured, not inferred. RNG: the recalc reveals cells with 0 scored
draws — no `rn2` walk either side.

## Hallucinations / overclaim

None. "Match C" is for the custompline-vision arm only, and the rest of
hooked_tty_getlin is honestly kept `split` in the ledger. No markers in
the hunks; Rule #2 clean (review 2727 scan). No test harness file, but
regression is the corpus session itself — disclosed, acceptable for a
2-call wiring fix.

## Density

Cliff-head writer port with movement (xname_flags row's writer; the
prompt string itself correctly untouched — byte-identical both sides).
One cliff, code + ledger + verify in one handoff. `Ledger:
hooked_tty_getlin split` — correct status for a partial-unit port.

## Verification

Re-measured by this audit
(`verify xname_flags,hooked_tty_getlin --base 5945b92d0~1 --reach-all`):

- `verify xname_flags: 1 PASS → PROGRESS`
  (scen-worldtour-Caveman-95234: PASS).
- `verify hooked_tty_getlin`: vacuous (0 blocked — expected).
- Smoke spreads 24/24 REACH-OK ×2; 0 regressed.

No REGRESSED session. The "1 PASS" movement claim is confirmed on
current code.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
