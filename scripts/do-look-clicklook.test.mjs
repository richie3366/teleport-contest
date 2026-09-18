import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { do_look } from "../js/pager.js";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";

// C ref: pager.c do_look `:1673–1963` clicklook arm (mode 2, `:1802–1807`).
// Clicklook takes its cell from click_cc and skips the menu, getpos and
// checkfile entirely, looping exactly once. Pins the input-free path
// headless: no nhgetch is reached, ECMD_OK returns, flags.verbose restores.
describe("do_look clicklook (pager.c mode 2)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      flags: game.flags,
      level: game.level,
      fmon: game.fmon,
      pending: game._pending_message,
    };
    // A prior pline can leave TOPLINE_NEED_MORE set, so the next pline
    // takes more(); feed dismissals and drop leftovers after each test.
    resetInputState();
    pushKeys([' ', ' ']);
    game.u = { ux: 5, uy: 5, uswallow: 0 };
    game.flags = { verbose: true, help: true, lootabc: false };
    game.level = {
      at: () => ({ typ: 0, doormask: 0, roomno: 0, flags: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game._pending_message = saved.pending;
    resetInputState();
  });

  it("returns ECMD_OK with no input and restores verbose", async () => {
    const r = await do_look(2, { x: 5, y: 5 });
    assert.equal(r, 0);
    assert.equal(game.flags.verbose, true);
  });

  it("restores verbose=false and tolerates a null cell", async () => {
    game.flags.verbose = false;
    const r = await do_look(2, null);
    assert.equal(r, 0);
    assert.equal(game.flags.verbose, false);
  });
});
