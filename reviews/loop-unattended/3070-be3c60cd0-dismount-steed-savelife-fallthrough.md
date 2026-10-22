# Review 3070 — be3c60cd0 — dismount_steed falls through after a declined «Die?»

- SHA: `be3c60cd0` (cliffs row slimed_to_death: scen-ride-Knight-53660014
  step 225, folded by Grow #27 in `76cc70042`, the parent of this SHA)
- D-entry: D-4230; Ledger: dismount_steed ported
- `js/` diff: steed.js +4 −1

## Intent vs deliverable

Promise: in steed.c dismount_steed's THROWN/KNOCKED/FELL arm, `losehp(
Maybe_Half_Phys(rn1(10, 10)), "riding accident", KILLED_BY_AN)`
(`:612`) is followed unconditionally by `set_wounded_legs(BOTH_SIDES,
HWounded_legs + rn1(5, 5))` (`:614`). When done() returns (wizard
«Die?» declined, or life-saving), C draws rn1(5,5), lands the hero and
finishes the dismount. JS returned right after finish_losehp_done.

Diff: the bare `return;` becomes `if (game.program_state?.gameover)
return;`. This is the do.js idiom that D-4188 used for goto_level. The
diff matches the promise.

## Inventory

- dismount_steed — js/steed.js:841 (C steed.c `:575–822`, per
  `csym.mjs dismount_steed`). Only the losehp tail of the
  THROWN/KNOCKED/FELL arm changed.
- Callees on the arm: losehp (LIVE, async), finish_maybe_wail,
  finish_losehp_done (end.js, dynamic import, the deferred done()
  drain), set_wounded_legs (LIVE, async), rn1 / maybe_half_phys.
  Nothing was deleted or re-pointed, so there is no sym.mjs output to
  paste for re-points. For the record:

```text
$ node scripts/sym.mjs dismount_steed
dismount_steed   js/steed.js:841   ASYNC — await required
```

## C ↔ JS fidelity

C `:602–617`:

```c
case DISMOUNT_THROWN: verb = "are thrown"; FALLTHROUGH;
case DISMOUNT_KNOCKED:
case DISMOUNT_FELL:
    You("%s off of %s!", verb, mon_nam(mtmp));
    if (!have_spot) have_spot = landing_spot(&cc, reason, 1);
    if (!ulev && !ufly) {
        losehp(Maybe_Half_Phys(rn1(10, 10)), "riding accident", KILLED_BY_AN);
        set_wounded_legs(BOTH_SIDES, (int) HWounded_legs + rn1(5, 5));
        repair_leg_damage = FALSE;
    }
    break;
```

- Message, landing_spot(…, 1) and the `!ulev && !ufly` gate match JS
  `:865–871` line for line.
- losehp → done(DIED): in C a real death never returns (really_done
  exits). When it does return (savelife after «Die?» n, or an amulet of
  life saving), control comes back to `:614`. JS returns only when
  `program_state.gameover`, which is the JS signal for the non-returning
  path. Otherwise it falls through to `set_wounded_legs(…, HWounded_legs
  + rn1(5, 5))` and `repair_leg_damage = false`, then `break` into the
  common landing tail. That is the C order and draw: rn2(5) at `:614`,
  the measured first mismatch.
- The fix also covers life-saving, which returns through the same done()
  path, not only the wizard decline.
- savelife's «You survived that attempt on your life.» is nomovemsg
  (end.c savelife), so C shows it on the next turn and not in this
  topline. Falling through puts JS back on that schedule, which
  matches the recorded «OK, so you don't die.--More--».

## Same-C-file sites

steed.c's other losehp is mount_steed's slip (`slipped while mounting`).
In C it is followed by `return (FALSE)`. JS steed.js:745–750 drains and
returns false whether or not the hero survived, which matches. No
steed.c site is left.

The D-entry names ten `await finish_losehp_done(); return;` sites in
other C files' ports (attrib, eat, hack ×2, mcastu, monmove, mthrowu,
pickup, region, sit), each to be checked against its own C caller.
Leaving them is correct under same-C-file scope, because whether each
one falls through depends on its own C, and no failing row reaches one.

## Hallucinations / overclaim

None in the code. The C locus says "dismount_steed `:567–760`", but
pinned is `:575–822`. The arm lines `:612` / `:614` are right. That is
a text-only drift. The owner label slimed_to_death is the known
timeout.c:508 comment-literal misattribution (D-3821). The D-entry says
so and fixes the real writer.

## Density

One owner, one line of logic, the session folded by the same window's
grow. Right-sized.

## Verification

Base choice: `be3c60cd0~1` = `76cc70042` (Grow #27 probes), the commit
that folded scen-ride-Knight-53660014. Its board already lists the row
(scoreboard at 46b68e26c is the verify baseline it reports), so no
earlier base is needed.

```text
hidden-proxy verify slimed_to_death,dismount_steed --base be3c60cd0~1 --no-reach
  verify slimed_to_death: baseline be3c60cd0~1 (scoreboard at 46b68e26c) — 1 blocked
    scen-ride-Knight-53660014: PASS
  verify slimed_to_death: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify dismount_steed: 0 blocked (vacuous; row owned by slimed_to_death)
```

This agrees with the D-log (frozen runner PASS, RNG 9210/9210, Screen
245/245, reach dismount_steed 2/2, green 2/2, strict ×2, cohort 7/7,
full 44/44, sweep 773/0 regressed → REACH-OK, board 774/774).
`--rulecheck` is clean, and the diff has no FORCE, DIAG or seed reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
