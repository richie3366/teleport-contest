# Review 2997 — 830300402 — trap.js imports hack.js's Levitation/Flying

- SHA: `830300402` (cliff; board head m_move, scen-sweep-Ranger-50950041
  s1104; writer trap.c immune_to_trap via hack.c avoid_trap_andor_region)
- D-entry: D-4157; Ledger: immune_to_trap ported; check_in_air ported
- `js/` diff: js/trap.js +4 −12

## Intent vs deliverable

Promise: avoid_trap_andor_region asks «Really %s into that %s?» only
when `immune_to_trap(&youmonst, ttyp) != TRAP_CLEARLY_IMMUNE`. Its
ground-trap arm returns CLEARLY_IMMUNE for a Levitating or Flying hero,
and youprop.h Flying reads `u.uprops[FLYING]`. A worn amulet of flying
sets only that extrinsic. trap.js kept flat-field clones, so a flying
Ranger got the y/n prompt and stood still where C flew over the hole.

Diff: both clones are deleted, and `Levitation_st` / `Flying_st` are
imported from hack.js under the old names, so all 23 call sites are
unchanged. The promise matches the diff.

## Inventory

- Deleted: trap.js `hero_Levitation`, `hero_Flying` (old :1590/:1595).
- Imported: hack.js `Levitation_st` :3275, `Flying_st` :3286.
- Readers: immune_to_trap (C trap.c :2782–2934, ground arm
  :2810–2828), check_in_air (:1086–1094), trapeffect_hole/pit arms,
  polytrap was_Lev/was_Fly, verb/preposition picks.

`sym.mjs` (required, re-pointed symbols):

```text
Levitation_st    js/hack.js:3275   sync
Flying_st        js/hack.js:3286   sync
hero_Flying      NOT EXPORTED — 1 LOCAL CLONE: js/dbridge.js:342
hero_Levitation  NOT EXPORTED — 1 LOCAL CLONE: js/dbridge.js:353
```

The trap.js clones are gone. The dbridge.js pair is a separate module's
pair, which the D-log says already ORs in uprops.

## C ↔ JS fidelity

youprop.h:240 `Levitation = (HLevitation || ELevitation) &&
!BLevitation`, and :252–254 `Flying = (HFlying || EFlying || (u.usteed
&& is_flyer(u.usteed->data))) && !BFlying`, all over
`u.uprops[…].intrinsic/extrinsic/blocked`. hack.js Levitation_st reads
H/E through `_uprop_he_st`, which takes flats or uprops, and blocked from
`BLevitation` or `uprops.blocked`. Flying_st adds the steed-flyer
disjunct. Both match the macro. The old clones missed the uprops
extrinsic and `uprops.blocked`, so this also fixes the blocked side,
for example BFlying's I_SPECIAL while levitating. Both imports are sync,
like the clones they replace, so no caller changes shape. The prompt
gate in avoid_trap_andor_region draws no RNG. The divergence was the
hero not moving, and m_move's `rn2(16)` vs `rn2(20)` follows from that.

## Hallucinations / overclaim

None. The Named list of other flat-only Flying/Levitation clones is true
as a family: apply.js:3209/3216, dig.js:1640/1646, do_wear.js:3784/3790,
artifact.js:412, dokick.js:203. Each is a C-wrong in its own C file. No
session is named for them. They are the known clone-drift class
(NOTES: "fix every site in that C file"), so this audit leaves them to
the iterations those files' cliffs bring.

## Density

The head's writer, fixed by an import instead of a third clone. A net
deletion.

## Verification

```text
verify m_move,immune_to_trap,avoid_trap_andor_region --base 830300402~1 --no-reach
  m_move: scen-sweep-Ranger-50950041 PASS (this SHA moved it s1104 → s1169;
          D-4158 finished it)
  immune_to_trap / avoid_trap_andor_region: 0 blocked (vacuous)
```

The movement claim holds. The D-log reports "1 moved" at this SHA, and
HEAD's PASS includes D-4158.

## Actionable C-wrongs

None queued (sibling clones are other C files, unreached).

Verdict: **ACCEPT**
