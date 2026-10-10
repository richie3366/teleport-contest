import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { doeat } from "../js/eat.js";
import { objectNames, objects, FOOD_CLASS } from "../js/objects.js";
import { OBJ_INVENT } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { clear_nhwindow_message, getmsghistory } from "../js/display.js";
import { pushKeys, resetInputState } from "../js/input.js";

// C ref: eat.c fprefx `:2110` stale_egg arm — stale_egg(egg) is
// obj.h:316-317 `(moves - age) > 2*MAX_EGG_HATCH_TIME`, and
// MAX_EGG_HATCH_TIME is obj.h:315 `200`, so the rotten threshold is a
// 400-move gap. scen-chain-Archeologist-95408 step 611: C prints
// "Ugh.  Rotten egg." + d(10,4) while JS printed "delicious" (the JS
// gate used 2*400). Drives exported doeat with a carried egg; the
// stale egg sits strictly between the C and the old JS thresholds.
const EGG = objectNames.indexOf("EGG");

describe("fprefx stale_egg threshold (eat.c:2110, obj.h:315-317)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      invent: game.invent,
      context: game.context,
      flags: game.flags,
      moves: game.moves,
      level: game.level,
      iflags: game.iflags,
      program_state: game.program_state,
      objects: game.objects,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.invent = saved.invent;
    game.context = saved.context;
    game.flags = saved.flags;
    game.moves = saved.moves;
    game.level = saved.level;
    game.iflags = saved.iflags;
    game.program_state = saved.program_state;
    game.objects = saved.objects;
  });

  const setup = (age) => {
    initRng(4242);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    resetInputState();
    pushKeys(["a", " ", " ", " ", " ", " "]);
    game.moves = 1000;
    game.objects = objects;
    game.u = { ux: 5, uy: 5, uhp: 30, uhpmax: 30, uhunger: 500, uconduct: {} };
    game.context = {};
    game.flags = {};
    game.program_state = {};
    const egg = {
      otyp: EGG,
      oclass: FOOD_CLASS,
      quan: 1,
      age,
      corpsenm: -1,
      invlet: "a",
      where: OBJ_INVENT,
      cursed: 0,
      blessed: 0,
    };
    game.invent = [egg];
    // The getmsghistory ring is append-only across subtests (walking it
    // does not drain); slice off this subtest's suffix after doeat.
    return messages().length;
  };

  const messages = () => {
    const seen = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
      seen.push(m);
    }
    return seen.join("\n");
  };

  it("fresh egg (gap 10) → give_feedback delicious", async () => {
    const base = setup(990);
    assert.equal(await doeat(), 1);
    const text = messages().slice(base);
    assert.match(text, /delicious/);
    assert.ok(!/Rotten egg/.test(text));
  });

  it("stale egg (gap 500, C threshold 400) → Ugh. Rotten egg.", async () => {
    const base = setup(500);
    assert.equal(await doeat(), 1);
    const text = messages().slice(base);
    assert.match(text, /Rotten egg/);
    assert.ok(!/delicious/.test(text));
  });
});
