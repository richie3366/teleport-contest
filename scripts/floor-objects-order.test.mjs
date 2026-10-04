import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { floor_objects } from "../js/detect.js";

// C ref: detect.c food_detect `:555–562` (and gold/object_detect) — the map
// loop walks the fobj nobj chain (newest first), not grid order. Order
// matters, not just membership: under hallucination each mapped object
// draws a display-RNG appearance, so grid order swaps appearances vs C
// (scen-impaired-Knight-94330 step 49: cream pie at (25,5) and ration at
// (5,8) showed '/' and '.' exchanged).
describe("floor_objects fobj-chain order (detect.c food_detect)", () => {
  let saved;
  beforeEach(() => {
    saved = { fobj: game.fobj, objects_at: game._objects_at };
  });
  afterEach(() => {
    if (saved.fobj === undefined) delete game.fobj;
    else game.fobj = saved.fobj;
    if (saved.objects_at === undefined) delete game._objects_at;
    else game._objects_at = saved.objects_at;
  });

  it("follows the nobj chain even when grid order disagrees", () => {
    // Grid x-order would yield A(5,8) before B(25,5); the fobj chain
    // (place_object prepends) yields B before A. C maps B first.
    const objA = { otyp: 293, ox: 5, oy: 8, nexthere: null, nobj: null };
    const objB = { otyp: 287, ox: 25, oy: 5, nexthere: null, nobj: objA };
    game.fobj = objB;
    game._objects_at = new Map([
      ["5,8", objA],
      ["25,5", objB],
    ]);
    assert.deepEqual(floor_objects(), [objB, objA]);
  });

  it("returns [] on an empty floor", () => {
    game.fobj = null;
    game._objects_at = new Map();
    assert.deepEqual(floor_objects(), []);
  });
});
