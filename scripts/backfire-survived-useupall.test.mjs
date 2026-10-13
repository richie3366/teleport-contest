import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: zap.c backfire `:2604–2614` — the exploding wand is ALWAYS used up,
// even when its fatal losehp is survived: C done() returns on a wizard-mode
// Die?-decline (end.c:1119–1123 survive→return) and backfire falls through
// to useupall. JS returned right after finish_losehp_done(), so the wand
// survived a declined death and the next `z` re-prompted for it.
// (scen-sweep-Knight-587209: cursed wish wand of sleep `k` explodes at
// step 75, death declined at 78, second `z` at 79.)
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(sessionId, nmoves) {
  const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${sessionId}.session.json`, import.meta.url), "utf8"));
  const seg = sess.segments[0];
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

const ID = "scen-sweep-Knight-587209";
const top = (s) => String(s).split("\n")[0].replace(/\x1b\[[0-9;]*m/g, "");

describe("backfire useupall after survived fatal losehp (zap.c:2613)", () => {
  it(`${ID}: declined-death backfire destroys the wand; 2nd zap finds nothing`, { timeout: 240000 }, async () => {
    const screens = await runPrefix(ID, 79);
    assert.ok(screens.length > 79, `expected 80+ screens, got ${screens.length}`);
    assert.equal(top(screens[73]), "k - a wand.");
    assert.equal(top(screens[74]), "What do you want to zap? [k or ?*]");
    assert.ok(top(screens[75]).includes("The wand suddenly explodes!"),
      `step 75 topline: ${JSON.stringify(top(screens[75]))}`);
    assert.equal(top(screens[77]), "Die? [yn] (n)");
    assert.ok(top(screens[78]).includes("OK, so you don't die."),
      `step 78 topline: ${JSON.stringify(top(screens[78]))}`);
    assert.equal(top(screens[79]), "You don't have anything to zap.");
  });
});
