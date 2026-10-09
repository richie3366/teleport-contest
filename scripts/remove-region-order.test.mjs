import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { remove_region } from "../js/region.js";

// C ref: region.c remove_region `:343–386` — the list drop is
// swap-with-last (`:355–357`: `--n_regions != i` moves the last entry
// into the freed slot), NOT order-preserving. Survivors after i keep
// their indices; run_regions processes clouds in list order, so splice
// reorders later clouds' damage draws (scen-sweep-Barbarian-95309
// step 239: C rnd(12) vs JS rnd(8), same inside_gas_cloud arm).
describe("remove_region swap-with-last (region.c:355-357)", () => {
  let saved;
  beforeEach(() => {
    saved = { regions: game.regions };
  });
  afterEach(() => {
    game.regions = saved.regions;
  });

  const mkreg = (tag) => ({
    tag,
    rects: [{ lx: 1, ly: 1, hx: 1, hy: 1 }],
    monsters: [],
    n_monst: 0,
    ttl: 5,
    visible: false,
  });
  const tags = () => (game.regions || []).map((r) => r.tag);

  it("removing the head moves the last region into slot 0", () => {
    const a = mkreg("a");
    const b = mkreg("b");
    const c = mkreg("c");
    game.regions = [a, b, c];
    remove_region(a);
    assert.deepEqual(tags(), ["c", "b"]);
    assert.equal(a.ttl, -2);
    assert.equal(a.rects, null);
  });

  it("removing the middle keeps the head, swaps the tail", () => {
    const a = mkreg("a");
    const b = mkreg("b");
    const c = mkreg("c");
    game.regions = [a, b, c];
    remove_region(b);
    assert.deepEqual(tags(), ["a", "c"]);
  });

  it("removing the tail is a plain pop", () => {
    const a = mkreg("a");
    const b = mkreg("b");
    game.regions = [a, b];
    remove_region(b);
    assert.deepEqual(tags(), ["a"]);
  });

  it("unknown region is a silent no-op (C :351-352)", () => {
    const a = mkreg("a");
    game.regions = [a];
    assert.doesNotThrow(() => remove_region(mkreg("ghost")));
    assert.deepEqual(tags(), ["a"]);
  });
});
