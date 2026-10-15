import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { sellobj, sellobj_state } from "../js/shk.js";
import { SELL_NORMAL, SELL_DELIBERATE } from "../js/const.js";

// C ref: decl.c gs initializer `:720` — gs.sell_response starts 'a'
// (explicit, NOT BSS '\0'), so the first incidental sale auto-accepts
// via sellobj's case 'a' → 'y' (shk.c) instead of prompting nyaq.
// D-3986: JS initialized null (query), so a first shop sale (polymon
// armor drops, wish artifacts) prompted while C auto-sold — the
// next_ident-headed cliff (C's pay→money2u→splitobj rnd(2) vs JS's
// stalled prompt, stream-shifted to distfleeck).
describe("sell_response startup init (decl.c:720)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      sell_response: game.sell_response,
      sell_how: game.sell_how,
      auto_credit: game.auto_credit,
    };
    game.u = { ux: 1, uy: 1, ushops: "" };
    delete game.sell_response; // fresh-game state
    delete game.sell_how;
    delete game.auto_credit;
  });
  afterEach(() => {
    game.u = saved.u;
    game.sell_response = saved.sell_response;
    game.sell_how = saved.sell_how;
    game.auto_credit = saved.auto_credit;
  });

  it("first sellobj touch inits response to 'a' (auto-accept)", async () => {
    await sellobj({}, 1, 1); // no ushops: ensure runs, early return
    assert.equal(game.sell_response, "a");
    assert.equal(game.sell_how, SELL_NORMAL);
    assert.equal(game.auto_credit, false);
  });

  it("deliberate drop still queries, NORMAL restores 'a'", () => {
    sellobj_state(SELL_DELIBERATE);
    assert.equal(game.sell_response, null);
    sellobj_state(SELL_NORMAL);
    assert.equal(game.sell_response, "a");
  });
});
