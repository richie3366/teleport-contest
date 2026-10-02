import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  magic_map_background,
  back_to_glyph,
  glyph_is_cmap,
  invisible_glyph_cell,
  GLYPH_INVISIBLE,
} from "../js/display.js";
import { ROOM } from "../js/const.js";

// C ref: display.c magic_map_background `:233–258` — memory is only
// overwritten when unexplored-or-cmap (`:250–252`), so a remembered
// unseen-monster 'I' (GLYPH_INVISIBLE) survives magic mapping. JS used
// to overwrite unconditionally, wiping the I a blind hero's search had
// mapped (scen-normal-Tourist-92061 step 18: C `<·I@·`, JS `<··@·`).
describe("magic_map_background memory guard (display.c:250-252)", () => {
  let savedU, savedLevel, savedFlags;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
    savedFlags = game.flags;
    game.u = { ux: 10, uy: 10, Blind: 1 };
    game.flags = { dark_room: true, color: true, lit_corridor: false };
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
    if (savedFlags === undefined) delete game.flags;
    else game.flags = savedFlags;
  });

  const mklevel = (loc) => {
    game.level = { at: () => loc, flags: { hero_memory: true } };
  };

  it("preserves remembered unseen-monster (I) memory", () => {
    const loc = {
      typ: ROOM, lit: 0, waslit: 0,
      remembered_glyph: invisible_glyph_cell(),
    };
    mklevel(loc);
    magic_map_background(12, 10, 0);
    assert.equal(loc.remembered_glyph.glyph, GLYPH_INVISIBLE);
    assert.equal(loc.remembered_glyph.ch, "I");
  });

  it("writes terrain memory for unexplored cells", () => {
    const loc = { typ: ROOM, lit: 0, waslit: 0 };
    mklevel(loc);
    magic_map_background(12, 10, 0);
    assert.ok(loc.remembered_glyph);
    assert.equal(glyph_is_cmap(loc.remembered_glyph.glyph), true);
  });

  it("refreshes stale cmap memory", () => {
    // waslit skips the C `:242–247` darkroom adjustment (blind/out of
    // sight), so the stored id is back_to_glyph's room id exactly.
    const loc = { typ: ROOM, lit: 0, waslit: 1 };
    mklevel(loc);
    const roomId = back_to_glyph(12, 10);
    loc.remembered_glyph = { ch: "?", color: 0, decgfx: false, glyph: roomId };
    assert.equal(glyph_is_cmap(loc.remembered_glyph.glyph), true);
    magic_map_background(12, 10, 0);
    assert.notEqual(loc.remembered_glyph.ch, "?");
    assert.equal(loc.remembered_glyph.glyph, roomId);
  });
});
