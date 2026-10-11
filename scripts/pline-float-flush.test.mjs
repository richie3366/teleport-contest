import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { pline, clear_nhwindow_message } from "../js/display.js";

// C has no floats: attrib.c exercise `:516–517` calls encumber_msg()
// synchronously, so the crossing message — including its --More-- ack —
// is fully delivered before the game moves on. JS cannot block: the
// `void encumber_msg()` call floats delivery past later game code, and
// its in-flight vpline held in_pline at 1 across its More-wait, so the
// next vplines hit the pline.c `:243–249` in_pline gate and were
// silently dropped (D-3830: the master-lich cast line plus two smoulders
// lost at scen-sweep-Priest-95316 step 681, measured wasIn=1; only the
// third smoulder survived). vpline now chains a contended entry after
// the in-flight outer's completion instead of dropping it (true nesting
// keeps the legacy drop via the stack probe).
//
// Headless: ux 0 skips flush_screen, short texts never reach more(), so
// no display mock or input is needed. The eager `void pline(...)` call
// reproduces the exercise float shape exactly.

describe("contended vpline chains instead of dropping (D-3830)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      iflags: game.iflags,
      program_state: game.program_state,
      windowprocs: game.windowprocs,
      pending: game._pending_message,
      a11y: game.a11y,
      winMessage: game.WIN_MESSAGE,
    };
    game.u = { ux: 0, uy: 0 };
    game.iflags = { window_inited: 1, msg_history: 20 };
    game.program_state = {};
    game.windowprocs = undefined;
    game._pending_message = "";
    game.a11y = undefined;
    game.WIN_MESSAGE = undefined;
    clear_nhwindow_message();
  });
  afterEach(() => {
    game.u = saved.u;
    game.iflags = saved.iflags;
    game.program_state = saved.program_state;
    game.windowprocs = saved.windowprocs;
    game._pending_message = saved.pending;
    game.a11y = saved.a11y;
    game.WIN_MESSAGE = saved.winMessage;
    clear_nhwindow_message();
  });

  it("a print following a float is delivered, in C order", async () => {
    void pline("floated");
    await pline("next");
    await null;
    await null;
    assert.equal(game._pending_message, "floated  next");
  });

  it("two floats plus a print serialize FIFO", async () => {
    void pline("one");
    void pline("two");
    await pline("three");
    await null;
    await null;
    assert.equal(game._pending_message, "one  two  three");
  });

  it("pre-window entries still take the legacy drop", async () => {
    game.iflags.window_inited = 0;
    void pline("floated");
    await pline("next");
    await null;
    await null;
    assert.equal(game._pending_message, "");
  });
});
