# Review 2395 — df8520aa2 — wizkit config_error wire + tty_yn audit (D-3465)

Metadata: SHA `df8520aa2`, D-3465, Open missing-arm R1–R3.
3 functions (≤10 → whole Method each). Files: `js/files.js` (+17/−7:
1 import, NULL arm, init/done frame). tty_yn unchanged (audit).

## Intent vs deliverable

Promise: (R1) fire C files.c:2577–2579 `config_error_add` on the
wizkit NULL arm; (R2) wrap read_wizkit's parse in
init (`:2592`)/done (`:2597`); (R3) audit the tty_yn
WIN_NOSTOP entry gate (wire-or-scope). Diff actually adds: the NULL
arm call, the init/done frame, one cfgfiles import. tty_yn
untouched per the audit's scope verdict. Matches the promise.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| proc_wizkit_line | ported (arm) | js/files.js:175–195 | files.c:2561–2581 |
| read_wizkit | ported (frame) | js/files.js:210–224 | files.c:2583–2601 |
| tty_yn_function | audited | js/getline.js:2072–2075 | win/tty/topl.c:389–392 |

## C ↔ JS fidelity

**proc_wizkit_line — confirm.** `csym.mjs` → files.c:2561–2581.
BUFSZ chop (C :2565–2566) pre-exists at js/files.js:176.
`readobjnam(buf, (struct obj *)0)` — no_wish NULL; C objnam.c:4919
mungspaces runs before the nothing/nil/none check (:4922–4924),
so NULL covers all three spellings plus no-match, and `buf` at the
report call is post-mung. JS: `ret()` publishes wishbuf with
`d._cbuf` = munged (js/readobjnam.js:2027–2035) on the nothing path
(`:2036` → `no_wish || NOTHING_OBJ`), so `parsed.wishbuf` equals
C's `buf`; `line` fallback only fires where C's buffer is
unreachable (never from this caller). Format string C-verbatim
(`Bad wizkit item: "%.60s"`); the `%.60s` cap is live in
`config_error_format` (`text.slice(0, p)`, js/cfgfiles.js:390).
FALSE/TRUE returns in C order; hands_obj skip pre-exists.
Caller is a fnptr pass at files.c:2594 (`csym --callers` shows only
the :191 prototype — fnptr, not a missed site).

**read_wizkit — confirm.** C :2583–2601: wizard+fopen gate,
wishing=1, init(TRUE,"WIZKIT",FALSE), parse, fclose, done (bare —
return discarded in C too), wishing=0. JS keeps the exact order;
fclose folds into the one VFS read, which like C's fopen has no
game-state effect before wishing=1. Per-line `config_error_nextline`
stays named on parse_wizkit_text (helper subset, unchanged).

**tty_yn_function audit — confirm.** C gate is win/tty/topl.c:389–392
(`(cw->flags & (WIN_STOP|WIN_NOSTOP)) != WIN_STOP` → more(), then
clear both). NOSTOP lifecycle verified: sole setter wintty.c:2282,
unconditional clear :2300 ("one-shot"), no other setter in win/
(direct `flags =` only zero-inits at :869/:2005). NOSTOP is always
clear at yn entry, so the gate reduces to `NEED_MORE && !STOP` —
exactly `flush_topl_more` (js/display.js:8062–8066) + `clear_win_stop`.
Wiring the exception would be dead code; the no-change audit stands.

Callee class: `config_error_add/init/done` — LIVE imports, all
`sym.mjs`-confirmed sync exports (js/cfgfiles.js:425/:236/:346),
bodies ported (add whole D-3405/D-3469). No clones, no deleted or
re-pointed symbols — no re-point output owed:
`config_error_add js/cfgfiles.js:425 sync`,
`config_error_init js/cfgfiles.js:236 sync`,
`config_error_done js/cfgfiles.js:346 sync`.

## Hallucinations / overclaim

None. "C-verbatim format", "C order", "one-shot" all verified above.
The audit's "always clear at yn entry" is proved, not asserted
(setter/clearer census + zero-init check).

## Density

Breadth-phase whole-function bar: both wired functions whole, every
arm in C order; the audit names no remainder (NOSTOP exception
proved dead, not deferred). Per-function Ledger entries + Verify
lines present; Left open: none. Line citations drift by one in two
places (files.c:2562 vs 2561, topl.c:390 vs 389 — return-type/doc
lines); substance exact.

## Verification

D-log: 3× hidden note (rows cited none) + 3× REACH-OK, green,
strict, cohort. Re-ran `hidden-proxy.mjs verify
proc_wizkit_line,read_wizkit,tty_yn_function --base df8520aa2~1
--reach-all`: 0 blocked at baseline and working scoreboard on all
three; 3× REACH-OK (24/24 each, 0 regressed). Claim true; vacuous
notes legitimate (missing-arm rows cited no blocks). Rule #2 clean
(iteration-wide `--rulecheck`). Diff grep: no FORCE/DIAG/seeds/
coords/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
