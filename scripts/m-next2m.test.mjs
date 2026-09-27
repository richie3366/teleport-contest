import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { find_defensive } from "../js/muse.js";
import { objectNames } from "../js/objects.js";
import { game } from "../js/gstate.js";

// C ref: muse.c m_next2m `:419–436` + its sole caller find_defensive
// `:457–460` (Knox tryescape guard). m_next2m is C staticfn, so the tests
// drive it through the exported caller: a confused horn-carrier would take
// MUSE_UNICORN_HORN (TRUE) unless the guard fires (FALSE).
const UNICORN_HORN = objectNames.indexOf("UNICORN_HORN");
const MUSE_UNICORN_HORN = 17; // muse.c — file-local in js/muse.js

describe("m_next2m Knox guard (muse.c:457-460)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      knox: game.knox_level,
      fmon: game.fmon,
      muse: game._muse,
      grid: game._level_monsters,
    };
    game.u = {
      ux: 10, uy: 10, uz: { dnum: 1, dlevel: 2 },
      uswallow: 0, ustuck: null,
    };
    game.knox_level = { dnum: 1, dlevel: 2 };
    game.fmon = [];
    game._muse = undefined;
    game._level_monsters = undefined;
  });
  afterEach(() => {
    game.u = saved.u;
    game.knox_level = saved.knox;
    game.fmon = saved.fmon;
    game._muse = saved.muse;
    game._level_monsters = saved.grid;
  });

  // Confused horn-carrier far from the hero: horn arm would return TRUE.
  const carrier = (mx, my, over = {}) => ({
    mx, my, mux: mx, muy: my, mhp: 10, mconf: 1, mstun: 0, mcansee: 1,
    data: { mflags1: 0 },
    minvent: { otyp: UNICORN_HORN, cursed: 0, nobj: null },
    ...over,
  });
  const neighbor = (mx, my) => ({ mx, my, mhp: 5, data: { mflags1: 0 } });

  it("fires on Knox when another monster is adjacent (:457-460)", () => {
    const mtmp = carrier(20, 20);
    game.fmon = [mtmp, neighbor(21, 20)];
    assert.equal(find_defensive(mtmp, true), false);
    assert.equal(game._muse.has_defense, 0);
  });

  it("passes with no adjacent monster (m_next2m FALSE)", () => {
    const mtmp = carrier(20, 20);
    game.fmon = [mtmp];
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("ignores mtmp's own square (m2 != mtmp, :433)", () => {
    const mtmp = carrier(20, 20);
    game.fmon = [mtmp, neighbor(30, 30)]; // far: only own square occupied
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("passes off Knox (Is_knox gate)", () => {
    game.u.uz = { dnum: 0, dlevel: 1 };
    const mtmp = carrier(20, 20);
    game.fmon = [mtmp, neighbor(21, 20)];
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("passes when not tryescape", () => {
    const mtmp = carrier(20, 20);
    game.fmon = [mtmp, neighbor(21, 20)];
    assert.equal(find_defensive(mtmp, false), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("passes next to the hero (m_next2u gate)", () => {
    const mtmp = carrier(11, 10);
    game.fmon = [mtmp, neighbor(12, 10)];
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("passes for a dead carrier (DEADMONSTER arm, :426)", () => {
    const mtmp = carrier(20, 20, { mhp: 0 });
    game.fmon = [mtmp, neighbor(21, 20)];
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });

  it("passes for an offmap carrier (mon_offmap arm, :427)", () => {
    const mtmp = carrier(20, 20, { mstate: 1 });
    game.fmon = [mtmp, neighbor(21, 20)];
    assert.equal(find_defensive(mtmp, true), true);
    assert.equal(game._muse.has_defense, MUSE_UNICORN_HORN);
  });
});
