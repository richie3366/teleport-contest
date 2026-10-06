import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { terrain_glyph } from "../js/display.js";
import {
  STONE, SCORR, TREE, DBWALL, DRAWBRIDGE_UP, DRAWBRIDGE_DOWN,
  DB_MOAT, DB_LAVA, DB_ICE, DB_FLOOR,
} from "../js/const.js";
import {
  CLR_GREEN, CLR_BROWN, CLR_BLUE, CLR_RED, CLR_CYAN, NO_COLOR,
} from "../js/terminal.js";

// C ref: display.c back_to_glyph — the tty twin terrain_glyph must paint
// the same cmap C computes for the integer glyph:
//   SCORR/STONE `:2294–2297` → S_tree on arboreal, else S_stone;
//   DBWALL `:2393–2395` → horizontal ? S_hcdbridge : S_vcdbridge;
//   DRAWBRIDGE_UP `:2396–2416` → under-typ S_pool/S_lava/S_ice/S_room;
//   DRAWBRIDGE_DOWN `:2417–2419` → horizontal ? S_hodbridge : S_vodbridge.
// defsym.h PCHAR2(42–45): lowered '.' / raised '#' drawbridges, CLR_BROWN;
// dat/symbols DECgraphics maps S_vodbridge/S_hodbridge to meta-~ but has
// no raised-bridge entry (ASCII '#' in both modes). scen-quest-Ranger-*
// (arboreal quest home): C paints 'g'/green for seen STONE, JS blank;
// scen-special-Healer-94177 step 5 (Castle): C '#'/brown + '`'/blue for
// DBWALL + DRAWBRIDGE_UP(DB_MOAT), JS '?' (default arm).
describe("terrain_glyph back_to_glyph twin arms (display.c:2294-2297,2393-2419)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      level: game.level, iflags: game.iflags, flags: game.flags,
      currentgraphics: game.currentgraphics,
    };
    game.flags = {};
    game.currentgraphics = 0;
  });
  afterEach(() => {
    game.level = saved.level;
    game.iflags = saved.iflags;
    game.flags = saved.flags;
    game.currentgraphics = saved.currentgraphics;
  });

  const mkflags = (arboreal, decgraphics) => {
    game.level = { flags: { arboreal } };
    game.iflags = { decgraphics };
  };

  it("STONE on arboreal paints the TREE cell (DEC)", () => {
    mkflags(true, true);
    assert.deepEqual(
      terrain_glyph({ typ: STONE }, 1, 1),
      terrain_glyph({ typ: TREE }, 1, 1),
    );
    assert.deepEqual(terrain_glyph({ typ: STONE }, 1, 1),
      { ch: "g", color: CLR_GREEN, dec: true });
  });

  it("STONE on arboreal paints the TREE cell (ASCII)", () => {
    mkflags(true, false);
    assert.deepEqual(terrain_glyph({ typ: STONE }, 1, 1),
      { ch: "#", color: CLR_GREEN, dec: false });
  });

  it("SCORR shares the STONE arm (C shared case)", () => {
    mkflags(true, true);
    assert.deepEqual(terrain_glyph({ typ: SCORR }, 1, 1),
      { ch: "g", color: CLR_GREEN, dec: true });
  });

  it("STONE off arboreal stays blank (regression guard)", () => {
    mkflags(false, true);
    assert.deepEqual(terrain_glyph({ typ: STONE }, 1, 1),
      { ch: " ", color: NO_COLOR, dec: false });
    mkflags(false, false);
    assert.deepEqual(terrain_glyph({ typ: SCORR }, 1, 1),
      { ch: " ", color: NO_COLOR, dec: false });
  });

  it("DBWALL paints the raised drawbridge (both orientations, both modes)", () => {
    for (const dec of [true, false]) {
      mkflags(false, dec);
      for (const horizontal of [0, 1]) {
        assert.deepEqual(
          terrain_glyph({ typ: DBWALL, horizontal }, 1, 1),
          { ch: "#", color: CLR_BROWN, dec: false },
        );
      }
    }
  });

  it("DRAWBRIDGE_UP paints the under-typ cmap cell", () => {
    mkflags(false, true);
    assert.deepEqual(
      terrain_glyph({ typ: DRAWBRIDGE_UP, drawbridgemask: DB_MOAT }, 1, 1),
      { ch: "`", color: CLR_BLUE, dec: true },
    );
    assert.deepEqual(
      terrain_glyph({ typ: DRAWBRIDGE_UP, drawbridgemask: DB_LAVA }, 1, 1),
      { ch: "`", color: CLR_RED, dec: true },
    );
    assert.deepEqual(
      terrain_glyph({ typ: DRAWBRIDGE_UP, drawbridgemask: DB_ICE }, 1, 1),
      { ch: "~", color: CLR_CYAN, dec: true },
    );
    assert.deepEqual(
      terrain_glyph({ typ: DRAWBRIDGE_UP, drawbridgemask: DB_FLOOR }, 1, 1),
      { ch: "~", color: NO_COLOR, dec: true },
    );
    mkflags(false, false);
    assert.deepEqual(
      terrain_glyph({ typ: DRAWBRIDGE_UP, drawbridgemask: DB_MOAT }, 1, 1),
      { ch: "}", color: CLR_BLUE, dec: false },
    );
  });

  it("DRAWBRIDGE_DOWN paints the lowered drawbridge", () => {
    mkflags(false, true);
    for (const horizontal of [0, 1]) {
      assert.deepEqual(
        terrain_glyph({ typ: DRAWBRIDGE_DOWN, horizontal }, 1, 1),
        { ch: "~", color: CLR_BROWN, dec: true },
      );
    }
    mkflags(false, false);
    for (const horizontal of [0, 1]) {
      assert.deepEqual(
        terrain_glyph({ typ: DRAWBRIDGE_DOWN, horizontal }, 1, 1),
        { ch: ".", color: CLR_BROWN, dec: false },
      );
    }
  });
});
