import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { ROOM, STONE } from "../js/const.js";
import {
  selection_new,
  selection_getpoint,
  selection_free,
  set_selection_floodfillchk,
  set_floodfillchk_match_under,
  selection_floodfill,
} from "../js/mklev.js";

// C ref: selvar.c selection_floodfill `:394-452` + sp_lev.c
// set_floodfillchk_match_under `:4592-4597`. Pins the generic C shape
// against the two retired clones: the seed joins ov with no predicate
// check (C `:428`), neighbours need isok + predicate + tmp + stack
// (C `:411-418`), null predicate is an early return (C `:424-426).
const key = (x, y) => `${x},${y}`;
// 5x3 ROOM field with a STONE splitter column at x=12 (y 5..6).
const rows = [
  [ROOM, ROOM, STONE, ROOM, ROOM],
  [ROOM, ROOM, STONE, ROOM, ROOM],
  [ROOM, ROOM, ROOM, ROOM, ROOM],
];
const X0 = 10, Y0 = 5;

describe("selection_floodfill (selvar.c:394-452)", () => {
  let savedLevel;
  beforeEach(() => {
    savedLevel = game.level;
    game.level = {
      at: (x, y) => {
        const r = rows[y - Y0];
        if (!r || x < X0 || x >= X0 + 5) return null;
        return { typ: r[x - X0] };
      },
    };
  });
  afterEach(() => {
    game.level = savedLevel;
    set_selection_floodfillchk(null);
  });

  it("null predicate returns with ov untouched (C :424-426)", () => {
    set_selection_floodfillchk(null);
    const ov = selection_new();
    selection_floodfill(ov, X0, Y0, false);
    assert.equal(ov.pts.size, 0);
  });

  it("seed joins ov even when the predicate rejects it (C :428+:433-435)", () => {
    set_selection_floodfillchk(() => false);
    const ov = selection_new();
    selection_floodfill(ov, X0, Y0, false);
    assert.equal(ov.pts.size, 1);
    assert.equal(selection_getpoint(X0, Y0, ov), 1);
  });

  it("4-dir match-under fills ROOM only, never STONE (C :437-440)", () => {
    set_floodfillchk_match_under(ROOM);
    const ov = selection_new();
    selection_floodfill(ov, X0, Y0, false);
    for (let dx = 0; dx < 5; dx++) {
      for (let dy = 0; dy < 3; dy++) {
        const want = rows[dy][dx] === ROOM ? 1 : 0;
        assert.equal(
          selection_getpoint(X0 + dx, Y0 + dy, ov),
          want,
          key(X0 + dx, Y0 + dy)
        );
      }
    }
    assert.equal(ov.pts.size, 13);
  });

  it("diagonal neighbours join only when asked (C :441-446)", () => {
    // Seed and one diagonal-only ROOM cell; everything else STONE.
    game.level = { at: (x, y) => {
      if ((x === 20 && y === 5) || (x === 21 && y === 6)) return { typ: ROOM };
      return { typ: STONE };
    } };
    set_floodfillchk_match_under(ROOM);
    const four = selection_new();
    selection_floodfill(four, 20, 5, false);
    assert.equal(four.pts.size, 1);
    const eight = selection_new();
    selection_floodfill(eight, 20, 5, true);
    assert.equal(eight.pts.size, 2);
    assert.equal(selection_getpoint(21, 6, eight), 1);
  });

  it("selection_free empties the selection (C selvar.c:32-44)", () => {
    set_floodfillchk_match_under(ROOM);
    const ov = selection_new();
    selection_floodfill(ov, X0, Y0, false);
    assert.ok(ov.pts.size > 0);
    selection_free(ov, true);
    assert.equal(ov.pts.size, 0);
    assert.ok(ov.lx >= ov.hx || ov.ly >= ov.hy);
    selection_free(null, true);
  });
});
