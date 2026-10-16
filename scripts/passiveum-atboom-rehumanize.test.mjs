import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mhitu.c passiveum `:2526–2530` — a poly'd hero whose form has
// AT_BOOM (gas spore) explodes when the passive fires: `You("explode!")`
// then `rehumanize()` directly (KMH balance patch — "okay with
// unchanging"; rehumanize gates the stuck arm itself). JS printed the
// explosion but carried `// rehumanize deferred`, so the return-to-form
// message never appeared (scen-sweep-Barbarian-620085 step 212). Single
// prefix per file (multi-prefix runSegment leaks module state).
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
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("passiveum AT_BOOM rehumanizes after exploding (mhitu.c:2526-2530)", () => {
  it("620085 step 212 returns to orcish form, hero human again", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Barbarian-620085", 212);
    assert.ok(screens.length > 212, `expected 213+ screens, got ${screens.length}`);
    const top212 = String(screens[212]).split("\n")[0];
    assert.equal(top212, "The giant spider bites!  You explode!  You return to orcish form!",
      `step 212 topline: ${JSON.stringify(top212.slice(0, 110))}`);
    // Mechanism: rehumanize() ran — hero is human (not poly'd) again.
    const { Upolyd } = await import("../js/const.js");
    assert.equal(Upolyd(game.u), false, "hero rehumanized (Upolyd false)");
  });
});
