import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { resetInputState } from "../js/input.js";
import { dowield, doswapweapon } from "../js/wield.js";
import { rhack, cmdq_add_ec } from "../js/cmd.js";
import { cmdq_add_key } from "../js/invent.js";
import { ECMD_FAIL, CQ_CANNED } from "../js/const.js";
import { objectNames, WEAPON_CLASS } from "../js/objects.js";
import { MZ_MEDIUM } from "../js/monsters.js";

// C ref: wield.c dowield `:355–457` / doswapweapon `:461–501` — the
// welded-uwep arms return ECMD_FAIL, and C rhack `:3812–3816` clears the
// canned queue on CANCEL|FAIL. The port collapsed FAIL to 0, so a canned
// `fire` (dofire requeues doswapweapon/dowield/dofire while a launcher
// sits unwielded) requeued forever against a welded weapon: worker
// ETIMEDOUT, no screens (scen-sweep-Samurai-49956004). Pins the ECMD_FAIL
// returns and the one-pass queue drain.
const DAGGER = objectNames.indexOf("DAGGER");
const BOW = objectNames.indexOf("BOW");

describe("welded wield/swap returns ECMD_FAIL and drains canned fire (wield.c)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      invent: game.invent,
      flags: game.flags,
      iflags: game.iflags,
      context: game.context,
      multi: game.multi,
      in_doagain: game.in_doagain,
      canned: game._cmdq_canned,
      repeat: game._cmdq_repeat,
      pending: game._pending_message,
    };
    resetInputState();
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.invent = saved.invent;
    game.flags = saved.flags;
    game.iflags = saved.iflags;
    game.context = saved.context;
    game.multi = saved.multi;
    game.in_doagain = saved.in_doagain;
    game._cmdq_canned = saved.canned;
    game._cmdq_repeat = saved.repeat;
    game._pending_message = saved.pending;
    resetInputState();
  });

  const setup = () => {
    assert.ok(DAGGER >= 0 && BOW >= 0, "DAGGER/BOW otyps exist");
    const uwep = {
      otyp: DAGGER, oclass: WEAPON_CLASS, quan: 1, invlet: "m",
      cursed: true, bknown: 0, dknown: 0, owornmask: 0,
    };
    const launcher = {
      otyp: BOW, oclass: WEAPON_CLASS, quan: 1, invlet: "c",
      cursed: false, bknown: 0, dknown: 0, owornmask: 0,
    };
    game.youmonst = { data: { msize: MZ_MEDIUM, mflags1: 0 } };
    game.invent = [uwep, launcher];
    game.u = { uwep, uquiver: null, uswapwep: null, ux: 5, uy: 5 };
    game.flags = {};
    game.iflags = {};
    game.context = {};
    game.multi = 0;
    game.in_doagain = 0;
    game._cmdq_canned = [];
    game._cmdq_repeat = [];
    game._pending_message = "";
    return { uwep, launcher };
  };

  it("doswapweapon returns ECMD_FAIL when uwep is welded", async () => {
    setup();
    assert.equal(await doswapweapon(), ECMD_FAIL);
  });

  it("dowield returns ECMD_FAIL via a canned key when uwep is welded", async () => {
    setup();
    cmdq_add_key(CQ_CANNED, "c");
    assert.equal(await dowield(), ECMD_FAIL);
    assert.equal(game._cmdq_canned.length, 0);
  });

  it("one rhack pass over canned swap+swap drains the queue on FAIL", async () => {
    setup();
    cmdq_add_ec(CQ_CANNED, doswapweapon);
    cmdq_add_ec(CQ_CANNED, doswapweapon);
    await rhack(1);
    assert.equal(game._cmdq_canned.length, 0);
  });
});
