# Review 1611 — a9b0ff62 — earlyarg.c scores_only + 2 stale parks (D-2652)

**Metadata:** SHA `a9b0ff62`, `earlyarg.c` `scores_only`, D-2652. JS:
new C-home `js/earlyarg.js` (+66). Docs: two Parked-Stale lines
(pot_acid_damage, left_side). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `scores_only` port with per-arm cites,
async only for the live `prscore` await, terminate tail as
in_moveloop=0 + `nh_terminate_capture()` + return, plus two stale
parks with proofs. Diff delivers all of it. Promise matches
deliverable.

## Inventory

- `scores_only(argc, argv, dir)` (earlyarg.js:30, async, exported) —
  C `earlyarg.c:404–441` (38 L, ATTRNORETURN staticfn).
- Imports: `game` (gstate.js leaf) + `prscore`/
  `nh_terminate_capture` (topten.js); `--can`: no new cycle, new
  file has no importers ✓.
- No deleted symbol, no clone→import re-point.

## C ↔ JS fidelity

C body read here in full (quoted above). Arm-by-arm confirm, in C
order (no RNG either side):

- `:407–410` config_error_done → named omit (JS
  config_error_add is a sink, botl.js:1149 — no queue can exist,
  done() structural no-op) ✓ with rationale, not bare naming.
- `:412–416` CHDIR/chdirx → Rule #2 omit (no CWD in scored JS) ✓;
  the `#else nhUse(dir)` arm is equally filesystem-free ✓.
- `:417–422` SYSCF initoptions toggle → named omit (no initoptions
  port; sysconf has no scored counterpart) ✓.
- `:423–427` PANICTRACE ARGV0/signals → platform omit ✓.
- `:428–430` UNIX whoami → platform omit (plname default owned by
  startup/askname; cf. getuid→0) ✓.
- `:431` `await prscore(argc, argv)` — LIVE (`sym.mjs`: async
  export topten.js:1021, await required ✓).
- `:432–437` MSWIN wait_synch → compiled-out (config.h:61) ✓.
- `:439` nh_terminate(EXIT_SUCCESS) → `in_moveloop = 0` (≡ end.c
  terminate shape) + live `nh_terminate_capture()` (same boundary
  call as done2 end.js:1208 / save-quit save.js:1164) + return for
  C NOTREACHED; ATTRNORETURN honestly noted unrepresentable ✓.
- Caller: C `:309` inside `early_options` — named as own future
  row, not silently dropped ✓.

Stale-park audit (same-commit docs changes): pot_acid_damage body
live js/trap.js:5859 with callers :5927/:6001 ✓; left_side body
live js/vision.js:611 (`// C ref: vision.c left_side()`) with 3
wires (:670/:715/:721) ✓ — one line each, ≤3-call class, legitimate.

## Hallucinations / overclaim

None. "Async only because prscore must be awaited" verified via
sym.mjs. No dispatch-over-stub (sole live callee imported).

## Density

Breadth phase: 66 insertions for a 38 L C function (new 1:1
C-home per Constitution §3.1) + two legitimate stale parks in the
same iteration — correct playbook handling, not a stall.

## Verification

D-log Verify bullet claims PASS + smoke REACH-OK + SMOKE PASS.
Re-measured here: `hidden-proxy.mjs verify scores_only --base
a9b0ff62~1 --reach-all` → 0 blocked both sides (vacuous note quoted
verbatim, correctly labeled) + smoke 24/24 REACH-OK, no REGRESSED.
Claim true. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates/
fastforward. Rule #2: no argv/process/fs plumbing (caller passes
the adjusted slice) ✓.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
