# Review 2132 — d10e96661 — startup and fatal exits

SHA `d10e96661`, D-3172; 2026-09-30; +105/-124 JS. Claims review 2131 startup closure.

## Intent vs deliverable

“Startup keeps system options through user rc” replaces startup defaults,
changes three C exports and two JS adapters; removes module-static guard.

## Inventory — initoptions_init

Changed export; config/read/reset callees LIVE; platform/symbol callees
OMIT with map citations. No new clones.

## C ↔ JS fidelity — initoptions_init

options.c:7118–7305: defaults precede sysconf; petattr is C attribute 7;
error drain precedes nontermination check; fatal return prevents second
drain. Sole executable caller :7088 retained; startup flattens unixmain.c:150.

## Inventory — initoptions

Changed wrapper; initializer/finish LIVE.

## C ↔ JS fidelity — initoptions

options.c:7078–7115: first fatal exit propagates, but :7100 still falls
through to :7102/:7114. Historical probe with builtin phase and invalid
sysconf yields exit_status=1 **and** opt_initial=false/fruit initialized:
finish executed after C's noreturn. earlyarg.c:419 caller also matters.

## Inventory — allopt_array_init

Changed guard; determine_ambiguities/heed LIVE.

## C ↔ JS fidelity — allopt_array_init

options.c:7404–7433 retains defaults→heed→all do_init→guard order;
fresh-game guard replaces process static. cfgfiles.c:1962 caller retained.

## Inventory — JS adapters

start, parseNethackrc, runSegment changed.

## C ↔ JS fidelity — JS adapters

cfgfiles.c:1892–1957/options.c:7323–7384 justify rc overlay and finish
phase; sysconf name/flags survive. runSegment stops before moveloop after
startup exit. RNG seed initialization moved, no conditional trace gate.

## Hallucinations / overclaim

Full noreturn propagation is incomplete. Required sym output (historical):

```text
initoptions_init js/options.js:8649 sync
config_error_init js/cfgfiles.js:236 sync
config_error_done js/cfgfiles.js:347 sync
read_config_file js/cfgfiles.js:1209 sync
allopt_array_init js/options.js:11898 sync
optionsArrayInited NOT FOUND in js/** (no export, no local function/const).
```

Rule #2 clean; jsmain→options ALREADY. Seed/getRngLog are existing API wiring.

## Density

Ledger: initoptions_init partial — ACCEPT-WITH-DEBT; initoptions existing
ported — QUALITY-RISK; allopt_array_init existing ported — ACCEPT.
Must-fix closure, not unrelated cluster. D-log only verifies initializer.

## Verification

Historical code, `verify initoptions_init,initoptions,allopt_array_init
--base d10e96661~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| initoptions_init | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| initoptions | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| allopt_array_init | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

Five startup tests pass; D-log green/strict, cohort 7/7, full 44/44.

## Actionable C-wrongs

1. Stop initoptions after every noreturn callee, including second sysconf
failure and deferred showpaths; verify finish is never entered afterward.

Verdict: **QUALITY-RISK**
