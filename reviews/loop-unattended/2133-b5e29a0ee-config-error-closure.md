# Review 2133 — b5e29a0ee — configuration diagnostic closure

SHA `b5e29a0ee`, D-3173; 2026-09-30; +95 JS; closes 2127/2129/2131 sink.

## Intent vs deliverable

“Real cfgfiles diagnostic sink” adds wrapper/printf adapter, restarts
formatter, re-exports botl binding, removes fruit/petattr duplicate reports.

## Inventory — config_error_add

New export; vconfig_error_add verified local C callee.

## C ↔ JS fidelity — config_error_add

cfgfiles.c:1864–1872 forwards varargs once. All 177 references queried;
options/botl/cmd bindings resolve here, absent callers individually map-named.

## Inventory — vconfig_error_add

Changed private C body; config_error_format CLONE, config_erradd LIVE.

## C ↔ JS fidelity — vconfig_error_add

cfgfiles.c:1874–1890: format→BUFSZ-1 chop→enqueue matches. DEBUG panic
compiled out. Seven libc vectors confirm supported caller formats;
config_erradd:1543–1589 windowed display/wait omission explicitly named.

## Inventory — bad_negation

Existing private callee repointed through import.

## C ↔ JS fidelity — bad_negation

options.c:6692–6697 conditional phrase→single sink call matches; 26
executable callers, perminv_mode :3068 remains named unwired.

## Inventory — optfn_fruit

Changed export; string/fruit callees LIVE; message continuation OMIT.

## C ↔ JS fidelity — optfn_fruit

options.c:1705–1774 init/set/get, negation, count-limit, goodfruit order
retained; missing value now reports once through string_for_opt.

## Inventory — optfn_petattr

Changed export; attribute callees LIVE; existing async handler split.

## C ↔ JS fidelity — optfn_petattr

options.c:3137–3194 missing/negated/value validation, store/redraw/get
sequence retained, one report. Both handlers wired through allopt/menu.
No RNG change.

## Hallucinations / overclaim

Corrects earlier false live-sink claims. Required historical sym output:

```text
config_error_add js/cfgfiles.js:425 sync
vconfig_error_add NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cfgfiles.js:430
vpline_expand js/display.js:8040 sync
```

Rule #2 clean; botl→cfgfiles ALREADY, no top-level TDZ use. Diff scan clean.

## Density

Five-function Must-fix closure. Ledger/verdict: config_error_add partial /
ACCEPT-WITH-DEBT; vconfig_error_add ported / ACCEPT; bad_negation partial /
ACCEPT-WITH-DEBT; fruit partial / ACCEPT-WITH-DEBT; petattr split / ACCEPT.
Individual Verify lines present; no stub sold as closure.

## Verification

Historical `verify config_error_add,vconfig_error_add,bad_negation,optfn_fruit,optfn_petattr
--base b5e29a0ee~1 --reach-all`:

| Function | verify | smoke |
|---|---|---|
| config_error_add | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| vconfig_error_add | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| bad_negation | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_fruit | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| optfn_petattr | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

Focused tests 24/24; D-log green/strict, cohort 7/7, full 44/44.

## Actionable C-wrongs

None newly found; inherited omissions remain map-named.

Verdict: **ACCEPT-WITH-DEBT**
