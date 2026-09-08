# Review 1069 — 5ca3ad86 — dochugw threat check reads live canspotmon (D-2102)

Metadata: SHA `5ca3ad86`, D-2102 (Open row `end.c` done_in_by, 2 sessions). JS: `js/monmove.js` +8/−4. Next NN 1069.

## Intent vs deliverable

Subject promises: dochugw's two visibility reads move from the file-local door-feedback stub to the live display macro, fixing a bite-vs-stop message ordering (stop-then-bite → bite-then-stop). Diff actually adds: two call-site swaps (`already_saw_mon`, new-spot check) + comment update:

```js
const already_saw_mon = (chug && game.occupation) ? display_canspotmon(mtmp) : false;
...
    && display_canspotmon(mtmp) && couldsee(mtmp.mx, mtmp.my)
```

No other stub callers touched. Promise matches deliverable.

## Inventory

Changed JS: `dochugw` (monmove.js:2413–2435), two identifier swaps only. Re-pointed symbol: local clone `canspotmon` (monmove.js:1019) → aliased import. Required `sym.mjs` output (pasted, run this iteration):

```text
canspotmon       js/display.js:1234   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/monmove.js:1019
display_canspotmon NOT FOUND in js/** (no export, no local function/const).
```

`display_canspotmon` as a bare name is correctly NOT FOUND — it is the local alias for `canspotmon as display_canspotmon` (monmove.js:78), a pre-existing import, so no new edge and no TDZ risk (call-time use only). The local `canspotmon` clone at monmove.js:1019 remains for the other (door-feedback) callers, covered by the data.md:574-578 clone debt the D-log cites. `canseemon` shows the same pattern (display.js:930 live + 5 local clones); this SHA does not touch it.

## C ↔ JS fidelity

C locus: `monmove.c:203–238` (`dochugw`, full 36-line body read) + `display.h` `_canseemon` (`:117-120`: `cansee || see_with_infrared` + `mon_visible`) via `canspotmon`. C body, branch-by-branch:

```c
boolean already_saw_mon = (chug && go.occupation) ? canspotmon(mtmp) : 0;
int rd = chug ? dochug(mtmp) : 0;
if (go.occupation && !rd
    && (Hallucination || (!mtmp->mpeaceful && !noattacks(mtmp->data)))
    && mdistu(mtmp) <= (BOLT_LIM + 1) * (BOLT_LIM + 1)
    && (!already_saw_mon || !couldsee(x, y)
        || distu(x, y) > (BOLT_LIM + 1) * (BOLT_LIM + 1))
    && canspotmon(mtmp) && couldsee(mtmp->mx, mtmp->my)
    && mtmp->mcanmove && !onscary(u.ux, u.uy, mtmp))
    stop_occupation();
```

JS mirrors every predicate in order. No RNG in the function on either side; the fix changes only a boolean input (infrared-seen bat now seen), moving the stop from the approach move to after the bite move. The D-log's measured mechanism (pline-trace stacks: `stop_occupation` via dochugw before `hitmsg` bite, same mnum=129 bat; geom-probe 0 cells; RNG fully matched) is the right falsifier chain for a screen-order symptom — position ruled out, visibility isolated. `onscary` stays deferred-false, map-named (turns.md:2623); remaining local-stub readers stay under the cited clone debt — named, not silent.

Callee closure: `display_canspotmon` LIVE (display.js:1234 via alias), `dochug/couldsee/mdistu/dist2` unchanged live, `onscary` named-omit. No stubs in the touched arm.

## Hallucinations / overclaim

None; the commit corrects an attribution instead of making one (`done_in_by` end.c:235 is a vampshifter literal, not a print — true printers `hitmsg`/`stop_occupation` named). No "Match C dispatch over stubbed callee" shape.

## Density

+8/−4, one function, one C locus family. §2b-compliant.

## Verification

D-log claims `verify --fn done_in_by` → 0 PASS, 2 moved past + green/strict/cohort/full-44. Re-measured this iteration:

```text
verify done_in_by: baseline 5ca3ad86~1 — 2 session(s) blocked on it
  scen-tour-Barbarian-92024: moved → js-throw at step 97 (was 47)
  scen-tour-Ranger-92177: moved → were_change at step 108 (was 81)
verify done_in_by: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches. One flag checked further: the verify line labels Barbarian's destination `js-throw`@97, and the D-log Next honestly defers confirmation ("re-measure next iter; a confirmed js-throw is Must-fix"). I ran `hidden-proxy show scen-tour-Barbarian-92024` myself: `"error": null`, kind=screen step 97 — no throw, so no §10.14 Must-fix is owed by this SHA; the worker label is noise contradicted by `show`. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate reads. Rule #2 globally clean (review 1067).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
