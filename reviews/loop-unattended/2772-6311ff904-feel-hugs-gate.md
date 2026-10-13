# Review 2772 — 6311ff904 — feel inline gains the ustuck-hugs term

- SHA: `6311ff904` (D-3919)
- Scope: `js/display.js` +13/−3 (3 imports + gate term), 1 test,
  ledger `display.c.jsonl`
- Method: cliff commit (1 gate term); full Method + re-measure

## Intent vs deliverable

Promise: cliffs-head `detect.c` mfind0 (Valk-587104 s370, C «I I» vs
JS «I·I» at row 11) is owned by mfind0-whole code; the writer is the
`feel_can_reach_floor` inline, which omitted C's ustuck-hugs FALSE
term — so a hug-held hero (ustuck by an AT_HUGS holder, own form
non-sticky, no Levitation) read floor as reachable and painted live
'~' where C paints stone-blank. Claimed: probe moves 370 →
u_maybe_impaired@464.

Diff actually adds: 3 imports (`sticks` from monmove.js,
`attacktype` from mondata.js, `AT_HUGS` from mhitm.js) + the
`u.ustuck && !sticks(...) && attacktype(...)` early-false term in C
order (uswallow → ustuck-hugs → Levitation) + doc rewording. No new
function.

## Inventory

- `feel_can_reach_floor` (js/display.js:5749): mirrors C
  `can_reach_floor` engrave.c:186–214 (`csym` range; D-log cites
  :187–213), term at :192–197. Changed: 1 term.
- No helpers added/deleted/re-pointed; 3 names newly imported (all
  three are new display→X module edges — verified absent at the
  parent; see below).

## C ↔ JS fidelity

C :190–198 returns FALSE on `uswallow || (ustuck &&
!sticks(youmonst.data) && attacktype(ustuck→data, AT_HUGS)) ||
(Levitation && !air/water)`. The inline now carries exactly this
prefix in C order. Symbol checks: `sticks` resolves to the canonical
export js/engrave.js:571 (body = C mondata.c:653–659 verbatim in
shape: STCK || (WRAP && !ENGL) || HUGS ✓), reached via the genuine
monmove.js:2009 re-export (`import` at :17 + `export { sticks }` —
not a third clone; the two mhitu/uhitm twins correctly untouched);
`attacktype` is the canonical js/mondata.js:84 export ✓; `AT_HUGS`
is exported from mhitm.js via the :825–833 export block (`sym.mjs`
"NOT FOUND" is an index gap for that style — I confirmed the export
plus a clean `display.js` load). `game.youmonst?.data` matches the
monmove.js:2017 house shape for `gy.youmonst.data` ✓. No RNG, no
prints — pure gate. The remaining omits (:201 usteed, :203
ceiling-hider pre-existing; :206 Flying/msize TRUE-arm subsumed by the
fallthrough for the FALSE arg — I re-derived this: with check_pit
FALSE the C result is exactly NOT(any FALSE arm), which is what the
inline computes) are honest and pre-existing.

Cycle/TDZ (step 4): the names are read only inside the function body
(:5755–5756), never at top level — no TDZ read possible; `attacktype`
is hoisted besides. (My `--can` runs returned ALREADY because the
working tree already contains the lines; the D-log's pre-commit
SAFE/CHECK evaluation is the honest one and it is correct.)

## Hallucinations / overclaim

None. "Mirrors the canonical's exact expression" verified
character-for-character in shape against engrave.js:587–590.

## Density

Cliff-phase: mfind0 was the head at the parent (aebed1065 block: 1
block, RNG lost 25073, s370 — verified in the parent tree). Owner
stands (whole D-3656, read once), writer ported with the state
measured (recorded C screens + RNG log + prefix probes; RNG
37375/37375 matched). One cliff, one file, code + ledger + test +
verify in one handoff. `Ledger: feel_location ported` present. Not a
no-op, not unreached (probe +94 steps to a later owner).

## Verification

Re-measured myself (`verify feel_location,mfind0 --base 6311ff904~1
--reach-all`):

- `verify mfind0: 0 PASS, 1 moved past, 0 unchanged, 0 worse →
  PROGRESS` (587104: 370 → u_maybe_impaired@464)
- `smoke` both fns: 24/24 → REACH-OK (feel_location blocks no
  session — disclosed writer-only); zero `worse`/REGRESSED. Matches
  the D-log Verify bullet exactly.

Grep of added lines: clean. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`). No seed/step/coordinate reads. Focused
test failed pre-fix on the exact row-11 divergence, 1/1 post-fix per
the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
