import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dig.c zap_dig u.dz arm + hack.c losehp `:4289–4291` — the falling
// rock's losehp runs maybe_wail inline when n > 0 and uhp*10 < uhpmax, so a
// low-HP ceiling zap queues a third message behind "It falls on your head!"
// (scen-sweep-Barbarian-585441 step 346, D-3900). JS losehp is sync and
// defers via game._needs_maybe_wail; zap_dig never drained it (the zap.c
// striking twin in js/zap.js does), so the CwnAnnwn wail never printed and
// step 346 lacked its --More--. Single prefix per file (multi-prefix
// runSegment leaks module state).
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

describe("zap_dig ceiling rock drains the losehp wail (hack.c:4289-4291)", () => {
  it("585441 step 346 keeps --More--; 347 shows the CwnAnnwn wail", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Barbarian-585441", 348);
    assert.ok(screens.length > 347, `expected 348+ screens, got ${screens.length}`);
    const top346 = String(screens[346]).split("\n")[0];
    assert.equal(top346, "You loosen a rock from the ceiling.  It falls on your head!--More--",
      `step 346 topline: ${JSON.stringify(top346.slice(0, 100))}`);
    const top347 = String(screens[347]).split("\n")[0];
    assert.equal(top347, "You hear the howling of the CwnAnnwn...",
      `step 347 topline: ${JSON.stringify(top347.slice(0, 100))}`);
    // Mechanism: rock dropped HP under a tenth of max, so the wail fired.
    assert.ok((game.u.uhp | 0) * 10 < (game.u.uhpmax | 0),
      `wail predicate uhp*10<uhpmax: uhp=${game.u.uhp} uhpmax=${game.u.uhpmax}`);
    assert.ok((game.wailmsg | 0) > 0, "maybe_wail stamped wailmsg");
  });
});
