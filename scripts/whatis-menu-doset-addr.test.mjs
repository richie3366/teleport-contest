import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { optfn_boolean_do_set } from "../js/options.js";
import { game } from "../js/gstate.js";

// C refs: include/optlist.h NHOPTB(whatis_menu) `:874–876`
// (&iflags.getloc_usemenu) + NHOPTB(whatis_moveskip) `:877–879`
// (&iflags.getloc_moveskip), consumed by getpos.c `:1016` (menu vs cycle)
// and the getpos moveskip arm. Pins the doset-toggle write target: the
// toggle must flip the live getpos fields, not the dead iflags.whatis_*
// keys the table carried since c389536b57 (scen-options-Tourist-94111
// step 109: C showed the "Pick a monster" menu, JS cycled to the kitten).
function withCleanIflags(fn) {
  const saved = game.iflags;
  game.iflags = {};
  try {
    fn();
  } finally {
    if (saved === undefined) delete game.iflags;
    else game.iflags = saved;
  }
}

describe("whatis_menu/whatis_moveskip doset bindings (optlist.h:874-879)", () => {
  it("doset toggle writes iflags.getloc_usemenu (C :874-876)", () => {
    withCleanIflags(() => {
      optfn_boolean_do_set("whatis_menu", false); // negated=false → on
      assert.equal(game.iflags.getloc_usemenu, true);
      assert.equal(game.iflags.whatis_menu, undefined); // dead key stays dead
      optfn_boolean_do_set("whatis_menu", true); // negated=true → off
      assert.equal(game.iflags.getloc_usemenu, false);
    });
  });

  it("doset toggle writes iflags.getloc_moveskip (C :877-879)", () => {
    withCleanIflags(() => {
      optfn_boolean_do_set("whatis_moveskip", false);
      assert.equal(game.iflags.getloc_moveskip, true);
      assert.equal(game.iflags.whatis_moveskip, undefined);
      optfn_boolean_do_set("whatis_moveskip", true);
      assert.equal(game.iflags.getloc_moveskip, false);
    });
  });
});
