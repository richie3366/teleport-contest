import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: wizard.c resurrect `:761–779` + makemon.c `:1472–1501`.
// C prints the Wizard's appear Norep inside makemon, gated on
// canseemon/sensemon (`:1479–1489`); resurrect itself prints only the
// voice pline + verbalize, on both the makemon and migrating paths.
// JS duplicated the appear inline in resurrect (D-0559) without the
// gate, so a blind hero got an extra "It suddenly appears..." line that
// filled the message window one line early and hid C's
// "A voice booms out..." behind --More-- (D-3735). The gated
// makemon_appear_msg on the makemon path is the only appear now.
// Pins the machine-recorded C expectation at scen-sweep-Barbarian-95309
// step 128 (board): a blind Rogue with the granted Amulet arrives on
// the Plane of Fire, Rodney is makemon'd, C shows the voice.
describe("resurrect blind arrival: no ungated appear (wizard.c:761-779)", () => {
  it("blind hero sees the voice and no suddenly-appears line", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Barbarian-95309.recipe.json", import.meta.url), "utf8"));
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
      moves: seg.moves.slice(0, 136), storage,
    });
    const screens = (game.getScreens?.() || []).join("\n");
    assert.ok(screens.includes("A voice booms out..."),
      "C's resurrect voice painted");
    assert.ok(!screens.includes("suddenly appears"),
      "no ungated appear line for the blind hero");
  });
});
