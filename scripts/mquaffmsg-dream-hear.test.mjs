import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: muse.c mquaffmsg `:293–302` — the unseen arm calls
// `You_hear("a chugging sound.")` (`:300`), which dreams when the hero
// is Unaware (pline.c:447, youprop.h:399). JS inlined
// `pline('You hear a chugging sound.')` (D-2941 named omission), so a
// sleeping hero heard it awake (scen-sweep-Ranger-582637 step 192:
// sleep-gas trap at s188, Unaware at s192 both sides, RNG identical).
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("mquaffmsg unseen arm dreams via You_hear (muse.c:300)", () => {
  it("582637 step 192 dreams the chugging while sleep-gassed", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Ranger-582637", 193);
    assert.ok(screens.length > 192, `expected 193+ screens, got ${screens.length}`);
    const top192 = String(screens[192]).split("\n")[0];
    assert.equal(top192, "You dream that you hear a chugging sound.--More--",
      `step 192 topline: ${JSON.stringify(top192.slice(0, 120))}`);
    // Mechanism: the hero is Unaware (sleep gas s188), so You_hear dreams.
    assert.ok((game.multi | 0) < 0, `multi<0 while asleep, got ${game.multi}`);
    assert.ok((game.u?.usleep | 0) > 0, `usleep>0 while asleep, got ${game.u?.usleep}`);
  });
});
