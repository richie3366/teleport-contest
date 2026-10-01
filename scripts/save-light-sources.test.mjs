import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { RANGE_LEVEL, RANGE_GLOBAL } from "../js/const.js";
import { save_light_sources } from "../js/mkobj.js";

// C ref: light.c save_light_sources `:454–459` — a bad-type light source
// forces is_global = 0 (local) plus impossible(). Review 2184: the D-3224
// peel classified bad-type-with-id via light_is_local's `return false`
// fallthrough (global), inverted for both ranges.
describe("save_light_sources bad-type peel (light.c:454-459)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      light_base: game.light_base,
      vision_full_recalc: game.vision_full_recalc,
    };
  });
  afterEach(() => {
    if (saved.light_base === undefined) delete game.light_base;
    else game.light_base = saved.light_base;
    if (saved.vision_full_recalc === undefined) delete game.vision_full_recalc;
    else game.vision_full_recalc = saved.vision_full_recalc;
  });

  it("peels bad-type-with-id at RANGE_LEVEL (C :455 is_global = 0)", () => {
    const bad = { type: 99, id: {} };
    game.light_base = [bad];
    const peeled = save_light_sources(RANGE_LEVEL);
    assert.ok(peeled.includes(bad), "bad-type entry must be peeled (local)");
    assert.deepEqual(game.light_base, []);
  });

  it("keeps bad-type-with-id at RANGE_GLOBAL", () => {
    const bad = { type: 99, id: {} };
    game.light_base = [bad];
    const peeled = save_light_sources(RANGE_GLOBAL);
    assert.deepEqual(peeled, []);
    assert.ok(
      game.light_base.includes(bad),
      "bad-type entry must be kept (local)"
    );
  });
});
