import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { seffects } from "../js/read.js";
import { SCROLL_CLASS, objectNames } from "../js/objects.js";
import { COLNO, ROWNO, SDOOR, DOOR, ROOM } from "../js/const.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: read.c seffect_magic_mapping `:2124–2131` — a blessed scroll
// converts every SDOOR via cvt_sdoor_to_door, and on a Rogue level only
// calls unblock_point(x, y) per converted door. JS used to call
// vision_recalc(1) + newsym per sdoor instead (full recalc + repaint,
// no C counterpart). unblock_point sets vision_full_recalc only when
// the cell could be seen (viz_array[y][x]); vision_recalc clears it.
const SCR_MAGIC_MAPPING = objectNames.indexOf("SCR_MAGIC_MAPPING");
const X = 12, Y = 10;

describe("seffect_magic_mapping blessed Rogue sdoor (read.c:2128-2129)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      viz_array: game.viz_array,
      ftrap: game.ftrap,
      head_engr: game.head_engr,
      flags: game.flags,
      iflags: game.iflags,
      objects: game.objects,
      invent: game.invent,
      context: game.context,
      moves: game.moves,
      rogue_level: game.rogue_level,
      vision_full_recalc: game.vision_full_recalc,
    };
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  const setup = () => {
    initRng(4242);
    clear_nhwindow_message();
    // One SDOOR cell on an otherwise plain Rogue level; the hero
    // could see it (viz_array set), so C's unblock_point raises the
    // full-recalc flag instead of recalculating inline.
    const cells = new Map();
    const at = (x, y) => {
      const k = y * COLNO + x;
      let c = cells.get(k);
      if (!c) {
        c = x === X && y === Y
          ? { typ: SDOOR, doormask: 0, seenv: 0, roomno: 0, lit: 0, waslit: 0 }
          : { typ: ROOM, seenv: 0, roomno: 0, lit: 1, waslit: 1 };
        cells.set(k, c);
      }
      return c;
    };
    game.level = { at, flags: { hero_memory: true } };
    game.u = { ux: 10, uy: 10, uz: { dnum: 0, dlevel: 5 } };
    game.rogue_level = { dnum: 0, dlevel: 5 };
    game.viz_array = [];
    game.viz_array[Y] = [];
    game.viz_array[Y][X] = 1;
    game.ftrap = [];
    game.head_engr = null;
    game.flags = {};
    game.moves = 12;
    game.vision_full_recalc = 0;
    return {
      scroll: {
        oclass: SCROLL_CLASS,
        otyp: SCR_MAGIC_MAPPING,
        blessed: true,
        cursed: false,
        quan: 1,
      },
      sdoor: () => cells.get(Y * COLNO + X),
    };
  };

  it("converts the SDOOR and flags (not runs) the vision recalc", async () => {
    const { scroll, sdoor } = setup();
    await seffects(scroll);
    assert.equal(sdoor().typ, DOOR);
    assert.equal(
      game.vision_full_recalc,
      1,
      "Rogue blessed sdoor must unblock_point (flag when could-see), not vision_recalc(1) (clear) + newsym",
    );
  });

  it("leaves the flag clear when the sdoor could not be seen", async () => {
    const { scroll, sdoor } = setup();
    game.viz_array[Y][X] = 0;
    await seffects(scroll);
    assert.equal(sdoor().typ, DOOR);
    assert.equal(game.vision_full_recalc, 0);
  });
});
