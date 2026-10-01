import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { damageum } from "../js/uhitm.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { mons, NUMMONS, carnivorous, herbivorous, metallivorous, is_demon } from "../js/monsters.js";
import { M_ATTK_HIT } from "../js/const.js";

// Per-file attack consts, monattk.h values (repo convention: each module
// declares the AD_/AT_ values it needs; mhitm.js does not export these).
const AT_BITE = 2;
const AD_DGST = 26;
const AD_HALU = 36;
const AD_FAMN = 39;

// C ref: uhitm.c mhitm_adtyping `:4782–4832` dispatch, hero-attacker arms
// (D-3220): AD_DGST `:4499–4501` and AD_HALU `:3904–3906` zero the leftover
// d(); AD_FAMN `:3784–3788` is `goto mhitm_famn` (non-eaters take 0,
// eaters take the normal damage). d(2,6) is always >= 2, so a missing
// arm would always move mhp. Picks are self-calibrating: whatever the
// table holds, eater/non-eater satisfy the same predicates production
// uses. The demon gate short-circuits on non-demon hero data (no rn2).
describe("damageum DGST/FAMN/HALU arms (uhitm.c mhitm_adtyping)", () => {
  let saved;
  const allMons = [];
  for (let i = 0; i < NUMMONS; i++) {
    const pd = mons(i);
    if (pd) allMons.push(pd);
  }
  const eater = () => allMons.find((pd) => carnivorous(pd) || herbivorous(pd) || metallivorous(pd));
  const nonEater = () => allMons.find((pd) => !(carnivorous(pd) || herbivorous(pd) || metallivorous(pd)));
  const nonDemon = () => allMons.find((pd) => !is_demon(pd));
  beforeEach(() => {
    saved = { u: game.u, youmonst: game.youmonst };
    initRng(3220);
    assert.ok(eater() && nonEater() && nonDemon(), "mons table must hold eater, non-eater, non-demon");
    game.u = { umonnum: 0, uwep: null };
    game.youmonst = { data: nonDemon() };
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
  });

  const atk = (adtyp) => ({ damn: 2, damd: 6, adtyp, aatyp: AT_BITE });
  const def = (pd) => ({ data: pd, mhp: 100, mstrategy: 0 });

  it("DGST zeroes leftover dice (mhp unchanged)", async () => {
    const mdef = def(eater());
    const ret = await damageum(mdef, atk(AD_DGST), 0);
    assert.equal(ret, M_ATTK_HIT);
    assert.equal(mdef.mhp, 100);
  });

  it("HALU zeroes leftover dice (mhp unchanged)", async () => {
    const mdef = def(eater());
    const ret = await damageum(mdef, atk(AD_HALU), 0);
    assert.equal(ret, M_ATTK_HIT);
    assert.equal(mdef.mhp, 100);
  });

  it("FAMN vs eater keeps normal damage (mhp drops)", async () => {
    const mdef = def(eater());
    const ret = await damageum(mdef, atk(AD_FAMN), 0);
    assert.equal(ret, M_ATTK_HIT);
    assert.ok(mdef.mhp < 100);
  });

  it("FAMN vs non-eater zeroes dice (mhp unchanged)", async () => {
    const mdef = def(nonEater());
    const ret = await damageum(mdef, atk(AD_FAMN), 0);
    assert.equal(ret, M_ATTK_HIT);
    assert.equal(mdef.mhp, 100);
  });
});
