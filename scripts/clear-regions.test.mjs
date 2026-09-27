import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { clear_regions, free_region } from "../js/region.js";
import { jsonClone } from "../js/lev_json.js";

// C ref: region.c free_region `:262–276` + clear_regions `:393–405`.
// C frees each region's rects/monsters/enter_msg/leave_msg in order,
// then drops the list (n_regions = 0, free array, max_regions = 0,
// NULL). GC owns the JS object itself; each C free() renders as a null
// release. save_regions Sfo-COPIES every record before the release_data
// clear (`:792–794`), so the do.js level-leave stash snapshots
// (jsonClone) before clear_regions frees the live objects.
describe("free_region / clear_regions (region.c:262-276, 393-405)", () => {
  let saved;
  beforeEach(() => {
    saved = { regions: game.regions };
  });
  afterEach(() => {
    game.regions = saved.regions;
  });

  const mkreg = () => ({
    bounding_box: { lx: 1, ly: 2, hx: 3, hy: 4 },
    rects: [{ lx: 1, ly: 2, hx: 3, hy: 4 }],
    nrects: 1,
    monsters: [7, 9],
    n_monst: 2,
    enter_msg: "in",
    leave_msg: "out",
    ttl: 5,
    visible: false,
  });

  it("free_region releases heap fields in C order, null-safe", () => {
    const reg = mkreg();
    free_region(reg);
    assert.equal(reg.rects, null);
    assert.equal(reg.monsters, null);
    assert.equal(reg.enter_msg, null);
    assert.equal(reg.leave_msg, null);
    // C `if (reg)` guard (`:265`): nullish/0 are silent no-ops.
    assert.doesNotThrow(() => free_region(null));
    assert.doesNotThrow(() => free_region(undefined));
    assert.doesNotThrow(() => free_region(0));
  });

  it("clear_regions frees each entry then empties the list", () => {
    const a = mkreg();
    const b = mkreg();
    game.regions = [a, b];
    clear_regions();
    assert.deepEqual(game.regions, []);
    for (const reg of [a, b]) {
      assert.equal(reg.rects, null);
      assert.equal(reg.monsters, null);
      assert.equal(reg.enter_msg, null);
      assert.equal(reg.leave_msg, null);
    }
  });

  it("stash snapshot survives the release_data clear (Sfo-copy order)", () => {
    game.regions = [mkreg()];
    // do.js level-leave stash ⇔ C save_regions Sfo writes: snapshot
    // BEFORE clear_regions (the `:792–794` release_data arm).
    const stashed = jsonClone(game.regions || [], []);
    clear_regions();
    assert.deepEqual(game.regions, []);
    assert.equal(stashed.length, 1);
    assert.equal(stashed[0].rects.length, 1);
    assert.equal(stashed[0].enter_msg, "in");
    assert.equal(stashed[0].leave_msg, "out");
    assert.deepEqual(stashed[0].monsters, [7, 9]);
  });
});
