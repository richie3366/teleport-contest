import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

// C ref: allmain.c moveloop_core once-per-player-input `:473–479` — the
// map paints here ONLY inside the botl|botlx / time_botl arms (via
// curs_on_u); there is no unconditional flush_screen(1). C tty_yn_function
// (topl.c) then serves a pending TOPLINE_NEED_MORE with a direct more()
// — no flush — so a turn's map updates stay invisible until the prompt
// after the more clears. Pre-fix JS flushed unconditionally in
// moveloop_core (D-2405 leftover), painting one screen ahead of C.
// Pins the machine-recorded C expectation (doname_base cliff rowDiff):
// at step 285 the turn ran (dog logically at (27,16)) but the screen
// still shows it at (27,17) under the yn-preface --More--.
describe("moveloop_core once-per-input no unconditional flush (allmain.c:473-479)", () => {
  it("replays scen-container-Barbarian-94366 through step 285 with C's stale map", async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-container-Barbarian-94366.recipe.json", import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 285), storage,
    });
    const screens = game.getScreens?.() || [];
    assert.ok(screens.length > 285, `expected 286+ screens (got ${screens.length})`);
    const g = decodeScreen(String(screens[285] || ""));
    const row = (y) => g[y + 1].map(renderCell).join("");
    // Map rows 16-17 in screen coords (decode rows 17-18): C shows the
    // tool '(' at (27,16) and the dog 'd' still at (27,17).
    assert.match(row(16), /│··\$\?\(│#/, `row 16 keeps C's '(' (got ${JSON.stringify(row(16))})`);
    assert.match(row(17), /│%·\(·d@#/, `row 17 keeps C's 'd' (got ${JSON.stringify(row(17))})`);
  });
});
