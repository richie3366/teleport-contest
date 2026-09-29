# Review 2064 — e32d557c0 — earlyarg.c lopt/scan/tails closure

- SHA: `e32d557c0` (D-3104)
- Subject: "earlyarg.c breadth cluster: lopt matcher + early_options scan + consume/terminate/usage/scores/dump tails (coverage)"
- js/ insertions: ~430 (earlyarg.js only)
- Prior index: 2063; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port the whole earlyarg.c closure — MISSING head `lopt`,
caller `early_options`, consume/terminate/usage/showpaths tails,
restart THIN `scores_only`, retire the `dump_glyphids` omit in
argcheck.

Diff actually adds: 7 new functions + `errorNoReturn` + restarted
`scores_only` + argcheck wiring + new cfgfiles/glyphs/end imports,
with `nh_terminate_capture` dropped for live `nh_terminate`. Matches
the promise; no extra scope.

## Inventory

Per-function (cluster of 9, all earlyarg.c):

- `lopt` (file-local ≡ staticfn) — C :69–144. Whole body.
- `consume_arg` (file-local) — C :146–162. Whole body.
- `consume_two_args` (file-local) — C :165–176. Whole body.
- `early_options` (export, unwired by design) — C :179–361. Whole body.
- `opt_terminate` (file-local) — C :363–373. Whole body.
- `opt_usage` (file-local) — C :375–387. Whole body modulo named omits.
- `after_opt_showpaths` (export) — C :389–400. Whole body modulo omit.
- `scores_only` (export, restart) — C :404–441. Whole body modulo omits.
- `dump_glyphids` (export) — C :805–809. Whole body.
- `errorNoReturn` (file-local) — CLONE of sys/share/unixtty.c
  error() :473–486 observable half, verified below.

Helpers: all LIVE — config_error_init/done (cfgfiles), config_erradd
core (D-3098), eos (hacklib), dupstr, raw_printf, prscore,
initoptions, nh_terminate (end.js), dump_all_glyphids (glyphs.js),
argcheck/ARG_* (same file). No stubs. Dropped import (not a deletion):

```text
nh_terminate_capture js/topten.js:1269   sync
```

— still live, still used by end.js:1266 and save.js:1226; dropping it
from earlyarg.js orphans nothing.

## C ↔ JS fidelity

`lopt`: first-letter gate via charAt (NUL-at-end ≡ '' both sides);
`=`-wins-over-`:` split with p including the separator; Disallowed+p
→ notallowed bail; `(l>2||oneletterok) && slice-compare` ≡ strncmp
(verified equivalent on the length-2 optname edge); Required+eos →
falsy-`p` nextarg arm; oneletter `-wfoo` slice(2); `#if 0` -w:foo arm
cited compiled-out; `p===null||p==='' `≡ `!p||!*p`; nextarg consume
with `--argc/++argv` on the boxes; Required-without-next → required
bail else novalue. The three `%.60s` diagnostics pre-truncate origarg
to 60 chars into the live config_erradd core — exact rendering of
C's format (label + first 60). Enum values verified identical
(0/1/2, mask 3, oneletter 4, complain 8; novalue '[nothing]').

`consume_arg`/`consume_two_args`: rotate-to-end + hide / consume-
restore-consume-unrestore — verbatim, in-place on the boxed array.

