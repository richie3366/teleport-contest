# Review 2907 — cce4c9e8b — gain_guardian_angel canonical Conflict

- SHA: `cce4c9e8b` (cliff, writer port: 1 predicate)
- D-entry: D-4066; Ledger: minion.c (`gain_guardian_angel`, D-4066)
- `js/` diff: `js/minion.js` +2/−1 (import + predicate)

## Intent vs deliverable

Promise: the Astral-arrival conflict arm read phantom flats
`u.HConflict || u.EConflict`. A worn ring of conflict lives in
`uprops[CONFLICT].extrinsic`, so JS lost «A voice booms:» and the
hostile angels (worldtour-Wizard-50350024 → FULL PASS). The diff calls
the canonical `Conflict()`. Promise = diff.

## Inventory

- `gain_guardian_angel` conflict gate — minion.js:474.
  C: minion.c gain_guardian_angel (gate `if (Conflict)`, csym line 11
  of the body).
- `Conflict` — mhitu.js:225 (flats ∪ `uprops[CONFLICT]` H/E).
  C: youprop.h:218 `#define Conflict (HConflict || EConflict)`.

## C ↔ JS fidelity

C (csym minion.c gain_guardian_angel, head):

```c
    Hear_again(); /* attempt to cure any deafness now (divine
                     message will be heard even if that fails) */
    if (Conflict) {
        if (!Deaf)
            pline("A voice booms:");
        else
            You_feel("a booming voice:");
        SetVoice(...);
        verbalize("Thy desire for conflict shall be fulfilled!");
        /* send in some hostile angels instead */
        lose_guardian_angel((struct monst *) 0);
    } else if (u.ualign.record > 8) { /* fervent */
```

JS `Conflict()` returns the C union (flats kept for legacy writers,
uprops intrinsic/extrinsic for setworn's oc_oprop). The fork at s834 is
exactly this gate. The rest of the arm (deaf choice, verbalize,
lose_guardian_angel's hostile `rn1(3,3)` angels) was already present and
is unchanged. The 72204 RNG lost after it is the angels' makemon chain
that JS skipped.

Side note (not this SHA): the `deaf` local (minion.js:472) reads flats
plus `uroleplay.deaf` and not `uprops[DEAF]`. That is the same phantom
flat shape. No session names it.

## Hallucinations / overclaim

None. The named residual flat reads (invent.js:7212/:8331,
mondata.js `hero_conflict`'s non-C `game.Conflict` fallbacks) are true
and untouched. Correct under §10.19.

## Density

A one-predicate writer with movement on its probe. One `Ledger:` entry.
No unreached work.

## Verification

Re-measure (`--base cce4c9e8b~1 --no-reach`):

```text
verify gain_guardian_angel: 1 blocked
  scen-worldtour-Wizard-50350024: PASS
verify gain_guardian_angel: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

This is an exact match with the D-log. There were no FORCE/DIAG/seed
strings, and the rulecheck is clean.

## Actionable C-wrongs

None in this diff.

Verdict: **ACCEPT**
