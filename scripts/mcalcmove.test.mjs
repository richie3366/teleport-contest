import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { NORMAL_SPEED } from "../js/const.js";
import { mcalcmove } from "../js/mon.js";

// C ref: mon.c mcalcmove `:1148–1153` — a galloping steed moves 1.5× with
// variance ((rn2(2) ? 4 : 5) * mmove / 3). Gates: mon is u.usteed,
// u.ugallop nonzero, svc.context.mv (game.context.mv). mspeed 0 is
// neither MSLOW (1) nor MFAST (2), isolating the gallop arm (D-3000).
describe("mcalcmove steed gallop (mon.c:1148-1153)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, context: game.context };
    initRng(70021);
  });
  afterEach(() => {
    game.u = saved.u;
    game.context = saved.context;
  });

  const steed = () => ({ data: { mmove: 24 }, mspeed: 0 });

  it("scales a galloping steed 4/3 or 5/3 (rn2(2) variance)", () => {
    const mon = steed();
    game.u = { usteed: mon, ugallop: 40 };
    game.context = { mv: 1 };
    const got = mcalcmove(mon, false);
    assert.ok(
      got === Math.trunc((4 * 24) / 3) || got === Math.trunc((5 * 24) / 3),
      `expected 32 or 40, got ${got}`,
    );
  });

  it("skips a monster that is not the steed", () => {
    const mon = steed();
    game.u = { usteed: steed(), ugallop: 40 };
    game.context = { mv: 1 };
    assert.equal(mcalcmove(mon, false), 24);
  });

  it("skips when ugallop is spent", () => {
    const mon = steed();
    game.u = { usteed: mon, ugallop: 0 };
    game.context = { mv: 1 };
    assert.equal(mcalcmove(mon, false), 24);
  });

  it("skips when context.mv is clear", () => {
    const mon = steed();
    game.u = { usteed: mon, ugallop: 40 };
    game.context = { mv: 0 };
    assert.equal(mcalcmove(mon, false), 24);
  });

  it("runs before the m_moving rounding (:1155 NORMAL_SPEED multiple)", () => {
    const mon = steed();
    game.u = { usteed: mon, ugallop: 40 };
    game.context = { mv: 1 };
    // mmove is a multiple of NORMAL_SPEED after rounding, from either
    // gallop product (32 -> 24|36, 40 -> 36|48).
    for (let i = 0; i < 8; i++) {
      assert.equal(mcalcmove(mon, true) % NORMAL_SPEED, 0);
    }
  });
});
