import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { Hello } from "../js/roles.js";
import {
  PM_KNIGHT,
  PM_SAMURAI,
  PM_TOURIST,
  PM_VALKYRIE,
  PM_WIZARD,
} from "../js/generated/monsters_data.js";
import { game } from "../js/gstate.js";

// C refs: role.c Hello `:2120–2140` (D-next); global.h `:430`
// MAIL_STRUCTURES is live, so the Valkyrie mail-daemon `Hallo` arm is real C.
// Pins the whole body: Role_switch arms in C order, mtmp-gated sub-arms.
describe("Hello port (role.c)", () => {
  let savedUrole;
  beforeEach(() => {
    savedUrole = game.urole;
  });
  afterEach(() => {
    game.urole = savedUrole;
  });

  it("greets by role with no monster (C :2123–2139)", () => {
    assert.equal(Hello(PM_KNIGHT), "Salutations");
    assert.equal(Hello(PM_SAMURAI), "Konnichi wa");
    assert.equal(Hello(PM_TOURIST), "Aloha");
    assert.equal(Hello(PM_VALKYRIE), "Velkommen");
    assert.equal(Hello(PM_WIZARD), "Hello");
  });

  it("reads Role_switch from game.urole when arg is not numeric (C Role_switch)", () => {
    game.urole = { mnum: PM_TOURIST };
    assert.equal(Hello(null), "Aloha");
    game.urole = { mnum: PM_WIZARD };
    assert.equal(Hello(null), "Hello");
  });

  it("Samurai greets a shopkeeper Irasshaimase (C :2126–2128)", () => {
    const shk = { isshk: true, data: { name: "PM_SHOPKEEPER" } };
    game.urole = { mnum: PM_SAMURAI };
    assert.equal(Hello(shk), "Irasshaimase");
    assert.equal(Hello(null), "Konnichi wa");
    assert.equal(Hello({}), "Konnichi wa");
  });

  it("Valkyrie greets a mail daemon Hallo (C :2133–2136, MAIL_STRUCTURES live)", () => {
    const md = { data: { name: "PM_MAIL_DAEMON" } };
    game.urole = { mnum: PM_VALKYRIE };
    assert.equal(Hello(md), "Hallo");
    assert.equal(Hello(null), "Velkommen");
    assert.equal(Hello({ isshk: true }), "Velkommen");
  });
});
