# Review 2910 — 0f110d1f2 — gain_guardian_angel Conflict via live uprops reader

- SHA: `0f110d1f2` (cliff rank-23 owner itself:
  dead-flat Conflict gate)
- D-entry: D-4072; Ledger: minion.c
  (`gain_guardian_angel ported`, +D-4072 tag)
- `js/` diff: `js/minion.js` +6/−1 (gate call +
  comment + import); new
  `scripts/gain-guardian-angel-conflict.test.mjs`

## Intent vs deliverable

Promise: the `if (u.HConflict || u.EConflict)`
gate now calls the live `Conflict()` export so a
worn ring of conflict (uprops extrinsic) takes the
booms arm; Wizard-50350024 FULL PASS. The diff is
exactly that gate swap plus comment and import.
Promise = diff.

## Inventory

- `gain_guardian_angel` (minion.js:470–545): gate
  line replaced; body otherwise untouched. C:
  minion.c :497–565, gate at :507–508.
- Import: new `import { Conflict } from
  './mhitu.js'` (minion.js:25) — first minion→mhitu
  edge (no pre-existing import at the parent; the
  in-commit "SAFE" claim is the pre-state, ALREADY
  the post-state — consistent).

No deleted symbols, no re-pointed clones — step-3
paste not triggered. Callee LIVE (`sym.mjs`:
single `Conflict`, js/mhitu.js:225, sync).

## C ↔ JS fidelity

Confirmed against pinned C:

- C youprop.h:216–218 `Conflict (HConflict ||
  EConflict)` over `u.uprops[CONFLICT]`.
  `Conflict()` (mhitu.js:225–230) reads flats OR
  `uprops[CONFLICT].intrinsic/extrinsic` — the
  exact macro shape over both JS channels. The
  probe evidence (worn RIN_CONFLICT, extrinsic
  W_RINGR, flats 0/0) makes the bare-flats miss
  the complete mechanism.
- Whole-body re-check (unchanged arms intact):
  Hear_again first; Conflict arm (booms/feels,
  SetVoice no-op named, verbalize, lose arm) in
  C order; fervent arm (whispers, enexto+
  mk_roamer, mtame-only-if-pets, newsym, Blind
  message, `rn1(8,15)`, `d(m_lev,10)+30+rnd(30)`,
  select_hwep/mksobj+impossible, bless,
  `spe<4 → +rnd(4)`, shield/amulet) — RNG
  call-for-call with C :549–561.
- Kept `deaf` hand-roll disclosed with the
  D-4069 precedent and a both-sides-FALSE proof
  (C took the !Deaf arm). mondata.js
  hero_conflict() untouched and named. Not
  C-wrongs.

## Hallucinations / overclaim

None. Single blocked session claimed PASS;
re-measured PASS. No dispatch/callee split (the
owner itself was ported).

## Density

Cliff owner itself, committed rank 23, first
actionable (ranks 1–21 parks re-verified live).
One `Ledger:` entry. No unreached work.

## Verification

Re-measure (`--base 0f110d1f2~1 --no-reach`):

```text
verify gain_guardian_angel: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Wizard-50350024: PASS
```

Exact match. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
