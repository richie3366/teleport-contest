import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: region.c show_region `:732–735` — show_glyph(x, y, reg->glyph),
// a real S_cloud/S_poisoncloud cmap glyph in gbuf, so getpos autodescribe
// (pager.c lookat cmap arm) names the hero's cloud-covered spot «fog/vapor
// cloud». JS painted the '#' cell with no integer glyph, so glyph_at gave
// NO_GLYPH and the describe fell through to «unexplored area»
// (scen-extcmd-Healer-51256009 s603, D-4086). Single prefix per file
// (multi-prefix runSegment leaks module state).
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return handle.getScreens?.() || [];
}

describe("show_region stores the cloud cmap glyph (region.c)", () => {
  it("51256009 step 603 autodescribes fog/vapor cloud", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-extcmd-Healer-51256009", 604);
    const top = String(screens[603]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("fog/vapor cloud"), JSON.stringify(top.slice(0, 80)));
  });
});
