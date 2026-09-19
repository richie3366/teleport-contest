import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { read_tribute, Death_quote } from "../js/files.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { BUFSZ } from "../js/const.js";

// C ref: files.c read_tribute `:3473–3645` + Death_quote `:3647–3653`.
// Exercises the nowin_buf (one-line) path against the embedded tribute
// text: no window, no pline, no message history. The only state touched
// is the choose_passage novel tracking on game.context (saved/restored).
describe("read_tribute (files.c:3473-3645)", () => {
  let savedContext;
  beforeEach(() => {
    savedContext = game.context;
    game.context = {};
    initRng(1234);
  });
  afterEach(() => {
    game.context = savedContext;
  });

  it("Death_quote fills the one-line buffer (C :3647-3653)", async () => {
    const holder = { s: "" };
    const grasped = await Death_quote(holder);
    assert.equal(grasped, true);
    assert.ok(holder.s.length > 0);
    assert.ok(!holder.s.includes("\n"));
  });

  it("unknown title leaves the buffer empty (C :3615-3617)", async () => {
    const holder = { s: "dirty" };
    const grasped = await read_tribute(
      "books",
      "No Such Book Title",
      0,
      holder,
      BUFSZ,
      7,
    );
    assert.equal(grasped, false);
    assert.equal(holder.s, "");
  });

  it("missing mandatories return FALSE with nowin_buf (C :3492-3497)", async () => {
    const holder = { s: "dirty" };
    assert.equal(
      await read_tribute(null, "Death Quotes", 0, holder, BUFSZ, 1),
      false,
    );
    assert.equal(
      await read_tribute("Death", null, 0, holder, BUFSZ, 1),
      false,
    );
  });

  it("explicit passage past the count cannot match (C :3553-3556)", async () => {
    const holder = { s: "" };
    const grasped = await read_tribute(
      "Death",
      "Death Quotes",
      9999,
      holder,
      BUFSZ,
      1,
    );
    assert.equal(grasped, false);
    assert.equal(holder.s, "");
  });
});
