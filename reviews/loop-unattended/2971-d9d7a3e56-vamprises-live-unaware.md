# Review 2971 — d9d7a3e56 — vamprises reads the live Unaware macro

- SHA: `d9d7a3e56` (near-pass cliff; owner = writer `vamprises`, 1 row)
- D-entry: D-4131; Ledger: vamprises ported
- `js/` diff: `js/mhitm.js` +2/−2

## Intent vs deliverable

Promise: mon.c vamprises words a vampire's revival with the youprop.h
`Unaware` macro, `multi < 0 && (unconscious() || is_fainted())`. JS read
the flat `u.Unaware` field, so a fainted or unconscious hero got
«…suddenly transforms» where C says «you dream that … transforms». Diff:
`const unaware = Unaware()` (eat.js export, already imported at
mhitm.js:156), and the header comment is updated. Promise = diff.

## Inventory

- `vamprises` — mhitm.js:3656; C mon.c:2888–2987 (action string :2913–2919).
- Callee `Unaware` — eat.js:479; C youprop.h:399.

## C ↔ JS fidelity

```c
#define Unaware (gm.multi < 0 && (unconscious() || is_fainted()))  /* youprop.h:399 */
Snprintf(action, sizeof action, "%s%s %s%s and rises as",
         Unaware ? "you dream that " : "", x_monnam(...),
         Unaware ? "" : "suddenly ",
         spec_death ? "reconstitutes" : "transforms");             /* :2913 */
```

eat.js:479 is that expression (`(game.multi|0) < 0 && (unconscious() ||
is_fainted())`). JS evaluates it once into `unaware` and uses it for both
`%s` slots. C evaluates the macro twice, but nothing between the two
reads changes `multi` or the faint state, so the result is the same. No
RNG.

## Hallucinations / overclaim

None. The D-log names the other flat-`u.Unaware` readers (lock.js:1075,
mhitu.js:659, muse.js:484, zap.js:4621, monmove.js:1331,
potion.js:873/:1145). They are other C files and the mirror family.

## Density

A one-predicate fix in the owner.

## Verification

```text
verify vamprises (--base d9d7a3e56~1): 1 blocked
  scen-worldtour-Barbarian-51050016: PASS → PROGRESS
```

Exact match with the D-log.

## Actionable C-wrongs

None in mon.c. The named `u.Unaware` readers are cross-file mirror debt.

Verdict: **ACCEPT**
