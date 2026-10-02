import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dowipe } from "../js/do.js";
import { ECMD_TIME } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: do.c dowipe `:2390–2404` — the occupation text and the already-clean
// message both use body_part(FACE), the poly face noun (mbodypart tables:
// human 'face', fungus/vortex 'front', worm 'clitellum', fish
// 'premaxillary'), not a hardcoded 'face'. Pins the occupation arm (the
// already-clean arm uses the same live body_part call; its Your() line goes
// through vpline and stays verify-covered).
describe("dowipe body_part(FACE) (do.c:2394,2401)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      occupation: game.occupation,
      occtxt: game.occtxt,
      occtime: game.occtime,
    };
    initRng(2404);
    game.u = { ucreamed: 1 };
    game.youmonst = { data: { mlet: "S_HUMAN", mndx: 0 } };
    game.occupation = null;
    game.occtxt = null;
    game.occtime = 0;
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.occupation = saved.occupation;
    game.occtxt = saved.occtxt;
    game.occtime = saved.occtime;
  });

  it("human ucreamed sets occupation 'wiping off your face'", async () => {
    const ret = await dowipe();
    assert.equal(ret, ECMD_TIME);
    assert.equal(game.occtxt, "wiping off your face");
  });

  it("poly (fungus) ucreamed sets occupation 'wiping off your front'", async () => {
    game.youmonst = { data: { mlet: "S_FUNGUS", mndx: 0 } };
    const ret = await dowipe();
    assert.equal(ret, ECMD_TIME);
    assert.equal(game.occtxt, "wiping off your front");
  });
});
