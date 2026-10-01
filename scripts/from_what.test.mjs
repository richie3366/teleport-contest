import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { from_what } from "../js/attrib.js";
import { ysimple_name } from "../js/objnam.js";
import { objectNames } from "../js/objects.js";
import { INVIS, CLAIRVOYANT, W_ARMC, W_ARMH } from "../js/const.js";

// C ref: attrib.c from_what `:977–997` negative arms (review 2165 finding 2).
// Wizard-only " because of X" suffix for blocked BLINDED (Eyes of the
// Overworld), INVIS (W_ARMC mummy wrapping), CLAIRVOYANT (W_ARMH
// cornuthaum). Pins the suffix wiring against the live ysimple_name, not a
// hardcoded item string; the enlightenment callers (insight.c:1617,1666)
// strsubst/you_are this suffix. Runs headless: no RNG, no display.
const MUMMY_WRAPPING = objectNames.indexOf("MUMMY_WRAPPING");
const CORNUTHAUM = objectNames.indexOf("CORNUTHAUM");

describe("from_what negative arms (attrib.c:977-997)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, flags: game.flags };
    game.flags = { wizard: true };
    game.u = { uprops: {} };
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
  });

  it("INVIS blocked by W_ARMC names uarmc", () => {
    const wrap = { otyp: MUMMY_WRAPPING };
    game.u.uarmc = wrap;
    game.u.uprops[INVIS] = { intrinsic: 0, extrinsic: 0, blocked: W_ARMC };
    assert.equal(from_what(-INVIS), ` because of ${ysimple_name(wrap)}`);
  });

  it("INVIS without the W_ARMC bit stays silent", () => {
    game.u.uarmc = { otyp: MUMMY_WRAPPING };
    game.u.uprops[INVIS] = { intrinsic: 0, extrinsic: 0, blocked: 0 };
    assert.equal(from_what(-INVIS), "");
  });

  it("CLAIRVOYANT blocked by W_ARMH names uarmh", () => {
    const hat = { otyp: CORNUTHAUM };
    game.u.uarmh = hat;
    game.u.uprops[CLAIRVOYANT] = { intrinsic: 0, extrinsic: 0, blocked: W_ARMH };
    assert.equal(from_what(-CLAIRVOYANT), ` because of ${ysimple_name(hat)}`);
  });

  it("CLAIRVOYANT without the W_ARMH bit stays silent", () => {
    game.u.uarmh = { otyp: CORNUTHAUM };
    game.u.uprops[CLAIRVOYANT] = { intrinsic: 0, extrinsic: 0, blocked: 0 };
    assert.equal(from_what(-CLAIRVOYANT), "");
  });

  it("negative arms stay silent outside wizard mode", () => {
    game.flags = {};
    game.u.uarmc = { otyp: MUMMY_WRAPPING };
    game.u.uarmh = { otyp: CORNUTHAUM };
    game.u.uprops[INVIS] = { intrinsic: 0, extrinsic: 0, blocked: W_ARMC };
    game.u.uprops[CLAIRVOYANT] = { intrinsic: 0, extrinsic: 0, blocked: W_ARMH };
    assert.equal(from_what(-INVIS), "");
    assert.equal(from_what(-CLAIRVOYANT), "");
  });
});
