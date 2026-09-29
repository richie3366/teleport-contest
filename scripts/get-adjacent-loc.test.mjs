import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { get_adjacent_loc } from "../js/lock.js";
import { game } from "../js/gstate.js";
import { CMDQ_KEY } from "../js/const.js";
import { pushKeys, resetInputState } from "../js/input.js";

// C ref: cmd.c get_adjacent_loc `:3931–3953` (restart: live isok gate,
// Never_mind const, C order; the (prompt, emsg) → {x,y}|null shape is
// kept — every C call site passes u.ux/u.uy and takes cc as out-param).
// Driven headless through a canned CMDQ_KEY like getdir-confdir.test.mjs:
// no nhgetch is reached on these arms.
describe("get_adjacent_loc (cmd.c:3931-3953)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      canned: game._cmdq_canned,
      repeat: game._cmdq_repeat,
      in_doagain: game.in_doagain,
    };
    game._cmdq_canned = [];
    game._cmdq_repeat = [];
    game.in_doagain = 0;
    resetInputState();
    pushKeys([" ", " "]);
  });
  afterEach(() => {
    game.u = saved.u;
    game._cmdq_canned = saved.canned;
    game._cmdq_repeat = saved.repeat;
    game.in_doagain = saved.in_doagain;
    resetInputState();
  });

  it("returns the adjacent cell on a valid direction (C :3941-3945)", async () => {
    game.u = { ux: 5, uy: 5, dx: 0, dy: 0, dz: 0 };
    game._cmdq_canned = [{ typ: CMDQ_KEY, key: "h" }];
    assert.deepEqual(await get_adjacent_loc(null, null), { x: 4, y: 5 });
  });

  it("returns null off-map and plines emsg (C :3943-3949)", async () => {
    game.u = { ux: 1, uy: 5, dx: 0, dy: 0, dz: 0 };
    game._cmdq_canned = [{ typ: CMDQ_KEY, key: "h" }];
    assert.equal(await get_adjacent_loc(null, "Invalid location!"), null);
  });

  it("returns null with Never mind when getdir fails (C :3937-3939)", async () => {
    game.u = { ux: 5, uy: 5, dx: 0, dy: 0, dz: 0 };
    game._cmdq_canned = [{ typ: CMDQ_KEY, key: " " }]; // QUITCHARS → false
    assert.equal(await get_adjacent_loc(null, null), null);
  });
});
