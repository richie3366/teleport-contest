# Review 2142 — 5e7475cd1 — fatal startup exits

SHA `5e7475cd1`, D-3182; 2026-10-01; +10/-6 JS. Closes review 2132.

## Intent vs deliverable

“Stop initoptions after every fatal startup exit” adds three returns in
initoptions and propagates termination through scores_only.

## Inventory — initoptions

Changed sync wrapper. initoptions_init, assure_syscf_file,
config_error_init/done, read_config_file, nh_terminate,
do_deferred_showpaths, initoptions_finish LIVE, with inherited map-named
platform/display omissions. No clones or new imports.

## C ↔ JS fidelity — initoptions

options.c:7078–7115: initializer guard → fatal assurance → error setup →
second parse → short-circuit drain/termination → final drain → deferred
showpaths → finish. Returns now preserve all noreturn boundaries. Caller
csym lists earlyarg.c:419 and unixmain.c:150; the flattened Unix adapter’s
absent second pass/showpaths remains explicitly mapped in this commit.

## Inventory — scores_only

Changed async caller; config_error_done, initoptions, prscore,
nh_terminate LIVE; chdirx/panictrace_setsignals/whoami OMIT.

## C ↔ JS fidelity — scores_only

earlyarg.c:404–441 preserves drain → suppression → initoptions → flag
reset → prscore → success exit. New guard prevents reset/prscore after
fatal assurance. :309 argument-adjustment caller remains wired. Neither
body adds RNG.

## Hallucinations / overclaim

Review 2132’s concrete continuation defect closes. “No named omits remain
in this body” excludes inherited adapter/callee omissions; D-log calls
initoptions partial. No stubbed dispatch. No deleted/re-pointed symbols;
sym resolves initoptions to js/options.js:8900 sync. Historical Rule #2
clean; diff scan finds no FORCE/DIAG/trace gate; no cycle-forced claim.

## Density

Ledger: initoptions partial — ACCEPT-WITH-DEBT. Ledger: scores_only
existing partial, caller repair — ACCEPT-WITH-DEBT. One Must-fix closure.
D-log verifies initoptions, not scores_only separately; this audit covers both.

## Verification

Historical `verify initoptions,scores_only --base 5e7475cd1~1 --reach-all`:
initoptions: 0 blocked, vacuous; smoke 24 PASS/0 regressed, REACH-OK.
scores_only: 0 blocked, vacuous; smoke 24 PASS/0 regressed, REACH-OK.
Startup assertions 13/13 pass. D-log green/strict, relevant shared-startup
cohort 7/7 and full 44/44 pass.

## Actionable C-wrongs

None found; named inherited omissions remain debt.

Verdict: **ACCEPT-WITH-DEBT**
