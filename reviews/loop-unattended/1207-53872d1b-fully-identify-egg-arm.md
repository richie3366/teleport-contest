# Review 1207 — 53872d1b — fully_identify_obj EGG learn_egg_type arm

Metadata: SHA `53872d1b` (D-2241). Queue row `timeout.c`
learn_egg_type, no corpus block. js/ invent.js +3/−2 (one gated call +
one import).

## Intent vs deliverable

Subject promises the C tail arm of `fully_identify_obj`: identifying an
egg teaches the egg type. Diff adds exactly the two-line gate + call in
C position (after `set_cknown_lknown`, last in the body). Promise kept.

## Inventory

Changed: `fully_identify_obj` only. No new functions. One callee:
`learn_egg_type` — LIVE (`sym.mjs`: `js/timeout.js:1893 sync`),
called sync-in-sync, no missing await. New static edge
invent.js → timeout.js mirrors the pre-existing reverse edge
(timeout.js:48 `update_inventory`); D-log cites `--can` hoisted,
cycle-safe, plus a static import smoke — accepted as stated (no new
top-level read introduced by the call itself).

## C ↔ JS fidelity

Full C body is 12 lines (`invent.c:2636–2647`, `csym.mjs` range):

```c
makeknown(otmp->otyp);
if (otmp->oartifact)
    discover_artifact((xint16) otmp->oartifact);
observe_object(otmp);
otmp->known = otmp->bknown = otmp->rknown = 1;
set_cknown_lknown(otmp);
if (otmp->otyp == EGG && otmp->corpsenm != NON_PM)
    learn_egg_type(otmp->corpsenm);
```

JS already had every line but the last arm; the added gate
`(otyp|0) === EGG && (corpsenm|0) !== NON_PM` matches C exactly
(including the house `| 0` idiom shared with the neighboring STATUE
arm), and `learn_egg_type(corpsenm|0)` passes the un-narrowed corpsenm
as C does. Draw-free by construction (guard is pure state;
`learn_egg_type` draws nothing), so no fortress RNG movement is
possible on any path. Downstream reader (`knowsEgg` objnam.js:2944)
already live per D-log.

## Hallucinations / overclaim

None. Vacuous-0 labeled as vacuous, /tmp probe reported as probe, map
retirement scoped (turns.md:392 only; pray-gift/save-rest stays named).

## Density

Minimal diff for a 2-line C arm; C is that small (in-band).

## Verification

Audit re-ran the corpus claim itself:

```text
verify learn_egg_type: baseline 53872d1b~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 +
cohort 7/7 pasted. Diff grep: no FORCE/DIAG/`getRngLog`/seed/
fastforward/coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
