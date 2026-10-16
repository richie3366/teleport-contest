import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: youprop.h Blind ≡ (HBlinded || EBlinded) && !BBlinded (D-0716
// house shape). js/dig.js Blind() read only the sticky u.Blind/u.ublind
// mirrors (D-3995 class): a blindfold-wearing (EBlinded) hero read as
// seeing, so zap_dig's maze_dig nondiggable-wall arm printed "The wall
// glows then fades." where C stays silent.
// Single prefix per file (multi-prefix runSegment leaks module state).
describe("dig.js Blind gates zap_dig wall-glow", () => {
  it("scen-sweep-Barbarian-50750065 step 351: C silent, no wall-glow", { timeout: 240000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes-reserve/scen-sweep-Barbarian-50750065.recipe.json", import.meta.url), "utf8"));
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
    // Steps 0..351 consume 351 moves chars (1:1 recorded keys).
    const g = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 351), storage,
    });
    const screens = g.getScreens?.() || [];
    assert.ok(screens.length > 351, `expected 352+ screens, got ${screens.length}`);
    // C screen 351 row 0 is empty (blind hero, maze nondiggable wall).
    const row0 = (screens[351] || "").split("\n")[0];
    assert.equal(row0, "",
      `step 351 topline: want C silence, got ${JSON.stringify(row0)}`);
    // Mechanism: blindfold still worn (extrinsic blind set).
    const { game } = await import("../js/gstate.js");
    assert.ok((game.u?.EBlinded | 0) !== 0,
      `step 351: want EBlinded set (blindfold worn), got ${game.u?.EBlinded}`);
  });
});
