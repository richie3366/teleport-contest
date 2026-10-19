import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mkmaze.c movebubbles `:1653–1654` — on the Plane of Air every
// cell is struct-copied from air_pos {S_cloud, AIR, seenv 0, ..., lit 1},
// so each turn wipes seenv and only vision re-marks what the hero sees.
// Engulfed, nothing is re-marked: hack.c findtravelpath(TRAVP_VALID)'s
// `levl[nx][ny].seenv || couldsee` gate fails and getpos autodescribe
// appends « (no travel path)» (getloc_travelmode left on by an earlier
// «You are already here.»). JS set only glyph/typ/lit and kept a stale
// seenv (scen-worldtour-Tourist-49950060 s371, D-4077). Single prefix per
// file (multi-prefix runSegment leaks module state).
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

describe("movebubbles air_pos struct copy clears seenv (mkmaze.c)", () => {
  it("49950060 step 371 engulfed farlook says (no travel path)", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Tourist-49950060", 372);
    const top = String(screens[371]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("interior of the air elemental (no travel path)"), JSON.stringify(top.slice(0, 80)));
  });
});
