import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { trapeffect_fire_trap, Trap_Killed_Mon, Trap_Effect_Finished } from "../js/trap.js";
import { monsterNames } from "../js/monsters.js";
import { MON_DETACH } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";

// C ref: trap.c trapeffect_fire_trap `:1797–1806` — after thitm, the
// burnarmor/destroy_items block applies xtradmg and the AD_FIRE monkilled
// only under `if (!DEADMONSTER(mtmp))` (queue row `mon.c` fox death/detach
// lifecycle Tourist, D-2420 W4: scen-normal-Tourist-92061 step 3 — C
// `rn2(5)=4`@distfleeck vs JS `rn2(3)=0`@corpse_chance right after the
// matched destroy_items, JS topline «m_detach: fox is already detached?»
// vs C «little dog misses newt»).
// JS ran the second monkilled unconditionally on mhp<=0, so a monster
// thitm had already killed (monkilled→mondead→m_detach) was detached a
// second time (mon.c:2792 impossible → --More--) and drew a second
// corpse_chance + make_corpse creation where C draws distfleeck.
// This file pins the guard headless: an already-dead fox resolves the
// trap with exactly one corpse_chance draw (pre-fix it throws
// "Input queue empty" on the double-detach --More--; proven via stash),
// and a live survivor is untouched by zero naked xtradmg.
globalThis.__NH_RNG_TRACE = true;

const FOX = monsterNames.indexOf("PM_FOX");

describe("trapeffect_fire_trap xtradmg guard (trap.c:1800-1806)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      iflags: game.iflags,
      fmon: game.fmon,
      level: game.level,
    };
    initRng(92061);
    enableRngLog();
    game.u = { ux: 0, uy: 0 };
    game.iflags = {};
    game.fmon = [];
    // deathdrops so LEVEL_SPECIFIC_NOCORPSE stays false (fox draws its
    // corpse_chance); at() null keeps newsym headless.
    game.level = { flags: { deathdrops: true }, at: () => null };
  });
  afterEach(() => {
    game.u = saved.u;
    game.iflags = saved.iflags;
    game.fmon = saved.fmon;
    game.level = saved.level;
  });

  const mockFox = (over = {}) => ({
    mhp: 0,
    mhpmax: 8,
    mx: 65,
    my: 14,
    mux: 0,
    muy: 0,
    m_id: 4242,
    mtame: 0,
    mpeaceful: 0,
    mcansee: 1,
    mstate: 0,
    mleashed: 0,
    isgd: 0,
    isshk: 0,
    iswiz: 0,
    wormno: 0,
    mtrapped: 0,
    msleeping: 0,
    minvent: null,
    cham: -1,
    data: { mndx: FOX, mlet: "S_DOG", msize: 1, geno: 0, mresists: 0, msound: 0 },
    ...over,
  });
  const corpseDraws = () =>
    getRngLog().filter((e) => e.includes("corpse_chance"));

  it("does not re-kill a monster thitm already killed", async () => {
    const fox = mockFox({ mhp: 0 });
    game.fmon.push(fox);
    // Pre-fix: rejects with "Input queue empty" — the second monkilled
    // re-detaches and its impossible pline blocks on --More--.
    const ret = await trapeffect_fire_trap(fox, { tx: 65, ty: 14 }, 0);
    assert.equal(ret, Trap_Killed_Mon);
    assert.equal(corpseDraws().length, 1);
    assert.ok((fox.mstate | 0) & MON_DETACH);
    assert.equal(fox.mhp | 0, 0);
  });

  it("leaves a live survivor unkilled (zero naked xtradmg)", async () => {
    const fox = mockFox({ mhp: 30, mhpmax: 30 });
    game.fmon.push(fox);
    const ret = await trapeffect_fire_trap(fox, { tx: 65, ty: 14 }, 0);
    assert.equal(ret, Trap_Effect_Finished);
    assert.equal((fox.mstate | 0) & MON_DETACH, 0);
    assert.ok((fox.mhp | 0) > 0);
  });
});
