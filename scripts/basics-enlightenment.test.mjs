import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  basics_autopickup_buf,
  basics_ac_buf,
  basics_hitdice_buf,
} from "../js/invent.js";

// C ref: insight.c basics_enlightenment `:728–823` — the Basics section
// lives split across the final disclosure builder (enlightenment) and the
// ^X overlay builder (doattributes) in js/invent.js; these pins cover the
// shared C-order Buf helpers both paths call. Display/menu plumbing is
// covered by corpus verify (`--fn basics_enlightenment`), not here.

describe("basics autopickup buf (insight.c:804-822)", () => {
  it("off when pickup disabled", () => {
    assert.equal(basics_autopickup_buf(0, "", true, false, false), "off");
  });

  it("on for all types with no suffixes", () => {
    assert.equal(
      basics_autopickup_buf(1, "", true, false, false),
      "on for all types",
    );
  });

  it("quotes explicit types, plus thrown only when types set", () => {
    assert.equal(
      basics_autopickup_buf(1, "$\"!?", true, false, false),
      "on for '$\"!?' plus thrown",
    );
    // C `:815` — `flags.pickup_thrown && *ocl`: no types, no suffix.
    assert.equal(
      basics_autopickup_buf(1, "", true, false, false),
      "on for all types",
    );
    // pickup_thrown off with types: no suffix.
    assert.equal(
      basics_autopickup_buf(1, "$", false, false, false),
      "on for '$'",
    );
  });

  it("shop disable wins over the for-clause (C :808-810)", () => {
    assert.equal(
      basics_autopickup_buf(1, "$", true, true, true),
      "on, but temporarily disabled while inside the shop",
    );
  });

  it("appends exceptions (C :817-818)", () => {
    assert.equal(
      basics_autopickup_buf(1, "", false, false, true),
      "on for all types, with exceptions",
    );
  });
});

describe("basics AC buf (insight.c:772-777)", () => {
  it("plain value below the cap", () => {
    assert.equal(basics_ac_buf(10), "10");
    assert.equal(basics_ac_buf(-3), "-3");
  });

  it("best/worst suffix exactly at AC_MAX", () => {
    assert.equal(basics_ac_buf(-99), "-99, the best possible");
    assert.equal(basics_ac_buf(99), "99, the worst possible");
  });
});

describe("basics hit dice buf (insight.c:756-770)", () => {
  it("mlevel 0/1/N arms", () => {
    assert.equal(basics_hitdice_buf(0), "0 hit dice (actually 1/2)");
    assert.equal(basics_hitdice_buf(1), "1 hit die");
    assert.equal(basics_hitdice_buf(8), "8 hit dice");
  });
});
