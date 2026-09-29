import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { mon_leave } from "../js/dog.js";
import { COIN_CLASS } from "../js/objects.js";
import { ROOMOFFSET } from "../js/const.js";

// C ref: dog.c mon_leave `:729–763`.
// Pins the two arms completed here (D-2296 shipped the worm arm alone):
// the minvent no_charge reset with picked_container-first for contents
// (`:735–740`), and the isshk residency clear (`:744–745`). The worm arm
// keeps its D-2296 coverage (needs live wseg fixtures; not re-pinned).
describe("mon_leave port (dog.c)", () => {
  function homeShopkeeper() {
    game.u = { uz: { dnum: 0, dlevel: 1 } };
    game.level = { rooms: [{ resident: null }, { resident: null }] };
    const nestedGold = { oclass: COIN_CLASS, no_charge: 7, nobj: null, cobj: null };
    const nestedSword = { oclass: 999, no_charge: 5, nobj: nestedGold, cobj: null };
    const box = { oclass: 999, no_charge: 3, nobj: null, cobj: nestedSword };
    const topGold = { oclass: COIN_CLASS, no_charge: 9, nobj: null, cobj: null };
    box.nobj = topGold;
    const shk = {
      isshk: true, wormno: 0, mx: 5, my: 5, minvent: box,
      mextra: {
        eshk: {
          shoplevel: { dnum: 0, dlevel: 1 },
          shoproom: ROOMOFFSET + 1,
        },
      },
    };
    game.level.rooms[1].resident = shk;
    return { shk, box, nestedSword, nestedGold, topGold };
  }

  it("minvent loop clears no_charge, picked_container-first (C :735-740)", () => {
    const { shk, box, nestedSword, nestedGold, topGold } = homeShopkeeper();
    assert.equal(mon_leave(shk), 0);
    assert.equal(box.no_charge, 0);
    assert.equal(nestedSword.no_charge, 0);
    assert.equal(nestedGold.no_charge, 7); // picked_container skips COIN_CLASS
    assert.equal(topGold.no_charge, 0); // top-level loop is unconditional
  });

  it("isshk clears home-level residency (C :744-745)", () => {
    const { shk } = homeShopkeeper();
    mon_leave(shk);
    assert.equal(game.level.rooms[1].resident, null);
  });

  it("residency kept off home level (set_residency gate)", () => {
    const { shk } = homeShopkeeper();
    shk.mextra.eshk.shoplevel = { dnum: 9, dlevel: 9 };
    assert.equal(mon_leave(shk), 0);
    assert.equal(game.level.rooms[1].resident, shk);
  });

  it("non-shopkeeper with empty minvent is a no-op returning 0", () => {
    const pet = { isshk: 0, wormno: 0, mx: 3, my: 3, minvent: null };
    assert.equal(mon_leave(pet), 0);
  });
});
