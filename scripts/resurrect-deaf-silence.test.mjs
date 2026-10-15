import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

// C ref: wizard.c resurrect `:770–778` — the "A voice booms out..." +
// verbalize pair prints only `if (!Deaf)`, and C Deaf
// (youprop.h:125) is `HDeaf || EDeaf || u.uroleplay.deaf`.
// JS gated on the `u.Deaf` flat alone, so a hero deaf via intrinsic
// timeout (HDeaf) still heard the taunt: it queued behind the endgame
// arrival messages and surfaced on the amulet-wish turn, hiding C's
// "The Amulet is bestowing a wish upon you!" (D-3999). Pins the
// machine-recorded C expectation at scen-sweep-Archeologist-50055072
// step 1106 (board): HDeaf=39 hero arrives on the Plane of Earth,
// Rodney is makemon'd silently, the wish fires on schedule.
describe("resurrect deaf arrival: HDeaf suppresses the voice (wizard.c:770-778)", () => {
  it("HDeaf hero gets no taunt and the amulet wish on time", { timeout: 300000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Archeologist-50055072.recipe.json", import.meta.url), "utf8"));
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
    const g = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 1106), storage,
    });
    const u = game.u || {};
    assert.ok((u.HDeaf | 0) > 0, `hero intrinsically deaf (HDeaf=${u.HDeaf})`);
    const screens = g.getScreens?.() || [];
    const all = screens.join("\n");
    assert.ok(!all.includes("booms out"),
      "deaf hero never hears the resurrect voice");
    const last = String(screens[screens.length - 1] || "");
    const row0 = last.split("\n")[0].replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
    assert.ok(row0.includes("bestowing a wish"),
      `amulet wish on schedule at step 1106, got: ${JSON.stringify(row0.slice(0, 100))}`);
  });
});
