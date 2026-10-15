import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: read.c drop_boulder_on_player `:2331–2337` — losehp→done is inline:
// a fatal pit-crush ("squished under a boulder") lifesaves BEFORE the
// boulder-hit losehp below it. Temp-C dump on the session below: crush
// n=14 → savelife 14/14 → hit n=1 → 13/14, regen_hp called. JS drained
// the deferred done only after both losehps, leaving 14/14 and skipping
// regen_hp (rn2(100) never drawn; writer of the regen_hp cliff row).
// Twin: scen-sweep-Archeologist-50255212 step 204 (13/13 → 9/13).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(sessionId, nmoves) {
  const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${sessionId}.session.json`, import.meta.url), "utf8"));
  const seg = sess.segments[0];
  globalThis.__NH_RNG_TRACE = true;
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
  return { screens: game.getScreens?.() || [], rng: game.getRngLog?.() || [] };
}

const ID = "scen-sokoban-Ranger-50351023";
const top = (s) => String(s).split("\n")[0].replace(/\x1b\[[0-9;]*m/g, "");

describe("scroll of earth: crush lifesave precedes boulder-hit damage (read.c:2331-2337)", () => {
  it(`${ID}: step 123 HP 13(14) and regen_hp draws rn2(100)=77`, { timeout: 240000 }, async () => {
    const { screens, rng } = await runPrefix(ID, 123);
    assert.ok(screens.length > 123, `expected 124+ screens, got ${screens.length}`);
    assert.ok(top(screens[123]).includes("You survived that attempt on your life."),
      `step 123 topline: ${JSON.stringify(top(screens[123]))}`);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const grid = decodeScreen(screens[123] || "");
    const row23 = grid[23].map(renderCell).join("");
    assert.ok(row23.includes("HP:13(14)"), `step 123 status: ${JSON.stringify(row23)}`);
    assert.ok(rng.some((e) => /rn2\(100\)=77 @ regen_hp/.test(e)),
      `no regen_hp rn2(100)=77 draw; tail: ${JSON.stringify(rng.slice(-6))}`);
  });
});
