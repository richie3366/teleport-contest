# Review 1683 — 1f40ed0e3 — `end.c` done_object_cleanup remainder (D-2724)

Metadata: commit `1f40ed0e3`, D-2724, `js/end.js` + `js/save.js` + `js/cmd.js` (+51/−36 js/end, +28 js/save, +5 js/cmd) plus docs/map/test. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: `:854` + `:886–890` + `:894–897` → live, exported, callers wired. The diff delivers exactly that: `inven_inuse(TRUE)` head, uchain → `lift_covet_and_placebc(-1)` arm, perm_invent clear + `perm_invent_toggled(true)` tail, `export async`, `really_done` + `dosave0` awaited, plus a real `useup` import-source fix. Promise matches deliverable.

## Inventory

Changed/added JS: `done_object_cleanup` (`js/end.js`, now `export async`); `dosave0` (`js/save.js`, now `export async`, calls `done_object_cleanup`); `inven_inuse` (`js/save.js:736`, newly exported, `useup` source `./eat.js`→`./invent.js`); `dosave` await fix; `end_of_input` (`js/cmd.js`, floats `dosave0` with note). New `scripts/done-object-cleanup.test.mjs` (2 tests). No deleted symbols.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (re-pointed + newly imported names):

```text
useup            js/invent.js:4596   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/detect.js:215  js/potion.js:331  js/read.js:260  js/spell.js:625
lift_covet_and_placebc js/ball.js:489   ASYNC — await required
perm_invent_toggled js/invent.js:987   sync
inven_inuse      js/save.js:736   ASYNC — await required
```

All callees LIVE: `useup` is a sync live export (the old `./eat.js` source never re-exported it — `useup is not a function` whenever an in_use item existed, so the re-point is a genuine crash fix); `lift_covet_and_placebc` is live async and awaited; `perm_invent_toggled` live sync; dynamic `import()` used for end→save / end→ball / save→end CHECK edges, consistent with the existing allmain shape. No STUB in any live arm.

## C ↔ JS fidelity

C locus read: `done_object_cleanup — end.c:850-903` (csym range; message cites `:850–903`). Branch-by-branch:

- `:854` `inven_inuse(TRUE)` ✓ now first statement, awaited (async house shape).
- `:873–877` ox/oy + `isok`/`accessible` gate ✓ pre-existing, untouched.
- `:878–885` thrown/kicked OBJ_FREE → `place_object` + `stackobj` + clear ✓ pre-existing (D-0275), untouched.
- `:886–890` `uchain && where==OBJ_FREE` → `lift_covet_and_placebc(override_restriction)` ✓: C checks uchain only (not uball) and JS matches; `-1` is exact (`hack.h:110`: `enum bcargs {override_restriction = -1}`); dead `placebc()` comment correctly not ported.
- `:894–897` `perm_invent FALSE` + `perm_invent_toggled(TRUE)` ✓ exact.
- Callers (`--callers`: `end.c:1157` really_done, `save.c:98` dosave0, `save.c:1111` freedynamicdata): really_done awaits under `!panicking` ✓ with `perm_invent=false` after — matching C `:1158` ("in case we're panicking; normally cleared by done_object_cleanup()"); dosave0 `:98` awaits ✓; `:1111` freedynamicdata named with no JS counterpart (save-freeing teardown, NOTES-guarded class) ✓.
- RNG: no draw added/removed/reordered.

One impedance note (disclosed inline in `cmd.js`, hangup-path only, no corpus/RNG effect): C `end_of_input`→`dosave0` is sync; JS `dosave0` is now async and floats there since neither `end_of_input` nor its hangup callers have an await point. Disclosed, not hidden.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate hits in the `js/` hunks. Named omits (`freedynamicdata`, dosave0 `:80–96` preamble, `accessible` closed_door approx) are in the message and the map section.

## Density

Breadth-phase remainder completion: three missing arms + export + two callers wired + a crash fix, three small modules, no new static edges. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base 1f40ed0e3~1 --reach-all`) — both lines, matching the D-log:

```text
verify done_object_cleanup: baseline 1f40ed0e3~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify done_object_cleanup: no corpus session is blocked on it at 1f40ed0e3~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke done_object_cleanup: no RNG-tagged reach; fixed smoke spread (24 run, 6.3s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort/full-44 per D-log; new unit test 2/2; Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
