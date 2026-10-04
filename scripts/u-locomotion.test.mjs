import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { u_locomotion } from "../js/hack.js";

// C ref: hack.c u_locomotion `:1817–1829` — Levitation → Float/float,
// Flying → Fly/fly (capitalized iff def's first char is already uppercase,
// `:1819` *def == highc(*def)); else the poly-aware locomotion fallback
// (`:1828`), which keeps def for an ordinary humanoid form.
describe("u_locomotion verbs (hack.c:1817-1829)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, youmonst: game.youmonst };
    game.u = {};
    game.youmonst = { data: { mlet: "S_HUMAN", mflags1: 0, mmove: 12 } };
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  it("lowercase def stays lowercase under Levitation/Flying", () => {
    game.u.Levitation = 1;
    assert.equal(u_locomotion("step"), "float");
    game.u.Levitation = 0;
    game.u.Flying = 1;
    assert.equal(u_locomotion("step"), "fly");
  });

  it("uppercase def capitalizes under Levitation/Flying", () => {
    game.u.Levitation = 1;
    assert.equal(u_locomotion("Run"), "Float");
    game.u.Levitation = 0;
    game.u.Flying = 1;
    assert.equal(u_locomotion("Run"), "Fly");
  });

  it("falls back to locomotion (def for humanoid) when grounded", () => {
    assert.equal(u_locomotion("step"), "step");
    assert.equal(u_locomotion("climb"), "climb");
  });

  it("falls back to the poly form verb (slither) when polymorphed", () => {
    game.youmonst = { data: { mlet: "S_SNAKE", mflags1: 0x00080000, mmove: 15 } };
    assert.equal(u_locomotion("step"), "slither");
  });
});
