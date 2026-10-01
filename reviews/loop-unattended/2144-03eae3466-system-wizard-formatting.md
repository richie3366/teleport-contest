# Review 2144 — 03eae3466 — system wizard formatting

SHA `03eae3466`, D-3184; 2026-10-01; +45/-5 JS. No review closure.

## Intent vs deliverable

“Initialize SYSCF wizard lists and report unsupported portable paths”
adds WIZARDS handler, repairs portable-path diagnostic, splits formatter
into shared core and async/config wrappers, and replaces registration callback.

## Inventory — cnf_line_WIZARDS

New private handler; dupstr LIVE, formatter adapter CLONE with named diagnostic OMIT.

## C ↔ JS fidelity — cnf_line_WIZARDS

cfgfiles.c:794–809 replaces raw list first; nonempty/nonexact-wildcard
values replace formatted list. Empty/“*” preserve old formatting. GC
replaces free. Macro caller :1334 is wired; csym only finds prototype :59.

## Inventory — cnf_line_PORTABLE_DEVICE_PATHS

Changed handler; config_error_add LIVE, nhUse compile-time no-op.

## C ↔ JS fidelity — cnf_line_PORTABLE_DEVICE_PATHS

cfgfiles.c:1133–1150 Unix arm diagnoses unsupported directive then TRUE;
WIN32 atoi/store branch compiles out. :1361 registration wired.

## Inventory — build_english_list

Changed async export; wordcount/bel_copy1 LIVE same-file bodies,
impossible LIVE; english_list_parts shared extraction.

## C ↔ JS fidelity — build_english_list

end.c:1822–1859 preserves zero/one/two/many-word arms, separator order,
decrement loop, and zero-word diagnostic before return; no RNG.
cfgfiles.c:806 uses adapter; unixmain.c:659 remains explicitly OMIT.

## Inventory — english_list_parts

New shared core, no stub; wordcount/bel_copy1 LIVE.

## C ↔ JS fidelity — english_list_parts

end.c:1822–1859 formatting extraction matches all cases; zero-word
impossible is delegated to wrapper. Helpers match :1792–1820 whitespace walks.

## Inventory — build_english_list_config

New sync adapter CLONE, zero-word diagnostic OMIT with citation.

## C ↔ JS fidelity — build_english_list_config

end.c:1836 diagnostic omitted for CR/VT/FF inputs. Commit map names it;
this is explicit debt, not silent stub or claimed unreachable branch.

## Hallucinations / overclaim

No stubbed dispatch. Required re-pointed sym output:

```text
cnf_store_str NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
js/cfgfiles.js:578
=> Do NOT write clone #2. Check pinned C; if C has one
function, this is clone drift (map debt / Open row).
build_english_list js/end.js:2249 ASYNC — await required
build_english_list_config js/end.js:2261 sync
```

Historical Rule #2 clean; diff trace scan empty; no cycle-forced claim.

## Density

Ledger: cnf_line_WIZARDS partial — ACCEPT-WITH-DEBT;
cnf_line_PORTABLE_DEVICE_PATHS ported — ACCEPT;
build_english_list partial — ACCEPT-WITH-DEBT.
Core/config extraction — ACCEPT-WITH-DEBT. One callee closure, small-body
exception, individual Ledger/Verify entries present.

## Verification

Historical `verify cnf_line_WIZARDS,cnf_line_PORTABLE_DEVICE_PATHS,build_english_list
--base 03eae3466~1 --reach-all`: each 0 blocked (vacuous); each smoke
24 PASS/0 regressed, REACH-OK. D-log green/strict, relevant startup cohort
7/7, full 44/44; extracted-C comparison names its omitted diagnostic.

## Actionable C-wrongs

None beyond map-named omissions.

Verdict: **ACCEPT-WITH-DEBT**
