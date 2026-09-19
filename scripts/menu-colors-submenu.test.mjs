import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { pushKeys, resetInputState } from "../js/input.js";
import {
  handler_menu_colors, count_menucolors, free_one_menu_coloring,
  add_menu_coloring_parsed,
} from "../js/options.js";
import { CLR_RED } from "../js/terminal.js";

// C ref: options.c handler_menu_colors `:6407–6499` submenu plumbing
// (review 1465 trio, D-2512):
//  1. handle_add_list_remove `:9227–9231` — any.a_int++ precedes the
//     list/remove skip, so exit-with-empty carries 4 → opt_idx 3 (done).
//  2. remove arm `:6495` — PICK_ANY pick_cnt 0 (finish-empty) re-loops
//     via `goto menucolors_again`; only pick_cnt -1 (ESC) returns.
// Drives the exported handler headless with scripted keys (nhgetch
// throws on an empty queue, so an unexpected extra prompt fails loudly).
// handler returns optn_ok, the local const `1` (options.js:589).
const OPTN_OK = 1;
const ESC = 27;

const clearColors = () => {
  let n = 0;
  while (count_menucolors() > 0 && n++ < 50) free_one_menu_coloring(0);
};

describe("handler_menu_colors submenu plumbing (options.c:6407-6499)", () => {
  let savedIflags;
  beforeEach(() => {
    savedIflags = game.iflags;
    game.iflags = { use_menu_color: false };
    resetInputState();
    clearColors();
  });
  afterEach(() => {
    clearColors();
    resetInputState();
    game.iflags = savedIflags;
  });

  it("empty menu: 'x' exits at once (exit a_int 4 -> done)", async () => {
    assert.equal(count_menucolors(), 0);
    pushKeys(['x']);
    assert.equal(await handler_menu_colors(), OPTN_OK);
    // Exactly one key consumed: no list-arm detour awaiting a 2nd key.
    await assert.rejects(handler_menu_colors(), /Input queue empty/);
  });

  it("remove arm: finish-empty re-loops, exit then done", async () => {
    add_menu_coloring_parsed('probe.*', CLR_RED, 0);
    assert.equal(count_menucolors(), 1);
    pushKeys(['r', '\r', 'x']);
    assert.equal(await handler_menu_colors(), OPTN_OK);
    assert.equal(count_menucolors(), 1);
    // Enter-empty re-looped (consumed 'x' too): nothing left queued.
    await assert.rejects(handler_menu_colors(), /Input queue empty/);
  });

  it("remove arm: ESC exits without removing", async () => {
    add_menu_coloring_parsed('probe.*', CLR_RED, 0);
    pushKeys(['r', ESC]);
    assert.equal(await handler_menu_colors(), OPTN_OK);
    assert.equal(count_menucolors(), 1);
  });
});
