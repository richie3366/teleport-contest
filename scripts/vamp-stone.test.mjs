import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { mons, monsterNames, is_vampire } from "../js/monsters.js";
import { LOW_PM, NON_PM, G_GENOD } from "../js/const.js";
import { vamp_stone } from "../js/mhitm.js";

// C ref: mon.c vamp_stone `:3766–3830` (D-2611) — the whole-body restart
// added the lapidifying/rise plines, engulfing expels, amorphous door
// rloc, set_mon_min_mhpmax floors and the sandestin NC_SHOW_MSG arm.
// These pins run the live export headless over the pure gates (no
// newcham/newsym side effects): null/ordinary/genocided-vampshifter must
// all keep petrifying (TRUE) with no mutation. The live revert arms are
// covered by `verify.mjs --fn vamp_stone` (REACH-OK).
const PM_GRID_BUG = monsterNames.indexOf("PM_GRID_BUG");

function firstVampireMndx() {
  for (let i = LOW_PM; i < monsterNames.length; i++) {
    if (is_vampire(mons(i))) return i;
  }
  throw new Error("no vampire species in monsterNames");
}

function mockMon(over = {}) {
  return {
    cham: NON_PM,
    data: mons(PM_GRID_BUG),
    mx: 5, my: 5,
    mhp: 3, mhpmax: 8, m_lev: 2,
    mcanmove: 0, mfrozen: 0,
    ...over,
  };
}

describe("vamp_stone gates (mon.c:3766-3830)", () => {
  let saved;
  beforeEach(() => {
    saved = { mvitals: game.mvitals };
    game.mvitals = {};
  });
  afterEach(() => {
    game.mvitals = saved.mvitals;
  });

  it("null monster keeps petrifying", async () => {
    assert.equal(await vamp_stone(null), true);
  });

  it("ordinary monster (no cham) keeps petrifying, unmutated", async () => {
    const m = mockMon();
    assert.equal(await vamp_stone(m), true);
    assert.equal(m.mcanmove, 0);
    assert.equal(m.mfrozen, 0);
    assert.equal(m.mhp, 3);
    assert.equal(m.mhpmax, 8);
  });

  it("vampshifter with genocided true form keeps petrifying, unmutated", async () => {
    const vamp = firstVampireMndx();
    game.mvitals = { [vamp]: { mvflags: G_GENOD } };
    const m = mockMon({ cham: vamp });
    assert.equal(await vamp_stone(m), true);
    assert.equal(m.mcanmove, 0);
    assert.equal(m.mfrozen, 0);
    assert.equal(m.mhp, 3);
  });
});
