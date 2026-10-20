# Review 3019 — 878852b8f — dismount_steed moves the hero with the real teleds

- SHA: `878852b8f` (cliff; board row dismount_steed,
  scen-sweep-Barbarian-610041 s1017, infravisible `h` 2 screens late)
- D-entry: D-4179; Ledger: dismount_steed ported
- `js/` diff: steed.js +6 −35

## Intent vs deliverable

Promise: steed.c dismount_steed moves the hero with the real teleds
(`:765`). teleds runs `newsym(u.ux0, u.uy0); see_monsters();
vision_full_recalc = 1; vision_recalc(0)` before spoteffects. JS called
teleds_simple, a local subset with no see_monsters or spoteffects, and
ended with `vision_recalc(1)` where C only sets the flag (`:815`).

Diff: the hero-first arm calls `teleds(cc.x, cc.y, TELEDS_ALLOW_DRAG)`.
teleds_simple is deleted. The tail sets `game.vision_full_recalc = 1`,
and the unused vision_recalc import is dropped. The promise matches the
diff.

## Inventory

- dismount_steed — steed.js:1001/:1033 (C steed.c:575–822): two
  statements changed, header comment rewritten.
- teleds_simple — deleted (clone of teleport.c teleds).
- teleds — teleport.js:1413 (existing import, already used at
  steed.js:779 for mounting).

## C ↔ JS fidelity

- **Hero-first arm.** C (steed.c:756–772): `if (!DEADMONSTER(mtmp))`,
  then `gi.in_steed_dismounting = TRUE; teleds(cc.x, cc.y,
  TELEDS_ALLOW_DRAG); if (sobj_at(BOULDER, …)) sokoban_guilt();
  gi.in_steed_dismounting = FALSE; if (save_utrap) mintrap(mtmp, …)`.
  JS has the same sequence, now with the real teleds.
- **What the clone dropped.** teleds_simple lacked see_monsters,
  spoteffects, switch_terrain, the vault guard, invocation_message and
  the utrap/ball-drag handling. In_steed_dismounting still guards
  spoteffects' pickup, as C intends.
- **Tail.** C (`:808–815`) is `float_down(0L, W_SADDLE)` inside
  in_steed_dismounting, `disp.botl = TRUE`, `encumber_msg()`, then
  `gv.vision_full_recalc = 1`. JS now sets the flag the moveloop
  consumes (allmain.js:1497, `g.vision_full_recalc`), the same field as
  the other 30+ JS setters. The immediate `vision_recalc(1)` is gone, so
  JS no longer repaints vision earlier than C.

`sym.mjs` on the deleted and re-pointed names:

```text
teleds_simple    NOT FOUND in js/** (no export, no local function/const).
teleds           js/teleport.js:1413   ASYNC — await required
```

Both steed.js teleds calls are awaited.

## Hallucinations / overclaim

None. The header still names update_mon_extrinsics as an omission,
which is accurate. The board note reports an accidental full rescore
through an empty `--ids`, which is honest.

## Density

A clone deleted in favour of the live C function, measured with a
setCell hook plus a temp log at teleds' see_monsters that never fired.
Right-sized.

## Verification

```text
verify dismount_steed,teleds --base 878852b8f~1 --no-reach
  dismount_steed: 1 PASS (scen-sweep-Barbarian-610041) → PROGRESS
  teleds:         0 blocked (vacuous)
```

This reproduces the claim. The audit's full rescore shows 0 PASS→FAIL.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
