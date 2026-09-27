import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  AUTOUNLOCK_UNTRAP,
  AUTOUNLOCK_APPLY_KEY,
  AUTOUNLOCK_KICK,
  AUTOUNLOCK_FORCE,
} from "../js/const.js";
import { game } from "../js/gstate.js";
import {
  parseoptions,
  get_option_value,
  reset_duplicate_opt_detection,
} from "../js/options.js";

// C refs: options.c optfn_autounlock `:1066–1168` + handler_autounlock
// `:5624–5672` (D-autounlock). Pins the newly wired allopt autounlock row
// headless: parseoptions do_set arms (none/value/fuzzy/negated/invalid)
// and the get_val spelling. The handler itself needs the menu driver
// (select_menu_pick_any), so it is covered by REACH, not here. game.flags
// autounlock + duplicate detection are snapshotted and restored below.
describe("optfn_autounlock port (options.c:1066-1168)", () => {
  let savedAutounlock;
  let hadAutounlock;
  beforeEach(() => {
    reset_duplicate_opt_detection();
    hadAutounlock = Object.prototype.hasOwnProperty.call(
      game.flags ?? {}, "autounlock");
    savedAutounlock = game.flags?.autounlock;
  });
  afterEach(() => {
    reset_duplicate_opt_detection();
    if (!game.flags) game.flags = {};
    if (hadAutounlock) game.flags.autounlock = savedAutounlock;
    else delete game.flags.autounlock;
  });

  it("valueless means apply-key; negated means none (C :1087-1089)", () => {
    assert.equal(parseoptions("autounlock", true, true), true);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_APPLY_KEY);
    assert.equal(parseoptions("!autounlock", true, true), true);
    assert.equal(game.flags.autounlock, 0);
    assert.equal(get_option_value("autounlock"), "none");
  });

  it("single and joined values set bits (C :1091-1143)", () => {
    assert.equal(parseoptions("autounlock:kick", true, true), true);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_KICK);
    assert.equal(get_option_value("autounlock"), "kick");
    assert.equal(
      parseoptions("autounlock:untrap+apply-key+kick+force", true, true), true);
    assert.equal(
      game.flags.autounlock,
      AUTOUNLOCK_UNTRAP | AUTOUNLOCK_APPLY_KEY | AUTOUNLOCK_KICK | AUTOUNLOCK_FORCE);
    assert.equal(
      get_option_value("autounlock"), "untrap + apply-key + kick + force");
    assert.equal(parseoptions("autounlock:untrap kick", true, true), true);
    assert.equal(
      game.flags.autounlock, AUTOUNLOCK_UNTRAP | AUTOUNLOCK_KICK);
  });

  it("fuzzy spellings match (C :1104-1108)", () => {
    assert.equal(parseoptions("autounlock:apply_key", true, true), true);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_APPLY_KEY);
    assert.equal(parseoptions("autounlock:applykey", true, true), true);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_APPLY_KEY);
    assert.equal(parseoptions("autounlock:force", true, true), true);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_FORCE);
  });

  it("invalid and none-with-some are silent errors (C :1129-1140)", () => {
    assert.equal(parseoptions("autounlock:kick", true, true), true);
    assert.equal(parseoptions("autounlock:bogus", true, true), false);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_KICK);
    assert.equal(parseoptions("autounlock:none+kick", true, true), false);
    assert.equal(game.flags.autounlock, AUTOUNLOCK_KICK);
    assert.equal(parseoptions("autounlock:none", true, true), true);
    assert.equal(game.flags.autounlock, 0);
  });

  it("unset bag reads as the do_init default (C :1073-1075)", () => {
    delete game.flags.autounlock;
    assert.equal(get_option_value("autounlock"), "apply-key");
  });
});
