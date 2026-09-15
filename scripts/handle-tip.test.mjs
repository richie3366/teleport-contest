import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { handle_tip } from "../js/hack.js";
import { TIP_GETPOS, NUM_TIPS } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: hack.c handle_tip — `if (!flags.tips) return FALSE`, once-per-bit
// via svc.context.tips, out-of-range tip returns FALSE.
// These paths touch no display/input, so they run without a session.
// The enabled first-time arm shows the nhcore.lua tip menu (needs nhgetch);
// it is covered by session verify, not here.
describe("handle_tip TIP_GETPOS guards", () => {
  let savedFlags;
  let savedContext;
  beforeEach(() => {
    savedFlags = game.flags;
    savedContext = game.context;
  });
  afterEach(() => {
    game.flags = savedFlags;
    game.context = savedContext;
  });

  it("returns false and sets no bit when tips are disabled", async () => {
    game.flags = { tips: false };
    game.context = {};
    assert.equal(await handle_tip(TIP_GETPOS), false);
    assert.equal(game.context.tips | 0, 0);
  });

  it("returns false without display when the bit is already set", async () => {
    game.flags = { tips: true };
    game.context = { tips: 1 << TIP_GETPOS };
    assert.equal(await handle_tip(TIP_GETPOS), false);
    assert.equal(game.context.tips, 1 << TIP_GETPOS);
  });

  it("returns false for out-of-range tips", async () => {
    game.flags = { tips: true };
    game.context = {};
    assert.equal(await handle_tip(NUM_TIPS), false);
    assert.equal(await handle_tip(-1), false);
    assert.equal(game.context.tips | 0, 0);
  });
});
