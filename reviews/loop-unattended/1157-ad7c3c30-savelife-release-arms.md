# Review 1157 — ad7c3c30 — savelife release arms

Subject promises: `end.c` savelife release arms — `curs_on_u` + uswallow `expels` / ustuck release + `unstuck` `rnd(2)` (D-2191, queue owner `unstuck`, 1 session).
Diff actually adds: `js/end.js` `savelife` tail (+17/−3) — `await curs_on_u()`, uswallow→`expels` / ustuck→release-pline + `unstuck` arms in C order; four import touches (`curs_on_u`, `Monnam`, `sticks`, `unstuck`+`expels`). Nothing else.

## Intent vs deliverable

Promise matches diff. The release arms were the recorded gap: a grabbed-hero lifesave printed no release line and `unstuck`
never drew its `rnd(2)`, so the next JS draw (`distfleeck` `rn2(5)`) paired against C's unstuck slot — an RNG-first divergence
with `unstuck` first in C stepFns. The recorded case is scen-genesis-Knight-92002 step 52/90: C `rnd(2)=2 @ unstuck(mon.c:3465)`
vs JS `rn2(5)=1 @ distfleeck`, C «The pit fiend releases you.» vs JS «You survived that attempt on your life.».

## Diff (`js/end.js` body hunk)

```js
    // C end.c:743 — cursor back on hero before the release messages.
    await curs_on_u();
    // C end.c:744-745 — !mon_moving endmultishot(FALSE) stays named (not live).
    if ((u.uswallow | 0)) {
        // C end.c:746-749 — might drop hero onto a trap that kills her again.
        await expels(u.ustuck, u.ustuck.data, true);
    } else if (u.ustuck) {
        // C end.c:750-755 — poly'd sticker releases it, else it releases hero.
        if (Upolyd(u) && sticks(game.youmonst?.data))
            await pline(`You release ${mon_nam(u.ustuck)}.`);
        else
            await pline(`${Monnam(u.ustuck)} releases you.`);
        await unstuck(u.ustuck);
    }
```

Import widenings only (`display.js` +`curs_on_u`, `do_name.js` +`Monnam`, `engrave.js` +`sticks`, `mhitu.js` +`unstuck, expels`) —
all pre-existing static edges widened, no new module pair.

## Inventory

- `savelife` (`js/end.js:1585–1598`): one changed function; four import widenings, no new files.

## C ↔ JS fidelity

C `end.c:703–756` (`node scripts/csym.mjs savelife`), tail verbatim:

```c
    curs_on_u();
    if (!svc.context.mon_moving)
        endmultishot(FALSE);
    if (u.uswallow) {
        /* might drop hero onto a trap that kills her all over again */
        expels(u.ustuck, u.ustuck->data, TRUE);
    } else if (u.ustuck) {
        if (Upolyd && sticks(gy.youmonst.data))
            You("release %s.", mon_nam(u.ustuck));
        else
            pline("%s releases you.", Monnam(u.ustuck));
        unstuck(u.ustuck);
    }
```

JS walks it arm-for-arm in order: awaited `curs_on_u()`; `(u.uswallow|0)` → `expels(ustuck, ustuck.data, true)`; else
`Upolyd(u) && sticks(youmonst.data)` → house `You release …` pline idiom (artifact.js:2356 precedent cited) vs
`Monnam … releases you`, then `unstuck`. `!mon_moving endmultishot(FALSE)` stays named (not live) with a C-line comment,
and the map line was updated in-commit — a legitimate OMIT, not a stub in a live arm.

Callee closure (`node scripts/sym.mjs` each):

| symbol | status | use |
|--------|--------|-----|
| `curs_on_u` | LIVE `js/display.js:5241`, ASYNC | awaited ✓ |
| `Monnam` | LIVE `js/do_name.js:1149`, sync | template ✓ |
| `unstuck` / `expels` | LIVE `js/mhitu.js:1661/1688`, ASYNC | both awaited ✓ |
| `sticks` | verified CLONE `js/engrave.js:346` | ports `mondata.c:654` exactly (`STCK \|\| (WRAP && !ENGL) \|\| HUGS`, short-circuit shape quoted in its comment), imported instead of the monmove export per that file's standing do-not-import note |

`sym.mjs` notes multiple `sticks` exports + 2 local clones elsewhere, but this commit re-points nothing and deletes nothing —
it imports the canonical export. Minor note, not a C-wrong: the message claims a "new static `js/mhitu.js` edge" with a
`--can … SAFE` verdict, but `node scripts/imports.mjs --can end.js mhitu.js unstuck` at HEAD reports
`ALREADY: end.js already statically imports mhitu.js. No new edge needed.` — substance holds (safe, no cycle) either way.

## Hallucinations / overclaim

None. "Match C" covers the dispatch *and* the callees, all live or verified clone; the two unported arms (`make_sick`
TIMEOUT==1 cure, `!mon_moving endmultishot`) are named in the map in-commit.

## Density

~20 JS lines for a 14-line C tail plus four import touches — right-sized single-falsifier cluster (§2b); the small count is
the live-envelope exception, stated.

## Verification

D-log claims `verify --fn unstuck` PROGRESS (Knight-92002 step 52 → `one_characteristic`@81) + green/strict/cohort. Re-measured:

```text
verify unstuck: baseline ad7c3c30~1 (scoreboard at 4740848f) — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-genesis-Knight-92002: moved → one_characteristic at step 81 (was 52)
verify unstuck: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match — a genuine later-step move to a different owner, not re-report noise. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate
gates. `imports.mjs --rulecheck` → Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
