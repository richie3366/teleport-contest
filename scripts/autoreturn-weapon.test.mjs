import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { autoreturn_weapon } from "../js/weapon.js";
import { objectNames } from "../js/objects.js";
import { AKLYS_LIM } from "../js/const.js";

// C ref: weapon.c autoreturn_weapon `:519–529` over `arwep[]` `:513–517`
// (D-queue `autoreturn_weapon always_toss`). Only AKLYS returns non-null:
// the `{ BOOMERANG, 5, 0 }` row is commented out in C. Pure table lookup —
// no display/input, runs headless. The thrwmu always_toss gate that consumes
// it (mthrowu.c `:1241–1259`: range/couldsee gates + `!always_toss` skipping
// the BOLT_LIM retreat `rn2`) needs line-of-fire game state; it is covered
// by session verify, not here.
const AKLYS = objectNames.indexOf("AKLYS");
const DAGGER = objectNames.indexOf("DAGGER");
const BOOMERANG = objectNames.indexOf("BOOMERANG");

describe("autoreturn_weapon (weapon.c:519-529 arwep table)", () => {
  it("returns null for missing input", () => {
    assert.equal(autoreturn_weapon(null), null);
    assert.equal(autoreturn_weapon(undefined), null);
  });

  it("returns null for non-returning weapons", () => {
    assert.equal(autoreturn_weapon({ otyp: DAGGER }), null);
  });

  it("returns null for BOOMERANG (row commented out in C :514)", () => {
    assert.ok(BOOMERANG >= 0, "BOOMERANG otyp exists");
    assert.equal(autoreturn_weapon({ otyp: BOOMERANG }), null);
  });

  it("returns the AKLYS row with AKLYS_LIM-squared range and tether", () => {
    const arw = autoreturn_weapon({ otyp: AKLYS });
    assert.ok(arw, "AKLYS must hit the arwep table");
    assert.equal(arw.otyp, AKLYS);
    assert.equal(arw.range, AKLYS_LIM * AKLYS_LIM);
    assert.equal(arw.range, 16);
    assert.equal(arw.tethered, 1);
  });
});
