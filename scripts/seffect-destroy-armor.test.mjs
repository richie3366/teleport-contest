import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { seffect_destroy_armor } from "../js/read.js";
import { objectNames } from "../js/objects.js";
import { W_ARMG } from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: read.c seffect_destroy_armor `:1380–1383` — cursed scroll, hero
// unconfused, worn armor uncursed → `else if (disintegrate_arm(otmp))`
// (queue writer row from delivered [measure] D-2413:
// scen-wish-Healer-92173 step 230 — C «Your gloves vanish!» via
// obj_resists(armor,0,90), JS kept the gloves on
// `else disintegrate_arm deferred`). Pins the headless envelope: the
// scroll survives (C `return`, not useup), worn uncursed gloves are
// destroyed through the live disintegrate_arm, and the cursed-armor
// vibrate branch still keeps its target.
const LEATHER_GLOVES = objectNames.indexOf("LEATHER_GLOVES");

describe("seffect_destroy_armor cursed arm (read.c:1380-1383)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      invent: game.invent,
      context: game.context,
      flags: game.flags,
      moves: game.moves,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.invent = saved.invent;
    game.context = saved.context;
    game.flags = saved.flags;
    game.moves = saved.moves;
  });

  // Hero wears exactly one piece (gloves), mirroring the Healer session
  // (only uarmg worn → single obj_resists draw). some_armor then picks
  // the gloves with no rn2 steal, so the only draw is the destroy roll.
  const setup = ({ glovesCursed = false } = {}) => {
    initRng(92173);
    // Headless --More-- dismissal: each destroy plines, and the topline
    // NEED_MORE left behind would block the next pline on nhgetch.
    clear_nhwindow_message();
    game.moves = 12;
    const gloves = {
      otyp: LEATHER_GLOVES,
      o_id: 4242,
      cursed: glovesCursed,
      blessed: false,
      oerodeproof: false,
      oartifact: 0,
      spe: 0,
      quan: 1,
      owt: 10,
      // C worn.c invariant: a worn piece carries its slot mask, else
      // setworn's Setworn-impossible fires (test-setup artifact, not C).
      owornmask: W_ARMG,
    };
    game.u = { uarmg: gloves, uwep: null, twoweap: false };
    game.invent = [gloves];
    game.context = {};
    game.flags = {};
    return { scroll: { cursed: true }, gloves };
  };

  it("destroys worn uncursed gloves via disintegrate_arm, scroll survives", async () => {
    const { scroll, gloves } = setup();
    const ret = seffect_destroy_armor(scroll);
    assert.ok(
      ret instanceof Promise,
      "seffect_destroy_armor must stay async (awaits disintegrate_arm)",
    );
    // C `return` out of the scursed block: the scroll is NOT used up here
    // (doread consumes it on the normal path).
    assert.equal(await ret, scroll);
    // C «Your gloves vanish!»: slot cleared and object out of invent.
    // obj_resists(x,0,90) on non-artifact armor never resists, so this is
    // deterministic — no seed fitting.
    assert.ok(
      game.u.uarmg !== gloves,
      "uarmg slot must no longer hold the gloves",
    );
    assert.ok(
      !game.invent.includes(gloves),
      "destroyed gloves must leave invent",
    );
  });

  it("keeps cursed worn armor on the vibrate branch (no disintegrate)", async () => {
    const { scroll, gloves } = setup({ glovesCursed: true });
    assert.equal(await seffect_destroy_armor(scroll), scroll);
    assert.equal(game.u.uarmg, gloves);
    assert.ok(game.invent.includes(gloves));
    // C `otmp->spe += -1` under the `spe >= -6` guard (adj_abon body
    // stays a named deferral).
    assert.equal(gloves.spe, -1);
  });
});

// C ref: read.c seffect_destroy_armor `:1333–1352, :1372–1395` — whole-body
// arms added by D-2640: confused naked (bones itch), confused erodeproof
// swap, uncursed destroy_arm failure (skin itch), vibrate stun.
describe("seffect_destroy_armor whole-body arms (read.c:1324-1396)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      invent: game.invent,
      context: game.context,
      flags: game.flags,
      moves: game.moves,
      objects: game.objects,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.invent = saved.invent;
    game.context = saved.context;
    game.flags = saved.flags;
    game.moves = saved.moves;
    game.objects = saved.objects;
  });

  const mkGloves = (over = {}) => ({
    otyp: LEATHER_GLOVES,
    o_id: 4243,
    cursed: false,
    blessed: false,
    oerodeproof: false,
    oartifact: 0,
    spe: 0,
    quan: 1,
    owt: 10,
    owornmask: W_ARMG,
    ...over,
  });

  // C `:1334–1339` — confused, nothing worn: bones itch, scroll used up.
  it("confused naked → bones-itch strange_feeling, scroll used up", async () => {
    initRng(92173);
    clear_nhwindow_message();
    game.moves = 12;
    game.u = { HConfusion: 5, uwep: null, twoweap: false };
    const scroll = { otyp: -1, cursed: false, blessed: false, quan: 1 };
    game.invent = [scroll];
    game.context = {};
    game.flags = {};
    assert.equal(await seffect_destroy_armor(scroll), null);
    assert.ok(!game.invent.includes(scroll));
  });

  // C `:1340–1349` — confused erodeproof swap with shop-charge restore.
  it("confused erodeproof swap restores proof, scroll survives", async () => {
    initRng(92173);
    clear_nhwindow_message();
    game.moves = 12;
    const gloves = mkGloves({ oerodeproof: 1 });
    game.u = { HConfusion: 5, uarmg: gloves, uwep: null, twoweap: false };
    game.invent = [gloves];
    const scroll = { otyp: -1, cursed: false, blessed: false, quan: 1 };
    game.context = {};
    game.flags = {};
    assert.equal(await seffect_destroy_armor(scroll), scroll);
    // uncursed scroll → new_erodeproof FALSE → COST_DEGRD arm ran, final 0
    assert.equal(gloves.oerodeproof, 0);
  });

  // C `:1392–1393` — uncursed, nothing worn: destroy_arm fails, skin itch.
  it("uncursed with no armor → destroy_arm fails → skin-itch null", async () => {
    initRng(92173);
    clear_nhwindow_message();
    game.moves = 12;
    game.u = { uwep: null, twoweap: false };
    const scroll = { otyp: -1, cursed: false, blessed: false, quan: 1 };
    game.invent = [scroll];
    game.context = {};
    game.flags = {};
    assert.equal(await seffect_destroy_armor(scroll), null);
    assert.ok(!game.invent.includes(scroll));
  });

  // C `:1363` — vibrate arm stuns: (HStun & TIMEOUT) + rn1(10,10).
  it("vibrate arm sets HStun via make_stunned", async () => {
    initRng(92173);
    clear_nhwindow_message();
    game.moves = 12;
    const gloves = mkGloves({ cursed: true });
    game.u = { uarmg: gloves, uwep: null, twoweap: false, HStun: 0 };
    game.invent = [gloves];
    const scroll = { cursed: true, quan: 1 };
    game.context = {};
    game.flags = {};
    assert.equal(await seffect_destroy_armor(scroll), scroll);
    assert.ok((game.u.HStun | 0) > 0, "HStun must be set by make_stunned");
  });
});
