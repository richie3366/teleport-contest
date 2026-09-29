# Review 2077 — 78a21f6e4 — assure_syscf_file + showpaths + fopen

- SHA: `78a21f6e4` (D-3117)
- Subject: "`cfgfiles.c` assure_syscf_file + `files.c` do_deferred_showpaths + fopen_config_file completion (coverage cluster)"
- js/ insertions: js/cfgfiles.js (+41/−8), js/files.js (+22), js/options.js (wirings), js/earlyarg.js (doc-only)
- Prior index: 2076; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: new `assure_syscf_file` (VFS readability for the unix
open, gd-gated showpaths(1), message + exit), new
`do_deferred_showpaths` (flag clear, reveal_paths + cleanups
named, live unix tail), fopen fqname wiring + errno-arm cites,
3 caller wirings, 2 omit retirements.

Diff actually adds: exactly that. Matches the promise; no extra
scope.

## Inventory

Per function (cluster of 3, caller/callee closure across
cfgfiles.c/files.c/options.c):

- `assure_syscf_file` (new export) — C cfgfiles.c:2028–2068
  (csym range; inside live `#ifdef SYSCF`+`SYSCF_FILE`,
  config.h:232–234 verified). Live: readability gate, gd-gated
  showpaths(1), verbatim message, exit. Named: none in-body
  (WIN32/NOCWD/VMS opens cited out; SFCTOOL off — SFFLAGS only
  in util Makefiles, verified).
- `do_deferred_showpaths` (new export) — C files.c:3089–3114.
  Live: gd ensure + flag clear `:3092`, unix tail `:3101`.
  Named: reveal_paths `:3093` (files.c:3175, 117 lines, no JS
  symbol, own unknown row — verified), the 3 cleanups (ledger
  by-design ×3 — verified).
- `fopen_config_file` (completion) — C :222–372. fqname wired
  at `:234`; `:269–273`/`:356–369` cited un-fireable;
  wait_synch correctly absent (no-op macro cfgfiles.c:117–120
  — verified).

Helpers: fqname (files.js:583, live; identity when no prefix —
verified), vfsReadFile (VFS precedent), nh_terminate (≡ exit),
after_opt_showpaths (live). No clones, no stubs. All four
"new" edges return --can ALREADY (pre-existing static imports,
symbol lists extended) — safer than claimed.

## C ↔ JS fidelity

Assure: `fd >= 0 → close+return` ≡ `vfsReadFile != null →
return` (fd/close fold into the one read — sound); gate order
exact; message literal byte-verbatim incl. `\n`; EXIT_FAILURE
live (const.js:944). Showpaths: `void code` correct (code feeds
only omitted reveal_paths); gd home corrected flat→game.gd
with decl.js:51 + the earlyarg.js:343 writer — reader/writer
set grepped consistent (no flat stragglers); unix tail exact,
non-unix tail cited out. Fopen: `:234` fqname exact;
access-denied collapse documented (VFS one-read-one-failure;
`%d` errno → 0 cited); `:356–369` errno-gate correctly never
fires without an errno channel; `:269–273` rationale precise
in-code (the commit message's "errno-gated" label for it is
loose — that arm is access-ok/fopen-failed, not errno-gated —
but the code cite is right).

Callers: options.c:7093/:7289 both wired ✓ (diff), sfctool.c:680
is util/ tool code ✓ by-design; showpaths :2064/:7112 both
wired this iteration ✓; fopen sole caller :1629 pre-existing
file-local ✓ (C staticfn).

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. The old "live flat on game" comment this commit corrects
was wrong, and the correction is verified right.

## Density

3-function closure, per-function Ledger (ported + partial ×2 —
correct partial use for named-sink functions) + Verify lines,
≤10, no Must-fix bundled. ~65 js/ insertions + an 8-vector
test. Per-function verdicts: all ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (`--base 78a21f6e4~1 --reach-all`, all 3 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×3. Matches the D-log.
No REGRESSED session. Green 2/2, strict ×2, cohort 7/7, full
44/44 shared + initoptions-init.test.mjs 8 pass per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
