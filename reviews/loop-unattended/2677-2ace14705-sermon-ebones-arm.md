# Review 2677 — 2ace14705 — serMon keeps the ebones blob

Metadata: SHA `2ace14705`, D-3813, cliff row-2 `bones.c`
slime_dialogue writer (@d6bf72e60). JS: `js/lev_json.js` (+8/−1, one
arm in serMon's replacer). Test: `scripts/sermon-ebones.test.mjs`
(5 its).

## Intent vs deliverable

Promise: serMon's replacer dropped the ebones bag on its
Role_switch `mnum`, so the bones roundtrip lost has_ebones and
done_in_by printed "called wizard" for "of wizard"; one arm keeps
the bag. Claimed: 95416 → PASS. Diff actually does: `if (key ===
'ebones') return val;` + C cites, no imports, no signature change.
Match.

## Inventory

- `serMon` (js/lev_json.js:166) — changed: replacer gains the
  ebones early-return before the live-monst filter. C
  `save.c:871–875` (csym range `save.c:825–881`) + `restore.c:362–366`
  (verified below).
- No new helpers, no deletes, no re-points. Restmon
  (js/restore.js:228–232) pre-existing ebones rebuild, untouched.

## C ↔ JS fidelity

C `save.c:871–875` (verified by direct read): `buflen =
EBONES(mtmp) ? sizeof(struct ebones) : 0`, length word then
`Sfo_ebones` blob. C `restore.c:362–366` (verified): length word,
`buflen > 0 → newebones + Sfi_ebones`. JS restmon already does the
restore half (saved.ebones → newebones + assign); only the ser half
dropped the bag — the filter `val.mnum != null || val.mx != null →
undefined` fires on the bag because `struct ebones` carries a
`short mnum` (verified `mextra.h:189–200`). The early return is
placed before the filter, so the bag survives. Leak check: struct
ebones children are all scalars (parentmid/role/race/deathlevel/
luck/mnum/bitfields; oldalign is {type,record}) — no nested live
struct can ride through the unfiltered return; replacer recursion
into other mextra keys unchanged. Calee shape: data blob, never a
live struct — the fix matches C's write/read pair exactly. C
savemon callers (save.c:742 OMONST statue/mimic, :895 mon chain)
both flow through JS serMon — no unwired caller. No RNG; none
added. Gap: none. Arm-by-arm confirm.

## Hallucinations / overclaim

None. Chain is C-recorded end to end (seg-0 slime death → arise
ebones stamp bones.c:468+513–515 → seg-1 bones load → done_in_by
:275–282 "of" iff has_ebones), C deathDesc wrap-verified against
the outrip algorithm at STONE_LINE_LEN 16. "Restmon already does"
verified at restore.js:228–232.

## Density

Cliff-phase: writer correct (save/restore roundtrip, not the
dialogue owner). Ledger: savemon arm. Verify bullet: 1 PASS +
REACH-OK + green + strict + cohort + full 44/44. Named: remaining
savemon split items stand named. Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify slime_dialogue --base 2ace14705~1
--reach-all` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (95416 PASS) and `smoke 24/24 → REACH-OK` — exactly the
D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
