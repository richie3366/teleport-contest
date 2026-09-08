# Review 1072 — 7b29e91a — domove_fight_empty statue arm via live gbuf (D-2106)

Metadata: SHA `7b29e91a`, D-2106 (Open row `dokick.c` ghitm, 2 sessions). JS: `js/cmd.js` +15/−10. Next NN 1072.

## Intent vs deliverable

Subject promises the statue arm in exact C order via the live gbuf export. Diff actually adds: BOULDER full-pile scan first, then `glyph_to_obj_at === STATUE_OTYP` → unconditional full-pile STATUE overwrite, plus `a statue`/`a boulder` target split:

```js
for (let p = objects_at(x, y); p; p = p.nexthere) {
    if ((p.otyp | 0) === BOULDER_OTYP) { boulder = p; break; }
}
if (glyph_to_obj_at(x, y) === STATUE_OTYP) {
    boulder = null;
    for (let p = objects_at(x, y); p; p = p.nexthere) {
        if ((p.otyp | 0) === STATUE_OTYP) { boulder = p; break; }
    }
}
...
target = (boulder.otyp | 0) === STATUE_OTYP ? 'a statue' : 'a boulder';
```

Promise matches deliverable. The recorded owner is corrected, not obeyed: `ghitm` `:305` prints no "attack"/"statue" text (its literal is the harmlessly/gold/mon_nam shape) — true writer `domove_fight_empty` `:2319–2322`, whose body was never ported for this arm.

## Inventory

Changed JS: `domove_fight_empty` (cmd.js:1215–1245). No new functions; one import name (`glyph_to_obj_at`) joins the existing display.js edge — no new module, runtime call, no TDZ. Required `sym.mjs` output (this iteration):

```text
glyph_to_obj_at  js/display.js:1452   sync
sobj_at          NOT EXPORTED — 12 LOCAL CLONE(S) in 12 file(s) => do NOT write clone #13
objects_at       js/mkobj.js:2336   sync
```

The port correctly inlines the full-pile loop instead of writing clone #13, per the index guidance. Nothing deleted or re-pointed from a local clone to an import in *this* diff (the old `remembered_glyph`/top-only checks are removed as wrong-JS, not re-pointed).

## C ↔ JS fidelity

C locus: `hack.c:2228–2338` (111-line body read; match arm `:2258–2267`):

```c
if (!Underwater) {
    boulder = sobj_at(BOULDER, x, y);
    /* if a statue is displayed at the target location,
       player is attempting to attack it [and boulder
       handling below is suitable for handling that] */
    if (glyph_is_statue(glyph)
        || (Hallucination && glyph_is_monster(glyph)))
        boulder = sobj_at(STATUE, x, y);
```

JS replicates the order exactly, including the overwrite-to-null semantics when the glyph shows a statue but the pile holds none (unsensed mimic-as-statue — matches C's `sobj_at` miss). `glyph_to_obj_at` is the `display.h:904` equivalent of the `glyph_is_statue` (`:835`) test, read off the same on-screen `gbuf` C's `glyph_at` (`display.c:2478`) returns — replacing the old remembered-glyph/top-only stand-ins that caused both corpus misses (live-shown statue never memorized, or statue buried in the pile). Target split (`a statue` vs `a boulder`) is what C `ansimpleoname` yields for the common case; full naming stays deferred. No RNG either side in this arm.

Callee closure: all LIVE or inline-equivalent; no stubs. The Hallucination disjunct, `Underwater` gate, dig-with-pick arm and full `ansimpleoname` are named in this commit AND in the map — turns.md:1431 carries the D-2106 delta verbatim:

```text
**statue arm via live gbuf D-2106** (...);
dig-with-pick/Underwater/Hallu-monster-as-statue/full-ansimpleoname deferred);
```

Legal OMITs (named in the map in this commit with C citations). Note the `Underwater` gate wraps the whole scan in C — the shipped arm runs unguarded, which is exactly what the map deferral covers.

## Hallucinations / overclaim

None — the commit retracts a misattribution (`ghitm` body already faithful per D-0989/D-1751, untouched) instead of porting the wrong function.

## Density

+15/−10 for a 5-line C arm (density exception: C is that small). One row, one module.

## Verification

D-log claims `verify --fn ghitm` → 0 PASS, 2 moved past + green/strict/cohort. Re-measured this iteration:

```text
verify ghitm: baseline 7b29e91a~1 — 2 session(s) blocked on it
  scen-genesis-Caveman-92199: moved → use_pole at step 54 (was 16)
  scen-poly-Ranger-92090: moved → do_statusline2 at step 273 (was 238)
verify ghitm: 0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match — strictly later steps, different owners. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate reads. Rule #2 per commit; globally clean (review 1067).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
