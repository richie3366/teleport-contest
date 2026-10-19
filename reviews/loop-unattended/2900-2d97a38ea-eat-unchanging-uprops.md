# Review 2900 — 2d97a38ea — eat.c Unchanging reads include uprops

- SHA: `2d97a38ea` (cliff, writer port: 7 predicate sites, 1 file)
- D-entry: D-4059; Ledger: eat.c (cprefx, cpostfx, fpostfx,
  eatcorpse, eataccessory, edibility_prompts; D-4059 appended)
- `js/` diff: `js/eat.js` +25/−12 (import + 7 sites);
  new `scripts/cprefx-slime-unchanging-amulet.test.mjs`

## Intent vs deliverable

Promise: every eat.c `Unchanging` read used a flat-only union
(`u.Unchanging || HUnchanging || EUnchanging`) that misses the
worn-amulet `uprops[UNCHANGING].extrinsic`. A glob of green slime
slimed an amulet-of-unchanging hero. The fix imports the canonical
`Unchanging(u)` (polyself.js:438) at all seven sites. The diff has
seven replacements and one import line extension. Promise = diff.

## Inventory

C eat.c `Unchanging` reads (grep of pinned eat.c, comment at :3172
excluded) ↔ JS:

| C line | function | JS |
|---|---|---|
| :852 | cprefx PM_GREEN_SLIME | eat.js:3788 |
| :1194 | cpostfx PM_SMALL_MIMIC… | eat.js:1948 |
| :1248 | cpostfx PM_DOPPELGANGER… | eat.js:2012 |
| :1861 | eatcorpse `slimeable` | eat.js:2511 |
| :2379 | eataccessory AMULET_OF_UNCHANGING | eat.js:3205 |
| :2530 | fpostfx LUMP_OF_ROYAL_JELLY | eat.js:2149 |
| :2652 | edibility_prompts stoneorslime | eat.js:4341 |

That is 7/7 sites covered and none missed.

`Unchanging` — polyself.js:438, exported sync: flats ∪
`uprops[UNCHANGING].intrinsic|extrinsic`. C: youprop.h:370–372
`(HUnchanging || EUnchanging)`.

## C ↔ JS fidelity

C cprefx (csym eat.c, green-slime arm):

```c
    case PM_GREEN_SLIME:
        if (!Slimed && !Unchanging && !slimeproof(gy.youmonst.data)) {
            You("don't feel very well.");
            make_slimed(10L, (char *) 0);
            delayed_killer(SLIMED, KILLED_BY_AN, "");
        }
        FALLTHROUGH;
```

C eataccessory (csym):

```c
        case AMULET_OF_UNCHANGING:
            /* un-change: it's a pun */
            if (!Unchanging && Upolyd) {
                accessory_has_effect(otmp);
                makeknown(typ);
                rehumanize();
            }
```

The old JS eataccessory read `!u.Unchanging && !(HUnchanging &
FROMOUTSIDE)`, a narrower mask than C. The new `!Unchanging(u) &&
Upolyd(u)` is the C form exactly. All other sites keep their
surrounding operands and order (Slimed TIMEOUT mask, slimeproof form,
`mlet !== S_MIMIC`, killer-bee `polymon` short-circuit). Only the
Unchanging operand changed, and it is a pure predicate with no RNG, so
no draw order moved.

Import: eat.js already imports polyself.js (ALREADY). `Unchanging` is a
hoisted function, so there is no TDZ.

## Hallucinations / overclaim

None. The named residual (Wizard-50156033 s512 map `I`/`)` stays
cprefx-owned for its own writer) re-measures as exactly that, see
below. The other modules' local Unchanging clones already OR the uprops
slot, as the D-log states. The duplication is debt, not a C-wrong.

## Density

A whole C file's reads of one macro, done at once. One `Ledger:` entry
per touched function. No unreached work: the probe moves.

## Verification

Re-measure (`--base 2d97a38ea~1 --no-reach`):

```text
verify cprefx: 2 blocked (1 uncached: scen-sweep-Healer-610101)
  scen-sweep-Wizard-50156033: still cprefx at step 512 (map I/`)`, named)
verify cprefx: 0 PASS, 0 moved past, 1 unchanged, 0 worse → NO MOVEMENT
verify eatcorpse: scen-sweep-Ranger-50250033: PASS → 1 PASS → PROGRESS
```

The cprefx NO MOVEMENT is the named other-shape row, not this fix's
target. The probe row (Ranger-50250033) PASSes. Healer-610101 is
archived PASS at HEAD (absent from active recordings), consistent with
the D-log. There were no FORCE/DIAG/seed strings, and the rulecheck is
clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
