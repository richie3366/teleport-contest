# Review 2829 — 5a03cff3a — explosionmask hero resists read the uprops union

- SHA: `5a03cff3a` (D-3984)
- Files: `js/explode.js` (+33/−12), focused test
  `scripts/explosionmask-antimagic-uprops.test.mjs` (new, 49 lines)
- Method: cliff writer (1 C function + 6 local predicates); whole Method.
- Cites: C `explode.c:25–115` (csym range), `youprop.h:27–61`,
  `prop.h:15–31` — all read directly.

## Intent vs deliverable

Promise: both Wizards carry Antimagic as a worn-armor extrinsic in
`uprops[ANTIMAGIC]` (intrinsic 0, extrinsic 2, flats 0); JS's flat-only
`Antimagic()` read false → EXPL_NONE → damu applied where C shields
(Wizard-50556044 s450 HP:6 vs C HP:9; Wizard-620021 s763 72→66 vs C 72).
Fix: the six remaining hero predicates read
flats||uprops[SLOT].intrinsic||extrinsic. Diff adds exactly the six
union arms + slot consts on the existing const.js import. Promise and
diff agree.

## Inventory

- `explosionmask` — `js/explode.js:544/550` call sites vs C
  `explode.c:25–115`. Status: behavior repaired via predicates.
- `Fire/Cold/Shock/Antimagic/Disint/Acid_resistance` — `js/explode.js:160–208`
  (file-local) vs C `youprop.h:27–61` macros. Status: union arms added;
  `Poison_resistance` untouched (already unioned).

## C ↔ JS fidelity

C, verified line by line:

- `explode.c:43–46` AD_MAGM hero arm reads the `Antimagic` macro ✓;
  AD_FIRE/COLD/ELEC/DRST/ACID arms read their macros `:47–68` ✓;
  AD_DISN WAND_CLASS arm (nonliving/demon, no macro) untouched ✓.
- `youprop.h:27–61`: every macro is
  `u.uprops[SLOT].intrinsic || u.uprops[SLOT].extrinsic` — Fire `:29`,
  Cold `:33`, Disint `:41`, Shock `:45`, Poison `:49`, Antimagic `:57`,
  Acid `:61` ✓. Single storage: a worn extrinsic shields in C.
- Slot numbers `prop.h:15–31` (FIRE 1, COLD 2, DISINT 4, SHOCK 5,
  POISON 6, ACID 7, ANTIMAGIC 12) match `js/const.js:2591–2602`
  exactly ✓.

JS: each predicate is now `flat || H-flat || E-flat || intrinsic ||
extrinsic` — the D-3978/D-3982 union idiom, already ACCEPTed (reviews
2823/2827). The union is a superset read justified only by JS split
storage; the flats are mirrors of the same C field, and no path in
this diff writes them, so no new over-report surface is added. Branch
order untouched; `explosionmask` draws no RNG (switch on resists only).
Monster arms (`resists_*`) untouched ✓. No symbol deleted or
re-pointed → `sym.mjs` N/A. Diff grep clean (the one FORCE/DIAG hit is
the commit message's own "no DIAG/FORCE/seed" sentence).

## Hallucinations / overclaim

None. The `verify explosionmask` vacuous note is labeled a note, not a
PASS; the 9 no-movement sessions are itemized by writer, not waved.

## Density

Cliff head of its parent (`do_statusline2` x11, Must-fix empty) ✓.
Writer hunt per the parked tag ✓ — the harness-protocol pair is
explicitly not a port row (D-3684 class). `Ledger:` entry touched
(`explode.c.jsonl`), focused test with authentic pre-fix FAIL → PASS.

## Verification

Ship-time: `verify do_statusline2: 1 PASS (50556044 full 750), 1 moved
past (620021 763→revive@764), 9 unchanged, 0 worse`; smoke REACH-OK ×2;
green/strict/cohort 7/7.
Re-measure (`verify do_statusline2 --base 5a03cff3a~1 --no-reach` on
HEAD): `1 PASS, 3 moved past (2 still do_statusline2 at a later step),
9 unchanged, 0 worse → PROGRESS` — the two named sessions match
exactly (PASS + 763→revive@764); the 2 extra later-step moves are later
window SHAs, 0 worse. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
