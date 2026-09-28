# Review 1986 — 34c78a6ac — sys.c whole-file closure (D-3026)

Metadata: SHA `34c78a6ac` (D-3026). Coverage closure: queue
head sysopt_release + two ledger-absent siblings. New 1:1
`js/sys.js` (134 lines) + 2-line jsmain wiring. Subject
promises the whole sys.c file as explicit defaults with
per-arm cites.

## Intent vs deliverable

Promise: sys_early_init/sysopt_release/sysopt_seduce_set in C
order, `free`⇔null / `panic`⇔throw adaptations, build-shape
arms cited-not-ported, sys_early_init wired before rc parsing
(C allmain.c:43 order). Diff actually adds exactly that.
Promise kept.

## Inventory

- `sys_early_init` (js/sys.js:37, export): whole body.
- `sysopt_release` (js/sys.js:96, export): whole body.
- `sysopt_seduce_set` (js/sys.js:133, export): whole body
  (honest no-op — C's compiled body is a bare return).

No helpers, no clones, no deleted symbols.

## C ↔ JS fidelity (per function)

### sys_early_init — verdict: exact-C, ACCEPT

C (`sys.c:20–112`, csym range) walked whole against JS:
support/recover clears → SYSCF wizards `= 0` arm → DEBUGFILES
absent-env else arm (`:44–45` + env_dbgfl=0; getenv has no
scored-JS analogue, Rule #2, correctly cited-not-ported) →
shellers→livelog block → record-file bounds → PERS_IS_UID
panic gate (throw ≡ panic, precedent-cited) → PANICTRACE
released-arm zeros → crashreporturl/check_save_uid/
check_plname/seduce + seduce_set call → saveformat/bonesformat
→ accessibility → hideusage. All in C order.

Constant values verified against pinned headers:

```text
config.h:333 PERSMAX 3 / :339 ENTRYMAX 100 / :336 POINTSMIN 1
config.h:343 PERS_IS_UID 1
config.h:238 GDBPATH "/usr/bin/gdb" / :241 GREPPATH "/bin/grep"
hack.h:976 historical = 1 / global.h:493 LL_NONE 0
config.h:232-235 SYSCF(+FILE) / :368 ENHANCED_SYMBOLS /
  :249-253 CRASHREPORT / :616 STATUS_HILITES — all defined
```

So every live-arm choice is right. Dead arms (`#else`
dupstrs, DUMPLOG retired D-1776, WIN32, unreleased
PANICTRACE) each cited. `Math.max(3,1)`-style folds are
value-exact. Confirm.

### Default-flip audit — verdict: neutral, ACCEPT

Explicit defaults replacing `{}` is this commit's real risk;
every `game.sysopt` reader checked:

```text
mhitm SYSOPT_SEDUCE: null→true vs 1→true — same
zap seduce !== false — same
topten tt_oname_maxrank (|0)>=1 ? : 10 — 10 both
pline livelog | 0 / display accessibility | 0 — 0 both
cmd check_plname/explorers, files debugfiles,
  display msghandler — falsy both
topten pers_is_uid — separate sysopt() bag, untouched
```

No reader flips. No RNG in the file. Confirm.

### sysopt_release — verdict: exact-C, ACCEPT

C (`:114–158`, csym range): per-field free+null arms in
exact order incl. env_dbgfl reset, CRASHREPORT gc guard
(adapted to JS's missing `game.gc` struct — no-op when
absent, nulling when present), fmtd_wizard_list last with
its "panic feedback" comment preserved. Confirm.

### sysopt_seduce_set — verdict: exact-C, ACCEPT

C (`:163–183`, csym range): `:165–178` attack-substitution
block is `#if 0` (uncompiled), `:179–182` bare return → JS
no-op with `_val` (C `int val UNUSED`). Confirm.

### Callee closure + callers — verdict: ACCEPT

Required `sym.mjs` outputs:

```text
sys_early_init   js/sys.js:37   sync
sysopt_release   js/sys.js:96   sync
sysopt_seduce_set js/sys.js:133   sync
```

sys.js imports only gstate — a leaf, no cycle possible
(jsmain→sys edge ALREADY per `--can`, runtime call only).
Callers: sys_early_init ← allmain.c:43 → jsmain.js:102 (no
JS early_init exists; correct analogue, runs after
resetGame so no clobber); sysopt_release ← freedynamicdata
(by-design, named); seduce_set ← sys.c:101 wired +
cfgfiles.c:941 stub (named, own future row).

## Hallucinations / overclaim

None. "No live JS caller" for sysopt_release is stated, not
hidden. The DEBUGFILES absent-env reasoning is explicit.

## Density

Whole-file closure, 3 functions, one file, ~135 lines.
Right-sized.

## Verification

Re-measured (all three `--base 34c78a6ac~1 --reach-all`): 0
blocked each (labeled notes), REACH-OK ×3 (24/24, ~7.4s).
Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: all three ported, REACH-OK ×3.
Verify lines: hidden vacuous ×3 (honest) + smoke ×3.

Verdict: **ACCEPT**
