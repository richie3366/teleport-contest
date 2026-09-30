# Review 2129 — 0f8744c49 — option error stubs

SHA `0f8744c49`, D-3169; 2026-09-30; +204 JS. No prior-review closure.

**Addressed:** D-3173

## Intent vs deliverable

Subject promises “optfn 6-pack”. Diff adds five exports/allopt rows, changes
versinfo error calls and doset crash getters. set_playmode changes only
comments after a reverted experiment.

## Inventory — optfn_scroll_amount

New export; string/int/buffer CLONEs; bad_negation STUB.

## C ↔ JS fidelity — optfn_scroll_amount

options.c:3762–3791 bare-negation 1, value atoi, invalid-negation ERR,
default gets match; diagnostic absent.

## Inventory — optfn_scroll_margin

New export, same closure.

## C ↔ JS fidelity — optfn_scroll_margin

options.c:3793–3821 same sequence with bare-negation 5; diagnostic absent.

## Inventory — optfn_windowtype

New export; env/nmcpy CLONEs; choose_windows OMIT.

## C ↔ JS fidelity — optfn_windowtype

options.c:4942–4987 window-inited/locked gates, env parse, bounded comma
copy and tty gets match. Named single-windowport omission is explicit.

## Inventory — optfn_crash_email

New export; dupstr LIVE, string parser CLONE containing config_error_add
STUB.

## C ↔ JS fidelity — optfn_crash_email

options.c:1257–1282 CRASHREPORT live: reject missing, replace, null-output
guard, untouched unset output match; missing-value diagnostic lost.

## Inventory — optfn_crash_name

New export; same closure.

## C ↔ JS fidelity — optfn_crash_name

options.c:1284–1308 identical name sequence; same diagnostic loss.

## Inventory — optfn_versinfo

Changed export; config_error_add and bad_negation STUBs; handler remains
async split.

## C ↔ JS fidelity — optfn_versinfo

options.c:4471–4534 negation/empty/invalid-mask SILENTERR, valid store,
gets, redraw order retained. Added calls perform no reporting. doset getter
lambdas match the nonempty-success guard at :9038–9043; csym doset range
:8757–8975/callers read, existing dispatch retained. No RNG change.

## Hallucinations / overclaim

“Live shared stub” and “live config_error_add calls” cannot establish callee
closure. options.c:6692–6697 and cfgfiles.c:1864–1890 require
formatting/enqueueing. Named stubs remain STUBs. Six callers queries show
zero direct references; allopt generic dispatch wired. sym resolves
adapters; nothing deleted/repointed. Anti-pattern scan has seed only in
explanatory comments; Rule #2 clean.

## Density

Ledger/verdict individually: scroll_amount ported/QUALITY-RISK;
scroll_margin ported/QUALITY-RISK; windowtype ported/ACCEPT-WITH-DEBT;
crash_email ported/QUALITY-RISK; crash_name ported/QUALITY-RISK; versinfo
ported/QUALITY-RISK. Six-body same-file cluster; Verify grouped,
green/strict/cohort/full recorded. Error callee completion is required
before claiming whole.

## Verification

Historical SHA, six functions together, `--base 0f8744c49~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| optfn_scroll_amount | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_scroll_margin | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_windowtype | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_crash_email | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_crash_name | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_versinfo | 0 blocked | 24 PASS, 0 regressed, REACH-OK |

## Actionable C-wrongs

1. Close the shared config-error sink through these six handlers and review
   2127's seven affected handlers. Consolidated Must-fix row cites both
   reviews.

Verdict: **QUALITY-RISK**
