import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { optfn_boolean_do_set } from "../js/options.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_boolean do_set after-change (`:5297–5326` before
// the in-game switch, `:5353–5430` the switch). JS doset's bool path calls
// optfn_boolean_do_set (not optfn_boolean), so the arms below must mirror C
// here too: scen-options-Valkyrie-94151 step 43 shows C printing
// "'hilite_pet' option toggled on.--More--" — the --More-- comes from
// doset → reset_needed_visuals → docrt → cls flushing the pending message,
// which only runs when opt_need_redraw was set (measured C backtrace:
// doset:8974 reset_needed_visuals:9003 docrt cls:2197 display MESSAGE
// more). Without the hilite_pet/color arms the flag stayed clear and JS
// showed the message with no --More--.
function withCleanGo(fn) {
  const savedGo = game.go;
  const savedIflags = game.iflags;
  const savedFlags = game.flags;
  const savedA11y = game.a11y;
  const savedGive = game.give_opt_msg;
  game.go = {};
  game.iflags = { use_color: false };
  game.flags = {};
  game.a11y = {};
  delete game.give_opt_msg;
  return Promise.resolve()
    .then(fn)
    .finally(() => {
      if (savedGo === undefined) delete game.go;
      else game.go = savedGo;
      if (savedIflags === undefined) delete game.iflags;
      else game.iflags = savedIflags;
      if (savedFlags === undefined) delete game.flags;
      else game.flags = savedFlags;
      if (savedA11y === undefined) delete game.a11y;
      else game.a11y = savedA11y;
      if (savedGive === undefined) delete game.give_opt_msg;
      else game.give_opt_msg = savedGive;
    });
}

describe("doset bool after-change arms (options.c:5297-5430)", () => {
  it("hilite_pet sets opt_need_redraw (C :5314)", async () => {
    await withCleanGo(async () => {
      game.iflags.hilite_pet = false;
      const applied = await optfn_boolean_do_set("hilite_pet", false, false);
      assert.equal(applied, true);
      assert.equal(game.iflags.hilite_pet, true);
      assert.equal(game.go.opt_need_redraw, true);
    });
  });

  it("color sets opt_need_redraw + opt_need_glyph_reset (C :5406-5407)", async () => {
    await withCleanGo(async () => {
      const applied = await optfn_boolean_do_set("color", false, false);
      assert.equal(applied, true);
      assert.equal(game.go.opt_need_redraw, true);
      assert.equal(game.go.opt_need_glyph_reset, true);
    });
  });

  it("perm_invent ON is a silent no-op without the wincap bit (C :5266-5268)", async () => {
    await withCleanGo(async () => {
      delete game.windowprocs; // contest tty wincap lacks WC_PERM_INVENT
      game.iflags.perm_invent = false;
      const applied = await optfn_boolean_do_set("perm_invent", false, false);
      assert.equal(applied, false);
      assert.equal(game.iflags.perm_invent, false);
    });
  });

  it("mention_decor resets prev_decor (C :5424)", async () => {
    await withCleanGo(async () => {
      const applied = await optfn_boolean_do_set("mention_decor", false, false);
      assert.equal(applied, true);
      assert.notEqual(game.iflags.prev_decor, undefined);
    });
  });
});
