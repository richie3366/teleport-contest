# Review 1614 — 4559dcf9 — mondata.c same_race whole-body restart (D-2655)

**Metadata:** SHA `4559dcf9`, `mondata.c` `same_race`, D-2655.
JS: `js/mondata.js` (restart + per-arm cites) + `js/dogmove.js`
(+7: `dog.c:1080–1083` cannibal arm + 4 import joins). Closes
review 06-58e6d5fa-cprefx-cannibal §same_race debt risk #2
(undead fallthrough — shipped, no stamp needed).

## Intent vs deliverable

Subject promises: whole-body restart (undead fallthrough,
letters-up-front, mndx equality, `dog.c:1080` caller wired).
Diff delivers both the restart and the caller arm. Promise
matches deliverable.

## Inventory

- `same_race(pm1, pm2)` (mondata.js:410, sync, exported) — C
  `mondata.c:770–871` (102 L).
- `dogfood` CORPSE case (dogmove.js:217, +7-line arm) — C
  `dog.c:1080–1083`.
- Import joins only: `same_race` to the existing mondata.js
  import (`--can` ALREADY); `humanoid`/`is_undead`/`is_elf` to
  the existing monsters.js import (all live sync exports —
  `sym.mjs` paste below). No deleted symbols, no re-points.

## C ↔ JS fidelity

C loci read in full: `same_race :770–871` (body above),
`dogfood` CORPSE `:1066–1088`. No RNG either side.
Branch-by-branch confirm:

- `:773` letters read before `:775` exact — JS keeps that
  order (guard → let1/let2 → exact), cited in-body ✓. The
  mndx-equality extension of the exact check is JS-only but
  equivalent (equal mndx == same table entry == C `pm1 ==
  pm2`) and probe-confirmed (tengu/tengu fires) ✓.
- Table-pointer compares (`&mons[PM_X]`) → live `monsndx()`
  vs `monsterNames` indices, same table order (noted
  in-body) ✓ — pure-function hoist, behavior-neutral.
- Races `:778–787`, giant/golem/flayer `:789–794`, kobold
  `:795–798`, ogre→naga `:799–810`, rider/minion `:812–815`,
  tengu `:817–818`, imp else-if `:819–823`, demon `:824–825`
  — all exact, in C order ✓.
- Undead `:826–840`: terminal `return false` **removed**;
  letter-miss falls through; `else if (is_undead(pm2))
  return false` kept — the shipped debt fix, C-exact ✓.
- Growth `:843–857` (m1-chain only, m1 != m2 known),
  gargoyle/bee `:859–863`, longworm `:865–866`, miss `:870` ✓.
- `dogfood` arm ≡ C `:1080–1083` token-for-token
  (`humanoid && same_race && !undead && kobold/orc/ogre
  exclusions → starving&&carni&&!elf ? ACCFOOD : TABU`),
  placed between the vegan arm and the `carni ? CADAVER :
  MANFOOD` tail — C order ✓.
- Caller closure: all four C same_race call sites wired in
  JS — dog.c:1080 → dogmove.js:217 (this commit),
  eat.c:776 → eat.js:3421, muse.c:255 → muse.js:1341,
  sounds.c:706–707 → sounds.js:1001–1002 (pre-existing) ✓.
- OMITs named with cites: dogfood `polyfood` `:1075` arm,
  rider/petrify tails (pre-existing, own rows); pointer→mndx
  adaptation; null guard (C NONNULL); monsndx hoist. Note:
  with `polyfood` still deferred, a polyfood same-race
  corpse takes the new TABU arm where C takes MANFOOD —
  pre-existing deferral interaction, documented, not new.

`sym.mjs` output (this SHA's joins):

```text
humanoid         js/monsters.js:379   sync
is_undead        js/monsters.js:650   sync
is_elf           js/monsters.js:595   sync
monsndx          js/mondata.js:129   sync
```

(`is_undead` has a pre-existing pray.js:845 clone — this
commit correctly IMPORTs the export instead.)

## Hallucinations / overclaim

None. Probe honesty kept: the fallthrough is "behaviorally
silent today and C-exact regardless" (0 undead outside the
six letters + kobold on the live table) — C-exactness
claimed from the body, silence from the probe, not
conflated.

## Density

Breadth phase: one-function restart + one same-file caller
arm — right-sized.

## Verification

D-log Verify bullet claims PASS (syntax · rule2 · hidden
note 0 blocked · REACH smoke 24/24 · green · strict ·
cohort). Re-measured here: `hidden-proxy.mjs verify
same_race --base 4559dcf9~1 --reach-all` → 0 blocked both
sides (vacuous note, correctly labeled coverage row) +
smoke 24/24 PASS, 0 regressed → REACH-OK. Claim true. Diff
grep: no FORCE/DIAG/getRngLog/seed/coordinates/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
