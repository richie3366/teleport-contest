# Review 2036 — 11ac109be — trap.c saddle + pits pair (D-3076)

Metadata: SHA `11ac109be`, D-3076, js/trap.js (+71/−8).
2 functions ported + 7 same-file stale retired.

## Intent vs deliverable

Promise: port keep_saddle_with_steedcorpse (MISSING) +
join_adjacent_pits (MISSING), wire the landmine caller at
the correct post-blast site, retire 7 stale rows. Diff
adds both locals, hoists steed_mid/saddle to branch
scope, deletes the dead `void` locals + stale comment.
Kept.

## Inventory (per function)

- `keep_saddle_with_steedcorpse` (NEW trap.js:5794,
  sync local — C staticfn): guard, fobj walk, corpse
  match, saddle move, cobj recurse. Callees all LIVE
  pre-imports (has_omonst, OMONST, get_obj_location,
  obj_extract_self, place_object, stackobj) — no new
  edge. No clones, no deleted symbols.
- `join_adjacent_pits` (NEW trap.js:1315, sync local):
  null guard, N_DIRS loop, set/clear + recurse. All
  callees live in-module. No callers (as in C).

## C ↔ JS fidelity (per function)

keep_saddle (C :938–967): !saddle→FALSE ✓; while-walk
✓; CORPSE+has_omonst ✓; m_id match (|0 both sides)
✓; get_obj_location(chain, 0) — JS (obj, locflags=0)
returns {x,y}|null (timeout.js:1651) ≡ &x,&y+bool ✓;
extract/place/stack ✓; TRUE even when !loc ✓ (C
:958 outside the if); Has_contents ≡ cobj!=0
(obj.h:334–336) so `chain.cobj &&` ✓; nobj advance +
FALSE tail ✓. Caller C :2591–2592: guard
`steed_mid && saddle && !u.usteed` exact ✓, fobj arg
✓, placement post-blow_up_landmine + pre-newsym
(js:5888–5891) in C order ✓; stash sites :2575–2576
/:2580 match C ✓. No RNG. Confirm.

join_adjacent_pits (C :6621–6641): null guard ✓,
loop ✓, x/y ✓, isok gate with no out-of-range bit
touch ✓, pit → set-bit + recurse ✓ else clear ✓.
(conjoined|0) guards undefined ✓. C refs: decl :71 +
self :6636 only (csym) → none wired, correct ✓.
Confirm.

Stale ×7: ledger notes carry js:line + caller/count
evidence; spot-checked clear_conjoined_pits (local
:1292 ✓) and dountrap (export :7960 ✓). Confirm
(structural; bodies pop-time brief-verified).

## Hallucinations / overclaim

None. "No new cross-module edge" true (imports
pre-existed); reset_utrap explicitly left Open with
a reason, not silently skipped.

## Density

2 whole functions, one C file — small but §2b-shaped
(head + same-file closure; 7 stales retired in the
same breath). `Ledger:` 2 ported + 7 stale-ported ✓.
Per-function verdicts: keep_saddle ACCEPT /
join_adjacent_pits ACCEPT.

## Verification

Re-measured `hidden-proxy verify <both> --base
11ac109be~1 --reach-all`: 0 blocked each (honestly
vacuous — coverage rows) + smokes 24/24 → REACH-OK,
0 regressed ✓. Ban-grep: sole hit is C `FORCEBUNGLE`
in pre-existing context, not a hack ✓. Rulecheck
clean (2033).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
