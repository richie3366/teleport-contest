# Review 2901 — 853daabf0 — drinkfountain Scare monflee + contaminated fatal drain

- SHA: `853daabf0` (cliff, writer port: 2 arms of one C function)
- D-entry: D-4060; Ledger: fountain.c (`drinkfountain`, D-4060)
- `js/` diff: `js/fountain.js` +17/−18; two new tests
  (`drinkfountain-scare-monflee`, `drinkfountain-contaminated-fatal-done`)

## Intent vs deliverable

Promise: (1) case 29 (Scare) inlined a monflee subset (no vrock
`rn2(25)`, no release_hero) and now calls the live `monflee`. (2) Case
21 (Poisonous) returned on `gameover` before draining a fatal trailing
losehp, so the game ended silently with no "You die…"/Die? prompt. Both
probes go to FULL PASS. The diff has exactly those two arm edits plus
the import. Promise = diff.

## Inventory

- case 29 loop — fountain.js:931–940 → `await monflee(mtmp, 0,
  false, false)`. C: fountain.c drinkfountain case 29.
- case 21 drain order — fountain.js:858–873. C: case 21.
- sym.mjs:

```text
monflee          js/monmove.js:1118   ASYNC — await required
```

  The diff deletes an inline clone (mflee/mfleetim/mtrack reset) and
  re-points it to the live import. `imports.mjs --can fountain.js
  monmove.js monflee` → ALREADY.

## C ↔ JS fidelity

C (csym drinkfountain):

```c
        case 21: /* Poisonous */
            pline_The("water is contaminated!");
            if (Poison_resistance) {
                pline("Perhaps it is runoff from the nearby %s farm.", ...);
                losehp(rnd(4), "unrefrigerated sip of juice", KILLED_BY_AN);
                break;
            }
            poison_strdmg(rn1(4, 3), rnd(10), "contaminated water", KILLED_BY);
            exercise(A_CON, FALSE);
            break;
...
        case 29: /* Scare */
            pline("This %s gives you bad breath!", hliquid("water"));
            for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) {
                if (DEADMONSTER(mtmp)) continue;
                monflee(mtmp, 0, FALSE, FALSE);
            }
            break;
```

Case 29: the C callee closure is {pline, hliquid, DEADMONSTER, monflee}.
All are LIVE now. The JS `mhp <= 0` skip is DEADMONSTER. Iterating the
`game.fmon` array vs the C `nmon` list is equivalent here, because
monflee can spawn a vrock gas cloud (a region, not a monster) but does
not add or remove fmon members.

Case 21: in C, `losehp` inside poison_strdmg is noreturn on death, so
`exercise` only runs when the hero survives. JS order is now: drain
`_losehp_needs_done` first (done → "You die…", the wizard Die? prompt).
If gameover still holds, return. Else, a gameover *without* the flag is
losestr's own drained death (D-3782), so return. Else run the wail
drain and exercise. This keeps C semantics for all three outcomes
(death, lifesave/decline, survive). After D-4058 the `finish_maybe_wail`
on the survive path only runs the rehumanize drain, which is harmless.

## Hallucinations / overclaim

None. The named spell.c cursed_book case 5/6 "same silent-death shape"
is in another C file with no corpus session cited. It is correctly not
shipped here (§10.19 unreached).

## Density

Both arms of the cliff owner, whole. Callee closure is now LIVE/LIVE.
One `Ledger:` entry. No unreached work.

## Verification

Re-measure (`--base 853daabf0~1 --no-reach`):

```text
verify drinkfountain: scen-shop-Wizard-50057049: PASS → 1 PASS → PROGRESS
verify monflee: scen-sweep-Tourist-50150017: PASS → 1 PASS → PROGRESS
```

This is an exact match with the D-log (Shop-Wizard via case 21,
Tourist via case 29). There were no FORCE/DIAG/seed strings, and the
rulecheck is clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
