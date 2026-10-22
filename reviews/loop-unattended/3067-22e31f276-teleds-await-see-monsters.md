# Review 3067 — 22e31f276 — teleds awaits see_monsters before vision_recalc

- SHA: `22e31f276` (cliffs rows newsym ×7 + impossible ×3, scen-vault-*,
  e.g. Monk-53456007 step 365)
- D-entry: D-4227; Ledger: teleds ported (unchanged status, D-id
  added)
- `js/` diff: teleport.js +4 −2

## Intent vs deliverable

Promise: teleport.c teleds runs `newsym(u.ux0, u.uy0)` `:536`,
`see_monsters()` `:537`, then `vision_recalc(0)` `:541`. With a guard
parked at <0,0>, see_monsters' newsym raises display.c's column-0
impossible(). Its pline flushes the map while the destination square
still shows the remembered «$». JS called the async see_monsters
without `await`, so vision_recalc painted «@» before the impossible's
--More-- was drawn.

Diff: `see_monsters();` → `await see_monsters();` plus a comment. The
diff matches the promise. It adds no helpers and deletes no symbols.

## Inventory

- teleds — js/teleport.js:1413 (C teleport.c `:447–573`, per
  `csym.mjs teleds`). Only the see_monsters line changed.
- Callee: see_monsters, LIVE and async.

```text
$ node scripts/sym.mjs see_monsters
see_monsters     js/display.js:7052   ASYNC — await required
```

  The call site was not re-pointed, only awaited.

## C ↔ JS fidelity

C display.c see_monsters `:1486–1529` vs js/display.js:7052:

- `defer_see_monsters` return, usteed/ustuck `meverseen` → match.
- fmon loop: DEADMONSTER skip, MON_STILL_ARRIVING skip, `newsym(mx,
  my)`, see_wsegs, Warn_of_mon count. JS matches, and turns newsym's
  `_newsym_misuse` into the awaited
  `impossible('newsym: attempting screen update for <%d,%d>')` at loop
  position, as C's newsym `:934` raises it inline.
- Sting_effects / warn_obj_cnt order → matches (D-4022 note).
- `if (!u.usteed) newsym(u.ux, u.uy)` → matches.

teleds tail, C `:536–541` vs JS `:1527–1539`: newsym(origin) →
**awaited** see_monsters → `vision_full_recalc = 1` → nomul(0) →
notice_mon_off → `await vision_recalc(0)`. Order and awaits now match.
Because of the await, the impossible's flush happens before
vision_recalc's display_self, which is the C order. No RNG change: the
same newsyms run, only the order of paints and plines changes.

I also read the rest of the body against C `:447–573` while I was in
it: vault_guard from findgd, the TT_BURIEDBALL arm, ball_active /
allow_drag / ball_still_in_range, reset_utrap, set_ustuck, ux0/uy0, the
mimic m_ap reset, the was_swallowed docrt, drag_ball/move_bc,
u_on_newpos, fill_pit, placebc, update_player_regions, materialize,
switch_terrain, the fake-urooms uleftvault, spoteffects,
invocation_message, notice_mon_on. All are present in C order, and
every async callee is awaited. One small point: JS's
`ball_active = !!(u.uball && where !== OBJ_FREE)` uses uball's
existence in place of `Punished`. That is the project-wide stand-in,
with no divergence while uball ⇔ Punished.

## Same-bug-class sites

The D-entry counts 27 other un-awaited `see_monsters()` calls. I
confirmed the count:

```text
artifact 3, attrib 1, detect 1, display 1, do 1, do_wear 9, eat 2,
polyself 3, potion 3, pray 1, sit 2, timeout 2, uhitm 1
```

teleport.c has exactly one see_monsters call (`:537`), and it is now
fixed. The rest belong to other C files' ports. Leaving them is correct
under same-C-file scope, and each only reorders when a guard is parked
at <0,0> at that moment, which no failing row reaches. That is honest
named debt and not a Must-fix of this SHA.

## Hallucinations / overclaim

None. The setCell hook and show_glyph_cell measurement (display_self ←
vision_recalc ← teleds inside the pending impossible) is concrete and
matches the code path.

## Density

One await, 10 rows, the cliffs head after D-4226. Right-sized.

## Verification

```text
hidden-proxy verify newsym,impossible,teleds --base 22e31f276~1 --no-reach
  verify newsym: baseline 22e31f276~1 (scoreboard at a90aa83e6) — 7 blocked
    Barbarian-53456010, Monk-53456007, Ranger-53456004, Rogue-53456008,
    Valkyrie-53455001, Valkyrie-53456037, Wizard-53456064: PASS
  verify newsym: 7 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  verify impossible: 3 PASS (Barbarian-53455008, Rogue-53456060,
    Samurai-53456070) → PROGRESS
  verify teleds: 0 blocked (vacuous; rows were owned by newsym/impossible)
```

At the SHA the D-log had newsym at 6 PASS and 1 moved past. My re-run
uses HEAD's code, so the seventh row's later PASS can come from
D-4228/D-4229; either way none is worse. Green 2/2, strict ×2, cohort 7/7,
full 44/44, sweep 760/0 regressed → REACH-OK. `--rulecheck` is clean,
and the diff has no FORCE, DIAG or seed reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
