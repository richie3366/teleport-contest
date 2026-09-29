# Review 2073 — 405ed7298 — report.c 6-function closure

- SHA: `405ed7298` (D-3113)
- Subject: "`report.c` NH_panictrace_libc + NH_panictrace_gdb + crashreport_bidshow + dobugreport + swr_add_uricoded + panictrace_handler (6× same-file closure)"
- js/ insertions: js/report.js (+158), js/cmd.js (+2), js/earlyarg.js (+2/−1), js/getline.js (+6)
- Prior index: 2072; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: six report.c exports in C order — two compiled-arm
`return FALSE` panictrace stubs, bidshow (sink named), dobugreport
(fallback live, send by-design), full swr_add_uricoded, handler
(write/abort named) — plus the `:543` + `#bugreport` wirings.

Diff actually adds: exactly that. Matches the promise; the
js/report.js header is honestly rewritten (no longer "no
imports").

## Inventory

Per function (cluster of 6, one C file):

- `NH_panictrace_libc` — C :484–512. Live: `#if 0` cited dead,
  `#else return FALSE` (`:510`). Correct iff PANICTRACE_LIBC
  never defined — verified (no -D in sys/unix or config.h; only
  report.c/cfgfiles.c guards + end.c runtime priorities).
- `NH_panictrace_gdb` — C :528–560. Same shape, `:558` arm;
  never defined — verified likewise.
- `crashreport_bidshow` — C :188–200. Live: unix-unconditional
  block shape (the `#if` wraps only the `if` line — the jsdoc
  gets this right); WIN32 arms cited out. Named: `raw_print(bid)`
  sink (D-2573; raw_printf routing correctly refused — would
  invent handler/count effects).
- `dobugreport` — C :460–471. Live: fallback pline verbatim,
  crashreporturl-or-DEVTEAM_URL gate exact, ECMD_OK. By-design:
  submit_web_report send (ledger by-design, Rule #2, no JS
  symbol — verified). Async-only-because-pline.
- `swr_add_uricoded` — C :236–281. Whole pure body live:
  TextEncoder bytes, C-locale isalnum ranges, `+` arm, `<=3`
  rollback (rem zeroed not restored ✓), signed-char 8-digit
  `%02X` (x86-64 signed char — correct target reading),
  silent-drop when `x > rem` (no else — subtle and exact),
  `!rem` exact-zero gate. No RNG.
- `panictrace_handler` — C :599–622. CURSES arm cited out
  (config.h:58 commented — verified); write(2) + NH_abort named
  (ledger by-design both — verified). No invented throw ✓.

Helpers: pline (display.js), DEVTEAM_URL/ECMD_OK (const.js),
game (gstate.js) — all LIVE, all call-time reads. No clones, no
stubs, nothing deleted or re-pointed. New edges verified
cycle-free (display/const/gstate import none of
cmd/earlyarg/report — grepped).

## C ↔ JS fidelity

Branch-by-branch confirmed against each csym range above; the
two trickiest spots (bidshow's guard-only-if shape, uricoded's
drop-when-wide + zero-not-restore) are exactly right. The D-log
records a differential probe of uricoded vs compiled C (15
vectors, ALL MATCH) — the right evidence for this body.

Callers: earlyarg.c:543 wired ✓; `#bugreport` triple-wired
(generated row flags 40 = GENERALCMD|NOFUZZERCMD pre-existing,
EXT_CMDS runner row + FUNCT_TXT reverse added; C cmd.c:1684–1686
position/flags verified) ✓; uricoded's sole caller by-design ✓;
end.c callers by-design (NH_abort) ✓; handler installed only by
by-design setsignals (0 refs — verified) ✓.

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck;
TextEncoder is a platform global, not a Node import).

## Hallucinations / overclaim

None. Every compiled-out claim carries its negative evidence;
by-design callees resolve in the ledger.

## Density

6-function one-file cluster, per-function Ledger (ported ×3,
partial ×3 — correct use of partial for named-sink functions)
+ Verify lines, ≤10, no Must-fix bundled. ~170 js/ insertions —
in the 200–800 band's neighborhood with 6 whole functions.
Per-function verdicts: all ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (`--base 405ed7298~1 --reach-all`, all 6 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, 6/6 smoke 24/24 → REACH-OK. Matches the D-log's
verbatim tail. No REGRESSED session. Green 2/2, strict ×2,
cohort 7/7 + explicit full 44/44 (dispatch tables touched —
correct extra diligence).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
