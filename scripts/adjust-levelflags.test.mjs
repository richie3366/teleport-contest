import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { rest_adjust_levelflags, restlevelstate } from "../js/restore.js";
import { save_adjust_levelflags } from "../js/save.js";

// C ref: save.c save_adjust_levelflags `:570–574` (moves_to_relative_time)
// and restore.c rest_adjust_levelflags `:1314–1318`
// (relative_time_to_moves) on svl.level.flags.stasis_until — the `:520–522`
// savelev triplet relativizes before the write and restores after; getlev
// `:1117` adds back after the read. The JSON wire holds absolute
// stasis_until (lev_json.js serLevel `:800` / deserLevel `:859`), so the
// call sites stay unwired (named wire-format difference, review 364);
// the exports pin the C converter bodies against game.moves.
describe("save_adjust_levelflags (save.c:570-574)", () => {
  let savedLevel, savedMoves;
  beforeEach(() => {
    savedLevel = game.level;
    savedMoves = game.moves;
    game.moves = 1000;
  });
  afterEach(() => {
    game.level = savedLevel;
    game.moves = savedMoves;
  });

  it("relativizes absolute stasis_until against moves (C moves_to_relative_time)", () => {
    game.level = { flags: { stasis_until: 1010 } };
    save_adjust_levelflags();
    assert.equal(game.level.flags.stasis_until, 10);
  });

  it("maps unset stasis_until (0) to -moves, like C prevts - svm.moves", () => {
    game.level = { flags: { stasis_until: 0 } };
    save_adjust_levelflags();
    assert.equal(game.level.flags.stasis_until, -1000);
  });

  it("no-ops without a live level (callee null-holder guard)", () => {
    game.level = undefined;
    assert.doesNotThrow(save_adjust_levelflags);
  });
});

describe("rest_adjust_levelflags (restore.c:1314-1318)", () => {
  let savedLevel, savedMoves;
  beforeEach(() => {
    savedLevel = game.level;
    savedMoves = game.moves;
    game.moves = 1000;
  });
  afterEach(() => {
    game.level = savedLevel;
    game.moves = savedMoves;
  });

  it("adds moves back to relative stasis_until (C relative_time_to_moves)", () => {
    game.level = { flags: { stasis_until: 10 } };
    rest_adjust_levelflags();
    assert.equal(game.level.flags.stasis_until, 1010);
  });

  it("round-trips the savelev :520-522 triplet (save then rest restores)", () => {
    game.level = { flags: { stasis_until: 1042 } };
    save_adjust_levelflags();
    assert.equal(game.level.flags.stasis_until, 42);
    rest_adjust_levelflags();
    assert.equal(game.level.flags.stasis_until, 1042);
  });

  it("no-ops without a live level (callee null-holder guard)", () => {
    game.level = undefined;
    assert.doesNotThrow(rest_adjust_levelflags);
  });
});

describe("restlevelstate (restore.c:742-749)", () => {
  it("is an intentional no-op (C :744-748, steed/engulfer moved to getlev)", () => {
    assert.equal(restlevelstate(), undefined);
  });
});
