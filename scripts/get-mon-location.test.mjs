import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { get_mon_location } from "../js/timeout.js";
import { game } from "../js/gstate.js";

// C ref: zap.c get_mon_location `:692–709` + its sole caller
// light.c do_light_sources `:192` (locflags 0). House shape follows
// sibling get_obj_location: {x,y} on TRUE, null on FALSE.
describe("get_mon_location (zap.c:692-709)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, youmonst: game.youmonst };
    game.u = { ux: 5, uy: 7, usteed: null };
    game.youmonst = { _youmonst: true, mx: 0, my: 0 };
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
  });

  it("null mon reads FALSE (sibling null-guard idiom)", () => {
    assert.equal(get_mon_location(null, 0), null);
  });
  it("youmonst identity reads hero pos (C :695-699)", () => {
    assert.deepEqual(get_mon_location(game.youmonst, 0), { x: 5, y: 7 });
  });
  it("fresh _youmonst marker reads hero pos (mhitm idiom)", () => {
    assert.deepEqual(get_mon_location({ _youmonst: true }, 0), { x: 5, y: 7 });
  });
  it("usteed identity reads hero pos even at mx 0 (C :696)", () => {
    const steed = { mx: 0, my: 0 };
    game.u.usteed = steed;
    assert.deepEqual(get_mon_location(steed, 0), { x: 5, y: 7 });
  });
  it("mx>0 unburied reads mx,my (C :699-703)", () => {
    assert.deepEqual(get_mon_location({ mx: 10, my: 12 }, 0), { x: 10, y: 12 });
  });
  it("mx 0 migrating reads FALSE (C :704-707)", () => {
    assert.equal(get_mon_location({ mx: 0, my: 0 }, 0), null);
  });
  it("negative mx reads FALSE", () => {
    assert.equal(get_mon_location({ mx: -1, my: 3 }, 0), null);
  });
  it("buried mx>0 reads FALSE with locflags 0 (C :699)", () => {
    assert.equal(get_mon_location({ mx: 10, my: 12, mburied: 1 }, 0), null);
  });
  it("buried mx>0 reads mx,my with nonzero locflags (C :699)", () => {
    assert.deepEqual(get_mon_location({ mx: 10, my: 12, mburied: 1 }, 1), { x: 10, y: 12 });
  });
});
