import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import { query_color } from "../js/options.js";
import { CLR_BLACK, CLR_GREEN, NO_COLOR } from "../js/terminal.js";

// C ref: coloratt.c query_color `:505–508` PICK_ONE readback (review 2031,
// D-3071 correction): a tty letter-press toggles the explicit row on and
// finishes with the preselected row still selected
// (win/tty/wintty.c:1755–1759, no PICK_ONE deselect), and picks come back
// in menu order (`:2808–2817`) — so count==2 returns menu-earlier of
// (preselected, explicit), not the explicit pick. The `:507`
// i==NO_COLOR redirect is dead ("no color" sorts last) but that implies
// menu-earlier, not explicit-pick.
// Menu letters: black='a', red='b', green='c', … (header takes none).
describe("query_color PICK_ONE menu-earlier (coloratt.c:505-508)", () => {
  let savedIflags;
  beforeEach(() => {
    savedIflags = game.iflags;
    game.iflags = { use_menu_color: false };
    resetInputState();
  });
  afterEach(() => {
    resetInputState();
    game.iflags = savedIflags;
  });

  it("dflt black + letter for green (sorts after) keeps black", async () => {
    pushKeys(['c']);
    assert.equal(await query_color(null, CLR_BLACK), CLR_BLACK);
  });

  it("dflt green + letter for black (sorts before) takes black", async () => {
    pushKeys(['a']);
    assert.equal(await query_color(null, CLR_GREEN), CLR_BLACK);
  });

  it("dflt NO_COLOR + letter for green takes green (path unchanged)", async () => {
    pushKeys(['c']);
    assert.equal(await query_color(null, NO_COLOR), CLR_GREEN);
  });

  it("dflt black + Enter returns the preselected entry", async () => {
    pushKeys(['\r']);
    assert.equal(await query_color(null, CLR_BLACK), CLR_BLACK);
  });

  it("ESC returns -1", async () => {
    pushKeys([27]);
    assert.equal(await query_color(null, CLR_BLACK), -1);
  });
});
