import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { chwepon } from "../js/wield.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { clear_nhwindow_message, getmsghistory } from "../js/display.js";
import { pushKeys, resetInputState } from "../js/input.js";

// D-3680 — wield.c `:943` via live potion.c strange_feeling: the no-weapon
// chwepon arm consumes the scroll through strange_feeling. Beginner +
// extrinsic-only hallucination prints the "normal" variant (C
// potion.c:1465 Hallucination-macro arm). The deleted wield.js clone read
// u.Hallucination only and printed "strange" here.
describe("chwepon no-weapon arm (wield.c:917-948)", () => {
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

  it("beginner + extrinsic-only hallu → 'normal' feeling text", async () => {
    initRng(92173);
    clear_nhwindow_message();
    // vpline drops text pre-window (C pline.c:243 raw path); window_inited
    // routes through putmesg into the message ring getmsghistory walks
    // (bind-mousebtn.test.mjs precedent).
    const savedIflags = game.iflags;
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    resetInputState();
    pushKeys([" ", " ", " ", " "]);
    game.moves = 12;
    game.u = {
      uwep: null,
      twoweap: false,
      Hallucination: false,
      HHallucination: 1,
    };
    const scroll = { otyp: -1, cursed: false, blessed: false, quan: 1 };
    game.invent = [scroll];
    game.context = {};
    game.flags = { beginner: true };
    assert.equal(await chwepon(scroll, 1), 0);
    assert.ok(!game.invent.includes(scroll));
    const seen = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) {
      seen.push(m);
    }
    game.iflags = savedIflags;
    assert.match(seen.join("\n"), /normal feeling/);
  });
});
