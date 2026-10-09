import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  one_characteristic_hide_innate,
  one_characteristic_line,
  one_characteristic_line_final,
} from "../js/invent.js";
import { A_STR, A_DEX, A_CON, A_INT, A_WIS, A_CHA } from "../js/attrib.js";
import { BASICENLIGHTENMENT, MAGICENLIGHTENMENT } from "../js/const.js";
import { objectNames } from "../js/objects.js";
import { ART_OGRESMASHER } from "../js/generated/artifacts_data.js";
import { game } from "../js/gstate.js";

// C ref: insight.c one_characteristic `:860–893` — hide_innate_value: a
// poly'd hero or stuck/worn cursed items hide base/peak/limit (plain
// value only); MAGIC enlightenment clears the hide unless poly'd.
// D-3701 wires the arms the ledger omit named (audit 2026-10-03 "hide
// logic missing") into both js/invent.js line builders, threading mode.
//
// Fixtures pin exact lines: non-human race (STR limit 18 ≠ 118, DEX
// limit 20 ≠ 18) so shown lines carry the limit clause the hide drops.
const GAUNTLETS_OF_POWER = objectNames.indexOf("GAUNTLETS_OF_POWER");
const DUNCE_CAP = objectNames.indexOf("DUNCE_CAP");
const RIN_SUSTAIN_ABILITY = objectNames.indexOf("RIN_SUSTAIN_ABILITY");
const BASIC = BASICENLIGHTENMENT | 0;
const MAGIC = BASIC | MAGICENLIGHTENMENT;

function baseU() {
  return {
    umonnum: 0,
    umonster: 0,
    acurr: { a: [16, 13, 11, 12, 14, 10] },
    amax: { a: [16, 13, 11, 12, 14, 10] },
    abon: { a: [0, 0, 0, 0, 0, 0] },
    atemp: { a: [0, 0, 0, 0, 0, 0] },
    EFixed_abil: 0,
    uleft: null,
    uright: null,
    uarmg: null,
    uarmh: null,
    uwep: null,
  };
}

