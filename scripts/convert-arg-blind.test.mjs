import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { convert_line } from "../js/questpgr.js";

// C: questpgr.c convert_arg case 'x' is `Blind ? "sense" : "see"`, where
// Blind ≡ (HBlinded || EBlinded) && !BBlinded (youprop.h:103). JS read the
// dead flats (u.Blind/u.HBlind/u.EBlind — the last two have no writers and
// the sticky is not refreshed by the extrinsic blindfold path), so a
// blindfolded hero got "see" (scen-sweep-Barbarian-95337 step 798: C "you
// can sense the familiar shapes" vs JS "you can see ..."). Now reads the
// live Blind() export (invent.js, D-3822 pattern).

describe("convert_line %x reads live Blind (questpgr.c convert_arg :311)", () => {
  let savedU;
  beforeEach(() => { savedU = game.u; });
  afterEach(() => { game.u = savedU; });

  const S = 'you can %x the familiar shapes';
  it("extrinsic-blind hero senses", () => {
    game.u = { HBlinded: 0, EBlinded: 524288, BBlinded: 0 };
    assert.equal(convert_line(S), 'you can sense the familiar shapes');
  });
  it("intrinsic-blind hero senses", () => {
    game.u = { HBlinded: 5, EBlinded: 0, BBlinded: 0 };
    assert.equal(convert_line(S), 'you can sense the familiar shapes');
  });
  it("sighted hero sees", () => {
    game.u = { HBlinded: 0, EBlinded: 0, BBlinded: 0 };
    assert.equal(convert_line(S), 'you can see the familiar shapes');
  });
  it("blocked blindness sees (C !BBlinded arm)", () => {
    game.u = { HBlinded: 0, EBlinded: 524288, BBlinded: 524288 };
    assert.equal(convert_line(S), 'you can see the familiar shapes');
  });
});
