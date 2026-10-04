import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { parkguard } from "../js/vault.js";
import { m_at } from "../js/mon.js";
import { game } from "../js/gstate.js";

// C ref: vault.c parkguard `:155–171` (batch @77a859fd3): a parked guard
// clears svc.context.polearm.hitmon, lifts off the grid via
// remove_monster + newsym (mx gate), parks at <0,0> via place_monster,
// and EGD og follows mx,my. JS previously set mx/my directly.
function mkGuard(mx, my) {
  return {
    mx, my,
    mhp: 10,
    mstate: 0,
    isgd: true,
    mextra: { egd: {} },
  };
}

describe("parkguard grid + hitmon arms (vault.c:155-171)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      fmon: game.fmon,
      context: game.context,
      levelMonsters: game._level_monsters,
    };
    game.u = { ux: 10, uy: 10 };
    game.fmon = [];
    game.context = { polearm: { hitmon: null } };
    game._level_monsters = new Map();
  });
  afterEach(() => {
    game.u = saved.u;
    game.fmon = saved.fmon;
    game.context = saved.context;
    game._level_monsters = saved.levelMonsters;
  });

  it("clears polearm.hitmon for the parked guard only", () => {
    const grd = mkGuard(5, 5);
    const other = mkGuard(6, 6);
    game.fmon = [grd, other];
    game.context.polearm.hitmon = grd;
    parkguard(other);
    assert.equal(game.context.polearm.hitmon, grd);
    parkguard(grd);
    assert.equal(game.context.polearm.hitmon, null);
  });

  it("lifts off the grid and parks at <0,0> with EGD og following", () => {
    const grd = mkGuard(5, 5);
    game.fmon = [grd];
    game._level_monsters.set("5,5", grd);
    assert.equal(m_at(5, 5), grd);
    parkguard(grd);
    assert.equal(grd.mx, 0);
    assert.equal(grd.my, 0);
    assert.equal(m_at(5, 5), null);
    assert.equal(m_at(0, 0), grd);
    assert.equal(grd.mextra.egd.ogx, 0);
    assert.equal(grd.mextra.egd.ogy, 0);
  });

  it("already-parked guard is a no-op for the grid", () => {
    const grd = mkGuard(0, 0);
    game.fmon = [grd];
    game._level_monsters.set("0,0", grd);
    parkguard(grd);
    assert.equal(grd.mx, 0);
    assert.equal(grd.my, 0);
    assert.equal(m_at(0, 0), grd);
    assert.equal(grd.mextra.egd.ogx, 0);
    assert.equal(grd.mextra.egd.ogy, 0);
  });
});
