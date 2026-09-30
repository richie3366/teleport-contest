# Review 2139 — d37e25ba4 — optional breadcrumb wrappers

SHA `d37e25ba4`, D-3179; 2026-09-30; +41 JS. No prior closure.

## Intent vs deliverable

“Ball-and-chain breadcrumb unplace and covet placement wrappers” adds two
async exports; no live production caller or import changes. Subject/body
acknowledge disabled BREADCRUMBS, yet ledger awards coverage credit.

## Inventory — Lift_covet_and_placebc

New optional export; check_restriction verified local C callee;
placebc_core and impossible LIVE. No new clone or stub.

## C ↔ JS fidelity — Lift_covet_and_placebc

ball.c:326–346 restriction first, release-build diagnostic excluded,
chain-present/not-OBJ_FREE collision diagnostic then return, placement core
last match. Wrapper leaves breadcrumb fields unchanged.
check_restriction :179–189 preserves unrestricted/override/equal-pin arms.
placebc_core :119–144 retains chain→ball floor effects, placement,
glyph/newsym and restriction clearing; no wrapper RNG.
Only caller query result is extern.h:240 disabled macro.

## Inventory — Unplacebc

New optional export; unplacebc_core LIVE; paniclog explicitly OMIT.

## C ↔ JS fidelity — Unplacebc

ball.c:286–303 restricted logging does not return; placement in_effect
false→unplacement true→caller/line→core order matches even when restricted.
Diagnostic :290–297 omission is map-named with C citation.
unplacebc_core :146–177 retains swallowed/water extraction, ball then
chain glyph/unhide/newsym and felt reset. No wrapper RNG.
Only caller query result is extern.h:236 disabled macro.

## Hallucinations / overclaim

Whole optional wrapper behavior is represented, but this is **no scored C
coverage gain**: ball.c:191 opens !BREADCRUMBS; :256 starts its #else;
config.h:644 leaves BREADCRUMBS undefined. Both entire functions, not
merely their macro callers, are compiled out. D-log's “released-build body”
description needs that distinction. Ledger corrected now to by-design
for both; no JS edit required.

Diff scan empty; full Rule #2 clean. No removed/repointed symbol requiring
sym output. No new import/cycle claim. Logging omission is explicit and
outside the scored build.

## Density

- Ledger: Lift_covet_and_placebc shipped ported → audit by-design;
  function verdict ACCEPT-WITH-DEBT.
- Ledger: Unplacebc shipped partial → audit by-design;
  function verdict ACCEPT-WITH-DEBT.

Two complete optional bodies; 41-line density exception cites all remaining
ball.c bodies live or already by-design. The queue should have retired
these uncompiled heads and selected active coverage in the same iteration;
ledger correction prevents continued false coverage credit.
Individual Ledger/Verify lines present.

## Verification

Historical `verify Lift_covet_and_placebc,Unplacebc --base d37e25ba4~1
--reach-all`:

```text
verify Lift_covet_and_placebc: 0 blocked (vacuous)
smoke Lift_covet_and_placebc: 24 PASS, 0 regressed → REACH-OK
verify Unplacebc: 0 blocked (vacuous)
smoke Unplacebc: 24 PASS, 0 regressed → REACH-OK
```

D-log green/strict, cohort 7/7, full 44/44. Isolated oracle claims
wrapper-only checks; neither smoke nor those checks proves active coverage.

## Actionable C-wrongs

None in scored code; compiled-out ledger classifications corrected in
this audit. Optional restricted logging remains map-named.

Verdict: **ACCEPT-WITH-DEBT**
