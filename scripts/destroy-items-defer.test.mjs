import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { destroy_items } from "../js/zap.js";
import { objectNames, objects_globals_init, RING_CLASS, WAND_CLASS } from "../js/objects.js";
import { W_RING, OBJ_INVENT } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: zap.c destroy_items `:5965–6097` — reservoir-sample eligible
// stacks over a bypass_objlist / nxt_unbypassed_obj traversal, defer worn
// levitation/flying gear to a second pass (`:6059–6072`), destroy via
// maybe_destroy_item with o_id/where identity, clear bypass, return dmg_out.
// AD_ELEC=6 per C monattk.h; RIN_LEVITATION carries oc_oprop LEVITATION(48)
// so a worn one defers (C :6064–6072); WAN_FIRE takes the WAND_CLASS arm
// (dmg rnd(10), no recharge gate — that gate is RING_CLASS-only, C :5864).
// Seed 1 (found by brute force): rn2(5)=0 (limit stays 20 on dmg_in=100),
// wand dmg rnd(10)=5, wand cnt rn2(3)=0 (destroyed in pass 0), ring cnt
// rn2(3)=1 (survives in pass 1).
// Pre-fix single-pass order destroys the ring first (log[1] would be the
// ring cnt rn2(3), and the ring would leave invent); post-fix pass order
// puts the wand's rnd(10) at log[1] and keeps the ring.
const AD_ELEC = 6;
const RIN_LEVITATION = objectNames.indexOf("RIN_LEVITATION");
const WAN_FIRE = objectNames.indexOf("WAN_FIRE");

describe("destroy_items deferral + RNG order (zap.c:5965-6097)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      invent: game.invent,
      context: game.context,
      objects: game.objects,
      bases: game.bases,
      oclass_prob_totals: game.oclass_prob_totals,
      current_wand: game.current_wand,
      program_state: game.program_state,
    };
    objects_globals_init();
    clear_nhwindow_message();
    game.program_state = {};
    game.current_wand = null;
    game.context = {};
    // HShock_resistance pins the AD_ELEC xresist arm ("You aren't hurt!")
    // so the wand's rnd(10)=9 never reaches losehp headless.
    game.u = { HShock_resistance: 1 };
    game.youmonst = { _youmonst: true };
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.invent = saved.invent;
    game.context = saved.context;
    game.objects = saved.objects;
    game.bases = saved.bases;
    game.oclass_prob_totals = saved.oclass_prob_totals;
    game.current_wand = saved.current_wand;
    game.program_state = saved.program_state;
  });

  const mkobj = (over) => ({
    o_id: 4242,
    quan: 1,
    owt: 10,
    owornmask: 0,
    where: OBJ_INVENT,
    blessed: false,
    cursed: false,
    oartifact: 0,
    in_use: false,
    ...over,
  });

  it("destroys the non-deferred wand in pass 0, keeps the deferred ring", async () => {
    const ring = mkobj({
      otyp: RIN_LEVITATION,
      oclass: RING_CLASS,
      o_id: 1001,
      owornmask: W_RING,
    });
    const wand = mkobj({ otyp: WAN_FIRE, oclass: WAND_CLASS, o_id: 1002 });
    game.invent = [ring, wand];
    initRng(1);
    enableRngLog();
    const dmgOut = await destroy_items(game.youmonst, AD_ELEC, 100);
    // Wand destroyed in the pass-0 sweep, ring's cnt roll missed in pass 1.
    assert.ok(!game.invent.includes(wand), "destroyed wand must leave invent");
    assert.ok(game.invent.includes(ring), "surviving ring must stay");
    assert.equal(ring.quan, 1);
    assert.equal(dmgOut, 5);
    // C :6074/:6094 — traversal bypass bits are cleared afterwards.
    assert.equal(ring.bypass | 0, 0);
    // Draw order pins the two-pass structure: wand rnd(10), wand cnt,
    // then the ring cnt — rnd(10) at log[1] proves the non-deferred item
    // burned before the deferred one was even rolled.
    const log = getRngLog();
    assert.equal(log.length, 4);
    assert.equal(log[0], "rn2(5)=0");
    assert.equal(log[1], "rnd(10)=5");
    assert.equal(log[2], "rn2(3)=0");
    assert.equal(log[3], "rn2(3)=1");
  });

  it("returns 0 on dmg_in=0 after the single C limit-gate draw", async () => {
    game.invent = [];
    initRng(5);
    enableRngLog();
    assert.equal(await destroy_items(game.youmonst, AD_ELEC, 0), 0);
    // C :5997 evaluates rn2(DMG_DESTROY_SCALE) unconditionally in the
    // limit condition, then :6006–6008 returns before any traversal.
    const log = getRngLog();
    assert.equal(log.length, 1);
    assert.ok(log[0].startsWith("rn2(5)="));
  });
});
