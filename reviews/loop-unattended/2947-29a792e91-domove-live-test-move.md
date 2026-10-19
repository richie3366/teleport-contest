# Review 2947 — 29a792e91 — domove_core calls the live test_move(DO_MOVE)

- SHA: `29a792e91` (cliff, board owner `test_move`, 3 rows)
- D-entry: D-4107; Ledger: test_move partial
  js=hack.js:test_move+cmd.js:travel_test_move
- `js/` diff: `js/cmd.js` +14/−302, `js/hack.js` −34

## Intent vs deliverable

Promise: cmd.js domove inlined a 255-line fragment copy of test_move.
Its closed-door arm had no Passes_walls / ooze / Underwater / tunnels /
amorphous branches, so an amorphous hero bumped into the door where C
says «You try to ooze under the door, but can't squeeze your possessions
through.». Diff: the inline span is deleted. domove calls the live
hack.js `test_move(u.ux, u.uy, dx, dy, DO_MOVE)` with C's failure tail.
Dead code is removed: the cmd.js copy `mention_walls_obstructed`, the
three hack.js fragment helpers, and the imports only the copy used.
Promise = diff.

## Inventory

- domove_core test_move call — cmd.js (after trapmove, before
  swim_move_danger); C hack.c :2843–2848.
- Callee `test_move` — hack.js:423, ASYNC (awaited); C hack.c :995–1276.
  LIVE.
- Deleted: `test_move_hero_chews_bars`, `test_move_boulder_is_blocking`,
  `test_move_run_blocked_by_boulder` (hack.js), `mention_walls_obstructed`
  (cmd.js).

```text
test_move_hero_chews_bars NOT FOUND in js/** (no export, no local function/const).
test_move_boulder_is_blocking NOT FOUND in js/** (no export, no local function/const).
test_move_run_blocked_by_boulder NOT FOUND in js/** (no export, no local function/const).
mention_walls_obstructed NOT FOUND in js/** (no export, no local function/const).
test_move        js/hack.js:423   ASYNC — await required
```

## C ↔ JS fidelity

```c
if (u.utrap) { boolean moved = trapmove(x, y, NULL); … if (!moved) return; }
if (!test_move(u.ux, u.uy, x - u.ux, y - u.uy, DO_MOVE)) {
    if (!svc.context.door_opened) { svc.context.move = 0; nomul(0); }
    return;
}
if (swim_move_danger(x, y)) { svc.context.move = 0; nomul(0); return; }
```

The JS has the same three blocks in the same order: trapmove (with
reset_utrap on escape), then test_move with the `door_opened` guard
around `move = 0; nomul(0)`, then swim_move_danger. The arguments are
deltas (`newx - u.ux`), as C passes them. The live test_move's
closed-door arm was spot-checked against C :1082–1097: Passes_walls →
«ooze under the door.», Underwater → «try to ooze… can't squeeze your
possessions through.» (hack.js:502/:513). Its ordering of the
door-open (`doopen_indir`) arm, the boulder/run-abort gate (:1216–1221)
and bars chewing (:1025–1028) now follow C instead of the copy's
subset. The RNG draws inside test_move (doopen's rnl, autodig) come from
one body now, not two.

The JS swim_move_danger arm also calls `end_running(true)`. That code
predates this commit (not in this diff).

## Hallucinations / overclaim

None. The Ledger keeps `test_move partial` for the cmd.js
`travel_test_move` clone and names its four missing arms. That is a
named clone for TEST_TRAV, not a stub in a live arm.

## Density

One owner, with the call site wired whole and a net −322 lines. This is
the right cliff.

## Verification

```text
verify test_move (--base 29a792e91~1): 3 blocked
  scen-extcmd-Rogue-51256003: PASS
  scen-sweep-Knight-610057: PASS
  scen-sweep-Samurai-620029: PASS
verify test_move: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify domove_core: 0 blocked at the parent board
```

Exact match with the D-log. Full public 44/44 on HEAD. A 300-line
deletion on the movement hot path held all 44 public sessions and the
D-log's 662-session sweep.

## Actionable C-wrongs

None new (travel_test_move is named in the ledger).

Verdict: **ACCEPT**
