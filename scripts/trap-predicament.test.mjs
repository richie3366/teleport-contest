import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { trap_predicament } from "../js/invent.js";
import {
  TT_BEARTRAP,
  TT_PIT,
  TT_WEB,
  TT_LAVA,
  TT_INFLOOR,
  TT_BURIEDBALL,
  PIT,
  ROOM,
} from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: insight.c trap_predicament `:232–261` — the utrap predicament
// behind status_enlightenment `:1086–1098` and self_lookat `pager.c:131`
// (queue row: scen-genesis-Knight-92002 step 81). This file pins the
// headless envelope: all four switch arms + the wizard `{<utrap>}`
// counter suffix. The steed/anchored enl_msg vs you_are assembly and the
// ustuck holding/held-by arm live in unexported status_core_lines and are
// covered by corpus verify (`--fn one_characteristic`), not here.
describe("trap_predicament (insight.c:232-261)", () => {
  let savedU;
  let savedLevel;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
  });

  const setup = (utraptype, { utrap = 3, traps = [] } = {}) => {
    game.u = { ux: 10, uy: 10, utrap, utraptype };
    game.level = { traps, at: () => ({ typ: ROOM }) };
  };

  it("buried ball is tethered", () => {
    setup(TT_BURIEDBALL);
    assert.equal(trap_predicament(0, false), "tethered to something buried");
  });

  it("lava sinks into hliquid lava in progress, plain lava when final", () => {
    setup(TT_LAVA);
    assert.equal(trap_predicament(0, false), "sinking into lava");
    assert.equal(trap_predicament(1, false), "sinking into lava");
  });

  it("in-floor names the terrain with the article", () => {
    setup(TT_INFLOOR);
    assert.equal(trap_predicament(0, false), "stuck in the floor");
  });

  it("pit names the trap at the hero square", () => {
    setup(TT_PIT, { traps: [{ tx: 10, ty: 10, ttyp: PIT }] });
    assert.equal(trap_predicament(0, false), "trapped in a pit");
  });

  it("bare trapped with no trap record (C: should never be null)", () => {
    setup(TT_BEARTRAP);
    assert.equal(trap_predicament(0, false), "trapped");
    setup(TT_WEB);
    assert.equal(trap_predicament(0, false), "trapped");
  });

  it("wizard suffix carries the escape-attempt counter in braces", () => {
    setup(TT_BURIEDBALL, { utrap: 7 });
    assert.equal(
      trap_predicament(0, true),
      "tethered to something buried {7}",
    );
  });
});
