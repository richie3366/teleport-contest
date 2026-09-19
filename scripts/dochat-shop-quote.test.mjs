import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { ROOMOFFSET, SHOPBASE, NO_ROOM } from "../js/const.js";
import { COIN_CLASS, WEAPON_CLASS } from "../js/objects.js";
import { shop_object } from "../js/shk.js";

// C ref: shk.c shop_object `:5386–5403` — first non-coin floor object on a
// costly spot while the keeper is present, calm and vocal. Pins the
// dochat shop arm's gate (sounds.c `:1280`) headless: no RNG, no pline.
describe("shop_object price-quote gate (shk.c)", () => {
  const SX = 10, SY = 10;
  const RNO = ROOMOFFSET; // rooms[0], rtype SHOPBASE
  let saved;

  const keeper = (over = {}) => ({
    mx: 12, my: 10, mpeaceful: true, isshk: true,
    mcanmove: true, msleeping: 0, data: {},
    mextra: { eshk: { shoproom: RNO, shk: { x: 12, y: 10 } } },
    ...over,
  });
  const coin = (next = null) => ({ oclass: COIN_CLASS, nexthere: next });
  const goods = (oclass = WEAPON_CLASS) => ({ oclass, nexthere: null });

  function setLevel(shkp, roomno = RNO, rtype = SHOPBASE) {
    game.level = {
      at: () => ({ roomno, edge: false }),
      rooms: [{ rtype, resident: shkp }],
      flags: { has_shop: true },
    };
  }

  beforeEach(() => {
    saved = { u: game.u, level: game.level, objects_at: game._objects_at };
    game.u = { ux: SX, uy: SY };
    game._objects_at = new Map();
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game._objects_at = saved.objects_at;
  });

  it("skips leading coins, returns first goods on a costly spot", () => {
    setLevel(keeper());
    const g = goods();
    game._objects_at.set(`${SX},${SY}`, coin(g));
    assert.equal(shop_object(SX, SY), g);
  });

  it("returns head goods with no coins", () => {
    setLevel(keeper());
    const g = goods();
    game._objects_at.set(`${SX},${SY}`, g);
    assert.equal(shop_object(SX, SY), g);
  });

  it("coins only → null", () => {
    setLevel(keeper());
    game._objects_at.set(`${SX},${SY}`, coin(coin(null)));
    assert.equal(shop_object(SX, SY), null);
  });

  it("empty square → null", () => {
    setLevel(keeper());
    assert.equal(shop_object(SX, SY), null);
  });

  it("angry keeper → null", () => {
    setLevel(keeper({ mpeaceful: false }));
    game._objects_at.set(`${SX},${SY}`, goods());
    assert.equal(shop_object(SX, SY), null);
  });

  it("helpless (mute) keeper → null", () => {
    setLevel(keeper({ msleeping: 5 }));
    game._objects_at.set(`${SX},${SY}`, goods());
    assert.equal(shop_object(SX, SY), null);
  });

  it("absent keeper → null", () => {
    setLevel(null);
    game._objects_at.set(`${SX},${SY}`, goods());
    assert.equal(shop_object(SX, SY), null);
  });

  it("hero outside any shop room → null", () => {
    setLevel(keeper(), NO_ROOM);
    game._objects_at.set(`${SX},${SY}`, goods());
    assert.equal(shop_object(SX, SY), null);
  });
});
