import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: display.c see_monsters `:1519–1524` → artifact.c Sting_effects
// `:2496–2499` stop arm. C emits the glow pline synchronously in turn
// order, so the stop text overflows the attack topline into a --More--.
// JS fired async Sting_effects without await from sync see_monsters, so
// the stop text landed after the screen capture (Knight-51050073 s319
// lost its --More-- and the stop line spilled onto later screens).
// D-4022. Single prefix per file (multi-prefix runSegment leaks state).
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
  return { screens: handle.getScreens?.() || [] };
}

describe("Sting stop-glow orders before the capture (display.c:1519-1524)", () => {
  it("Knight-51050073 s319 keeps --More--, s320 shows the stop line", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Knight-51050073", 320);
    assert.ok(screens.length > 320, `expected 321+ screens, got ${screens.length}`);
    const top319 = String(screens[319]).split("\n")[0];
    assert.equal(top319, "The barbed devil hits again!  The barbed devil stings!--More--",
      `step 319 topline: ${JSON.stringify(top319)}`);
    const top320 = String(screens[320]).split("\n")[0];
    assert.equal(top320, "Orcrist stops flickering.",
      `step 320 topline: ${JSON.stringify(top320)}`);
  });
});
