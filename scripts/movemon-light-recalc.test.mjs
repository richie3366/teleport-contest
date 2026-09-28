import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { movemon } from "../js/mon.js";
import { any_light_source } from "../js/light.js";

// C ref: light.c:718-722 any_light_source (`gl.light_base != NULL`) and
// mon.c movemon `:1332-1333` (post-loop `vision_full_recalc = 1` when a
// mon may have moved with a light source). Regression: scen-tour-Samurai
// step 54 painted floor over a demon that C shows, because the mid-loop
// `:1258` recalc (D-3012) consumed the flag on transient positions and the
// missing post-loop set left no final recalc to repaint it.
describe("movemon any_light_source vision arm (mon.c:1332-1333)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      fmon: game.fmon,
      vision: game.vision_full_recalc,
      context: game.context,
      lights: game.light_base,
      somebody: game._somebody_can_move,
    };
    game.u = {};
    game.fmon = [];
    game.vision_full_recalc = 0;
    game.context = {};
    game.light_base = [];
  });
  afterEach(() => {
    game.u = saved.u;
    game.fmon = saved.fmon;
    game.vision_full_recalc = saved.vision;
    game.context = saved.context;
    game.light_base = saved.lights;
    game._somebody_can_move = saved.somebody;
  });

  it("any_light_source mirrors C emptiness (not identity)", () => {
    game.light_base = [];
    assert.equal(any_light_source(), false);
    game.light_base = [{ type: 2, x: 19, y: 4, range: 1, flags: 1 }];
    assert.equal(any_light_source(), true);
    game.light_base = undefined;
    assert.equal(any_light_source(), false);
  });

  it("sets vision_full_recalc post-loop when a light exists", async () => {
    game.light_base = [{ type: 2, x: 19, y: 4, range: 1, flags: 1 }];
    await movemon();
    assert.equal(game.vision_full_recalc, 1);
  });

  it("leaves the flag shut with no lights", async () => {
    game.light_base = [];
    await movemon();
    assert.equal(game.vision_full_recalc, 0);
  });
});
