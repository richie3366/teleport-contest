import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: muse.c mbhitm WAN_STRIKING hits-you arm `:1618–1626` — losehp
// runs maybe_wail inline (hack.c:4289–4291); JS defers via
// _needs_maybe_wail and every losehp caller must drain it (zhitu
// :2319–2326 oil shape, D-3795). mbhitm never drained: 95342 step 737
// C «The wand hits you! You hear the howling of the CwnAnnwn...» vs JS
// «The wand hits you!». Pins the machine-recorded C topline at step 737.
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return game.getScreens?.() || [];
}

describe("mbhitm drains the deferred wail (muse.c:1625 losehp)", () => {
  it("95342 step 737 matches C, wand-hit wail present", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Healer-95342", 738);
    assert.ok(screens.length > 737, `expected 738+ screens, got ${screens.length}`);
    const row0 = (i) => String(screens[i]).split("\n")[0];
    assert.ok(row0(737).includes("The wand hits you!"),
      `step 737 topline: ${JSON.stringify(row0(737))}`);
    assert.ok(row0(737).includes("howling of the CwnAnnwn"),
      `step 737 topline: ${JSON.stringify(row0(737))}`);
  });
});
