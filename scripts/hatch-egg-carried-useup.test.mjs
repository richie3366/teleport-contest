import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: timeout.c hatch_egg `:1177–1178` — a fully-hatched carried stack
// ends `else if (carried(egg)) useup(egg)`. JS shadowed the static invent.js
// `useup` with `const { useup } = await import('./eat.js')`, and eat.js does
// not export it — so the call threw `TypeError: useup is not a function`
// and voided the whole session (throw-void under owner randomize_gem_colors).
// (scen-worldtour-Wizard-50056058: killer bee hatches from the pack at move 895.)
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

const ID = "scen-worldtour-Wizard-50056058";
const top = (s) => String(s).split("\n")[0].replace(/\x1b\[[0-9;]*m/g, "");

describe("hatch_egg carried useup (timeout.c:1160)", () => {
  it(`${ID}: pack-hatch at move 895 consumes the egg, no throw`, { timeout: 240000 }, async () => {
    const screens = await runPrefix(ID, 895);
    assert.ok(screens.length > 895, `expected 896+ screens, got ${screens.length}`);
    assert.equal(top(screens[895]), "You see a killer bee fly out of your pack!");
  });
});
