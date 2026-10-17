# Review 2893 — 610ba3d7c — explode() AD_RBRE flip reassigns loop adtyp

- SHA: `610ba3d7c` (cliff, writer port: 1 statement)
- D-entry: D-4052; Ledger: explode.c (`explode ported`, D-4052
  appended, note untouched)
- `js/` diff: `js/explode.js` +6/−3. No test file (movement is the
  corpus rescore).

## Intent vs deliverable

Promise (subject + D-log): the `:578–579` flip must hit the
loop-carried `adtyp` so later victims and the hero section skip
the AD_FIRE gates; probe Monk-50050013 s1064→PASS. Delivers
exactly that: local `how` deleted, `if (xkflg) adtyp = AD_RBRE`
on the loop variable, `monkilled` takes `adtyp`. Promise = diff.

## Inventory

- `explode` monkilled-else arm — explode.js:700.
  C: explode.c:577–581 (verified verbatim below).

## C ↔ JS fidelity

C (explode.c:555–581, line-numbered read):

```c
if (DEADMONSTER(mtmp)) {                          /* :555 */
    int xkflg = ((adtyp == AD_FIRE                 /* :556 */
                  && completelyburns(mtmp->data))
                 ? XKILL_NOCORPSE : 0);
    if (!svc.context.mon_moving) {                /* :560 xkilled arm */
        xkilled(mtmp, XKILL_GIVEMSG | xkflg);
    } else if (mdef && mtmp == mdef) {            /* :562 mdef arm */
        ...
        xkilled(mtmp, XKILL_NOMSG | XKILL_NOCONDUCT | xkflg);
    } else {                                      /* :577 */
        if (xkflg)                                /* :578 */
            adtyp = AD_RBRE; /* no corpse */      /* :579 */
        monkilled(mtmp, "", (int) adtyp);         /* :580 */
    }
}
```

JS is now line-identical in effect, using the file-local
`AD_RBRE = 242` (:126):

```js
} else {
    const { monkilled } = await import('./mhitm.js');
    // C :577–581 — xkflg reassigns the loop-carried
    // adtyp itself (not a local): later victims and
    // the hero section skip the AD_FIRE gates, and
    // monkilled/destroy_items/ugolemeffects see AD_RBRE.
    if (xkflg) adtyp = AD_RBRE; /* no corpse */
    await monkilled(mtmp, '', adtyp);
}
```

The variable is genuinely loop-carried: `let adtyp` declared
:494, derived :496–513, flipped :700, read by every downstream
site. Branch-exclusivity verified: the :560 `!mon_moving →
xkilled` arm and the :562–576 mdef arm leave `adtyp` alone in C,
and the corresponding JS arms (:680–693) don't touch it either.
`adtyp =` in C's `explode` occurs only in the :308–344
derivation plus :579 (full-file grep) — JS likewise (derivation
+ :700).
Downstream parity: in-loop readers (`destroy_items` gate :640,
golem/resist :666–667, next victim's `xkflg` :675) and hero
readers (:728/:736/:739/:803/:811) all read the same JS binding,
matching C's :511/:512/:525/:549/:551/:556 and
:606/:611/:613/:617/:619/:675/:682. The D-log's `combat_ok` note
checks out: JS :590 computes it once pre-loop (models C's
pre-loop `explosionmask` calls at :366/:375), so the flip
correctly cannot affect it — the (:590/:707) cite is JS lines,
slightly ambiguous prose, substance true.
RNG: no draws in the arm on either side; the fork it heals
(burnarmor draws vs resist draws) is downstream consequence,
correctly reasoned from the recorded C steps 1060–1066 (victim-2
naked → 10 burn rolls → case-1 return → flip → victims 3–4 +
hero skip).

## Hallucinations / overclaim

None. The 17-site callers table was spot-verified against csym's
`explode` references (all pre-existing wirings, in-body fix
inherits everywhere). "No corpse" comment matches C's.

## Density

Cliff writer with movement on the row's sole session.
Whole-function holds (`explode` ledger-`ported`, D-4052
appended, note untouched — accurate). One `Ledger:` entry. No
unreached work.

## Verification

Re-measure:

```text
verify resist: baseline 610ba3d7c~1 — 1 session(s) blocked on it
  scen-sweep-Monk-50050013: PASS
verify resist: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match (full 1692 steps). No new module edge, no new
imports. No FORCE/DIAG/seed strings in the diff. Rule #2 clean
(window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
