# Review 2038 — 260932ce5 — eat.c cluster (D-3078)

Metadata: SHA `260932ce5`, D-3078, js/eat.js + js/invent.js
(~126 ins). 6 functions: 2 new, 4 restarts; 2 `#if 0`
by-designed.

## Intent vs deliverable

Promise: port temp_resist + food_substitution (MISSING),
restart recalc_wt/do_reset_eat/foodword/start_eating
whole, fold the enl_temp_resist clone into the export.
Diff delivers all six + the clone deletion + 4 call-site
re-points. Kept.

## Inventory (per function)

- `temp_resist` (NEW eat.js:964 export): timeout + 4
  conjuncts. Zero C callees. Clone `enl_temp_resist`
  DELETED from invent.js, 4 sites re-pointed to the
  import (same-edge; --can says ALREADY, no new edge).
- `food_substitution` (NEW eat.js:899 export): two
  independent reseat ifs. Zero C callees. No callers.
- `recalc_wt` (RESTART eat.js:924): impossible arm +
  owt recompute. Callee weight LIVE.
- `do_reset_eat` (RESTART eat.js:938): touchfood reseat
  + flags + stop/newuhs. All callees LIVE.
- `foodword` (RESTART eat.js:339): FOOD arm + glass
  makeknown + material word; non-C coins arm dropped.
  Callee makeknown LIVE (pre-existing edge).
- `start_eating` (RESTART eat.js:2419): nomovemsg dance
  added. All callees LIVE.

## C ↔ JS fidelity (per function)

temp_resist (C :450–469): timeout + 4 conjuncts
verbatim ✓. Callers insight.c:1544/1555 → 4 invent
sites (2 paths × acid/stone) ✓; eat.c:502 is #if 0
dead ✓ unwired by design. Confirm.

food_substitution (C :406–419): two INDEPENDENT ifs
(not else-if) ✓, === identity ✓, o_id|0 ✓. No C
callers (extern decl only — trusted, body has no
self-evidence against it) → none wired ✓. Confirm.

recalc_wt (C :291–305): impossible+return ✓,
debugpline out (compiled-out) ✓, owt=weight ✓.
Callers: do_reset_eat wired this commit ✓, bite
pre-existing ✓. Confirm.

do_reset_eat (C :421–447): o_id=0 → touchfood →
reseat → o_id+recalc_wt in order ✓; flags cleared
regardless of piece ✓; canchoke untouched per C
comment ✓; stop_occupation + newuhs(FALSE) ✓.
Callers: bite wired ✓; eatfood/doeat ×3 named as
caller-body gaps with C sites (eatfood D-2720-fenced)
— named, out of cluster. Confirm.

foodword (C :2497–2506): FOOD→"food" ✓; GEM+GLASS
(19, objclass.h:32 ✓)+dknown → makeknown with
fall-through (no return) ✓; foodwords[material] ✓;
coins: GOLD=15 → foodwords[15]='gold' ✓ identical to
the dropped arm. Callers choke/doeat wired ✓;
rottenfood hardcode named ✓. Confirm.

start_eating (C :2021–2074): flags ✓, cprefx +
death/revive return ✓, old_nomovemsg before bite ✓,
save/NULL/done/restore in C order (NULL≡null) ✓,
second-arm done_eating(reqtime>1||partly) ✓,
set_occupation 2-arg ≡ xtime 0 (default
engrave.js:1218 ✓). Callers: doeat single site ✓,
2nd arm named ✓. Confirm.

sym.mjs (required): `enl_temp_resist` NOT FOUND ✓.
#if 0 pair verified: maybe_extend (#495) +
leather_cover (#2602) both inside `#if 0` ✓.

## Hallucinations / overclaim

Trivial: "New invent→eat edge" — --can reports
ALREADY (invent statically imports eat); the edge is
not new, which makes the safety claim stronger, not
weaker. No action.

## Density

6 whole functions, one C file — §2b-shaped ✓.
`Ledger:` 6 ported + 2 by-design ✓. Per-function
verdicts: all six ACCEPT.

## Verification

Re-measured `hidden-proxy verify <all six> --base
260932ce5~1 --reach-all`: 0 blocked each (honestly
vacuous) + six smokes 24/24 → REACH-OK, 0 regressed
✓. Ban-grep clean. Rulecheck clean (2033).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
