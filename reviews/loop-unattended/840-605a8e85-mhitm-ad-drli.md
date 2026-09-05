# Review 840 — 605a8e85 — uhitm.c mhitm_ad_drli mhitu arm (D-1870)

Metadata: SHA `605a8e85`, D-1870, `js/mhitu.js` (+22/−2, `mhitm_ad_drli_u`
+ AD_DRLI case + import name + const), map + queue/archive stamps.

## Intent vs deliverable

Subject promises the mhitu arm of `mhitm_ad_drli` for the
`mhitm_mgc_atk_negated` corpus owner (wraith AD_DRLI touch: C drew the
negation `rn2(10)`, JS drew knockback's burn). Diff delivers the arm wired
as `case AD_DRLI`. Matches.

## Inventory

New: `mhitm_ad_drli_u` (file-local async — `sym.mjs` reports "NOT
EXPORTED … 1 LOCAL" i.e. the single definition site, correct for a
dispatch-local arm), `AD_DRLI = 15` file const (matches `monattk.h:57`).
`Drain_resistance` added to the pre-existing zap.js import (LIVE export,
sync — re-point, no clone). No deleted symbols.

## C ↔ JS fidelity

C locus `uhitm.c:2444–2518` (via csym), mhitu arm (`:2479–2488`):
`hitmsg(magr, mattk); if (!rn2(3) && !Drain_resistance &&
!mhitm_mgc_atk_negated(magr, mdef, TRUE)) losexp("life drainage")`, damage
untouched. JS is the same four statements in the same order with the same
short-circuit (`!rn2(3) && !Drain_resistance() && !(await …)`), one RNG
draw, all async callees awaited (`hitmsg`, `mhitm_mgc_atk_negated`,
`losexp`). `void mhm` documents the untouched damage (C mhitu arm never
writes `mhm->damage`; the leftover hitmu `d()` stays — correct, unlike the
default-zero arm).

`null`-mdef convention checked, not waved through: C passes `mdef`
(`&youmonst`); JS passes `null`, but `mhitm_mgc_atk_negated`
(`js/mhitm.js:1809`) explicitly maps `mdef == null → magic_negation_you()`
vs `magic_negation_mon(mdef)`, and five pre-existing mhitu call sites use
the same convention (`mhitu.js:786/812/864/1917/2089`). So `null` reaches
the hero path — functionally C-faithful within the file's established
convention (unlike review 834's `dmgval(null)`, where `null` silently took
the wrong branch). `magr.mcan` guard: C `magr != &youmonst && mcan`; in
mhitu context magr is always a monster, and JS `magr != null && magr.mcan`
agrees on all reachable inputs.

Callee closure for the arm: `hitmsg`/`mhitm_mgc_atk_negated`/`losexp`/
`Drain_resistance` all LIVE. (Note: `Drain_resistance` also has a
C-matching file-local clone in `sit.js:578` — pre-existing, not touched,
not divergent on inspection.) Uhitm + mhitm arms (Stormbringer `d(2,6)`,
mhpmax/level-drain body, Death redirect) and the `mhitm_ad_dren` arm are
named omits with C citations, not stubs in a live arm. No STUB shipped.

## Hallucinations / overclaim

None. "In C order" holds for all four statements; the continuation
screen-block on `hitmsg` (`--More--` paging only, content incl.
hallucination name matches) is disclosed, not hidden.

## Density

One dispatch arm, ~22 JS lines, one already-touched module. C is that
small — acceptable.

## Verification

Re-ran `hidden-proxy.mjs verify mhitm_mgc_atk_negated --base 605a8e85~1`
myself: `1 blocked → moved → hitmsg at step 43 (same step, re-attributed),
RNG 11951/11951 fully matched → PROGRESS`. This is genuine movement past
the owner (the RNG divergence is fixed; the remainder is a `--More--`
paging screen issue under a different owner), and the D-log says exactly
that — not a vacuous check. Green + strict ×2 + cohort per D-log; full
suite skipped (single-module change — reasonable). Rule #2 clean. No
FORCE/DIAG/seed/coordinate hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
