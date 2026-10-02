import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { zap_over_floor } from "../js/zap.js";
import { COLNO, LAVAPOOL, ROOM, TT_LAVA, TT_INFLOOR } from "../js/const.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: zap.c zap_over_floor `:5293–5308` — a cold zap that freezes lava
// under the hero converts a TT_LAVA trap: Passes_walls walks out through
// the now-solid rock (reset_utrap), otherwise the hero is stuck in the
// cooling rock (set_utrap(rn1(50, 20), TT_INFLOOR)). The uinwater sibling
// arm (`:5294–5299`) is not covered here: it calls docrt() +
// switch_terrain(), which need full display infra beyond this harness.
const X = 12, Y = 10;
// C zap.h ZT_WAND(ZT_COLD): zaptype() is |type| outside -39..-30.
const ZT_WAND_COLD = 2;

describe("zap_over_floor lava underfoot (zap.c:5293-5308)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      viz_array: game.viz_array,
      ftrap: game.ftrap,
      flags: game.flags,
      iflags: game.iflags,
      moves: game.moves,
      disp: game.disp,
      context: game.context,
    };
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  const setup = (utraptype) => {
    initRng(4242);
    clear_nhwindow_message();
    // Lava cell under the hero, unseen (see_it false keeps the test off
    // the newsym/display path; the utrap arm runs regardless of vision).
    const cells = new Map();
    const at = (x, y) => {
      const k = y * COLNO + x;
      let c = cells.get(k);
      if (!c) {
        c = { typ: x === X && y === Y ? LAVAPOOL : ROOM };
        cells.set(k, c);
      }
      return c;
    };
    game.level = { at, flags: {} };
    game.u = { ux: X, uy: Y, uz: { dnum: 0, dlevel: 1 }, utrap: 5, utraptype };
    game.viz_array = [];
    game.flags = {};
    return () => cells.get(Y * COLNO + X);
  };

  it("stucks the hero infloor when lava freezes without Passes_walls", async () => {
    const loc = setup(TT_LAVA);
    const rangemod = await zap_over_floor(X, Y, ZT_WAND_COLD, { v: false }, true, 0);
    assert.equal(loc().typ, ROOM);
    assert.equal(rangemod, -3);
    assert.equal(game.u.utraptype, TT_INFLOOR);
    assert.ok(
      (game.u.utrap | 0) >= 20 && (game.u.utrap | 0) <= 69,
      `utrap ${game.u.utrap} must be rn1(50, 20)`,
    );
  });

  it("walks out through the now-solid rock with Passes_walls", async () => {
    const loc = setup(TT_LAVA);
    game.u.HPasses_walls = 1;
    await zap_over_floor(X, Y, ZT_WAND_COLD, { v: false }, true, 0);
    assert.equal(loc().typ, ROOM);
    assert.equal(game.u.utrap | 0, 0);
  });
});
