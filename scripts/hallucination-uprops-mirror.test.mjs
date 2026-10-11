import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { HALLUC, TIMEOUT } from "../js/const.js";
import { make_hallucinated } from "../js/potion.js";
import { Hallucination as displayHallucination } from "../js/display.js";

// C: HHallucination ≡ u.uprops[HALLUC].intrinsic (youprop.h:116) — one field.
// JS keeps the flat beside the slot; every writer must keep them ≡ or the
// display.js Hallucination() reader (flat || slot) still sees Hallu after a
// clear: status keeps "Hallu" and the see_monsters repaint paints hallu
// glyphs (scen-sweep-Valkyrie-95323 step 1163: C `C` vs JS `M`, C no-Hallu
// vs JS `Hallu`, after the peffect_sickness shock cure). Same disease as
// the D-1817 DEAF / D-3802 CONFUSION leftovers (flat-only writes left
// uprops TIMEOUT stuck).

describe("hallucination flat ≡ uprops[HALLUC] (youprop.h:116)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, flags: game.flags, level: game.level, disp: game.disp,
      youmonst: game.youmonst, context: game.context,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
    game.level = saved.level;
    game.disp = saved.disp;
    game.youmonst = saved.youmonst;
    game.context = saved.context;
  });

  const setup = () => {
    initRng(4242);
    game.flags = {};
    game.context = {};
    game.u = { uprops: {}, ux: 5, uy: 5 };
    game.level = {
      at: () => ({ typ: 1, doormask: 0, roomno: 0, flags: 0, seenv: 0 }),
      flags: {},
      traps: [],
      monsters: [],
    };
  };
  const slot = () => (game.u.uprops?.[HALLUC]?.intrinsic | 0) & TIMEOUT;
  const flat = () => (game.u.HHallucination | 0) & TIMEOUT;

  it("make_hallucinated onset writes flat and slot", async () => {
    setup();
    await make_hallucinated(8, false, 0);
    assert.equal(flat(), 8);
    assert.equal(slot(), 8);
  });

  it("make_hallucinated(0) cure clears flat and slot", async () => {
    setup();
    await make_hallucinated(8, false, 0);
    // production state: sync_timeout_flats copied the onset flat to the slot
    game.u.uprops[HALLUC] = { intrinsic: 8, extrinsic: 0, blocked: 0 };
    await make_hallucinated(0, false, 0);
    assert.equal(flat(), 0);
    assert.equal(slot(), 0);
  });

  it("display reader sees no Hallu after the cure", async () => {
    setup();
    await make_hallucinated(8, false, 0);
    game.u.uprops[HALLUC] = { intrinsic: 8, extrinsic: 0, blocked: 0 };
    assert.equal(displayHallucination(), true);
    await make_hallucinated(0, false, 0);
    assert.equal(displayHallucination(), false);
  });
});
