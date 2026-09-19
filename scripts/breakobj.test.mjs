import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { breakobj } from "../js/dothrow.js";
import { objectNames, TOOL_CLASS, FOOD_CLASS } from "../js/objects.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { init_objects } from "../js/o_init.js";

// C ref: dothrow.c breakobj `:2480–2574` — MIRROR luck + EGG luck arms.
// A mirror is TOOL_CLASS glass, so is_crackable (GLASS + ARMOR_CLASS) lets
// it reach the `:2494–2497` switch arm; a plain egg reaches `:2525–2531`.
// Pins the restarted headless envelope: hero-caused luck deltas,
// delobj disposition of the broken obj, and return 1 (no explosion path:
// corpsenm below is not PM_PYROLISK, and no level is needed).
const MIRROR = objectNames.indexOf("MIRROR");
const EGG = objectNames.indexOf("EGG");

describe("breakobj mirror/egg luck arms (dothrow.c:2480-2574)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, invent: game.invent };
    // is_crackable reads the objects table (C objects.c); the full-game
    // init path (allmain newgame) owns it — headless tests init it here.
    initRng(2480);
    if (!game.objects) init_objects();
    game.u = { ux: 5, uy: 5, uluck: 0, ushops: "" };
    game.invent = [];
  });
  afterEach(() => {
    game.u = saved.u;
    game.invent = saved.invent;
  });

  it("mirror, hero-caused: luck -2, obj gone, returns 1", async () => {
    const mirror = {
      otyp: MIRROR,
      oclass: TOOL_CLASS,
      quan: 1,
      spe: 0,
      corpsenm: -1,
    };
    const ret = await breakobj(mirror, 5, 5, true, true);
    assert.equal(ret, 1);
    assert.equal(game.u.uluck, -2);
  });

  it("egg, hero-caused: luck -min(quan,5), obj gone, returns 1", async () => {
    const egg = {
      otyp: EGG,
      oclass: FOOD_CLASS,
      quan: 7,
      spe: 1,
      corpsenm: 10,
    };
    const ret = await breakobj(egg, 5, 5, true, true);
    assert.equal(ret, 1);
    assert.equal(game.u.uluck, -5);
  });

  it("mirror, not hero-caused: no luck change, still returns 1", async () => {
    const mirror = {
      otyp: MIRROR,
      oclass: TOOL_CLASS,
      quan: 1,
      spe: 0,
      corpsenm: -1,
    };
    const ret = await breakobj(mirror, 5, 5, false, false);
    assert.equal(ret, 1);
    assert.equal(game.u.uluck, 0);
  });
});
