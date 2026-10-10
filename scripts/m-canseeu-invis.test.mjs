import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { m_canseeu } from "../js/mondata.js";
import { game } from "../js/gstate.js";
import { COULD_SEE, INVIS } from "../js/const.js";
import { M1_SEE_INVIS } from "../js/monsters.js";

// C ref: vision.h m_canseeu `:50–53` (live #else arm; the #if 0 buried
// arm is dead) — `((!Invis || perceives(data)) && !Underwater &&
// couldsee(mx,my))` with Invis ≡ (HInvis||EInvis)&&!BInvis
// (youprop.h:198). JS read wrong-case flats (u.Hinvis/u.Einvis, always
// undefined), so an invisible hero stayed visible to every monster:
// scen-sweep-Wizard-95347 step 492 (stalker-form hero, HInvis set) drew
// m_move:1970 rn2(1) in C (m_balks keeps appr==0) while JS flipped appr
// 0→-1 via ranged_attk_available and skipped the ladder (D-3773).
// Pins: invisible unseen / perceiver sees / visible seen / blocked
// invisibility seen (C (H||E)&&!B shape).
describe("m_canseeu Invis read (vision.h:50-53)", () => {
  let saved;
  const MX = 26, MY = 6;
  const mon = (mflags1) => ({ mx: MX, my: MY, data: { mflags1 } });
  beforeEach(() => {
    saved = { u: game.u, viz: game.viz_array };
    game.viz_array = Array.from({ length: MY + 1 }, () =>
      new Array(MX + 1).fill(0),
    );
    game.viz_array[MY][MX] = COULD_SEE;
  });
  afterEach(() => {
    game.u = saved.u;
    game.viz_array = saved.viz;
  });

  it("invisible hero (HInvis, no block) unseen by ordinary monster", () => {
    game.u = { ux: 28, uy: 6, HInvis: 1 };
    assert.equal(m_canseeu(mon(0)), false);
  });

  it("invisible hero seen by perceiving monster", () => {
    game.u = { ux: 28, uy: 6, HInvis: 1 };
    assert.equal(m_canseeu(mon(M1_SEE_INVIS)), true);
  });

  it("visible hero seen by ordinary monster", () => {
    game.u = { ux: 28, uy: 6 };
    assert.equal(m_canseeu(mon(0)), true);
  });

  it("blocked invisibility ((H||E)&&!B) stays visible", () => {
    game.u = {
      ux: 28, uy: 6, HInvis: 1,
      uprops: { [INVIS]: { intrinsic: 1, extrinsic: 0, blocked: 1 } },
    };
    assert.equal(m_canseeu(mon(0)), true);
  });
});
