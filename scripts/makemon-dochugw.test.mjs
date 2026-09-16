import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { makemon_appear_msg } from "../js/makemon.js";
import { MM_NOMSG, COULD_SEE, IN_SIGHT } from "../js/const.js";
import { game } from "../js/gstate.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: makemon.c `:1502–1504` — outside the MM_NOMSG guard:
// `if (go.occupation) (void) dochugw(mtmp, FALSE)` stops a busy hero when
// the newborn is a discernable threat. The corpus path is `nasty`
// (wizard.c `:599` MM_NOMSG when summoned): C prints «You stop searching.
// Monsters appear from nowhere!» across the mid-turn split, while JS
// completed the whole summon in one step (scen-tour-Barbarian-92079 s62,
// recorded owner mon_adjust_speed). Pins the headless envelope: a hostile
// visible birth under MM_NOMSG clears the occupation, a peaceful birth or
// no occupation leaves state alone.
const MX = 12;
const MY = 10;

const mockNasty = ({ peaceful = false } = {}) => ({
  mx: MX,
  my: MY,
  mpeaceful: peaceful ? 1 : 0,
  mcanmove: 1,
  data: { mattk: [{ aatyp: 1 /* AT_CLAW */ }] },
});

describe("makemon_appear_msg occupation arm (makemon.c:1502-1504)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      flags: game.flags,
      in_mklev: game.in_mklev,
      viz_array: game.viz_array,
      occupation: game.occupation,
      occtxt: game.occtxt,
    };
    // Headless --More-- dismissal for the stop_occupation pline.
    clear_nhwindow_message();
    game.u = { ux: 10, uy: 10 };
    game.flags = {};
    game.in_mklev = 0;
    const viz = [];
    viz[MY] = [];
    viz[MY][MX] = IN_SIGHT | COULD_SEE;
    game.viz_array = viz;
    game.occtxt = "searching";
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
    game.in_mklev = saved.in_mklev;
    game.viz_array = saved.viz_array;
    game.occupation = saved.occupation;
    game.occtxt = saved.occtxt;
  });

  it("stops searching on a hostile visible birth under MM_NOMSG", async () => {
    game.occupation = function dosearch() {};
    await makemon_appear_msg(mockNasty(), MX, MY, MM_NOMSG);
    assert.equal(game.occupation, null);
  });

  it("keeps a peaceful birth from stopping the occupation", async () => {
    game.occupation = function dosearch() {};
    await makemon_appear_msg(mockNasty({ peaceful: true }), MX, MY, MM_NOMSG);
    assert.equal(typeof game.occupation, "function");
  });

  it("no-ops without an occupation", async () => {
    game.occupation = null;
    await makemon_appear_msg(mockNasty(), MX, MY, MM_NOMSG);
    assert.equal(game.occupation, null);
  });
});