`early_options`, arm by arm: ENHANCED_SYMBOLS pre-check
(config.h:368 verified defined); config_error_init live; `?` usage
gate; `ndx += (consumed?0:1)` loop with per-iteration boxes (the
slice-copy vs C pointer-into-array difference is unobservable —
consume always ends the iteration); `--` collapse gate with the
arg[3] `-`/`=`/`:` exclusion; `b` CRASHREPORT arm (config.h:250
verified); `d` chain incl. live DUMPENUMS (NODUMPENUMS commented,
:360 verified), CHDIR lopt block with oldargc→consume/consume_two
split and the `!= 'e'` decgraphics guard; `h`/`?` double-lopt `||`
(`!== null`, correctly non-falsy — novalue and empty-nextarg are
truthy in C); `n` exact-name + lopt with rcfile dupstr; `s` SHOWPATHS
early-return (gd.deferred_showpaths + dir + done) then Disallowed
lopt with the single-dash oneletter condition and
`scores_only(argc+1, [base[ndx-1], ...local], hackdir)` ≡ C's
`argv-1` (Disallowed never consumes — proved from lopt :137's
Required/Optional gate); `u` UNIX arm (config.h:18 verified, WIN32
arm out); `v`; `w` with the `!== null ? dupstr : null` (empty-value
correct); D/X out (UNIX defined); trailing done+return. No RNG in
any body. Exact throughout.

`opt_terminate`: early_options=0, done, nh_terminate(EXIT_SUCCESS) —
exact, every call site returns after (NOTREACHED ≡ return).

`opt_usage`/`after_opt_showpaths`: live terminate tail; chdirx
(Rule #2), dlb_init, genl_display_file(USAGEHELP) named with C
lines — ledger `partial` for opt_usage. Correct.

`scores_only`: done now LIVE (D-3098 queues — the old sink rationale
is retired, correctly); SYSCF block live incl. the
initoptions_noterminate wrap around live initoptions(); PANICTRACE/
whoami/MSWIN (config.h:61 commented, verified) omitted/compiled-out
as named; prscore awaited; `nh_terminate(EXIT_SUCCESS)` live,
bypassing opt_terminate as in C. The newly-live initoptions() call
is unreachable in scored play (no JS caller of scores_only/
early_options — verified by search), so zero fortress risk.

`dump_glyphids`: callee sink fed to raw_printf — exact modulo the
pre-existing Rule #2 sink adaptation. Wired at argcheck :665.

`errorNoReturn` (CLONE, verified): C error() exits windows iff
inited (false this early — vacuous), settty iff needed (tty-only —
vacuous), Vprintf+newline, exit(FAILURE). JS renders message+newline
via raw_printf and nh_terminate(EXIT_FAILURE). Faithful.

Callers: lopt's 7 C sites, consume's 5, consume_two's 2, terminate's
8, usage's 3, scores_only :309, dump :533 — every one mapped to a
wired JS line in the D-log and spot-held (two one-line citation
nits: D-log `:231` is `:230` per csym; lopt "6 sites" counts lines
not calls — neither affects code). early_options' unixmain.c:134 and
after_opt_showpaths' files.c:3101 callers are correctly exported-
unwired with the owning path named.

New edges (cfgfiles/glyphs/end): `--can` hung for the porter again,
but the safety proof doesn't need it — my own grep confirms zero
static importers of earlyarg.js in js/, so no cycle is constructible
and no TDZ read can exist. Premise re-verified, conclusion sound.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. Every "whole body / all wired" claim is proved above; the
22/22 /tmp probe claim is consistent with the branch audit (probe
correctly left out of the repo — no new interface to pin).

## Density

Breadth-phase cluster: 9 functions ≤ 10, one C file (earlyarg.c),
~430 js/ insertions. Each function has its own Inventory block, its
own `Ledger:` entry (ported×8/partial×1 — all 9 confirmed in
earlyarg.c.jsonl), and its own Verify line. No bundled Must-fix.
Per-function verdicts: ACCEPT ×9.

## Verification

Re-measured at this SHA (`--base e32d557c0~1 --reach-all`, one call,
all 9): 0 blocked at baseline and working tree for every function,
vacuous notes printed, smoke 24/24 → REACH-OK each. Matches the D-log
exactly. No REGRESSED session. Shared gates per D-log: syntax,
rule2, green 2/2, strict ×2, cohort 7/7, VERIFY PASS (full skipped —
earlyarg.js has no importers, correct).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
