import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { cleanup_burn, property_by_index, wiz_timeout_queue_lines } from "../js/timeout.js";
import { TIMEOUT_FUNC_NAMES, start_timer, stop_timer, obj_stop_timers } from "../js/mkobj.js";
import {
  TIMER_OBJECT, BURN_OBJECT, OBJ_FLOOR, OBJ_INVENT, LS_OBJECT,
  INVULNERABLE, STONED, LIFESAVED,
} from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: timeout.c print_queue `:2014–2037` (VERBOSE_TIMER `:1963` live arm),
// cleanup_burn `:1828–1844`, property_by_index `:117–125`.
// Headless notes: the `void impossible` arms (cleanup_burn !lamplit
// `:1832–1835`, del_light_source not-found) fire --More--capable async
// plines, so only lit-with-light-source cases are pinned; the !lamplit
// arm is C-ordered `void impossible` + return (end_burn precedent).
// update_inventory early-returns when !in_moveloop, so the invent arm
// pins call-through only. No RNG is drawn on any pinned arm.

describe("timeout.c print_queue / cleanup_burn / property_by_index", () => {
  let saved;
  beforeEach(() => {
    saved = {
      moves: game.moves,
      timer_id: game.timer_id,
      timer_base: game._timer_base,
      light_base: game.light_base,
      u: game.u,
      level: game.level,
      regions: game.regions,
    };
    game.moves = 100;
    game.timer_id = 1;
    game._timer_base = null;
    game.light_base = [];
    game.u = {};
    game.level = undefined;
    game.regions = [];
  });
  afterEach(() => {
    game.moves = saved.moves;
    game.timer_id = saved.timer_id;
    game._timer_base = saved.timer_base;
    game.light_base = saved.light_base;
    game.u = saved.u;
    game.level = saved.level;
    game.regions = saved.regions;
  });

  const mklamp = (o_id, where) => ({ o_id, where, lamplit: 1, age: 500, timed: 0 });
  const mkls = (id) => ({ x: 1, y: 1, range: 3, type: LS_OBJECT, id, flags: 0 });

  it("property_by_index returns names in propertynames order (`:117–125`)", () => {
    const out = { p: -1 };
    assert.equal(property_by_index(0, out), "invulnerable");
    assert.equal(out.p, INVULNERABLE);
    assert.equal(property_by_index(1, out), "petrifying");
    assert.equal(out.p, STONED);
  });

  it("property_by_index clamps OOB to the { 0, 0 } sentinel (`:113`, `:119–120`)", () => {
    const out = { p: -1 };
    assert.equal(property_by_index(-1, out), null);
    assert.equal(out.p, 0);
    assert.equal(property_by_index(999, out), null);
    assert.equal(out.p, 0);
    assert.equal(property_by_index(3, null), "strangling"); // NO_NNARGS: null out-param
    assert.equal(property_by_index(67, out), "life will be saved");
    assert.equal(out.p, LIFESAVED);
  });

  it("TIMEOUT_FUNC_NAMES order matches timeout_funcs (`:1978–1990`)", () => {
    assert.equal(TIMEOUT_FUNC_NAMES.length, 9);
    assert.deepEqual(TIMEOUT_FUNC_NAMES.slice(0, 5),
      ["rot_organic", "rot_corpse", "revive_mon", "zombify_mon", "burn_object"]);
    assert.equal(TIMEOUT_FUNC_NAMES[8], "melt_ice_away");
  });

  it("print_queue renders the VERBOSE name(ptr) arm (`:2024–2028`)", () => {
    const lamp = mklamp(42, OBJ_FLOOR);
    game._timer_base = {
      next: null, timeout: 150, tid: 7, kind: TIMER_OBJECT,
      action: BURN_OBJECT, obj: lamp, mon: null, a_long: 0,
    };
    const lines = wiz_timeout_queue_lines();
    assert.equal(lines[0], "Current time = 100.");
    assert.ok(lines.includes("timeout  id   kind   call"));
    assert.equal(lines.find((l) => l.includes("burn_object")),
      "  150      7  object burn_object(0x2a)");
    assert.ok(lines.includes("No timed properties."));
  });

  it("print_queue renders <empty> on a null base (`:2018–2020`)", () => {
    game._timer_base = null;
    assert.ok(wiz_timeout_queue_lines().includes(" <empty>"));
  });

  it("cleanup_burn dels the light, restores age, clears lamplit (`:1837–1842`)", () => {
    const lamp = mklamp(11, OBJ_FLOOR);
    game.light_base = [mkls(lamp)];
    cleanup_burn(lamp, 140);
    assert.equal(lamp.lamplit, 0);
    assert.equal(lamp.age, 540); // 500 + (140 - 100)
    assert.equal(game.light_base.length, 0);
    // Carried objects route through update_inventory (early-returns here:
    // !in_moveloop — pinning the branch, not the UI sync).
    const carried = mklamp(21, OBJ_INVENT);
    game.light_base = [mkls(carried)];
    cleanup_burn(carried, 110);
    assert.equal(carried.lamplit, 0);
    assert.equal(carried.age, 510);
    assert.equal(game.light_base.length, 0);
  });

  it("stop_timer dispatches cleanup_burn for BURN_OBJECT (`:2311–2312`)", () => {
    const lamp = mklamp(12, OBJ_FLOOR);
    game.light_base = [mkls(lamp)];
    assert.equal(start_timer(40, TIMER_OBJECT, BURN_OBJECT, lamp), true);
    assert.equal(lamp.timed, 1);
    assert.equal(stop_timer(BURN_OBJECT, lamp), 40); // expire(140) - moves(100)
    assert.equal(lamp.timed, 0);
    assert.equal(lamp.lamplit, 0); // via cleanup_burn, not the old inline arm
    assert.equal(lamp.age, 540);
    assert.equal(game.light_base.length, 0);
  });

  it("obj_stop_timers fires cleanup_burn per node (`:2389–2390`)", () => {
    const lamp = mklamp(13, OBJ_FLOOR);
    game.light_base = [mkls(lamp)];
    assert.equal(start_timer(40, TIMER_OBJECT, BURN_OBJECT, lamp), true);
    obj_stop_timers(lamp);
    assert.equal(lamp.timed, 0);
    assert.equal(lamp.lamplit, 0);
    assert.equal(lamp.age, 540);
    assert.equal(game.light_base.length, 0);
  });
});
