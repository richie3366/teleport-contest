import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { weight } from "../js/mkobj.js";
import { objects_globals_init, objectNames } from "../js/objects.js";
import { game } from "../js/gstate.js";

// C ref: mkobj.c `:1932–1934` — Bag-of-Holding contents factor:
// `cursed ? cwt*2 : blessed ? (cwt+3)/4 : (cwt+1)/2` (uncursed).
// The corpus path is scen-wish-Caveman-92148 s245 (recorded owner
// one_characteristic row 5): a blessed bag with one owt-50 item weighs
// 15 + (50+3)/4 = 28 in C, 15 + 50 = 65 in JS before the fix (Δ37 =
// the whole disclosure Δ). Pins all three divisor arms in C ternary
// order plus the BoH-only scope (a SACK still sums unmodified).
const BOH = objectNames.indexOf("BAG_OF_HOLDING");
const SACK = objectNames.indexOf("SACK");
const APPLE = objectNames.indexOf("APPLE");

const BAG_WT = 15;
const ITEM_WT = 50;

const mkItem = (wtQuan = 1) => ({
  otyp: APPLE,
  quan: wtQuan,
  cobj: null,
  nobj: null,
});

const mkBag = (otyp, { blessed = false, cursed = false, cobj = null } = {}) => ({
  otyp,
  quan: 1,
  blessed,
  cursed,
  cobj,
  nobj: null,
});

describe("weight() Bag-of-Holding factor (mkobj.c:1932-1934)", () => {
  let saved = {};
  beforeEach(() => {
    objects_globals_init();
    for (const t of [BOH, SACK, APPLE]) saved[t] = game.objects[t].oc_weight;
    game.objects[BOH].oc_weight = BAG_WT;
    game.objects[SACK].oc_weight = BAG_WT;
    game.objects[APPLE].oc_weight = ITEM_WT;
  });
  afterEach(() => {
    for (const t of [BOH, SACK, APPLE]) game.objects[t].oc_weight = saved[t];
  });

  it("blessed bag quarters contents rounded up (the corpus case: 28)", () => {
    assert.equal(weight(mkBag(BOH, { blessed: true, cobj: mkItem() })), 28);
  });

  it("uncursed bag halves contents rounded up", () => {
    assert.equal(weight(mkBag(BOH, { cobj: mkItem() })), 40);
  });

  it("cursed bag doubles contents, winning over blessed (C order)", () => {
    assert.equal(weight(mkBag(BOH, { cursed: true, cobj: mkItem() })), 115);
    assert.equal(
      weight(mkBag(BOH, { cursed: true, blessed: true, cobj: mkItem() })),
      115,
    );
  });

  it("other containers sum contents unmodified", () => {
    assert.equal(weight(mkBag(SACK, { blessed: true, cobj: mkItem() })), 65);
    assert.equal(weight(mkBag(SACK, { cobj: mkItem() })), 65);
  });

  it("empty blessed bag weighs the bag alone; rounding differs at cwt=4", () => {
    assert.equal(weight(mkBag(BOH, { blessed: true })), BAG_WT);
    game.objects[APPLE].oc_weight = 4;
    assert.equal(weight(mkBag(BOH, { blessed: true, cobj: mkItem() })), 16);
    assert.equal(weight(mkBag(BOH, { cobj: mkItem() })), 17);
  });
});
