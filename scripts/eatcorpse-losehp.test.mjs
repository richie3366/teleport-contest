import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { eatcorpse } from "../js/eat.js";
import { objectNames } from "../js/objects.js";
import { monsterNames } from "../js/generated/monsters_data.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { clear_nhwindow_message } from "../js/display.js";

// C ref: eat.c eatcorpse `:1926` acidic arm → losehp(rnd(15), …) and
// `:1942` cadaver arm → losehp(rnd(8), …) (queue Must-fix/Open head:
// D-2402 left both as inline `uhp -= rnd(N)` + botl, so Upolyd/mh
// handling, end_running, killer attribution and the death path never
// ran). This file pins the headless envelope of the acid arm through
// canonical losehp (ochre jelly: acidic, not poisonous): non-fatal
// damage shape, Upolyd→mh routing, and the run/multi clear. The fatal
// arm (finish_losehp_done → done(DIED)) needs full display/game-over
// state, so it is covered by session verify, not here.
const CORPSE = objectNames.indexOf("CORPSE");
const PM_OCHRE_JELLY = monsterNames.indexOf("PM_OCHRE_JELLY");

describe("eatcorpse acidic arm (eat.c:1926 → canonical losehp)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      context: game.context,
      flags: game.flags,
      moves: game.moves,
      multi: game.multi,
      killer: game.killer,
      program_state: game.program_state,
      needsDone: game._losehp_needs_done,
      needsWail: game._needs_maybe_wail,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.context = saved.context;
    game.flags = saved.flags;
    game.moves = saved.moves;
    game.multi = saved.multi;
    game.killer = saved.killer;
    game.program_state = saved.program_state;
    game._losehp_needs_done = saved.needsDone;
    game._needs_maybe_wail = saved.needsWail;
  });

  // Fresh ochre-jelly corpse: rotted == 0 so the tainted arm stays
  // shut and the acidic arm is reached deterministically.
  const setup = (uExtra = {}) => {
    initRng(4242);
    // Headless --More-- dismissal: each eatcorpse plines once, and the
    // topline NEED_MORE left behind would block the next pline on nhgetch.
    clear_nhwindow_message();
    game.moves = 1000;
    game.u = {
      uhp: 30,
      uhpmax: 30,
      umonnum: 5,
      umonster: 5,
      uconduct: { unvegan: 1, unvegetarian: 0 },
      ...uExtra,
    };
    game.context = { run: 5, mv: 2, travel: 3, victual: {} };
    game.flags = {};
    game.multi = 3;
    game.killer = null;
    game.program_state = {};
    game._losehp_needs_done = false;
    game._needs_maybe_wail = false;
    return {
      otyp: CORPSE,
      corpsenm: PM_OCHRE_JELLY,
      age: 1000,
      globby: false,
      cursed: false,
      blessed: false,
      owt: 50,
    };
  };

  it("is async and routes acid damage through losehp, not inline uhp", async () => {
    const otmp = setup();
    const ret = eatcorpse(otmp);
    assert.ok(ret instanceof Promise, "eatcorpse must return a Promise");
    assert.equal(await ret, 0);
    // rnd(15): exactly one canonical draw, 1..15 off uhp.
    assert.ok(
      game.u.uhp >= 15 && game.u.uhp <= 29,
      `uhp 30 - rnd(15), got ${game.u.uhp}`,
    );
    assert.equal(game.u.uhpmax, 30);
    assert.equal(game.flags.botl, true);
    // C hack.c losehp end_running(TRUE): rush cleared (inline code never did).
    assert.equal(game.context.run, 0);
    assert.equal(game.context.mv, 0);
    assert.equal(game.context.travel, 0);
    assert.equal(game.multi, 0);
    // Non-fatal: no killer, no death path, no wail (uhp*10 >= uhpmax).
    assert.equal(game.killer, null);
    assert.ok(!game.program_state?.gameover);
    assert.ok(!game._losehp_needs_done);
    assert.ok(!game._needs_maybe_wail);
  });

  it("damages mh instead of uhp when polymorphed (Upolyd)", async () => {
    const otmp = setup({ umonnum: 7, umonster: 5, mh: 20, mhmax: 20 });
    assert.equal(await eatcorpse(otmp), 0);
    assert.ok(
      game.u.mh >= 5 && game.u.mh <= 19,
      `mh 20 - rnd(15), got ${game.u.mh}`,
    );
    assert.equal(game.u.uhp, 30);
    assert.equal(game.flags.botl, true);
    assert.equal(game.context.run, 0);
    assert.equal(game.killer, null);
    assert.ok(!game.program_state?.gameover);
  });
});