describe("one_characteristic hide_innate_value (insight.c:860-893)", () => {
  let saved;
  beforeEach(() => {
    assert.ok(GAUNTLETS_OF_POWER >= 0, "GAUNTLETS_OF_POWER otyp exists");
    assert.ok(DUNCE_CAP >= 0, "DUNCE_CAP otyp exists");
    assert.ok(RIN_SUSTAIN_ABILITY >= 0, "RIN_SUSTAIN_ABILITY otyp exists");
    saved = { u: game.u, urace: game.urace };
    game.u = baseU();
    game.urace = { attrmax: [18, 18, 18, 20, 18, 18] };
  });
  afterEach(() => {
    game.u = saved.u;
    game.urace = saved.urace;
  });

  it("Upolyd hides on both builders, both tenses (C :860-861)", () => {
    game.u.umonnum = 5;
    for (const a of [A_STR, A_DEX, A_CON, A_INT, A_WIS, A_CHA]) {
      assert.equal(one_characteristic_hide_innate(a, BASIC), true);
    }
    assert.equal(one_characteristic_line(A_STR, BASIC), "  Your strength is 16.");
    assert.equal(
      one_characteristic_line_final(A_STR, 0, BASIC),
      " Your strength is 16.",
    );
    assert.equal(
      one_characteristic_line_final(A_STR, 1, BASIC),
      " Your strength was 16.",
    );
  });

  it("Fixed_abil + stuck sustain ring hides all (C :862-866)", () => {
    game.u.EFixed_abil = 1;
    game.u.uleft = { otyp: RIN_SUSTAIN_ABILITY, cursed: true };
    for (const a of [A_STR, A_DEX, A_CON, A_INT, A_WIS, A_CHA]) {
      assert.equal(one_characteristic_hide_innate(a, BASIC), true);
    }
    assert.equal(one_characteristic_line(A_STR, BASIC), "  Your strength is 16.");
    assert.equal(
      one_characteristic_line_final(A_DEX, 0, BASIC),
      " Your dexterity is 12.",
    );
  });

  it("Fixed_abil without a stuck ring shows (C :863-864)", () => {
    game.u.EFixed_abil = 1;
    game.u.uleft = { otyp: RIN_SUSTAIN_ABILITY, cursed: false };
    assert.equal(one_characteristic_hide_innate(A_STR, BASIC), false);
    assert.equal(
      one_characteristic_line(A_STR, BASIC),
      "  Your strength is 16 (current; limit:18).",
    );
  });

  it("cursed gauntlets hide STR only (C :868-871)", () => {
    game.u.uarmg = { otyp: GAUNTLETS_OF_POWER, cursed: true };
    assert.equal(one_characteristic_hide_innate(A_STR, BASIC), true);
    assert.equal(one_characteristic_hide_innate(A_DEX, BASIC), false);
    assert.equal(one_characteristic_hide_innate(A_CHA, BASIC), false);
    // Gauntlets pin STR at 125 → "25"; the hide drops base+limit.
    assert.equal(one_characteristic_line(A_STR, BASIC), "  Your strength is 25.");
    assert.equal(
      one_characteristic_line(A_DEX, BASIC),
      "  Your dexterity is 12 (current; limit:20).",
    );
  });

  it("uncursed gauntlets show STR with base+limit (C :869)", () => {
    game.u.uarmg = { otyp: GAUNTLETS_OF_POWER, cursed: false };
    assert.equal(one_characteristic_hide_innate(A_STR, BASIC), false);
    // C `:913–921` — acurrent 125 exceeds the limit: "innate limit".
    assert.equal(
      one_characteristic_line(A_STR, BASIC),
      "  Your strength is 25 (current; base:16, innate limit:18).",
    );
  });

  it("cursed wielded Ogresmasher hides CON (C :874-876)", () => {
    game.u.uwep = { oartifact: ART_OGRESMASHER, cursed: true };
    assert.equal(one_characteristic_hide_innate(A_CON, BASIC), true);
    assert.equal(one_characteristic_hide_innate(A_STR, BASIC), false);
    assert.equal(
      one_characteristic_line_final(A_CON, 0, BASIC),
      " Your constitution is 25.",
    );
    game.u.uwep.cursed = false;
    assert.equal(one_characteristic_hide_innate(A_CON, BASIC), false);
    assert.equal(
      one_characteristic_line_final(A_CON, 0, BASIC),
      " Your constitution is 25 (current; base:14).",
    );
  });

  it("cursed dunce cap hides INT+WIS (C :878-885)", () => {
    game.u.uarmh = { otyp: DUNCE_CAP, cursed: true };
    assert.equal(one_characteristic_hide_innate(A_INT, BASIC), true);
    assert.equal(one_characteristic_hide_innate(A_WIS, BASIC), true);
    assert.equal(one_characteristic_hide_innate(A_CON, BASIC), false);
    assert.equal(
      one_characteristic_line(A_INT, BASIC),
      "  Your intelligence is 6.",
    );
    assert.equal(
      one_characteristic_line_final(A_WIS, 1, BASIC),
      " Your wisdom was 6.",
    );
  });

  it("MAGIC clears item hides but not poly (C :891-893)", () => {
    game.u.uarmg = { otyp: GAUNTLETS_OF_POWER, cursed: true };
    assert.equal(one_characteristic_hide_innate(A_STR, MAGIC), false);
    assert.equal(
      one_characteristic_line(A_STR, MAGIC),
      "  Your strength is 25 (current; base:16, innate limit:18).",
    );
    game.u.uarmg = null;
    game.u.umonnum = 5;
    assert.equal(one_characteristic_hide_innate(A_STR, MAGIC), true);
    assert.equal(one_characteristic_line(A_STR, MAGIC), "  Your strength is 16.");
  });

  it("invalid attrindx returns false (C :888-889 unreachable)", () => {
    assert.equal(one_characteristic_hide_innate(99, BASIC), false);
    assert.equal(one_characteristic_hide_innate(-1, BASIC), false);
  });
});
