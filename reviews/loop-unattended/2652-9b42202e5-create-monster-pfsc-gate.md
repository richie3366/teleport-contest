# Review 2652 — 9b42202e5 — create_monster PfSC gate mirrors (D-3788)

Metadata. SHA `9b42202e5` (2026-10-10), D-3788, parent
`9b9521669` (HEAD). js diff: `js/mklev.js`
+36/−7 — the `sp_lev.c:2002–2006` Protection
gate added to 5 des appear_as mirrors +
splev fixup prot read flats→uprops; focused
test. Works cliffs row-2 restrap (95314).

## Intent vs deliverable

Promise: 95314@646 — JS movement ended one
monster early because a des mimic wore its
appear_as disguise while the hero held
ring-conferred Protection_from_shape_changers:
the 5 des mirrors lacked C's `:2006`
`!Protection_from_shape_changers` gate and the
general fixup read never-written flats.

Diff delivers the gate at all 5 mirrors (uprops
H||E) + the fixup read correction. Promise and
diff match.

## Inventory

Changed JS (1 writer block × 6 mirrors):

- C: `sp_lev.c:1990–2123` (whole block read:
  gate `:2002–2006`, FURNITURE `:2016–2027`,
  OBJECT `:2029–2059`, MONSTER `:2061–2114`,
  block_point `:2121–2122`, female `:2125`
  outside the gate).
- Macro: `youprop.h:359–360` uprops H||E —
  read, matches every new JS read.
- Mirrors: rog_strt (`:9253–9254`), minend_1
  (`:16579–16580`), boulder (`:19582–19583`),
  furniture (`:25951–25955`), chest
  (`:31507–31512`), fixup (`:22309–22314`).
  6th mirror `set_mimic_sym`
  (`js/makemon.js:3946–3952`) pre-existing
  uprops — verified, consistent.

## C ↔ JS fidelity

**Gates C-exact.** Each mirror gates exactly the
appear writes C's `if` wraps: rog/minend
closures return with nothing after them;
boulder writes female BEFORE the gate (C
`:2125` outside — comment cites it);
furniture/chest use inline gates with female
before. The general fixup's early return wraps
the whole `:2002–2123` block incl. block_point,
and runs before `:2125` per the caller comment
(`:22232`). The S_MIMIC-static + OBJECT/
FURNITURE-only claim holds per site (giant/
large/small mimic ids, `mkclass S_MIMIC`,
mimic-as-chest), so the cham-MONSTER arm is
N/A there by construction; the general fixup
keeps all four appear arms live. No symbol
deleted or re-pointed (one const import), so no
sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The "first 60
draws match exactly" localization plus the
ring-confer/uprops-only write path is measured;
the boulder-retry non-invention (C `m->x < 0`
after assignment) is cited, not assumed.

## Density

Cliff-phase §2b: one row-2 writer block across
its mirrors, no bundling. 95314 646 → 1321
(+675). mklev.js shared — full 44/44 ran.

## Verification

D-log Verify: restrap 1 moved; REACH-OK
(75/75); create_monster vacuous + REACH-OK;
gates + cohort + full PASS.

Re-measured by this audit (`verify restrap
--base 9b42202e5~1 --reach-all`):

```text
verify restrap: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Wizard-95314: moved → getobj at step 1321 (was 646)
reach restrap: 75 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
