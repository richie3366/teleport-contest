import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { still_chewing } from "../js/hack.js";
import { clear_nhwindow_message } from "../js/display.js";
import { DOOR, NO_ROOM } from "../js/const.js";

// C ref: hack.c still_chewing `:729–737` — chewing through something for
// the first meal (uconduct.food++ was 0) writes a livelog CHRONICLE line:
// "ate for the first time, by chewing through %s" (boulder/tree/rock/
// iron bars/door). JS incremented food but left "// livelog deferred".
// Observable: game.gamelog gains the entry (gamelog_add precedes the
// sysopt.livelog mask gate, so no LIVELOGFILE opt-in is needed).
describe("still_chewing first-meal livelog (hack.c:729-737)", () => {
  let saved, loc;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      level: game.level,
      context: game.context,
      flags: game.flags,
      iflags: game.iflags,
      moves: game.moves,
      gamelog: game.gamelog,
      in_mklev: game.in_mklev,
      _objects_at: game._objects_at,
    };
    initRng(729);
    clear_nhwindow_message();
    game.flags = { verbose: true, female: false };
    game.iflags = { window_inited: true };
    game.u = {
      ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
      uconduct: {}, uhunger: 100, udaminc: 0,
    };
    game.youmonst = { data: {} }; // metallivorous never reached on DOOR
    loc = { typ: DOOR, doormask: 0, wall_info: 0, flags: 0, roomno: NO_ROOM };
    game.level = {
      flags: {},
      rooms: [],
      at: (x, y) => (x === 10 && y === 10 ? loc : null),
    };
    game.context = {
      digging: {
        chew: true, pos: { x: 10, y: 10 },
        level: { dnum: 0, dlevel: 1 }, effort: 90, down: false,
      },
    };
    game.moves = 100;
    game.gamelog = [];
    game.in_mklev = true; // newsym early-return (level flux), after the livelog
    game._objects_at = undefined; // no boulder: sobj_at -> null
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  it("logs 'ate for the first time, by chewing through a door' once", async () => {
    const r = await still_chewing(10, 10);
    assert.equal(r, 0);
    assert.equal(game.u.uconduct.food, 1);
    assert.equal(game.gamelog.length, 1);
    assert.equal(
      game.gamelog[0].text,
      "ate for the first time, by chewing through a door",
    );
  });

  it("logs nothing when food was already eaten", async () => {
    game.u.uconduct.food = 3;
    const r = await still_chewing(10, 10);
    assert.equal(r, 0);
    assert.equal(game.u.uconduct.food, 4);
    assert.equal(game.gamelog.length, 0);
  });
});
